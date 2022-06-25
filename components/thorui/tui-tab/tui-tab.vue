<template>
	<scroll-view class="tui-scroll__view" :class="[isFixed && !isSticky?'tui-tabs__fixed':'',isSticky?'tui-tabs__sticky':'']"
	 :style="{height: height+'rpx',background:backgroundColor,top: isFixed || isSticky ? top + 'px' : 'auto',zIndex:isFixed || isSticky?zIndex:'auto'}"
	 :scroll-x="scrolling" :scroll-with-animation="scrolling" :scroll-left="scrollLeft">
		<view class="tui-tabs__wrap">
			<view class="tui-tabs__list" :class="[scroll ? 'tui-tabs__scroll' : '']" :style="{height: height+'rpx'}">
				<view class="tui-tabs__item" :style="{height: height+'rpx'}" v-for="(item,index) in tabs" :key="index" @tap="handleClick"
				 :data-index="index">
					<view class="tui-item__child" :style="{	color: currentTab == index ? selectedColor : color,fontSize: size + 'rpx',lineHeight: size + 'rpx',fontWeight: bold && currentTab == index ? 'bold' : 'normal'}">{{item}}</view>
				</view>
				<view class="tui-tabs__line" :class="[needTransition ? 'tui-transition' : '']" :style="{background: sliderBgColor,height:sliderHeight,borderRadius: sliderRadius,bottom: bottom,width: lineWidth+'px',transform: `translateX(${translateX}px)`}"></view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'tuiTab',
		options: {
			virtualHost: true
		},
		props: {
			// 标签页数据源
			tabs: {
				type: Array,
				default () {
					return []
				}
			},
			// 当前选项卡
			current: {
				type: Number,
				default: 0
			},
			// 是否可以滚动
			scroll: {
				type: Boolean,
				default: false
			},
			// tab高度 rpx
			height: {
				type: Number,
				default: 80
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			//字体大小
			size: {
				type: Number,
				default: 28
			},
			//字体颜色
			color: {
				type: String,
				default: '#666'
			},
			//选中后字体颜色
			selectedColor: {
				type: String,
				default: '#5677fc'
			},
			//选中后 是否加粗 ，未选中则无效
			bold: {
				type: Boolean,
				default: false
			},
			//滑块高度
			sliderHeight: {
				type: String,
				default: '2px'
			},
			//滑块背景颜色
			sliderBgColor: {
				type: String,
				default: '#5677fc'
			},
			//滑块 radius
			sliderRadius: {
				type: String,
				default: '2px'
			},
			//滑块bottom
			bottom: {
				type: String,
				default: '0'
			},
			//是否固定
			isFixed: {
				type: Boolean,
				default: false
			},
			//吸顶效果，为true时isFixed失效
			isSticky: {
				type: Boolean,
				default: false
			},
			//isFixed=true时，tab top值 px
			top: {
				type: Number,
				// #ifndef H5
				default: 0,
				// #endif
				// #ifdef H5
				default: 44
				// #endif
			},
			zIndex: {
				type: [Number, String],
				default: 996
			}
		},
		watch: {
			/**
			 * 监听数据变化, 如果改变重新初始化参数
			 */
			tabs(newVal, oldVal) {
				this.scrolling = false
				// 异步加载数据时候, 延迟执行 init 方法, 防止无法正确获取 dom 信息
				setTimeout(() => this.init(), 0);
			},
			/**
			 *  监听 currentTab 变化, 做对应处理
			 */
			current(newVal, oldVal) {
				this.scrollByIndex(newVal);
			}
		},
		created() {
			this.currentTab = this.current;
		},
		mounted() {
			this.init()
		},
		data() {
			return {
				/* 未渲染数据 */
				windowWidth: 0, // 屏幕宽度
				tabItems: [], // 所有 tab 节点信息

				/* 渲染数据 */
				scrolling: true, // 控制 scroll-view 滚动以在异步加载数据的时候能正确获得 dom 信息
				needTransition: false, // 下划线是否需要过渡动画
				translateX: 0, // 下划 line 的左边距离
				lineWidth: 0, // 下划 line 宽度
				scrollLeft: 0, // scroll-view 左边滚动距离
				currentTab: 0
			};
		},
		methods: {
			/**
			 * 切换菜单
			 */
			handleClick(e) {
				let index = Number(e.currentTarget.dataset.index)
				this.$emit('change', {
					index: index
				});
				this.scrollByIndex(index);
			},
			/**
			 * 滑动到指定位置
			 * @param tabCur: 当前激活的tabItem的索引
			 * @param needTransition: 下划线是否需要过渡动画, 第一次进来应设置为false
			 */
			scrollByIndex(tabCur, needTransition = true) {
				let item = this.tabItems[tabCur];
				if (!item) return;
				let itemWidth = item.width || 0,
					itemLeft = item.left || 0;
				this.needTransition = needTransition;
				this.currentTab = tabCur;
				// 超出滚动的情况
				if (this.scroll) {
					// 保持滚动后当前 item '尽可能' 在屏幕中间
					let scrollLeft = itemLeft - (this.windowWidth - itemWidth) / 2;
					this.scrollLeft = scrollLeft;
					this.translateX = itemLeft;
					this.lineWidth = itemWidth
				} else {
					// 不超出滚动的情况
					this.translateX = itemLeft;
					this.lineWidth = itemWidth
				}
			},
			/**
			 *  初始化函数
			 */
			init() {
				const {
					windowWidth
				} = uni.getSystemInfoSync();
				this.windowWidth = windowWidth || 375
				const query = uni.createSelectorQuery().in(this);
				query.selectAll(".tui-item__child").boundingClientRect((res) => {
					this.scrolling = true;
					this.tabItems = res;
					this.scrollByIndex(this.currentTab, false);
				}).exec();
			}
		}
	};
</script>

<style scoped>
	.tui-scroll__view {
		width: 100%;
		height: 80rpx;
		overflow: hidden;
	}

	.tui-tabs__fixed {
		position: fixed;
		left: 0;
	}

	.tui-tabs__sticky {
		position: sticky;
		left: 0;
	}

	.tui-tabs__wrap {
		padding-bottom: 20rpx;
	}

	.tui-tabs__list {
		position: relative;
		height: 80rpx;
		display: flex;
	}

	.tui-tabs__scroll {
		white-space: nowrap !important;
		display: block !important;
	}

	.tui-tabs__scroll .tui-tabs__item {
		padding: 0 30rpx;
		display: inline-flex;
	}

	.tui-tabs__scroll .tui-item__child {
		display: block !important;
	}

	.tui-tabs__item {
		flex: 1;
		text-align: center;
		padding: 0 10rpx;
		box-sizing: border-box;
		transition: color 0.3s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-item__child {
		display: inline-block;
	}

	.tui-tabs__line {
		position: absolute;
		left: 0;
		width: 0;
		display: inline-block;
	}

	.tui-tabs__line.tui-transition {
		transition: width 0.3s, transform 0.3s;
	}
</style>
