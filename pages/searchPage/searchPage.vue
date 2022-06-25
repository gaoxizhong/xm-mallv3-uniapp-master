<template>
	<view>
		<view class="search-top">
			<input type="text" v-model="keyword" placeholder="请输入要搜索的服务" @confirm="navTo" />
		</view>
		
		<view class="search-content">
			<view class="title">
				搜索推荐
			</view>
			<view class="keyword-list">
				<text class="keyword-text" @click="goSearch()" v-for="(item,index) in keywordList" :key="index">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				keywordList:["日常保洁","搬家","深度保洁","电脑维修"]
			}
		},
		methods: {
			// 关键词点击
			goSearch(){
				
			},
			// 搜索事件
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
.search-content .title{
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
}
.keyword-list .keyword-text{
	display: inline-block;
	font-size: 30rpx;
	padding: 0 40rpx;
	border-radius: 10rpx;
	background-color: #FFFFFF;
	border: 1px solid #E5E5E5;
	height: 80rpx;
	line-height: 80rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}
</style>
