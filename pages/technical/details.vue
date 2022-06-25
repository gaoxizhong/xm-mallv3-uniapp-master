<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{ height: height + 'px', background: 'rgba(255,255,255,' + opcity + ')' }">
			<view class="tui-header" :style="{ paddingTop: top + 'px', opacity: opcity }">主页</view>
			<view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
				<view class="tui-icon-box" :style="{ backgroundColor: 'rgba(0, 0, 0,' + iconOpcity + ')' }" @tap="back">
					<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				</view>
			</view>
		</view>
		<!--header-->

		<!--banner-->
		<view class="tui-banner-swiper">
			<image mode="widthFix" :src="detail.touxiang || '/static/images/my/mine_def_touxiang_3x.png'"
				class="tui-slide-image" @load="setswiperHeight" />
		</view>
		<!--banner-->
		<view class="tui-pro-detail">
			<view class="tui-product-title tui-border-radius">
				<view class="tui-namebox tui-padding">
					<view class="tui-name">
						<view><text>{{detail.title}}</text> <text class="keyi">今天可约</text></view>
						<view class="tui-identitylabel tui-gray">
							<text>实名认证</text>
							<!--<text>河北人</text><text>30岁</text>-->
						</view>
					</view>
					<view class="tui-collection tui-size" @tap="collecting">
						<tui-icon :name="collected ? 'like-fill' : 'like'" :color="collected ? '#ff201f' : '#333'"
							:size="20"></tui-icon>
						<view class="tui-scale-collection" :class="{'tui-icon-red':collected}">关注</view>
						<view class="tui-scale-collection">325人浏览</view>
					</view>
				</view>

				<view class="tui-list-cell" :data-id="detail.sid" @tap="goStore">
					<view class="tui-selected-box">{{detail.store}}</view>
				</view>
				<view v-if="detail.introduction" class="tui-container">
					{{detail.introduction || ''}}
				</view>
				<view class="tui-guarantee">
					<view class="tui-guarantee-item">
						<tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
						<text class="tui-pl">随时预约</text>
					</view>
					<view class="tui-guarantee-item">
						<tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
						<text class="tui-pl">专业工具</text>
					</view>
					<view class="tui-guarantee-item">
						<tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
						<text class="tui-pl">受专业培训</text>
					</view>
					<view class="tui-guarantee-item">
						<tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
						<text class="tui-pl">省心省钱</text>
					</view>
				</view>
			</view>

			<view class="tui-radius-all tui-mtop">
				<tui-list-cell padding="30rpx">
					<view class="tui-combination-text tui-between">
						<view class="tui-combination-title">服务的项目</view>
					</view>
				</tui-list-cell>

				<block v-for="(item, index) in detail.goodslist" :key="index">
					<view :data-url="'/pages/goodsDetail/goodsDetail?id=' + item.id + '&uuid=' + detail.uuid" @tap="navigationTo"
						class="border-flex">
						<!-- 图片 -->
						<view class="border-left">
							<image mode="widthFix" :src="item.image" />
						</view>
						<!-- 文字 -->
						<view class="border-right">
							<view>{{item.name}}</view>
							<view class="price">
								<view class="left-box">￥{{item.price}} </view>
								<view class="right-box">
									<tui-tag type="red" shape="circle" padding="12rpx 24rpx" size="24rpx">立即预约</tui-tag>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="tui-safearea-bottom"></view>
		</view>
	</view>
</template>

<script>
	const thorui = require('@/components/common/tui-clipboard/tui-clipboard.js');
	const poster = require('@/components/common/tui-poster/tui-poster.js');
	import uParse from '@/components/jyf-parser/jyf-parser';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				detail: {},
				windowWidth: 0,
				height: 64, //header高度
				top: 26, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				swiperHeight: 343,
				opcity: 0,
				iconOpcity: 0.5,
				banner: [],
				bannerIndex: 0,
				collected: false,
				winWidth: uni.upx2px(560 * 2),
				winHeight: uni.upx2px(890 * 2)
			};
		},
		onLoad: function(e) {
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
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						console.log(res);
						this.width = obj.left || res.windowWidth;
						this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight +
							44;
						this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res
							.statusBarHeight + 6;
						this.scrollH = res.windowWidth;
						this.windowWidth = res.windowWidth;
					}
				});
			}, 0);

			this.getDetail(e.id);

		},
		onShow() {
			this.sam.login();
		},
		methods: {
			navigationTo: function(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			},
			goStore: function(e) {
				var id = e.currentTarget.dataset.id;
				if (id > 0) {
					uni.navigateTo({
						url: '/pages/store_details/store_details?id=' + e.currentTarget.dataset.id
					});
				}

			},
			getDetail(sId) {
				const _this = this;
				_this.$request.get('technical.detail', {
					id: sId
				}).then(res => {
					if (res.errno == 0) {
						_this.detail = res.data
					}
				});
			},

			back: function() {
				uni.navigateBack();
			},
			collecting: function() {
				this.collected = !this.collected;
			},

			navigateTo(url) {
				this.sam.navigateTo(url);
			},

			setswiperHeight(e) {
				//console.log(e);
				this.swiperHeight = e.detail.height * (this.windowWidth / e.detail.width);
			}
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity);
		},
		//发送给朋友
		onShareAppMessage: function() {
			let _this = this;
			_this.sam.login().then(res => {
				console.log("/pages/technical/details?id=" + _this.detail.id + "&referrer_id=" + res
					.uid)
				return {
					title: _this.detail.title || "",
					path: "/pages/technical/details?id=" + _this.detail.id + "&referrer_id=" + res
						.uid,
				};
			});
		},
		onShareTimeline(res) { //分享到朋友圈
			return {}
		}
	};
