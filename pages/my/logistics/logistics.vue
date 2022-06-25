<template>
	<view class="container">
		<view class="tui-order-header">
			<view class="tui-text">快递单号：
				<text class="tui-bold">{{orderDetail.logistics.LogisticCode}}</text>
			</view>
			<view class="tui-text">快递公司：{{orderDetail.logistics.expressname}}</view>
			<!--<view class="tui-text">预计送达：
				<text class="tui-bold">5</text>月<text class="tui-bold">1</text>日</view>-->
		</view>
		<view class="tui-order-tracking">
			<tui-time-axis v-for="(item,index) in orderDetail.logistics.Traces" :key="index">
				
				<tui-timeaxis-item backgroundColor="transparent">
					<template v-slot:node>
						<view class="tui-node-dot"></view>
					</template>
				
					<template v-slot:content>
						<view class="tui-order-desc tui-light-gray tui-ptop">{{item.AcceptStation}}</view>
						<view class="tui-order-time tui-gray">{{item.AcceptTime}}</view>
					</template>
				</tui-timeaxis-item>
			</tui-time-axis>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundColor: "#EB0909",
				orderDetail: []
			}
		},
		onLoad(options) {
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
		}
	}
</script>

<style>
	.tui-order-header {
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-text {
		font-size: 28rpx;
		color: #333;
		padding: 4rpx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-node {
		height: 44rpx;
		width: 44rpx;
		border-radius: 50%;
		background-color: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		flex-shrink: 0;
	}

	.tui-node-dot {
		height: 16rpx;
		width: 16rpx;
		background-color: #ddd;
		border-radius: 50%;
		/* transform: translateY(45%); */
		margin-top: 6rpx;
	}

	.tui-bg-primary {
		background: #EB0909 !important;
	}

	.tui-order-tracking {
		padding: 30rpx 30rpx 30rpx 40rpx;
		background: #fff;
		margin-top: 20rpx;
		box-sizing: border-box;
	}

	.tui-order-title {
		padding-bottom: 12rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.tui-order-desc {
		padding-bottom: 12rpx;
		font-size: 28rpx;
		color: #333;
	}

	.tui-ptop {
		display: flex;
		justify-content: flex-start;
		line-height: 28rpx;
	}

	.tui-order-time {
		font-size: 24rpx;
		font-weight: bold;
	}

	.tui-gray {
		color: #848484 !important;
	}

	.tui-light-gray {
		color: #888 !important;
	}

	.tui-primary {
		color: #5677fc;
	}
</style>
