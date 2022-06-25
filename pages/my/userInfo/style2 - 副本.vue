<template>
	<view>
		<view class="tui-mybg-box">
			<view class="tui-header-center">
				<image :src="memberinfo.userpic || '/static/images/my/mine_def_touxiang_3x.png'" class="tui-avatar"
					@tap="navigateTo('/pages/my/userInfo/userInfo')">
				</image>
				<view class="tui-info" v-if="memberinfo.nickname">
					<view class="tui-nickname">
						{{memberinfo.nickname}}
						<image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>
					</view>
					<view v-if="memberinfo.gname" class="tui-explain">{{memberinfo.gname}}</view>
				</view>
				<view class="tui-login" v-if="!memberinfo.nickname" @click="login">
					<text>登录/注册</text>
					<tui-icon name="arrowright" color="#333" :size="36" unit="rpx"></tui-icon>
				</view>
				<!-- #ifndef MP -->
				<view class="tui-btn-edit" v-if="memberinfo.nickname">
					<tui-button type="white" :plain="true" shape="circle" width="92rpx" height="40rpx" :size="22"
						@click="navigateTo('/pages/my/userInfo/userInfo')">编辑</tui-button>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<view class="tui-set-box">
					<view class="tui-icon-box tui-icon-message">
						<!--<tui-icon @tap="navigateTo('/pages/my/message/message')" name="message" color="#fff" :size="26"></tui-icon>
						<view v-if="memberinfo.nickname" class="tui-badge tui-badge-white">1</view>-->
					</view>
					<view class="tui-icon-box tui-icon-setup" @tap="navigateTo('/pages/my/userInfo/userInfo')">
						<tui-icon name="setup" color="#333" :size="26"></tui-icon>
					</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<view class="tui-content-box">
			<view v-if="module=='xm_mallv3'" class="tui-box tui-order-box" style="margin-bottom: 20rpx;">
				<tui-list-cell :arrow="true" padding="0" unlined :lineLeft="false"
					@click="navigateTo('/pages/my/myOrder/myOrder?ptype=2')">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的预约</view>
						<view class="tui-cell-sub">全部预约</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list">
					<view class="tui-order-item" @tap="navigateTo('/pages/my/myOrder/myOrder?currentTab=1&ptype=2')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifukuan_3x.png" class="tui-order-icon"></image>
							<!--<view class="tui-badge tui-badge-red">1</view>-->
						</view>
						<view class="tui-order-text">待付款</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/myOrder/myOrder?currentTab=2&ptype=2')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifahuo_3x.png" class="tui-order-icon"></image>
							<!--<view class="tui-badge tui-badge-red">1</view>-->
						</view>
						<view class="tui-order-text">待服务</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/myOrder/myOrder?currentTab=3&ptype=2')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daishouhuo_3x.png" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">服务中</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/myOrder/myOrder?currentTab=5&ptype=2')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_pingjia_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="false">12</view>
						</view>
						<view class="tui-order-text">评价</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/myOrder/myOrder?currentTab=6&ptype=2')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_tuikuan_3x.png" class="tui-order-icon"></image>
							<!--<view class="tui-badge tui-badge-red">2</view>-->
						</view>
						<view class="tui-order-text">退款/售后</view>
					</view>
				</view>
			</view>

			<!--<view class="tui-box tui-assets-box">
				<view class="tui-order-list tui-assets-list">
					<view class="tui-order-item">
						<view class="tui-assets-num"><text>{{memberinfo.balance}}</text></view>
						<view class="tui-assets-text">余额</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/myCoupon/myCoupon')">
						<view class="tui-assets-num">
							<text>{{memberinfo.coupon}}</text>
							<view class="tui-badge-dot"></view>
						</view>
						<view class="tui-assets-text">优惠券</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>{{memberinfo.points}}</text>
							<view class="tui-badge-dot"></view>
						</view>
						<view class="tui-assets-text">积分</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/fx/index')">
						<view class="tui-assets-num"><text>{{memberinfo.income}}</text></view>
						<view class="tui-assets-text">佣金</view>
					</view>
				</view>
			</view>-->

			<view class="tui-box tui-tool-box">
				<view class="tui-tool-list tui-flex-wrap">
					<!--<view class="tui-tool-item">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_gift_3x.png" class="tui-tool-icon"></image>
							<image src="/static/images/mall/my/icon_tab_3x.png" class="tui-badge-icon"></image>
						</view>
						<view class="tui-tool-text">免费领好礼</view>
					</view>-->
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/records/records')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_zhihuan_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">资金明细</view>
					</view>
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/points/points')">
						<view class="tui-icon-box">
							<tui-icon name="attestation" :size="28" color="#666666"></tui-icon>
						</view>
						<view class="tui-tool-text">积分明细</view>
					</view>
					
					<view class="tui-tool-item" @tap="navigateTo('/pages/my/myCoupon/myCoupon')">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/myCoupon.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的优惠券</view>
					</view>
					<button open-type="contact" class="tui-tool-item">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_kefu_3x.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">客服服务</view>
					</button>
				</view>
			</view>
			<view class="tui-box tui-tool-box">
				<tui-list-view>
					<tui-list-cell v-if="agentconfig.level>0" @tap="navigateTo('/pages/my/fx/index')" :arrow="true">
						<view class="tui-item-box">
							<view class="tui-icon-box">
								<image src="/static/images/mall/my/fx.png" class="tui-tool-icon"></image>
							</view>
							<view class="tui-list-cell_name">推广赚钱</view>
						</view>
					</tui-list-cell>
					<tui-list-cell @tap="navigateTo('/pages/coupon/coupon')" :arrow="true">
						<view class="tui-item-box">
							<view class="tui-icon-box">
								<image src="/static/images/mall/my/icon_ticket_3x.png" class="tui-tool-icon"></image>
							</view>
							<view class="tui-list-cell_name">领券中心</view>
						</view>
					</tui-list-cell>
					<!--<tui-list-cell @tap="navigateTo('/pages/my/myOrder/myTimes')" :arrow="true">
						<view class="tui-item-box">
							<view class="tui-icon-box">
								<tui-icon name="bankcard" :size="30" color="#666666"></tui-icon>
							</view>
							<view class="tui-list-cell_name">我的次卡</view>
						</view>
					</tui-list-cell>-->
					<tui-list-cell @tap="navigateTo('/pages/my/address/address')" :arrow="true">
						<view class="tui-item-box">
							<view class="tui-icon-box">
								<image src="/static/images/mall/my/address.png" class="tui-tool-icon"></image>
							</view>
							<view class="tui-list-cell_name">地址管理</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
			</view>
			<view v-if="is_audit!=1" class="tui-box tui-tool-box">
				<tui-list-view>
					<tui-list-cell v-for="(menuitem,index) in menulist" @tap="navigateTo(menuitem.pagePath)"
						:arrow="true">
						<view class="tui-item-box">
							<view class="tui-icon-box">
								<image :src="menuitem.iconPath" class="tui-tool-liicon"></image>
							</view>
							<view class="tui-list-cell_name">{{menuitem.text}}</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
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
		<tui-tabbar :current="current">
		</tui-tabbar>
	</view>
