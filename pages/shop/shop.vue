<template>
	<view class="container">
		<!-- #ifndef MP -->
		<t-rt-popup :itemList="itemList" ref="rtBubble" :top="bubbleTop" @click="itemClick"></t-rt-popup>
		<!-- #endif -->
		<tui-navigation-bar isCustom :isOpacity="false" backgroundColor="#18293d" @init="initHeader">
			<view class="tui-header" :style="{ height: height - statusBarHeight + 'px' }">
				<view :style="{ width: width + 'px' }" class="tui-flex__center">
					<view class="tui-back__box" @tap="back"><tui-icon name="arrowleft" color="#fff"></tui-icon></view>
					<view class="tui-searchbox tui-search-mr" @tap="search">
						<icon type="search" :size="13" color="#fff"></icon>
						<text class="tui-search-text">搜索本店</text>
					</view>
				</view>
				<!-- #ifndef MP -->
				<view class="tui-menu__box" @tap="rtBubble"><tui-icon name="more-fill" color="#fff" :size="22"></tui-icon></view>
				<!-- #endif -->
			</view>
		</tui-navigation-bar>
		<view class="tui-shop__info" :style="{ paddingTop: height + 5 + 'px' }">
			<image src="/static/images/index/logo.png" class="tui-logo" @tap="shop"></image>
			<view class="tui-shop__desc" @tap="shop">
				<view class="tui-shop__name">
					<text>生活专营店</text>
					<tui-icon name="arrowright" color="#fff" :size="24" unit="rpx"></tui-icon>
				</view>
				<view class="tui-shop__rate">
					<view class="tui-rate__box"><tui-rate :current="5" :score="0.6" disabled :size="12"></tui-rate></view>
					<view class="tui-shop__follow">2.3万人关注</view>
				</view>
			</view>
			<view class="tui-btn__follow">
				<tui-button :size="24" width="116rpx" height="48rpx" shape="circle" type="danger">
					<tui-icon name="like" color="#fff" :size="24" unit="rpx"></tui-icon>
					<text class="tui-follow__text">关注</text>
				</tui-button>
				<!-- <tui-button :size="24" width="116rpx" height="48rpx" shape="circle" type="white" disabled>已关注</tui-button> -->
			</view>
		</view>
		<tui-tabs
			@change="change"
			:currentTab="current"
			:tabs="tabs"
			itemWidth="20%"
			backgroundColor="#18293d"
			color="rgba(255,255,255,.7)"
			selectedColor="#fff"
			sliderBgColor="#fff"
			bottom="8rpx"
			unlined
			:size="30"
			:sliderWidth="60"
		></tui-tabs>
		<!--=======推荐 start=======-->
		<view class="tui-items__1 tui-padding" v-if="current == 0">
			<view class="tui-ranking__header">
				<view class="tui-ranking__title">排行榜</view>
				<view class="tui-ranking__tabs">
					<view :class="{ 'tui-ranking__active': rankingTab === 0 }" @tap="rankingChangeTab(0)">销量排行</view>
					<view :class="{ 'tui-ranking__active': rankingTab === 1 }" @tap="rankingChangeTab(1)">收藏排行</view>
				</view>
			</view>
			<block v-for="(model, key) in rankingList" :key="key">
				<view class="tui-ranking__list" :class="{ 'tui-justify__start': model.list.length === 2 }" v-if="rankingTab === key">
					<view class="tui-ranking__item" @tap="detail" :class="{ 'tui-item-mr__16': model.list.length === 2 }" v-for="(item, index) in model.list" :key="index">
						<image :src="item.img"></image>
						<view class="tui-ranking__gtitle">{{ item.title }}</view>
						<view class="tui-ranking__sub">{{ key == 0 ? item.sales : item.collection }}人{{ key == 0 ? '购买' : '收藏' }}</view>
					</view>
				</view>
			</block>
			<view class="tui-recommend__title">单品推荐</view>
			<view class="tui-recommend__item" @tap="detail" v-for="(item, index) in 12" :key="index">
				<image :src="`/static/images/mall/product/${index % 2 == 0 ? 6 : 5}.jpg`" class="tui-rg__img"></image>
				<view class="tui-recommend__right">
					<view class="tui-rg__title">
						{{ index % 2 == 0 ? '柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红' : '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋' }}
					</view>
					<view class="tui-rg__attr">{{ index % 2 == 0 ? '防水系列 红色' : '零食 200g/袋' }}</view>
					<view class="tui-rg__interested">
						<tui-icon name="like" :size="26" unit="rpx" color="#EB0909"></tui-icon>
						<text class="tui-interested__num">2020个客官感兴趣</text>
					</view>
					<view class="tui-rg__imgbox">
						<image :src="`/static/images/mall/product/${index % 2 == 0 ? 6 : 5}.jpg`"></image>
						<image :src="`/static/images/mall/product/${index % 2 == 0 ? 6 : 5}.jpg`"></image>
						<image :src="`/static/images/mall/product/${index % 2 == 0 ? 6 : 5}.jpg`"></image>
					</view>
				</view>
			</view>
		</view>
		<!--=======推荐 end=======-->

		<!--=======商品=======-->
		<view class="tui-items__2" v-if="current == 1">
			<view class="tui-header__screen">
				<view class="tui-screen__item" :class="{ 'tui-screen__active': screenType == 1 }" @tap="screen(1)">综合</view>
				<view class="tui-screen__item" :class="{ 'tui-screen__active': screenType == 2 }" @tap="screen(2)">销量</view>
				<view class="tui-screen__item" :class="{ 'tui-screen__active': screenType == 3 }" @tap="screen(3)">
					<text>价格</text>
					<view class="tui-screen__price">
						<view class="tui-price__asc">
							<tui-icon name="turningup" :color="screenType == 3 && sortWay == 'asc' ? '#E32424' : '#000'" :size="24" unit="rpx"></tui-icon>
						</view>
						<view class="tui-price__desc">
							<tui-icon name="turningdown" :color="screenType == 3 && sortWay == 'desc' ? '#E32424' : '#000'" :size="24" unit="rpx"></tui-icon>
						</view>
					</view>
				</view>
				<view class="tui-screen__item" @tap="screen(4)">
					<tui-icon :name="isList ? 'manage' : 'listview'" :size="isList ? 44 : 34" unit="rpx" :bold="isList ? false : true" color="#333"></tui-icon>
				</view>
			</view>

			<!--list-->
			<view class="tui-product-list tui-padding">
				<view class="tui-product-container">
					<block v-for="(item, index) in goodsList" :key="index" v-if="isList">
						<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
						<!--商品列表-->
						<view class="tui-pro-item" :class="[isList ? 'tui-flex-list' : '']" hover-class="tui-hover" :hover-start-time="150" @tap="detail">
							<image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img" :class="[isList ? 'tui-proimg-list' : '']" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.sale }}</text>
										<text class="tui-factory-price">￥{{ item.factory }}</text>
									</view>
									<view class="tui-pro-pay">{{ item.payNum }}人付款</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
				<view class="tui-product-container" v-if="!isList">
					<block v-for="(item, index) in goodsList" :key="index">
						<!-- <template is="productItem" data="{{item,index:index}}" /> -->
						<!--商品列表-->
						<view class="tui-pro-item" :class="[isList ? 'tui-flex-list' : '']" hover-class="tui-hover" :hover-start-time="150" @tap="detail">
							<image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img" :class="[isList ? 'tui-proimg-list' : '']" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.sale }}</text>
										<text class="tui-factory-price">￥{{ item.factory }}</text>
									</view>
									<view class="tui-pro-pay">{{ item.payNum }}人付款</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
			</view>

			<!--list-->
		</view>
		<!--=======商品 end=======-->

		<!--=======活动 start=======-->
		<view class="tui-items__3 tui-padding" v-if="current == 2">
			<view class="tui-activity__box">
				<view class="tui-activity__title">今日超值</view>
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
				</view>
			</view>
		</view>
		<!--=======活动 end=======-->

		<!--=======新品 start=======-->
		<view class="tui-items__4" v-if="current == 3">
			<tui-divider gradual width="60%">08月20日本店上新</tui-divider>
			<!--list-->
			<view class="tui-product-list tui-padding tui-ptop__0">
				<view class="tui-product-container">
					<block v-for="(item, index) in goodsList" :key="index">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="tui-hover" :hover-start-time="150" @tap="detail">
							<image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.sale }}</text>
										<text class="tui-factory-price">￥{{ item.factory }}</text>
									</view>
									<view class="tui-pro-pay">{{ item.payNum }}人付款</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
				<view class="tui-product-container">
					<block v-for="(item, index) in goodsList" :key="index">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="tui-hover" :hover-start-time="150" @tap="detail">
							<image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.sale }}</text>
										<text class="tui-factory-price">￥{{ item.factory }}</text>
									</view>
									<view class="tui-pro-pay">{{ item.payNum }}人付款</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
			</view>

			<!--list-->
		</view>
		<!--=======新品 end=======-->

		<!--=======分类 start=======-->
		<view class="tui-items__5 tui-padding" v-if="current == 4">
			<view class="tui-classify-box" @tap="product">
				<tui-list-cell padding="30rpx" :hover="false" arrow unlined><view class="tui-classify__main">加菲猫</view></tui-list-cell>
				<view class="tui-classify__sub">
					<view class="tui-classify__item">加菲猫1号</view>
					<view class="tui-classify__item">加菲猫2号</view>
					<view class="tui-classify__item">加菲猫3号</view>
				</view>
			</view>
			<view class="tui-classify-box" @tap="product">
				<tui-list-cell padding="30rpx" :hover="false" arrow unlined><view class="tui-classify__main">英国短毛猫</view></tui-list-cell>
			</view>
			<view class="tui-classify-box" @tap="product">
				<tui-list-cell padding="30rpx" :hover="false" arrow unlined><view class="tui-classify__main">德文</view></tui-list-cell>
			</view>
			<view class="tui-classify-box" @tap="product" v-for="(item, index) in 3" :key="index">
				<tui-list-cell padding="30rpx" :hover="false" arrow unlined><view class="tui-classify__main">矮脚猫</view></tui-list-cell>
				<view class="tui-classify__sub">
					<view class="tui-classify__item">矮脚猫1号</view>
					<view class="tui-classify__item">矮脚猫2号</view>
					<view class="tui-classify__item">矮脚猫3号</view>
				</view>
			</view>
		</view>
		<!--=======分类 end=======-->
	</view>
