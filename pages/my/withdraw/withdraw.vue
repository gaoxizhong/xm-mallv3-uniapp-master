<template>
	<view class="container">
		<form @submit="bindSave" :report-submit="true">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-cell-input">
					<input name="amounts" :placeholder="'提现金额,最少'+min_money+'元'" placeholder-class="tui-phcolor"
						type="text" :auto-focus="true" :focus="true" maxlength="40" />
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" unlined :radius="true" @click="chooseMemberbankcard">
				<view class="tui-bg-img"></view>
				<view class="tui-address">
					<view v-if="memberbankcardData.accounts">
						<view class="tui-userinfo">
							<text class="tui-name">{{memberbankcardData.name}}</text>{{memberbankcardData.accounts}}
						</view>
						<view class="tui-addr">
							<text>{{memberbankcardData.bankname}}</text>
							<text v-if="memberbankcardData.branchname">{{memberbankcardData.branchname}}</text>
						</view>
					</view>
					<view class="tui-none-addr" v-else>
						<text>请选择收款帐号</text>
					</view>
				</view>
			</tui-list-cell>
			<view class="tui-btn-box">
				<tui-button formType="submit" :shadow="false" height="88rpx" shape="circle" type="danger">申请提现
				</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				min_money: '',
				mo: 'agent',
				memberbankcardData: []
			};
		},
		onLoad: function(options) {
			let _this = this;
			if (options.mo) {
				_this.mo = options.mo;
			}
			_this.$request.post('config', {
				mo: _this.mo
			}).then(res => {
				if (res.errno == 0) {
					_this.min_money = res.data.min_money
				}
			});
		},
		onShow: function() {
			let _this = this
			_this.initmemberbankcard();
		},
		methods: {
			chooseMemberbankcard() {
				uni.navigateTo({
					url: "/pages/my/memberbankcard/memberbankcard"
				})
			},
			initmemberbankcard: function() {
				var _this = this;
				_this.$request.get('memberbankcard.default', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.memberbankcardData = res.data;
					} else {
						_this.memberbankcardData = null;
					}
				})
			},
			bindSave: function(e) {
				var _this = this;
				var bid;
				var amounts = e.detail.value.amounts;
				if (_this.memberbankcardData) {
					bid = _this.memberbankcardData.id;
				}

				if (!bid) {
					uni.showModal({
						title: '提示',
						content: '请选择收款帐号',
						showCancel: false
					})
					return
				}
				if (amounts == "" || amounts * 1 < _this.min_money) {
					uni.showModal({
						title: '提示',
						content: '提现金额不能少于' + _this.min_money + '元',
						showCancel: false
					})
					return
				}
				_this.$request.post('withdraw.apply', {
					mo: _this.mo,
					amounts: amounts,
					bid: bid
				}).then(res => {
					if (res.errno == 0) {
						//console.log(res);
						uni.showModal({
							title: '提示',
							content: res.message,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack({});
								}
							}
						})
					} else {
						uni.showModal({
							title: "提示",
							content: res.message,
							showCancel: false
						})
					}
				})
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
