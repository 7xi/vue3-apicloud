# apicloud

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Description

**ApiCloud 脚手架工具**, 可快速开发基于vue-cli4打包的混合app，该脚手架使用vant前端框架，在vue-cli4的基础上增加了很多apicloud的兼容方案，使用该脚手架需要有一定的apicloud开发经验和vue-cli使用经验！

**该脚手架适合已有h5项目需要转aicloud的一个解决方案**


### **项目介绍**
#### **1.技术栈**
##### vue3 + typescript + vuex + vue-router + vant + axios + apicloud

#### **2.app解决方案**
- 2.1 页面仿原生切换效果（无需再手动设置）

- 2.2 解决页面头部底部固定问题，需要页面使用如下写法
``` bash

<template>
	<layout>
		<template v-slot:header>
			头部
		</template>
		
        主体...

		<template v-slot:footer>
			尾部
		</template>
	</layout>
</template>
<script>
    import Layout from '@/components/Layout.vue'
</script>
```
- 2.3 沉浸式头部字体颜色（默认黑色），如需修改，可自行到src/App.vue下修改

- 2.4 app中沉浸式状态下头部和ios下底部间距解决方案：在app启动后会使用api方法自动获取一次顶部和底部的高度，高度值存在vuex中。

- 2.5 接口请求:只需要考虑在本地测试环境中运行，编译后放到apicloud中会切换到apicloud的接口请求方式
接口api路径src\service\api.ts

- 2.6 关于编译：如果要打包到apicloud项目中，需要先将util\config.ts文件中的$appMode状态改为true，不然接口请求会出现跨域问题。

- 2.7 关于同步代码：apicloud项目文件夹清空，然后将vue-cli编译好的dist文件下的所有文件复制到apicloud项目根目录中，然后执行同步。

- 2.8 侧滑返回上一页：如果某个页面需要能够侧滑返回上一页，需要手动在src\router\index.ts增加isback: true。

### **暂时无法解决的问题**
- 1.在填写表单时，app的头部会被顶到窗口外面去

- 2.一些api方法没有开启关闭方法，设置了以后会影响到全局页面，需要自己根据实际业务逻辑增加判断条件，例如
```
api.addEventListener({
    name:'resume'
}, function(ret, err){        
    alert('应用回到后台');
});
```
- 3.IOS端侧滑返回无法停留

### **开始一个app**
以上都是废话，直接开始一个项目吧！

- 1.在apicloud创建项目，记录appid，然后替换/public/config.xml文件中第一行id;

- 2.将脚手架中/util/config配置文件中的$appMode改成false,可以编译h5端;

- 3.将脚手架中/util/config配置文件中的$appMode改成true,可以编译apicloud端;

- 4.将编译好的apicloud端代码（dist文件夹下）文件复制到apicloud项目根目录下;

- 5.保证手机和电脑在同一个网络环境，然后在apicloud中同步代码，查看效果;

- 6.h5端测试https://apicloud.somaqu.com/h5/


![](http://img.somaqu.com/1575602231032.gif)

该脚手架已经有上架到安卓和ios的APP项目了，而且相较于官方写法，流畅度会比较高，不过也会有一些无法解决的坑，可根据需求来取舍。
赶紧clone下来试一下吧，如果对你有帮助，欢迎star~；如果有疑问，可以提lssues或加我QQ 669476900一起讨论！