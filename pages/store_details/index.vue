<template>
<view>
<view class="container">
  <block data-src="/common/authorize/index">
	<block v-if="user_info_show">
    <view class="new-modal">
        <view class="new-modal-content">
            <view class="new-modal-header" style="padding:30rpx 0;line-height:60rpx;border-bottom: 1rpx solid #eee;">用户登录</view>
            <view class="new-modal-body" style="min-height:0;margin-bottom:0;max-height:none">
                <view style="padding:60rpx 0 60rpx 0;text-align: center">
                    <view>为了提供更好的服务请先登录</view>
                    <view></view>
                </view>
                <view style="text-align:center">
                    <!--<image src='../../images/icon-authorize.png' style='width:500rpx;height:460rpx;'></image>-->
                </view>
                <view class="flex-x-center">
                    <view>
                        <button style="background-color:#04be01;width:500rpx;height:80rpx;border-radius:80rpx;color:#fff;margin-bottom:40rpx;" class="btn new-modal-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">快速登录</button>
                        <navigator url="/pages/index/index" style="background-color:#f0f0f0;width:500rpx;height:80rpx;border-radius:80rpx;color:#333;margin-bottom:40rpx;" class="btn new-modal-btn">取消</navigator>
                    </view>
                </view>
            </view>
        </view>
    </view>
</block></block>
  <view class="swiper-container" v-if="!storeDetail.basicInfo.videoId">
    <swiper class="swiper_box" :autoplay="autoplay" :interval="interval" :duration="duration">
      <block v-for="(item, index) in storeDetail.store_banner" :key="index">
        <swiper-item>
          <image :src="item.image" class="slide-image" mode="aspectFit" lazy-load="true"></image>
        </swiper-item>
      </block>
    </swiper>
    <view class="storelogo">
      <image :src="storeDetail.store_logo"></image>
    </view>
  </view>

  <view class="store-info">
    <view class="store-title">{{storeDetail.title}}</view>
    <view class="store-star">
      <image src="/static/images/star_32px.png"></image>
      <image src="/static/images/star_32px.png"></image>
      <image src="/static/images/star_32px.png"></image>
      <image src="/static/images/star_32px.png"></image>
      <image src="/static/images/star_32px.png"></image>
    </view>
    <view class="weui-cells weui-cells_after-title">
      <navigator @tap="gomap" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <view class="weui-cell__hd">
          <image src="/static/images/location_fill.png" style="margin-right: 20rpx;vertical-align: middle;width:50rpx; height: 50rpx;"></image>
        </view>
        <view class="weui-cell__bd"><block v-if="storeDetail.region_name">{{storeDetail.region_name}}</block>{{storeDetail.address}}</view>
        <view class="weui-cell__ft weui-cell__ft_in-access">
          <text :decode="true">&ensp;</text>
        </view>
      </navigator>
      <navigator @tap="tel" :data-tel="storeDetail.tel" class="weui-cell weui-cell_example weui-cell_access" hover-class="weui-cell_active">
        <view class="weui-cell__hd">
          <image src="/static/images/tel.png" style="margin-right: 20rpx;vertical-align: middle;width:50rpx; height: 50rpx;"></image>
        </view>
        <view class="weui-cell__bd">{{storeDetail.tel}}</view>
        <view class="weui-cell__ft weui-cell__ft_in-access">
          <text :decode="true">&ensp;</text>
        </view>
      </navigator>
      <navigator url class="weui-cell weui-cell_example weui-cell_access" hover-class="weui-cell_active">
        <view class="weui-cell__hd">
          <image src="/static/images/shop_fill.png" style="margin-right: 20rpx;vertical-align: middle;width:50rpx; height: 50rpx;"></image>
        </view>
        <view class="weui-cell__bd">商家介绍</view>
      </navigator>
    </view>
  </view>
  <view class="store-des-info">
    <view class="label-title"></view>
    <view class="store-text">
      {{storeDetail.content}}
      <view v-for="(item, index) in storeDetail.content_img" :key="index" class="content-img">
          <image :src="item.image"></image>
      </view>
    </view>
  </view>
  <view class="store-des-info" style="margin-top:35rpx;" v-if="reputation">
    <view class="label-title" style="border-bottom:1px solid #eee;">大家评价
      <text style="color:red">（{{reputation.length}}）</text>
    </view>
    <view v-for="(item, index) in reputation" :key="index" class="store-text" style="margin-top:15rpx;">
      <view style="width:100rpx;float:left;">
        <image style="width: 100rpx; height: 100rpx;" :src="item.user.avatarUrl"></image>
        <view style="text-align:center;width:100rpx;">{{item.goods.goodReputationStr}}</view>
      </view>
      <view style="width:550rpx;float:left;margin-left:35rpx;border-bottom:1px solid #eee;">
        <view>{{item.goods.goodReputationRemark}}</view>
        <view style="color: #B0B0B0;font-size:24rpx;">{{item.goods.dateReputation}} {{item.goods.goodso}}</view>
      </view>
    </view>
  </view>
