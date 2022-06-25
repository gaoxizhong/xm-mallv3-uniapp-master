<template>
	<view class="container">
		<view class="tui-order-header">
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">
						<!-- 退货 -->
						<block v-if="order_refund.refund_type==1">
							<block v-if="order_refund.refund_status==0">
								<block v-if="order_refund.is_agree==0">等待审核中</block>
								<block v-else>
									<block v-if="order_refund.is_user_send==0">已同意退货，请及时退回商品</block>
									<block v-else>已发货，待平台确认</block>
								</block>
							</block>
							<block style="color:#36ba75" v-if="order_refund.refund_status==1">
								已同意退货并已退款</block>
							<block style="color:#ff4544" v-if="order_refund.refund_status==3">
								已拒绝退货</block>
						</block>
						<!-- 换货 -->
						<block v-else>
							<block v-if="order_refund.refund_status==0">等待审核中</block>
							<block style="color:#36ba75" v-if="order_refund.refund_status==2">等待审核中</block>
							<block style="color:#ff4544" v-if="order_refund.refund_status==3">已拒绝换货</block>
						</block>
					</view>
					<!--<view class="tui-reason"><text class="tui-reason-text">退款原路退回 2020-09-02 08:20:19</text></view>-->
				</view>
				<!-- img_refundfailure.png -->
				<!--<image src="https://thorui.cn/images/mall/group/img_success3x.png" class="tui-status-img" mode="widthFix"></image>-->
			</view>
		</view>

		<view class="tui-order-item"
			v-if="(order_refund.refund_type==1 && order_refund.refund_status==0 && order_refund.is_agree!=0) || order_refund.refund_status==2">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-order-title">收件人信息</view>
			</tui-list-cell>
			<view style="padding-left:24rpx;margin-bottom:20rpx;">
					<view class="address-info">
						<view style="font-weight:bold">{{order_refund.re_name}} {{order_refund.re_mobile}}</view>
						<view style="margin-top:10rpx">{{order_refund.re_address}}</view>
					</view>
				<view style="height:1rpx;background:#e2e2e2;margin:20rpx 0"></view>
				<view style="font-size:10pt;color:#bbbbbb">· 未与卖家协商一致情况下，请勿寄到付或平邮</view>
				<view style="height:5rpx"></view>
				<view style="font-size:10pt;color:#bbbbbb;padding-bottom:24rpx">· 请填写真实有效物流信息</view>
			</view>
		</view>
		
		<form @submit="bindSave" report-submit="true">
		  <block v-if="order_refund.is_agree==1">
		    <view v-if="order_refund.is_user_send==0" class="express-block">
		      <view class="flex flex-row" style="border-bottom: 3rpx solid #eee;">
		        <view class="flex-grow-0 flex-y-center" style="margin-right: 32rpx">物流公司：</view>
		        <view class="flex-grow-1">
		          <picker name="express" @change="bindExpressPickerChange" :value="express_index" :range="express_list" range-key="name" style="padding: 24rpx 0">
		            <view class="flex flex-row">
		              <view class="flex-grow-1">
		                <view v-if="express_index>=0">
		                  {{express_list[express_index].name}}
		                </view>
		                <view v-else style="color: #888">请选择物流公司</view>
		              </view>
		              <view class="flex-grow-0">
		                <image src="/static/images/arrow-right.png" style="width: 12rpx;height: 22rpx;"></image>
		              </view>
		            </view>
		          </picker>
		        </view>
		      </view>
		      <view class="flex flex-row">
		        <view class="flex-grow-0 flex-y-center" style="margin-right: 32rpx">物流单号：</view>
		        <view class="flex-grow-1">
		          <input name="express_no" placeholder="请填写物流单号" style="padding: 24rpx 0;height: auto">
		        </view>
		      </view>
		    </view>
		    <view v-else class="express-block" style="padding: 32rpx 24rpx">
		      <view class="flex flex-row" style="margin-bottom: 18rpx">
		        <view class="flex-grow-0" style="margin-right: 32rpx">物流公司：</view>
		        <view class="flex-grow-1">{{order_refund.user_send_express}}</view>
		      </view>
		      <view class="flex flex-row">
		        <view class="flex-grow-0" style="margin-right: 32rpx">物流单号：</view>
		        <view class="flex-grow-1">{{order_refund.user_send_express_no}}</view>
		      </view>
		    </view>
		  </block>
		  <view class="goods-list">
		    <block v-for="(item, index) in orderDetail.goods" :key="index">
		      <view class="a-goods">
		        <view class="img-box">
		          <image :src="item.image" class="img"></image>
		        </view>
		        <view class="text-box">
		          <view class="arow arow01">
		            <view class="goods-name">
		              <text>{{item.name}}</text>
					  <view><text v-if="item.label">规格：{{item.label}}</text></view>
		            </view>
		            <view class="goods-price">￥{{item.price}}</view>
		          </view>
		          <view class="arow">
		            <view class="goods-label">{{item.goodsO}}</view>
		            <view class="goods-num">x {{item.quantity}}</view>
		          </view>
		        </view>
		      </view>
		    </block>
		  </view>
		
		  <view class="bg-white mb-20 data-row">
		    <view class="mb-20">售后类型：{{order_refund.refund_type==1 ? '退货退款': '换货' }}</view>
		    <view class="mb-20">退款金额：
		      <text style="color:#ff4544">￥{{order_refund.refund_price}}</text>
		    </view>
		    <view class="mb-20">申请原因：{{order_refund.refund_desc}}</view>
		    <view v-if="order_refund.refund_status == 3" class="mb-20">拒绝原因：
		      <text style="color:#ff4544">{{order_refund.refuse_desc}}</text>
		    </view>
		    <view class="pic-list mb-20">
		      <image v-for="(item, index) in order_refund.refund_pic_list" :key="index" @tap="viewImage" :data-index="index" mode="aspectFill" style="width: 160rpx;height: 160rpx" :src="item"></image>
		    </view>
		  </view>
		  <block v-if="order_refund.is_agree==1 && order_refund.is_user_send==0">
		    <view style="padding: 24rpx 24rpx 48rpx">
		      <button form-type="submit" class="goods_send">确认发货
		      </button>
		    </view>
		  </block>
		</form>

		<view class="tui-order-info">
			<tui-list-view unlined="bottom">
				<tui-list-cell unlined>
					<button open-type="contact" class="tui-contact">
						<image src="https://thorui.cn/images/mall/group/icon_order_contactmerchant.png"></image>
						<text>联系商家</text>
					</button>
				</tui-list-cell>
			</tui-list-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//1-退款中 2-退款成功 3-退款失败
				status: 1,
				show: false,
				orderDetail: [],
				order_refund: [],
				express_list:[],
				express_index: 0,
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
				_this.order_refund = res.data.OrderRefund;
			});
			
			_this.$request.get('express.index').then(function(res) {
			  if (res.errno == 0) {
				  _this. express_list = res.data;
			  }
			});
			
		},
		methods: {
			bindExpressPickerChange: function (e) {
				this.express_index = e.detail.value;
			},
			bindSave: function (e) {
			  var that = this;
			  const express_no = e.detail.value.express_no;
			  let express_index = this.express_index;
			
			  if (!express_no) {
			    uni.showToast({
			      title: '请输入快递单号',
			      icon: 'none'
			    });
			    return;
			  }
			
			  if (!express_index) {
			    uni.showToast({
			      title: '请选择快递公司',
			      icon: 'none'
			    });
			    return;
			  }
			that.$request.post('orderrefund.goodssend',{
			    order_id: that.orderDetail.orderInfo.id,
			    is_user_send: 1,
			    user_send_express_no: express_no,
			    user_send_express: this.express_list[express_index].name,
			    user_send_express_code: this.express_list[express_index].code
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
	.container {
		padding-bottom: 80rpx;
		background-color: #fff;
	}

	.tui-order-header {
		width: 100%;
		height: 160rpx;
		position: relative;
		background: linear-gradient(90deg, rgb(255, 89, 38), rgb(240, 14, 44));
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
		color: #fefefe;
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

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #fff;
	}

	.tui-title {
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
		border-left: 4rpx solid #eb0909;
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
		padding-top: 0;
	}

	.tui-item-title {
		width: 132rpx;
		flex-shrink: 0;
		white-space: nowrap;
	}

	.tui-item-content {
		color: #666;
		line-height: 32rpx;
	}

	.tui-contact {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		
		padding-top: 1rpx;
		padding-bottom: 1rpx;
		padding-left: 0px;
		padding-right: 0px;
		background-color: #fff;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 22px;
		border-radius: 0px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		cursor: pointer;
		color: #333;
	}

	.tui-contact image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 16rpx;
	}

	.address-info {
		font-size: 26rpx;
		line-height: 30rpx;
		margin: 20rpx 40rpx 20rpx 0;
	}
	.data-row {
		color: #333;
		font-size: 26rpx;
		line-height: 46rpx;
	    padding: 28rpx 24rpx;
	    border-top: 1rpx solid #e3e3e3;
	}
	
	.pic-list {
	    margin-left: -20rpx;
	    margin-top: -20rpx;
	}
	
	.pic-list image {
	    margin-left: 20rpx;
	    margin-top: 20rpx;
	}
	
	.status-bar {
	    position: relative;
	    height: 140rpx;
	    line-height: 140rpx;
	    color: #fff;
	    padding: 0 40rpx;
	    margin-bottom: 20rpx;
	}
	
	.status-bar image{
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    z-index: -1;
	    background: #fb715a;
	}
	
	.express-block{
	    background: #fff;
	    margin-bottom: 20rpx;
	    border-bottom: 1rpx solid #e3e3e3;
	    padding: 0 24rpx;
	}
	.copy-fz {
	    border-radius:50%;
	    margin-right:24rpx;
	    color:#999999;
	    width:100rpx;
	    height:100rpx;
	    border:1rpx solid #e2e2e2;
	    font-size:10pt;
	}
	.address-info {
	    justify-content:space-between;
	    margin:20rpx 40rpx 20rpx 0;
	    color:#353535;
	}
	
	.goods_send {
	    border: none;
	    background: #e41f19;
	    color: #fff;
	    border-radius: 10rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	}
	.goods-list{
	    width:100%;
	    background-color: #fff;
	    margin-bottom: 20rpx;
	    margin-top: 20rpx;
	}
	.goods-list .list-title{
	    font-size: 28rpx;
	    color: #000;
	    padding: 30rpx 0 25rpx 30rpx;
	}
	.goods-list  .a-goods{
	    width: 720rpx;
	    margin-left: 30rpx;
	    display: flex;
	    padding: 30rpx 30rpx 30rpx 0;
	}
	.goods-list  .a-goods .img-box{
	    width: 160rpx;
	    height:160rpx;
	    overflow: hidden;
	    margin-right: 20rpx;
	    background-color: #d8d8d8;
	}
	
	.goods-list .img-box .img{
	    width: 160rpx;
	    height:160rpx;
	}
	.goods-list  .a-goods .text-box{
	    width: 510rpx;
	    box-sizing: border-box;
	    padding-top: 10rpx;
	}
	.goods-list  .btn-row{
	    width: 720rpx;
	    margin-left: 30rpx;
	    padding-top: 15rpx;
	    padding-bottom: 15rpx;
	    border-top: 1rpx solid #eee;
	}
	.a-goods .text-box .arow{
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	 }
	.a-goods .text-box .arow .goods-name{
	     width: 360rpx;
	     font-size:26rpx;
	     height: 74rpx;
	     color:#000000;
	     line-height: 1.6;
	     overflow: hidden;
	 }
	.a-goods .text-box .arow01{
	    margin-bottom: 30rpx;
	}
	.a-goods .text-box .arow .goods-price{
	    font-size:26rpx;
	    color:#000000;
	    align-self: flex-start;
	}
	.a-goods .text-box .arow .goods-label{
	    font-size: 26rpx;
	    color: #999;
	}
	.a-goods .text-box .arow .goods-num{
	    font-size: 26rpx;
	    color: #999;
	}
	.flex-x-center {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	}
	.flex {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	}
	
	.flex-row {
		font-size: 26rpx;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	}
	
	.flex-col {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	}
	
	.flex-grow-0 {
	    min-width: 0;
	    -webkit-box-flex: 0;
	    -webkit-flex-grow: 0;
	    -ms-flex-positive: 0;
	    flex-grow: 0;
	    -webkit-flex-shrink: 0;
	    -ms-flex-negative: 0;
	    flex-shrink: 0;
	}
	
	.flex-grow-1 {
	    min-width: 0;
	    -webkit-box-flex: 1;
	    -webkit-flex-grow: 1;
	    -ms-flex-positive: 1;
	    flex-grow: 1;
	    -webkit-flex-shrink: 1;
	    -ms-flex-negative: 1;
	    flex-shrink: 1;
	}
	
	.flex-x-center {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	}
	
	.flex-y-center {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    -ms-grid-row-align: center;
	    align-items: center;
	}
	
	.flex-y-bottom {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: end;
	    -webkit-align-items: flex-end;
	    -ms-flex-align: end;
	    -ms-grid-row-align: flex-end;
	    align-items: flex-end;
	}
</style>