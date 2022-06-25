<template>
	<view>
		<view class="tui-mybg-box">
			<view class="tui-header-center">
				<image :src="agentinfo.touxiang || '/static/images/my/mine_def_touxiang_3x.png'" class="tui-avatar"
					@tap="navigateTo('/pages/my/userInfo/userInfo')"></image>
				<view class="tui-info">
					<view class="tui-nickname">
						{{agentinfo.title}}
						<image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>
					</view>
					<view class="tui-explain">邀请码:{{agentinfo.agent_code}}</view>
				</view>
			</view>
		</view>
		<view class="tui-content-box">
			<view class="tui-box tui-assets-box">
				<tui-list-cell padding="0" unlined :hover="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的收益</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-assets-list">
					<view class="tui-order-item">
						<view class="tui-assets-num"><text>{{agentinfo.total_income}}</text></view>
						<view class="tui-assets-text">总收入</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>{{agentinfo.income}}</text>
						</view>
						<view class="tui-assets-text">本月收入</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>{{agentinfo.income}}</text>
						</view>
						<view class="tui-assets-text">可提现</view>
					</view>
				</view>
			</view>

			<view class="tui-box tui-tool-box">
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item">
						<view class="tui-icon-box"  @tap="navigateTo('/pages/my/fx/poster')">
							<image src="/static/images/mall/my/QRcode.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">推广海报</view>
					</view>
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/fx/setagentcode')">
						<view class="tui-icon-box">
							<tui-icon name="attestation" :size="28" color="#666666"></tui-icon>
						</view>
						<view class="tui-tool-text">设置邀请码</view>
					</view>
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/fx/team')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/sub_account.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的团队</view>
					</view>
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/fx/commisionlog')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_ticket_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">返佣明细</view>
					</view>
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/fx/teamOrder')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_kaipiao_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">分佣订单</view>
					</view>
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/withdraw/withdrawlog?mo=agent')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_zhihuan_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">提现记录</view>
					</view>
					<view v-if="agentinfo.is_audit!=1" class="tui-tool-item" @tap="navigateTo('/pages/my/withdraw/withdraw?mo=agent')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_fanxian_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">提现</view>
					</view>
					<view v-if="agentinfo.is_audit!=1" class="tui-tool-item" @tap="navigateTo('/pages/my/memberbankcard/memberbankcard')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/myCoupon.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">提现帐号</view>
					</view>
				</view>
			</view>

			<!--为你推荐-->
			<block v-if="recommendgoods.length>0">
				<tui-divider :size="28" :bold="true" color="#333" width="50%">为你推荐</tui-divider>
				<view class="tui-product-list">
					<view class="tui-product-container">
						<block v-for="(item, index) in recommendgoods" :key="index">
							<!--商品列表-->
							<view class="tui-pro-item" hover-class="hover" :hover-start-time="150"
								@tap="navigateTo('/pages/goodsDetail/goodsDetail?id='+item.id)">
								<image :src="item.pic" class="tui-pro-img" mode="widthFix" />
								<view class="tui-pro-content">
									<view class="tui-pro-tit">{{ item.name }}</view>
									<view>
										<view class="tui-pro-price">
											<text v-if="item.is_points_goods==1" class="tui-sale-price">积分:{{ item.pay_points }}</text>
											<text v-if="item.is_points_goods!=1" class="tui-sale-price">￥{{ item.price }}</text>
											<text v-if="item.costs>0" class="tui-factory-price">￥{{ item.costs }}</text>
										</view>
										<view class="tui-pro-pay">{{ item.sale_count }}人付款</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webURL: 'https://www.thorui.cn/wx',
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
				agentinfo: [],
				recommendgoods: []
			};
		},
		onLoad: function(options) {
			let _this = this;
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
					this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
					this.scrollH = res.windowWidth * 0.6;
				}
			});
			_this.$request.get('Goods.recommend').then(res => {
				if (res.errno == 0) {
					_this.recommendgoods = res.data;
				}
			});

		},
		onShow() {
			let _this = this;
			_this.$request.get('agent.check', {
					samkey: (new Date()).valueOf()
				}).then(res => {
				if (res.errno == 0) {
					if(!res.data.id){
						uni.showModal({
						  title: '提示',
						  content: res.msg,
						  showCancel: false,
						  //是否显示取消按钮 
						  success: function (res) {
						    if (res.cancel) {//点击取消,默认隐藏弹框
						    } else {
								uni.reLaunch({
									url: "/pages/login/reg?ptype=agent"
								});
						    }
						  }
						});
					}else{
						_this.agentinfo = res.data;
					}
				}
			});
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 200);
		},
		onReachBottom: function() {

		}
	};
</script>

<style>
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #f74d54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #f74d54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #f74d54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 264rpx;
		position: relative;
		background-color: #e41f19;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 18rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		display: block;
	}

	.tui-info {
		width: 60%;
		padding-left: 30rpx;
	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -100rpx;
		z-index: 10;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 30rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 208rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 178rpx;
		margin-top: 20rpx;
	}

	.tui-assets-list {
		height: 84rpx;
	}

	.tui-assets-num {
		font-size: 38rpx;
		font-weight: 500;
		color: #333;
		font-weight: bold;
		position: relative;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	/*为你推荐*/
	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.tui-pro-item {
		background: #fff;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 12rpx;
		width: 48%;
		margin-left: 1%;
		margin-right: 1%;
		margin-bottom: 2%;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>
