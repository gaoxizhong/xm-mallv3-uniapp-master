<template>
	<view class="container">
		<view class="tui-records__list">
			<tui-list-cell :hover="false" v-for="(item,index) in datalist" :key="index">
				<view class="tui-records__item">
					<image class="tui-icon" src="/static/images/mall/wallet/icon_expend_3x.png"></image>
					<view>
						<view class="tui-title">佣金提现</view>
						<view class="tui-desc">申请时间:{{item.create_time}}</view>
					</view>
					<view class="tui-right__box">
						<view class="tui-amount tui-expend">
							-{{item.amounts}} 元
						</view>
						<view class="tui-desc" v-if="item.pay_time">支付时间:{{ item.pay_time }}</view>
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
				datalist: [],
				mo: 'agent'
			}
		},
		onLoad(options) {
			this.mo = options.mo;
			this.getdatalist();
		},
		methods: {
			getdatalist() {
				const _this = this
				_this.$request.get('withdraw.index', {
					mo: _this.mo
				}).then(res => {
					if (res.errno == 0) {
						_this.datalist = res.data
					} else {
						_this.datalist = []
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
