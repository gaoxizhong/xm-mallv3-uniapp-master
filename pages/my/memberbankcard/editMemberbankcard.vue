<template>
	<view class="tui-addr-box">
		<form v-if="is_audit!=1" @submit="bindSave" :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">姓名</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="name" :value="memberbankcardData.name" placeholder="请输入收款姓名"
						 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">帐号</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="accounts" :value="memberbankcardData.accounts" placeholder="请输入帐号"
						 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">银行/支付名称</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="bankname" :value="memberbankcardData.bankname" placeholder="请输入银行/第三方支付"
						 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">开户行</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="branchname"  :value="memberbankcardData.branchname" placeholder="请输入开户行"
						 type="text" />
				</view>
			</tui-list-cell>
			
			<!-- 保存帐号 -->
			<view class="tui-addr-save">
				<tui-button formType="submit" shadow type="danger" height="88rpx" shape="circle">保存帐号</tui-button>
			</view>
			<view class="tui-del" v-if="memberbankcardData.length > 0">
				<tui-button shadow type="gray" @click="deleteMemberbankcard" height="88rpx" shape="circle">删除帐号</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				is_audit: 1,
				memberbankcardData:[],
			}
		},
		onLoad(e) {
			const _this = this;
			_this.$request.post('Config.audit', {
				samkey: (new Date()).valueOf()
			}).then(res => {
				_this.is_audit = res.data.is_audit;
			});
			if (e.id) { // 修改初始化数据库数据
				_this.$request.get('memberbankcard.detail', {
					id: e.id,
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno === 0) {
						_this.id = e.id;
						_this.memberbankcardData = res.data;
						return;
					} else {
						uni.showModal({
							title: '提示',
							content: '无法获取帐号数据',
							showCancel: false
						})
					}
				})
			}
		},
		methods: {
			bindSave: function(e) {
				var _this = this;
				var name = e.detail.value.name;
				var accounts = e.detail.value.accounts;
				var bankname = e.detail.value.bankname;
				var branchname = e.detail.value.branchname;
				
				if (name == "") {
					uni.showModal({
						title: '提示',
						content: '请填写联系人姓名',
						showCancel: false
					})
					return
				}

				if (accounts == "") {
					uni.showModal({
						title: '提示',
						content: '请填写帐号',
						showCancel: false
					})
					return
				}
				if (bankname == "") {
					uni.showModal({
						title: '提示',
						content: '请填写银行/支付帐号',
						showCancel: false
					})
					return
				}
				let apiResult
				if (_this.id) {
					apiResult = _this.$request.post('memberbankcard.update', {
						id: _this.id,
						name: name,
						accounts: accounts,
						bankname: bankname,
						branchname: branchname
					})
				} else {
					apiResult = _this.$request.post('memberbankcard.add', {
						name: name,
						accounts: accounts,
						bankname: bankname,
						branchname: branchname,
						isDefault: '0'
					})
				}

				apiResult.then(function(res) {
					if (res.errno != 0) {
						// 登录错误 
						uni.hideLoading();
						uni.showModal({
							title: '失败',
							content: res.msg,
							showCancel: false
						})
						return;
					}
					// 跳转到上一页
					uni.navigateBack({})
				})
			},

			deleteMemberbankcard: function() {
				var _this = this;
				var id = _this.memberbankcardData.id;
				uni.showModal({
					title: '提示',
					content: '确定要删除该收货地址吗？',
					success: function(res) {
						if (res.confirm) {
							_this.$request.post('memberbankcard.delete', {
								id: id
							}).then(function() {
								uni.navigateBack({})
							})

						} else {
							console.log('user cancel')
						}
					}
				})
			}
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
		flex-shrink: 0;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-pr__30 {
		padding-right: 30rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-cell-title {
		font-size: 28rpx;
		flex-shrink: 0;
	}

	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.92);
	}

	.tui-label-active {
		background: #E41F19;
		border-color: #E41F19;
		color: #fff;
	}

	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx 30rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx 30rpx;
	}
</style>
