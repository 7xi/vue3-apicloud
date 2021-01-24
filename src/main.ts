import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible'

import { NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Skeleton, Cell, CellGroup, List, PullRefresh, Tab, Tabs, Tag, Image, Button, Loading,Icon } from 'vant'
import 'vant/lib/index.css'
import '@/assets/styles/base.less' //初始化样式
import { config } from './utils/config'
declare const window: Window & { apiready: any; api: any }

const app = createApp(App)

app.config.globalProperties.$filters = {
	prefix(url: string) {
		if (url && url.startsWith('http')) {
			return url
		} else {
			url = `https://www.fastmock.site/mock/6d41e4a585f6e3529e633c2d4e78cbba${url}`
			return url
		}
	},
}

app.use(NavBar)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Swipe)
	.use(SwipeItem)
	.use(Skeleton)
	.use(Cell)
	.use(CellGroup)
	.use(List)
	.use(PullRefresh)
	.use(Tab)
	.use(Tabs)
	.use(Tag)
	.use(Image)
	.use(Button)
	.use(Loading)
	.use(Icon)
app.use(router)
app.use(store)

if (config.$appMode) {
	window.apiready = () => {
		app.mount('#app')
		if (window.api.systemType == 'android' && parseInt(window.api.systemVersion) < 6) {
			window.api.setStatusBarStyle({
				style: 'dark',
				color: 'rgba(0,0,0,.4)',
			})
		} else {
			window.api.setStatusBarStyle({
				style: 'dark',
				color: 'rgba(0,0,0,0)',
			})
		}
	}
} else {
	app.mount('#app')
}
