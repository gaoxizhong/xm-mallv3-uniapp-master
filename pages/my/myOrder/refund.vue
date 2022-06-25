<template>
	<view class="container">
		<form @submit="bindSave" report-submit="true">
		<view class="tui-order-item">
			<tui-list-cell padding="20rpx 30rpx" :hover="false" :lineLeft="false">
				<view class="tui-goods-title"><view>商品信息</view></view>
			</tui-list-cell>
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
		</view>
		<view class="tui-refund__form">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请类型</text>
					</view>
					
					<input placeholder-class="tui-phcolor" class="tui-input"   type="text"  value="退货退款" disabled/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>退款金额</text>
					</view>
					<input placeholder-class="tui-phcolor" class="tui-input"   type="text" :value="'￥'+orderDetail.order_total.sub_total.value" disabled/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>联系人：</text>
					</view>
					<input name="lianxiren" placeholder-class="tui-phcolor" class="tui-input" type="text"  placeholder="请填写联系人"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>联系电话：</text>
					</view>
					<input name="tel" placeholder-class="tui-phcolor" class="tui-input" type="text"  placeholder="请填写系电话"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请原因：</text>
					</view>
					<input name="refund_desc" placeholder-class="tui-phcolor" class="tui-input" type="text"  placeholder="请填写申请原因"/>
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-btn__box">
			<tui-button form-type="submit" height="88rpx" type="danger" shadow shape="circle">提交申请</tui-button>
		</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderDetail: []
		};
	},
	onLoad: function(options) {
		let _this = this
		var orderid = options.id;
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
	methods: {
		bindSave: function (e) {
		  var that = this;
		  const lianxiren = e.detail.value.lianxiren;
		  const tel = e.detail.value.tel;
		  const refund_desc = e.detail.value.refund_desc;
		
		  if (!lianxiren) {
		    uni.showToast({
		      title: '请输入退款联系人',
		      icon: 'none'
		    });
		    return;
		  }
		
		  if (!tel) {
		    uni.showToast({
		      title: '请输入电话号码',
		      icon: 'none'
		    });
		    return;
		  }
		
		that.$request.post('orderrefund.create', {
		    order_id: that.orderDetail.orderInfo.id,
		    order_refund_no: that.orderDetail.orderInfo.order_num_alias,
		    refund_price: that.orderDetail.orderInfo.total,
		    lianxiren: lianxiren,
		    tel: tel,
		    refund_desc: refund_desc
		  }).then(function(res) {
		    if (res.errno != 0) {
		      uni.showToast({
		        title: res.message,
		        icon: 'none'
		      });
		      return;
		    } else {
		      uni.showModal({
		        title: '提示',
		        content: res.message,
		        showCancel: false,
		        //是否显示取消按钮 
		        success: function (res) {
		          if (res.cancel) {//点击取消,默认隐藏弹框
		          } else {
		           that.sam.navigateTo("/pages/my/myOrder/myOrder");
		          }
		        }
		      });
		    }
		  });
		}
	}
};
</script>

<style>
.tui-order-list {
	margin-top: 80rpx;
}

.tui-order-item {
	margin-top: 20rpx;
	border-radius: 10rpx;
	overflow: hidden;
}

.tui-goods-title {
	width: 100%;
	font-size: 28rpx;
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

.tui-refund__form {
	margin-top: 20rpx;
}
.tui-line-cell {
	width: 100%;
	padding: 24rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.tui-title {
	width: 180rpx;
	font-size: 28rpx;
	color: #666;
}
.tui-color__red{
	color: #EB0909;
	padding-right: 6rpx;
}

.tui-title-city-text {
	width: 180rpx;
	height: 40rpx;
	display: block;
	line-height: 46rpx;
}

.tui-input {
	width: 500rpx;
	font-size: 28rpx;
}

.tui-phcolor {
	color: #ccc;
	font-size: 28rpx;
}
.tui-btn__box{
	padding: 60rpx 30rpx;
}

</style>
