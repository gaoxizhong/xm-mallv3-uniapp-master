<template>
	<view class="tui-addr-box">
		<form @submit="bindSave" :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="name" :value="addressData.name" placeholder="请输入收货人姓名"
						maxlength="15" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="telephone" :value="addressData.telephone" placeholder="请输入收货人手机号码"
						maxlength="11" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell @tap="onChangePosition()" :hover="true" padding="0" :arrow="true">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<view :style="'color:'+(fieldsvalue.address?'#333':'#ccc')+';'">{{fieldsvalue.region_name?fieldsvalue.region_name:'请选择地址'}}</view>
				</view>
			</tui-list-cell>
<!-- 			<picker :value="value" mode="multiSelector" @change="picker" @columnchange="columnPicker" :range="multiArray">
				<tui-list-cell :arrow="true" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
						<input placeholder-class="tui-phcolor" class="tui-input tui-pr__30" disabled name="city" placeholder="请选择城市" maxlength="50"
						 type="text" v-model="showRegionStr"/>
					</view>
				</tui-list-cell>
			</picker> -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">详细地址</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="address" placeholder="请输入详细的收货地址"
						maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<!--
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-cell-title">地址类型</view>
					<view class="tui-addr-label">
						<text v-for="(item,index) in lists" :key="index" class="tui-label-item"
							:class="{'tui-label-active':index==1}">{{item}}</text>
					</view>
				</view>
			</tui-list-cell>
            -->
			<!-- 默认地址 -->
			<!--<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch checked color="#19be6b" class="tui-switch-small" />
				</view>
			</tui-list-cell>-->
			
			<!-- 保存地址 -->
			<view class="tui-addr-save">
				<tui-button formType="submit" shadow type="danger" height="88rpx" shape="circle">保存地址</tui-button>
			</view>
			<view class="tui-del" v-if="addressData.length > 0">
				<tui-button shadow type="gray" @click="deleteAddress" height="88rpx" shape="circle">删除收货地址</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	import QQMapWX from '@/libs/qqmap-wx-jssdk.min.js';
	export default {
		data() {
			return {
				id: 0,
				addressData:[],
				lists: ["公司", "家", "学校", "其他"],
				selectList: [],
				multiArray: [], //picker数据
				pickerSelect: [0, 0, 0],
				showRegionStr: "",
				province:[],
				city:[],
				country:[],
				pickerRegionRange: [],
				telnull: '',
				fieldsvalue:{},
				qqmapsdk: null,
				key: 'PKEBZ-CQL6W-WQGRE-O4X3A-NCTK6-XPFKG',
				cityName:'', //当前城市
			}
		},
		onLoad(e) {
			const _this = this;
			console.log(e)
			  _this.$request.get('area.tree').then(res => {
				_this.selectList = res.data;
				_this.multiArray = [
					_this.toArr(_this.selectList),
					_this.toArr(_this.selectList[0].children),
					_this.toArr(_this.selectList[0].children[0].children)
				]
			});
			
			_this.$config.init(function() {
				_this.telnull = _this.$config.getConf("telnull");
			});
			
			if (e.id) { // 修改初始化数据库数据
				_this.$request.get('address.detail', {
					id: e.id
				}).then(res => {
					if (res.errno === 0) {
						_this.id = e.id;
						_this.addressData = res.data;
						_this.showRegionStr = res.data.provinceStr + res.data.cityStr + res.data.areaStr;
						_this.initRegionDB(res.data.provinceStr, res.data.cityStr, res.data.areaStr)
						return;
					} else {
						uni.showModal({
							title: '提示',
							content: '无法获取快递地址数据',
							showCancel: false
						})
					}
				})
			}
			// 获取当前城市
			if (uni.getStorageSync('cityName')) {
				this.cityName = uni.getStorageSync('cityName');
			} else {
				this.qqmapsdk = new QQMapWX({
					key: this.key
				});
				uni.authorize({
					scope: 'scope.userLocation',
					success: res => {
						//console.log(res)
						uni.getLocation({
							type: 'wgs84',
							success(res) {
								uni.setStorageSync('latitude', res.latitude);
								uni.setStorageSync('longitude', res.longitude);
								console.log(res);
								_this.getLocationByLonglat(res.latitude, res.longitude);
							}
						});
					},
					fail: res => {
						//console.log('失败：', res);
					}
				});
			}
		},
		methods: {
			//经纬度获取位置
			getLocationByLonglat: function(latitude, longitude) {
				let _this = this;
				// #ifdef H5
				let url =
					`https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude + "," + longitude}&key=${this.key}&callbackName=QQmap&output=jsonp&coord_type=5&get_poi=0`
				this.tui.tuiJsonp(url, (res) => {
					if (res.status === 0) {
						//地址信息
						//console.log(res.result.address_component)
					}
				}, "QQmap")
				// #endif
			
				// #ifndef H5
				this.qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						console.log(res.result);
						//let city = res.result.address_component.city;
						_this.cityName = res.result.address_component.city;
						uni.setStorageSync('cityName', res.result.address_component.city);
			
					},
					fail: res => {
						//console.log('失败：', res);
					}
				})
				// #endif
			},
			picker: function(e) {
				let value = e.detail.value;
				if (this.selectList.length > 0) {
					this.province = this.selectList[value[0]]
					this.city = this.selectList[value[0]].children[value[1]]
					this.country = this.selectList[value[0]].children[value[1]].children[value[2]]
					// this.selectList[value[0]].children[value[1]].children[value[2]].value
					this.showRegionStr = this.province.text + " " + this.city.text + " " + this.country.text;
				}
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].text);
				}
				return arr;
			},
			columnPicker: function(e) {
				//第几列 下标从0开始
				let column = e.detail.column;
				//console.log(column);
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value].children),
						this.toArr(this.selectList[value].children[0].children)
					];
					this.pickerSelect = [value, 0, 0]
				} else if (column === 1) {
					this.multiArray = [
						this.multiArray[0],
						this.multiArray[1],
						this.toArr(this.selectList[this.pickerSelect[0]].children[value].children)
					];
					this.pickerSelect = [this.pickerSelect[0], value, 0]
				}
			},
			
			async initRegionDB(pname, cname, dname) {
				var _this = this;
				_this.showRegionStr = pname + cname + dname
				let province = undefined
				let city = undefined
				let country = undefined
				if (pname) {
					const index = _this.pickerRegionRange[0].findIndex(ele => {
						return ele.name == pname
					})
					//console.log('pindex', index)
					if (index >= 0) {
						_this.pickerSelect[0] = index
						province = _this.pickerRegionRange[0][index]
					}
				}
				if (!province) {
					return
				}

				const _cRes = await _this.$request.get('area.child', {
					pid: province.id
				});

				if (_cRes.errno === 0) {
					_this.pickerRegionRange[1] = _cRes.data
					if (cname) {
						const index = _this.pickerRegionRange[1].findIndex(ele => {
							return ele.name == cname
						})
						if (index >= 0) {
							_this.pickerSelect[1] = index
							city = _this.pickerRegionRange[1][index]
						}
					}
				}
				if (!city) {
					return
				}

				const _dRes = await _this.$request.get('area.child', {
					pid: city.id
				});
				if (_dRes.errno === 0) {
					_this.pickerRegionRange[2] = _dRes.data
					if (dname) {
						const index = _this.pickerRegionRange[2].findIndex(ele => {
							return ele.name == dname
						})
						if (index >= 0) {
							_this.pickerSelect[2] = index
							country = _this.pickerRegionRange[2][index]
						}
					}
				}
				_this.province = province;
				_this.city = city;
				_this.country = country;
			},
			// 保存地址
			bindSave: function(e) {
				var _this = this;
				var name = e.detail.value.name;
				var address = e.detail.value.address?e.detail.value.address:'';
				var telephone = e.detail.value.telephone;
				var fieldsvalue = _this.fieldsvalue;
				console.log(fieldsvalue)
				// var address = fieldsvalue.address?fieldsvalue.address:''; 
				var region_name = fieldsvalue.region_name?fieldsvalue.region_name:''; 
				// 姓名
				if (name == "") {
					uni.showModal({
						title: '提示',
						content: '请填写联系人姓名',
						showCancel: false
					})
					return
				}
				if (_this.telnull != '1') {
					if (telephone == "") {
						uni.showModal({
							title: '提示',
							content: '请输入联系电话',
							showCancel: false
						})
						return
					}
				}

				// if (JSON.stringify(_this.province) == "{}" || JSON.stringify(_this.city) == "{}") {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '请选择地区',
				// 		showCancel: false
				// 	})
				// 	return
				// }
				// if (address == "") {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '请填写详细地址',
				// 		showCancel: false
				// 	})
				// 	return
				// }
				if ( JSON.stringify(fieldsvalue) == "{}") {
					uni.showModal({
						title: '提示',
						content: '请选择收货地址',
						showCancel: false
					})
					return
				}
				let apiResult
				if (_this.id) {
					apiResult = _this.$request.post('address.update', {
						id: _this.id,
						province_id: _this.province.id?_this.province.id:0,
						city_id: _this.city.id?_this.city.id:0,
						country_id: _this.country.id ? _this.country.id: 0,
						street: _this.sObject ? _this.sObject.id : '',
						name: name,
						address: address,
						telephone: telephone,
						isDefault: '1',
						region_name,
						latitude: fieldsvalue.latitude,
						longitude: fieldsvalue.longitude,
					})
				} else {
					apiResult = _this.$request.post('address.add', {
						province_id: _this.province.id?this.province.id:0,
						city_id: _this.city.id?_this.city.id:0,
						country_id: _this.country.id ? _this.country.id:0,
						street: _this.sObject ? _this.sObject.id : '',
						name: name,
						address: address,
						telephone: telephone,
						isDefault: '1',
						region_name,
						latitude: fieldsvalue.latitude,
						longitude: fieldsvalue.longitude,
					})
				}

				apiResult.then(function(res) {
					if (res.errno != 0) {
						// 登录错误 
						uni.hideLoading();
						uni.showModal({
							title: '失败',
							content: res.msg,
							showCancel: false
						})
						return;
					}
					// 跳转到结算页面
					uni.navigateBack({})
				})
			},

			deleteAddress: function() {
				var _this = this;
				var id = _this.addressData.id;
				uni.showModal({
					title: '提示',
					content: '确定要删除该收货地址吗？',
					success: function(res) {
						if (res.confirm) {
							_this.$request.post('address.delete', {
								id: id
							}).then(function() {
								uni.navigateBack({})
							})

						} else {
							console.log('user cancel')
						}
					}
				})
			},
			readFromWx: function() {
				const _this = this
				uni.chooseAddress({
					success: function(res) {
						//console.log(res)
						_this.initRegionDB(res.provinceName, res.cityName, res.countyName);
						_this.wxaddress = res;
					}
				})
			},
			onChangePosition: function(key) {
				const _this = this;
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						const speed = res.speed;
						const accuracy = res.accuracy;
					}
				});
			
				uni.chooseLocation({
					success(res) {
						var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
						var REGION_PROVINCE = [];
						var addressBean = {
							REGION_PROVINCE: null,
							REGION_COUNTRY: null,
							REGION_CITY: null
						};
			
						function regexAddressBean(address, addressBean) {
							regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
							var addxress = regex.exec(address);
							addressBean.REGION_CITY = addxress[1];
							addressBean.REGION_COUNTRY = addxress[2];
						}
						if (!(REGION_PROVINCE = regex.exec(res.address))) {
							regex = /^(.*?(省|自治区))(.*?)$/;
							REGION_PROVINCE = regex.exec(res.address);
							addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
							regexAddressBean(REGION_PROVINCE[3], addressBean);
						} else {
							addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
							regexAddressBean(res.address, addressBean);
						}
						_this.fieldsvalue = {
							region_name: res.name,
							address: res.address,
							province_name: addressBean.REGION_PROVINCE,
							city_name: addressBean.REGION_CITY,
							district_name: addressBean.REGION_COUNTRY,
							latitude: res.latitude,
							longitude: res.longitude,
						};
						console.log(_this.fieldsvalue)
			
					}
			
				});
			}
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
		flex-shrink: 0;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-pr__30 {
		padding-right: 30rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-cell-title {
		font-size: 28rpx;
		flex-shrink: 0;
	}

	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.92);
	}

	.tui-label-active {
		background: #E41F19;
		border-color: #E41F19;
		color: #fff;
	}

	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx 30rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx 30rpx;
	}
</style>
