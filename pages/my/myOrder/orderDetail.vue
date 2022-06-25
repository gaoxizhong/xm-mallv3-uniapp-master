<template>
	<view class="container">
		<view class="tui-order-header">
			<image src="https://www.thorui.cn/wx/static/images/mall/order/img_detail_bg.png" mode="widthFix"
				class="tui-img-bg"></image>
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">{{orderDetail.orderInfo.orderStatus.name}}</view>
					<!--<view class="tui-reason"><text class="tui-reason-text">超时未付款，订单自动取消</text>
						<tui-countdown :time="1800" color="rgba(254,254,254,0.75)" colonColor="rgba(254,254,254,0.75)"
							borderColor="transparent" backgroundColor="transparent" v-if="status===1"></tui-countdown>
					</view>-->
				</view>
				<image v-if="orderDetail.orderInfo.order_status_id==1" src="/static/images/mall/order/img_order_payment3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==2" src="/static/images/mall/order/img_order_send3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==3" src="/static/images/mall/order/img_order_received3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==5" src="/static/images/mall/order/img_order_signed3x.png" class="tui-status-img" mode="widthFix"></image>
				<image v-if="orderDetail.orderInfo.order_status_id==4" src="/static/images/mall/order/img_order_closed3x.png" class="tui-status-img" mode="widthFix"></image>
			</view>
		</view>
		<tui-list-cell v-if="orderDetail.logistics" arrow backgroundColor="#fefefe" @click="logistics">
			<view v-if="orderDetail.logistics.Traces.length>0" class="tui-flex-box">
				<image src="/static/images/mall/order/img_order_logistics3x.png" class="tui-icon-img"></image>
				<view class="tui-logistics">
					<view class="tui-logistics-text">{{orderDetail.logistics.Traces[0].AcceptStation}}</view>
					<view class="tui-logistics-time">{{orderDetail.logistics.Traces[0].AcceptTime}}</view>
				</view>
			</view>
		</tui-list-cell>
		<tui-list-cell unlined :hover="false">
			<view class="tui-flex-box">
				<image src="/static/images/mall/order/img_order_address3x.png" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">{{orderDetail.orderInfo.address.name}}<text class="tui-addr-tel">{{orderDetail.orderInfo.address.telephone}}</text></view>
					<view class="tui-addr-text">{{orderDetail.orderInfo.shipping_province}}{{orderDetail.orderInfo.shipping_city}}{{orderDetail.orderInfo.shipping_country}}{{orderDetail.orderInfo.address.address}}</view>
				</view>
			</view>
		</tui-list-cell>
		<view class="tui-order-item">
			<block v-for="(item,index) in orderDetail.goods" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-goods-item">
						<image :src="item.image" class="tui-goods-img"></image>
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
			<view class="tui-goods-info">
				<view class="tui-price-flex tui-size24">
					<view>总额</view>
					<view>￥{{orderDetail.order_total.sub_total.value}}</view>
				</view>
				<!--<view class="tui-price-flex  tui-size24">
					<view>优惠券</view>
					<view>￥0.00</view>
				</view>-->
				<view class="tui-price-flex  tui-size24">
					<view>配送费</view>
					<view>￥{{orderDetail.order_total.shipping.value}}</view>
				</view>
				<view class="tui-price-flex tui-size32 tui-pbtm20">
					<view class="tui-flex-shrink">合计</view>
					<view class="tui-goods-price">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large"> {{orderDetail.orderInfo.total}}</view>
						<!--<view class="tui-size-24">.00</view>-->
					</view>
				</view>
				<!--<view class="tui-price-flex tui-size32">
					<view class="tui-flex-shrink">实付款</view>
					<view class="tui-goods-price tui-primary-color">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">1192</view>
						<view class="tui-size-24">.00</view>
					</view>
				</view>-->
			</view>
		</view>

		<!--<view class="tui-order-info">
			<tui-list-cell :hover="false">
				<view class="tui-order-title">
					订单信息
				</view>
			</tui-list-cell>
			<view class="tui-order-content">
				<view class="tui-order-flex">
					<view class="tui-item-title">订单号:</view>
					<view class="tui-item-content">{{orderDetail.orderInfo.order_num_alias}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">物流单号:</view>
					<view class="tui-item-content">33655511251265578556</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">创建时间:</view>
					<view class="tui-item-content">2019-05-26 10:36</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">付款时间:</view>
					<view class="tui-item-content">2019-05-26 10:44</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">发货时间:</view>
					<view class="tui-item-content">2019-05-27 10:20</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">配送方式:</view>
					<view class="tui-item-content">包邮</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">订单备注:</view>
					<view class="tui-item-content">麻烦尽快发货，打包包裹时请多拿几个泡沫放在纸箱盒内，防止摔碎</view>
				</view>
			</view>
			<tui-list-view unlined="bottom">
				<tui-list-cell unlined>
					<view class="tui-contact">
						<image src="/static/images/mall/group/icon_order_contactmerchant.png"></image>
						<text>联系商家</text>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>-->
		
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar tui-order-btn">
			<!-- <view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle">删除订单</tui-button>
			</view> -->
			<view v-if="orderDetail.orderInfo.order_status_id==2" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="refund">申请退款</tui-button>
			</view>
			<view v-if="orderDetail.orderInfo.order_status_id==3" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="confirmBtnTap">确认收货</tui-button>
			</view>
			<view v-if="orderDetail.orderInfo.order_status_id==5 && orderDetail.orderInfo.is_comment==0" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="addEvaluate">评价</tui-button>
			</view>
			<view v-if="orderDetail.orderInfo.order_status_id==5" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="refund">申请售后</tui-button>
			</view>
			<view v-if="orderDetail.orderInfo.order_status_id==6" class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="refundDetail">售后详情</tui-button>
			</view>
			<view v-if="orderDetail.orderInfo.payment_code=='offline_pay' && orderDetail.orderInfo.is_offline_pay<1 && orderDetail.orderInfo.order_status_id==1" class="tui-btn-mr">
				<tui-button type="danger" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="offlinepaymentTap(orderDetail.orderInfo.id)">支付凭证</tui-button>
			</view>
			
			<view v-if="orderDetail.orderInfo.payment_code=='wx_pay' && orderDetail.orderInfo.order_status_id==1" class="tui-btn-mr">
				<tui-button type="danger" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="toPayTap(orderDetail.orderInfo.total,orderDetail.orderInfo.id)">立即支付</tui-button>
			</view>
		</view>
	</view>
</template>
<script>
	import pay from '@/common/pay.js'
	export default {
		components: {},
		data() {
			return {
				//1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
				status: 1,
				orderid:0,
				orderDetail: []
			}
		},
		onLoad: function(options) {
			let _this = this
			_this.orderid = options.id;
			_this.detail(_this.orderid);
		},
		methods: {
			detail(orderid) {
				let _this = this
				_this.$request.get('order.detail', {
					samkey: (new Date()).valueOf(),
					id: orderid
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
			logistics() {
				this.tui.href("/pages/my/logistics/logistics?id="+this.orderDetail.orderInfo.id)
			},
			toPayTap: function(total,orderid) {
				const redirectUrl = "/pages/my/myOrder/myOrder?ptype=" + this.orderDetail.orderInfo.ptype;
				pay.wxpay('order', total, orderid, redirectUrl);
			},
			//线下付款处理
			offlinepaymentTap: function(orderid) {
				uni.navigateTo({
					url: '/pages/submitOrder/offlinepayment?id='+orderid
				})
			},
			confirmBtnTap: function (e) {
			  let _this = this;
			  let orderid = this.orderid;
			  uni.showModal({
			    title: '确认您已收到商品？',
			    content: '',
			    success: function (res) {
			      if (res.confirm) {
					  _this.$request.post('order.delivery', {
					  	orderid: orderid
					  }).then(res => {
					  	if (res.errno == 0) {
							_this.detail(orderid);
					  	}
					  });
			      }
			    }
			  });
			},
			refund() {
				this.tui.href("/pages/my/myOrder/refund?id="+this.orderDetail.orderInfo.id)
			},
			refundDetail() {
				this.tui.href("/pages/my/myOrder/refundDetail?id="+this.orderDetail.orderInfo.id)
			},
			addEvaluate() {
				this.tui.href('/pages/my/addEvaluate/addEvaluate?id=' + this.orderDetail.orderInfo.id)
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

	.tui-logistics {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 24rpx 0 20rpx;
		box-sizing: border-box;
	}

	.tui-logistics-text {
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-logistics-time {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 16rpx;
		color: #666
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
</style>
