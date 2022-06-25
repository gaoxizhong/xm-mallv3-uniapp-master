<template>
	<view class="container">
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<icon type="search" :size='13' color='#333'></icon>
				<input confirm-type="search" @confirm="tosearch" placeholder="关键词" :focus="true" auto-focus
					placeholder-class="tui-input-plholder" class="tui-input" v-model.trim="key" @input="inputKey" />
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
			</view>
		</view>

		<view class="tui-search-history" v-show="history.length>0 && !key">
			<view class="tui-history-header">
				<view class="tui-search-title">搜索推荐</view>
			</view>
			<view class="tui-history-content">
				<block v-for="(item,index) in history" :key="index">
					<tui-tag @tap="tohotkey(item)" margin="0 24rpx 24rpx 0" type="gray" shape="circle">{{item}}</tui-tag>
				</block>
			</view>
		</view>
		<view v-show="key">
			<view class="tui-result-box">
				<view class="result-list">
					<block v-for="(item,index) in searchList" :key="index">						
						<navigator :url="'/pages/goodsDetail/goodsDetail?id=' + item.id" class="result-item" hover-class="none">
							<image :src="item.image" mode="" class="left-img" mode="aspectFit"></image>
							<view class="right-info">
								<view class="title">
									{{item.name}}
								</view>
								<view class="sale">
									月销{{item.sale_count}}
								</view>
								<view class="price">
									<text>￥<text class="money">{{item.price}}</text>元</text>
									<!--<text class="que-tag">立减20</text>-->
								</view>
							</view>
						</navigator>
					</block>
					
					
				</view>
			</view>
		</view>
		<tui-actionsheet :show="showActionSheet" :tips="tips" @click="itemClick" @cancel="closeActionSheet">
		</tui-actionsheet>
	</view>

</template>

<script>
	const util = require("@/utils/util.js")
	export default {
		data() {
			return {
				history: ['日常保洁','搬家','深度保洁','开锁','家电维修','开荒保洁','电脑维修','擦玻璃','管道疏通'],
				key: "",
				showActionSheet: false,
				tips: "确认清空搜索历史吗？",
				searchList: []
			}
		},
		methods: {
			back: function() {
				uni.navigateBack();
			},
			cleanKey: function() {
				this.key = ''
			},
			closeActionSheet: function() {
				this.showActionSheet = false
			},
			itemClick: function(e) {
				let index = e.index;
				if (index == 0) {
					this.showActionSheet = false;
					this.history = []
				}
			},
			inputKey: function(e) {
				var that = this;
				this.key = util.trim(e.detail.value);
				if (!this.key) {
					this.searchList = [];
					return;
				}
				
				this.$request.post('goods', {keyword:this.key}).then(res => {
					if (res.errno == 0) {
						that.searchList = res.data.data;				
					}
				})
				
			},
			
			tohotkey: function(key) {
				uni.navigateTo({
					url: '/pages/goodsList/goodsList?keyword=' + key
				});
			},
			tosearch: function(event) {
				var inputvalus = event.target.value;
				if (inputvalus != '') {
					uni.navigateTo({
						url: '/pages/goodsList/goodsList?keyword=' + inputvalus
					});
				} else {
					uni.showToast({
						title: "请输入搜索内容！",
						duration: 1000,
						icon: 'none'
					});
				}
			},
		}
	}
</script>

<style>
	page {
		color: #333;
		background: #fff;
	}

	.container {
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-searchbox {
		padding: 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-search-input {
		width: 100%;
		height: 66rpx;
		border-radius: 35rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f2f2f2;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16rpx;
		font-size: 28rpx;
	}

	.tui-input-plholder {
		font-size: 28rpx;
		color: #b2b2b2;
	}

	.tui-cancle {
		color: #888;
		font-size: 28rpx;
		padding-left: 30rpx;
		flex-shrink: 0;
	}

	.tui-history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
	}

	.tui-history-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.tui-icon-delete {
		padding: 10rpx;
	}

	.tui-search-title {
		font-size: 28rpx;
		font-weight: bold;
	}

	.tui-hot-header {
		padding: 30rpx 0;
	}

	.tui-noboredr {
		border-left: 0 !important;
	}

	.tui-result-box {
		font-size: 28rpx;
	}

	.tui-result-item {
		line-height: 28rpx;
		padding: 28rpx 0;
	}
	
	.result-list{
		margin: 0 30rpx;
	}
	.result-list .result-item{
		background-color: #fff;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
	}
	.result-list .result-item .left-img{
		width: 260rpx;
		height: 186rpx;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}
	.result-list .result-item .right-info{
		width: 380rpx;
	}
	.result-list .result-item .title{
		font-size: 32rpx;
		font-weight: bold;
	    margin-bottom:60rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.result-list .result-item .sale{
		color: #999999;
		font-size: 24rpx;
	}
	.result-list .result-item .price{
		color:#FF3851;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}
	.result-list .result-item .money{
		font-size: 36rpx;
		font-weight: bold;
	}
	.result-list .result-item .que-tag{
		display: inline-block;
		border-radius: 2rpx;
		height: 32rpx;
		line-height: 32rpx;
		border: 1px solid #FF3851;
		padding: 0 10rpx;
		margin-left: 10rpx;
	}
</style>
