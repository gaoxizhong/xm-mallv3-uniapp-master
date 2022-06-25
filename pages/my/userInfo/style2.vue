<template>
	<view>
		<view class="mine-top">
			<view class="left">
				<image :src="memberinfo.userpic || '/static/images/my/mine_def_touxiang_3x.png'"
					@tap="navigateTo('/pages/my/userInfo/userInfo')" class="head-img"></image>
				<view v-if="memberinfo.nickname">
					<view class="name">
						{{memberinfo.nickname}}
					</view>
					<view v-if="memberinfo.telephone" class="tel">
						{{memberinfo.telephone}}
					</view>
				</view>
				<view v-else>
					<view class="name" @click="login">
						登录/注册
					</view>
					<view class="tel">

					</view>
				</view>
			</view>
			<view class="right">
				<text class="tag">40</text>
				<image src="../../../static/images/mine/mine_msg.png" mode=""></image>
			</view>
		</view>
		<view class="mine-menu menu-content">
			<view class="title">
				我的订单
			</view>
			<view class="mine-menu-list menu-content">
				<navigator url="/pages/my/myOrder/myOrder?ptype=2" class="mine-menu-item">
					<image src="../../../static/images/mine/dj_icon.png" style="width: 60rpx;" mode=""></image>
					<text>到家订单</text>
				</navigator>
				<navigator url="/pages/my/myOrder/myOrder?ptype=2" class="mine-menu-item">
					<image src="../../../static/images/mine/xh_icon.png"></image>
					<text>洗护订单</text>
				</navigator>
			</view>
		</view>
		<view class="mine-serve menu-content">
			<view class="title">
				工具与服务
			</view>
			<view class="serve-menu-list">
				<navigator url="/pages/my/address/address" class="serve-menu-item">
					<image src="../../../static/images/mine/mine_dz.png" mode=""></image>
					<text>地址信息</text>
				</navigator>
				<navigator url="/pages/coupon/coupon" class="serve-menu-item">
					<image src="../../../static/images/mine/mine_yhq.png"></image>
					<text>优惠券</text>
				</navigator>
				<navigator url="/pages/my/points/points" class="serve-menu-item">
					<image src="../../../static/images/mine/mine_jf.png"></image>
					<text>我的积分</text>
				</navigator>
				<navigator url="" class="serve-menu-item">
					<image src="../../../static/images/mine/mine_kf.png"></image>
					<text>联系客服</text>
				</navigator>
				<navigator url="" class="serve-menu-item">
					<image src="../../../static/images/mine/mine_xy.png"></image>
					<text>服务协议</text>
				</navigator>
			</view>
		</view>
		<button @click="logout" type="default" class="exit-btn">退出</button>

		<view class="common-mask" v-if="exitMask">
			<view class="mask-content">
				<view class="text-center text">确定是否退出当前账号?</view>
				<view class="footer-btn">
					<text @click="cancelLoginOut()">否</text>
					<text @click="exitLogin()">是</text>
				</view>
			</view>
		</view>
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
				if (uni.getStorageSync('is_logout') != '1') {
					_this.$request.get('member.detail', {
						samkey: (new Date()).valueOf()
					}).then(res => {
						if (res.errno == 0) {
							_this.memberinfo = res.data;
							_this.is_audit = res.data.is_audit;
						}
					});
				}

			})

		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			logout: function() {
				uni.showModal({
					title: '提示',
					cancelText:'否',
					confirmText:'是',
					content: '确定是否退出当前账号',
					showCancel: true,
					//是否显示取消按钮 
					success: function(res) {
						if (res.cancel) { //点击取消,默认隐藏弹框
						} else {
							uni.setStorageSync('is_logout', '1');
							uni.reLaunch({
								url: '/pages/my/userInfo/index'
							});
						}
					}
				});

			},
			login: function() {
				uni.setStorageSync('is_logout', '');
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
	page {
		background-color: #f5f5f5;
	}

	.mine-top {
		margin: 30rpx;
		padding: 90rpx 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mine-top .left {
		display: flex;
		align-items: center;
	}

	.mine-top .left image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		background-color: #000000;
		margin-right: 30rpx;
	}

	.mine-top .left .name {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.mine-top .left .tel {
		font-size: 28rpx;
		color: #999;
	}

	.mine-top .right {
		width: 60rpx;
		height: 56rpx;
		position: relative;
	}

	.mine-top .right .tag {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		position: absolute;
		background-color: #FF3851;
		text-align: center;
		border-radius: 50%;
		right: -10rpx;
		top: -20rpx;
		color: #fff;
		font-size: 20rpx;
		z-index: 10;
	}

	.mine-top .right image {
		width: 100%;
		height: 100%;
	}

	.menu-content {
		margin: 30rpx;
		border-radius: 10rpx;
		padding: 40rpx 30rpx;
		background-color: #fff;
	}

	.menu-content .title {
		font-size: 32rpx;
		font-weight: bold;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #d8d8d8;
	}

	.mine-menu-list,
	.serve-menu-list {
		display: flex;
		justify-content: space-between;
	}

	.mine-menu-list {
		margin: 0 100rpx;
	}

	.mine-menu-item,
	.serve-menu-item {
		color: #666;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.serve-menu-item image {
		display: block;
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 20rpx;
	}

	.mine-menu-item image {
		width: 68rpx;
		height: 60rpx;
		margin-bottom: 20rpx;
	}

	.exit-btn {
		display: block;
		width: 690rpx;
		height: 88rpx;
		line-height: 88rpx;
		margin: 80rpx auto 0;
		border-radius: 44rpx;
		background-color: #FFFFFF;
		border: 1px solid #D8D8D8;
		color: #999;
		font-size: 30rpx;
	}

	.common-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 100;
		background: rgba(23, 23, 23, .3);
	}

	.mask-content {
		background: #FFFFFF;
		box-shadow: 0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.12);
		border-radius: 24rpx;
		width: 610rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding-top: 78rpx;
	}

	.mask-content .text {
		font-size: 32rpx;
		font-weight: 600;
		text-align: center;
	}

	.mask-content .footer-btn {
		margin-top: 78rpx;
		border-top: 1px solid #E6E9ED;
		display: flex;
		justify-content: space-between;
	}

	.mask-content .footer-btn text {
		display: inline-block;
		width: 50%;
		text-align: center;
		height: 84rpx;
		line-height: 84rpx;
		font-size: 24rpx;
	}

	.mask-content .footer-btn text:last-child {
		border-left: 1px solid #E6E9ED;
		color: #1E7147;
	}
</style>
