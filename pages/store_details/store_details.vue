<template>
	<view class="container">
		<view class="tui-shop__info">
			<image :src="storeDetail.store_logo" class="tui-logo"></image>
			<view class="tui-shop__desc">
				<view class="tui-shop__name">
					<text>{{storeDetail.title}}</text>
				</view>
				<view class="tui-shop__rate">
					<!--<view class="tui-rate__box"><tui-rate :current="5" :score="0.6" disabled :size="12"></tui-rate></view>-->
					<view class="tui-shop__address">{{storeDetail.address}}</view>
				</view>
			</view>
			<!--
			<view class="tui-btn__follow">
				<tui-button :size="24" width="116rpx" height="48rpx" shape="circle" type="danger">
					<tui-icon name="like" color="#fff" :size="24" unit="rpx"></tui-icon>
					<text class="tui-follow__text">关注</text>
				</tui-button>
				<tui-button :size="24" width="116rpx" height="48rpx" shape="circle" type="white" disabled>已关注</tui-button>
			</view>-->
		</view>
		<tui-tabs @change="change" :currentTab="current" :tabs="tabs" itemWidth="33%" backgroundColor="#5796fd"
			color="rgba(255,255,255,.7)" selectedColor="#fff" sliderBgColor="#fff" bottom="8rpx" unlined :size="30"
			:sliderWidth="60"></tui-tabs>
		<!--=======推荐 start=======-->
		<view class="tui-items__1 tui-padding" v-if="current == 0">
			<view class="tui-ranking__header">
				<view class="tui-ranking__title">排行榜</view>
			</view>
			<view class="tui-ranking__list">
				<view class="tui-ranking__item" @tap="detail(item.id)" v-for="(item, index) in recommendgoods"
					v-if="index<3" :key="index">
					<image :src="item.pic"></image>
					<view class="tui-ranking__gtitle">{{ item.name }}</view>
					<view class="tui-sale-price">￥{{ item.price }}</view>
				</view>
			</view>
			<view class="tui-recommend__title">服务列表</view>
			<view class="tui-recommend__item" @tap="detail(item.id)" v-for="(item, index) in goodsList" :key="index">
				<image :src="item.pic" class="tui-rg__img" mode="widthFix"></image>
				<view class="tui-recommend__right">
					<view class="tui-rg__title">
						{{ item.name }}
					</view>
					<view class="tui-sale-price">￥{{ item.price }}</view>
					<view v-if="item.sale_count>1" class="tui-rg__interested">
						<tui-icon name="like" :size="26" unit="rpx" color="#EB0909"></tui-icon>				
						<text class="tui-interested__num">{{ item.sale_count }}人购买</text>
					</view>
				</view>
			</view>
		</view>
		<!--=======推荐 end=======-->
		<!--=======活动 start=======-->
		<view class="tui-items__3 tui-padding" v-if="current == 1">
			<view class="tui-activity__box">
				<view class="tui-activity__title">用户评价</view>
				<!-- 
				<view class="tui-activity__item" @tap="detail" v-for="(item, index) in 12" :key="index">
					<image :src="`/static/images/product/${index % 2 == 0 ? 4 : 3}.jpg`"></image>
					<view class="tui-activity__right">
						<view class="tui-ag__title">水星家纺 豪华大床四件套豪华大床四件套豪华大床四件套</view>
						<view class="tui-flex tui-ag__tag"><tui-tag plain type="danger" padding="8rpx 12rpx" size="24rpx" margin="0 8rpx 0 0">优惠促销</tui-tag></view>
						<view class="tui-ag__bottom">
							<view class="tui-flex">
								<view class="tui-ag__discount">
									￥
									<text>4.5</text>
								</view>
								<view class="tui-ag__original">￥10</view>
							</view>
							<view class="tui-ag__btn">
								<view>已低至4.5折</view>
								<view class="tui-btn__text">立即抢购</view>
							</view>
						</view>
					</view>
				</view>-->
			</view>
		</view>
		<!--=======活动 end=======-->
		<!--=======新品 start=======-->
		<view class="tui-items__4" v-if="current == 2">

			<view class="tui-score__bg"></view>
			<view class="tui-info__box">
				<view class="tui-score__box tui-common__box">
					<view class="tui-flex__center">
						<text>店铺星级</text>
						<view class="tui-rate__box">
							<tui-rate :current="5" :score="0.6" disabled :size="12"></tui-rate>
						</view>
					</view>
					<view class="tui-flex__center">
						<text>用户评价</text>
						<view class="tui-score tui-color__red">
							<text>9.90分</text>
							<text>高</text>
						</view>
					</view>
					<view class="tui-flex__center">
						<text>专业程度</text>
						<view class="tui-score tui-color__red">
							<text>9.99分</text>
							<text>高</text>
						</view>
					</view>
					<view class="tui-flex__center">
						<text>服务态度</text>
						<view class="tui-score tui-color__green">
							<text>8.95分</text>
							<text>低</text>
						</view>
					</view>
				</view>
				<view class="tui-common__box tui-top__20">
					<tui-list-cell arrow>证照信息</tui-list-cell>
					<tui-list-cell arrow unlined @click="qrcode">店铺二维码</tui-list-cell>
				</view>
				<view class="tui-common__box tui-top__20">
					<tui-list-cell :hover="false">
						<view class="tui-flex">
							<text class="tui-text__shrink">店铺简介</text>
							<text class="tui-sub__info">{{storeDetail.content}}</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-flex">
							<text class="tui-text__shrink">地址</text>
							<text class="tui-sub__info">{{storeDetail.region_name}}<br />{{storeDetail.address}}</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" unlined>
						<view class="tui-flex">
							<text class="tui-text__shrink">开店时间</text>
							<text class="tui-sub__info">{{storeDetail.create_time}}</text>
						</view>
					</tui-list-cell>
				</view>
			</view>



		</view>
		<!--=======新品 end=======-->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				width: 350,
				height: 64,
				statusBarHeight: 20,
				tabs: [{
						name: '服务'
					},
					{
						name: '评价'
					},
					{
						name: '商家简介'
					}
				],
				storeDetail: {},
				current: 0,
				recommendgoods: [],
				rankingTab: 0,
				goodsList: []
			};
		},
		onLoad: function(e) {
			const _this = this;
			this.getStoreDetail(e.id);
			_this.$request.get('Goods.recommend').then(res => {
				if (res.errno == 0) {
					_this.recommendgoods = res.data;
				}
			});
			_this.$request.post('Goods.index',{sid:e.id}).then(res => {
				if (res.errno == 0) {
					_this.goodsList = res.data.data;
				}
			});

		},
		methods: {
			getStoreDetail(sId) {
				const _this = this;
				_this.$request.get('store.detail', {
		 		id: sId
				}).then(res => {
					if (res.errno == 0) {
						_this.storeDetail = res.data
					}
				});
			},
			initHeader(e) {
				this.width = Number(e.left);
				this.height = Number(e.height);
				this.statusBarHeight = Number(e.statusBarHeight);
				this.bubbleTop = this.height + 6 + 'px';
			},
			change(e) {
				this.current = e.index;
			},
			detail(id) {
				this.tui.href('/pages/goodsDetail/goodsDetail?id=' + id);
			}
		}
	};
