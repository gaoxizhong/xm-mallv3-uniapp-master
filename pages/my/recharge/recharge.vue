<template>
	<view class="container">
		<image class="tui-bg__img" src="/static/images/mall/wallet/bg_balance_detail.png" ></image>
		<view class="tui-content__box">
			<form @submit="bindSave">
			<view class="tui-amount__box">
				<image class="tui-amount__img" src="/static/images/mall/wallet/bg_balance_amount.png" mode="widthFix">
				</image>
					<view class="tui-amount">
						<view><input v-model="amount" placeholder="充值金额" placeholder-class="tui-phcolor" type="text"
								maxlength="40" /></view>
					</view>
			</view>
			<!--<view class="tui-badge__box">
				<view class="tui-badge__title">活动</view>
				<view class="tui-badge__desc">充5000送2000</view>
			</view>-->
			<view class="tui-btn__box">
				<tui-button formType="submit" type="danger" height="88rpx" shape="circle">立即充值</tui-button>
			</view>
			</form>
		</view>
	</view>
</template>

<script>
	import pay from '@/common/pay.js'
	export default {
		data() {
			return {
				amount: ''
			}
		},
		methods: {
			async bindSave(e) {
				const _this = this
				const amount = _this.amount;
				if (amount == "" || amount * 1 < 0) {
					wx.showToast({
						title: '请填写正确的金额',
						icon: 'none'
					})
					return
				}
				wx.showModal({
					title: '请确认充值金额',
					content: '您本次充值 ' + amount + ' 元',
					confirmText: "确认支付",
					cancelText: "取消支付",
					success: function(res) {
						//console.log(res);
						if (res.confirm) {
							const redirectUrl = "/pages/my/recharge/success";
							pay.wxpay('recharge', amount, 0, redirectUrl);
						}
					}
				});
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		padding-bottom: 48rpx;
	}

	.tui-bg__img {
		width: 100%;
		height: 230rpx;
	}

	.tui-content__box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		margin-top: -150rpx;
		z-index: 2;
	}

	.tui-amount__box {
		width: 100%;
		height: 280rpx;
		background: #FFFFFF;
		box-shadow: 0 10rpx 14rpx 0 rgba(0, 0, 0, 0.06);
		border-radius: 10rpx;
		position: relative;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-left: 52rpx;
		box-sizing: border-box;
	}

	.tui-amount__img {
		width: 342rpx;
		height: 248rpx;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 1;
	}

	.tui-amount {
		font-size: 56rpx;
		font-weight: 500;
		color: #333333;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 10;
	}

	.tui-badge {
		height: 34rpx;
		background: #FFE5E5;
		border-radius: 6rpx;
		font-size: 25rpx;
		font-weight: 400;
		color: #EB0909;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 12rpx;
	}

	.tui-scale__text {
		transform: scale(0.8);
		transform-origin: center center;
	}

	.tui-recharge__text {
		font-size: 28rpx;
		font-weight: 400;
		color: #888888;
		padding-top: 16rpx;
		padding-left: 12rpx;
		box-sizing: border-box;
	}

	.tui-badge__box {
		display: inline-flex;
		align-items: center;
		height: 42rpx;
		background-color: #FFDBDB;
		border-radius: 6rpx;
		overflow: hidden;
		margin-top: 50rpx;
	}

	.tui-badge__title {
		height: 42rpx;
		color: #fff;
		background-color: #EB0909;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10rpx;
	}

	.tui-badge__desc {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 400;
		color: #EB0909;
		padding: 0 10rpx;
	}

	.tui-explain__box {
		padding-top: 60rpx;
		font-weight: 400;
		color: #333333;
	}

	.tui-title {
		font-size: 30rpx;
		padding-bottom: 8rpx;
	}

	.tui-desc {
		font-size: 26rpx;
		padding-top: 12rpx;
	}

	.tui-btn__box {
		padding-top: 80rpx;
	}
</style>
