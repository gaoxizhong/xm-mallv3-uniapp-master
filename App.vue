<script>
	export default {
		globalData: {
			memberInfo: null,
			uid: null
		},
		onLaunch: function() {
			let that = this;
			// #ifdef MP-WEIXIN
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							that.tui.modal('更新提示', '新版本已经上线啦~，为了获得更好的体验，建议立即更新', false, res => {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							that.tui.modal('更新失败', '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开', false, res => {});
						});
					}
				});
			}
			// #endif
		},
		onShow: function() {
         //console.log('sam ok--');
		},
		onHide: function() {
			//console.log('App Hide')
		},
		onError: function(err) {
			//全局错误监听
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				const res = uni.getSystemInfoSync();
				let errMsg = `手机品牌：${res.brand}；手机型号：${res.model}；操作系统版本：${res.system}；客户端平台：${res.platform}；错误描述：${err}`;
				console.log('发生错误：' + errMsg);
			});
			// #endif
		}
	};
</script>

<style>
	@import './common/app.css';
</style>