</script>

<style>
	.tui-header {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 8rpx;
		box-sizing: border-box;
	}

	.tui-back__box {
		padding-right: 12rpx;
		padding-left: 4rpx;
		flex-shrink: 0;
	}

	.tui-menu__box {
		padding-right: 26rpx;
		padding-left: 24rpx;
		flex-shrink: 0;
	}

	.tui-flex__center {
		display: flex;
		align-items: center;
	}

	.tui-shop__info {
		width: 100%;
		background-color: #5796fd;
		padding: 0 25rpx 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		color: #fff;
	}

	.tui-logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 6rpx;
		display: block;
		margin-right: 12rpx;
		flex-shrink: 0;
	}

	.tui-shop__name {
		width: 440rpx;
		font-size: 30rpx;
		font-weight: 500;
		padding-bottom: 6rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-shop__rate {
		display: flex;
		align-items: center;
	}

	.tui-rate__box {
		background-color: rgba(255, 255, 255, 0.3);
		display: flex;
		align-items: center;
		border-radius: 20px;
		padding: 0 6rpx;
		margin-right: 12rpx;
		line-height: 13px;
	}

	.tui-shop__address {
		font-size: 30rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
	}

	.tui-shop__follow {
		font-size: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
	}

	.tui-btn__follow {
		margin-left: auto;
	}

	.tui-follow__text {
		padding-left: 6rpx;
	}

	.tui-padding {
		width: 100%;
		padding: 0 25rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-flex {
		display: flex;
		align-items: center;
	}

	/*========推荐 start=========*/
	.tui-ranking__header {
		width: 100%;
		padding: 30rpx 4rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tui-ranking__title {
		font-size: 30rpx;
	}

	.tui-ranking__tabs {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		color: #999;
	}

	.tui-ranking__tabs view {
		margin-left: 40rpx;
	}

	.tui-ranking__active {
		color: #000;
		position: relative;
		transition: all 0.1s;
	}

	.tui-ranking__active::after {
		content: ' ';
		width: 60%;
		position: absolute;
		border-bottom: 2px solid #eb0909;
		border-radius: 4px;
		left: 20%;
		bottom: -10rpx;
	}

	.tui-ranking__list {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-justify__start {
		justify-content: flex-start !important;
	}

	.tui-item-mr__16 {
		margin-right: 16rpx;
	}

	.tui-ranking__item {
		width: 224rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #fff;
		padding-bottom: 20rpx;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
	}

	.tui-ranking__item image {
		width: 224rpx;
		height: 224rpx;
		display: block;
	}

	.tui-ranking__gtitle {
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 24rpx 12rpx 8rpx;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-ranking__sub {
		font-size: 25rpx;
		line-height: 25rpx;
		padding: 8rpx 18rpx 8rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		color: #999;
	}

	.tui-recommend__title {
		padding: 30rpx 4rpx 24rpx;
		font-size: 30rpx;
		box-sizing: border-box;
	}

	.tui-recommend__item {
		width: 100%;
		border-radius: 24rpx;
		background-color: #ffffff;
		padding: 25rpx;
		box-sizing: border-box;
		display: flex;
		margin-bottom: 20rpx;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
	}

	.tui-recommend__right {
		width: 60%;
		position: relative;
	}

	.tui-rg__img {
		width: 240rpx;
		height: 240rpx;
		border-radius: 12rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
	}

	.tui-rg__title {
		width: 98%;
		font-size: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-rg__attr {
		font-size: 24rpx;
		color: #999;
		background-color: #f5f5f5;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 6rpx 16rpx;
		border-radius: 20px;
		transform: scale(0.8);
		transform-origin: 0 center;
		margin-top: 12rpx;
	}

	.tui-rg__interested {
		font-size: 24rpx;
		margin-top: 12rpx;
	}

	.tui-interested__num {
		padding-left: 8rpx;
		color: #999;
	}

	.tui-rg__imgbox {
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 2rpx;
		left: 0;
	}

	.tui-rg__imgbox image {
		width: 84rpx;
		height: 84rpx;
		border-radius: 12rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	/*=======推荐 end=======*/

	/*====活动========= start*/
	.tui-activity__box {
		width: 100%;
		padding: 25rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		background-color: #fff;
		margin-top: 20rpx;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
	}

	.tui-activity__title {
		font-size: 32rpx;
		line-height: 32rpx;
		padding-bottom: 25rpx;
	}

	.tui-activity__item {
		width: 100%;
		display: flex;
		margin-bottom: 32rpx;
	}

	.tui-activity__item image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.tui-activity__right {
		flex: 1;
		overflow: hidden;
		position: relative;
	}

	.tui-ag__title {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28rpx;
	}

	.tui-ag__bottom {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tui-ag__discount {
		color: #eb0909;
		font-size: 24rpx;
	}

	.tui-ag__discount text {
		font-size: 32rpx;
		line-height: 32rpx;
	}

	.tui-ag__original {
		color: #999;
		font-size: 24rpx;
		line-height: 24rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
	}

	.tui-ag__tag {
		padding: 12rpx 0;
	}

	.tui-ag__btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #fff;
		background: linear-gradient(90deg, rgb(255, 89, 38), rgb(240, 14, 44));
		padding: 8rpx 24rpx;
		border-radius: 8rpx;
	}

	.tui-btn__text {
		font-size: 28rpx;
		line-height: 28rpx;
		padding-top: 8rpx;
	}

	/*=====活动======== end*/

	/*=====新品===== start*/
	.tui-ptop__0 {
		padding-top: 0 !important;
	}

	/*======新品======= end*/

	.tui-score__bg {
		width: 100%;
		height: 100rpx;
	}

	.tui-score__box {
		width: 100%;
		padding: 10rpx 30rpx 30rpx;
	}

	.tui-rate__box {
		display: flex;
		align-items: center;
		border-radius: 20px;
		padding: 0 6rpx;
		margin-right: 12rpx;
		background-color: rgba(83, 83, 83, .1);
		line-height: 13px;
	}

	.tui-flex__center {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.tui-flex__center text {
		font-size: 24rpx;
		color: #999;
		padding-right: 50rpx;
	}

	.tui-score text {
		padding-right: 25rpx;
	}

	.tui-color__red text {
		color: #EB0909;
	}

	.tui-color__green text {
		color: #19be6b;
	}

	.tui-info__box {
		width: 100%;
		padding: 0 25rpx 100rpx;
		box-sizing: border-box;
		margin-top: -100rpx;
	}

	.tui-top__20 {
		margin-top: 20rpx;
	}

	.tui-flex {
		display: flex;
	}

	.tui-text__shrink {
		flex-shrink: 0;
	}

	.tui-sub__info {
		color: #999;
		padding-left: 40rpx;
		word-break: break-all;

	}
</style>
