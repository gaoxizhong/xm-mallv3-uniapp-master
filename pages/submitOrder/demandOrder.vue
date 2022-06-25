<template>
	<view class="container">
		<form>
			<view class="tui-box">
				<tui-list-cell @click="choosecatid" :arrow="true" unlined>
					<view class="tui-item-box">
						<text class="tui-list-cell_name">需求分类</text>
						<view class="tui-right">{{cat_name || '请先选择分类'}}</view>
					</view>
				</tui-list-cell>

				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view>您的要求</view>
						<input type="text" @input="remarkInput" name="remark" class="tui-remark" placeholder="请输入您的要求"
							placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" padding="0">
					<view class="tui-remark-box tui-padding tui-flex">
						<view>期望价格</view>
						<input type="text" v-model="total" name="remark" class="tui-remark" placeholder="请输入您的期望价格"
							placeholder-class="tui-phcolor">元</input>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="true" unlined :radius="true" @click="chooseAddr">
					<view class="tui-address">
						<label class="serviceaddr">服务地址</label>
						<view v-if="curAddressData.address">
							<view class="tui-userinfo">
								<text class="tui-name">{{curAddressData.name}}</text>{{curAddressData.telephone}}
							</view>
							<view class="tui-addr">
								<text>{{curAddressData.address_default}}{{curAddressData.address}}</text>
							</view>
						</view>
						<view class="tui-none-addr" v-else>
							<image src="/static/images/location_fill.png" class="tui-addr-img" mode="widthFix"></image>
							<text>请选择地址</text>
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
			</view>
			<view class="tui-safe-area"></view>
			<view class="tui-tabbar">
				<view class="tui-flex-end tui-color-red tui-pr-20">
					<view class="tui-black">应付金额: </view>
					<view class="tui-size-26">￥</view>
					<view class="tui-price-large">{{total}}</view>
					<!--<view class="tui-size-26"></view>-->
				</view>
				<view class="tui-pr25">
					<tui-button width="380rpx" height="70rpx" :size="28" type="danger" shape="circle" @click="btnPay">
						确认提交
					</tui-button>
				</view>
			</view>
			<t-pay-way :show="show" :amuont="total" @goPay="goPay" :paymethod="paymethod" @close="popupClose">
			</t-pay-way>
		</form>
	</view>
</template>

<script>
	import tPayWay from "@/components/views/t-pay-way/t-pay-way"
	import pay from '@/common/pay.js'
	export default {
		components: {
			tPayWay
		},
		data() {
			return {
				technicalId: '',
				show: false,
				islogin: 1, //是否要需要登录，需要在onLoad加截 app.page.onLoad(this,e);
				servicetime: '',
				cat_id: '',
				cat_name: '',
				curAddressData: [],
				total: 0,
				remark: "",
				orderType: "", //订单类型，购物车下单或立即支付下单，默认是购物车，
				selIndex: 0,
				payment: '0', //是否支持货到付款
				chargeset: '0', //是否开启服务费
				paymentType: "",
				deliverymode: '1',
				is_times: 0,
				ptype: 2,
				service: 0,
				paymethod: {},
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
					//console.log(_this.paymentType);
				}
			})
		},
		onShow: function() {
			let _this = this
			_this.servicetime = uni.getStorageSync('servicetime');
			_this.cat_id = uni.getStorageSync('cat_id');
			_this.cat_name = uni.getStorageSync('cat_name');
			_this.initShippingAddress();
		},
		methods: {
			chooseAddr() {
				uni.navigateTo({
					url: "/pages/my/address/address"
				})
			},
			chooseTime() {
				uni.navigateTo({
					url: "/pages/submitOrder/timelist"
				})
			},
			choosecatid() {
				uni.navigateTo({
					url: "/pages/submitOrder/cat"
				})
			},
			btnPay() {
				this.show = true
			},
			popupClose() {
				this.show = false
			},
			goPay(e) {
				if (e.paymentType) {
					this.paymentType = e.paymentType;
				}
				this.createOrder();
			},
			createOrder: function() {
				var _this = this;
				if (_this.remark == undefined) {
					_this.remark = '';
				}
				let postData = {
					technicalId: _this.technicalId,
					cat_id: _this.cat_id,
					remark: _this.remark,
					total: _this.total,
					paymentType: _this.paymentType
				};
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
						pay.wxpay('order', res.data.pay_total, res.data.id, redirectUrl);
					} else if (res.data.payment_code == 'offline_pay') {
						_this.sam.navigateTo('/pages/submitOrder/offlinepayment?id=' + res.data.id);
					} else if (res.data.payment_code == 'delivery_pay') {
						_this.sam.navigateTo(redirectUrl);
					} else {
						_this.sam.navigateTo(redirectUrl);
					}

				})
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
				})
			},
			remarkInput: function(e) {
				this.remark = e.target.value;
			},

		}
	}
</script>

<style>
	.container {
		padding-bottom: 98rpx;
	}

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-list-cell_name {
		padding-left: 5rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
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

	.serviceaddr {
		color: #999999;
	}

	.tui-userinfo {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 30rpx;
		padding-top: 10rpx;
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

	.tui-color-red {
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
		line-height: 32rpx;
		font-weight: 600;
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
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 996;
	}

	.tui-pr-30 {
		padding-right: 30rpx;
	}

	.tui-pr-20 {
		padding-right: 20rpx;
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
		height: 60rpx;
		background-color: #fff;
	}

	.acea-row label {
		padding: 10rpx;
	}
</style>
