<template>
	<view class="container">
		<view class="tui-goods-item">
			<image src="/static/images/mall/product/4.jpg" class="tui-goods-img"></image>
			<view class="tui-goods-center">
				<view class="tui-goods-name">欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）</view>
				<view class="tui-price__box">
					<view class="tui-goods-price">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">118</view>
						<view class="tui-size-24">.00</view>
						<text>已拼2020件</text>
					</view>
					<view class="tui-price-tag">2人团</view>
				</view>
			</view>
		</view>

		<view class="tui-group__box tui-mtop__20">
			<tui-divider backgroundColor="#fff" width="70%" gradual v-if="status != 1">
				<view class="tui-divider__content">
					<image :src="webURL + 'img_invoice_success3x.png'" v-if="status == 2"></image>
					<text>{{ status == 2 ? '拼团成功' : '拼团失败' }}</text>
				</view>
			</tui-divider>
			<view class="tui-group__time" v-if="status != 1">开团时间：2020-09-01 12:30:10</view>
			<view class="tui-group__title" v-if="status == 1">
				<text>还差</text>
				<text class="tui-color__red">1</text>
				<text>人，赶快邀请好友来拼团吧</text>
			</view>
			<view class="tui-group-countdown" v-if="status == 1">
				<view class="tui-countdown-right">剩余</view>
				<tui-countdown :time="3800" scale colonColor="#EB0909" borderColor="#EB0909" color="#EB0909"></tui-countdown>
				<view class="tui-countdown-left">结束</view>
			</view>
			<view class="tui-user__box">
				<view class="tui-user__item">
					<view class="tui-avatar__box tui-size">
						<image class="tui-size" :src="webURL + 'mine_avatar_3x.jpg'"></image>
						<view class="tui-team__leader">团长</view>
					</view>
					<view class="tui-nickname">不许人间见白头</view>
				</view>
				<view class="tui-user__item" v-if="status != 2">
					<view class="tui-avatar__box tui-user__none">
						<image class="tui-size" :src="webURL + 'img_not_tuxedo.png'"></image>
					</view>
					<view class="tui-nickname">暂无</view>
				</view>
				<view class="tui-user__item" v-else>
					<view class="tui-avatar__box tui-size">
						<image class="tui-size" :src="webURL + 'mine_avatar_3x.jpg'"></image>
					</view>
					<view class="tui-nickname">小可爱本人</view>
				</view>
			</view>
			<view class="tui-btn__box">
				<tui-button type="danger" height="88rpx" shadow shape="circle">{{ status == 1 ? '邀请好友拼团' : '查看更多拼团商品' }}</tui-button>
			</view>
		</view>
		<!--拼团规则玩法介绍-->
		<view class="tui-group-rule tui-mtop__20" v-if="status == 1">
			<tui-list-cell padding="30rpx" :hover="false">
				<view class="tui-group__text tui-group__start tui-between">
					<view class="tui-group-title">开团时间</view>
					<view class="tui-sub__info">2020-09-01 12:30:01</view>
				</view>
			</tui-list-cell>
			<tui-list-cell padding="30rpx" arrow @click="showModal">
				<view class="tui-group__text tui-between">
					<view class="tui-group-title">拼团规则</view>
					<view class="tui-sub__info">拼团玩法介绍</view>
				</view>
			</tui-list-cell>
			<view class="tui-step__box">
				<view class="tui-step-item">
					<image :src="webURL + 'img_opengroup_3x.png'"></image>
					<view class="tui-step-text">团长开团</view>
				</view>
				<view class="tui-step-arrow">
					<image :src="webURL + 'img_arrow_3x.png'"></image>
				</view>
				<view class="tui-step-item">
					<image :src="webURL + 'img_invitefriends_3x.png'"></image>
					<view class="tui-step-text">邀请好友</view>
				</view>
				<view class="tui-step-arrow">
					<image :src="webURL + 'img_arrow_3x.png'"></image>
				</view>
				<view class="tui-step-item">
					<image :src="webURL + 'img_spellgroupsuccess_3x.png'"></image>
					<view class="tui-step-text">拼团成功</view>
				</view>
				<view class="tui-step-arrow">
					<image :src="webURL + 'img_arrow_3x.png'"></image>
				</view>
				<view class="tui-step-item">
					<image :src="webURL + 'img_tosend_3x.png'"></image>
					<view class="tui-step-text">等待发货</view>
				</view>
			</view>
		</view>

		<!--热销爆款-->
		<tui-divider width="50%" gradual><text class="tui-hot__title">热销爆品</text></tui-divider>

		<!--=======商品=======-->
		<view class="tui-product__box">
			<view class="tui-product-list">
				<view class="tui-product-container">
					<block v-for="(item, index) in goodsList" :key="index">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="tui-hover" :hover-start-time="150" @tap="detail">
							<image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view>
									<view class="tui-price__box">
										<view class="tui-price">
											<view class="tui-price__small">￥</view>
											<view class="tui-price__large">{{ item.sale }}</view>
											<view class="tui-price__small">.00</view>
										</view>
										<view class="tui-price__original">￥{{ item.factory }}.00</view>
									</view>
									<view class="tui-group-text">已有{{ item.payNum }}人拼团</view>
									<view class="tui-group-btn">
										<view class="tui-flex-btn tui-color-red">2人团</view>
										<view class="tui-flex-btn">去拼团</view>
									</view>
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
									<view class="tui-price__box">
										<view class="tui-price">
											<view class="tui-price__small">￥</view>
											<view class="tui-price__large">{{ item.sale }}</view>
											<view class="tui-price__small">.00</view>
										</view>
										<view class="tui-price__original">￥{{ item.factory }}.00</view>
									</view>
									<view class="tui-group-text">已有{{ item.payNum }}人拼团</view>
									<view class="tui-group-btn">
										<view class="tui-flex-btn tui-color-red">2人团</view>
										<view class="tui-flex-btn">去拼团</view>
									</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
			</view>
		</view>
		<!--=======商品 end=======-->

		<!--拼团玩法介绍-->
		<tui-modal :show="modal" shape="circle" padding="30rpx 40rpx" custom>
			<view class="tui-modal__title">拼团玩法</view>
			<view class="tui-modal__p">1.全民拼团，所有用户都可直接参团或开团；</view>
			<view class="tui-modal__p">2.拼团成功，指开团在规定时间内达到规定成团人数；</view>
			<view class="tui-modal__p">3.拼团失败，指开团后在规定时间内未能找到相应的人数的好友参团，该团失败，系统取消该团订单，退款原路退回。</view>
			<view class="tui-modal__btn">
				<tui-button type="danger" shape="circle" width="280rpx" height="68rpx" :size="26" @click="modal = false">我知道了</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webURL: 'https://thorui.cn/images/mall/group/',
				modal: false,
				goodsList: [{
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
				],
				//1-拼团中 2-拼团成功 3-拼团失败
				status: 1
			};
		},
		onLoad(options) {
			this.status = options.status || 1;
		},
		methods: {
			showModal() {
				this.modal = true;
			},
			detail() {
				this.tui.href('/pages/groupDetail/groupDetail');
			}
		}
	};