</template>

<script>
	export default {
		name: 'Style1',
		props: {
		
		},
		data() {
			return {
				webURL: 'https://www.thorui.cn/wx',
				memberinfo: [],
				agentconfig: [],
				recommendgoods: [],
				module: this.$module,
				menulist: [],
				is_audit: 1
			};
		},
		created() {
			let _this = this;
			_this.$request.post('bottommenu.list', {
				mo: 'member'
			}).then(res => {
				if (res.errno == 0) {
					_this.menulist = res.data.list;
				}
			})
			_this.$request.get('Goods.recommend').then(res => {
				if (res.errno == 0) {
					_this.recommendgoods = res.data;
				}
			});
			_this.$request.post('config').then(res => {
				if (res.errno == 0) {
					_this.module = res.data.module
				}
			});
			_this.$request.post('config', {
				mo: 'agent'
			}).then(res => {
				if (res.errno == 0) {
					_this.agentconfig = res.data
				}
			});
		
			
			_this.$util.getUserInfo(function(userInfo) {
				//Console.log("adfs");
				_this.$request.get('member.detail', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.memberinfo = res.data;
						_this.is_audit = res.data.is_audit;
					}
				});
			})
			
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			login: function() {
				let _this = this;
				
				// #ifdef H5
				_this.$util.getmpuserinfo();
				// #endif
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/login/login'
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.showLoading({
					title: '正在登录...'
				});
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: function(ProfileRes) {
						_this.$util.getUserInfo(function(userInfo) {
							_this.$request.post('member.detail', ProfileRes.userInfo).then(res => {
								if (res.errno == 0) {
									_this.memberinfo = res.data;
								}
							})
						})
					}
				})
				// #endif

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
	.tui-header-box {
		width: 100%;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	/* #ifndef MP */
	.tui-header-icon {
		min-width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	/* #ifdef MP */
	.tui-set-box {
		width: 123rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-left: 8rpx;
		float: right;
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

	.tui-badgewhite-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #ebeea0;
	}

	.tui-mybg-box {
		width: 100%;
		height: 364rpx;
		position: relative;
		background-color: #ffffff;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 228rpx;
		left: 0;
		/* #ifdef MP-WEIXIN */
		top: 120rpx;
		/* #endif */
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-radius: 30rpx;
		background-color: #ffffff;
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

	.tui-login {
		width: 60%;
		padding-left: 30rpx;
		font-size: 32rpx;
		line-height: 32rpx;
		color: #333;
		display: flex;
		align-items: center;
	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
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
		color: #333;
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
		top: 260rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
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
		top: 1rpx;
		/*top: -72rpx;*/
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
		justify-content: space-between;
	}

	.tui-order-item {
		flex: 1;
		display: flex;
		float: left;
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
		line-height: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 118rpx;
		margin-top: 20rpx;
		padding-top: 30rpx;
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
	}

	.tui-tool-list {
		width: 100%;
		padding-top: 15rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		background-color: #fff;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-tool-liicon {
		width: 50rpx;
		height: 50rpx;
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
		padding-bottom: 100rpx;
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

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
