<template>
	<view>
		<!--header-->
		<!-- #ifndef MP-WEIXIN -->
		<tui-navigation-bar dropDownHide splitLine @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop"
			title="我的" backgroundColor="#fff" color="#333">
			<view class="tui-header-box" :style="{ marginTop: top + 'px' }">
				<view v-if="memberinfo.nickname" class="tui-header-icon">
					<view class="tui-icon-box tui-icon-message" @tap="navigateTo('/pages/my/message/message')">
						<tui-icon name="message" :color="opacity > 0.8 ? '#333' : '#fff'" :size="26"></tui-icon>
						<view class="tui-badge" :class="[opacity > 0.8 ? 'tui-badge-red' : 'tui-badge-white']"></view>
					</view>
					<view class="tui-icon-box tui-icon-setup" @tap="navigateTo('/pages/my/set/set')">
						<tui-icon name="setup" :color="opacity > 0.8 ? '#333' : '#fff'" :size="26"></tui-icon>
					</view>
				</view>

			</view>
		</tui-navigation-bar>
		<!-- #endif -->
		<!--header-->
		<Style1 v-if="userstyle==1"></Style1>
		<Style2 v-if="userstyle==2"></Style2>
		<tui-tabbar :current="current">
		</tui-tabbar>
	</view>
</template>

<script>
	import Style1 from "@/pages/my/userInfo/style1.vue"
	import Style2 from "@/pages/my/userInfo/style2.vue"
	export default {
		components: {
			Style1,
			Style2,
		},
		data() {
			return {
				memberinfo: [],
				userstyle: 1,
				current: '',
				webURL: 'https://www.thorui.cn/wx',
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
			};
		},
		onLoad: function(e) {
			let _this = this;
			this.current = "/" + this.__route__;
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
			_this.$util.getUserInfo(function(userInfo) {
				//Console.log("adfs");
				if (uni.getStorageSync('is_logout') != '1') {
					_this.$request.get('member.detail', {
						samkey: (new Date()).valueOf()
					}).then(res => {
						if (res.errno == 0) {
							_this.memberinfo = res.data;
							_this.is_audit = res.data.is_audit;
						}
					});
				}
			})

		},
		onShow: function() {},
		methods: {
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
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
