<template>
	<view class="container">
		<tui-tabs :tabs="statusType" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#E41F19"
			sliderBgColor="#E41F19" @change="statusTap" itemWidth="50%"></tui-tabs>
		<!--选项卡逻辑自己实现即可，此处未做处理-->
		<view :class="{'tui-order-list':scrollTop>=0}">
			<view class="tui-order-item" v-for="(item,Index) in datalist" :key="Index">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>{{item.nickname}}</view>
						<view class="tui-order-status">{{ item.regdate }}</view>
					</view>
				</tui-list-cell>

			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fafafa"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusType: [{
					name: "一级",
					num: 0,
				}, {
					name: "二级",
					num: 0,
				}],
				currentType: 0,
				currentTab: 0,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0,
				number1: 0,
				number2: 0,
				members: [],
				datalist: []
			}
		},
		onLoad: function(e) {
			let _this = this
		},
		onShow: function(e) {
			this.getteam();
		},
		methods: {
			statusTap: function(e) {
				this.currentTab = e.index
				this.currentType = this.statusType[this.currentTab].id;

				if (this.currentTab == 0) {
					this.datalist = this.members.first;
				} else {
					this.datalist = this.members.second;
				}
			},
			getteam: function() {
				const _this = this
				_this.$request.post('member.team').then(res => {
					if (res.errno == 0) {						
						_this.statusType[0].num = res.data.first.length;
						_this.statusType[1].num = res.data.second.length;
						_this.members = res.data
						_this.datalist = _this.members.first;
					}
				})
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200);
		},
		onReachBottom() {
			//只是测试效果，逻辑以实际数据为准
			this.loadding = true
			this.pullUpOn = true
			setTimeout(() => {
				this.loadding = false
				this.pullUpOn = false
			}, 1000)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-status {
		color: #888;
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
</style>
