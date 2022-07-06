<template>
	<view class="container">
		<view class="tui-order-header">
			<image src="https://www.thorui.cn/wx/static/images/mall/order/img_detail_bg.png" mode="widthFix"
				class="tui-img-bg"></image>
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">{{orderDetail.orderInfo.orderStatus.name_yuyue}}</view>
				</view>
				<image v-if="orderDetail.orderInfo.order_status_id==1" src="/static/images/mall/order/img_order_payment3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==2" src="/static/images/mall/order/img_order_send3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==3" src="/static/images/mall/order/img_order_received3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==5" src="/static/images/mall/order/img_order_signed3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==4" src="/static/images/mall/order/img_order_closed3x.png" class="tui-status-img" mode="widthFix"></image>
			</view>
		</view>
		<tui-list-cell v-if="orderDetail.orderInfo.address_id" unlined :hover="false">
			<view class="tui-flex-box" @click="openNavigation()">
				<image src="/static/images/mall/order/img_order_address3x.png" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">联系人：{{orderDetail.orderInfo.address.name}}<text class="tui-addr-tel">{{orderDetail.orderInfo.address.telephone}}</text></view>
					<!-- <view class="tui-addr-text">上门地址：{{orderDetail.orderInfo.shipping_province}}{{orderDetail.orderInfo.shipping_city}}{{orderDetail.orderInfo.shipping_country}}{{orderDetail.orderInfo.address.address}}</view> -->
					<view class="tui-addr-text">上门地址：{{orderDetail.orderInfo.address.region_name}}{{orderDetail.orderInfo.address.address}}</view>
		            <view class="tui-addr-text">预约时间：{{orderDetail.orderInfo.ServiceTime}}</view>
					<view class="tui-addr-text">车牌：{{orderDetail.orderInfo.address.plate?orderDetail.orderInfo.address.plate:''}} / 车型：{{orderDetail.orderInfo.address.car_type?orderDetail.orderInfo.address.car_type:''}}</view>
				</view>
			</view>
		</tui-list-cell>
		<tui-list-cell v-else unlined :hover="false">
			<view class="tui-flex-box"  @click="openNavigation()">
				<image src="/static/images/mall/order/img_order_address3x.png" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">门店：{{orderDetail.orderInfo.store.title}}<text class="tui-addr-tel">{{orderDetail.orderInfo.address.telephone}}</text></view>
					<view class="tui-addr-text">地址：{{orderDetail.orderInfo.store.address}}</view>
					<!-- <view class="tui-addr-text">地址：{{orderDetail.orderInfo.address.region_name}}{{orderDetail.orderInfo.address.address}}</view> -->
					<view class="tui-addr-text">电话：{{orderDetail.orderInfo.store.tel}}</view>
				</view>
			</view>
		</tui-list-cell>
		<view class="tui-order-item">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					服务内容
				</view>
			</tui-list-cell>
			<block v-for="(item,index) in orderDetail.goods" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-goods-item">
						<image :src="item.image" mode="widthFix" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{item.name}}</view>
							<view v-if="item.label" class="tui-goods-attr">{{item.label}}</view>
						</view>
						<view class="tui-price-right">
							<view>￥{{item.price}}</view>
							<view>x{{item.quantity}}</view>
						</view>
					</view>
				</tui-list-cell>
			</block>
			<view v-if="orderDetail.orderInfo.is_additional==1" class="tui-goods-info">
				<view class="tui-price-flex tui-size32 tui-pbtm20">
					<view class="tui-flex-shrink">预付金额</view>
					<view class="tui-goods-price">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large"> {{orderDetail.orderInfo.total}}</view>
					</view>
				</view>
				<view v-if="orderDetail.orderInfo.additional>0" class="tui-price-flex tui-size32 tui-pbtm20">
					<view class="tui-flex-shrink">尾款</view>
					<view class="tui-goods-price">
						<view class="tui-size-24">
							<text v-if="orderDetail.orderInfo.additional_pay_time>0">已支付</text>
							<text v-if="orderDetail.orderInfo.additional_pay_time==0">未支付</text>
							￥</view>
						<view class="tui-price-large"> {{orderDetail.orderInfo.additional}}</view>
					</view>
				</view>
			</view>
			<view v-else class="tui-goods-info">
				<view class="tui-price-flex tui-size32 tui-pbtm20">
					<view class="tui-flex-shrink">合计</view>
					<view class="tui-goods-price">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large"> {{orderDetail.orderInfo.total}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tui-order-item">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					进度
				</view>
			</tui-list-cell>
			<view v-if="is_show">
				<form @submit="bindSave">
				<diyfields :value="registerfield"  @complete="result"></diyfields>
				<view class="tui-btn-box">
					<tui-button formType="submit" type="danger" height="88rpx" shape="circle">提交</tui-button>
				</view>
				</form>
			</view>
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar tui-order-btn">
			<view v-if="orderDetail.orderInfo.order_status_id==2" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="receiving">开始服务</tui-button>
			</view>
			<view v-if="orderDetail.orderInfo.order_status_id==3 && orderDetail.orderInfo.is_additional==1" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="additional">修改尾款</tui-button>
			</view>
			<view v-if="orderDetail.orderInfo.order_status_id==3" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="complete">完成服务</tui-button>
			</view>
		</view>
	</view>
