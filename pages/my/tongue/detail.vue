<template>
	<view class="container">
		<view class="body">
			<view class="title">{{detail.tiaoli.tizhi_name}}</view>
			<view class="sub-title">食疗</view>
			<view class="sub-body">
				<view v-for="(item,index) in detail.tiaoli.shiliao">
					{{item}}
				</view>
			</view>
			
			<view class="sub-title">四季养生</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.yuletiaoshe}}
				</view>
			</view>
			
			<view class="sub-title">体育锻炼</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.sijiyangsheng}}
				</view>
			</view>
			
			<view class="sub-title">娱乐调摄</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.jingshentiaoyang}}
				</view>
			</view>
			<view class="sub-title">起居调摄</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.qijutiaoshe}}
				</view>
			</view>
			<view class="sub-title">情志养生</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.yinyuetiaoli}}
				</view>
			</view>
			<view class="sub-title">经络保键</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.jingluobaojian}}
				</view>
			</view>
			<view class="sub-title">用药禁忌</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.yongyaijinji}}
				</view>
			</view>
			<view class="sub-title">药物养生</view>
			<view class="sub-body">
				<view>
					{{detail.tiaoli.yaowuyangsheng}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: ''
			}
		},
		onLoad(e) {
			var _this = this;
			_this.$request.post('tongue.getaidata', {
				id: e.id
			}).then(res => {
				if (res.errno == 0) {
					_this.detail = res.data;
				}
			});
		},
		onShow: function() {},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.container {
		padding: 10rpx 0 20rpx 0;
		box-sizing: border-box;
	}

	.body {
		padding: 80rpx 40rpx 60rpx 40rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
	}

	.sub-title {
		width: 200rpx;
		text-align: center;
		font-size: 24rpx;
		color: #ffffff;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: #5796fd;
		border-radius: 10rpx;
	}
</style>
