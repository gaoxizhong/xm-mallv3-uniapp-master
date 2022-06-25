<template>
	<view class="container">
		<form @submit="bindSave" :report-submit="true">
		<tui-list-cell :hover="false" :lineLeft="false">
			<view class="tui-cell-input">
				<input :value="nickname" placeholder="请输入昵称" placeholder-class="tui-phcolor" type="text" :auto-focus="true" :focus="true" maxlength="40" @input="inputNickname" />
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
			nickname: ''
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
					_this.nickname = res.data.nickname;
				}
			});
		})
		
	},
	methods: {
		bindSave(e) {
			let _this = this;
			_this.$request.post('member.update', {
				nickname: _this.nickname
			}).then(res => {
				if (res.errno == 0) {
					this.tui.href("/pages/my/userInfo/userInfo")
				}
			});
		},
		inputNickname(e) {
			this.nickname = e.detail.value;
		},
		clearInput() {
			this.nickname = '';
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