</template>
<script>
	import diyfields from "@/components/views/diyfields/diyfields"
	export default {
		components: {
			diyfields
			},
		data() {
			return {
				//1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
				orderid:0,
				status: 1,
				orderDetail: [],
				registerfield: {},
				is_show: 0,
			}
		},
		onLoad: function(options) {
			let _this = this;
			_this.orderid = options.id;
			
			if (options && options.scene) {
				_this.orderid = options.scene;
			}
			
			_this.$request.get('registerfield.list', {
				orderid:_this.orderid,
				ptype: 'complete',
				samkey: (new Date()).valueOf()
			}).then(res => {
				if (res.errno == 0) {
					_this.registerfield = res.data;
					_this.is_show = 1;
				}
			});
			
		},
		onShow: function(e) {
			this.detail();
		},
		methods: {
			// 点击地址导航
			openNavigation(){
				let orderDetail = this.orderDetail;
				let latitude = Number(orderDetail.orderInfo.address.latitude);
				let longitude = Number(orderDetail.orderInfo.address.longitude);
				let name = orderDetail.orderInfo.address.region_name + orderDetail.orderInfo.address.address;
				uni.openLocation({
					latitude,
					longitude,
					name,
					success: function () {
						console.log('success');
					}
				});
			},
			result: function(e) {
				console.log(e)
				this.registerfield = e.registerfield;
			},
			bindSave: function(e) {
				var _this = this;
				_this.$request.post('order.custom', {
					id:_this.orderid,
					registerfield: JSON.stringify(_this.registerfield)
				}).then(res => {
					if (res.errno != 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						return;
					} else {
						//console.log(res.errno);
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: false,
							//是否显示取消按钮 
							success: function(res) {
								
							}
						});
					}
				});
			},
			detail() {
				let _this = this;
				_this.$request.get('order.detail', {
					samkey: (new Date()).valueOf(),
					id: _this.orderid
				}).then(function(res) {
					if (res.errno != 0) {
						uni.showModal({
							title: '错误',
							content: res.msg,
							showCancel: false
						})
						return;
					}
					_this.orderDetail = res.data;
				});
			},
			receiving() {
				let _this = this
				_this.$request.post('order.receiving', {
					orderid: _this.orderDetail.orderInfo.id
				}).then(function(res) {
					if (res.errno == 0) {
						_this.detail();
					}
				});

			},
			complete() {
				let _this = this
				_this.$request.post('order.complete', {
					orderid: _this.orderDetail.orderInfo.id
				}).then(function(res) {
					if (res.errno == 0) {
						_this.detail();
					}
				});
			
			},
			additional() {
				var url = '/pages/my/admintechnical/additional?id='+ this.orderDetail.orderInfo.id;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 118rpx;
	}

	.tui-order-header {
		width: 100%;
		height: 160rpx;
		position: relative;
		background-color: #EB0909;
	}

	.tui-img-bg {
		width: 100%;
		height: 160rpx;
	}

	.tui-header-content {
		width: 100%;
		height: 160rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 70rpx;
		box-sizing: border-box;
	}

	.tui-status-text {
		font-size: 34rpx;
		line-height: 34rpx;
		color: #FEFEFE;
	}

	.tui-reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}

	.tui-reason-text {
		padding-right: 12rpx;
	}

	.tui-status-img {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tui-flex-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-icon-img {
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.tui-addr {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.tui-addr-userinfo {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
	}

	.tui-addr-text {
		font-size: 24rpx;
		line-height: 32rpx;
		padding-top: 16rpx;
	}

	.tui-addr-tel {
		padding-left: 40rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		line-height: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
	}

	.tui-goods-info {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-price-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-size24 {
		padding-bottom: 20rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #888;
	}

	.tui-size32 {
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: 500;
	}

	.tui-pbtm20 {
		padding-bottom: 20rpx;
	}

	.tui-flex-shrink {
		flex-shrink: 0;
	}

	.tui-primary-color {
		color: #EB0909;
	}

	.tui-order-info {
		margin-top: 20rpx;
	}

	.tui-order-title {
		position: relative;
		font-size: 28rpx;
		line-height: 28rpx;
		padding-left: 12rpx;
		box-sizing: border-box;
	}

	.tui-order-title::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border-left: 4rpx solid #EB0909;
		height: 100%;
	}

	.tui-order-content {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.tui-order-flex {
		display: flex;
		padding-top: 18rpx;
	}

	.tui-order-flex:first-child {
		padding-top: 0
	}

	.tui-item-title {
		width: 132rpx;
		flex-shrink: 0;
	}

	.tui-item-content {
		color: #666;
		line-height: 32rpx;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

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

	.tui-btn-mr {
		margin-right: 30rpx;
	}

	.tui-contact {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}

	.tui-contact image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 16rpx;
	}
	.tui-btn-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
	}
</style>
