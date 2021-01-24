module.exports = {
	publicPath: '',
	outputDir: 'dist',
	css: {
		loaderOptions: {
			less: {
				// 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
				lessOptions: {
					modifyVars: {
						// 直接覆盖变量
						'text-color': '#111',
						'border-color': '#eee',
					},
				},
			},
		},
	},
}