import { config } from '@/utils/config'
declare const window: Window & { api: any }
/**
 *
 * 手机号码加星号
 * @export
 * @param {number} mobile - 手机号码 - 例：13606006000
 * @returns {*} - 例：136****6000
 */
export function asteriskMobile(mobile: string): string {
	if (mobile) {
		const mobileReg: string = mobile.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
		return mobileReg
	} else {
		return ""
	}
}

/**
 *
 * 验证邮箱
 * @export
 * @param {number} email - 邮箱地址 - 例：1000@qq.com
 * @returns {boolean} - 返回判断结果
 */
export function emailCheck(email: string): boolean {
	const emailReg = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	if (!emailReg.test(email)) {
		return false
	} else {
		return true
	}
}

/**
 *
 * 验证手机号码
 * @export
 * @param {*} mobile  - 手机号码 - 例：13606006000
 * @returns {boolean}  - 返回判断结果
 */
export function phoneNumCheck(mobile: string): boolean {
	const mobileReg = /^1[3456789]\d{9}$/
	if (!mobileReg.test(mobile)) {
		return false
	} else {
		return true
	}
}

/**
 *
 * 本地存储数据
 * @export
 * @param {string} key - 要存的对象名称
 * @param {any} value - 要存的对象内容(存到本地时如果不是字符串类型会转成字符串类型)
 */
export function setLocalStorage(key: string, value: string) {
	if (!key) return
	if (typeof value !== 'string') {
		value
	}
	if (config.$appMode) {
		window.api.setPrefs({
			key: key,
			value: value,
		})
	} else {
		window.localStorage.setItem(key, value)
	}
}

/**
 *
 * 获取本地数据
 * @export
 * @param {string} key - 要获取的对象名称
 * @returns {boolean} - 返回获取到的结果
 */
export function getLocalStorage(key: string): string | null {
	if (!key) return ''
	if (config.$appMode) {
		const val = window.api.getPrefs({
			sync: true,
			key: key,
		})
		return val
	} else {
		const val = window.localStorage.getItem(key)
		return val
	}
}

/**
 *
 * 删除本地数据
 * @export
 * @param {string} key - 要删除的对象名称
 */
export function removeLocalStorage(key: string) {
	if (!key) return
	if (config.$appMode) {
		window.api.removePrefs({
			key: key,
		})
	} else {
		window.localStorage.removeItem(key)
	}
}

/**
 *
 * 获取系统权限
 * @export
 * @param {string} key - 要获取的系统类型名称
 * @callback {boolean} - 返回获取到的结果
 */
export function getHasPermission(key: string, callback:any) {
	// 系统权限对照表
	const codeList: { [key: string]: string } = {
		camera: '相机',
		contacts: '联系人读取',
		'contacts-r': '仅联系人读取',
		'contacts-w': '仅联系人写入',
		microphone: '麦克风',
		photos: '访问相册',
		location: '定位',
		locationAlways: '后台定位',
		notification: '状态栏通知',
		calendar: '日历读取/写入',
		'calendar-r': '仅日历读取',
		'calendar-w': '仅日历写入',
		phone: '拨打电话',
		'phone-call': '仅直接拨打电话',
		'phone-r': '仅获取手机号码',
		'phone-r-log': '读取通话记录',
		'phone-w-log': '写入通话记录',
		sensor: '传感器',
		sms: '读取短信/后台发送短信',
		'sms-s': '仅后台发送短信',
		'sms-r': '仅读取短信',
		storage: '读写',
		'storage-r': '写入',
		'storage-w': '读取',
	}
	// 当前要获取的权限类型
	const list: string[] = []
	list.push(key)
	// 获取是否有权限
	const result = window.api.hasPermission({
		list: list,
	})
	const name = codeList[result[0].name]
	// 如果有权限就返回,没有权限就继续申请权限
	if (result[0].granted) {
		callback(true)
	} else {
		window.api.confirm(
			{
				title: '提醒',
				msg: `没有获得 ${name} 权限\n是否前往设置？`,
				buttons: ['去设置', '取消'],
			},
			function (ret: any) {
				if (1 === ret.buttonIndex) {
					window.api.requestPermission(
						{
							list: list,
							code: 100001,
						},
						function (ret: any) {
							callback(ret.list[0].granted)
						}
					)
				} else {
					callback(false)
				}
			}
		)
	}
}
