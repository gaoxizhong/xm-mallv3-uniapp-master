<template>
	<view>
		<view class="tui-mybg-box">
			<view class="tui-header-center">
				<image :src="technical.touxiang || '/static/images/my/mine_def_touxiang_3x.png'" class="tui-avatar"></image>
				<view class="tui-info">
					<view class="tui-nickname">
						{{technical.title}}
					</view>
					<view class="tui-explain">平台</view>
				</view>
			</view>
		</view>
		<view class="tui-content-box">
			<view class="tui-box tui-order-box" style="margin-top: 20rpx;">
				<tui-list-cell :arrow="true" padding="0" unlined :lineLeft="false"
					@click="navigateTo('/pages/my/admintechnical/order?ptype=2')">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的订单数据</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list">
					<view class="tui-order-item" @tap="navigateTo('/pages/my/admintechnical/order?currentTab=1&ptype=2')">
						<view class="tui-assets-num"><text>{{technical.statistical.status2}}</text></view>
						<view class="tui-order-text">未开始</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/admintechnical/order?currentTab=2&ptype=2')">
						<view class="tui-assets-num"><text>{{technical.statistical.status3}}</text></view>
						<view class="tui-order-text">进行中</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/admintechnical/order?currentTab=3&ptype=2')">
						<view class="tui-assets-num"><text>{{technical.statistical.status5}}</text></view>
						<view class="tui-order-text">已完成</view>
					</view>
					<view class="tui-order-item" @tap="navigateTo('/pages/my/admintechnical/order?currentTab=4&ptype=2')">
						<view class="tui-assets-num"><text>{{technical.statistical.status4}}</text></view>
						<view class="tui-order-text">已取消</view>
					</view>
				</view>
			</view>
			
			<view style="padding-top: 100rpx;">
				<view class="tui-btn-box">
					<tui-button @tap="business" v-if="technical.is_business==1" :shadow="false" height="88rpx" shape="circle" type="green">下班
					</tui-button>
					<tui-button @tap="business" v-else :shadow="false" height="88rpx" shape="circle" type="green">上班
					</tui-button>
				</view>
				<view class="tui-btn-box">
					<tui-button open-type="contact"  :shadow="false" height="88rpx" shape="circle" type="white">联系客服
					</tui-button>
				</view>
				<view class="tui-btn-box">
					<tui-button @tap="logout"  :shadow="false" height="88rpx" shape="circle" type="white">退出
					</tui-button>
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
				agentconfig: [],
				recommendgoods: [],
				module: this.$module,
				technical: [],
				is_audit: 1
			};
		},
		created() {
			// #ifdef MP-WEIXIN
			uni.hideHomeButton();
			// #endif
			let _this = this;
			_this.$request.get('admintechnical.check',{samkey: (new Date()).valueOf()}).then(res => {
				if (res.errno == 0) {
					if(res.data==0 || uni.getStorageSync('is_technicallogout') == '1'){
						uni.showModal({
						  title: '提示',
						  content: res.message || '请先登录！',
						  showCancel: false,
						  //是否显示取消按钮 
						  success: function (res) {
						    if (res.cancel) {//点击取消,默认隐藏弹框
						    } else {
							 uni.reLaunch({
							 	url: '/pages/login/login?ptype=technical'
							 });
						    }
						  }
						});
					}else{
						_this.technical = res.data;
					}
				}
			});
		},
		methods: {
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
							uni.setStorageSync('is_technicallogout', '1');
							uni.reLaunch({
								url: '/pages/login/login?ptype=technical'
							});
						}
					}
				});
			
			},
			business(){
				let _this = this;
				_this.$request.post('admintechnical.business',{id:_this.technical.id,samkey: (new Date()).valueOf()}).then(res => {
					if (res.errno == 0) {
						_this.technical = res.data;
					}
				});
			},
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
			},
			scancode: function () {
			    var _this = this;
			    // 允许从相机和相册扫码
			    uni.scanCode({
			        success: function (res) {
						if(res.path){
							uni.navigateTo({
								url: '/'+res.path
							});
						}
			            //console.log('条码类型：' + res.scanType);
			            //console.log('条码内容：' + res.path);
			        }
			    });
			  },
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
		/*background-color: #e41f19;*/
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
		justify-content: space-between;
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
	.tui-btn-box {
		padding: 40rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
	}
</style>
