<template>
	<view class="container">
		<view class="tui-block__box tui-mtop__20">
			<text>发票状态</text>
			<text class="tui-color__red">已开票</text>
		</view>
		<view class="tui-block__box tui-mtop__24">
			<view>
				<text>订单状态</text>
				<text class="tui-color__black">已完成</text>
			</view>
			<view class="tui-ptop__20">
				<text>订单编号</text>
				<text class="tui-color__black">109943209010</text>
			</view>
			<view class="tui-ptop__20">
				<text>下单时间</text>
				<text class="tui-color__black">2020-01-01 13:18:21</text>
			</view>
			<view class="tui-ptop__20">
				<text>发票类型</text>
				<text class="tui-color__black">电子普通发票</text>
			</view>
		</view>
		<view class="tui-block__box tui-mtop__24">
			<view class="tui-invoice__box">
				<image src="https://thorui.cn/images/mall/invoice_logo.png" class="tui-invoice__logo"></image>
				<view class="tui-color__red tui-invoice__title">增值税电子普通发票</view>
			</view>
			<view class="tui-flex__between tui-ptop__20">
				<view>
					<text>发票内容</text>
					<text class="tui-color__black">商品明细</text>
				</view>
				<tui-button type="black" plain shape="circle" width="162rpx" height="52rpx" :size="24" @click="view">查看发票</tui-button>
			</view>
			<view class="tui-ptop__20">
				<text>发票抬头</text>
				<text class="tui-color__black">个人</text>
			</view>
		</view>
		<view class="tui-btn__box">
			<tui-button type="danger" shape="circle" height="88rpx" @click="sendEmail">发送至邮箱</tui-button>
		</view>
		<tui-modal :show="modal" @cancel="cancel" :custom="true" fadeIn>
			<view class="tui-modal-custom">
				<view class="tui-prompt-title">请确认邮箱地址</view>
				<input placeholder="用来接收电子发票邮件" class="tui-modal-input" :class="{'tui-hidden-input':!modal}" />
				<view class="tui-modal__btn">
					<view class="tui-box">
						<tui-button type="danger" plain shape="circle" height="64rpx" :size="26" @click="cancel">取消</tui-button>
					</view>
					<view class="tui-box">
						<tui-button type="danger" height="64rpx" :size="26" shape="circle" @click="cancel">发送</tui-button>
					</view>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modal: false
			};
		},
		methods: {
			view() {
				uni.previewImage({
					urls: ['https://thorui.cn/images/mall/img_invoice.jpg']
				})
			},
			sendEmail() {
				this.modal = true
			},
			cancel() {
				this.modal = false
			}
		}
	};
</script>

<style>
	.container {
		width: 100%;
		padding: 24rpx 25rpx;
		box-sizing: border-box;
	}

	.tui-block__box {
		width: 100%;
		padding: 40rpx 25rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		font-size: 24rpx;
		color: #999;
		box-shadow: 0 15rpx 10rpx -15rpx #efefef;
	}

	.tui-mtop__24 {
		margin-top: 24rpx;
	}

	.tui-ptop__20 {
		padding-top: 20rpx;
	}

	.tui-color__black {
		color: #333;
		padding-left: 40rpx;
	}

	.tui-color__red {
		color: #eb0909;
		padding-left: 40rpx;
	}

	.tui-invoice__box {
		width: 100%;
		position: relative;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tui-invoice__logo {
		width: 150rpx;
		height: 86rpx;
	}

	.tui-invoice__title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding-left: 0 !important;
	}

	.tui-flex__between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-btn__box {
		padding: 80rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-modal-custom {
		text-align: center;
	}

	.tui-prompt-title {
		padding-bottom: 20rpx;
		font-size: 34rpx;
	}

	.tui-modal-input {
		width: 100%;
		height: 68rpx;
		background-color: #FAFAFA;
		margin: 40rpx auto 60rpx;
		font-size: 30rpx;
		text-align: left;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 30px;
	}

	.tui-hidden-input {
		/* #ifdef MP-WEIXIN */
		width: 0;
		/* #endif */
	}

	.tui-modal__btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-box {
		flex: 1;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
</style>
