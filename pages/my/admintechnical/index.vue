<template>
	<view>
		<Style1 v-if="userstyle==1"></Style1>
		<Style2 v-if="userstyle==2"></Style2>
		<tui-tabbar mo='technical' :current="current">
		</tui-tabbar>
	</view>
</template>

<script>
	import Style1 from "@/pages/my/admintechnical/style1.vue"
	import Style2 from "@/pages/my/admintechnical/style2.vue"
	export default {
		components: {
			Style1,
			Style2,
		},
		data() {
			return {
				userstyle:1,
				isLogin: false,
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
				technical: [],
				current: ''
			};
		},
		onLoad: function(options) {
			let _this = this;
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
					this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
					this.scrollH = res.windowWidth * 0.6;
				}
			});
			_this.$request.post('config', {
				mo: 'userstyle'
			}).then(res => {
				if (res.errno == 0) {
					if (res.data.userstyle) {
						_this.userstyle = res.data.userstyle
					}
				}
			});
		},
		onShow() {
			
		},
		methods: {
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 200);
		},
		onReachBottom: function() {

		}
	};
</script>
