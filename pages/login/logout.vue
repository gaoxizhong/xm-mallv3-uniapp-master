<template>
	
</template>

<script>
	export default {
		data() {
			return {
				ptype: ""
			};
		},
		onLoad(e) {
			if (e.ptype) {
				this.ptype = e.ptype;
			}
			uni.setStorageSync("is_toggle", "1");
			uni.reLaunch({
			  url: "/pages/login/login?ptype="+this.ptype
			});
		},
		methods: {
		}
	};
</script>