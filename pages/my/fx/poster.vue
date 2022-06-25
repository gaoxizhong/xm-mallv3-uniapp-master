<template>
	<view>
		<canvas :style="{ width: winWidth + 'px', height: winHeight + 'px' }" canvas-id="posterId" id="posterId"
			class="tui-poster__canvas"></canvas>

		<view class="tui-poster__box">
			<image :src="posterImg" v-if="posterImg" class="tui-poster__img"></image>
			<tui-button class="tui-poster__button" type="danger" width="460rpx" height="80rpx" shape="circle"
				@click="savePic">保存图片
			</tui-button>
		</view>
	</view>

</template>

<script>
	const poster = require('@/components/common/tui-poster/tui-poster.js');
	export default {
		components: {

		},
		data() {
			return {
				posterImg: '',
				winWidth: uni.upx2px(690 * 2),
				winHeight: uni.upx2px(1063 * 2),
			}
		},

		onLoad: function() {
			var thas = this
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					thas.userinfo = res.data;
				}
			})
			thas.createPoster()
		},
		methods: {
			async createPoster() {
				const _this = this;
				if (this.posterImg) {
					this.modalShow = true;
					return;
				}
				uni.showLoading({
					mask: true,
					title: '图片生成中...'
				});

				var posterdata = await _this.$request.get('agent.poster', { samkey: (new Date()).valueOf() });
				let mainPic = await poster.getImage(posterdata.data.poster);
				let qrcode = await poster.getImage(posterdata.data.qrcode);

				// #ifdef MP-WEIXIN
				await poster.removeSavedFile();
				// #endif
				if (mainPic && qrcode) {
					const imgs = {
						mainPic: mainPic,
						qrcode: qrcode
					};
					let text =  posterdata.data.nickName;
					let name =  posterdata.data.sitename;
					poster.drawPoster('posterId', this.winWidth, this.winHeight, imgs, text,
						name,
						res => {
							uni.hideLoading();
							if (res) {
								this.posterImg = res;
								setTimeout(() => {
									this.modalShow = true;
								}, 60);
							} else {
								this.tui.toast('生成海报失败,请稍后再试');
							}
						});
				} else {
					uni.hideLoading();
					this.tui.toast('生成海报图片下载失败,请稍后再试');
				}
			},
			savePic() {
				if (this.posterImg) {
					// #ifdef H5
					uni.previewImage({
						urls: [this.posterImg]
					});
					// #endif
			
					// #ifndef H5
					poster.saveImage(this.posterImg);
					// #endif
				}
			}
		}
	}
</script>

<style>
	image {
		width: 100%;
		min-height: 1163rpx;
		display: block;
		margin: 0 auto;
	}

	.tui-poster__canvas {
		background-color: #fff;
		position: absolute;
		top: -9999px;
	}

	.tui-poster__box {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.tui-poster__img {
		width: 99%;
	}

	.tui-poster__button {
		margin-top: 40rpx;
	}
</style>
