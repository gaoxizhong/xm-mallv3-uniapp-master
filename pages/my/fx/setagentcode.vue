<template>
	<view class="container">
		<form @submit="bindSave" :report-submit="true">
		<tui-list-cell :hover="false" :lineLeft="false">
			<view class="tui-cell-input">
				<input :value="agent_code" placeholder="请输入邀请码" placeholder-class="tui-phcolor" type="text" :auto-focus="true" :focus="true" maxlength="40" @input="inputagent_code" />
			</view>
		</tui-list-cell>
		<view class="tui-btn-box">
			<tui-button formType="submit" shadow height="88rpx" shape="circle" type="danger">确定</tui-button>
		</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			agent_code: ''
		};
	},
	onShow: function() {
		let _this = this;
		_this.$util.getUserInfo(function(userInfo) {
			//Console.log("adfs");
			_this.$request.get('member.detail',{
					samkey: (new Date()).valueOf()
				}).then(res => {
				if (res.errno == 0) {
					_this.agent_code = res.data.agent_code;
				}
			});
		})
		
	},
	methods: {
		bindSave(e) {
			let _this = this;
			_this.$request.post('agent.upcode', {
				agent_code: _this.agent_code
			}).then(res => {
				if (res.errno == 0) {
					this.tui.href("/pages/my/fx/index")
				}
			});
		},
		inputagent_code(e) {
			this.agent_code = e.detail.value;
		},
		clearInput() {
			this.agent_code = '';
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
