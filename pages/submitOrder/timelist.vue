<template>
	<view>
		<times @change="getTime"></times>
	</view>
</template>

<script>
	import times from '@/components/pretty-times/pretty-times.vue'
	export default {
		components: {
			times
		},
		data() {
			return {
				dataList: [],
			}
		},
		onLoad: function(options) {

		},
		onShow: function() {

		},
		methods: {
			getTime(e) {
				console.log(e)
				uni.setStorageSync('servicetime', e);
				uni.navigateBack({});
			}
		}
	}
</script>

<style>

</style>
