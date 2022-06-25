<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in dataList" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-address-flex">
						<view @tap="selectTap" :data-id="item.id" class="tui-address-left">
							<view class="tui-address-main">
								<view class="tui-address-name">{{item.title}}</view>
							</view>
							<view class="tui-address-detail">
								<text>{{item.address}}</text>
							</view>
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
			}
		},
		onLoad: function(options) {
			this.initdataList();
		},
		onShow: function() {

		},
		methods: {
			selectTap: function(e) {
				var id = e.currentTarget.dataset.id;
				uni.setStorageSync('order_sid', id);
				uni.navigateBack({});
			},
			initdataList: function() {
				var _this = this;
				_this.$request.post('store.list', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.dataList = res.data;
					} else if (res.errno == 700) {
						_this.dataList = null;
					}
				})
			}
		}
	}
</script>

<style>
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}

	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-address-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}

	.tui-address-name {
		height: 60rpx;
	}

	.tui-address-tel {
		margin-left: 12rpx;
	}

	.tui-address-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}

	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-address-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
