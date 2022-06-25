<template>
	<view class="container">
		<textarea class="tui-textarea" placeholder="回复Mocha" maxlength="200" auto-focus></textarea>
		<view class="tui-btn__box">
			<tui-button type="danger" height="88rpx" shape="circle">发送</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 0;
	}
	.tui-textarea {
		width: 100%;
		height: 300rpx;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.tui-btn__box{
		width: 100%;
		padding: 60rpx;
		box-sizing: border-box;
	}
</style>
