<template>
	<view class="container">
		<view class="tui-wallet__box">
			<view class="tui-content__box">
				<view class="tui-my__assets">
					<text>我的资产</text>
					<image @tap="toggle" mode="widthFix" :src="'/static/images/mall/wallet/'+(isShow?'img_show_3x.png':'img_hide_3x.png')"></image>
				</view>
				<view class="tui-assets__center">
					<view class="tui-item__box">
						<text>余额</text>
						<view v-if="isShow">￥<text class="tui-text__large">100</text>.00</view>
						<view v-else><text class="tui-text__large">****</text></view>
					</view>
					<view class="tui-item__box">
						<text>红包</text>
						<view v-if="isShow">￥<text class="tui-text__large">0</text>.00</view>
						<view v-else><text class="tui-text__large">****</text></view>
					</view>
					<view class="tui-item__box" @tap="bankCard">
						<text>银行卡</text>
						<view v-if="isShow"><text class="tui-text__large">6</text>张</view>
						<view v-else><text class="tui-text__large">****</text></view>
					</view>
				</view>
				<view class="tui-assets__bottom">
					<view class="tui-item__box" @tap="coupon">
						<text>优惠券</text>
						<view v-if="isShow"><text class="tui-text__large">2</text>张</view>
						<view v-else><text class="tui-text__large">****</text></view>
					</view>
					<view class="tui-item__box">
						<text>积分</text>
						<view v-if="isShow"><text class="tui-text__large">0</text></view>
						<view v-else><text class="tui-text__large">****</text></view>
					</view>
					<view class="tui-item__box">
						<text>代金券</text>
						<view v-if="isShow">￥<text class="tui-text__large">0</text>.00</view>
						<view v-else><text class="tui-text__large">****</text></view>
					</view>
					<view class="tui-item__box">
						<text>礼品卡</text>
						<view v-if="isShow"><text class="tui-text__large">0</text>张</view>
						<view v-else><text class="tui-text__large">****</text></view>
					</view>
				</view>
				<!-- #ifdef MP -->
				<view class="tui-tag__box" @tap="records">账单</view>
				<!-- #endif -->
			</view>
			<view class="tui-recharge__box">
				<view class="tui-title">余额充值</view>
				<view class="tui-list-cell">
					<view class="tui-amount__box">
						<view class="tui-amount__title">5000元</view>
						<tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button>
					</view>
					<view class="tui-amount__box">
						<view class="tui-amount__desc">充5000送3000</view>
						<view class="tui-amount">￥5000</view>
					</view>
					<view class="tui-badge tui-bg__new">
						<view class="tui-scale__text">新用户专享</view>
					</view>
				</view>

				<view class="tui-list-cell">
					<view class="tui-amount__box">
						<view class="tui-amount__title">5000元</view>
						<tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button>
					</view>
					<view class="tui-amount__box">
						<view class="tui-amount__desc">充5000送2000</view>
						<view class="tui-amount">￥5000</view>
					</view>
					<view class="tui-badge tui-bg__appoint">
						<view class="tui-scale__text">指定用户专享</view>
					</view>
				</view>

				<view class="tui-list-cell">
					<view class="tui-amount__box">
						<view class="tui-amount__title">3000元</view>
						<tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button>
					</view>
					<view class="tui-amount__box">
						<view class="tui-amount__desc">充3000送1000</view>
						<view class="tui-amount">￥3000</view>
					</view>
					<view class="tui-badge tui-bg__old">
						<view class="tui-scale__text">老用户专享</view>
					</view>
				</view>

				<view class="tui-list-cell">
					<view class="tui-amount__box">
						<view class="tui-amount__title">2000元</view>
						<tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button>
					</view>
					<view class="tui-amount__box">
						<view class="tui-amount__desc">充2000送100</view>
						<view class="tui-amount">￥2000</view>
					</view>
				</view>

				<view class="tui-list-cell">
					<view class="tui-amount__box">
						<view class="tui-amount__title">1000元</view>
						<tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button>
					</view>
					<!-- <view class="tui-amount__box">
						<view class="tui-amount">￥1000</view>
					</view> -->
				</view>

				<view class="tui-list-cell">
					<view class="tui-amount__box">
						<view class="tui-amount__title">500元</view>
						<tui-button type="danger" width="142rpx" height="50rpx" shape="circle" :size="24" @click="recharge">立即充值</tui-button>
					</view>
					<!-- <view class="tui-amount__box">
						<view class="tui-amount">￥500</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: true
			}
		},
		methods: {
			recharge() {
				this.tui.href('/pages/my/recharge/recharge')
			},
			toggle() {
				this.isShow = !this.isShow
			},
			records(){
				this.tui.href('/pages/my/records/records')
			},
			bankCard(){
				this.tui.href('/pages/my/bankCard/bankCard')
			},
			coupon(){
				this.tui.href('/pages/my/myCoupon/myCoupon')
			}
		},
		onNavigationBarButtonTap(e) {
			this.tui.href('/pages/my/records/records')
		}
	}
