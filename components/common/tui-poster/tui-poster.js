const poster = {
	/**
	 * 绘制分享海报 
	 * @param canvasId 
	 * @param winWidth 宽度
	 * @param winHeight 高度
	 * @param imgs 主图以及二维码图
	 *  格式 {mainPic: mainPic,qrcode: qrcode}
	 * @param text 描述文字
	 * @param name 程序名称
	 **/
	drawPoster(canvasId, winWidth, winHeight, imgs, text, name, callback) {
		//获取绘图上下文 context
		let context = uni.createCanvasContext(canvasId)
		// 海报背景
		const grd = context.createLinearGradient(0, winWidth, winHeight, 0)
		grd.addColorStop(0, '#FFF')
		grd.addColorStop(1, '#FFF')
		// Fill with gradient
		context.setFillStyle(grd);
		context.fillRect(0, 0, winWidth, winHeight);
		// 主图
		let width = winWidth,
			height = winHeight - 300;

		context.drawImage(imgs.mainPic, 0, 0, width, height)
		let a = uni.upx2px(40) //定义行高
		context.setFontSize(uni.upx2px(50))
		context.setFillStyle("#000")
		//名称很长调用方法将文字折行，传参 文字内容text，画布context
		let w = poster.getTextWidth(text, context) || uni.upx2px(550) * 2
		let x = winWidth / 15;
		let row = poster.wrapText(text, Math.floor(w), context)
		//console.log(w);
		for (let i = 0; i < row.length; i++) {
			context.fillText(row[i], (winWidth/ 4) + 80, (winHeight - uni.upx2px(360)) + a * i)
		}
		// 识别小程序二维码 
		context.setFontSize(uni.upx2px(36))
		let w1 = poster.getTextWidth(name, context) || 140
		context.drawImage(imgs.qrcode, x, (winHeight - uni.upx2px(500)), winWidth/4, winWidth/4)
		context.setFillStyle("#152338")
		context.fillText('邀请您加入'+name,  (winWidth/4) + 80, (winHeight - uni.upx2px(300)))
		context.setFillStyle("#333")
		context.setFontSize(uni.upx2px(24))
		context.fillText('长按识别·立即体验', (winWidth/4) + 80, (winHeight - uni.upx2px(250)))
		context.draw(false, () => {
			poster.createPoster(canvasId, winWidth, winHeight, (res) => {
				callback && callback(res)
			})
		})
	},
	/**
	 *绘制商品海报 
	 * @param canvasId 
	 * @param winWidth 宽度
	 * @param winHeight 高度
	 * @param imgs 主图以及二维码图
	 *  格式 {mainPic: mainPic,qrcode: qrcode}
	 * @param text 商品名称
	 * @param price 价格 格式 12.00，10.50
	 * @param originalPrice 原价 格式 12.00，10.50
	 * @param name 程序名称
	 **/
	drawGoodsPoster(canvasId, winWidth, winHeight, imgs, text, price, originalPrice, name, callback) {
		let scaleRatio = 2
		//获取绘图上下文 context
		let context = uni.createCanvasContext(canvasId)
		// 海报背景
		const grd = context.createLinearGradient(0, winWidth, winHeight, 0)
		grd.addColorStop(0, '#FFFFFF')
		grd.addColorStop(1, '#FFFFFF')
		// Fill with gradient
		context.setFillStyle(grd);
		context.fillRect(0, 0, winWidth, winHeight);
		// 主图
		let width = uni.upx2px(500 * scaleRatio),
			height = uni.upx2px(500 * scaleRatio);
		context.drawImage(imgs.mainPic, (winWidth - width) / 2, uni.upx2px(30 * scaleRatio), width, height)

		let a = uni.upx2px(40 * scaleRatio) //定义行高
		context.setFontSize(uni.upx2px(30 * scaleRatio))
		context.setFillStyle("#343434")
		let w = uni.upx2px(468 * scaleRatio)
		//名称很长调用方法将文字折行，传参 文字内容text，画布context
		let row = poster.wrapText(text, Math.floor(w), context, 2)
		for (let i = 0; i < row.length; i++) {
			context.fillText(row[i], uni.upx2px(30 * scaleRatio), uni.upx2px(580 * scaleRatio) + a * i)
		}
		context.setFillStyle("#EB0909")
		context.setFontSize(uni.upx2px(26 * scaleRatio))
		context.fillText('￥', uni.upx2px(30 * scaleRatio), uni.upx2px(680 * scaleRatio))
		context.setFontSize(uni.upx2px(36 * scaleRatio))
		let priceArr = Number(price).toFixed(2).toString().split('.')
		context.fillText(priceArr[0], uni.upx2px(56 * scaleRatio), uni.upx2px(680 * scaleRatio))
		let w1 = poster.getTextWidth(priceArr[0], context) || 35
		context.setFontSize(uni.upx2px(26 * scaleRatio))
		context.setFillStyle("#EB0909")
		context.fillText(`.${priceArr[1]}`, uni.upx2px(60 * scaleRatio) + w1, uni.upx2px(680 * scaleRatio))
		context.setFillStyle("#999999")
		context.setFontSize(uni.upx2px(24 * scaleRatio))
		let w2 = uni.upx2px(76 * scaleRatio) + w1 + (poster.getTextWidth(`.${priceArr[1]}`, context) || 32)
		context.fillText(`￥${originalPrice}`, w2, uni.upx2px(680 * scaleRatio))
		context.moveTo(w2, uni.upx2px(672 * scaleRatio))
		context.lineTo((w2 + 50 * scaleRatio), uni.upx2px(672 * scaleRatio))
		context.setStrokeStyle('#999999')
		context.stroke(); //对当前路径进行描边
		// 识别小程序二维码 
		let x = winWidth - uni.upx2px(46 + 130) * scaleRatio;
		context.drawImage(imgs.qrcode, x, uni.upx2px(735 * scaleRatio), uni.upx2px(130 * scaleRatio), uni.upx2px(130 *
			scaleRatio))
		context.setFillStyle("#333")
		context.setFontSize(uni.upx2px(32 * scaleRatio))
		context.fillText(name, uni.upx2px(40 * scaleRatio), uni.upx2px(780 * scaleRatio))
		context.setFontSize(uni.upx2px(24 * scaleRatio))
		context.fillText('长按识别·立即体验', uni.upx2px(40 * scaleRatio), uni.upx2px(835 * scaleRatio))
		context.draw(false, () => {
			poster.createPoster(canvasId, winWidth, winHeight, (res) => {
				callback && callback(res)
			})
		})
	},
	//生成海报图片(分享所需图片)
	createPoster(canvasId, winWidth, winHeight, callback) {
		var that = this;
		// let scaleRatio= uni.getSystemInfoSync().scaleRatio
		uni.canvasToTempFilePath({
			x: 0,
			y: 0,
			// width: winWidth * scaleRatio,
			// height: Math.round(winHeight * scaleRatio),
			// destWidth: winWidth * scaleRatio,
			// destHeight: Math.round(winHeight) * scaleRatio,
			canvasId: canvasId,
			fileType: 'png',
			quality: 1,
			success: function(res) {
				callback && callback(res.tempFilePath)
			},
			fail() {
				callback && callback(false)
			}
		})
	},
	// 将海报图片保存到本地
	saveImage(file) {
		uni.saveImageToPhotosAlbum({
			filePath: file,
			success(res) {
				uni.showToast({
					title: '图片保存成功'
				})
			}
		})
	},
	//获取文本宽度(请先查看支持平台，App 端 2.8.12+ 支持)
	getTextWidth(text, context) {
		const metrics = context.measureText(text)
		return metrics.width || 0
	},
	//图片转成本地文件[同步执行]
	async getImage(url) {
		return await new Promise((resolve, reject) => {
			uni.downloadFile({
				url: url,
				success: res => {
					resolve(res.tempFilePath);
				},
				fail: res => {
					reject(false)
				}
			})
		})
	},
	//canvas多文字换行
	wrapText(text, width, context, rows = 2) {
		let txtArr = text.split('')
		let temp = ''
		let row = []
		for (let i = 0, len = txtArr.length; i < len; i++) {
			if (context.measureText(temp).width < width) {
				temp += txtArr[i]
			} else {
				i--
				row.push(temp)
				temp = ''
			}
		}
		row.push(temp)
		if (row.length > rows) {
			let rowCut = row.slice(0, rows);
			let rowPart = rowCut[rows - 1];
			let test = "";
			let empty = [];
			for (let j = 0, length = rowPart.length; j < length; j++) {
				if (context.measureText(test).width < width - 20) {
					test += rowPart[j];
				} else {
					break;
				}
			}
			empty.push(test);
			let group = empty[0] + "...";
			rowCut.splice(rows - 1, 1, group);
			row = rowCut;
		}
		return row
	},
	//删除已缓存文件，防止超出存储空间大小限制[同步执行]
	async removeSavedFile() {
		//使用前请先查看支持平台（其他方案：也可以先渲染出图片，当图片加载完成时执行相关方法）
		let count = 0;
		return await new Promise((resolve, reject) => {
			uni.getSavedFileList({
				success(res) {
					console.log(res)
					count = res.fileList.length;
					if (count > 0) {
						let num = 0;
						let list = res.fileList || []
						list.forEach(item => {
							console.log("执行删除文件。。。")
							uni.removeSavedFile({
								filePath: item.filePath,
								complete(res) {
									num++;
									if (num === count) {
										resolve(true)
									}
								}
							})
						})
					} else {
						resolve(true)
					}
				},
				fail() {
					reject(false)
					console.log("执行删除文件失败")
				}
			})
		})
	},
	//当服务器端返回图片base64时,转成本地文件[同步执行]
	async getImagebyBase64(base64) {
		//使用前先查看支持平台
		// #ifdef MP-WEIXIN
		return await new Promise((resolve, reject) => {
			const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
			let arrayBuffer = wx.base64ToArrayBuffer(bodyData)
			//getuuid：注意这里名称需要动态生成（名称相同部分机型会出现写入失败，显示的是上次生成的图片）
			const filePath = `${wx.env.USER_DATA_PATH}/${poster.getuuid()}.${format}`;
			wx.getFileSystemManager().writeFile({
				filePath,
				data: arrayBuffer,
				encoding: 'binary',
				success() {
					resolve(filePath);
				},
				fail() {
					reject(false)
				}
			})
		})
		// #endif
	},
	getuuid() {
		let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
		});
		return uuid;
	}
}

module.exports = {
	drawPoster: poster.drawPoster,
	drawGoodsPoster: poster.drawGoodsPoster,
	getImage: poster.getImage,
	removeSavedFile: poster.removeSavedFile,
	getImagebyBase64: poster.getImagebyBase64,
	saveImage: poster.saveImage
};
