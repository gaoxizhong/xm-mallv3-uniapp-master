<template>
	<view class="container">
		<tui-tab :tabs="tabs" isSticky :current="currentTab" selectedColor="#E41F19" sliderBgColor="#E41F19"
			@change="change"></tui-tab>
		<view class="tui-records__list">
			<tui-list-cell :hover="false" v-for="(item,index) in datalist" :key="index">
				<view class="tui-records__item">
					<image v-if="item.prefix==2" class="tui-icon" src="/static/images/mall/wallet/icon_expend_3x.png"></image>
					<image v-if="item.prefix==1" class="tui-icon" src="/static/images/mall/wallet/icon_income_3x.png"></image>
					<view>
						<view class="tui-title">{{ item.remarks }}</view>
						<view class="tui-desc">{{ item.create_time }}</view>
					</view>
					<view class="tui-right__box">
						<view class="tui-amount" :class="{'tui-expend':item.prefix==2}">
							{{item.prefix==2?'-':'+'}}{{ item.amount }}
						</view>
						<view class="tui-desc">订单号: {{item.order_num_alias}}</view>
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
				tabs: ["全部", "收入", "支出"],
				currentTab: 0,
				datalist:[]
			}
		},
		onLoad() {
			this.getRecordsList()
		},
		methods: {
			change(e) {
				this.currentTab = e.index;
				this.getRecordsList();
			},
			getRecordsList() {
				const _this = this
				_this.$request.post('membercashlogs.list', {
					prefix: this.currentTab,
					page: 1,
					pageSize: 50
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
