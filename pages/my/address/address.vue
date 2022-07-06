<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-address-flex">
						<view @tap="selectTap" :data-id="item.id" class="tui-address-left">
							<view class="tui-address-main">
								<view class="tui-address-name tui-ellipsis">{{item.name}}</view>
								<view class="tui-address-tel">{{item.telephone}}</view>
							</view>
							<view class="tui-address-detail">
								<view class="tui-address-label" v-if="item.isDefault===1">默认</view>
								<!--<view class="tui-address-label">{{["公司","住宅","其它"][index]}}</view>-->
								<!-- <text>{{item.address_detail}}{{item.address}}</text> -->
								<text>{{item.region_name?item.region_name:''}}{{item.address}}</text>
							</view>
						</view>
						<view class="tui-address-imgbox" @tap="editAddess" :data-id="item.id">
							<image class="tui-address-img" src="/static/images/mall/my/icon_addr_edit.png" />
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button shadow shape="circle" type="danger" height="88rpx" @click="addAddess">+ 新增洗车地址</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [1, 2, 3],
			}
		},
		onLoad: function(options) {

		},
		onShow: function() {
			this.initShippingAddress();
		},
		methods: {
			selectTap: function(e) {
				var id = e.currentTarget.dataset.id;
				this.$request.post('address.setdefault', {
					id: id
				}).then(res => {
					uni.navigateBack({});
				})
			},
			addAddess: function() {
				wx.navigateTo({
					url: "/pages/my/address/editAddress"
				})
			},
			editAddess: function(e) {
				wx.navigateTo({
					url: "/pages/my/address/editAddress?id=" + e.currentTarget.dataset.id
				})
			},
			initShippingAddress: function() {
				var _this = this;
				_this.$request.get('address.list', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.addressList = res.data;
					} else if (res.errno == 700) {
						_this.addressList = null;
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
		width: 120rpx;
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
