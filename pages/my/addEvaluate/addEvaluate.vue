<template>
	<view class="container">
		<form @submit="submitComment" report-submit="true">
			<block v-for="(item, index) in orderGoods" :key="index">

				<tui-list-cell :hover="false">
					<view class="tui-goods__box">
						<image :src="item.image" class="tui-goods__img" mode="widthFix"></image>
						<view class="tui-rate__box">
							<view class="tui-rate__text">{{item.title}}</view>

						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-rate__text">评分</view>
					<tui-rate :current="item.level" :params="index" @change="change"></tui-rate>
				</tui-list-cell>
				<tui-list-cell :hover="false" padding="0">
					<textarea v-model="item.content" class="tui-textarea" placeholder="说说本次消费的感受吧..."
						maxlength="200"></textarea>
				</tui-list-cell>
				<!--<tui-list-cell :hover="false">
			<view class="tui-img__title">添加图片</view>
			<tui-upload></tui-upload>
		</tui-list-cell>-->
			</block>

			<!--<view class="tui-check__box">
			<checkbox-group>
				<label class="tui-checkbox">
					<checkbox color="#fff"></checkbox>
					<text class="tui-cb__text">匿名评价</text>
				</label>
			</checkbox-group>
		</view>-->

			<view class="tui-btn__box">
				<tui-button form-type="submit" type="danger" height="88rpx" shape="circle">提交评价</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderGoods: [],
			}
		},
		onLoad: function(options) {
			let _this = this
			var goodsId = options.id;
			_this.$request.get('comment.getgoods', {
				samkey: (new Date()).valueOf(),
				goodsId: goodsId
			}).then(function(res) {
				if (res.errno != 0) {
					uni.showModal({
						title: '错误',
						content: res.msg,
						showCancel: false
					})
					return;
				}
				_this.orderGoods = res.data;
			});
		},
		methods: {
			change(e) {
				this.orderGoods[e.params].level = e.index;
			},
			submitComment: function(e) {
				let _this = this;

				_this.$request.post('comment.add', {
					postJsonString: JSON.stringify(_this.orderGoods)
				}).then(function(res) {
					if (res.errno == 0) {
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: false,
							//是否显示取消按钮 
							success: function(res) {
								if (res.cancel) { //点击取消,默认隐藏弹框
								} else {
									uni.reLaunch({
										url: "/pages/login/success?ptype=" + _this.ptype
									});
								}
							}
						});
					}

				});

			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 0;
	}

	.tui-goods__box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-goods__img {
		width: 104rpx;
		height: 104rpx;
	}

	.tui-rate__box {
		flex: 1;
		height: 100%;
		padding-left: 20rpx;
		font-size: 26rpx;
	}

	.tui-rate__text {
		margin-bottom: 16rpx;
	}

	.tui-textarea {
		width: 100%;
		height: 300rpx;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.tui-img__title {
		padding-bottom: 24rpx;
	}

	.tui-check__box {
		padding: 25rpx 30rpx;
	}

	.tui-checkbox {
		min-width: 70rpx;
		height: 45rpx;
		display: flex;
		align-items: center;
	}

	/* #ifdef MP-WEIXIN */
	.tui-checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		transform-origin: center 30%;
		border-color: #d1d1d1 !important;
	}

	.tui-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #eb0909;
		width: 44rpx !important;
		height: 44rpx !important;
		border: none;
	}

	/* #endif */
	/* #ifndef MP-WEIXIN */

	>>>.tui-checkbox .uni-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		border-color: #d1d1d1 !important;
	}

	>>>.tui-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #eb0909;
		width: 45rpx !important;
		height: 45rpx !important;
		border: none;
	}

	/* #endif */

	.tui-cb__text {
		font-size: 28rpx;
		padding-left: 8rpx;
		color: #999;
	}

	.tui-btn__box {
		width: 100%;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
	}
</style>
