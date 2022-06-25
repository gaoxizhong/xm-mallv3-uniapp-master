<template>
	<view class="tui-safe-area">
		<view class="tui-memberbankcard">
			<block v-for="(item,index) in memberbankcardList" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-memberbankcard-flex">
						<view @tap="selectTap" :data-id="item.id" class="tui-memberbankcard-left">
							<view class="tui-memberbankcard-main">
								<view class="tui-memberbankcard-name tui-ellipsis">{{item.name}}</view>
								<view class="tui-memberbankcard-tel">{{item.accounts}}</view>
							</view>
							<view class="tui-memberbankcard-detail">
								<view class="tui-memberbankcard-label" v-if="item.isDefault===1">默认</view>
								<text>{{item.bankname}}</text>
								<text v-if="item.branchname">; {{item.branchname}}</text>
							</view>
						</view>
						<view class="tui-memberbankcard-imgbox" @tap="editMemberbankcard" :data-id="item.id">
							<image class="tui-memberbankcard-img" src="/static/images/mall/my/icon_addr_edit.png" />
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 新增帐号 -->
		<view class="tui-memberbankcard-new">
			<tui-button shadow shape="circle" type="danger" height="88rpx" @click="addMemberbankcard">+ 新增收款帐号</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberbankcardList: [],
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
				this.$request.post('memberbankcard.setdefault', {
					id: id
				}).then(res => {
					uni.navigateBack({});
				})
			},
			addMemberbankcard: function() {
				wx.navigateTo({
					url: "/pages/my/memberbankcard/editMemberbankcard"
				})
			},
			editMemberbankcard: function(e) {
				wx.navigateTo({
					url: "/pages/my/memberbankcard/editMemberbankcard?id=" + e.currentTarget.dataset.id
				})
			},
			initShippingAddress: function() {
				var _this = this;
				_this.$request.get('memberbankcard.list', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.memberbankcardList = res.data;
					} else if (res.errno == 700) {
						_this.memberbankcardList = null;
					}
				})
			}
		}
	}
</script>

<style>
	.tui-memberbankcard {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}

	.tui-memberbankcard-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-memberbankcard-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}

	.tui-memberbankcard-name {
		width: 120rpx;
		height: 60rpx;
	}

	.tui-memberbankcard-tel {
		margin-left: 12rpx;
	}

	.tui-memberbankcard-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}

	.tui-memberbankcard-label {
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

	.tui-memberbankcard-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-memberbankcard-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-memberbankcard-new {
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
