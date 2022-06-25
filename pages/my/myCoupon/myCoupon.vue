<template>
	<view class="container">
		<tui-tabs :tabs="tabs" :currentTab="currentTab" selectedColor="#E41F19" sliderBgColor="#E41F19" @change="change"
			itemWidth="33.33333%" :isFixed="scrollTop>=0"></tui-tabs>
		<view class="tui-coupon-list" :class="{'tui-mtop':scrollTop>=0}">
			<view class="tui-coupon-item tui-top20" v-for="(item,index) in couponList" :key="index">
				<image src="/static/images/mall/coupon/bg_coupon_3x.png" class="tui-coupon-bg" mode="widthFix">
				</image>
				<image  v-if="currentTab==1" src="/static/images/mall/coupon/img_coupon_beused_3x.png" class="tui-coupon-sign"></image>
				<image  v-if="currentTab==2" src="/static/images/mall/coupon/img_coupon_failure_3x.png" class="tui-coupon-sign"></image>
				<view class="tui-coupon-item-left">
					<view class="tui-coupon-price-box" :class="{'tui-color-grey':i>0}">
						<view class="tui-coupon-price-sign" v-if="item.coupon_type==10">￥</view>
						<view class="tui-coupon-price" v-if="item.coupon_type==10"
							:class="{'tui-price-small':item.reduce_price.toString().length>4}">{{item.reduce_price}}
						</view>
						<view class="tui-coupon-price" v-if="item.coupon_type==20">{{item.discount}}</view>
						<view class="tui-coupon-price-sign" v-if="item.coupon_type==20">折</view>
					</view>
					<view class="tui-coupon-intro">满{{item.min_price}}元可用</view>
				</view>
				<view class="tui-coupon-item-right">
					<view class="tui-coupon-content">
						<view class="tui-coupon-title-box">
							<view class="tui-coupon-btn" :class="{'tui-bg-grey':i>0}">全场券</view>
							<view class="tui-coupon-title">全部商品可用</view>
						</view>
						<view class="tui-coupon-rule">
							<view class="tui-rule-box tui-padding-btm">
								<view class="tui-coupon-circle"></view>
								<view class="tui-coupon-text">不可叠加使用</view>
							</view>
							<view class="tui-rule-box">
								<view class="tui-coupon-circle"></view>
								<view v-if="item.expire_type==10" class="tui-coupon-text">自领取之日起{{item.expire_day}}天有效
								</view>
								<view v-if="item.expire_type==20" class="tui-coupon-text">
									{{item.start_time}}至{{item.end_time}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tui-btn-box" v-if="currentTab==0">
					<tui-button @click="goindex" type="danger" width="152rpx" height="52rpx" :size="24" shape="circle" plain>立即使用
					</tui-button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: "未使用"
				}, {
					name: "已使用"
				}, {
					name: "已过期"
				}],
				currentTab: 0,
				scrollTop: 0,
				couponList:[]
			}
		},
		onLoad() {
			this.getCoupons();
		},
		methods: {
			goindex: function() {
				this.sam.navigateTo('/pages/index/index');
			},
			change(e) {
				this.currentTab = e.index;
				this.getCoupons();
			},
			getCoupons: function() { // 读取可领取券列表
				var _this = this;
				_this.$request.get('couponreceive.mylist', {
					ptype: _this.currentTab,
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.couponList = res.data;
					}
				})
			}
		},
		onPullDownRefresh() {
			let index = this.currentTab
			this.getCoupons()
		},
		onReachBottom() {
			let index = this.currentTab
			if (!this.couponList[index].pullUpOn) return;
			this.getCoupons()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-mtop {
		margin-top: 80rpx;
	}

	.tui-coupon-list {
		width: 100%;
		padding: 0 25rpx;
		box-sizing: border-box;
	}

	.tui-coupon-banner {
		width: 100%;
	}

	.tui-coupon-item {
		width: 100%;
		height: 210rpx;
		position: relative;
		display: flex;
		align-items: center;
		padding-right: 30rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-coupon-bg {
		width: 100%;
		height: 210rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.tui-coupon-sign {
		height: 110rpx;
		width: 110rpx;
		position: absolute;
		z-index: 9;
		top: -30rpx;
		right: 40rpx;
	}

	.tui-coupon-item-left {
		width: 218rpx;
		height: 210rpx;
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
	}

	.tui-coupon-price-box {
		display: flex;
		color: #e41f19;
		align-items: flex-end;
	}

	.tui-coupon-price-sign {
		font-size: 30rpx;
	}

	.tui-coupon-price {
		font-size: 70rpx;
		line-height: 68rpx;
		font-weight: bold;
	}

	.tui-price-small {
		font-size: 58rpx !important;
		line-height: 56rpx !important;
	}


	.tui-coupon-intro {
		background: #F7F7F7;
		padding: 8rpx 10rpx;
		font-size: 26rpx;
		line-height: 26rpx;
		font-weight: 400;
		color: #666;
		margin-top: 18rpx;
	}

	.tui-coupon-item-right {
		flex: 1;
		height: 210rpx;
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 24rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-coupon-content {
		width: 82%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tui-coupon-title-box {
		display: flex;
		align-items: center;
	}

	.tui-coupon-btn {
		padding: 6rpx;
		background: #FFEBEB;
		color: #e41f19;
		font-size: 25rpx;
		line-height: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: scale(0.9);
		transform-origin: 0 center;
		border-radius: 4rpx;
		flex-shrink: 0;
	}

	.tui-color-grey {
		color: #888 !important;
	}

	.tui-bg-grey {
		background: #F0F0F0 !important;
		color: #888 !important;
	}

	.tui-coupon-title {
		width: 100%;
		font-size: 26rpx;
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-coupon-rule {
		padding-top: 52rpx;
	}

	.tui-rule-box {
		display: flex;
		align-items: center;
		transform: scale(0.8);
		transform-origin: 0 100%;
	}

	.tui-padding-btm {
		padding-bottom: 6rpx;
	}

	.tui-coupon-circle {
		width: 8rpx;
		height: 8rpx;
		background: rgb(160, 160, 160);
		border-radius: 50%;
	}

	.tui-coupon-text {
		font-size: 28rpx;
		line-height: 28rpx;
		font-weight: 400;
		color: #666;
		padding-left: 8rpx;
		white-space: nowrap;
	}

	.tui-top20 {
		margin-top: 20rpx;
	}

	.tui-coupon-title {
		font-size: 28rpx;
		line-height: 28rpx;
	}

	.tui-btn-box {
		position: absolute;
		width: 146rpx;
		height: 52rpx;
		right: 20rpx;
		bottom: 40rpx;
		z-index: 10;
	}
</style>