</script>

<style>
	.container {
		padding-bottom: 48rpx;
	}

	.tui-wallet__box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-content__box {
		width: 100%;
		height: 360rpx;
		border-radius: 24rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: linear-gradient(90deg, rgb(255, 89, 38), rgb(235, 9, 9));
		position: relative;
		box-shadow: 0 3rpx 20rpx rgba(235, 9, 9, 0.2);
	}

	.tui-my__assets {
		width: 100%;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		padding: 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;

	}

	.tui-my__assets image {
		width: 36rpx;
		height: 28rpx;
		margin-left: 16rpx;
		display: block;
	}

	.tui-assets__center,
	.tui-assets__bottom {
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tui-item__box {
		width: 33.3333%;
		text-align: center;
		color: #fff;
		font-size: 26rpx;
		flex-shrink: 0;
	}

	.tui-text__large {
		font-size: 40rpx;
		font-weight: bold;
	}

	.tui-assets__bottom {
		position: absolute;
		left: 0;
		bottom: 0;
		padding-top: 16rpx;
		box-shadow: 0px -5px 10px -5px rgba(255, 255, 255, .3);
	}

	.tui-assets__bottom .tui-item__box {
		width: 25%;
		font-size: 24rpx;
		padding-bottom: 16rpx;
		opacity: 0.8;
	}

	.tui-assets__bottom .tui-text__large {
		font-size: 32rpx;
	}

	.tui-recharge__box {
		width: 100%;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		border-radius: 24rpx;
		background-color: #fff;
	}

	.tui-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #222222;
		padding-bottom: 20rpx;
	}

	.tui-list-cell {
		width: 100%;
		height: 160rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #FFF0F1;
		border-radius: 10rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.tui-amount__title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.tui-amount__desc {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
	}

	.tui-amount__box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-amount {
		font-size: 26rpx;
		font-weight: 500;
		color: #333333;
		text-align: center;
		min-width: 142rpx;
		margin-left: auto;
	}

	.tui-badge {
		height: 32rpx;
		border-radius: 10rpx 0;
		font-size: 25rpx;
		font-weight: 400;
		color: #FFFFFF;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-bg__new {
		background-color: #1BABA1;
	}

	.tui-bg__appoint {
		background: #F51414;
	}

	.tui-bg__old {
		background: #FA5A0A;
	}

	.tui-scale__text {
		width: 100%;
		text-align: center;
		transform: scale(0.8);
		transform-origin: center center;
	}
	/* #ifdef MP */
	.tui-tag__box{
		position: absolute;
		right: 0;
		top: 30rpx;
		border: 1rpx solid #fff;
		border-right: 0 !important;
		color: #fff;
		font-size: 24rpx;
		border-radius: 100rpx 0 0 100rpx;
		padding: 4rpx 16rpx;
		text-align: center;
	}
	/* #endif */
</style>
