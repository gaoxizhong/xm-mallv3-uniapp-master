<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				url: '',

			};
		},
		onLoad: function(e) {
			this.url = e.url;
		},
		methods: {}
	};
</script>

<style>
	page {
		background-color: #fafafa;
		font-size: 32rpx;
	}
</style>
