<template>
	<view class="container">
		<form>
			<view class="tui-box">
				<view v-if="deliverymode==1" class="acea-row acea-rowlabel">
					<label>服务地址: </label>
					<view>{{ current_add }}</view>
				</view>
				<view v-if="deliverymode==2 || deliverymode==3" class="acea-row">
					<radio-group @change="radioChange">
						<label>配送方式: </label>
						<label>
							<radio value="kd" :checked="peisongType == 'kd'" /><text> 快递 </text>
						</label>
						<label>
							<radio value="zq" :checked="peisongType == 'zq'" /><text> 到店 </text>
						</label>
					</radio-group>
				</view>
				<tui-list-cell v-if="(deliverymode==1 || deliverymode==3) && peisongType != 'zq'" :arrow="true" unlined
					:radius="true" @click="chooseAddr">
					<view class="tui-bg-img"></view>
					<view class="tui-address">
						<view v-if="curAddressData.address">
							<view class="tui-userinfo">
								<text class="tui-name">{{curAddressData.name}}</text>{{curAddressData.telephone}}
							</view>
							<view class="tui-addr">
								<!-- <text>{{curAddressData.address_default}}{{curAddressData.address}}</text> -->
								 <text>{{curAddressData.region_name}}{{curAddressData.address}}</text>
							</view>
						</view>
						<view class="tui-none-addr" v-else>
							<image src="/static/images/location_fill.png" class="tui-addr-img" mode="widthFix"></image>
							<text>请选择地址</text>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell v-if="peisongType == 'zq'" :arrow="true" unlined :radius="true" @click="chooseStore">
					<view class="tui-bg-img"></view>
					<view class="tui-address">
						<view v-if="storeaddrData.title">
							<view class="tui-userinfo">
								<text class="tui-name">{{storeaddrData.title}}</text>
							</view>
							<view class="tui-addr">
								<text>{{storeaddrData.address}}</text>
							</view>
						</view>
						<view class="tui-none-addr" v-else>
							<image src="/static/images/location_fill.png" class="tui-addr-img" mode="widthFix"></image>
							<text>请选择门店</text>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell v-if="(deliverymode==1 || deliverymode==4) && is_times==0" :arrow="true" unlined
					:radius="true" @click="chooseTime">
					<view class="tui-address">
						<view v-if="servicetime">
							<view class="tui-addr">
								<text>期望上门时间:{{servicetime}}</text>
							</view>
						</view>
						<view class="tui-none-addr" v-else>
							<text>请选择期望服务时间</text>
						</view>
					</view>
				</tui-list-cell>
				<view class="tui-top tui-goods-info">
					<block v-for="(item,index) in goodsList" :key="index">
						<tui-list-cell :hover="false" padding="0">
							<view class="tui-goods-item">
								<image :src="item.pic" class="tui-goods-img"></image>
								<view class="tui-goods-center">
									<view class="tui-goods-name">{{item.name}}</view>
									<view class="tui-goods-attr">{{item.label || ''}}</view>
								</view>
								<view class="tui-price-right">
									<view>￥{{item.price}}</view>
									<view>x{{item.skumorequantity || item.number}}</view>
								</view>
							</view>
						</tui-list-cell>
					</block>
					<tui-list-cell :hover="false">
						<view class="tui-padding tui-flex">
							<view>总额</view>
							<view>￥{{allGoodsPrice}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell v-if="!hasNoCoupons" :arrow="hasCoupon" :hover="hasCoupon" @click="couponShow=true">
						<view class="tui-padding tui-flex">
							<view>优惠券</view>
							<view :class="{'tui-color-red':hasCoupon}">{{curCouponname||"选择优惠券"}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell v-if="totalPayPoints>0" @tap="PayPoints">
						<view class="tui-item-box">
							<view class="tui-icon-box">
								<tui-icon :name="is_PayPoints==1?'square-fill':'square'" :size="26" color="#999999">
								</tui-icon>
							</view>
							<view class="tui-list-cell_name">可以用{{totalPayPoints}}积分抵扣{{totalPointsPrice}}元</view>
						</view>
					</tui-list-cell>
					<!--
					<tui-list-cell :hover="true" :arrow="true" @click="invoice">
						<view class="tui-padding tui-flex">
							<view>发票</view>
							<view class="tui-invoice-text">不开发票</view>
						</view>
					</tui-list-cell>
					-->
					<tui-list-cell v-if="peisongType == 'kd'" :hover="false">
						<view class="tui-padding tui-flex">
							<view>配送费</view>
							<view>￥{{yunPrice}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" :lineLeft="false" padding="0">
						<view class="tui-remark-box tui-padding tui-flex">
							<view>订单备注</view>
							<input type="text" @input="remarkInput" name="remark" class="tui-remark"
								placeholder="请输入您的要求" placeholder-class="tui-phcolor"></input>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" unlined>
						<view class="tui-padding tui-flex tui-total-flex">
							<view class="tui-flex-end tui-color-red">
								<view class="tui-black">合计： </view>
								<view class="tui-size-26">￥</view>
								<view class="tui-price-large">{{setyouhuijine(allGoodsAndYunPrice)}}</view>
								<!--<view class="tui-size-26"></view>-->
							</view>
						</view>
					</tui-list-cell>
				</view>

				<!--<view class="tui-top">
					<tui-list-cell unlined :hover="insufficient" :radius="true" :arrow="insufficient">
						<view class="tui-flex">
							<view class="tui-balance">余额支付<text class="tui-gray">(￥2020.00)</text></view>
							<switch color="#19be6b" class="tui-scale-small" v-show="!insufficient" />
							<view class="tui-pr-30 tui-light-dark" v-show="insufficient">余额不足, 去充值</view>
						</view>
					</tui-list-cell>
				</view>-->
			</view>
			<view class="tui-safe-area"></view>
			<view class="tui-tabbar">
				<view class="totalPrice tui-pr-20">
					<view class="tui-price-large tui-color-red">
						<text class="pricetitle">实付金额:</text>
						<text>￥{{setyouhuijine(setPayPoints(allGoodsAndYunPrice))}}</text>
					</view>
					<view class="agreement">
						<radio style="transform:scale(0.7)" @click="setagreementagree" :checked="agreementagree == 1" />
						<label @click="showagreementAlert">已阅并同意购买协议</label>
						<tui-modal :show="showagreement" custom>
							<view class="tui-modal-custom">
								<scroll-view :style="'height:'+(height-160)+'px'" scroll-y="true">
									<view class="tui-modal-custom-text">
										<rich-text :nodes="agreement.content"></rich-text>
									</view>
								</scroll-view>
								<tui-button height="72rpx" :size="28" type="danger" shape="circle"
									@click="hideagreementAlert">同意</tui-button>
							</view>
						</tui-modal>
					</view>
				</view>
				<view class="paybuttbox tui-pr25 tui-flex-end">
					<tui-button class="paybutt" height="70rpx" :size="28" type="danger" shape="circle" @click="btnPay">
						确认支付
					</tui-button>
				</view>
			</view>
			<t-pay-way :show="show" :amuont="setyouhuijine(setPayPoints(allGoodsAndYunPrice))" @goPay="goPay"
				:paymethod="paymethod" @close="popupClose"></t-pay-way>
			<t-select-coupons :couponList="coupons" :show="couponShow" @ChangeCoupon="ChangeCoupon"
				@close="couponsClose"></t-select-coupons>
		</form>
	</view>
</template>

<script>
	import tPayWay from "@/components/views/t-pay-way/t-pay-way";
	import tSelectCoupons from "@/components/views/t-select-coupons/t-select-coupons";
	import pay from '@/common/pay.js';
	import QQMapWX from '@/libs/qqmap-wx-jssdk.min.js';
	export default {
		components: {
			tPayWay,
			tSelectCoupons
		},
		data() {
			return {
				technicalId: '',
				hasCoupon: true,
				insufficient: false,
				show: false,
				couponShow: false,
				islogin: 1, //是否要需要登录，需要在onLoad加截 app.page.onLoad(this,e);
				totalPayPoints: 0,
				totalPointsPrice: 0,
				servicetime: '',
				goodsList: [],
				combination: [],
				curAddressData: [],
				storeaddrData: [],
				allGoodsPrice: 0,
				yunPrice: 0,
				allGoodsAndYunPrice: 0,
				remark: "",
				cartid: "",
				orderType: "", //订单类型，购物车下单或立即支付下单，默认是购物车，
				hasNoCoupons: true,
				coupons: [],
				selIndex: 0,
				coupon_type: 0, //优惠券类型
				discount: 0, //优惠券折扣
				youhuijine: 0, //优惠券金额
				curCoupon: null, // 当前选择使用的优惠券
				curCouponname: null, // 当前选择使用的优惠券
				allowSelfCollection: '0', // 是否允许到店自提
				payment: '0', //是否支持货到付款
				peisongType: '', // 配送方式 kd,zq 分别表示快递/到店自取
				paymentType: "",
				deliverymode: '',
				is_times: 0,
				ptype: 1,
				paymethod: {},
				is_PayPoints: 0,
				memberPoints: 0,
				currency: uni.getStorageSync('currency'),
				tmplIds: [],
				showagreement: false,
				width: 0,
				height: 0,
				agreement: {},
				agreementagree: 0,
				latitude: "",
				longitude: "",
				qqmapsdk: null,
				key: 'PKEBZ-CQL6W-WQGRE-O4X3A-NCTK6-XPFKG',
				current_add:''
			}
		},
		onLoad: function(e) {
			let _this = this
			if (e.orderType) {
				_this.orderType = e.orderType;
			}
			_this.$request.get('Order.paymethod').then(res => {
				if (res.errno == 0) {
					_this.paymethod = res.data;
					_this.paymentType = res.data[0].default;
					console.log(_this.paymentType);
				}
			});
			_this.$request.post('Agreement.index', {
				code: 'userstobuy'
			}).then(res => {
				if (res.errno == 0) {
					_this.agreement = res.data;
				}
			});
			uni.getSystemInfo({
				success: res => {
					this.width = res.windowWidth;
					this.height = res.windowHeight;
				}
			});
		},
		onShow: function() {
			let _this = this

			_this.servicetime = uni.getStorageSync('servicetime');
			_this.orderinit();
			// 获取当前位置
			if (uni.getStorageSync('current_add')) {
				_this.current_add = uni.getStorageSync('current_add');
				console.log(_this.current_add)
			} else {
				_this.qqmapsdk = new QQMapWX({
					key: _this.key
				});
				uni.authorize({
					scope: 'scope.userLocation',
					success: res => {
						console.log(res)
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
		},
		methods: {
			//经纬度获取位置
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
						_this.current_add = res.result.address;
						uni.setStorageSync('current_add', res.result.address);
					},
					fail: res => {
						//console.log('失败：', res);
					}
				})
				// #endif
			},
			
			orderinit() {
				const _this = this;
				let shopList = [];

				//立即购买下单
				if ("buyNow" == _this.orderType) {
					var buyNowInfoMem = uni.getStorageSync('buyNowInfo');
					console.log(buyNowInfoMem);

					_this.kjId = buyNowInfoMem.kjId;
					_this.technicalId = buyNowInfoMem.technicalId;
					_this.deliverymode = buyNowInfoMem.deliverymode;
					_this.is_times = buyNowInfoMem.is_times;
					_this.ptype = buyNowInfoMem.ptype;

					if (buyNowInfoMem && buyNowInfoMem.shopList) {
						//console.log(buyNowInfoMem.shopList.length);
						//console.log(buyNowInfoMem.shopList.combination);
						if (buyNowInfoMem.shopList.length > 1)
							if (buyNowInfoMem.shopList.combination) {
								shopList = buyNowInfoMem.shopList.combination;
							} else {
								if (buyNowInfoMem.shopList[0]) {
									shopList = buyNowInfoMem.shopList;
								} else {
									shopList[0] = buyNowInfoMem.shopList;
								}
								///console.log(buyNowInfoMem.shopList.length);
							}
						else
							shopList[0] = buyNowInfoMem.shopList;
					}
				} else {
					//购物车下单
					var shopCarInfoMem = uni.getStorageSync('shopCarInfo');
					_this.kjId = shopCarInfoMem.kjId;
					if (shopCarInfoMem && shopCarInfoMem.shopList) {
						// shopList = shopCarInfoMem.shopList
						shopList = shopCarInfoMem.shopList.filter(entity => {
							return entity.active;
						});

						_this.deliverymode = shopList[0].deliverymode;

						console.log(shopList);
					}
				}
				_this.goodsList = shopList;
				_this.$config.init(function() {
					_this.payment = _this.$config.getConf("payment");
				});

				if (_this.deliverymode == 2) {
					_this.peisongType = 'zq';
					_this.initstoreaddr();
				} else {
					if (_this.deliverymode == 3) {
						_this.peisongType = 'kd';
					}
					_this.initShippingAddress();
				}

			},
			getAuthMsg() {
				return new Promise(resolve => {
					if (this.tmplIds.length > 0) {
						uni.requestSubscribeMessage({
							tmplIds: this.tmplIds,

							fail(res) {
								console.log(res);
							},

							complete() {
								resolve();
							}

						});

					} else {
						resolve();
					}
				});
			},
			chooseAddr() {
				uni.navigateTo({
					url: "/pages/my/address/address"
				})
			},
			chooseStore() {
				uni.navigateTo({
					url: "/pages/my/storeaddr/storeaddr"
				})
			},
			chooseTime() {
				uni.navigateTo({
					url: "/pages/submitOrder/timelist"
				})
			},
			btnPay() {
				if (this.agreementagree != 1) {
					this.tui.toast("请仔细阅读并勾选购买协议");
					return;
				}
				// #ifdef MP-WEIXIN
				this.getAuthMsg()
				//#endif
				if (this.setyouhuijine(this.setPayPoints(this.allGoodsAndYunPrice)) == 0) {
					console.log(1)
					this.createOrder();
				} else {
					this.show = true
				}
			},
			popupClose() {
				this.show = false
			},
			couponsClose() {
				this.couponShow = false
			},
			invoice() {
				this.tui.href('/pages/submitOrder/invoice')
			},
			goPay(e) {
				if (e.paymentType) {
					this.paymentType = e.paymentType;
				}
				this.createOrder();
			},
			getOrdertotal: function() {
				var _this = this;
				let postData = {
					cartid: _this.cartid,
					peisongType: _this.peisongType,
					paymentType: _this.paymentType,
				};
				if (postData.peisongType == 'kd') {
					postData.shipping = '1';
					if (_this.curAddressData != undefined) {
						postData.address_id = _this.curAddressData.id;
					}
				}
				if (_this.buyNowgoods != undefined) {
					if (_this.buyNowgoods.goods_id) {
						postData.goodsId = _this.buyNowgoods.goods_id;
					}
					if (_this.buyNowgoods.sku) {
						postData.sku = _this.buyNowgoods.sku;
					}
					if (_this.buyNowgoods.number) {
						postData.number = _this.buyNowgoods.number;
					}

					if (_this.buyNowgoods.is_skumore) {
						postData.is_skumore = _this.buyNowgoods.is_skumore;
					}
					if (_this.buyNowgoods.skumore) {
						postData.skumore = JSON.stringify(_this.buyNowgoods.skumore);
					}

				}

				if (_this.kjId) {
					postData.kjid = _this.kjId
				}

				if (_this.curCoupon) {
					postData.couponId = _this.curCoupon.id;
				}
				postData.calculate = "true";
				_this.$request.post('order.total', postData).then(res => {
					if (res.errno != 0) {
						uni.showModal({
							title: '错误',
							content: res.msg,
							showCancel: false
						})
						return;
					}
					_this.tmplIds = res.data.tmplIds;
					_this.totalPayPoints = res.data.totalPayPoints;
					_this.memberPoints = res.data.memberPoints;
					_this.totalPointsPrice = res.data.totalPointsPrice;
					_this.allGoodsPrice = res.data.amountTotle;
					_this.allGoodsAndYunPrice = (res.data.amountLogistics + res.data.amountTotle).toFixed(2);
					_this.yunPrice = res.data.amountLogistics;

					if (_this.allGoodsAndYunPrice == 0 && _this.totalPointsPrice == 0 && _this.totalPayPoints >
						0) {
						if (_this.memberPoints >= _this.totalPayPoints) {
							_this.is_PayPoints = 1;
						} else {
							uni.showModal({
								title: '提示',
								content: '您的积分不够！',
								showCancel: false
							})
							_this.is_PayPoints = 0;
						}
					}

					_this.getMyCoupons();
					return;
				})
			},

			createOrder: function() {
				var _this = this;

				if (_this.remark == undefined) {
					_this.remark = '';
				}
				let postData = {
					technicalId: _this.technicalId,
					cartid: _this.cartid,
					remark: _this.remark,
					peisongType: _this.peisongType,
					paymentType: _this.paymentType
				};
				if (_this.buyNowgoods != undefined) {
					if (_this.buyNowgoods.goods_id) {
						postData.goodsId = _this.buyNowgoods.goods_id;
					}
					if (_this.buyNowgoods.combination_ids) {
						postData.combination_ids = _this.buyNowgoods.combination_ids;
					}

					if (_this.buyNowgoods.sku) {
						postData.sku = _this.buyNowgoods.sku;
					}
					if (_this.buyNowgoods.number) {
						postData.number = _this.buyNowgoods.number;
					}
					if (_this.buyNowgoods.is_skumore) {
						postData.is_skumore = _this.buyNowgoods.is_skumore;
					}
					if (_this.buyNowgoods.skumore) {
						postData.skumore = JSON.stringify(_this.buyNowgoods.skumore);
					}
				}

				if (_this.kjId) {
					postData.kjid = _this.kjId
				}
				if (_this.paymentType == 0) {
					uni.hideLoading();
					uni.showModal({
						title: '错误',
						content: '请选择支付方式！',
						showCancel: false
					})
					return;
				}
				postData.payment = postData.paymentType;
				postData.is_times = _this.is_times;


				if (_this.deliverymode == 1) {
					if (_this.is_times == 0) {
						if (!_this.servicetime) {
							uni.hideLoading();
							uni.showModal({
								title: '错误',
								content: '请选择期望上门时间！',
								showCancel: false
							})
							return;
						}
						postData.servicetime = _this.servicetime;
					}
					postData.address_id = _this.curAddressData.id;
					_this.ptype = 2;
				}

				if (_this.deliverymode == 2 && postData.peisongType == 'zq') {
					if (!_this.storeaddrData.id) {
						uni.hideLoading();
						uni.showModal({
							title: '错误',
							content: '请选择门店！',
							showCancel: false
						})
						return;
					}
					if (postData.peisongType == 'zq') {
						postData.sid = _this.storeaddrData.id;
					}
					_this.ptype = 2;
				}
				if (_this.deliverymode == 3 && postData.peisongType == 'kd') {
					if (!_this.curAddressData.address_default) {
						uni.hideLoading();
						uni.showModal({
							title: '错误',
							content: '请先设置您的地址！',
							showCancel: false
						})
						return;
					}
					if (postData.peisongType == 'kd') {
						postData.shipping = '1';
						postData.address_id = _this.curAddressData.id;
					}
				}
				if (_this.curCoupon) {
					postData.couponId = _this.curCoupon.id;
				}
				postData.is_PayPoints = _this.is_PayPoints;
				//console.log(postData);
				_this.$request.post('order.create', postData).then(res => {
					if (res.errno != 0) {
						uni.showModal({
							title: '错误',
							content: res.msg,
							showCancel: false
						})
						return;
					}

					if ("buyNow" != _this.orderType) {
						// 清空购物车数据
						uni.removeStorageSync('shopCarInfo');
					}

					const redirectUrl = "/pages/submitOrder/success?ptype=" + _this.ptype;
					if (res.data.payment_code == 'wx_pay') {
						console.log(2)
						pay.wxpay('order', res.data.pay_total, res.data.id, redirectUrl);
					} else if (res.data.payment_code == 'balance_pay') {
						_this.$request.post('order.pay', {
							orderid: res.data.id
						}).then(res => {
							if (res.errno == 0) {
								wx.showModal({
									title: '成功',
									content: '使用余额支付成功',
									showCancel: false,
									success: function(res) {
										wx.redirectTo({
											url: redirectUrl
										});
									}
								})
							} else {
								wx.showModal({
									title: '失败',
									content: res.msg,
									showCancel: false
								})
							}
						})
					} else if (res.data.payment_code == 'offline_pay') {
						_this.sam.navigateTo('/pages/submitOrder/offlinepayment?id=' + res.data.id);
					} else if (res.data.payment_code == 'delivery_pay') {
						_this.sam.navigateTo(redirectUrl);
					} else {
						_this.sam.navigateTo(redirectUrl);
					}

				})
			},
			initstoreaddr: function() {
				var _this = this;
				if (uni.getStorageSync('order_sid')) {
					_this.$request.get('store.detail', {
						id: uni.getStorageSync('order_sid'),
						samkey: (new Date()).valueOf()
					}).then(res => {
						if (res.errno == 0) {
							_this.storeaddrData = res.data;
						} else {
							_this.storeaddrData = null;
						}

					})
				}
				_this.processYunfei();
			},
			initShippingAddress: function() {
				var _this = this;
				_this.$request.get('address.default', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.curAddressData = res.data;
					} else {
						_this.curAddressData = null;
					}
					_this.processYunfei();
				})
			},
			processYunfei: function() {
				var _this = this;
				var goodsList = this.goodsList;
				var cartid = "";
				var allGoodsPrice = 0;

				//推荐人id
				let referrer_id = 0;
				let referrer_storge = uni.getStorageSync('referrer_id');
				if (referrer_storge) {
					referrer_id = referrer_storge;
				}

				if ("buyNow" == _this.orderType) {
					var buyNowgoods = goodsList[0];
					_this.buyNowgoods = buyNowgoods;
				} else {
					for (let i = 0; i < goodsList.length; i++) {
						let carShopBean = goodsList[i];

						allGoodsPrice += carShopBean.price * carShopBean.number;

						var cartidTmp = '';
						if (i > 0) {
							cartidTmp = ",";
						}

						cartidTmp += carShopBean.cart_id;
						cartid += cartidTmp;
					}
				}

				_this.cartid = cartid;
				_this.getOrdertotal();
			},
			getMyCoupons: function() {
				var _this = this;
				_this.$request.get('Couponreceive.mylist', {
					price: _this.allGoodsAndYunPrice,
					status: 0,
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						var coupons = res.data;
						if (coupons.length > 0) {
							_this.hasNoCoupons = false;
							_this.coupons = coupons;
						}
					}
				})
			},
			setyouhuijine: function(amount) {
				if (this.coupon_type == 10) {
					return (amount - this.youhuijine).toFixed(2);
				} else {
					if (this.coupon_type == 20 && this.discount) {
						return ((amount * this.discount) / 10).toFixed(2);
					}
				}

				return amount;
			},
			setPayPoints: function(amount) {
				if (this.is_PayPoints == 1) {
					return (amount - this.totalPointsPrice).toFixed(2);
				} else {
					return amount;
				}
			},
			PayPoints: function() {
				var _this = this;
				if (_this.is_PayPoints == 1) {
					_this.is_PayPoints = 0;
				} else {
					if (_this.memberPoints >= _this.totalPayPoints) {
						_this.is_PayPoints = 1;
					} else {
						uni.showModal({
							title: '提示',
							content: '您的积分不够！',
							showCancel: false
						})
						_this.is_PayPoints = 0;
					}
				}
			},
			radioChange: function(e) {
				this.peisongType = e.detail.value;
				this.orderinit();
			},
			ChangeCoupon: function(e) {


				this.couponShow = false
				const selIndex = e.selIndex;
				if (selIndex == -1) {
					this.youhuijine = 0;
					this.curCoupon = null;
					this.curCouponname = null;
					return;
				}
				this.selIndex = selIndex;
				this.coupon_type = this.coupons[selIndex].coupon_type;
				this.discount = this.coupons[selIndex].discount;
				this.youhuijine = this.coupons[selIndex].reduce_price;

				//console.log(this.coupons[selIndex]);
				this.curCoupon = this.coupons[selIndex];
				this.curCouponname = this.coupons[selIndex].name;
			},
			remarkInput: function(e) {
				this.remark = e.target.value;
			},
			paymentradioChange(e) {
				this.paymentType = e;
			},
			showagreementAlert() {
				this.showagreement = true;
			},
			hideagreementAlert() {
				this.showagreement = false;
				this.setagreementagree();
			},
			setagreementagree() {
				this.agreementagree = 1;
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 98rpx;
	}

	.tui-box {
		padding: 20rpx 0 118rpx;
		box-sizing: border-box;
	}

	.tui-address {
		min-height: 80rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
		position: relative;
	}

	.tui-userinfo {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-bottom: 12rpx;
	}

	.tui-name {
		padding-right: 40rpx;
	}

	.tui-addr {
		font-size: 24rpx;
		word-break: break-all;
		padding-right: 25rpx;
	}

	.tui-addr-tag {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #EB0909;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		border-radius: 6rpx;
	}

	.tui-bg-img {
		position: absolute;
		width: 100%;
		height: 8rpx;
		left: 0;
		top: 0;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}

	.tui-top {
		margin-top: 20rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.tui-padding {
		box-sizing: border-box;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-flex {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.tui-total-flex {
		justify-content: flex-end;
	}

	.tui-color-red,
	.tui-invoice-text {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-balance {
		font-size: 28rpx;
		font-weight: 500;
	}

	.tui-black {
		color: #222;
		line-height: 30rpx;
	}

	.tui-gray {
		color: #888888;
		font-weight: 400;
	}

	.tui-light-dark {
		color: #666;
	}

	.tui-goods-price {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
	}

	.tui-size-26 {
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.tui-price-large {
		font-size: 34rpx;
		line-height: 34rpx;
		font-weight: 600;
		padding-left: 12rpx;
	}

	.tui-flex-end {
		display: flex;
		align-items: flex-end;
		padding-right: 0;
	}

	.tui-phcolor {
		color: #B3B3B3;
		font-size: 26rpx;
	}

	/* #ifndef H5 */
	.tui-remark-box {
		padding: 22rpx 30rpx;
	}

	/* #endif */
	/* #ifdef H5 */
	.tui-remark-box {
		padding: 26rpx 30rpx;
	}

	/* #endif */

	.tui-remark {
		flex: 1;
		font-size: 26rpx;
		padding-left: 64rpx;
	}

	.tui-scale-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-scale-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */
	.tui-tabbar {
		width: 100%;
		height: 118rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 996;
	}

	.totalPrice {
		padding-top: 10rpx;
		width: 70%;
	}

	.pricetitle {
		font-size: 30rpx;
		color: #333333;
	}

	.paybuttbox {
		width: 30%;
	}

	.paybutt {
		width: 100%;
	}

	.agreement {
		color: #666666;
		padding-top: 6rpx;
	}

	.modal-scroll {
		height: 600rpx;
	}

	.tui-pr-30 {
		padding-right: 30rpx;
	}

	.tui-pr-20 {
		padding-left: 20rpx;
	}

	.tui-none-addr {
		height: 80rpx;
		padding-left: 5rpx;
		display: flex;
		align-items: center;
	}

	.tui-addr-img {
		width: 36rpx;
		height: 46rpx;
		display: block;
		margin-right: 15rpx;
	}


	.tui-pr25 {
		padding-right: 25rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-pay-item__title {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.tui-pay-amuont {
		color: #eb0909;
		font-weight: 500;
		font-size: 34rpx;
	}

	.tui-pay-item {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.tui-pay-logo {
		width: 48rpx;
		height: 48rpx;
		margin-right: 15rpx;
	}

	.tui-radio {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-btn-pay {
		width: 100%;
		padding: 68rpx 60rpx 50rpx;
		box-sizing: border-box;
	}

	.tui-recharge {
		color: #fc872d;
		margin-left: auto;
		padding: 12rpx 0;
	}

	.acea-row {
		font-size: 28rpx;
		padding-top: 30rpx;
		padding-left: 20rpx;
		padding:30rpx 20rpx 20rpx;
		box-sizing: border-box;
		height: auto;
		background-color: #fff;
	}
		
	.acea-rowlabel{
		display: flex;
		align-items: flex-end;
	}
	.acea-row.acea-rowlabel label{
		width: auto;
		padding: 0 10rpx;
	}
	.acea-row.acea-rowlabel view{
		flex: 1;
	}
	.acea-row label {
		padding: 10rpx;
	}

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-list-cell_name {
		padding-left: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
