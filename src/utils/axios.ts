import axios from 'axios'
import router from '../router'
import { config } from '../utils/config'
declare const window: Window & { api: any }

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? config.$development : config.$production
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 响应拦截
axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response)
		} else {
			return Promise.reject(response)
		}
	},
	// 服务器状态码不是200的情况
	error => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '请求参数错误'
					break
				case 401:
					error.message = '未授权，请登录'
					break
				case 403:
					error.message = '跨域拒绝访问'
					break
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`
					break
				case 408:
					error.message = '请求超时'
					break
				case 500:
					error.message = '服务器内部错误'
					break
				case 501:
					error.message = '服务未实现'
					break
				case 502:
					error.message = '网关错误'
					break
				case 503:
					error.message = '服务不可用'
					break
				case 504:
					error.message = '网关超时'
					break
				case 505:
					error.message = 'HTTP版本不受支持'
					break
				default:
					break
			}
			return Promise.reject(error.response)
		}
	}
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params?: object, files?: object) {
	return new Promise((resolve, reject) => {
		if (config.$appMode) {
			window.api.ajax(
				{
					url: `${axios.defaults.baseURL}${url}`,
					method: 'get',
					data: {
						values: params,
					},
				},
				(ret: any, err: any) => {
					if (ret) {
						resolve(ret)
					} else {
						reject(err)
					}
				}
			)
		} else {
			axios
				.get(`${axios.defaults.baseURL}${url}`, {
					params,
				})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					if (err.statusCode === 0) {
						router.push('NoNetWork')
					} else {
						reject(err)
					}
				})
		}
	})
}
/**
 * post方法，对应请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: object, files?: object) {
	return new Promise((resolve, reject) => {
		if (config.$appMode) {
			window.api.ajax(
				{
					url: `${axios.defaults.baseURL}${url}`,
					method: 'post',
					timeout: 30,
					data: {
						values: params,
						files: files,
					},
				},
				(ret: any, err: any) => {
					if (ret) {
						resolve(ret)
					} else {
						if (err.statusCode === 0) {
							router.push('NoNetWork')
						} else {
							reject(err)
						}
					}
				}
			)
		} else {
			axios
				.post(`${axios.defaults.baseURL}${url}`, params, files)
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		}
	})
}
