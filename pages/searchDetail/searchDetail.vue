<template>
	<view>
		<view class="search-top">
			<input type="text" v-model="keyword" placeholder="请输入要搜索的服务" @confirm="navTo" />
		</view>
		<view class="result-list">
			<navigator url="" class="result-item" hover-class="none">
				<image src="" mode="" class="left-img" mode="aspectFit"></image>
				<view class="right-info">
					<view class="title">
						新居开荒清洁
					</view>
					<view class="sale">
						月销288
					</view>
					<view class="price">
						<text>券后<text class="money">288</text>元</text>
						<text class="que-tag">立减20</text>
					</view>
				</view>
			</navigator>
			<navigator url="" class="result-item" hover-class="none">
				<image src="" mode="" class="left-img" mode="aspectFit"></image>
				<view class="right-info">
					<view class="title">
						新居开荒清洁
					</view>
					<view class="sale">
						月销288
					</view>
					<view class="price">
						<text><text class="money">288</text>元/小时起</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'清洁'
			}
		},
		methods: {
			navTo(){
				
			}
		}
	}
</script>

<style>
page{
	background-color: #F5F5F5;
}
.search-top{
	padding: 30rpx;
	background-color: #fff;
	margin-bottom: 30rpx;
}
.search-top input{
	width: 100%;
	box-sizing: border-box;
	border-radius: 40px;
	background-color: #F5F5F5;
	height: 68rpx;
	line-height: 68rpx;
	padding: 0 20rpx;
}
.search-content{
	background: #fff;
	padding: 60rpx 35rpx;
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
	background-color: #000000;
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
