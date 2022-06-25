<template>
	<view class="container">
		<view class="tui-records__list">
			<tui-list-cell :hover="false" v-for="(item,subIndex) in commisionLog" :key="subIndex">
				<view class="tui-records__item">
					<image class="tui-icon" src="/static/images/mall/wallet/icon_income_3x.png"></image>
					<view>
						<view class="tui-title">分销佣金</view>
						<view class="tui-desc">{{item.time}}</view>
					</view>
					<view class="tui-right__box">
						<view class="tui-amount">
							+{{item.income}} 元
						</view>
						<view class="tui-desc">时间： {{ item.pay_time }}</view>
					</view>
				</view>
			</tui-list-cell>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commisionLog: []
			}
		},
		onLoad() {
			this.getcommisionlog();
		},
		methods: {
			getcommisionlog() {
				const _this = this
				_this.$request.get('Incomelog.index',{ptype:1}).then(res => {
					if (res.errno == 0) {
						_this.commisionLog = res.data
					} else {
						_this.commisionLog = []
					}
				})
			}
		},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-records__list {
		margin-top: 20rpx;
	}

	.tui-records__item {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-icon {
		width: 72rpx;
		height: 72rpx;
		margin-right: 20rpx;
	}

	.tui-title {
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
	}

	.tui-desc {
		font-size: 24rpx;
		font-weight: 400;
		color: #888888;
		padding-top: 12rpx;
	}

	.tui-right__box {
		margin-left: auto;
		text-align: right;
	}

	.tui-amount {
		font-size: 30rpx;
		font-weight: 400;
		color: #EB0909;
	}

	.tui-expend {
		color: #19be6b !important;
	}
</style>
