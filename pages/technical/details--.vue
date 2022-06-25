<template>
	<view>
		<!--header-->
		<view class="tui-mybg-box">
			<view class="tui-header-center">
				<image :src="detail.touxiang || '/static/images/my/mine_def_touxiang_3x.png'" class="tui-avatar">
				</image>
				<view class="tui-info">
					<view class="tui-nickname">
						{{detail.title}} <text v-if="detail.pid_name">[顾问：{{detail.pid_name}}]</text>
					</view>
					<view class="tui-explain">{{detail.category_name}}{{detail.level_name}}</view>
					<view class="tui-explain">{{detail.workunits}}</view>
				</view>
				<!-- #ifdef MP -->
				<view class="tui-set-box">
					<view class="tui-icon-box tui-icon-message">
						<!--<tui-icon @tap="navigateTo('/pages/my/message/message')" name="message" color="#fff" :size="26"></tui-icon>
						<view v-if="detail.nickname" class="tui-badge tui-badge-white">1</view>-->
					</view>
					<view class="tui-icon-box tui-icon-setup">
						<tui-icon name="setup" color="#fff" :size="26"></tui-icon>
					</view>
				</view>
				<!-- #endif -->
			</view>
			
			<view class="tui-header-btm">
				<view class="tui-btm-item">
					<view class="tui-btm-num">{{detail.service_times}}</view>
					<view class="tui-btm-text">服务次数</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">
						<text>{{detail.comment}}</text>
						<view class="tui-badgewhite-dot"></view>
					</view>
					<view class="tui-btm-text">好评</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">{{detail.create_time}}</view>
					<view class="tui-btm-text">入驻时间</view>
				</view>
			</view>
			
			<!--<view class="tui-guarantee">
				<view class="tui-guarantee-item">
					<tui-icon name="circle-selected" :size="14" color="#5796fd"></tui-icon>
					<text class="tui-pl">百强医院</text>
				</view>
				<view class="tui-guarantee-item">
					<tui-icon name="circle-selected" :size="14" color="#5796fd"></tui-icon>
					<text class="tui-pl">从业30年</text>
				</view>
				<view class="tui-guarantee-item">
					<tui-icon name="circle-selected" :size="14" color="#5796fd"></tui-icon>
					<text class="tui-pl">可开处方</text>
				</view>
				<view class="tui-guarantee-item">
					<tui-icon name="circle-selected" :size="14" color="#5796fd"></tui-icon>
					<text class="tui-pl">专业有效</text>
				</view>
				<view class="tui-guarantee-item">
					<tui-icon name="circle-selected" :size="14" color="#5796fd"></tui-icon>
					<text class="tui-pl">耐心细致</text>
				</view>
			</view>-->
		</view>
		<!--<view class="service-box">
			<view class="service-item">
				<view class="tui-icon-box">
					<tui-icon name="wechat" :size="28" color="#fc872d"></tui-icon>
				</view>
				<view class="service-text">图文咨询</view>
				<view class="service-price">￥{{goodsDetail.price}}元/次</view>
			</view>
			<view class="service-item">
				<view class="tui-icon-box">
					<tui-icon name="voipphone" :size="28" color="#666666"></tui-icon>
				</view>
				<view class="service-text">电话咨询</view>
				<view class="service-price">￥{{goodsDetail.price}}元/次</view>
			</view>
			<view class="service-item">
				<view class="tui-icon-box">
					<tui-icon name="signin" :size="28" color="#666666"></tui-icon>
				</view>
				<view class="service-text">预约就诊</view>
				<view class="service-price">未开通</view>
			</view>
		</view>-->
		<!--header-->
		<view class="tui-box">
			<tui-list-cell padding="0" unlined :lineLeft="false"
				@click="">
				<view class="tui-cell-header">
					<view class="tui-cell-title">擅长与经历</view>
					<!--<view class="tui-cell-sub">查看全部</view>-->
				</view>
			</tui-list-cell>
			<view class="tui-container">
				{{detail.introduction || ''}}
			</view>
		</view>
		<!--底部操作栏-->
		
		<!--<view class="tui-operation">
			<view class="tui-operation-left tui-col-5">
				<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="shop">
					<tui-icon name="shop" :size="22" color="#333"></tui-icon>
					<view class="tui-operation-text tui-scale-small">首页</view>
				</view>
				<button open-type="contact" class="item-button tui-operation-item" hover-class="tui-opcity"
					:hover-stay-time="150">
					<tui-icon name="kefu" :size="22" color="#333"></tui-icon>
					<view class="tui-operation-text tui-scale-small">客服</view>
				</button>
			</view>
			<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
				<view class="tui-flex-1">
					<tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="buyNow">
						图文咨询(￥{{goodsDetail.price}}元/次)
					</tui-button>
				</view>
			</view>
		</view>-->

		<!--底部操作栏-->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				width: 350,
				height: 64,
				tabs: [{
						name: '服务'
					},
					{
						name: '简介'
					}
				],
				buyNumber: 1,
				detail: {},
				goodsDetail: [],
			};
		},
		onLoad: function(e) {
			const _this = this;
			if (uni.getStorageSync('referrer_id')) {
				_this.$util.getUserInfo(function(userInfo) {
					_this.$request.get('member.bindpid', {
						samkey: (new Date()).valueOf(),
						pid: uni.getStorageSync('referrer_id')
					});
				})
			}
			this.getDetail(e.id);
			_this.$request.get('goods.technicaldefault').then(res => {
				if (res.errno == 0) {
					_this.goodsDetail = res.data;
				}
			});

		},
		methods: {
			getDetail(sId) {
				const _this = this;
				_this.$request.get('technical.detail', {
					id: sId
				}).then(res => {
					if (res.errno == 0) {
						_this.detail = res.data
					}
				});
			},
			/**
			 * 立即购买
			 */
			buyNow: function() {
				let _this = this
				_this.$request.post('goods.buynowinfo', {
					goodsId: _this.goodsDetail.id,
					buyNumber: _this.buyNumber
				}).then(res => {
					if (res.errno != 0) {
						wx.showModal({
							title: '错误',
							content: res.msg,
							showCancel: false
						})
						return;
					}
					var buyNowInfo = {};
					buyNowInfo.shopList = res.data;
					buyNowInfo.shopList.number = _this.buyNumber;
					buyNowInfo.technicalId = _this.detail.uuid;
					buyNowInfo.kjId = _this.kjId;
					buyNowInfo.deliverymode = _this.goodsDetail.category.deliverymode;
					buyNowInfo.is_times = _this.goodsDetail.is_times;
					buyNowInfo.ptype = _this.goodsDetail.ptype;

					uni.setStorage({
						key: "buyNowInfo",
						data: buyNowInfo
					});

					uni.navigateTo({
						url: "/pages/submitOrder/submitOrder?orderType=buyNow"
					});
					return;
				})
			},
			detail(id) {
				this.tui.href('/pages/goodsDetail/goodsDetail?id=' + id);
			}
		}
	};
