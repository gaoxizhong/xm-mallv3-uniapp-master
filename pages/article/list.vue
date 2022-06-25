<template>
	<view class="container">
		<view class="dataList">
			<scroll-view class="navscroll" scroll-y="true">
				<view class="nav acea-row row-middle">
					<block v-for="(item, index) in cateList" :key="index">
						<view :class="'item ' + (cid==item.id ? 'font-color':'')" @tap="set_where"
							:data-cid="item.id">{{item.title}}</view>
					</block>
				</view>
			</scroll-view>
			<view class="list acea-row row-between-wrapper on">
				<navigator v-for="(item, index) in dataList" :key="index" class="item on"
					hover-class="none" :url="'/pages/article/detail?id=' + item.id">
					<view class="text on">
						<view class="name line1">{{item.title}}</view>
					</view>
				</navigator>
				<view class="loadingicon acea-row row-center-wrapper" v-if="dataList.length > 0">
					<text class="loading iconfont icon-jiazai" :hidden="loading==false"></text>
				</view>
			</view>
		</view>
		<tui-tabbar :current="current">
		</tui-tabbar>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				current: '',
				cateList: [],
				dataList: [],
				navH: "",
				where: {
					cid: 0,
					keyword: '',
					priceOrder: '',
					salesOrder: '',
					news: 0,
					page: 1,
					limit: 10,
					cid: 0
				},
				price: 0,
				stock: 0,
				nows: false,
				loadend: false,
				loading: false,
				bottommenulist: [],
				inputShowed: "",
				host_product: "",
				title: "",
				cid: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.cid = options.cid || ''
			const _this = this; //位置授权
			this.current = "/" + this.__route__;
			this.get_cate_list();
			this.get_data_list();
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			
			this.where.page = 1;
			this.loadend = false;
			this.dataList = [];
			this.get_data_list();
			uni.stopPullDownRefresh();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.get_data_list();
		},
		methods: {
			//点击事件处理
			set_where: function(e) {
				var dataset = e.target.dataset;
				this.cid = dataset.cid;
				this.loadend = false;
				this.where.page = 1;
				
				this.get_data_list(true);
			},
			//设置where条件
			setWhere: function() {
				this.where.salesOrder = 'asc';

				if (this.cid) {
					this.where.cid = this.cid;
				}
			},
			get_cate_list: function() {
				var that = this;

				that.$request.get('articlecategory.list').then(res => {
					var cateList = res.data;
					that.cateList = cateList;
				});
			},
			//查找店铺
			get_data_list: function(isPage) {
				var that = this;
				this.setWhere();
				if (that.loadend) return;
				if (that.loading) return;
				if (isPage === true) 
				{
					that.dataList = [];
				}

				//console.log(that.where);
				that.$request.post('article.list', that.where).then(res => {
					var dataList = res.data;
					var loadend = dataList.length < that.where.limit;
					that.where.page = that.where.page + 1;
					that.loadend = loadend;
					that.loading = false;
					that.dataList = dataList;
				});
			}
		}
	};
</script>
<style>
	page {
		font-size: 28rpx;
		background-color: #f5f5f5;
		color: #333;
	}

	.dataList .search {
		width: 100%;
		height: 86rpx;
		padding-left: 23rpx;
		box-sizing: border-box;
		position: fixed;
		display: flex;
		left: 0;
	}

	.dataList .bg-color {
		background-color: #e41f19;
	}

	.dataList .search .input {
		flex: 1;
		display: flex;
		width: 570rpx;
		height: 60rpx;
		background-color: #fff;
		border-radius: 50rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.dataList .search .input input {
		width: 478rpx;
		height: 100%;
		font-size: 26rpx;
	}

	.dataList .search .input .placeholder {
		color: #999;
	}

	.dataList .search .input .iconfont {
		font-size: 35rpx;
		color: #555;
	}

	.dataList .search .icon-pailie,
	.dataList .search .icon-tupianpailie {
		color: #fff;
		width: 62rpx;
		font-size: 40rpx;
		height: 86rpx;
		line-height: 86rpx;
	}

	.navscroll {
		height: 86rpx;
		position: fixed;
		display: flex;
		white-space: nowrap;
		left: 0;
	}

	.dataList .nav {
		width: 1000rpx;
		display: flex;
		color: #454545;
		font-size: 28rpx;
		background-color: #fff;
	}

	.dataList .nav .item {
		text-align: center;
		height: 100%;
		margin: 25rpx;
	}

	.dataList .nav .item.font-color {
		font-weight: bold;
	}

	.dataList .nav .item image {
		width: 15rpx;
		height: 19rpx;
		margin-left: 10rpx;
	}

	.dataList .list {
		padding: 0 20rpx;
		padding-top: 80rpx;
		margin-top: 6rpx;
	}

	.dataList .list.on {
		background-color: #fff;
		border-top: 1px solid #f6f6f6;
	}

	.dataList .list .item {
		width: 345rpx;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.dataList .list .item.on {
		width: 100%;
		display: flex;
		border-bottom: 1rpx solid #f6f6f6;
		padding: 30rpx 0;
		margin: 0;
	}

	.dataList .list .item .pictrue {
		width: 100%;
		height: 345rpx;
	}

	.dataList .list .item .pictrue.on {
		width: 180rpx;
		height: 180rpx;
	}

	.dataList .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx 10rpx 0 0;
	}

	.dataList .list .item .pictrue image.on {
		border-radius: 6rpx;
	}

	.dataList .list .item .text {
		padding: 20rpx 17rpx 26rpx 17rpx;
		font-size: 28rpx;
		color: #373333;
	}

	.dataList .list .item .text.on {
		width: 508rpx;
		padding: 0 0 0 22rpx;
	}

	.dataList .list .item .text .money {
		font-size: 23rpx;
		margin-top: 8rpx;
	}

	.dataList .list .item .text .money.on {
		margin-top: 50rpx;
	}

	.dataList .list .item .text .money .num {
		font-size: 32rpx;
	}

	.dataList .list .item .text .vip {
		font-size: 22rpx;
		color: #aaa;
		margin-top: 7rpx;
	}

	.dataList .list .item .text .vip.on {
		margin-top: 12rpx;
	}

	.dataList .list .item .text .vip .vip-money {
		font-size: 24rpx;
		color: #282828;
		font-weight: bold;
	}

	.dataList .list .item .text .vip .vip-money image {
		width: 46rpx;
		height: 21rpx;
		margin-left: 4rpx;
	}

	.noCommodity {
		background-color: #fff;
	}

	.store-star {
		margin-top: 10rpx;
	}

	.store-star image {
		width: 28rpx;
		height: 28rpx;
	}
</style>
