import util from '@/common/we7_js/util.js'
import request from '@/common/request.js'
module.exports = {
	/**
	 * 跳转到指定页面
	 * 支持tabBar页面
	 */
	navigateTo: function(url) {
		uni.navigateTo({
			url: url
		});
	},
	geturli:function () {
		let url = window.location.href;
		let urli ={i:0};
		if (url.indexOf("?") != -1) {
			var str = url.split('?')[1];
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				if (strs[i].split("=")[0] && unescape(strs[i].split("=")[1])) {
					if (strs[i].split("=")[0] == "i") {
						urli.i = unescape(strs[i].split("=")[1]);
					}
				}
			}
		}
		return urli.i;
	},
	//设置缓存 (单位为秒)
	setStorage: function(key = ACCESS_TOKEN, value) {
		const params = {
			date: new Date().getTime(),
			value
		};
		uni.setStorageSync(key, JSON.stringify(params));
	},
	getStorage: function(key = ACCESS_TOKEN, day = 0.5) {
		let obj = uni.getStorageSync(key);
		if (!obj) return null;
		obj = JSON.parse(obj);
		const date = new Date().getTime();
		if (date - obj.date > 86400000 * day) return null;
		return obj.value;
	},
	/**
	 * 判断变量是否为空，
	 * @param  {[type]}  param 变量
	 * @return {Boolean}      为空返回true，否则返回false。
	 */
	isEmpty: function(param) {
		if (param) {
			var param_type = typeof(param);
			if (param_type == 'object') {
				//要判断的是【对象】或【数组】或【null】等
				if (typeof(param.length) == 'undefined') {
					if (JSON.stringify(param) == "{}") {
						return true; //空值，空对象
					}
				} else if (param.length == 0) {
					return true; //空值，空数组
				}
			} else if (param_type == 'string') {
				//如果要过滤空格等字符
				var new_param = param.trim();
				if (new_param.length == 0) {
					//空值，例如:带有空格的字符串" "。
					return true;
				}
			} else if (param_type == 'boolean') {
				if (!param) {
					return true;
				}
			} else if (param_type == 'number') {
				if (!param) {
					return true;
				}
			}
			return false; //非空值
		} else {
			//空值,例如：
			//(1)null
			//(2)可能使用了js的内置的名称，例如：var name=[],这个打印类型是字符串类型。
			//(3)空字符串''、""。
			//(4)数字0、00等，如果可以只输入0，则需要另外判断。
			return true;
		}
	},
	setUserGlobalData: function(param) {
		if (param) {
			getApp().globalData.memberInfo = param;
			getApp().globalData.uid = param.uid;
		}
	},
	onShowlogin: function() {
		if (uni.getStorageSync('memberInfo')) {
			this.login();
		}
	},
	login: function() {
		return new Promise((resolve, reject) => {
			var _this = this;
			var memberInfo = _this.getStorage("memberInfo",0.001);
			if (memberInfo) {
				_this.setUserGlobalData(memberInfo);
				resolve(memberInfo)
			} else {
				util.getUserInfo(function(userInfo) {
					request.post('member.login', {
						samkey: (new Date()).valueOf()
					}).then(function(res) {
						if (res.data.errno == 0) {
							_this.setUserGlobalData(res.data);
							_this.setStorage("memberInfo", res.data)
							resolve(res)
						} else if (res.data.errno == 20001) {
							uni.showToast({
								title: '账号审核中!',
								icon: 'success',
								duration: 1500
							});
							uni.redirectTo({
								url: "/pages/login/success",
							})
						} else if (res.data.errno == 10001) {
							uni.showToast({
								title: '您还未登录!',
								icon: 'success',
								duration: 1500
							});
							uni.redirectTo({
								url: "/pages/login/login?ptype=member",
							})
						}
					})
				})
			}
			// #ifdef APP-PLUS
			resolve({"uid":''})
			// #endif
		})
	}
}
