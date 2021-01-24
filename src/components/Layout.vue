<template>
	<div class="layout">
		<div class="layout-header" :style="{ paddingTop: `${appSafeAreaHeader}px` }">
			<!-- <div :style="{height:`${appSafeAreaHeader}px`}"></div> -->
			<slot name="header"></slot>
		</div>
		<div class="layout-body">
			<slot />
		</div>
		<div class="layout-footer">
			<slot name="footer"></slot>
			<!-- <div :style="{height:`${appSafeAreaFooter}px`}"></div> -->
		</div>
	</div>
</template>

<script lang="ts">
interface StateProps {
	appSafeAreaHeader: number
	appSafeAreaFooter: number
}
declare const window: Window & { api: any }
import { config } from '@/utils/config'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
	name: 'layout',
	setup() {
		const state: StateProps = reactive({
			appSafeAreaHeader: 0,
			appSafeAreaFooter: 0,
		})
		onMounted(() => {
			if (config.$appMode) {
				state.appSafeAreaHeader = window.api.safeArea.top
				state.appSafeAreaFooter = window.api.safeArea.bottom
			}
		})
		return {
			...toRefs(state),
		}
	},
})
</script>

<style lang="less" scoped>
body,
html {
	height: 100%;
}
.layout {
	background: #fff;
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.layout-body {
		width: 100%;
		height: 100%;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		position: relative;
	}
}
</style>
