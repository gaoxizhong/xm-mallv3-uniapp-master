<template>
	<view class="container">
		<form @submit="bindSave" :report-submit="true">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-cell-input">
					<input name="amount" :placeholder="'消费金额,请询问服务员后输入'" placeholder-class="tui-phcolor" type="text"
						:auto-focus="true" :focus="true" maxlength="40" />
				</view>
			</tui-list-cell>
			<view class="tui-btn-box">
				<tui-button formType="submit" :shadow="false" height="88rpx" shape="circle" type="danger">确认支付
				</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	import pay from '@/common/pay.js'
	export default {
		data() {
			return {

			};
		},
		onLoad: function(e) {

		},
		onShow: function() {

		},
		methods: {
			async bindSave(e) {
				const _this = this
				const amount = e.detail.value.amount;
				if (amount == "" || amount * 1 < 0) {
					wx.showToast({
						title: '请填写正确的消费金额',
						icon: 'none'
					})
					return
				}
				const userMoney = await _this.$request.get('member.detail');
				if (userMoney.errno != 0) {
					wx.showToast({
						title: userMoney.message,
						icon: 'none'
					})
					return
				}
				let _msg = '您本次消费 ' + amount + ' 元'
				let needPayAmount = amount * 1

				if (userMoney.data.balance * 1 > 0) {
					_msg += ',当前账户可用余额 ' + userMoney.data.balance + ' 元'
				}
				needPayAmount = needPayAmount.toFixed(2) // 需要买单支付的金额
				const wxpayAmount = (needPayAmount - userMoney.data.balance).toFixed(2) // 需要额外微信支付的金额
				//console.log(needPayAmount)
				//console.log(wxpayAmount)

				if (wxpayAmount > 0) {
					_msg += ',仍需微信支付 ' + wxpayAmount + ' 元'
				}
				wx.showModal({
					title: '请确认消费金额',
					content: _msg,
					confirmText: "确认支付",
					cancelText: "取消支付",
					success: function(res) {
						//console.log(res);
						if (res.confirm) {
							_this.goPay(amount, wxpayAmount)
						}
					}
				});
			},
			goPay(amount, wxpayAmount) {
				const _this = this
				const redirectUrl = "/pages/my/maidan/success";
				if (wxpayAmount > 0) {
					pay.wxpay('paybill', wxpayAmount, 0, redirectUrl);
				} else {
					_this.$request.post('paybill.pay', {
						money: amount
					}).then(res => {
						if (res.errno == 0) {
							wx.showModal({
								title: '成功',
								content: '买单成功，欢迎下次光临！',
								showCancel: false,
								success: function(res) {
									wx.redirectTo({
										url: redirectUrl
									});
								}
							})
						} else {
							wx.showModal({
								title: '失败',
								content: res.msg,
								showCancel: false
							})
						}
					})
				}
			}
		}
	};
</script>

<style lang="scss">
	.container {
		padding-top: 20rpx;

		.tui-cell-input {
			width: 100%;
			display: flex;
			align-items: center;
			box-sizing: border-box;

			input {
				flex: 1;
				padding-left: $uni-spacing-row-base;
			}
		}

		.tui-btn-box {
			padding: 40rpx 30rpx 10rpx 30rpx;
			box-sizing: border-box;
		}
	}
</style>
