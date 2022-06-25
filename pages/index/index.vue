<template>
	<view class="container" :style="pagebase.base.bgstyle">
		<Pengpai-FadeInOut v-if="config.is_broadcast==1" :top="118" :loop="true" :info="item"
			v-for="(item, index) in list" :key="index">
		</Pengpai-FadeInOut>
		<block v-for="(diyitem,itemindex) in modulelist" :key="itemindex">
			<!--header-->
			<block v-if="diyitem.type === 'search'">
				<view class="tui-header" :style="{opacity:opacity, background:diyitem.base.bc}">
					<view class="tui-rolling-search">
						<block v-if="diyitem.base.is_location=='1'">
							<tui-icon @tap="selectCity" name="position-fill" color="#333" :size="30" unit="rpx">
							</tui-icon>
							<view @tap="selectCity" class="tui-city-name">{{cityName}}</view>
							<tui-icon @tap="selectCity" name="turningdown" :size="32" unit="rpx"></tui-icon>
							<view class="tui-city-line">|</view>
						</block>
						<tui-icon name="search-2" :size="32" unit="rpx"></tui-icon>
						<swiper @tap="search" vertical autoplay circular interval="8000" class="tui-swiper">
							<swiper-item v-for="(item, index) in diyitem.params.hotkey" :key="index"
								class="tui-swiper-item">
								<view class="tui-hot-item">{{ item }}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="hot-keywords" :style="{background:diyitem.base.bc}">
					<view v-if="diyitem.base.is_hotkey=='1'" class="tui-hot-search"
						:style="{color:diyitem.base.hotkeytxtColor}">
						<view>热搜</view>
						<block v-for="(item, index) in diyitem.params.hotkey" :key="index">
							<view class="tui-hot-tag" :data-key="item" @tap="more">{{item}}</view>
						</block>
					</view>
				</view>
			</block>
			<!--header-->
			<!-- banner -->
			<block v-if="diyitem.type === 'banner'">
				<view :style="{paddingTop:diyitem.base.paddingTop+'px', paddingLeft:0}">
					<view class="tui-header-banner" :style="diyitem.base.bgstyle">
						<view class="tui-banner-bg" :style="{height: swiperHeight + 'px'}">
							<!--banner-->
							<view class="tui-banner-box">
								<swiper :style="{ height: swiperHeight + 'px' }" :indicator-dots="true" :autoplay="true"
									:interval="5000" :duration="150" class="tui-banner-swiper" :circular="true"
									indicator-color="rgba(255, 255, 255, 0.8)" indicator-active-color="#fff">
									<swiper-item v-for="(banner, index) in diyitem.list" :key="index">
										<image @tap="navigateTo" :data-url="banner.link.path" :src="banner.img"
											class="tui-slide-image" mode="widthFix" @load="setswiperHeight" />
									</swiper-item>
								</swiper>
							</view>
						</view>
						<view class="tui-header-bannerbottom"></view>
					</view>
				</view>

			</block>
			<!-- 导航组 -->
			<block v-if="diyitem.type === 'navBar'">
				<view class="diy-navBar">
					<view :class="['data-list', 'avg-sm-'+diyitem.base.column]">
						<view class="item-nav" v-for="(dataItem,index) in diyitem.list" :key="index">
							<view class="nav-to" @tap="navigateTo" :data-url="dataItem.link.path">
								<view class="item-image">
									<image mode="widthFix" :src="dataItem.icon.custompic"></image>
								</view>
								<view class="item-text f-24 onelist-hidden" :style="{color: dataItem.text.color}">
									{{ dataItem.text.txt }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!-- 单图组 -->
			<block v-if="diyitem.type === 'imageSingle'">
				<view class="diy-imageSingle" :style="diyitem.base.bgstyle">
					<view
						:style="{'paddingBottom':diyitem.base.paddingTop+'px' ,'paddingRight':diyitem.base.paddingLeft+'px'}">
						<view class="item-image"
							:style="{'paddingTop':diyitem.base.paddingTop+'px' ,'paddingLeft':diyitem.base.paddingLeft+'px'}">
							<view class="nav-to" @tap="navigateTo" :data-url="diyitem.link.path">
								<image :src="diyitem.img" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 图片橱窗 -->
			<block v-if="diyitem.type === 'window'">
				<view class="diy-window"
					:style="{'background':diyitem.base.bc, 'paddingTop':diyitem.base.paddingTop+'px' ,'paddingLeft':diyitem.base.paddingLeft+'px'}">
					<!-- display -->
					<view class="display">
						<!-- 1 -->
						<view class="display-left"
							:style="{'paddingTop ':diyitem.base.paddingTop+'px','paddingLeft':diyitem.base.paddingLeft+'px'}">
							<image @tap="navigateTo" :data-url="diyitem.list[0].link.path" :src="diyitem.list[0].img">
							</image>
						</view>
						<!-- 2 -->
						<view v-if="diyitem.list.length === 2" class="display-right"
							:style="{padding:diyitem.base.paddingTop+'px',paddingLeft:diyitem.base.paddingLeft+'px'}">
							<image @tap="navigateTo" :data-url="diyitem.list[1].link.path" :src="diyitem.list[1].img">
							</image>
						</view>
						<!-- 3 -->
						<view v-if="diyitem.list.length === 3" class="display-right">
							<view class="display-right1"
								:style="{padding:diyitem.base.paddingTop+'px',paddingLeft:diyitem.base.paddingLeft+'px'}">
								<image @tap="navigateTo" :data-url="diyitem.list[1].link.path"
									:src="diyitem.list[1].img">
								</image>
							</view>
							<view class="display-right2"
								:style="{padding:diyitem.base.paddingTop+'px',paddingLeft:diyitem.base.paddingLeft+'px'}">
								<image @tap="navigateTo" :data-url="diyitem.list[2].link.path"
									:src="diyitem.list[2].img">
								</image>
							</view>
						</view>
						<!-- 4 -->
						<view v-if="diyitem.list.length === 4" class="display-right">
							<view class="display-right1"
								:style="{padding:diyitem.base.paddingTop+'px',paddingLeft:diyitem.base.paddingLeft+'px'}">
								<image @tap="navigateTo" :data-url="diyitem.list[1].link.path"
									:src="diyitem.list[1].img">
								</image>
							</view>
							<view class="display-right2">
								<view class="left"
									:style="{padding:diyitem.base.paddingTop+'px',paddingLeft:diyitem.base.paddingLeft+'px'}">
									<image @tap="navigateTo" :data-url="diyitem.list[2].link.path"
										:src="diyitem.list[2].img"></image>
								</view>
								<view class="right"
									:style="{padding:diyitem.base.paddingTop+'px',paddingLeft:diyitem.base.paddingLeft+'px'}">
									<image @tap="navigateTo" :data-url="diyitem.list[3].link.path"
										:src="diyitem.list[3].img"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!-- 视频组 -->
			<block v-if="diyitem.type === 'video'">
				<view class="diy-video" :style="{paddingTop:diyitem.base.paddingTop+'px', paddingLeft:0}">
					<!--<video :style="{height: diyitem.base.height +'px'}" :src="diyitem.params.videoUrl"
						:poster="diyitem.params.poster" controls></video>-->
				</view>
			</block>

			<!-- 公告组 -->
			<block v-if="diyitem.type === 'notice'">
				<view class="diy-notice">
					<uni-notice-bar :showIcon="true" :scrollable="true" :single="true"
						:background-color="diyitem.base.bc" :paddingTop="diyitem.base.paddingTop"
						:text="diyitem.text.txt">
					</uni-notice-bar>
				</view>
			</block>
			<!-- 空白组 -->
			<block v-if="diyitem.type === 'blank'">
				<view class="diy-blank" :style="{height:diyitem.base.height+'px', background:diyitem.base.bc}">
				</view>
			</block>
			<!-- 辅助线 -->
			<block v-if="diyitem.type === 'guide'">
				<view class="diy-guide"
					:style="{paddingTop:diyitem.base.paddingTop+'px', paddingLeft:0, background: diyitem.base.bc}">
					<view class="line"
						:style="['border-top:'+diyitem.base.lineHeight+'px', diyitem.base.lineStyle,diyitem.base.lineColor]">
					</view>
				</view>
			</block>
			<!-- 富文本 -->
			<block v-if="diyitem.type === 'richText'">
				<view class="diy-richText"
					:style="{paddingTop:diyitem.base.paddingTop+'px', paddingLeft:diyitem.base.paddingLeft+'px', background:diyitem.base.bc}">
					<view class="">
						<rich-text :nodes="diyitem.params.content"></rich-text>
					</view>
				</view>
			</block>
			<!--秒杀-->
			<block v-if="diyitem.type === 'snapup'">
				<view class="tui-product-box">
					<view class="tui-block__box ">
						<view class="tui-group-name">
							<view class="tui-seckill__box">
								<image src="/static/images/mall/img_home_seckill_3x.png" class="tui-seckill__img"
									mode="widthFix"></image>
								<view class="tui-countdown__box">
									<view class="tui-countdown__title">距结束</view>
									<view class="tui-flex__center">
										<tui-countdown :time="3800" backgroundColor="transparent"
											borderColor="transparent" color="#EB0909" colonColor="#EB0909">
										</tui-countdown>
									</view>
								</view>
							</view>
							<view class="tui-more__box" @tap="seckill(1)">
								<text>更多</text>
								<tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
							</view>
						</view>
						<scroll-view scroll-x>
							<view class="tui-goods__list">
								<view class="tui-goods__item" @tap="seckill(2)" v-for="(item, index) in 8" :key="index">
									<view class="tui-goods__imgbox">
										<image :src="`/static/images/mall/product/${index % 2 == 0 ? 4 : 2}.jpg`"
											mode="widthFix" class="tui-goods__img"></image>
									</view>
									<view class="tui-pri__box">
										<view class="tui-sale-pri">
											<view class="tui-size-sm">¥</view>
											<view>298</view>
											<view class="tui-size-sm">.50</view>
										</view>
									</view>
									<view class="tui-original__pri">¥399.00</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</block>
			<!--超值拼团-->
			<block v-if="diyitem.type === 'groupwork'">
				<view class="tui-product-box">
					<view class="tui-block__box">
						<view class="tui-group-name">
							<view>
								<text>超值拼团</text>
								<text class="tui-sub__desc tui-color__pink">拼着买更便宜</text>
							</view>
							<view class="tui-more__box" @tap="group(1)">
								<text>更多</text>
								<tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
							</view>
						</view>
						<scroll-view scroll-x>
							<view class="tui-goods__list">
								<view class="tui-goods__item" @tap="group(2)" v-for="(item, index) in 8" :key="index">
									<view class="tui-goods__imgbox">
										<image :src="`/static/images/product/${index % 2 == 0 ? 55 : 44}.jpg`"
											mode="widthFix" class="tui-goods__img"></image>
									</view>
									<view class="tui-pri__box">
										<view class="tui-sale-pri">
											<view class="tui-size-sm">¥</view>
											<view>298</view>
											<view class="tui-size-sm">.50</view>
										</view>
									</view>
									<view class="tui-original__pri">¥399.00</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</block>
			<!--排行榜-->
			<block v-if="diyitem.type === 'ranking'">
				<view class="tui-product-box">
					<view class="tui-block__box">
						<view class="tui-group-name" @tap="more">
							<view>
								<text>排行榜</text>
								<text class="tui-sub__desc">大家都在买</text>
							</view>
							<view class="tui-more__box">
								<text>更多</text>
								<tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
							</view>
						</view>
						<view class="tui-new-box">
							<view class="tui-new-item" :class="[index != 0 && index != 1 ? 'tui-new-mtop' : '']"
								v-for="(item, index) in newProduct" :key="index" @tap="detail">
								<image
									:src="'/static/images/mall/new/' + (item.type == 1 ? 'new' : 'discount') + '.png'"
									class="tui-new-label" v-if="item.isLabel"></image>
								<view class="tui-title-box">
									<view class="tui-new-title">{{ item.name }}</view>
									<view class="tui-new-price">
										<text class="tui-new-present">￥{{ item.present }}</text>
										<text class="tui-new-original">￥{{ item.original }}</text>
									</view>
								</view>
								<image :src="'/static/images/mall/new/' + item.pic" class="tui-new-img"></image>
							</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 商品组 -->
			<block v-if="diyitem.type === 'goods'">
				<view v-if="diyitem.list.length>0" class="tui-product-list">
					<view class="tui-group-name">
										<view>
											<text :style="{color:diyitem.title.color}">{{diyitem.title.txt}}</text>
				
										</view>
										<view class="tui-more__box">
											<text>更多</text>
											<tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
										</view>
				
									</view>
					<view class="diy-goods">
						<view
							:class="'goods-list display__' + diyitem.base.display + ' column__' + diyitem.base.column">
							<scroll-view :scroll-x="diyitem.base.display === 'slide' ? true : false">
								<view v-for="(dataItem, index) in diyitem.list" :key="index" class="goods-item">
									<navigator hover-class="none"
										:url="dataItem.goods_id > 0 ? '/pages/goodsDetail/goodsDetail?id=' + dataItem.goods_id : ''">
										<view class="goods-image">
											<image :style="diyitem.base.widthheight?diyitem.base.widthheight:''"
												:src="dataItem.image"></image>
										</view>
										<view class="detail">
											<view v-if="diyitem.base.text.show > 0"
												class="goods-name twolist-hidden f-28">
												{{ dataItem.goods_name }}
											</view>
											<view v-if="diyitem.base.sjg" class="goods-price f-30 col-m">
												<text
													v-if="dataItem.is_points_goods==1">积分:{{ dataItem.pay_points }}</text>
												<text v-if="dataItem.is_points_goods!=1">￥{{ dataItem.price }}</text>
												<text v-if="dataItem.minimum > 1"
													style="color:#999;font-size:24rpx;">起售量 {{dataItem.minimum}}</text>
											</view>
										</view>
									</navigator>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</block>
			<!-- 师傅组 -->
			<block v-if="diyitem.type === 'technical'">
				<view v-if="diyitem.list.length>0" class="tui-product-list">
					<view class="diy-goods">
						<view
							:class="'goods-list display__' + diyitem.base.display + ' column__' + diyitem.base.column">
							<scroll-view :scroll-x="diyitem.base.display === 'slide' ? true : false">
								<view v-for="(dataItem, index) in diyitem.list" :key="index" class="goods-item">
									<navigator hover-class="none"
										:url="dataItem.id > 0 ? '/pages/technical/details?id=' + dataItem.id : ''">
										<view class="goods-image">
											<image :style="diyitem.base.widthheight?diyitem.base.widthheight:''"
												:src="dataItem.touxiang  || '/static/images/my/mine_def_touxiang_3x.png'">
											</image>
										</view>
										<view class="technicaldetail">
											<view class="goods-name twolist-hidden f-28">
												{{ dataItem.title }}
											</view>
										</view>
									</navigator>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</block>
			<!-- 优惠券组 -->
			<block v-if="diyitem.type === 'coupon'">
				<view class="diy-coupon"
					:style="{'background':diyitem.base.bc, 'paddingTop':diyitem.base.paddingTop+'px'}">
					<scroll-view scroll-x>
						<view class="coupon-wrapper" v-for="(dataItem,index) in diyitem.list" :key="index">
							<view :class="['coupon-item', 'color__'+ dataItem.color]">
								<i class="before" :style="{'background':diyitem.base.bc}"></i>
								<view class="left-content dis-flex flex-dir-column flex-x-center flex-y-center">
									<view class="content-top">
										<block v-if="dataItem.coupon_type == 10">
											<text class="f-30">￥</text>
											<text class="price">{{ dataItem.reduce_price }}</text>
										</block>
										<text class="price"
											v-if="dataItem.coupon_type == 20">{{ dataItem.discount }}折</text>
									</view>
									<view class="content-bottom">
										<text class="f-22">满{{ dataItem.min_price }}元可用</text>
									</view>
								</view>
								<view class="right-receive dis-flex flex-x-center flex-y-center">
									<view v-if="dataItem.state.value" :data-itemindex="itemindex"
										:data-index="dataItem.coupon_id" :data-state="dataItem.state.value"
										:data-coupon-id="dataItem.coupon_id" @tap="receiveTap"
										class="dis-flex flex-dir-column">
										<text>立即</text>
										<text>领取</text>
									</view>
									<view v-else class="state">
										<text>{{ dataItem.state.text }}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</block>
		</block>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<!-- <tui-nomore v-if="!pullUpOn"></tui-nomore> -->
		<!--加载loadding-->
		<view class="position-box top" @tap="tokefuTel">
			<view class="img-tel-style zindex100 yc"></view>
			<image class="img-tel-style" src="/static/images/kefutel.png"></image>
		</view>
		<view class="position-box bottom">
			<button open-type="contact" class="img-plus-style zindex100 yc"></button>
			<image src="/static/images/kefulink.png" class="img-plus-style"></image>
		</view>
		<view class="tui-safearea-bottom"></view>
		<tui-tabbar :current="current">
		</tui-tabbar>
	</view>
</template>
<script>
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	import PengpaiFadeInOut from "@/components/Pengpai-FadeInOut/Pengpai-FadeInOut.vue"
	import QQMapWX from '@/libs/qqmap-wx-jssdk.min.js';
	export default {
		components: {
			uniNoticeBar,
			PengpaiFadeInOut
		},
		data() {
			return {
				list: [],
				config: {},
				windowWidth: 0,
				swiperHeight: 150,
				current: '',
				cityName: '',
				latitude: "",
				longitude: "",
				qqmapsdk: null,
				key: 'PKEBZ-CQL6W-WQGRE-O4X3A-NCTK6-XPFKG',
				id: '',
				//diy数据
				modulelist: [],
				pagebase: [],
				newProduct: [{
						name: '时尚舒适公主裙高街修身长裙',
						present: 198,
						original: 298,
						pic: '1.jpg',
						type: 1,
						isLabel: true
					},
					{
						name: '高街修身雪纺衫',
						present: 398,
						original: 598,
						pic: '2.jpg',
						type: 2,
						isLabel: true
					},
					{
						name: '轻奢商务上衣',
						present: 99,
						original: 199,
						pic: '3.jpg',
						type: 1,
						isLabel: true
					},
					{
						name: '品质牛皮婚鞋牛皮婚鞋品质就是好',
						present: 99,
						original: 199,
						pic: '5.jpg',
						type: 1,
						isLabel: true
					},
					{
						name: '轻奢时尚大包限时新品推荐',
						present: 99,
						original: 199,
						pic: '6.jpg',
						type: 1,
						isLabel: false
					},
					{
						name: '高街修身长裙',
						present: 999,
						original: 1299,
						pic: '4.jpg',
						type: 2,
						isLabel: true
					}
				],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				opacity: 1,
				timer: null,
				num: 0,
				currentid: 0,
				cumulative: 0
			};
		},
		onLoad: function(e) {
			let _this = this
			this.current = "/" + this.__route__;
			uni.showLoading({
				title: '数据加载中'
			});

			//console.log(e.scene);
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);

			if (e.id) {
				_this.id = e.id;
			}
			if (!e.referrer_id) {
				if (e && e.scene) {
					e.referrer_id = e.scene;
				}
			}

			if (e.referrer_id) {
				uni.setStorageSync('referrer_id', e.referrer_id)
			}

			_this.sam.login().then(res => {
				console.log(res.uid);
				if (res.uid > 0) {
					if (uni.getStorageSync('referrer_id')) {
						_this.$request.get('member.bindpid', {
							samkey: (new Date()).valueOf(),
							pid: uni.getStorageSync('referrer_id')
						}).then(res => {
							if (res.errno == 0) {
								console.log('pid绑定成功');
							}
						})
					}
				}
				_this.getdiypage();
			});

			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						console.log(res);
						this.hieghtS = res.windowHeight;
						this.windowWidth = res.windowWidth;
					}
				});
			}, 0);

			_this.getNewMessage();
			_this.timer = setInterval(() => {
				setTimeout(() => {
					_this.getNewMessage()
				}, 0)
			}, 5000)
		},
		onShow() {
			let _this = this;
			_this.getdiypage();
			if (uni.getStorageSync('cityName')) {
				this.cityName = uni.getStorageSync('cityName');
			} else {
				this.qqmapsdk = new QQMapWX({
					key: this.key
				});
				uni.authorize({
					scope: 'scope.userLocation',
					success: res => {
						//console.log(res)
						uni.getLocation({
							type: 'wgs84',
							success(res) {
								uni.setStorageSync('latitude', res.latitude);
								uni.setStorageSync('longitude', res.longitude);
								console.log(res);
								_this.getLocationByLonglat(res.latitude, res.longitude);
							}
						});
					},
					fail: res => {
						//console.log('失败：', res);
					}
				});
			}
			this.sam.onShowlogin();
		},
		destroyed() {
			clearInterval(this.timer)
		},
		methods: {
			getNewMessage: function() {
				let _this = this;
				_this.$request.postnoLoading('broadcast.index', {
					cumulative: _this.cumulative,
					currentid: _this.currentid,
				}).then(res => {
					if (res.errno == 0) {
						if (res.data) {
							if (_this.num > 3) {
								_this.list = [];
								_this.num = 0;
							}
							_this.currentid = res.data.id;
							//追加一条数据
							_this.list = _this.list.concat(res.data);
							_this.num++;
							_this.cumulative++;
						} else {
							_this.currentid = 0;
						}
					}
				})
			},
			setswiperHeight(e) {
				//console.log(e);
				this.swiperHeight = e.detail.height * ((this.windowWidth - 20) / e.detail.width);
			},
			//获取后台数据
			getdiypage: function() {
				let _this = this;
				_this.$request.get('diypage.indexv2', {
					id: _this.id
				}).then(res => {
					if (res.errno == 0) {
						_this.config = res.data.config;
						if (res.data.modulelist) {
							_this.modulelist = res.data.modulelist;
							_this.pagebase = res.data.pagebase;
							uni.setNavigationBarTitle({
								title: res.data.config.sys_title
							});
							uni.setNavigationBarColor({
								frontColor: res.data.pagebase.base.titleTextColor,
								backgroundColor: res.data.pagebase.base.titleBackgroundColor,
								animation: { //动画效果
									duration: 400,
									timingFunc: 'easeIn'
								}
							});
						}
					}
				})
			},
			/**
			 * 领取优惠券
			 */
			receiveTap: function(e) {
				let _this = this,
					dataset = e.currentTarget.dataset;
				if (!dataset.state) {
					return false;
				}

				//console.log(dataset.itemindex);

				_this.$request.post('Couponreceive.add', {
					coupon_id: dataset.couponId
				}).then(res => {
					wx.showToast({
						title: res.message,
						icon: 'none'
					})
					_this.modulelist[dataset.itemindex].data[dataset.index].state = {
						value: 0,
						text: '已领取'
					};
				})
			},
			navigateTo: function(e) {
				this.sam.navigateTo(e.currentTarget.dataset.url)
			},
			detail: function() {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail'
				});
			},
			coupon() {
				uni.navigateTo({
					url: '/pages/coupon/coupon'
				});
			},
			category: function() {
				uni.navigateTo({
					url: '../category/category'
				});
			},
			more: function(e) {
				let key = e.currentTarget.dataset.key || '';
				uni.navigateTo({
					url: '/pages/goodsList/goodsList?keyword=' + key
				});
			},
			selectCity: function() {
				uni.navigateTo({
					url: '/pages/selectCity/selectCity'
				});
			},
			search: function() {
				uni.navigateTo({
					url: '/pages/common/search/search'
				});
			},
			seckill(type) {
				let url = type == 1 ? '/pages/seckillList/seckillList' :
					'/pages/seckillDetail/seckillDetail';
				this.tui.href(url);
			},
			group(type) {
				let url = type == 1 ? '/pages/groupList/groupList' :
					'/pages/groupDetail/groupDetail';
				this.tui.href(url);
			}, //经纬度获取位置
			getLocationByLonglat: function(latitude, longitude) {
				let _this = this;
				// #ifdef H5
				let url =
					`https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude + "," + longitude}&key=${this.key}&callbackName=QQmap&output=jsonp&coord_type=5&get_poi=0`
				this.tui.tuiJsonp(url, (res) => {
					if (res.status === 0) {
						//地址信息
						//console.log(res.result.address_component)
					}
				}, "QQmap")
				// #endif

				// #ifndef H5
				this.qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						console.log(res.result);
						//let city = res.result.address_component.city;
						_this.cityName = res.result.address_component.city;
						uni.setStorageSync('cityName', res.result.address_component.city);

					},
					fail: res => {
						//console.log('失败：', res);
					}
				})
				// #endif
			},
			tokefuTel: function (e) {
			  //客服电话
			  const _this = this;
			
			  var telstr = _this.config.TELEPHONE;
			  uni.makePhoneCall({
			    phoneNumber: telstr
			  });
			}
		},
		onPullDownRefresh: function() {
			this.getdiypage()
			uni.stopPullDownRefresh();
		},
		onReachBottom: function() {

		},
		onPageScroll(e) {
			// #ifdef APP-PLUS
			let scrollTop = e.scrollTop;
			if (scrollTop < 0) {
				if (this.opacity > 0)
					this.opacity = 1 - Math.abs(scrollTop) / 30;
			} else {
				this.opacity = 1
			}
			// #endif
		},
		//发送给朋友
		onShareAppMessage: function() {
			let _this = this;
			_this.sam.login().then(res => {
				if (res.uid > 0) {
					console.log("/pages/index/index?referrer_id=" + res.uid)
					return {
						title: _this.pagebase.params.share_title || "",
						path: "/pages/index/index?referrer_id=" + res.uid,
					};
				}
			});
		},
		onShareTimeline(res) { //分享到朋友圈
			return {}
		},
	};
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.container {
		padding-bottom: 228rpx;
		color: #333;
	}

	.orderplay {
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		top: 180rpx;
		z-index: 999;
		transition: opacity .4s;
	}

	.order-item {

		color: #ffffff;
		background-color: #2e2e2e;
	}

	.tui-header {
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		transition: opacity .4s;
	}

	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		border-radius: 35rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		color: #999;
	}

	.tui-category {
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 0;
		margin-right: 22rpx;
		flex-shrink: 0;
	}

	.tui-category-scale {
		transform: scale(0.7);
		line-height: 24rpx;
	}

	.tui-icon-category {
		line-height: 20px !important;
		margin-bottom: 0 !important;
	}

	.tui-swiper {
		font-size: 26rpx;
		height: 60rpx;
		flex: 1;
		padding-left: 12rpx;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-hot-item {
		line-height: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-city-name {
		padding-left: 6rpx;
		padding-right: 0rpx;
		color: #333;
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-city-line {
		color: #d3d3d3;
		padding-left: 16rpx;
		padding-right: 20rpx;
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.hot-keywords {
		padding-top: 100rpx;
		z-index: 10;
	}

	.tui-hot-search {
		color: #fff;

		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
	}

	.tui-hot-tag {
		background-color: rgba(255, 255, 255, 0.15);
		padding: 10rpx 24rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 24rpx;
	}

	.tui-header-banner {
		box-sizing: border-box;
	}

	.tui-header-bannerbottom {
		padding-top: 20rpx;
	}

	.tui-banner-bg {
		display: flex;
		position: relative;
	}

	.tui-banner-box {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: absolute;
		/* overflow: hidden; */
		z-index: 99;
		left: 0;
	}

	.tui-banner-swiper {
		width: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		transform: translateY(0);
		background-color: #f8f8f8;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/* #ifdef MP-WEIXIN */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-banner-swiper .wx-swiper-dot-active::before {
		background-color: #fff;
	}

	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	>>>.tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background-color: none;
		justify-content: space-between;
	}

	>>>.tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.tui-banner-swiper .uni-swiper-dot-active::before {
		background-color: #fff;
	}

	>>>.tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.tui-product-category {
		padding: 80rpx 20rpx 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24rpx;
		color: #555;
		/* margin-bottom: 20rpx; */
	}

	.tui-category-item {
		width: 20%;
		height: 118rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-category-img {
		height: 88rpx;
		width: 88rpx;
		display: block;
	}

	.tui-category-name {
		line-height: 24rpx;
	}

	.tui-block__box {
		width: 100%;
		padding: 0 25rpx 25rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.tui-product-box {
		margin-top: 20rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
	}

	.tui-img__coupon {
		width: 100%;
		height: 184rpx;
		display: block;
	}

	.tui-mtop__20 {
		margin-top: 20rpx;
	}

	.tui-bg-white {
		background-color: #fff;
	}

	.tui-group-name {
		width: 100%;
		font-size: 34rpx;
		line-height: 34rpx;
		font-weight: bold;
		text-align: center;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}

	.tui-sub__desc {
		color: #34c7a9;
		font-size: 28rpx;
		font-weight: 400;
		padding-left: 25rpx;
	}

	.tui-color__pink {
		color: #EF1346;
	}

	.tui-seckill__box {
		display: flex;
		align-items: center;
	}

	.tui-seckill__img {
		width: 160rpx;
		height: 34rpx;
	}

	.tui-countdown__box {
		width: 228rpx;
		display: flex;
		align-items: center;

		color: #fff;
		background-color: #fff;
		font-weight: 400;
		border: 1rpx solid #eb0909;
		height: 40rpx;
		border-radius: 30px;
		overflow: hidden;
		margin-left: 25rpx;
	}

	.tui-countdown__title {
		width: 100rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #eb0909;
		flex-shrink: 0;
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-flex__center {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/*秒杀商品*/
	.tui-goods__list {
		display: flex;
		align-items: center;
	}

	.tui-goods__item {
		background-color: #fff;
		width: 150rpx;
		height: 230rpx;
		border-radius: 6rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
		margin-right: 18rpx;
	}

	.tui-goods__imgbox {
		width: 150rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.tui-goods__img {
		max-width: 150rpx;
		max-height: 150rpx;
		display: block;
	}

	.tui-pri__box {
		max-width: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tui-sale-pri {
		display: flex;
		align-items: flex-end;
		padding: 10rpx 0 8rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #eb0909;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.tui-size-sm {
		font-size: 24rpx;
		line-height: 24rpx;
		transform: scale(0.8);
		transform-origin: 0 50%;
	}

	.tui-original__pri {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #999999;
		transform-origin: center 10%;
		transform: scale(0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: line-through;
	}

	/*秒杀商品*/

	.tui-more__box {
		display: flex;
		align-items: center;
		font-weight: 400;
		color: #999;
	}

	.tui-more__box text {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-new-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.tui-new-item {
		width: 49%;
		height: 180rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #f5f2f9;
		position: relative;
		border-radius: 12rpx;
	}

	.tui-new-mtop {
		margin-top: 2%;
	}

	.tui-title-box {
		font-size: 24rpx;
	}

	.tui-new-title {
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-new-price {
		padding-top: 18rpx;
	}

	.tui-new-present {
		color: #ff201f;
		font-weight: bold;
	}

	.tui-new-original {
		display: inline-block;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
		transform: scale(0.8);
		transform-origin: center center;
	}

	.tui-new-img {
		width: 148rpx;
		height: 148rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-new-label {
		width: 56rpx;
		height: 56rpx;
		border-top-left-radius: 12rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.tui-title__img {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		justify-content: center;
	}

	.tui-title__img image {
		width: 352rpx;
		height: 32rpx;
	}

	.tui-product-list {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		padding: 0 19rpx;
		justify-content: space-between;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
	}

	.tui-product-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.tui-pro-item:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		margin-left: 1%;
		margin-right: 1%;
		width: 48%;
		margin-bottom: 2%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
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


	/* 导航组 */

	.diy-navBar {
		padding-bottom: 20rpx;
	}

	.diy-navBar .data-list::after {
		clear: both;
		content: " ";
		display: table;
	}

	.diy-navBar .item-nav {
		float: left;
		margin: 7px 0;
		text-align: center;
	}

	.diy-navBar .item-nav .item-image {
		margin-bottom: 4px;
		font-size: 0;
	}

	.diy-navBar .item-nav image {
		width: 88rpx;
		height: 88rpx;
	}

	/* 分列布局 */

	.diy-navBar .avg-sm-3>.item-nav {
		width: 33.33333333%;
	}

	.diy-navBar .avg-sm-4>.item-nav {
		width: 25%;
	}

	.diy-navBar .avg-sm-5>.item-nav {
		width: 20%;
	}

	/* 单图组 */

	.diy-imageSingle .item-image image {
		display: block;
		width: 100%;
	}

	/* 图片橱窗 */

	.diy-window .data-list::after {
		clear: both;
		content: " ";
		display: table;
	}

	.diy-window .data-list .data-item {
		float: left;
		box-sizing: border-box;
	}

	.diy-window .data-list image {
		display: block;
		width: 100%;
	}

	/* 分列布局 */

	.diy-window .avg-sm-2>.data-item {
		width: 50%;
	}

	.diy-window .avg-sm-3>.data-item {
		width: 33.33333333%;
	}

	.diy-window .avg-sm-4>.data-item {
		width: 25%;
	}

	.diy-window .avg-sm-5>.data-item {
		width: 20%;
	}

	/* 橱窗样式 */

	.diy-window .display {
		height: 0;
		width: 100%;
		margin: 0;
		padding-bottom: 50%;
		position: relative;
		box-sizing: border-box;
	}

	.diy-window .display view {
		box-sizing: border-box;
	}

	.diy-window .display image {
		width: 100%;
		height: 100%;
	}

	.diy-window .display .display-left {
		width: 50%;
		height: 100%;
		overflow-y: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}

	.diy-window .display .display-right {
		width: 50%;
		height: 100%;
		overflow-y: hidden;
		position: absolute;
		top: 0;
		left: 50%;
	}

	.diy-window .display .display-right1 {
		width: 100%;
		height: 50%;
		overflow-y: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}

	.diy-window .display .display-right2 {
		width: 100%;
		height: 50%;
		overflow-y: hidden;
		position: absolute;
		top: 50%;
		left: 0;
	}

	.diy-window .display .display-right2 .left {
		width: 50%;
		height: 100%;
		overflow-y: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}

	.diy-window .display .display-right2 .right {
		width: 50%;
		height: 100%;
		overflow-y: hidden;
		position: absolute;
		top: 0;
		left: 50%;
	}

	/* 视频 */
	.diy-video video {
		width: 100%;
		display: block;
	}

	/* 公告组 */

	.notice__icon {
		font-size: 0;
	}

	.notice__icon img {
		width: 28rpx;
		height: 28rpx;
	}

	.notice__text {
		width: 298rpx;
		height: 30rpx;
		padding-left: 5rpx;
	}

	/* 辅助线 */

	.diy-guide .line {
		width: 100%;
	}

	/* 优惠券 */
	.diy-coupon {
		white-space: nowrap;
		font-size: 0;
	}

	.diy-coupon .coupon-item {
		width: 350rpx;
		height: 130rpx;
		position: relative;
		color: #fff;
		overflow: hidden;
		box-sizing: border-box;
	}

	.diy-coupon .coupon-item i.before {
		content: "";
		position: absolute;
		z-index: 1;
		width: 40rpx;
		height: 40rpx;
		top: 50%;
		left: -.8rem;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		-webkit-border-radius: 80%;
		border-radius: 80%;
		background-color: #fff;
	}

	.diy-coupon .coupon-wrapper {
		display: inline-block;
		padding: 0 12rpx;
	}

	.diy-coupon .coupon-item .left-content {
		position: relative;
		width: 70%;
		height: 100%;
		background-color: #e5004f;
		float: left;
	}

	.diy-coupon .coupon-item .left-content .content-top .price {
		font-size: 44rpx;
	}

	.diy-coupon .coupon-item.color__blue .left-content {
		background: linear-gradient(-125deg, #57bdbf, #2f9de2);
	}

	.diy-coupon .coupon-item.color__red .left-content {
		background: linear-gradient(-128deg, #ff6d6d, #ff3636);
	}

	.diy-coupon .coupon-item.color__violet .left-content {
		background: linear-gradient(-113deg, #ef86ff, #b66ff5);
	}

	.diy-coupon .coupon-item.color__yellow .left-content {
		background: linear-gradient(-141deg, #f7d059, #fdb054);
	}

	.diy-coupon .coupon-item.color__gray .left-content {
		background: linear-gradient(-113deg, #bdbdbd, #a2a1a2);
	}

	.diy-coupon .coupon-item.color__gray .right-receive {
		background-color: #949494;
	}

	.diy-coupon .coupon-item .right-receive {
		width: 30%;
		height: 100%;
		background-color: #4e4e4e;
		text-align: center;
		float: right;
	}

	.diy-coupon .coupon-item .right-receive text {
		font-size: 26rpx;
	}

	/* 商品组 */

	.diy-goods .goods-list {
		padding: 4rpx;
		box-sizing: border-box;
	}

	.diy-goods .goods-list .goods-item {
		box-sizing: border-box;
		padding: 8rpx;
		margin-bottom: 3rpx;
	}

	.diy-goods .goods-list.display__slide {
		white-space: nowrap;
		font-size: 0;
	}

	.diy-goods .goods-list.display__slide .goods-item {
		display: inline-block;
	}

	.diy-goods .goods-list.display__list .goods-item {
		float: left;
	}

	.diy-goods .goods-list.column__2 .goods-item {
		width: 50%;
	}

	.diy-goods .goods-list.column__2 .goods-image image {
		width: 359rpx;
		height: 359rpx;
	}

	.diy-goods .goods-list.column__3 .goods-item {
		width: 33.33333%;
	}

	.diy-goods .goods-list.column__3 .goods-image image {
		width: 235.3rpx;
		height: 235.3rpx;
	}

	.diy-goods .goods-list .goods-item .goods-image image {
		display: block;
		border-radius: 12rpx 12rpx 0rpx 0rpx;
		width: 100%;
	}

	.diy-goods .goods-list .goods-item .detail {
		padding: 8rpx;
		height: 128rpx;
		background: #fff;
		border-radius: 0rpx 0rpx 12rpx 12rpx;
		overflow: hidden;
	}

	.diy-goods .goods-list .goods-item .goods-price {
		color: #e41f19;
		font-size: 34rpx;

	}

	.diy-goods .goods-list .goods-item .detail .goods-name {
		white-space: normal;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.diy-goods .goods-list .goods-item .technicaldetail {
		padding: 8rpx;
		height: 68rpx;
		background: #fff;
		border-radius: 0rpx 0rpx 12rpx 12rpx;
		overflow: hidden;
	}

	.diy-goods .goods-list .goods-item .technicaldetail .goods-name {
		white-space: normal;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	/**客服**/
	.position-box{
		height: 98rpx;
		width: 98rpx;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius:50%;
		overflow: hidden;
	}
	.position-box.top{
		bottom: 354rpx;
		right: 16rpx;
	}
	.position-box.bottom{
		bottom: 230rpx;
		right: 16rpx;
	}
	.position-box>view.img-tel-style,.position-box>button.img-plus-style{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.img-tel-style {
	  height: 98rpx;
	  width: 98rpx;
	  text-align: center;
	  background-color: #fff;
	  border: 1rpx solid #ddd;
	  opacity: 0.9
	}
	.img-plus-style {
	  height: 98rpx;
	  width: 98rpx;
	  text-align: center;
	  background-color: #fff;
	  border: 1rpx solid #ddd;
	  opacity: 0.9
	  }
	  .zindex100{z-index: 100}
	  .yc{opacity: 0}
	  /**客服end**/
</style>
