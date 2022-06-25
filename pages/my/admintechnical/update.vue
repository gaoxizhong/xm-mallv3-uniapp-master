<template>
	<view v-if="is_show" class="container">
		<form v-if="is_audit!=1" @submit="bindSave">
			<view class="tui-form">
				<diyfields :value="registerfield"  @complete="result"></diyfields>
				<view class="tui-btn-box">
					<tui-button formType="submit" type="danger" height="88rpx" shape="circle">提交</tui-button>
				</view>
				<!--<view class="tui-cell-text">
				注册代表同意
				<view class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="protocol">用户服务协议、隐私政策</view>
			</view>-->
			</view>
		</form>
		<view v-if="is_audit==1" class="tui-form">
			<view class="tui-btn-box">
				<tui-button type="danger" open-type="contact" height="88rpx" shape="circle">联系客服</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import diyfields from "@/components/views/diyfields/diyfields"
	export default {
		components: {
			diyfields
		},
		computed: {},
		data() {
			return {
				registerfield: {},
				is_show: 0,
				is_audit: 1,
				ptype:"technical"
			};
		},
		onLoad: function(e) {
			let _this = this;
			if (e.ptype) {
				_this.ptype = e.ptype;
			}
			_this.$request.post('Config.audit', {
				samkey: (new Date()).valueOf()
			}).then(res => {
				_this.is_audit = res.data.is_audit;
			});

			_this.$request.get('registerfield.list', {
				update:1,
				ptype: _this.ptype,
				samkey: (new Date()).valueOf()
			}).then(res => {
				if (res.errno == 0) {
					_this.is_show = 1;
					_this.registerfield = res.data;

				}
			});
		},
		onShow() {
			let _this = this;
			_this.$request.post('Config.audit', {
				samkey: (new Date()).valueOf()
			}).then(res => {
				_this.is_audit = res.data.is_audit;
			});
		},
		methods: {
			result: function(e) {
				//console.log(e)
				this.registerfield = e.registerfield;
			},
			bindSave: function(e) {
				var _this = this;
				_this.$request.post('registerfield.update', {
					update:1,
					registerfield: JSON.stringify(_this.registerfield)
				}).then(res => {
					if (res.errno != 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						return;
					} else {
						//console.log(res.errno);
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: false,
							//是否显示取消按钮 
							success: function(res) {
								if (res.cancel) { //点击取消,默认隐藏弹框
								} else {
									uni.reLaunch({
										url: "/pages/my/admintechnical/index"
									});
								}
							}
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tui-list-cell {
		width: 100%;
		color: $uni-text-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}

	.tui-avatar {
		width: 130rpx;
		height: 130rpx;
		display: block;
	}

	.uni-list {
		width: 100%;
		padding-top: 15rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.ptypebut {
		width: 40%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		margin-bottom: 10rpx;
	}

	.checkboxbox {
		padding: 20rpx;
	}

	.container {
		backgroundColor: #fff;
		padding-bottom: 80rpx;

		.tui-page-title {
			width: 100%;
			font-size: 48rpx;
			font-weight: bold;
			color: $uni-text-color;
			line-height: 42rpx;
			padding: 110rpx 40rpx 40rpx 40rpx;
			box-sizing: border-box;
		}

		.tui-form {
			.tui-view-input {
				width: 100%;
				box-sizing: border-box;
				padding: 0 0rpx;

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

					.tui-icon-close {
						margin-left: auto;
					}

					.tui-btn-send {
						width: 156rpx;
						text-align: right;
						flex-shrink: 0;
						font-size: $uni-font-size-base;
						color: $uni-color-primary;
					}

					.tui-gray {
						color: $uni-text-color-placeholder;
					}

					.tui-textarea {
						width: 100%;
						height: 300rpx;
						font-size: 28rpx;
						padding: 20rpx 30rpx;
						box-sizing: border-box;
						background-color: #fff;
					}
				}
			}

			.tui-cell-text {
				width: 100%;
				padding: 40rpx $uni-spacing-row-lg;
				box-sizing: border-box;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;

				.tui-color-primary {
					color: $uni-color-primary;
					padding-left: $uni-spacing-row-sm;
				}
			}

			.tui-btn-box {
				width: 100%;
				padding: 0 $uni-spacing-row-lg;
				box-sizing: border-box;
				margin-top: 20rpx;
			}
		}
	}
</style>