</script>

<style>
	.tui-mybg-box {
		width: 100%;
		height: 464rpx;
		background-color: #ffffff;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		display: block;
		background-color: #ffffff;
	}

	.tui-header-center {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
	}

	.tui-info {
		width: 60%;
		padding-top: 10rpx;
		padding-left: 30rpx;
	}

	.tui-login {
		width: 60%;
		padding-left: 30rpx;
		font-size: 32rpx;
		line-height: 32rpx;
		color: #333;
		display: flex;
		align-items: center;
	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #333;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		padding-top: 50rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}
	
	.service-box {
		width: 100%;
		padding-top: 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}
	
	.service-item {
		flex: 1;
		width: 224rpx;
		height: 200rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		border-radius: 12rpx;
	}
	
	.service-text {
		font-size: 30rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}
	.service-price {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}
	
	.tui-guarantee {
		background: #fdfdfd;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx 30rpx 30rpx;
		font-size: 24rpx;
	}
	
	.tui-guarantee-item {
		color: #5796fd;
		padding-right: 30rpx;
		padding-top: 10rpx;
	}

	/*头部结束*/
	
	.tui-box {
		width: 100%;
		margin-top: 20rpx;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 30rpx;
		overflow: hidden;
	}
	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}
	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}
	
	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}
	
	.tui-container {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	/*底部操作栏*/

	.tui-col-7 {
		width: 65%;
	}

	.tui-col-5 {
		width: 35%;
	}

	.tui-operation {
		width: 100%;
		height: 100rpx;
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.item-button {
		padding-top: 8rpx;
		padding-bottom: 1rpx;
		padding-left: 0px;
		padding-right: 0px;
		background-color: #fff;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
		font-size: 18px;
		text-align: center;
		text-decoration: none;
		line-height: 22px;
		border-radius: 0px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		cursor: pointer;
		color: #333;
	}

	.tui-operation-text {
		font-size: 22rpx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100rpx;
		padding: 0 12rpx;
		box-sizing: border-box;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-flex-1 {
		flex: 1;
		padding: 6rpx;
	}

	/*底部操作栏*/
</style>
