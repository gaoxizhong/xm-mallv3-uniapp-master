<template>
	<view class="container">
		<view class="tui-header">
			<view>
				<text class="tui-title">我的卡</text>
				<text class="tui-total">（共6张）</text>
			</view>
			<tui-tag plain type="danger" shape="circle" hover padding="12rpx 20rpx" @click="addBankCard">+ 添加银行卡</tui-tag>
		</view>
		<view class="tui-bankcard__list">
			<view class="tui-bankcard__item tui-ping_an">
				<view class="tui-card__info">
					<view class="tui-logo__box">
						<image class="tui-logo" src="/static/images/mall/bank/p_a.png"></image>
					</view>
					<view class="tui-name__box">
						<view class="tui-name">平安银行</view>
						<view class="tui-desc">储蓄卡</view>
					</view>
					<view class="tui-card__no">**** 6674</view>
				</view>
			</view>
			<view class="tui-bankcard__item tui-min_sheng">
				<view class="tui-card__info">
					<view class="tui-logo__box">
						<image class="tui-logo" src="/static/images/mall/bank/m_s.png"></image>
					</view>
					<view class="tui-name__box">
						<view class="tui-name">中国民生银行</view>
						<view class="tui-desc">储蓄卡</view>
					</view>
					<view class="tui-card__no">**** 9970</view>
				</view>
			</view>
			<view class="tui-bankcard__item tui-nong_ye">
				<view class="tui-card__info">
					<view class="tui-logo__box">
						<image class="tui-logo" src="/static/images/mall/bank/n_y.png"></image>
					</view>
					<view class="tui-name__box">
						<view class="tui-name">中国农业银行</view>
						<view class="tui-desc">储蓄卡</view>
					</view>
					<view class="tui-card__no">**** 6475</view>
				</view>
			</view>

			<view class="tui-bankcard__item tui-zhong_xin">
				<view class="tui-card__info">
					<view class="tui-logo__box">
						<image class="tui-logo" src="/static/images/mall/bank/z_x.png"></image>
					</view>
					<view class="tui-name__box">
						<view class="tui-name">中信银行</view>
						<view class="tui-desc">储蓄卡</view>
					</view>
					<view class="tui-card__no">**** 6516</view>
				</view>
			</view>

			<view class="tui-bankcard__item tui-zhao_shang">
				<view class="tui-card__info">
					<view class="tui-logo__box">
						<image class="tui-logo" src="/static/images/mall/bank/z_s.png"></image>
					</view>
					<view class="tui-name__box">
						<view class="tui-name">招商银行</view>
						<view class="tui-desc">储蓄卡</view>
					</view>
					<view class="tui-card__no">**** 1316</view>
				</view>
			</view>

			<view class="tui-bankcard__item tui-jian_she">
				<view class="tui-card__info">
					<view class="tui-logo__box">
						<image class="tui-logo" src="/static/images/mall/bank/j_s.png"></image>
					</view>
					<view class="tui-name__box">
						<view class="tui-name">中国建设银行</view>
						<view class="tui-desc">储蓄卡</view>
					</view>
					<view class="tui-card__no">**** 4216</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	/*
	 更多银行logo下载请前往：
	 https://github.com/dingyong0214/bank-logo
	*/
	export default {
		data() {
			return {

			}
		},
		methods: {
			addBankCard() {
               this.tui.toast('功能开发中~')
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		padding: 0 40rpx 40rpx;
		box-sizing: border-box;
	}

	.tui-header {
		width: 100%;
		padding: 36rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.tui-total {
		font-size: 24rpx;
		color: #999;
	}

	.tui-bankcard__item {
		width: 100%;
		height: 240rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	}

	.tui-logo__box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}

	.tui-logo {
		width: 52rpx;
		height: 52rpx;
	}

	.tui-card__info {
		display: flex;
		align-items: center;
		color: #fff;
	}

	.tui-name {
		font-size: 30rpx;
		font-weight: 500;
	}

	.tui-desc {
		font-size: 24rpx;
		opacity: 0.7;
	}

	.tui-card__no {
		margin-left: auto;
	}

	.tui-ping_an {
		background: linear-gradient(to right, #FEAD4B, #FF9225);
	}

	.tui-jian_she {
		background: linear-gradient(to right, #2C85D5, #2D66D1);
	}

	.tui-min_sheng {
		background: linear-gradient(to right, #2C87D6, #2D69D0);
	}

	.tui-nong_ye {
		background: linear-gradient(to right, #01ADA3, #0291A9);
	}

	.tui-zhao_shang {
		background: linear-gradient(to right, #FF6F64, #FE5762);
	}

	.tui-zhong_xin {
		background: linear-gradient(to right, #FF7065, #FD4754);
	}
</style>
