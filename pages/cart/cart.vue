<template>
	<view class="container">
		<view class="no-goods" v-if="goodsList.list.length<1">
			<view class="title-box">
				购物车空空如也～
			</view>
			<view class="to-index-btn" @tap="toIndexPage">
				去逛逛
			</view>
		</view>
		<view v-if="goodsList.list.length>0">
			<!-- #ifdef MP || H5-->
			<view class="tui-edit-goods">
				<view>购物车商品</view>
				<view>
					<tui-button v-if="goodsList.saveHidden" type="gray" :plain="true" shape="circle" width="160rpx"
						height="60rpx" :size="24" @click="editTap">编辑商品</tui-button>
					<tui-button v-if="!goodsList.saveHidden" type="gray" :plain="true" shape="circle" width="160rpx"
						height="60rpx" :size="24" @click="saveTap">完成</tui-button>
				</view>
			</view>
			<!-- #endif -->
			<checkbox-group @change="selectChange">
				<view class="tui-cart-cell  tui-mtop" v-for="(item,index) in goodsList.list" :key="index">
					<tui-swipe-action :actions="actions" @click="delItem" :params="item">
						<template v-slot:content>
							<view class="tui-goods-item">
								<label class="tui-checkbox">
									<checkbox :value="item.id" :data-id="index" :checked="item.active"
										color="#fff"></checkbox>
								</label>
								<image :src="item.pic" class="tui-goods-img" />
								<view class="tui-goods-info">
									<view class="tui-goods-title">
										{{item.name}}
									</view>
									<view class="tui-goods-model" v-if="item.label">
										<view class="tui-model-text">{{item.label}}</view>
										<tui-icon name="arrowdown" :size="16" color="#333"></tui-icon>
									</view>
									<view class="tui-price-box">
										<view class="tui-goods-price">￥{{item.price}}</view>
										<tui-numberbox :value="item.number" :height="36" :width="64" :min="1"
											:index="item.cart_id" @change="changeNum"></tui-numberbox>
									</view>
								</view>
							</view>
						</template>
					</tui-swipe-action>
				</view>
			</checkbox-group>

			<!--tabbar-->
			<view class="settlement">
				<view class="tui-checkAll">
					<checkbox-group @change="bindAllSelect">
						<label class="tui-checkbox">
							<checkbox :checked="goodsList.allSelect" color="#fff"></checkbox>
							<text class="tui-checkbox-pl">全选</text>
						</label>
					</checkbox-group>
					<view class="tui-total-price" v-if="!goodsList.noSelect">合计:<text
							class="tui-bold">￥{{goodsList.totalPrice}}</text>
					</view>
				</view>
				<view>
					<tui-button :disabled="goodsList.noSelect" width="200rpx" height="70rpx" :size="30" type="danger"
						shape="circle" v-if="goodsList.saveHidden" @click="toPayOrder">去结算({{goodsList.number}})
					</tui-button>
					<tui-button @click="deleteSelected" :disabled="goodsList.noSelect" width="200rpx" height="70rpx"
						:size="30" type="danger" shape="circle" :plain="true" v-else>
						删除</tui-button>
				</view>
			</view>
		</view>

		<!--猜你喜欢-->
		<tui-divider :size="28" :bold="true" color="#333" width="50%">
			<tui-icon name="like" :size="18" color="#e41f19"></tui-icon>
			<text class="tui-youlike">猜你喜欢</text>
		</tui-divider>
		<view class="tui-product-list">
			<view class="tui-product-container">
				<block v-for="(item, index) in recommendgoods" :key="index">
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150"
						@tap="navigateTo('/pages/goodsDetail/goodsDetail?id='+item.id)">
						<image :src="item.pic" class="tui-pro-img" mode="widthFix" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit">{{ item.name }}</view>
							<view>
								<view class="tui-pro-price">
									<text v-if="item.is_points_goods==1" class="tui-sale-price">积分:{{ item.pay_points }}</text>
									<text v-if="item.is_points_goods!=1" class="tui-sale-price">￥{{ item.price }}</text>
									<text v-if="item.costs>0" class="tui-factory-price">￥{{ item.costs }}</text>
								</view>
								<view class="tui-pro-pay">{{ item.sale_count }}人付款</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<tui-tabbar :current="current">
		</tui-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '',
				totalPrice1: 0,
				cartIds: [], //购物车id
				actions: [{
					name: '删除',
					color: '#fff',
					fontsize: 28,
					width: 64,
					background: '#F82400'
				}],
				recommendgoods: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				islogin: 1, //是否要需要登录，需要在onLoad加截 app.page.onLoad(this,e);
				goodsList: {
					saveHidden: true,
					number: 0,
					totalPrice: 0,
					totalPayPoints: 0,
					allSelect: true,
					noSelect: false,
					list: [],
					bottommenulist: []
				},
			}
		},
		filters: {
			getPrice(price) {
				price = price || 0;
				return price.toFixed(2)
			}
		},
		onLoad: function(e) {
			let _this = this;
			this.current = "/" + this.__route__;
			_this.$request.get('Goods.recommend').then(res => {
				if (res.errno == 0) {
					_this.recommendgoods = res.data;
				}
			});

		},
		onShow: function() {
			var _this = this;
			_this.getcarlist()
		},
		methods: {
			getcarlist: function() {
				var _this = this;
				var shopList = [];
				// 获取购物车数据

				_this.$request.get('cart.list', {
					samkey: (new Date()).valueOf()
				}).then(function(res) {
					var shopCarInfoMem = res.data;
					//console.log(shopCarInfoMem);
					if (shopCarInfoMem && shopCarInfoMem.shopList) {
						shopList = shopCarInfoMem.shopList
					}
					_this.goodsList.list = shopList;
					_this.setGoodsList(_this.getSaveHide(), _this.allSelect());
				})
			},
			changeNum: function(e) {
				var _this = this
				_this.$request.post('cart.quantity', {
					id: e.index,
					uptype: 'jia',
					quantity: e.value,
					samkey: (new Date()).valueOf()
				}).then(function(res) {
					_this.getcarlist();
				})
			},
			toIndexPage: function() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			navigateTo: function(url) {
				this.sam.navigateTo(url)
			},
			delItem: function(e) {
				var _this = this;
				_this.$request.post('cart.del', {
					id: e.item.cart_id
				}).then(function(res) {
					_this.getcarlist();
				})

			},

			selectChange: function(e) {

				this.cartIds = e.detail.value;
				this.goodsList.list.map(item => {
					//如果购物车id为数字统一转成字符串					
					if (this.cartIds.indexOf(item.id.toString())>-1) {
						item.active = true;
					} else {
						item.active = false;
					}
				})

				this.setGoodsList(this.getSaveHide(), this.allSelect());

			},
			allSelect: function() {
				var list = this.goodsList.list;
				var allSelect = false;
				for (var i = 0; i < list.length; i++) {
					var curItem = list[i];
					if (curItem.active) {
						allSelect = true;
					} else {
						allSelect = false;
						break;
					}
				}
				return allSelect;
			},
			setGoodsList: function(saveHidden, allSelect) {
				var list = this.goodsList.list;
				var number = 0;
				var total = 0;
				let totalPayPoints = 0;
				var noSelect = 0;
				for (var i = 0; i < list.length; i++) {
					var curItem = list[i];
					if (curItem.active) {
						number += parseInt(curItem.number);
						total += parseFloat(curItem.price) * curItem.number;
						totalPayPoints += curItem.points * curItem.number;

					} else {
						noSelect++;
					}
				}
				total = parseFloat(total.toFixed(2)); //js浮点计算bug，取两位小数精度
				if (noSelect == list.length) {
					noSelect = true;
				} else {
					noSelect = false;
				}

				this.goodsList = {
					saveHidden: saveHidden,
					number: number,
					totalPrice: total,
					allSelect: allSelect,
					noSelect: noSelect,
					list: list,
					totalPayPoints: totalPayPoints
				};
				var shopCarInfo = {};
				shopCarInfo.shopList = list;
				wx.setStorage({
					key: "shopCarInfo",
					data: shopCarInfo
				})
			},
			bindAllSelect: function() {
				var currentAllSelect = this.goodsList.allSelect;

				var list = this.goodsList.list;
				if (currentAllSelect) {
					for (var i = 0; i < list.length; i++) {
						var curItem = list[i];
						curItem.active = false;
					}
				} else {
					for (var i = 0; i < list.length; i++) {
						var curItem = list[i];
						curItem.active = true;
					}
				}

				this.setGoodsList(this.getSaveHide(), !currentAllSelect);
			},
			editTap: function() {
				this.goodsList.list.map(item => {
					item.active = false;
				})
				this.setGoodsList(!this.getSaveHide(), this.allSelect());
			},
			saveTap: function() {

				this.goodsList.list.map(item => {
					item.active = true;
				})
				this.setGoodsList(!this.getSaveHide(), this.allSelect());
			},
			getSaveHide: function() {
				var saveHidden = this.goodsList.saveHidden;
				return saveHidden;
			},
			deleteSelected: function() {
				var _this = this;
				var list = this.goodsList.list;
				var ids = '';

				for (let i = 0; i < list.length; i++) {
					let curItem = list[i];
					if (curItem.active) {
						ids = ids + curItem.cart_id + ',';
					}
				}
				//console.log(ids);
				_this.$request.post('cart.del', {
					ids: ids
				}).then(function(res) {
					_this.getcarlist();
				})

				/*
				    list = list.filter(function(curGoods) {
				      return !curGoods.active;
				    });
				    this.setGoodsList(this.getSaveHide(),  this.allSelect());
				*/

			},
			toPayOrder: function() {
				uni.showLoading();
				var _this = this;
				if (this.goodsList.noSelect) {
					uni.hideLoading();
					return;
				}
				// 重新计算价格，判断库存
				var shopList = [];
				var shopCarInfoMem = uni.getStorageSync('shopCarInfo');
				if (shopCarInfoMem && shopCarInfoMem.shopList) {
					// shopList = shopCarInfoMem.shopList
					shopList = shopCarInfoMem.shopList.filter(entity => {
						return entity.active;
					});
				}
				if (shopList.length == 0) {
					uni.hideLoading();
					return;
				}
				var isFail = false;
				var doneNumber = 0;
				var needDoneNUmber = shopList.length;
				for (let i = 0; i < shopList.length; i++) {
					if (isFail) {
						uni.hideLoading();
						return;
					}
					let carShopBean = shopList[i];
					//console.log(carShopBean);
					// 获取价格和库存

					_this.$request.post('cart.check', {
						goodsId: carShopBean.goodsId,
						number: carShopBean.number,
						sku: carShopBean.sku
					}).then(function(res) {
						doneNumber++;
						
						if (carShopBean.sku) {
							if (!res.data.sku || res.data.sku == "") {
								uni.showModal({
									title: '提示',
									content: carShopBean.name + ' 商品已失效，请重新购买',
									showCancel: false
								})
								isFail = true;
								uni.hideLoading();
								return;
							}
						}

						if (Number(res.data.stores) < Number(carShopBean.number)) {
							uni.showModal({
								title: '提示',
								content: carShopBean.name + ' 库存不足，请重新购买',
								showCancel: false
							})
							isFail = true;
							uni.hideLoading();
							return;
						}
						if (res.data.price != carShopBean.price) {
							uni.showModal({
								title: '提示',
								content: carShopBean.name + '价格有调整，请重新购买',
								showCancel: false
							})
							isFail = true;
							uni.hideLoading();
							return;
						}
						
						if (needDoneNUmber == doneNumber) {
							if (!isFail) {
								
								_this.navigateToPayOrder();
							}
						}
					})
				}
			},
			navigateToPayOrder: function() {
				uni.hideLoading();
				uni.navigateTo({
					url: '/pages/submitOrder/submitOrder'
				})
			}
		},
		onNavigationBarButtonTap(e) {
			this.goodsList.saveHidden = !this.goodsList.saveHidden;
			let text = this.goodsList.saveHidden ? "完成" : "编辑";
			// #ifdef APP-PLUS
			let webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewButtonStyle(0, {
				text: text
			});
			// #endif
		}
	}
