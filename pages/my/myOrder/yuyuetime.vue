<template>
	<view class="content">
		<tui-tabs :tabs="tabs" :currentTab="timestype" itemWidth="50%" @change="change"></tui-tabs>
		<view class="container">
			<view v-if="timestype==0" class="panel">
				<view class="panel-weeks">
					<button v-for="(item,index) in weeks" :key="index"
						:type="pickerWeeks == index ? 'primary':'default'" size="mini" :data-item="item"
						:data-index="index" @tap="onSelectWeeks">{{item}}</button>
				</view>
			</view>
			<view v-if="timestype==1" class="panel">
				<view class="panel-body">
					<button v-for="(item,index) in 29" :key="index" :type="pickerMonth == item+1 ? 'primary':'default'"
						size="mini" :data-item="item+1" @tap="onSelectMonth">{{item+1}}</button>
				</view>
			</view>
			<!-- 时间选项 -->
			<view class="time-box">
				<block v-for="(item,_index) in timeArr" :key="_index">
					<view class="item">
						<view class="item-box" :class="{'disable':item.disable,
						'active':isMultiple?item.isActive:_index==timeActive}" :style="{color:isMultiple?item.isActive? selectedItemColor:'#333'
						 :_index==timeActive?selectedItemColor:'#333'}" @click="selectTimeEvent(_index,item)">
							<text>{{item.seltime}}</text>
							<text class="all">{{item.disable?disableText:undisableText}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="bottom">
			<view class="show-time">
				预约时间：{{orderDateTime}}
			</view>
			<button form-type="submit" type="default" size="mini" class="submit-btn" @click="handleSubmit">
				确认
			</button>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			disableText: { //禁用显示的文本
				type: String,
				default: "已约满"
			},
			undisableText: { //未禁用显示的文本
				type: String,
				default: "可预约"
			},
			selectedItemColor: { // 时间选中的颜色
				type: String,
				default: "#FB4B5C"
			},

		},
		watch: {},
		data() {
			return {
				id: 0,
				timestype: 0,
				tabs: [{
					name: "按周约"
				}, {
					name: "按月约"
				}],
				pickerMonth: '',
				pickerWeeks: '',
				weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				isMultiple: false, //多选
				orderDateTime: '暂无选择', // 选中时间
				orderTimeArr: {}, //多选的时间
				timeArr: [], //时间数据
				nowDate: "", // 当前日期
				dateActive: 0, //选中的日期索引
				timeActive: 0, //选中的时间索引
				timeQuanBeginIndex: 0, //时间段开始的下标
				selectDate: "", //选择的日期
				selectTime: "", //选择的时间
				timeQuanBegin: "", //时间段开始时间
				timeQuanEnd: "", //时间段结束时间
			}
		},
		onLoad: function(e) {
			this.id = e.id;
		},
		created(props) {
			this.selectDate = this.nowDate;
			this.initOnload();

		},
		methods: {
			initOnload() {
				var _this = this;
				_this.$request.post('Servicetime.index', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.timeArr = res.data;
						_this.timeQuanBegin = _this.timeQuanEnd = ""
						let isFullTime = true
						_this.timeArr.forEach((item, index) => {
							// 判断是否当前日期时间都被预约
							if (!item.disable) {
								isFullTime = false
							}
						})

						_this.orderDateTime = isFullTime ? "暂无选择" : _this.selectDate
						_this.timeActive = -1
						for (let i = 0, len = _this.timeArr.length; i < len; i++) {
							if (!_this.timeArr[i].disable) {
								_this.orderDateTime = `${_this.selectDate} ${_this.timeArr[i].seltime}`
								_this.timeActive = i
								return
							}
						}

					}
				})
			},
			change(e) {
				this.timestype = e.index;
			},
			onSelectWeeks(e) {
				this.pickerWeeks = e.currentTarget.dataset.index;
			},
			onSelectMonth(e) {
				this.pickerMonth = e.currentTarget.dataset.item;
			},
			// 日期选择事件
			selectDateEvent(index, item) {
				this.dateActive = index
				this.selectDate = item.date
				this.initOnload()
			},

			// 时间选择事件
			selectTimeEvent(index, item) {
				if (item.disable) {
					return
				}

				this.timeActive = index
				this.selectTime = item.seltime
				this.orderDateTime = `${this.selectDate} ${item.seltime}`

			},

			// 选择时间段
			handleSelectQuantum(index, item) {
				if (item.disable) {
					return
				}

				function clearTime() {
					this.timeQuanBeginIndex = index
					this.timeQuanBegin = item.time
					this.timeQuanEnd = ""
				}

				if (!this.timeQuanBegin) {
					clearTime.call(this)
					return
				}
				if (!this.timeQuanEnd && this.timeQuanBegin) {
					let isDisble = false
					let start = this.timeQuanBeginIndex
					let end = index
					start > end && ([start, end] = [end, start])
					for (let i = start + 1; i < end; i++) {
						if (this.timeArr[i].disable) {
							isDisble = true
							clearTime.call(this)
							return
						}
					}
					if (!isDisble) {
						for (let i = start + 1; i < end; i++) {
							this.timeArr[i].isInclude = true
						}
					}
					this.timeQuanEnd = item.time
					return
				}

				if (this.timeQuanBegin && this.timeQuanEnd) {
					this.timeArr.forEach(t => {
						t.isInclude = false
					})
					clearTime.call(this)
				}

			},
			handleChange() {
				this.timeQuanBegin > this.timeQuanEnd && ([this.timeQuanBegin, this.timeQuanEnd] = [this.timeQuanEnd, this
					.timeQuanBegin
				])
			},
			handleSubmit() {
				var _this = this;
				var timesdate;
				if (_this.timestype == 1) {
					timesdate = _this.pickerMonth;
				} else {
					timesdate = _this.pickerWeeks + 1;
				}

				_this.$request.post('order.yuyuetime', {
					id: _this.id,
					timestype: _this.timestype,
					timesdate: timesdate,
					servicetime: _this.orderDateTime
				}).then(res => {
					if (res.errno == 0) {
						uni.showModal({
							title: '提示',
							content: '提交成功！',
							showCancel: false,
							//是否显示取消按钮 
							success: function(res) {
								if (res.cancel) { //点击取消,默认隐藏弹框
								} else {
									_this.tui.href('/pages/my/myOrder/myTimes');
								}
							}
						});

					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.panel {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 20rpx 20rpx 0 20rpx;

		&-body {
			margin-top: 20rpx;
			padding: 20rpx 0 0 0;
			overflow: hidden;

			>button {
				width: 10%;
				display: block;
				float: left;
				margin-top: 20rpx;
				margin-left: 2%;
				margin-right: 2%;
				border: #999999 solid 1px;
				padding: 0 20rpx;
				border-radius: 0;

				&:after {
					display: none;
				}
			}
		}

		&-weeks {
			margin-top: 20rpx;
			padding: 10rpx 0 0 0;
			overflow: hidden;

			>button {
				width: 13%;
				display: block;
				float: left;
				margin: 0 10rpx 10rpx 0;
				border: #999999 solid 1px;
				padding: 0 20rpx;
				border-radius: 0;

				&:after {
					display: none;
				}
			}
		}
	}

	.container {

		view,
		text,
		image {
			box-sizing: border-box;
		}

		scroll-view {
			width: 100%;
			white-space: nowrap;
			height: 75px;
			background-color: #fff;
			position: relative;
			padding-top: 10px;

			// margin-top:10px;
			&::after {
				background: #e5e5e5;
				content: '';
				display: block;
				width: 100%;
				height: 1px;
				position: absolute;
				bottom: 0;
				left: 0;
				transform: scaleY(0.5);

			}

			.flex-box {
				display: inline-block;
				height: 60px;
				width: 25%;
				margin: 0 7rpx 0 7rpx;
				box-sizing: border-box;

				&.active {
					.date-box {
						border: none;

						.days {
							font-weight: bold;
							color: #818181;
						}

						.date {
							font-weight: bold;
							color: #818181;
						}
					}
				}

				.date-box {
					border: none;
					display: flex;
					height: 50px;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					font-size: 30upx;
					color: rgba(129, 129, 129, 1);

					.date {
						font-weight: bold;
						color: #818181;
						font-size: 30upx;

					}
				}
			}

		}

		.weeks-box {
			padding-left: 20upx;
			padding-right: 20upx;
			padding-top: 60upx;
			background-color: #fff;
		}

		.time-box {
			padding: 28upx 12upx 26upx;
			display: flex;
			flex-wrap: wrap;
			// margin-top:10px;
			background-color: #fff;

			.item {
				width: 33%;
				padding: 0 9upx;
				margin: 10px 0;

				&-box {
					width: 100%;
					height: 154upx;
					padding: 0 10upx;
					background: #fff;
					color: #333;
					border: 1px solid #EEEEEE;
					font-size: 28upx;
					border-radius: 10upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					&.disable {
						background: #F1F3F6 !important;
						color: #999 !important;
						// border: 1px solid #EEEEEE;
					}

					&.active {
						// background: #0094D7;
						border: 1px solid #FB5D6B;
						font-weight: bold;
					}

					.all {
						font-size: 22upx;
						padding-top: 5px;
					}
				}
			}
		}

	}

	page {
		height: 100%;
	}

	.content {
		text-align: center;
		height: 100%;
	}

	/* 两个按钮 */
	.bottom {
		display: flex;
		flex-direction: row;
		position: fixed;
		bottom: 8px;
		top: auto;
		left: 0px;
		width: 100%;
		background-color: #fff;
	}

	.show-time {
		width: 70%;
		height: 47px;
		color: #505050;
		background-color: rgba(255, 255, 255, 1);
		font-size: 15px;
		line-height: 47px;
		text-align: center;
	}

	.submit-btn {
		width: 25%;
		height: 40px;
		color: white;
		background-color: #ff0000;
		font-size: 15px;
		line-height: 40px;
		text-align: center;
		margin: auto;
		padding: 0;
	}

	.fontw {
		font-weight: bold;
	}

	.borderb {
		border-bottom: 2px solid #FB4B5C;
	}
</style>
