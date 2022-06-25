import util from '@/common/we7_js/util.js'
import App from '../App'
module.exports = {
	// get请求后台数据
	get: function(url, data) {
		return new Promise((resolve, reject) => {
			util.request({
				'url': 'entry/wxapp/' + url,
				'data': data,
				'method': 'get',
				'cachetime': '30',
				success: function(res) {
					resolve(res.data)
				}
			});
		})
	},
	// get请求后台数据
	post: function(url, data) {
		return new Promise((resolve, reject) => {
			util.request({
				'url': 'entry/wxapp/' + url,
				'data': data,
				'method': 'post',
				'cachetime': '30',
				success: function(res) {
					resolve(res.data)
				}
			});
		})
	},
	postnoLoading: function(url, data) {
		return new Promise((resolve, reject) => {
			util.request({
				'url': 'entry/wxapp/' + url,
				'showLoading':false,
				'data': data,
				'method': 'post',
				'cachetime': '30',
				success: function(res) {
					resolve(res.data)
				}
			});
		})
	},
	uploadFile: function(path) {
		let siteroot = App.siteInfo.siteroot;
		let upurl = siteroot + '?i=' + App.siteInfo.uniacid + '&c=utility&a=file&do=upload&thumb=0';
		return new Promise((resolve, reject) => {
			var FilePaths = path;
			console.log(FilePaths);
			uni.uploadFile({
				url: upurl,
				method: 'POST',
				// #ifdef MP-WEIXIN
				filePath: FilePaths,
				formData: {
					file: FilePaths
				},
				header: {
					"Content-Type": "multipart/form-data"
				},
				// #endif

				// #ifdef H5
				filePath: FilePaths.path,
				formData: {
					file: FilePaths.path
				},
				// #endif
				name: 'file',
				success: (res) => {
					resolve(JSON.parse(res.data));
					//resolve(res)
					console.info("服务器返回的图片路径是：" + res.data)
				}
			});
		});
	}

}
