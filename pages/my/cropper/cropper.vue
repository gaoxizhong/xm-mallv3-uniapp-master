<template>
	<view class="container">
		<tui-picture-cropper :lockRatio="true" :imageUrl="imageUrl" @ready="ready" @cropper="cropper">
		</tui-picture-cropper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				imageUrl: '', //要裁剪的图片
				resimage: ''
			};
		},
		onLoad(options) {
			this.src = options.src || '';
			//如果从上个页面传值时可显示loading
			this.src &&
				uni.showLoading({
					title: '请稍候...',
					mask: true
				});
		},
		methods: {
			ready() {
				this.imageUrl = this.src;
			},
			cropper(e) {
				var _this = this;
				//裁剪完成后处理逻辑
				if (e.url) {
					this.$request.uploadFile(e.url).then(res => {
						//console.log(res);
						_this.resimage = res.url;
						
						_this.$request.post('member.update', {
							userpic: _this.resimage
						}).then(res => {
							if (res.errno == 0) {
								this.tui.href("/pages/my/userInfo/userInfo")
							}
						});
						

					});
				} else {
					console.log(e.base64)
					this.tui.toast('裁剪成功！查看控制台打印')
				}
			}
		}
	};
</script>

<style></style>
