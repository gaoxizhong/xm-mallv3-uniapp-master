<template>
	<view>
		<view class="tui-form">
			<view class="tui-view-input">
				<block v-for="(item,index) in registerfield" :key="index">
					<block v-if="item.inputtype == 'text'">
						<tui-list-cell :hover="false" :lineLeft="false">
							<view class="tui-cell-input">
								<input v-model="item.fieldsvalue" placeholder-class="tui-phcolor"
									:placeholder="'请输入'+item.viewmingcheng" />
							</view>
						</tui-list-cell>
					</block>
					<block v-if="item.inputtype == 'textarea'">
						<tui-list-cell :hover="false" :lineLeft="false">
							<view class="tui-cell-input">
								<textarea class="weui-textarea" v-model="item.fieldsvalue"
									:placeholder="'请输入'+item.viewmingcheng" style="height: 3.3em" />
							</view>
						</tui-list-cell>
					</block>
					<block v-if="item.inputtype == 'pics'">
						<tui-list-cell :hover="true" :lineLeft="false" :arrow="true">
							<view @click="chooseImg(index)" class="tui-list-cell">
								<view>{{item.viewmingcheng}}</view>
								<image :src="item.fieldsvalue || '/static/images/default_img.png'"
									class="tui-avatar">
								</image>
							</view>
						</tui-list-cell>
					</block>
					<block v-if="item.inputtype == 'lbs'">
						<tui-list-cell @tap="onChangePosition(index)" :hover="true" :lineLeft="false" :arrow="true">
							<view class="tui-list-cell">
								<view>{{item.fieldsvalue.region_name || item.viewmingcheng}}</view>
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false" :lineLeft="false">
							<view class="tui-cell-input">
								<input v-model="item.fieldsvalue.house_number" name="house_number"
									placeholder="请输入门牌号" placeholder-class="tui-phcolor" type="text" />
							</view>
						</tui-list-cell>
					</block>
					<block v-if="item.inputtype == 'checkbox'">
						<tui-list-cell :hover="false" :lineLeft="false">
							<view class="uni-list">
								<button class="ptypebut" @click="selcate" :data-index="index"
									:data-val="checkitem.val"
									:type="item.fieldsvalue.includes(checkitem.val.toString()) ? 'primary':'default'"
									v-for="checkitem in item.selectvaluearray"
									:key="checkitem.val">{{checkitem.key}}</button>
							</view>
						</tui-list-cell>
					</block>
					<block v-if="item.inputtype === 'select'">
						<tui-list-cell :padding="0" :hover="true" :lineLeft="false" :arrow="true">
							<view class="tui-list-cell" style="padding: 0rpx;">
								<picker style="width: 100%;padding: 40rpx 30rpx 40rpx 30rpx;" @change="bindSelectChange" range-key="key"
									:data-selectval="item.selectvaluearray" :data-index="index" :data-sid="item.id"
									:range="item.selectvaluearray">
									<view v-if="item.fieldsvalue_name" class="weui-select">
										{{item.fieldsvalue_name}}
									</view>
									<view v-else style="color: #888" class="weui-select">请选择{{item.viewmingcheng}}
									</view>
								</picker>
							</view>
						</tui-list-cell>
					</block>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'diyfields',
		props: {
			value: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				registerfield:{},
				latitude: '',
				longitude: '',
				update: '',
				is_audit: 1
			};
		},
		created() {
			//console.log(this.value);
			this.registerfield = [...this.value];
		},
		watch: {
			registerfield: {
			  handler() {
				  //console.log(this.registerfield);
				  this.$emit('complete', {
				  	registerfield: this.registerfield
				  })
				  
			  },
			  deep: true
			},
		},
		methods: {
			selcate: function(e) {
				var item = e.currentTarget.dataset.val.toString();
				var index = e.currentTarget.dataset.index;
				if (this.registerfield[index].fieldsvalue.includes(item)) {
					this.delcateids(index, item);
				} else {
					this.registerfield[index].fieldsvalue.push(item);
				}
			},
			bindSelectChange: function(e) {
				if (e.detail.value) {
					this.registerfield[e.currentTarget.dataset.index].fieldsvalue = this.registerfield[e.currentTarget
						.dataset.index].selectvaluearray[e.detail.value].val;
					this.registerfield[e.currentTarget.dataset.index].fieldsvalue_name = this.registerfield[e
						.currentTarget
						.dataset.index].selectvaluearray[e.detail.value].key;
				}
			
			},
			delcateids: function(index, val) {
				var sel = this.registerfield[index].fieldsvalue.findIndex(item => {
					if (item == val) {
						return true;
					}
				})
				// console.log(index)
				this.registerfield[index].fieldsvalue.splice(sel, 1)
			},
			chooseImg: function(key) {
				var _this = this;
				uni.chooseImage({
					count: 1,
					// 默认9
					sizeType: ['original', 'compressed'],
					// 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					// 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						_this.Imgupload(key, tempFilePaths[0]);
					}
				});
			},
			Imgupload: function(key, path) {
				var _this = this;
				_this.$request.uploadFile(path).then(res => {
					_this.registerfield[key].fieldsvalue = res.url;
				});
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
						console.log(res.address);
						if (!(REGION_PROVINCE = regex.exec(res.address))) {
							regex = /^(.*?(省|自治区))(.*?)$/;
							REGION_PROVINCE = regex.exec(res.address);
							addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
							regexAddressBean(REGION_PROVINCE[3], addressBean);
						} else {
							addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
							regexAddressBean(res.address, addressBean);
						}
						_this.registerfield[key].fieldsvalue = {
							region_name: res.name,
							address: res.address,
							province_name: addressBean.REGION_PROVINCE,
							city_name: addressBean.REGION_CITY,
							district_name: addressBean.REGION_COUNTRY,
							latitude: res.latitude,
							longitude: res.longitude,
						};
			
					}
			
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tui-list-cell {
		width: 100%;
		color: $uni-text-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}

	.tui-avatar {
		width: 130rpx;
		height: 130rpx;
		display: block;
	}

	.uni-list {
		width: 100%;
		padding-top: 15rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.ptypebut {
		width: 40%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		margin-bottom: 10rpx;
	}

	.checkboxbox {
		padding: 20rpx;
	}

	.container {
		backgroundColor: #fff;
		padding-bottom: 80rpx;

		.tui-page-title {
			width: 100%;
			font-size: 48rpx;
			font-weight: bold;
			color: $uni-text-color;
			line-height: 42rpx;
			padding: 110rpx 40rpx 40rpx 40rpx;
			box-sizing: border-box;
		}

		.tui-form {
			.tui-view-input {
				width: 100%;
				box-sizing: border-box;
				padding: 0 0rpx;

				.tui-cell-input {
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 48rpx;
					padding-bottom: $uni-spacing-col-base;

					input {
						flex: 1;
						padding-left: $uni-spacing-row-base;
					}

					.tui-icon-close {
						margin-left: auto;
					}

					.tui-btn-send {
						width: 156rpx;
						text-align: right;
						flex-shrink: 0;
						font-size: $uni-font-size-base;
						color: $uni-color-primary;
					}

					.tui-gray {
						color: $uni-text-color-placeholder;
					}

					.tui-textarea {
						width: 100%;
						height: 300rpx;
						font-size: 28rpx;
						padding: 20rpx 30rpx;
						box-sizing: border-box;
						background-color: #fff;
					}
				}
			}

			.tui-cell-text {
				width: 100%;
				padding: 40rpx $uni-spacing-row-lg;
				box-sizing: border-box;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;

				.tui-color-primary {
					color: $uni-color-primary;
					padding-left: $uni-spacing-row-sm;
				}
			}

			.tui-btn-box {
				width: 100%;
				padding: 0 $uni-spacing-row-lg;
				box-sizing: border-box;
				margin-top: 20rpx;
			}
		}
	}
</style>
