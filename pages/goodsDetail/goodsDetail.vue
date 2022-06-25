<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" :style="{ height: height + 'px', background: 'rgba(255,255,255,' + opcity + ')' }">
			<view class="tui-header" :style="{ paddingTop: top + 'px', opacity: opcity }">详情</view>
			<view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
				<view class="tui-icon-box" :style="{ backgroundColor: 'rgba(0, 0, 0,' + iconOpcity + ')' }" @tap="back">
					<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				</view>
			</view>
		</view>
		<!--header-->

		<!--banner-->
		<view class="tui-banner-swiper">
			<swiper :autoplay="true" :interval="5000" :duration="150" :circular="true"
				:style="{ height: swiperHeight + 'px' }" @change="bannerChange">
				<block v-for="(item, index) in banner" :key="index">
					<swiper-item class="swiper" :data-index="index" @tap.stop="previewImage">
						<image mode="widthFix" :src="item.pic" class="tui-slide-image" @load="setswiperHeight" />
					</swiper-item>
				</block>
			</swiper>
			<!-- 视频-->
			<!--
			<view class="tui-video__box" @tap.stop="play">
				<image src="https://www.thorui.cn/images/mall/img_video_3x.png" mode="widthFix"></image>
				<view>00′30″</view>
			</view>
			-->
			<view class="tui-banner-tag">
				<tui-tag padding="12rpx 18rpx" type="translucent" shape="circleLeft" :scaleMultiple="0.82" originRight>
					{{ bannerIndex + 1 }}/{{ banner.length }}
				</tui-tag>
			</view>
		</view>

		<!--banner-->
		<view class="tui-pro-detail">
			<view class="tui-product-title tui-border-radius">
				<view class="tui-pro-pricebox tui-padding">
					<view class="tui-pro-price">
						<view v-if="goodsDetail.is_points_goods!=1">
							<text>￥</text>
							<text class="tui-price">{{goodsDetail.price}}</text>
							<text class="points_goods" v-if="goodsDetail.pay_points>0 && goodsDetail.points_price>0">
								可以用{{goodsDetail.pay_points}}积分抵扣{{goodsDetail.points_price}}元
							</text>
						</view>
						<view v-if="goodsDetail.is_points_goods==1">
							<text>积分:</text>
							<text class="tui-price">{{goodsDetail.pay_points}}</text>
						</view>
						<!--<tui-tag padding="10rpx 20rpx" size="24rpx" plain type="high-green" shape="circle"
							:scaleMultiple="0.8">新品</tui-tag>-->
					</view>
					<view class="tui-collection tui-size" @tap="collecting">
						<tui-icon :name="collected ? 'like-fill' : 'like'" :color="collected ? '#ff201f' : '#333'"
							:size="20"></tui-icon>
						<view class="tui-scale-collection" :class="{'tui-icon-red':collected}">收藏</view>
					</view>
				</view>
				<view v-if="goodsDetail.original_price>0" class="tui-original-price tui-gray">
					原价
					<text class="tui-line-through">￥{{goodsDetail.original_price}}</text>
				</view>
				<view class="tui-pro-titbox">
					<view class="tui-pro-title">{{goodsDetail.name}}</view>
					<view class="tui-share-position" @tap="showSharePopup">
						<tui-tag type="gray" shape="circleLeft" padding="12rpx 16rpx">
							<view class="tui-share-box">
								<tui-icon name="partake" color="#333" :size="15"></tui-icon>
								<text class="tui-share-text tui-size">分享</text>
							</view>
						</tui-tag>
					</view>
				</view>
				<view class="tui-padding">
					<view class="tui-sale-info tui-size tui-gray">
						<view>人气：{{viewed}}</view>
						<view>月销：{{goodsDetail.sale_count}}</view>
						<view>库存：{{quantity}}</view>
					</view>
				</view>
			</view>

			<view v-if="goodsDetail.combination && goodsDetail.combination.length>0" class="tui-radius-all tui-mtop">
				<tui-list-cell padding="30rpx">
					<view class="tui-combination-text tui-between">
						<view class="tui-combination-title">套装商品</view>
					</view>
				</tui-list-cell>

				<block v-for="(item, index) in goodsDetail.combination" :key="index">
					<view class="border-flex">
						<!-- 图片 -->
						<view class="border-left">
							<image mode="scaleToFill" :src="item.goods.image" />
						</view>
						<!-- 文字 -->
						<view class="border-right">
							<view>{{item.goods.name}}</view>
							<view>单价：{{item.goods.price}}</view>
							<view>数量：{{item.numbers}}{{item.goods.quantity_unit}}</view>
						</view>
					</view>
				</block>
			</view>

			<!--
			<view class="tui-discount-box tui-radius-all tui-mtop">
				<view class="tui-list-cell" @tap="coupon">
					<view class="tui-bold tui-cell-title">领券</view>
					<view class="tui-flex-center">
						<tui-tag type="red" shape="circle" padding="12rpx 24rpx" size="24rpx">满99减8</tui-tag>
						<tui-tag margin="0 0 0 20rpx" type="red" padding="12rpx 24rpx" size="24rpx" shape="circle">满59减5
						</tui-tag>
					</view>
					<view class="tui-ml-auto">
						<tui-icon name="more-fill" :size="20" color="#666"></tui-icon>
					</view>
				</view>

				<view class="tui-list-cell tui-last" @tap="showPopup">
					<view class="tui-bold tui-cell-title">促销</view>
					<view>
						<view class="tui-promotion-box">
							<tui-tag originLeft padding="12rpx 24rpx" :scaleMultiple="0.8" shape="circle" type="red"
								plain>多买优惠</tui-tag>
							<text>满1件，立减最低1件商品价格，包邮（限中国内地）</text>
						</view>
						<view class="tui-promotion-box">
							<tui-tag originLeft padding="12rpx 24rpx" :scaleMultiple="0.8" shape="circle" type="red"
								plain>满额返券</tui-tag>
							<text>满2件，立减最低2件商品价格，包邮（限中国内地）</text>
						</view>
						<view class="tui-promotion-box">
							<tui-tag originLeft padding="12rpx 24rpx" :scaleMultiple="0.8" shape="circle" type="red"
								plain>特别赠品</tui-tag>
							<text>满3件，立减最低3件商品价格，包邮（限中国内地）</text>
						</view>
					</view>
					<view class="tui-right">
						<tui-icon name="more-fill" :size="20" color="#666"></tui-icon>
					</view>
				</view>
			</view>-->
			<view class="tui-basic-info tui-mtop tui-radius-all">
				<view v-if="hasMoreSelect" class="tui-list-cell" @tap="showPopup">
					<view class="tui-bold tui-cell-title">选项</view>
					<view class="tui-selected-box">{{selectSize}}</view>
					<view class="tui-ml-auto">
						<tui-icon name="more-fill" :size="20" color="#666"></tui-icon>
					</view>
				</view>
				<!--
				<view class="tui-list-cell" @tap="showPopup">
					<view class="tui-bold tui-cell-title">送至</view>
					<view class="tui-addr-box">
						<view class="tui-addr-item">北京朝阳区三环到四环之间</view>
						<view class="tui-addr-item">今日23:59前完成下单，预计6月28日23:30前发货，7月1日24:00前送达</view>
					</view>
					<view class="tui-right">
						<tui-icon name="more-fill" :size="20" color="#666"></tui-icon>
					</view>
				</view>
				<view class="tui-list-cell tui-last">
					<view class="tui-bold tui-cell-title">运费</view>
					<view class="tui-selected-box">在线支付免运费</view>
				</view>-->
				<view class="tui-guarantee">
					<!--<view class="tui-guarantee-item">
						<tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
						<text class="tui-pl">可配送海外</text>
					</view>-->
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
						<text class="tui-pl">人员受专业培训</text>
					</view>
					<view class="tui-guarantee-item">
						<tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
						<text class="tui-pl">省心省钱</text>
					</view>
				</view>
			</view>

			<view v-if="goodscomment && goodscomment.length>0" class="tui-cmt-box tui-mtop tui-radius-all">
				<view class="tui-list-cell tui-last tui-between">
					<view class="tui-bold tui-cell-title">评价</view>
					<!--<view class="tui-flex-center" @tap="evaluate">
						<text class="tui-cmt-all">查看全部</text>
						<tui-icon name="more-fill" :size="20" color="#ff201f"></tui-icon>
					</view>-->
				</view>

				<view v-for="(item, index) in goodscomment" :key="index" class="tui-cmt-content tui-padding">
					<view class="tui-cmt-user">
						<image :src="item.head_img_url" class="tui-acatar"></image>
						<view class="tui-attr">{{item.nick_name}}</view>
					</view>
					<tui-rate :current="item.level"></tui-rate>
					<view class="tui-cmt">{{item.content}}</view>
					<!--<view class="tui-attr">颜色：叠层钛钢流苏耳环（A74）</view>-->
				</view>

				<view class="tui-cmt-btn">
					<!--<tui-button width="240rpx" height="64rpx" :size="24" type="black" plain shape="circle"
						@click="evaluate">查看全部评价</tui-button>-->
				</view>
			</view>


			<view class="tui-nomore-box">
				<tui-nomore text="宝贝详情" backgroundColor="#f7f7f7"></tui-nomore>
			</view>
			<view class="tui-product-img tui-radius-all">
				<view class="pro_detailImg">
					<uParse :html="goodsDetail.content" ref="article" :tag-style="tagStyle"></uParse>
				</view>
			</view>
			<tui-nomore text="已经到最底了" backgroundColor="#f7f7f7"></tui-nomore>
			<view class="tui-safearea-bottom"></view>
		</view>

		<!--底部操作栏-->
		<view class="tui-operation">
			<view class="tui-operation-left tui-col-5">
				<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="shop">
					<tui-icon name="shop" :size="22" color="#333"></tui-icon>
					<view class="tui-operation-text tui-scale-small">首页</view>
				</view>
				<button open-type="contact" class="item-button tui-operation-item" hover-class="tui-opcity"
					:hover-stay-time="150">
					<tui-icon name="kefu" :size="22" color="#333"></tui-icon>
					<view class="tui-operation-text tui-scale-small">客服</view>
				</button>
				<view v-if="deliverymode==3 || deliverymode==4" class="tui-operation-item" hover-class="tui-opcity"
					:hover-stay-time="150" @tap="goShopCar">
					<tui-icon name="cart" :size="22" color="#333"></tui-icon>
					<view class="tui-operation-text tui-scale-small">购物车</view>
					<tui-badge type="red" absolute :scaleRatio="0.8" right="10rpx" top="-4rpx">{{shopNum}}</tui-badge>
				</view>
			</view>
			<view v-if="goodsDetail.is_points_goods==1"
				class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
				<view class="tui-flex-1">
					<tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="buyNow">立即兑换
					</tui-button>
				</view>
			</view>
			
			<view v-else-if="deliverymode==3 || deliverymode==4"
				class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
				<view v-if="goodsDetail.is_skumore!=1" class="tui-flex-1">
					<tui-button height="68rpx" :size="26" type="danger" shape="circle" @click="toAddShopCar">加入购物车
					</tui-button>
				</view>
				<view class="tui-flex-1">
					<tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="tobuy">立即购买
					</tui-button>
				</view>
			</view>
			<view v-else-if="deliverymode==1 || deliverymode==2"
				class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
				<view v-if="goodsDetail.tel" class="tui-flex-1">
					<tui-button height="68rpx" :size="28" type="danger" shape="circle" @click="phoneCall">预约电话
					</tui-button>
				</view>
				<view class="tui-flex-1">
					<tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="tobuy">立即预约
					</tui-button>
				</view>
			</view>
		</view>

		<!--底部操作栏-->

		<!--规格选项开始-->
		<tui-bottom-popup :show="popupShow" @close="hidePopup">
			<view class="tui-popup-box">
				<view class="tui-product-box tui-padding">
					<image :src="goodsoptionImgSelect" mode="widthFix" class="tui-popup-img"></image>
					<view class="tui-popup-price">
						<view class="popup-box-goodsname">{{goodsDetail.name}}</view>
						<view class="tui-amount tui-bold">￥{{selectSizePrice}}</view>
						<view class="tui-number">起售量:{{goodsDetail.minimum}}</view>
					</view>
				</view>
				<scroll-view scroll-y class="tui-popup-scroll">
					<view v-if="goodsDetail.is_skumore==1" class="tui-scrollview-box">
						<view v-for="(skuvo, idx) in goodsDetail.skumore" :key="idx"
							class="tui-number-box tui-attr-title">
							<view class="tui-attr-title">{{skuvo.sku}}</view>
							<view class="tui-amount">￥{{skuvo.price}}</view>
							<tui-numberbox :max="9999" :min="0" :index="idx" :value="skuvo.number"
								@change="skumorenumberchange"></tui-numberbox>
						</view>
					</view>
					<view v-else class="tui-scrollview-box">
						<block v-for="(goodso, idx) in goodsDetail.attribute" :key="idx">
							<view class="tui-bold tui-attr-title">{{goodso.name}}</view>
							<view class="tui-attr-box">
								<view class="tui-attr-item" :class="[goodso.checked==item? 'tui-attr-active' : '']"
									v-for="(item, index) in goodso.item" :key="index" @tap="labelItemTap"
									:data-idx="idx" :data-item="item">
									{{item}}
								</view>
							</view>
						</block>
						<view class="tui-number-box tui-bold tui-attr-title">
							<view class="tui-attr-title">数量</view>
							<tui-numberbox :max="9999" :min="1" :value="buyNumber" @change="change"></tui-numberbox>
						</view>
						<!--
						<view class="tui-bold tui-attr-title">保障服务</view>
						<view class="tui-attr-box">
							<view class="tui-attr-item">半年掉钻保 ￥4.0</view>
						</view>
					
						<view class="tui-bold tui-attr-title">只换不修</view>
						<view class="tui-attr-box">
							<view class="tui-attr-item">三月意外换￥2.0</view>
							<view class="tui-attr-item">半年意外换￥2.0</view>
						</view>
						-->
					</view>
				</scroll-view>
				<view v-if="deliverymode==3 || deliverymode==4"
					class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
					<view v-if="goodsDetail.is_skumore!=1" class="tui-flex-1">
						<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click="addShopCar">加入购物车
						</tui-button>
					</view>
					<view class="tui-flex-1">
						<tui-button height="72rpx" :size="28" type="warning" shape="circle" @click="buyNow">立即购买
						</tui-button>
					</view>
				</view>
				<view v-if="deliverymode==1 || deliverymode==2"
					class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">

					<view class="tui-flex-1">
						<tui-button height="72rpx" :size="28" type="warning" shape="circle" @click="buyNow">立即预约
						</tui-button>
					</view>
				</view>
				<view class="tui-right">
					<tui-icon name="close-fill" color="#999" :size="20" @click="hidePopup"></tui-icon>
				</view>
			</view>
		</tui-bottom-popup>
		<!--规格选项结束-->

		<!--购买权限-->
		<tui-bottom-popup :show="openbuy" @close="hideopenbuy">
			<view class="tui-share__box">
				<view class="tui-share__header">
					<text>您还没有开通购买权限，请联客服</text>
					<view class="tui-close__box" @tap="hideopenbuy">
						<tui-icon name="shut" :size="20" color="#C9C9C9"></tui-icon>
					</view>
				</view>
				<view class="tui-share__list">
					<button open-type="contact" class="tui-share-btn">
						<view class="tui-share__item">
							<view class="tui-grid-icon">
								<tui-icon name="wechat" size="60" color="#4dae6b"></tui-icon>
							</view>
							<view class="tui-share__text">在线客服</view>
						</view>
					</button>
					<button class="tui-share-btn" @tap="tokefuTel">
						<view class="tui-share__item">
							<view class="tui-grid-icon">
								<tui-icon name="mobile" size="60" color="#4dae6b"></tui-icon>
							</view>
							<view class="tui-share__text">电话客服</view>
						</view>
					</button>
				</view>
			</view>
		</tui-bottom-popup>

		<!--底部分享弹层-->
		<tui-bottom-popup :show="sharePopup" @close="hideSharePopup">
			<view class="tui-share__box">
				<view class="tui-share__header">
					<text>分享</text>
					<view class="tui-close__box" @tap="hideSharePopup">
						<tui-icon name="shut" :size="20" color="#C9C9C9"></tui-icon>
					</view>
				</view>
				<view class="tui-share__list">
					<button open-type="share" class="tui-share-btn" @tap="onShare">
						<view class="tui-share__item">
							<image src="/static/images/mall/icon_popup_share.png"></image>
							<view class="tui-share__text">分享给好友</view>
						</view>
					</button>
					<view class="tui-share__item" @tap="createPoster">
						<image src="/static/images/mall/icon_popup_poster.png"></image>
						<view class="tui-share__text">生成分享海报</view>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
		<!--底部分享弹层-->
		<canvas :style="{ width: winWidth + 'px', height: winHeight + 'px' }" canvas-id="posterId" id="posterId"
			class="tui-poster__canvas"></canvas>
		<tui-modal custom :show="modalShow" backgroundColor="transparent" padding="0" @cancel="hideModal">
			<view class="tui-poster__box" :style="{marginTop:height+'px'}">
				<image src="/static/images/mall/icon_popup_closed.png" class="tui-close__img" @tap.stop="hideModal">
				</image>
				<image :src="posterImg" v-if="posterImg" class="tui-poster__img"></image>
				<tui-button type="danger" width="460rpx" height="80rpx" shape="circle" @click="savePic">保存图片
				</tui-button>
				<view class="tui-share__tips">保存图片到手机相册后，将图片分享到您的圈子</view>
			</view>
		</tui-modal>
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
				windowWidth: 0,
				height: 64, //header高度
				top: 26, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				swiperHeight: 343,
				opcity: 0,
				iconOpcity: 0.5,
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%'
				},
				banner: [],
				bannerIndex: 0,
				popupShow: false,
				openbuy: false,
				collected: false,
				sharePopup: false,
				posterImg: '',
				winWidth: uni.upx2px(560 * 2),
				winHeight: uni.upx2px(890 * 2),
				modalShow: false,
				hasMoreSelect: false,
				goodsDetail: [],
				deliverymode: 3,
				viewed: 1,
				quantity: 0,
				sku: [],
				goodsoptionImgSelect: '',
				selectSize: "请选择：",
				selectSizePrice: 0,
				totalPayPoints: 0,
				shopNum: 0,
				buyNumber: 1,
				buyNumMin: 1,
				buyNumMax: 9999,
				canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
				goodscomment: [],
				tel: '',
				uuid:''
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

			if (e && e.scene) {
				const scene = decodeURIComponent(e.scene) // 处理扫码进商品详情页面的逻辑
				if (scene) {
					e.id = scene.split(',')[0]
					if(scene.split(',')[1]){
						e.referrer_id = scene.split(',')[1];
					}
				}
			}

			if (e.referrer_id) {
				uni.setStorageSync('referrer_id', e.referrer_id)
			}

			if (uni.getStorageSync('referrer_id')) {
				_this.$util.getUserInfo(function(userInfo) {
					_this.$request.get('member.bindpid', {
						samkey: (new Date()).valueOf(),
						pid: uni.getStorageSync('referrer_id')
					});
				})
			}
			_this.$config.init(function() {
				_this.tel = _this.$config.getConf("TELEPHONE");
			});
			_this.getGoodsDetailInfo(e.id);
			// 获取购物车数量
			_this.$request.get('cart.total').then(res => {
				var total = res.data.total;
				if (total == null) {
					total = 0;
				}
				_this.shopNum = total;
			});
			_this.uuid = e.uuid;
			_this.getgoodscomment(e.id);

		},
		onShow() {
			uni.setStorageSync('servicetime', '');
			this.sam.login();
		},
		methods: {
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current;
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				});
			},
			back: function() {
				uni.navigateBack();
			},
			hideopenbuy() {
				this.openbuy = false
			},
			tokefuTel: function(e) { //客服电话
				const _this = this;
				var telstr = _this.tel;
				uni.makePhoneCall({
					phoneNumber: telstr,
				})
			},
			phoneCall: function(e) {
				var that = this; //console.log(that.data.inputVal);
				uni.showModal({
					title: '拔打客户电话',
					content: '确定要拔打' + that.goodsDetail.tel,
					showCancel: true,
					//是否显示取消按钮
					cancelText: "取消",
					//默认是“取消”
					confirmText: "拔号",
					//默认是“确定”
					success: function(res) {
						if (res.cancel) { //点击取消,默认隐藏弹框
						} else {
							//点击确定
							uni.makePhoneCall({
								phoneNumber: that.goodsDetail.tel
							});
						}
					},
					fail: function(res) {},
					//接口调用失败的回调函数
					complete: function(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）

				});
			},
			showPopup: function() {
				if (this.goodsDetail.noprice == 1) {
					this.openbuy = true;
					return;
				}
				this.popupShow = true;
			},
			hidePopup: function() {
				this.popupShow = false;
			},

			skumorenumberchange: function(e) {
				//console.log(e);
				this.goodsDetail.skumore[e.index].number = e.value;
			},
			change: function(e) {
				this.buyNumber = e.value;
			},
			collecting: function() {
				this.collected = !this.collected;
			},
			evaluate() {
				this.tui.href('/pages/goodsEvaluate/goodsEvaluate')
			},
			common: function() {
				this.tui.toast('功能开发中~');
			},
			coupon() {
				uni.navigateTo({
					url: '/pages/coupon/coupon'
				});
			},
			onShare() {
				this.hideSharePopup()
				//#ifdef APP-PLUS
				plus.share.sendWithSystem({
						content: 'ThorUI商城模板',
						href: 'https://www.thorui.cn/'
					},
					function() {
						console.log('分享成功');
					},
					function(e) {
						console.log('分享失败：' + JSON.stringify(e));
					}
				);
				//#endif
				// #ifdef H5
				thorui.getClipboardData('https://thorui.cn/doc', res => {
					if (res) {
						this.tui.toast('链接复制成功，赶快去分享吧~');
					} else {
						this.tui.toast('链接复制失败');
					}
				});
				// #endif
			},
			shop() {
				this.sam.navigateTo('/pages/index/index')
			},
			play() {
				uni.navigateTo({
					url: '/pages/video/video',
					animationType: 'zoom-out'
				})
			},
			showSharePopup() {
				this.sharePopup = true
			},
			hideSharePopup() {
				this.sharePopup = false
			},
			async createPoster() {
				const _this = this;
				this.hideSharePopup()
				if (this.posterImg) {
					this.modalShow = true;
					return;
				}
				uni.showLoading({
					mask: true,
					title: '图片生成中...'
				});
				
				let localpic = await _this.$request.post('localpic.index', {
					pic: this.goodsDetail.pic,
				})
				let mainPic = await poster.getImage(localpic.data);

				let qrdata = await _this.$request.post('qrcode', {
					goodsid: _this.goodsDetail.id,
					page: 'pages/goodsDetail/goodsDetail',
					is_hyaline: true,
					expireHours: 1
				})

				let qrcode = await poster.getImage(qrdata.data);
				// #ifdef MP-WEIXIN
				await poster.removeSavedFile();
				// #endif
				if (mainPic && qrcode) {
					const imgs = {
						mainPic: mainPic,
						qrcode: qrcode
					};
					let text = this.goodsDetail.name;
					let price = this.goodsDetail.price;
					let costs = this.goodsDetail.costs;
					poster.drawGoodsPoster('posterId', this.winWidth, this.winHeight, imgs, text, price, costs,
						'',
						res => {
							uni.hideLoading();
							if (res) {
								this.posterImg = res;
								setTimeout(() => {
									this.modalShow = true;
								}, 60);
							} else {
								this.tui.toast('生成海报失败,请稍后再试');
							}
						});
				} else {
					uni.hideLoading();
					this.tui.toast('生成海报图片下载失败,请稍后再试');
				}
			},
			hideModal() {
				this.modalShow = false;
			},
			savePic() {
				if (this.posterImg) {
					// #ifdef H5
					uni.previewImage({
						urls: [this.posterImg]
					});
					// #endif

					// #ifndef H5
					poster.saveImage(this.posterImg);
					// #endif

					this.hideModal();
				}
			},
			getGoodsDetailInfo: function(goodsId) {
				const _this = this;
				_this.$request.get('goods.detail', {
					id: goodsId
				}).then(res => {
					//console.log(res);
					if (res.errno == 0) {
						var selectSizeTemp = "";
						if (res.data.attribute) {
							if (res.data.attribute.length > 0) {
								for (var i = 0; i < res.data.attribute.length; i++) {
									selectSizeTemp = selectSizeTemp + " " + res.data.attribute[i].name;
								}
								_this.hasMoreSelect = true;
								_this.selectSize = _this.selectSize + selectSizeTemp;
							}
							_this.selectSizePrice = res.data.minPrice;
							_this.totalPayPoints = res.data.minPoints;
						}

						_this.goodsDetail = res.data;
						var minimum = res.data.minimum;
						_this.buyNumber = (minimum <= res.data.stores) ? minimum : 0;
						_this.buyNumMax = res.data.stores;
						_this.banner = res.data.pics;
						_this.goodsoptionImgSelect = res.data.pic;
						_this.selectSizePrice = res.data.minPrice;
						if (_this.goodsDetail.category.deliverymode) {
							_this.deliverymode = _this.goodsDetail.category.deliverymode;
						}
						if (_this.goodsDetail.basicInfo.viewed) {
							_this.viewed = _this.goodsDetail.basicInfo.viewed;
						}
						if (_this.goodsDetail.basicInfo.quantity) {
							_this.quantity = _this.goodsDetail.basicInfo.quantity;
						}
					}
				});
			},
			/**
			 * 选择商品规格
			 * @param {Object} e
			 */
			labelItemTap: function(e) {
				var _this = this;
				_this.goodsDetail.attribute[e.currentTarget.dataset.idx].checked = e.currentTarget.dataset.item;

				// 获取所有的选中规格尺寸数据
				var curSelectNum = 0;
				var sku = [];
				if (_this.goodsDetail.attribute) {
					for (var i = 0; i < _this.goodsDetail.attribute.length; i++) {

						if (_this.goodsDetail.attribute[i].checked) {
							sku.push(_this.goodsDetail.attribute[i].checked);
							curSelectNum++;
						}
					}
				}

				var canSubmit = false;
				if (_this.goodsDetail.attribute.length == curSelectNum) {
					canSubmit = true;
				}
				_this.sku = sku;
				// 计算当前价格
				if (canSubmit) {
					_this.$request.post('goods.price', {
						goodsId: _this.goodsDetail.id,
						sku: sku,
						samkey: (new Date()).valueOf()
					}).then(res => {
						//console.log(res.data.price)
						_this.selectSizePrice = res.data.price;
						_this.totalPayPoints = res.data.score;
						_this.buyNumMax = res.data.stores;
						_this.buyNumber = (res.data.stores > 0) ? 1 : 0;
					})
				}

				_this.canSubmit = canSubmit;
			},
			goShopCar: function() {
				uni.reLaunch({
					url: "/pages/cart/cart"
				});
			},

			toAddShopCar: function() {
				this.showPopup();
			},

			tobuy: function() {
				this.selectSizePrice = this.goodsDetail.minPrice;
				this.showPopup();
			},

			/**
			 * 加入购物车
			 */
			addShopCar: function() {
				var _this = this;
				if (this.goodsDetail.attribute && this.goodsDetail.attribute.length > 0 && !this.canSubmit) {
					if (!this.canSubmit) {
						wx.showModal({
							title: '提示',
							content: '请选择或填写商品规格！',
							showCancel: false
						})
					}
					this.showPopup();
					return;
				}
				if (this.buyNumber < 1) {
					wx.showModal({
						title: '提示',
						content: '购买数量不能为0！',
						showCancel: false
					})
					return;
				}
				if (this.buyNumber > parseInt(this.buyNumMax)) {
					uni.showModal({
						title: '提示',
						content: '购买数量不能超过库存量!',
						showCancel: false
					})
					return;
				}


				if (this.buyNumber < this.goodsDetail.minimum) {
					uni.showModal({
						title: '提示',
						content: '购买数量不能于小起售量！',
						showCancel: false
					})
					return;
				}

				//组建购物车
				_this.$request.post('cart.add', {
					goodsId: this.goodsDetail.id,
					sku: this.sku,
					quantity: this.buyNumber
				}).then(res => {
					wx.showToast({
						title: '加入购物车成功',
						icon: 'success',
						duration: 2000
					})
					_this.hidePopup();
					_this.shopNum = res.data.total;
				})
			},
			/**
			 * 立即购买
			 */
			buyNow: function() {
				let _this = this
				if (this.goodsDetail.attribute && this.goodsDetail.attribute.length > 0 && !this.canSubmit) {
					if (!this.canSubmit) {
						uni.showModal({
							title: '提示',
							content: '请选择或填写商品规格2！',
							showCancel: false
						})
					}
					this.showPopup();
					return;
				}
				if (this.buyNumber < 1) {
					uni.showModal({
						title: '提示',
						content: '购买数量不能为0！',
						showCancel: false
					})
					return;
				}
				let x = parseInt(_this.buyNumMax);

				if (this.buyNumber > x) {
					uni.showModal({
						title: '提示',
						content: '购买数量不能超过库存量！',
						showCancel: false
					})
					return;
				}

				if (this.buyNumber < this.goodsDetail.minimum) {
					uni.showModal({
						title: '提示',
						content: '购买数量不能于小起售量！',
						showCancel: false
					})
					return;
				}

				_this.$request.post('goods.buynowinfo', {
					goodsId: _this.goodsDetail.id,
					buyNumber: _this.buyNumber,
					sku: _this.sku,
					is_skumore: _this.goodsDetail.is_skumore,
					skumore: JSON.stringify(_this.goodsDetail.skumore)
				}).then(res => {
					if (res.errno != 0) {
						wx.showModal({
							title: '错误',
							content: res.msg,
							showCancel: false
						})
						return;
					}
					var buyNowInfo = {};
					buyNowInfo.shopList = res.data;
					buyNowInfo.technicalId = _this.uuid;
					buyNowInfo.shopList.is_skumore = _this.goodsDetail.is_skumore;
					buyNowInfo.shopList.sku = res.data.sku;
					buyNowInfo.shopList.skumore = _this.goodsDetail.skumore;
					buyNowInfo.shopList.number = res.data.quantity;
					buyNowInfo.shopList.skumorequantity = res.data.skumorequantity;
					buyNowInfo.kjId = _this.kjId;
					buyNowInfo.deliverymode = _this.goodsDetail.category.deliverymode;
					buyNowInfo.is_times = _this.goodsDetail.is_times;
					buyNowInfo.ptype = _this.goodsDetail.ptype;

					uni.setStorage({
						key: "buyNowInfo",
						data: buyNowInfo
					});

					uni.navigateTo({
						url: "/pages/submitOrder/submitOrder?orderType=buyNow"
					});
					_this.hidePopup();
					return;
				})
			},
			navigateTo(url) {
				this.sam.navigateTo(url);
			},
			urlTo(url) {
				window.open(url, '_self');
			},

			getgoodscomment: function(goodsId) {
				var _this = this;
				_this.$request.get('comment.getgoodscomment', {
					goodsId: goodsId
				}).then(res => {
					if (res.errno == 0) {
						_this.goodscomment = res.data
					}
				})
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
				console.log("/pages/goodsDetail/goodsDetail?id=" + _this.goodsDetail.id + "&referrer_id=" + res.uid)
				return {
					title: _this.goodsDetail.name || "",
					path: "/pages/goodsDetail/goodsDetail?id=" + _this.goodsDetail.id + "&referrer_id=" + res.uid,
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
		padding: 30rpx 0;
	}

	.tui-pro-pricebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ff201f;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 44rpx;
	}


	.tui-pro-price {
		display: flex;
		align-items: center;
	}

	.tui-price {
		font-size: 58rpx;
	}

	.tui-original-price {
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
	}

	.points_goods {
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		font-weight: normal;
	}

	.tui-line-through {
		text-decoration: line-through;
	}

	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 44rpx;
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

	.tui-share-btn {
		flex: 1;
		display: block;
		background: transparent;
		margin: 0;
		padding: 0;
		border-radius: 0;
		border: 0;
		line-height: 1;
	}

	.tui-share-btn::after {
		border: 0;
	}

	.tui-share-box {
		display: flex;
		align-items: center;
	}

	.tui-share-position {
		position: absolute;
		right: 0;
		top: -10rpx;
	}

	.tui-share-text {
		color: #333;
		padding-left: 8rpx;
	}

	.tui-sub-title {
		padding: 20rpx 0;
		line-height: 32rpx;
	}

	.tui-sale-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30rpx;
	}

	.tui-discount-box {
		background: #fff;
	}

	.tui-list-cell {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 36rpx 30rpx;
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

	.tui-basic-info {
		background: #fff;
	}

	.tui-addr-box {
		width: 76%;
	}

	.tui-addr-item {
		padding: 10rpx;
		line-height: 34rpx;
	}

	.tui-guarantee {
		background: #fdfdfd;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx 30rpx 30rpx;
		font-size: 24rpx;
	}

	.tui-guarantee-item {
		color: #999;
		padding-right: 20rpx;
		padding-top: 10rpx;
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

	/*底部操作栏*/

	/*底部选择弹层*/

	.tui-popup-class {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30rpx 0 100rpx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	/* .tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	} */

	/* .tui-icon-close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	} */

	.tui-product-box {
		display: flex;
		font-size: 24rpx;
		padding-bottom: 30rpx;
	}

	.tui-popup-img {
		width: 160rpx;
		border-radius: 8rpx;
		display: block;
	}

	.tui-popup-price {
		padding-left: 20rpx;
		padding-bottom: 8rpx;
	}

	.popup-box-goodsname {
		font-size: 32rpx;
	}

	.tui-amount {
		color: #ff201f;
		font-size: 36rpx;
	}

	.tui-number {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 12rpx;
		color: #999;
	}

	.tui-popup-scroll {
		height: 600rpx;
		font-size: 26rpx;
	}

	.tui-scrollview-box {
		padding: 0 30rpx 60rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-scrollview-box .label {
		padding: 30rpx 0 20rpx 0rpx;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20rpx 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 200rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
	}

	.text-item {
		display: flex;
	}

	.text-item-input {
		height: 50rpx;
		margin-top: 18rpx;
		margin-left: 16rpx;
		padding-top: 6rpx;
		padding-bottom: 6rpx;
		padding-left: 18rpx;
		font-size: 28rpx;
		border: 1px solid #eee;
		border-radius: 25rpx;
	}

	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-attr-active::after {
		content: '';
		position: absolute;
		border: 1rpx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40rpx;
		left: 0;
		top: 0;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	/*底部选择弹层*/

	/*分享弹层*/
	.tui-share__box {
		width: 100%;
		height: 380rpx;
		background-color: #fff;
	}

	.tui-share__header {
		padding: 40rpx 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		text-align: center;
		position: relative;
	}

	.tui-close__box {
		position: absolute;
		right: 25rpx;
		top: 25rpx;
	}

	.tui-share__list {
		width: 100%;
		padding-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-share__item {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.tui-share__item image {
		width: 120rpx;
		height: 120rpx;
	}

	.tui-share__text {
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
		padding-top: 18rpx;
	}

	/*海报modal弹层*/
	.tui-poster__canvas {
		background-color: #fff;
		position: absolute;
		left: -9999px;
	}

	.tui-poster__box {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.tui-close__img {
		width: 48rpx;
		height: 48rpx;
		position: absolute;
		right: 0;
		top: -60rpx;
	}

	.tui-poster__img {
		width: 560rpx;
		height: 890rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}

	.tui-share__tips {
		font-size: 24rpx;
		transform: scale(0.8);
		transform-origin: center center;
		color: #ffffff;
		padding-top: 12rpx;
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
		border-radius: 20%;
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
</style>
