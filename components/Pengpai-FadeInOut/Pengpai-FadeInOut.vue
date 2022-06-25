<template>
	<view>
		<view
			ref="ani"
			:animation="animationData"
			class="message"
			:style="{ top: top + 'px', left: left + 'px' }"
			v-if="show"
		>
			<view class="round bg-gradual-orange flex justify-start shadow" style="padding: 3px;">
				<view class="cu-avatar cu-a-sm round" :style="{ backgroundImage: `url(${info.touxiang})` }">
					<!-- #ifdef APP-NVUE -->
					<image :src="info.touxiang" class="avatarimg"></image>
					<!-- #endif -->
				</view>
				<view class="padding-lr-sm flex align-center">
					<text class="text-sm">{{ info.content }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation');
// #endif
export default {
	name: 'Pengpai-FadeInOut',
	props: {
		//持续时间
		duration: {
			type: Number,
			default: 2600
		},
		//停留时间
		wait: {
			type: Number,
			default: 3000
		},
		//顶部距离px
		top: {
			type: Number,
			default: 160
		},
		//左边距离px
		left: {
			type: Number,
			default: 10
		},
		//动画半径
		radius: {
			type: Number,
			default: 30
		},
		//数据
		info: {
			type: [Array,Object],
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			animationData: {},
			animationNumber:{},
			show: true
		};
	},
	mounted(){
		this.donghua();
	},
	watch:{
		
	},
	methods: {
		donghua() {
			//进入
			// #ifndef APP-NVUE
			this.animationData = uni
				.createAnimation({
					duration: this.duration / 2,
					timingFunction: 'ease'
				})
				.top(this.top - this.radius)
				.opacity(0.9)
				.step()
				.export();
			// #endif

			// #ifdef APP-NVUE
			if (!this.$refs['ani']) return;
			animation.transition(
				this.$refs['ani'].ref,
				{
					styles: {
						transform: `translateY(-${this.radius/2}px)`,
						opacity: 1
					},
					duration: this.duration/2,
					timingFunction: 'linear',
					needLayout: false,
					delay: 0
				}
			);
			// #endif

			//停留
			setTimeout(() => {
				//消失
				// #ifndef APP-NVUE
				this.animationData = uni
					.createAnimation({
						duration: this.duration / 2,
						timingFunction: 'ease'
					})
					.top(this.top - this.radius * 2)
					.opacity(0)
					.step()
					.export();
				// #endif
				
				// #ifdef APP-NVUE
				if (!this.$refs['ani']) return;
				animation.transition(
					this.$refs['ani'].ref,
					{
						styles: {
							transform: `translateY(-${this.radius}px)`,
							opacity: 0
						},
						duration: this.duration/2,
						timingFunction: 'linear',
						needLayout: false,
						delay: 0
					}
				);
				// #endif
			}, this.wait);
		}
	}
};
</script>

<style scoped>
.message {
	position: fixed;
	z-index: 99999;
	opacity: 9;
}
.round {
	border-radius: 5000px;
}
.bg-gradual-orange {
	/* #ifndef APP-NVUE */
	background-image: linear-gradient(45deg, #222222, #333333);
	/* #endif */
	/* #ifdef APP-NVUE */
	background-image: linear-gradient(to bottom right, #222222, #333333);
	/* #endif */
	color: #ffffff;
}
.shadow {
	box-shadow: 4px 4px 5px rgba(217, 109, 26, 0.2);
}
.flex {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
}
.justify-start {
	justify-content: flex-start;
}
.cu-avatar {
	/* #ifndef APP-NVUE */
	font-variant: small-caps;
	display: inline-flex;
	white-space: nowrap;
	background-size: cover;
	background-position: center;
	vertical-align: middle;
	/* #endif */
	margin: 0;
	padding: 0;
	text-align: center;
	justify-content: center;
	align-items: center;
	background-color: #ccc;
	color: #ffffff;
	position: relative;
	width: 20px;
	height: 20px;
	font-size: 1.5em;
}

/* #ifdef APP-NVUE */
.avatarimg {
	width: 20px;
	height: 20px;
	border-radius: 50px;
}
/* #endif */

.cu-a-sm {
	width: 20px;
	height: 20px;
	font-size: 0.8em;
}
.padding-lr-sm {
	padding-left: 20upx;
	padding-right: 20upx;
}
.align-center {
	align-items: center;
}
.margin-left-xs {
	margin-left: 10upx;
}
.text-bold {
	font-weight: bold;
}
.margin-lr-sm {
	margin-left: 20upx;
	margin-right: 20upx;
}
.text-sm {
	font-size: 12px;
	color: #ffffff;
}
</style>
