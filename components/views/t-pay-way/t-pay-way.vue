<template>
	<view>
		<tui-bottom-popup :show="show" @close="close">
			<tui-list-cell :hover="false">
				<view class="tui-pay-item__title">
					<view>请选择支付方式</view>
					<view>支付金额：<text class="tui-pay-amuont">￥{{amuont}}</text></view>
				</view>
			</tui-list-cell>
			<radio-group @change="paymentradioChange">
				<block v-for="(item,index) in paymethod" :key="index">
					<tui-list-cell unlined>
						<label class="tui-pay-item">
							<image :src="'/static/images/mall/pay/'+item.code+'.png'" class="tui-pay-logo"></image>
							<text>{{item.title}}</text>
							<view class="tui-radio">
								<radio color="#EB0909" :value="item.code" :name="item.code" :checked="item.code === paymethod[0].default"></radio>
							</view>
						</label>
					</tui-list-cell>
				</block>
			</radio-group>
			<view class="tui-btn-pay">
				<tui-button height="88rpx" type="danger" shape="circle" shadow @click="goPay">去付款</tui-button>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	export default {
		name: 'tPayWay',
		props: {
			//支付方式
			paymethod: {
				type: Array,
				default() {
					return [];
				}
			},
			//控制显示
			show: {
				type: Boolean,
				default: false
			},
			amuont:{
				type: String,
				default: ''
			},
			page: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				paymentType:""
			};
		},
		
		methods: {
			close() {
				this.$emit("close", {})
			},
			goPay() {
				this.$emit("goPay", {paymentType:this.paymentType})
			},
			paymentradioChange(e) {
				this.paymentType = e.target.value
			}
		}
	}
</script>

<style scoped>
	.tui-pay-item__title {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.tui-pay-amuont {
		color: #eb0909;
		font-weight: 500;
		font-size: 34rpx;
	}

	.tui-pay-item {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.tui-pay-logo {
		width: 48rpx;
		height: 48rpx;
		margin-right: 15rpx;
	}

	.tui-radio {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	.tui-btn-pay {
		width: 100%;
		padding: 68rpx 60rpx 50rpx;
		box-sizing: border-box;
	}

	.tui-recharge {
		color: #fc872d;
		margin-left: auto;
		padding: 12rpx 0;
	}
</style>
