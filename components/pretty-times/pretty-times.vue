<template>
	<view class="content">
		<view class="container">
			<!-- 日期列表 -->
			<scroll-view class="scroll-view_H b-t b-b" scroll-x>
				<block v-for="(item,index) in dateArr" :key="index">
					<div class="flex-box" @click="selectDateEvent(index,item)" :class="{ borderb: index==dateActive}">
						<view class="date-box" :style="{color:index==dateActive?selectedTabColor:'#333'}">
							<text class="fontw">{{item.week}}</text>
							<text>{{item.date}}</text>
						</view>
					</div>
				</block>
			</scroll-view>

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
			<view class="show-time" v-if="!isMultiple">
				预约时间：{{orderDateTime}}
			</view>
			<tui-button form-type="submit" width="200rpx" height="70rpx" :size="28" type="danger" shape="circle"
				@click="handleSubmit">
				确认预约
			</tui-button>
		</view>
	</view>
</template>

<script>
	import {
		initData,
		initTime,
		timeStamp,
		currentTime
	} from '../utils/date.js'
	export default {
		name: 'times',
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			isMultiple: { //是否多选
				type: Boolean,
				default: false
			},
			disableText: { //禁用显示的文本
				type: String,
				default: "已约满"
			},
			undisableText: { //未禁用显示的文本
				type: String,
				default: "可预约"
			},
			timeInterval: { // 时间间隔，小时为单位
				type: Number,
				default: 1
			},
			selectedTabColor: { // 日期栏选中的颜色
				type: String,
				default: "#FB4B5C"
			},
			selectedItemColor: { // 时间选中的颜色
				type: String,
				default: "#FB4B5C"
			},
			beginTime: {
				type: String,
				default: "09:00:00"
			},
			endTime: {
				type: String,
				default: "19:00:00"
			},
			appointTime: { // 预约的时间
				type: Array,
				default () {
					return []
				}
			}
		},
		watch: {
			appointTime(val) {
				if (val && val.length) {
					this.initOnload()
				}
			}
		},
		data() {
			return {
				orderDateTime: '暂无选择', // 选中时间
				orderTimeArr: {}, //多选的时间
				dateArr: [], //日期数据
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
		created(props) {
			this.selectDate = this.nowDate = currentTime().date
			this.initOnload()
		},
		methods: {
			initOnload() {
				var _this = this;
				_this.dateArr = initData() // 日期栏初始化
				//_this.timeArr = initTime(_this.beginTime, _this.endTime, _this.timeInterval) //时间选项初始化
				_this.$request.post('Servicetime.index', {
					samkey: (new Date()).valueOf()
				}).then(res => {
					if (res.errno == 0) {
						_this.timeArr = res.data;


						_this.timeQuanBegin = _this.timeQuanEnd = ""

						let isFullTime = true
						_this.timeArr.forEach((item, index) => {

							//判断是当前这一天，选中时间小于当前时间则禁用

							if (_this.selectDate == _this.nowDate && currentTime().time > item.time) {
								item.disable = true
							}

							// 将预约的时间禁用
							_this.appointTime.forEach(t => {
								let [date, time] = t.split(' ')
								if (date == _this.selectDate && item.time == time) {
									item.disable = true
								}
							})

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

			// 日期选择事件
			selectDateEvent(index, item) {
				this.dateActive = index
				this.selectDate = item.date
				this.initOnload()
			},

			// 时间选择事件
			selectTimeEvent(index, item) {
				if (item.disable) return
				if (this.isMultiple) {
					item.isActive = !item.isActive
					this.timeArr = this.timeArr.slice()
					this.orderTimeArr[this.selectDate] = this.timeArr.reduce((prev, cur) => {
						cur.isActive && prev.push(cur.time)
						return prev
					}, [])
				} else {
					this.timeActive = index
					this.selectTime = item.seltime
					this.orderDateTime = `${this.selectDate} ${item.seltime}`
				}
			},

			// 选择时间段
			handleSelectQuantum(index, item) {
				if (item.disable) return

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
				if (this.isMultiple) {
					let time = []
					for (let date in this.orderTimeArr) {
						this.orderTimeArr[date].forEach(time => {
							time.push(`${date} ${time}`)
						})
					}
					this.$emit('change', time)
				} else {
					this.$emit('change', this.orderDateTime)
				}

			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './pretty-times.scss';

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