</view>
<view class="goIndex" @tap="goIndex">
  <image class="goIndex-icon" src="/static/images/nav/home-on.png"></image>
</view>
</view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      parameter: {
        'navbar': '1',
        'return': '1',
        'title': '商家展示'
      },
      autoplay: true,
      interval: 3000,
      duration: 1000,
      storeDetail: {
        store_banner: [],
        store_logo: "",
        basicInfo: false,
        title: "",
        region_name: "",
        address: "",
        tel: "",
        content: "",
        content_img: []
      },
      currentPages: undefined,
      langIndex: 0,
      reputation: [],
      title: ""
    };
  },

  components: {
    navbar
  },
  props: {},

  async onLoad(e) {

  },

  onShow() {
    this.getStoreDetail(this.sId);
  },

  onShareAppMessage: function () {},
  methods: {

    async getStoreDetail(sId) {
      const that = this;
      const storeDetail = await app.globalData.wxapi.storeDetail(sId);

      if (storeDetail.errno == 0) {
		that.storeDetail = storeDetail.data;
      }
    },

    goIndex() {
      app.globalData.navigationTo('/pages/index/index');
    },

    tel: function (e) {
      uni.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    },
    gomap: function (e) {
      var _this = this; //console.log(Number(_this.data.storeDetail.latitude));


      uni.getLocation({
        //获取当前经纬度
        type: 'wgs84',
        //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
        success: function (res) {
          uni.openLocation({
            //​使用微信内置地图查看位置。
            latitude: Number(_this.storeDetail.latitude),
            //要去的纬度-地址
            longitude: Number(_this.storeDetail.longitude),
            //要去的经度-地址
            name: _this.storeDetail.title,
            address: _this.storeDetail.region_name + _this.storeDetail.address
          });
        }
      });
    }
  }
};
</script>
<style>


.container {
  background-color: #f2f2f2;
  min-height: 100%;
  padding-bottom: 100rpx;
}

.swiper-container {
  width: 100%;
  height: 580rpx;
  position: relative;
  background-color: #fff;
}

.swiper_box {
  width: 100%;
  height: 480rpx;
  background-color: #f2f2f2;
}

swiper-item image {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  height:500rpx;
}

.storelogo {
  width: 100%;
  height: auto;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0rpx;
  display: flex;
  justify-content: center;
}

.storelogo image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 81rpx;
  border: 3px solid #fff;
  z-index: 100;
}

.store-info {
  background-color: #fff;
  margin-bottom: 24rpx;
  width: 100%;
  position: relative;
}

.store-info .store-title {
  box-sizing: border-box;
  font-size: 32rpx;
  line-height: 1.4;
  color: #000;
  margin-top: 20rpx;
  margin-bottom: 10rpx;
  text-align: center;
}

.store-star {
  text-align: center;
  margin-bottom: 10rpx;
}

.store-star image {
  width: 32rpx;
  height: 32rpx;
}

.store-des-info {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
}

.label-title {
  font-size: 28rpx;
  color: #000;
  padding: 30rpx;
}

.store-text {
  padding: 0 10rpx;
  font-size: 28rpx;
  color: #666;
  line-height: 56rpx;
  margin-bottom: 30rpx;
}

.des-imgs {
  width: 100%;
}

.des-imgs image {
  width: 100%;
}
.content-img image {
  width: 100%;
  height: auto;
}
.goIndex {
  position: fixed;
  right: 20rpx;
  bottom: 200rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 15px;
  background-color: #fff;
  text-align: center;
}

.goIndex-icon {
  width: 50rpx;
  height: 50rpx;
  margin-top: 15rpx;
}
</style>