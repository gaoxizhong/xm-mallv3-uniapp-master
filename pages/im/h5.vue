<template>
	<view>
		<web-view :src="webscr"></web-view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				user: [],
				webscr: '',

			};
		},
		onLoad: function(e) {
			let _this = this;
			_this.$request.get('member.getkefuurl',{orderid:e.orderid}).then(res => {
				if (res.errno == 0) {
					_this.webscr = res.data.url;
				}
			});
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
