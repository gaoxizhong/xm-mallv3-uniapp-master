<template>
	<view class="container">
		<form @submit="bindSave" :report-submit="true">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-cell-input">
					<input name="amount" :placeholder="'输入与客户沟通的尾款金额'" placeholder-class="tui-phcolor" type="text"
						:auto-focus="true" :focus="true" maxlength="40" />
				</view>
			</tui-list-cell>
			<view class="tui-btn-box">
				<tui-button formType="submit" :shadow="false" height="88rpx" shape="circle" type="danger">确认
				</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: ''
			};
		},
		onLoad: function(e) {
			this.id = e.id;
		},
		onShow: function() {

		},
		methods: {
			async bindSave(e) {
				const _this = this
				const amount = e.detail.value.amount;
				if (amount == "" || amount * 1 < 0) {
					wx.showToast({
						title: '请填写尾款金额',
						icon: 'none'
					})
					return
				}

				_this.$request.post('order.additional', {
					orderid: _this.id,
					additional: amount
				}).then(function(res) {
					if (res.errno == 0) {
						uni.navigateBack({})
					}
				});

			}
		}
	};
</script>

<style lang="scss">
	.container {
		padding-top: 20rpx;

		.tui-cell-input {
			width: 100%;
			display: flex;
			align-items: center;
			box-sizing: border-box;

			input {
				flex: 1;
				padding-left: $uni-spacing-row-base;
			}
		}

		.tui-btn-box {
			padding: 40rpx 30rpx 10rpx 30rpx;
			box-sizing: border-box;
		}
	}
</style>