</script>

<style>
	.container {
		padding-bottom: 120rpx;
	}

	.no-goods {
		padding-bottom: 230rpx;
	}

	.title-box {
		width: 100%;
		padding-top: 330rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
		background: url(https://www.v8cms.com/xm_mallv3wxapp/images/icon-cart.png) no-repeat center 205rpx;
		background-size: 100rpx auto;
		margin-bottom: 50rpx;
	}

	.to-index-btn {
		color: #fff;
		background: #e64340;
		border-radius: 6px;
		margin-left: auto;
		margin-right: auto;
		width: 300rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 28rpx;
	}

	.tui-mtop {
		margin-top: 24rpx;
	}

	.tui-edit-goods {
		width: 100%;
		border-radius: 12rpx;
		overflow: hidden;
		padding: 24rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 24rpx;
	}

	.tui-goods-num {
		font-weight: bold;
		color: #e41f19;
	}

	.tui-cart-cell {
		width: 100%;
		border-radius: 12rpx;
		background: #FFFFFF;
		padding: 40rpx 0;
		overflow: hidden;
	}

	.tui-goods-item {
		display: flex;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-checkbox {
		min-width: 70rpx;
		display: flex;
		align-items: center;
	}

	/* #ifdef MP-WEIXIN */
	.tui-checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		border-color: #d1d1d1 !important;
	}

	.tui-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #eb0909;
		width: 44rpx !important;
		height: 44rpx !important;
		border: none;
	}

	/* #endif */
	/* #ifndef MP-WEIXIN */

	>>>.tui-checkbox .uni-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		margin-right: 0 !important;
		border-radius: 50% !important;
		transform: scale(0.8);
		border-color: #d1d1d1 !important;
	}

	>>>.tui-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #eb0909;
		width: 45rpx !important;
		height: 45rpx !important;
		border: none;
	}

	/* #endif */
	.tui-goods-img {
		width: 180rpx;
		height: 180rpx !important;
		border-radius: 12rpx;
		flex-shrink: 0;
		display: block;
	}

	.tui-goods-info {
		width: 100%;
		padding-left: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-goods-title {
		white-space: normal;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 24rpx;
		color: #333;
	}

	.tui-goods-model {
		max-width: 100%;
		color: #333;
		background: #F5F5F5;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.tui-model-text {
		max-width: 100%;
		transform: scale(0.9);
		transform-origin: 0 center;
		font-size: 24rpx;
		line-height: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-price-box {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.tui-goods-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-scale {
		transform: scale(0.8);
		transform-origin: 100% 100%;
	}

	.tui-activity {
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 20rpx 100rpx;
		box-sizing: border-box;
	}

	.tui-buy {
		display: flex;
		align-items: center
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-sub-info {
		max-width: 532rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 20rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
		color: #333;
		transform: scale(0.8);
		transform-origin: 100% center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: auto
	}

	.tui-invalid-text {
		width: 66rpx;
		margin-right: 4rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(0, 0, 0, .3);
		transform: scale(0.8);
		transform-origin: center center;
		border-radius: 4rpx;
		flex-shrink: 0;
	}

	.tui-gray {
		color: #B2B2B2 !important;
	}

	.tui-goods-invalid {
		color: #555;
		font-size: 24rpx;
	}

	.tui-flex-center {
		align-items: center !important;
	}

	.tui-invalid-ptop {
		padding-top: 40rpx;
	}

	.settlement {
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 160rpx;
		/* #ifdef H5 */
		bottom: 200rpx;
		/* #endif */
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		z-index: 9999;
	}

	.settlement::before {
		content: '';
		width: 100%;
		border-bottom: 1rpx solid #d9d9d9;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-checkAll {
		display: flex;
		align-items: center;
	}

	.tui-checkbox-pl {
		padding-left: 12rpx;
	}

	.tui-total-price {
		padding-left: 30rpx;
		font-size: 30rpx !important;
	}

	/*猜你喜欢*/
	.tui-youlike {
		padding-left: 12rpx
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 10rpx;
		padding-bottom: 100rpx;
	}

	.tui-product-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.tui-pro-item {
		background: #fff;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 12rpx;
		width: 48%;
		margin-left: 1%;
		margin-right: 1%;
		margin-bottom: 2%;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}

	.no-select {
		background-color: #ccc;
	}
</style>
