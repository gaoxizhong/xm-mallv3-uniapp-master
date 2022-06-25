<template>
	<view class="container">
		<form @submit="bindSave">
			<view class="header">
				<view class="title">上传照片</view>
				<view class="sub-title">请上传清䀿照片为获得准确的结果，请您在光线充足的环境下测试，时间最好在上午9：00--11：00</view>
			</view>
			<view class="tui-box-upload">
				<tui-upload :value="value" :limit="1" @complete="result" @remove="remove"></tui-upload>
			</view>
			<view class="tui-btn-box">
				<tui-button formType="submit" type="danger" height="88rpx" shape="circle">提交</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	import pay from '@/common/pay.js'
	export default {
		data() {
			return {
				imageData: [],
				value: [] //初始化图片
			}
		},
		onLoad() {
			/*
			setTimeout(()=>{
				this.value=['/static/images/default_img.png']
			},200)
			*/
		},
		onShow: function() {
			var _this = this;
			_this.$request.post('tongue.check').then(res => {
				if (res.errno == 0) {
					if (res.data.id){
						uni.reLaunch({
							url: "/pages/my/tongue/detail?id=" + res.data.id
						});
					}
				}
			});
		},
		methods: {
			result: function(e) {
				console.log(e)
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
			},
			bindSave: function(e) {
				var _this = this;
				_this.$request.post('tongue.upload', {
					img: this.imageData[0]
				}).then(res => {
					if (res.errno != 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						return;
					} else {
						//console.log(res.data.id);
						pay.wxpay('tongue', res.data.price, res.data.id, "/pages/my/tongue/detail?id=" + res
							.data.id);
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.container {
		padding: 20rpx 0 120rpx 0;
		box-sizing: border-box;
	}

	.header {
		padding: 80rpx 90rpx 60rpx 90rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
	}

	.sub-title {
		font-size: 24rpx;
		color: #7a7a7a;
		padding-top: 18rpx;
	}

	.tui-box-upload {
		padding-left: 50rpx;
		box-sizing: border-box;
	}

	.tui-btn-box {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>
