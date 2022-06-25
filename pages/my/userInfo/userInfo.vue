<template>
	<view class="tui-userinfo-box">
		<tui-list-cell padding="0" :arrow="true" @click="changeAvatar">
			<view class="tui-list-cell">
				<view>头像</view>
				<image :src="memberinfo.userpic" class="tui-avatar"></image>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0" :arrow="true" @click="nickname">
			<view class="tui-list-cell">
				<view>昵称</view>
				<view class="tui-content">{{memberinfo.nickname}}</view>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0" :arrow="true" @click="changeSex">
			<view class="tui-list-cell">
				<view>性别</view>
				<view class="tui-content">{{sex}}</view>
			</view>
		</tui-list-cell>
		<!--<picker mode="date" @change="changeDate">
			<tui-list-cell padding="0" :arrow="true" unlined>
				<view class="tui-list-cell">
					<view>出生日期</view>
					<view class="tui-content">{{date}}</view>
				</view>
			</tui-list-cell>
		</picker>-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: '男',
				date: '请选择',
				memberinfo: [],
			}
		},
		onShow: function() {
			let _this = this;

			_this.$util.getUserInfo(function(userInfo) {
				//Console.log("adfs");
				_this.$request.get('member.detail', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.memberinfo = res.data;
						_this.sex = res.data.sex;
					}
				});
			})

		},

		onUnload: function() {
			uni.navigateTo({
				url: '/pages/my/userInfo/index'
			});
		},
		methods: {
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						const tempFilePaths = res.tempFilePaths[0];
						this.tui.href('/pages/my/cropper/cropper?src=' + tempFilePaths);
					}
				});
			},
			nickname() {
				this.tui.href("/pages/my/nickname/nickname")
			},
			changeSex() {
				let _this = this
				uni.showActionSheet({
					itemList: ['男', '女'],
					success(e) {
						_this.sex = ['男', '女'][e.tapIndex];
						_this.$request.post('member.update', {
							sex: _this.sex
						}).then(res => {
							if (res.errno == 0) {
								
							}
						});
					}
				})
				
			},
			changeDate(e) {
				console.log(e)
				this.date = e.detail.value
			}
		}
	}
</script>

<style>
	.tui-userinfo-box {
		margin: 20rpx 0;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}

	.tui-pr30 {
		padding-right: 30rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: block;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}
</style>
