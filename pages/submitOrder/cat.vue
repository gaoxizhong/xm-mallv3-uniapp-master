<template>
	<view class="container">
		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-into-view="scrollViewId"
			:style="{ height: height + 'px', top: top + 'px' }">
			<view :id="`id_${index}`" v-for="(item, index) in Category" :key="item.id" class="tab-bar-item"
				:class="[currentTab == index ? 'active' : '']" :data-current="index"
				@tap.stop="swichNav(item.id,index)">
				<text>{{ item.title }}</text>
			</view>
		</scroll-view>

		<scroll-view @scrolltolower="tolower" scroll-y class="right-box" :scroll-into-view="floorNum"
			:style="{ height: height + 'px', top: top + 'px' }">
			<view class="page-view">
				<view class="class-box">
					<view class="class-item" :id="'b'+item.id" v-if="Category.length>0"
						v-for="(item, index) in Category" :key="index">
						<view class="class-name" @tap.stop="gogoodsList" :data-cid="item.id" :data-key="item.title">
							{{ item.title }}</view>
						<view class="g-container">
							<view class="g-box" v-for="(son, i1) in item.son" :key="i1" @tap.stop="gogoodsList"
								:data-cid="son.id" :data-key="son.title">
								<image :src="son.icon" class="g-image" />
								<view class="g-title">{{ son.title }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view :style='"height:"+(height-300)+"rpx;"' v-if="number<15"></view>
		</scroll-view>
		<tui-tabbar :current="current">
		</tui-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '',
				banners: [],
				Category: [],
				categoryId: "",
				goodsList: [],
				page: 1,
				getSon: [],
				height: 0, //scroll-view高度
				top: 0,
				currentTab: 0, //预设当前项的值
				floorNum: '',
				number: "",
				scrollViewId: "id_0"
			};
		},
		onLoad: function(options) {
			let _this = this
			this.current = "/" + this.__route__;
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						let header = 0;
						let top = 0;
						console.log(res.windowHeight);
						this.height = res.windowHeight - uni.upx2px(header);
						this.top = top + uni.upx2px(header);
					}
				});
			}, 50);
			this.getCategoryall();
		},
		onShow() {

		},
		methods: {
			// 点击标题切换当前页时改变样式
			swichNav: function(Categoryid, e) {
				let cur = e;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.checkCor();
				}

				this.floorNum = 'b' + Categoryid;
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				if (this.currentTab > 6) {
					this.scrollViewId = `id_${this.currentTab - 2}`;
				} else {
					this.scrollViewId = `id_0`;
				}
			},
			gogoodsList(e) {
				let key = e.currentTarget.dataset.key;
				let cid = e.currentTarget.dataset.cid;
				uni.setStorageSync('cat_id', cid);
				uni.setStorageSync('cat_name', key);
				uni.navigateBack({});
			},
			getCategoryall: function() {
				let _this = this;
				this.$request.get('Category.all', {
					ptype: 2
				}).then(res => {
					if (res.errno == 0) {
						_this.Category = res.data;
						_this.categoryId = _this.Category[0].id;
						setTimeout(function() {
							_this.infoScroll();
						}, 500)
						console.info("services---request---getsonList--右侧二级三级分类成功")
					}
				})
			},
			infoScroll: function() {
				let _this = this;
				let len = _this.Category.length;
				if (_this.Category[len - 1].son) {
					this.number = _this.Category[len - 1].son.length;
				}
			}
		}
	};
</script>

<style>
	page {
		background: #fcfcfc;
	}

	/* 左侧导航布局 start*/

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tab-view {
		/* height: 100%; */
		background: #f6f6f6;
		width: 200rpx;
		position: fixed;
		left: 0;
		z-index: 10;
	}

	.tab-bar-item {
		width: 200rpx;
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
	}

	.active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fcfcfc;
	}

	.active::before {
		content: '';
		position: absolute;
		border-left: 8rpx solid #e41f19;
		height: 30rpx;
		left: 0;
	}

	/* 左侧导航布局 end*/

	.right-box {
		width: 100%;
		position: fixed;
		padding-left: 220rpx;
		box-sizing: border-box;
		left: 0;
	}

	.page-view {
		width: 100%;
		overflow: hidden;
		padding-top: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.class-box {
		padding-top: 10rpx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 12rpx;
	}

	.class-name {
		font-size: 22rpx;
	}

	.g-container {
		/* padding-top: 20rpx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 33.3333%;
		text-align: center;
		padding-top: 40rpx;
	}

	.g-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
	}

	.g-title {
		font-size: 22rpx;
	}

	.goods-item {
		width: 96%;
		height: 150rpx;
		display: flex;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 12px;
		padding-bottom: 12px;
		flex-direction: row;
		margin-left: 20rpx;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 1rpx dotted #f2f2f2;
	}

	.goods-pic {
		width: 80px;
		height: 80px;
		flex-shrink: 0;
	}

	.goods-info {
		display: flex;
		flex-direction: column;
		padding: 6px 5px 0px 5px;
		height: 70px;
		font-size: 24rpx;
		justify-content: space-between;
	}
</style>