</script>
<style>
	/* 商品详情图样式 */
	.pro_detailImg {
		width: 100%;
	}

	.pro_detailImg img {
		width: 100%;
		height: auto;
		display: block;
	}

	.pro_detailImg {
		display: flex;
		flex-direction: column;
		transform: translateZ(0);
	}

	.pro_detailImg image {
		width: 100%;
		display: block;
	}

	page {
		background-color: #f7f7f7;
	}

	.container {
		padding-bottom: 110rpx;
	}

	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 995;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20rpx;
	}

	.tui-icon-box {
		position: relative;
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-banner-swiper {
		position: relative;
	}

	.tui-video__box {
		width: 166rpx;
		height: 60rpx;
		position: absolute;
		left: 50%;
		bottom: 50rpx;
		transform: translateX(-50%);
		z-index: 2;
	}

	.tui-video__box image {
		width: 166rpx;
		height: 60rpx;
	}

	.tui-video__box view {
		width: 100%;
		height: 100%;
		font-size: 24rpx;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		padding-left: 66rpx;
		box-sizing: border-box;
	}

	.tui-banner-tag {
		position: absolute;
		color: #fff;
		bottom: 30rpx;
		right: 0;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*顶部菜单*/

	.tui-menu-box {
		box-sizing: border-box;
	}

	.tui-menu-header {
		font-size: 34rpx;
		color: #fff;
		height: 32px;
		display: flex;
		align-items: center;
	}

	.tui-menu-itembox {
		color: #fff;
		padding: 40rpx 10rpx 0 10rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		font-size: 26rpx;
	}

	.tui-menu-item {
		width: 22%;
		height: 160rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		margin-right: 4%;
		margin-bottom: 4%;
	}

	.tui-menu-item:nth-of-type(4n) {
		margin-right: 0;
	}

	.tui-badge-box {
		position: relative;
	}

	.tui-badge-box .tui-badge-class {
		position: absolute;
		top: -8px;
		right: -8px;
	}

	.tui-msg-badge {
		top: -10px;
	}

	.tui-icon-up_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-menu-text {
		padding-top: 12rpx;
	}

	.tui-opcity .tui-menu-text,
	.tui-opcity .tui-badge-box {
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
	}

	/*顶部菜单*/

	/*内容 部分*/

	.tui-padding {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-ml-auto {
		margin-left: auto;
	}

	/* #ifdef H5 */
	.tui-ptop {
		padding-top: 44px;
	}

	/* #endif */

	.tui-size {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-gray {
		color: #999;
	}

	.tui-icon-red {
		color: #ff201f;
	}

	.tui-border-radius {
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		overflow: hidden;
	}

	.tui-radius-all {
		border-radius: 24rpx;
		overflow: hidden;
	}

	.tui-mtop {
		margin-top: 26rpx;
	}

	.tui-pro-detail {
		box-sizing: border-box;
		color: #333;
	}

	.tui-product-title {
		background: #fff;
		padding-top: 20rpx;
	}

	.tui-namebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333333;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 44rpx;
	}


	.tui-name {
		align-items: center;
	}

	.tui-name .keyi {
		font-size: 24rpx;
		color: #c55756;
		font-weight: normal;
		background-color: #f2e7eb;
		padding-left: 5rpx;
		padding-right: 5rpx;
		margin-left: 20rpx;
		border-radius: 5rpx;
		border: 1rpx solid #c55756;

	}

	.tui-identitylabel {
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 10rpx 0rpx;
		box-sizing: border-box;
		font-weight: normal;
	}

	.tui-identitylabel text {
		background-color: #eee;
		padding-left: 5rpx;
		padding-right: 5rpx;
		margin-right: 10rpx;
		border-radius: 5rpx;
	}

	.points_goods {
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		font-weight: normal;
	}

	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.tui-scale-collection {
		transform: scale(0.7);
		transform-origin: center 90%;
		line-height: 24rpx;
		font-weight: normal;
		margin-top: 4rpx;
	}

	.tui-pro-titbox {
		font-size: 32rpx;
		font-weight: 500;
		position: relative;
		padding: 0 150rpx 0 30rpx;
		box-sizing: border-box;
	}

	.tui-pro-title {
		padding-top: 20rpx;
	}

	.tui-sub-title {
		padding: 20rpx 0;
		line-height: 32rpx;
	}

	.tui-list-cell {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		line-height: 20rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-right {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.tui-top40 {
		top: 40rpx !important;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126rpx;
	}

	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-flex-center {
		display: flex;
		align-items: center;
	}


	.tui-cell-title {
		width: 66rpx;
		padding-right: 30rpx;
		flex-shrink: 0;
	}

	.tui-promotion-box {
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		width: 80%;
	}

	.tui-promotion-box text {
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}



	.tui-addr-box {
		width: 76%;
	}

	.tui-addr-item {
		padding: 10rpx;
		line-height: 34rpx;
	}

	.tui-container {
		color: #666;
		padding: 20rpx 30rpx 10rpx 30rpx;
		font-size: 24rpx;
	}

	.tui-guarantee {
		background: #fcf9f0;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx 20rpx 30rpx;
		font-size: 24rpx;
	}

	.tui-guarantee-item {
		color: #999;
		padding-right: 30rpx;
	}

	.tui-pl {
		padding-left: 4rpx;
	}

	.tui-cmt-box {
		background: #fff;
	}

	.tui-between {
		justify-content: space-between !important;
	}

	.tui-cmt-all {
		color: #ff201f;
		padding-right: 8rpx;
	}

	.tui-cmt-content {
		font-size: 26rpx;
	}

	.tui-cmt-user {
		display: flex;
		align-items: center;
	}

	.tui-acatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: block;
		margin-right: 16rpx;
	}

	.tui-cmt {
		padding: 14rpx 0;
	}

	.tui-attr {
		font-size: 24rpx;
		color: #999;
		padding: 6rpx 0;
	}

	.tui-cmt-btn {
		padding: 50rpx 0 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-nomore-box {
		padding-top: 10rpx;
	}

	.tui-product-img {
		display: flex;
		flex-direction: column;
		transform: translateZ(0);
	}

	.tui-product-img image {
		width: 100%;
		display: block;
	}

	/*底部操作栏*/

	.tui-col-7 {
		width: 65%;
	}

	.tui-col-5 {
		width: 35%;
	}

	.tui-operation {
		width: 100%;
		height: 100rpx;
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.item-button {
		padding-top: 8rpx;
		padding-bottom: 1rpx;
		padding-left: 0px;
		padding-right: 0px;
		background-color: #fff;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
		font-size: 18px;
		text-align: center;
		text-decoration: none;
		line-height: 22px;
		border-radius: 0px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		cursor: pointer;
		color: #333;
	}

	.tui-operation-text {
		font-size: 22rpx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100rpx;
		padding: 0 12rpx;
		box-sizing: border-box;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-flex-1 {
		flex: 1;
		padding: 6rpx;
	}


	.tui-combination-text {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-combination-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
		padding-left: 16rpx;
		border-left: 2px solid #eb0909;
		box-sizing: border-box;
	}

	.tui-sub__title {
		font-size: 26rpx;
		padding-right: 30rpx;
	}

	.tui-step__box {
		width: 100%;
		height: 210rpx;
		background: #fff;
		padding: 0 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.border-flex {
		display: flex;
		width: 100%;
		background-color: #ffffff;
		align-items: center;
		padding: 30rpx 0;
	}

	.border-left image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 10rpx;
		text-align: center;
	}

	.border-left,
	.border-right,
	.total,
	.suit {
		margin-left: 20rpx;
	}

	.suit {
		font-weight: bold;
		font-size: 26rpx;
		margin-left: 20rpx;
	}

	.border-right {
		line-height: 50rpx;
		font-size: 26rpx;
		width: 100%;
		margin-right: 20rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 30rpx;
		overflow: hidden;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-tool-icon-box {
		position: relative;
	}

	.tui-tool-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
		line-height: 24rpx;
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

	.price {
		width: 100%;
		font-size: 30rpx;
		color: #eb0909;
		display: flex;
	}

	.left-box {
		width: 72%;
	}

	.right-box {
		width: 28%;
		text-align: right;
		float: right;
	}
</style>
