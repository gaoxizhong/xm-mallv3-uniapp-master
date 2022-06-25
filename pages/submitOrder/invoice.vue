<template>
	<view class="container">
		<view class="tui-invoice__box">
			<tui-list-cell :hover="false">
				<view class="tui-title tui-bold">
					<text>发票类型</text>
					<text class="tui-notice" @tap="modal = true">发票须知</text>
				</view>
				<view class="tui-attr__box">
					<view class="tui-attr-item" :class="{ 'tui-attr-active': type === 1 }" @tap="switchType(1)">电子普通发票</view>
					<view class="tui-attr-item" :class="{ 'tui-attr-active': type === 2 }" @tap="switchType(2)">不开发票</view>
				</view>
				<view class="tui-tips">ThorUI商城启用电子普通发票，与纸质普通发票具备同等法律效力，订单完成后24小时内在“我的订单”查看</view>
			</tui-list-cell>
			<view v-if="type === 1">
				<tui-list-cell :hover="false">
					<view class="tui-title tui-bold">发票抬头</view>
					<view class="tui-attr__box tui-pbtm__0">
						<view class="tui-attr-item" :class="{ 'tui-attr-active': invoiceTitle === 1 }" @tap="switchTitle(1)">个人</view>
						<view class="tui-attr-item" :class="{ 'tui-attr-active': invoiceTitle === 2 }" @tap="switchTitle(2)">单位</view>
					</view>
					<view class="tui-form">
						<view class="tui-box__personal" v-show="invoiceTitle === 1">
							<view class="tui-input__item">
								<view class="tui-input__title">个人名称名称</view>
								<input placeholder="请填写“个人”或您的姓名" placeholder-class="tui-placeholder" />
							</view>
						</view>
						<view class="tui-box__enterprise" v-show="invoiceTitle === 2">
							<view class="tui-input__item">
								<view class="tui-input__title">单位名称</view>
								<input placeholder="请填写单位名称" placeholder-class="tui-placeholder" />
							</view>
							<view class="tui-input__item">
								<view class="tui-input__title">纳税人识别码</view>
								<input placeholder="纳税人识别号/统一社会信用代码" placeholder-class="tui-placeholder" />
							</view>
							<view class="tui-input__item tui-between">
								<view class="tui-input__title">更多选填项</view>
								<view class="tui-more__optional" @tap="optional=!optional">
									<text>展开</text>
									<tui-icon :name="optional?'arrowup':'arrowdown'" :size="18" color="#999"></tui-icon>
								</view>
							</view>
							<view class="tui-optional__box" v-if="optional">
								<view class="tui-input__item">
									<view class="tui-input__title">注册地址</view>
									<input placeholder="请填写注册地址" placeholder-class="tui-placeholder" />
								</view>
								<view class="tui-input__item">
									<view class="tui-input__title">注册电话</view>
									<input type="number" placeholder="请填写注册电话" placeholder-class="tui-placeholder" />
								</view>
								<view class="tui-input__item">
									<view class="tui-input__title">开户银行</view>
									<input placeholder="请填写单位开户银行" placeholder-class="tui-placeholder" />
								</view>
								<view class="tui-input__item">
									<view class="tui-input__title">银行账号</view>
									<input placeholder="请填写单位银行账号" placeholder-class="tui-placeholder" />
								</view>
							</view>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-title tui-bold">收票人信息</view>
					<view class="tui-input__item">
						<view class="tui-input__title">收票人手机</view>
						<input placeholder="可通过手机号在发票服务平台查询" placeholder-class="tui-placeholder" value="188****0088" />
					</view>
					<view class="tui-input__item">
						<view class="tui-input__title">收票人邮箱</view>
						<input placeholder="用来接收电子发票邮件,可选填" placeholder-class="tui-placeholder" />
					</view>
				</tui-list-cell>
			</view>
		</view>

		<view class="tui-btn__box">
			<tui-button type="danger" height="88rpx" shape="circle">确定</tui-button>
		</view>

		<tui-modal :show="modal" shape="circle" padding="30rpx 40rpx" custom>
			<view class="tui-modal__title">发票须知</view>
			<view class="tui-modal__p">1.发票金额不含优惠券、红包等优惠扣减金额；</view>
			<view class="tui-modal__p">2.请确保发票抬头、纳税人识别号或统一社会信用代码的准确性，开票成功后无法更改；</view>
			<view class="tui-modal__p">3.增值税普通发票的开具不填写纳税人识别号或统一社会信用代码不得作为税收凭证。</view>
			<view class="tui-modal__btn">
				<tui-button type="danger" shape="circle" width="280rpx" height="68rpx" :size="26" @click="modal = false">我知道了</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1, //发票类型：1-电子普通发票 2-不开发票
				invoiceTitle: 1, //发票抬头：1-个人 2-企业
				optional: false,
				modal: false
			};
		},
		methods: {
			switchType(type) {
				this.type = type;
			},
			switchTitle(type) {
				this.invoiceTitle = type;
			}
		}
	};
</script>

<style>
	.tui-invoice__box {
		background-color: #ffffff;
		margin-top: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.tui-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-notice {
		font-size: 24rpx;
		font-weight: 400;
		color: #999;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-attr__box {
		padding: 24rpx 0;
	}

	.tui-pbtm__0 {
		padding-bottom: 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 180rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: #f7f7f7;
		border: 1rpx solid #f7f7f7;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 32px;
		margin-right: 32rpx;
		font-size: 26rpx;
	}

	.tui-attr-active {
		background-color: #fcedea;
		border-color: #e41f19;
		color: #e41f19;
		font-weight: bold;
	}

	.tui-tips {
		color: #999;
		font-size: 24rpx;
		font-weight: 400;
	}

	.tui-input__item {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		padding-top: 40rpx;
	}

	.tui-input__title {
		width: 196rpx;
		flex-shrink: 0;
	}

	.tui-input__item input {
		font-size: 28rpx;
		flex: 1;
	}

	.tui-placeholder {
		color: #bfbfbf;
	}

	.tui-more__optional {
		font-size: 24rpx;
		display: flex;
		align-items: center;
		color: #999;
	}

	.tui-between {
		justify-content: space-between;
	}

	.tui-btn__box {
		padding: 60rpx 30rpx 80rpx;
	}

	.tui-modal__title {
		text-align: center;
		font-weight: bold;
		padding-bottom: 8rpx;
	}

	.tui-modal__p {
		font-size: 26rpx;
		color: #888;
		padding-top: 20rpx;
	}

	.tui-modal__btn {
		width: 100%;
		padding: 60rpx 0 20rpx;
		display: flex;
		justify-content: center;
	}
</style>