</script>

<style>
	.tui-goods-item {
		width: 100%;
		padding: 20rpx 25rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 12rpx 12rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tui-goods-name {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-price__box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		color: #eb0909;
	}

	.tui-goods-price text {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #999;
		padding-left: 20rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-price-tag {
		height: 38rpx;
		border: 1rpx solid #eb0909;
		border-radius: 6rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		line-height: 24rpx;
		transform: scale(0.8);
		transform-origin: 100% center;
		border-radius: 6rpx;
		padding: 0 8rpx;
		color: #eb0909;
		flex-shrink: 0;
	}

	.tui-mtop__20 {
		margin-top: 20rpx;
	}

	.tui-divider__content {
		display: flex;
		align-items: center;
	}

	.tui-divider__content image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}

	.tui-divider__content text {
		font-size: 34rpx;
		line-height: 34rpx;
		color: #000000;
		font-weight: bold;
	}

	.tui-group__time {
		font-size: 24rpx;
		font-weight: 400;
		color: #999;
		text-align: center;
	}

	.tui-group__box {
		width: 100%;
		padding: 50rpx 25rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.tui-group__title {
		width: 100%;
		font-size: 34rpx;
		line-height: 34rpx;
		font-weight: 500;
		text-align: center;
	}

	.tui-color__red {
		color: #eb0909;
	}

	.tui-group-countdown {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #666666;
		padding-top: 20rpx;
	}

	.tui-countdown-right {
		padding-right: 6rpx;
	}

	.tui-countdown-left {
		padding-left: 6rpx;
	}

	.tui-user__box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 60rpx;
	}

	.tui-user__item {
		max-width: 128rpx;
		margin: 0 40rpx;
	}

	.tui-size {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.tui-avatar__box {
		position: relative;
		border: 4rpx solid #eb0909;
	}

	.tui-user__none {
		width: 108rpx;
		height: 108rpx;
		border: 0;
	}

	.tui-avatar__box image {
		display: block;
	}

	.tui-team__leader {
		position: absolute;
		width: 64rpx;
		height: 28rpx;
		font-size: 24rpx;
		background-color: #eb0909;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 30px;
		left: 50%;
		top: -14rpx;
		transform: translateX(-50%);
		z-index: 10;
	}

	.tui-nickname {
		font-size: 24rpx;
		color: #999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		padding-top: 12rpx;
	}

	.tui-btn__box {
		padding-top: 60rpx;
	}

	.tui-group__text {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-group-title {
		font-size: 30rpx;
		line-height: 30rpx;
		padding-left: 16rpx;
		border-left: 2px solid #eb0909;
		box-sizing: border-box;
	}

	.tui-sub__info {
		font-size: 26rpx;
		padding-right: 30rpx;
	}

	.tui-group__start .tui-group-title {
		border-left: 0;
		padding-left: 0;
	}

	.tui-group__start .tui-sub__info {
		padding-right: 0;
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

	.tui-step-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 26rpx;
		color: #666666;
	}

	.tui-step-item image {
		width: 64rpx;
		height: 55rpx;
		flex-shrink: 0;
	}

	.tui-step-item image:first-child {
		width: 60rpx !important;
	}

	.tui-step-arrow {
		height: 90rpx;
	}

	.tui-step-arrow image {
		width: 11rpx;
		height: 20rpx;
		flex-shrink: 0;
	}

	.tui-step-text {
		line-height: 26rpx;
		padding-top: 24rpx;
	}

	.tui-between {
		justify-content: space-between;
	}

	/*拼团玩法介绍 modal*/
	.tui-modal__title {
		text-align: center;
		font-weight: bold;
		padding-bottom: 8rpx;
	}

	.tui-modal__p {
		font-size: 26rpx;
		color: #888;
		padding-top: 20rpx;
	}

	.tui-modal__btn {
		width: 100%;
		padding: 60rpx 0 20rpx;
		display: flex;
		justify-content: center;
	}

	.tui-hot__title {
		font-size: 30rpx;
		line-height: 30rpx;
		color: #333;
		font-weight: bold;
	}

	/*========商品 start======*/

	.tui-product__box {
		width: 100%;
		padding: 0 25rpx 60rpx 25rpx;
		box-sizing: border-box;
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
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

	.tui-pro-img {
		width: 100%;
		display: block;
		flex-shrink: 0;
		background-color: #f5f5f5;
	}

	.tui-proimg-list {
		width: 280rpx;
		height: 280rpx !important;
		flex-shrink: 0;
		border-radius: 12rpx;
	}

	.tui-pro-content {
		flex: 1;
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

	.tui-price__box {
		width: 100%;
		display: flex;
		align-items: center;
		padding-top: 12rpx;
	}

	.tui-price {
		display: flex;
		align-items: flex-end;
		color: #eb0909;
	}

	.tui-price__small {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price__large {
		font-size: 34rpx;
		line-height: 32rpx;
		font-weight: 600;
	}

	.tui-price__original {
		font-size: 24rpx;
		line-height: 24rpx;
		text-decoration: line-through;
		color: #999;
		padding-top: 10rpx;
		padding-left: 12rpx;
	}

	.tui-group-btn {
		max-width: 312rpx;
		height: 48rpx;
		border-radius: 6rpx;
		background: #eb0909;
		display: flex;
		align-items: center;
		padding: 4rpx;
		margin-top: 10rpx;
		box-sizing: border-box;
	}

	.tui-flex-btn {
		height: 100%;
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		line-height: 26rpx;
		font-weight: 400;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-flex-btn:first-child {
		background: #fff;
	}

	.tui-group-text {
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		padding-top: 30rpx;
		color: #999;
	}

	.tui-color-red {
		color: #eb0909;
	}

	/*======商品======= end*/
</style>
