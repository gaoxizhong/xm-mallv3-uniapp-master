import request from '@/common/request.js'
/**
 * type: order 支付订单 recharge paybill 优惠买单
 * data: 扩展数据对象，用于保存参数
 */
module.exports = {
	wxpay: function(type, money, orderid, redirectUrl) {
		request.post('pay', {
			orderid: orderid,
			money: money,
			type: type
		}).then(res => {
			uni.showLoading({
				title: '正在支付中...'
			})


			if (res.errno == 0) {
				// #ifdef MP-WEIXIN
				// 发起支付
				uni.requestPayment({
					'timeStamp': res.data.timeStamp,
					'nonceStr': res.data.nonceStr,
					'package': res.data.package,
					'signType': 'MD5',
					'paySign': res.data.paySign,
					fail: function(aaa) {
						uni.showToast({
							title: '支付失败:'
						})
					},
					success: function() {
						// 提示支付成功
						uni.showToast({
							title: "支付成功",
							duration: 2000,
							icon: 'success_no_circle',
							size: "10"
						})
						uni.redirectTo({
							url: redirectUrl
						});
					}
				})
				// #endif
				
				// #ifdef H5
				
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": res.data.appId, //公众号名称，由商户传入
					"timeStamp": res.data.timeStamp, //时间戳
					"nonceStr": res.data.nonceStr, //随机串
					"package": res.data.package, //扩展包
					"signType": 'MD5', //微信签名方式:MD5
					"paySign": res.data.paySign //微信签名
				}, function(respay) {
					if (respay.err_msg === "get_brand_wcpay_request:ok") {
						uni.redirectTo({
							url: redirectUrl
						});
						//that.getData();
					} else if (respay.err_msg === "get_brand_wcpay_request:cancel") {
						uni.showToast({
							title: "取消支付",
							icon: "none",
							duration: 2000
						});
					} else if (respay.err_msg === "get_brand_wcpay_request:fail") {
						uni.showToast({
							title: "支付失败",
							icon: "none",
							duration: 2000
						})
					}
				}, function(err) {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 2000
					});
				});
				// #endif
			} else {
				uni.showModal({
					title: '出错了',
					content: res.code + ':' + res.msg + ':' + res.data,
					showCancel: false,
					success: function(res) {

					}
				})
			}
		})
	}
}