</template>

<script>
import tRtPopup from '@/components/views/t-rt-popup/t-rt-popup';
export default {
	components: {
		tRtPopup
	},
	data() {
		return {
			width: 350,
			height: 64,
			statusBarHeight: 20,
			bubbleTop: '',
			//气泡弹窗
			itemList: [
				{
					title: '首页',
					icon: 'home'
				},
				{
					title: '收藏',
					icon: 'star'
				},
				{
					title: '分享',
					icon: 'partake'
				},
				{
					title: '店铺详情',
					icon: 'shop'
				}
			],
			tabs: [
				{
					name: '推荐'
				},
				{
					name: '商品'
				},
				{
					name: '活动'
				},
				{
					name: '新品'
				},
				{
					name: '分类'
				}
			],
			current: 0,
			/*推荐*/
			subTabs:[{
				name: '销量排行'
			},{
				name: '收藏排行'
			}],
			rankingList: [
				{
					type: 1,
					list: [
						{
							img: '/static/images/mall/product/3.jpg',
							title: '百雀羚套装女补水保湿护肤品',
							sales: 100000
						},
						{
							img: '/static/images/mall/product/4.jpg',
							title: '柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
							sales: 98000
						},
						{
							img: '/static/images/mall/product/5.jpg',
							title: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
							sales: 90000
						}
					]
				},
				{
					type: 2,
					list: [
						{
							img: '/static/images/mall/product/5.jpg',
							title: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
							collection: 99999
						},
						{
							img: '/static/images/mall/product/3.jpg',
							title: '百雀羚套装女补水保湿护肤品',
							collection: 98000
						},
						{
							img: '/static/images/mall/product/4.jpg',
							title: '柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
							collection: 66666
						}
					]
				}
			],
			rankingTab: 0,
			/*商品*/
			isList: false,
			screenType: 1,
			sortWay: '', //asc,desc
			goodsList: [
				{
					img: 1,
					name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
					sale: 599,
					factory: 899,
					payNum: 2342
				},
				{
					img: 2,
					name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
					sale: 29,
					factory: 69,
					payNum: 999
				},
				{
					img: 3,
					name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
					sale: 299,
					factory: 699,
					payNum: 666
				},
				{
					img: 4,
					name: '百雀羚套装女补水保湿护肤品',
					sale: 1599,
					factory: 2899,
					payNum: 236
				},
				{
					img: 5,
					name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
					sale: 599,
					factory: 899,
					payNum: 2399
				},
				{
					img: 6,
					name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
					sale: 599,
					factory: 899,
					payNum: 2399
				},
				{
					img: 1,
					name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
					sale: 599,
					factory: 899,
					payNum: 2342
				},
				{
					img: 2,
					name: '德国DMK进口牛奶',
					sale: 29,
					factory: 69,
					payNum: 999
				},
				{
					img: 3,
					name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
					sale: 299,
					factory: 699,
					payNum: 666
				},
				{
					img: 4,
					name: '百雀羚套装女补水保湿护肤品',
					sale: 1599,
					factory: 2899,
					payNum: 236
				}
			]
		};
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		initHeader(e) {
			this.width = Number(e.left);
			this.height = Number(e.height);
			this.statusBarHeight = Number(e.statusBarHeight);
			this.bubbleTop = this.height + 6 + 'px';
		},
		rtBubble() {
			this.$refs.rtBubble.toggle();
		},
		itemClick(e) {
			console.log(e);
			if(e.index==0){
				this.tui.href("/pages/index/index")
			}else if(e.index==1){
				this.tui.toast('收藏成功')
			}else if(e.index==2){
				this.tui.toast('分享成功')
			}else{
				this.shop()
			}
		},
		search() {
			this.tui.href('/pages/common/search/search');
		},
		change(e) {
			this.current = e.index;
		},
		rankingChangeTab(index) {
			this.rankingTab = index;
		},
		screen(index) {
			if (index == 4) {
				this.isList = !this.isList;
			} else {
				this.screenType = index;
				if (index == 3) {
					this.sortWay = !this.sortWay || this.sortWay == 'desc' ? 'asc' : 'desc';
				}
			}
		},
		detail() {
			this.tui.href('/pages/goodsDetail/goodsDetail');
		},
		shop() {
			this.tui.href('/pages/shopDetail/shopDetail');
		},
		product() {
			this.tui.href('/pages/goodsList/goodsList');
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

.tui-searchbox {
	flex: 1;
	height: 30px;
	margin-right: 30rpx;
	border-radius: 15px;
	font-size: 12px;
	background: rgba(255, 255, 255, 0.5);
	padding: 3px 10px;
	box-sizing: border-box;
	color: #ffffff;
	display: flex;
	align-items: center;
}

.tui-search-text {
	padding-left: 16rpx;
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
	background-color: #18293d;
	padding: 0 25rpx 16rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	color: #fff;
}

.tui-logo {
	width: 68rpx;
	height: 68rpx;
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

/*========商品 start======*/

.tui-header__screen {
	width: 100%;
	height: 80rpx;
	display: flex;
	align-items: center;
	background-color: #ffffff;
	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
}
.tui-screen__item {
	flex: 1;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
}
.tui-screen__active {
	color: #eb0909;
}
.tui-screen__price {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	position: relative;
}
.tui-screen__price view {
	position: absolute;
	left: 0;
}
.tui-price__asc {
	bottom: -14rpx;
}
.tui-price__desc {
	top: -14rpx;
}

.tui-product-list {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding-top: 10rpx;
}

.tui-product-container {
	flex: 1;
	margin-right: 10rpx;
}

.tui-product-container:last-child {
	margin-right: 0;
}

.tui-pro-item {
	width: 100%;
	margin-bottom: 10rpx;
	background: #fff;
	box-sizing: border-box;
	border-radius: 12rpx;
	overflow: hidden;
	transition: all 0.15s ease-in-out;
}

.tui-flex-list {
	display: flex;
	margin-bottom: 1rpx !important;
}

.tui-pro-img {
	width: 100%;
	display: block;
	flex-shrink: 0;
}

.tui-proimg-list {
	width: 260rpx;
	height: 260rpx !important;
	flex-shrink: 0;
	border-radius: 12rpx;
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
	color: #eb0909;
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
/*======商品======= end*/

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

/*=======分类===== start*/
.tui-classify-box {
	margin-top: 30rpx;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
}
.tui-classify__main {
	font-size: 30rpx;
	line-height: 30rpx;
	position: relative;
}
.tui-classify__main::before {
	content: '';
	position: absolute;
	height: 80%;
	width: 6rpx;
	left: -16rpx;
	top: 10%;
	background-color: #eb0909;
}
.tui-classify__sub {
	width: 100%;
	padding: 0 30rpx 15rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	background-color: #fff;
}
.tui-classify__item {
	width: 49%;
	padding: 16rpx;
	box-sizing: border-box;
	background-color: #f5f5f5;
	font-size: 26rpx;
	color: #555;
	margin-bottom: 2%;
	border-radius: 6rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
/*======分类====== end*/
</style>
