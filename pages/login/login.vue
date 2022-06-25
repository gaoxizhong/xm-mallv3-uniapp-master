<template>
	<view class="container" style="background-color: #ffffff;padding-bottom: 100rpx;">
		<form @submit="bindSave">
			<!-- #ifndef MP -->
			<view class="tui-status-bar"></view>
			<view class="tui-header">
				<tui-icon name="shut" :size="26" @click="back"></tui-icon>
			</view>
			<!-- #endif -->
			<!--<view class="tui-page-title">登录</view>-->
			<view v-if="config.logo" class="login-logo"><image style="width: 300rpx;height: 300rpx;" :src="config.logo"></image></view>
			<view class="tui-form">
				<view class="tui-view-input">
					<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
						<view class="tui-cell-input">
							<tui-icon name="people" color="#6d7a87" :size="20"></tui-icon>
							<input name="username" :adjust-position="false" placeholder="手机号/用户名"
								placeholder-class="tui-phcolor" type="text" />
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
						<view class="tui-cell-input">
							<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
							<input name="password" :adjust-position="false" placeholder="密   码" :password="true"
								placeholder-class="tui-phcolor" type="text" />
						</view>
					</tui-list-cell>
				</view>
				<view class="tui-btn-box">
					<tui-button :disabledGray="true" height="86rpx" type="danger" form-type="submit" shape="circle">登录
					</tui-button>
				</view>
				<view class="tui-cell-text">
					<view hover-class="tui-opcity" :hover-stay-time="150">
						<button class="tui-regbutton" type='white' @tap="reg">
							<text>没有账号？</text>注册
						</button>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ptype: "",
				config:{}
			};
		},
		onLoad(e) {
			var _this = this;
			if (e.ptype) {
				this.ptype = e.ptype;
			}			
			_this.$util.getUserInfo(function(userInfo) {
				console.log(userInfo);
			})
			
			_this.$request.post('config').then(res => {
				if (res.errno == 0) {
					if (res.data) {
						_this.config = res.data
					}
				}
			});
		},
		methods: {
			bindSave: function(e) {
				var _this = this;
				const username = e.detail.value.username;
				const password = e.detail.value.password;

				if (!username) {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					});
					return;
				}

				if (!password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return;
				}

				_this.$request.post('login.index', {
					ptype: _this.ptype,
					username: username,
					password: password
				}).then(res => {
					if (res.errno != 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						return;
					} else {
						uni.setStorageSync("uid", res.data.id);
						uni.setStorageSync("uuid", res.data.uuid);
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						let url = '/pages/index/index';
						if(_this.ptype=='technical'){
							uni.setStorageSync('is_technicallogout', '');
							url = '/pages/my/admintechnical/index';
						}
						if(_this.ptype=='store'){
							url = '/pages/my/adminstore/index';
						}

						uni.reLaunch({
							url: url
						});
					}
				});
			},
			reg() {
				uni.reLaunch({
					url: "./reg?ptype="+this.ptype
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.container {
		.login-logo{
			margin-left: auto;
			margin-right: auto;
			text-align: center;
		}
		.tui-status-bar {
			width: 100%;
			height: var(--status-bar-height);
		}

		.bottom {
			height: 86rpx;
			border-radius: 43rpx;
		}

		.tui-header {
			width: 100%;
			padding: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
		}

		.tui-page-title {
			width: 100%;
			font-size: 48rpx;
			font-weight: bold;
			color: $uni-text-color;
			line-height: 42rpx;
			padding: 40rpx;
			box-sizing: border-box;
		}

		.tui-form {
			padding-top: 50rpx;

			.tui-view-input {
				width: 100%;
				box-sizing: border-box;
				padding: 0 40rpx;

				.tui-cell-input {
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 48rpx;
					padding-bottom: $uni-spacing-col-base;

					input {
						flex: 1;
						padding-left: $uni-spacing-row-base;
					}
				}
			}

			.tui-cell-text {
				width: 100%;
				padding: $uni-spacing-col-lg $uni-spacing-row-lg;
				box-sizing: border-box;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tui-color-primary {
					color: $uni-color-primary;
				}

				.tui-regbutton {
					background-color: #ffffff;
					font-size: 26rpx;
					color: $uni-color-primary;
				}

				.tui-regbutton text {
					color: #666;
				}
			}

			.tui-btn-box {
				width: 100%;
				padding: 0 $uni-spacing-row-lg;
				box-sizing: border-box;
				margin-top: 60rpx;
			}
		}

		.tui-login-way {
			width: 100%;
			font-size: 26rpx;
			color: $uni-color-primary;
			display: flex;
			justify-content: center;
			position: fixed;
			left: 0;
			bottom: 80rpx;

			view {
				padding: 12rpx 0;
			}
		}

		.tui-auth-login {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 80rpx;
			padding-top: 20rpx;

			.tui-icon-platform {
				width: 90rpx;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				margin-left: 40rpx;

				&::after {
					content: '';
					position: absolute;
					width: 200%;
					height: 200%;
					transform-origin: 0 0;
					transform: scale(0.5, 0.5) translateZ(0);
					box-sizing: border-box;
					left: 0;
					top: 0;
					border-radius: 180rpx;
					border: 1rpx solid $uni-text-color-placeholder;
				}
			}

			.tui-login-logo {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>
