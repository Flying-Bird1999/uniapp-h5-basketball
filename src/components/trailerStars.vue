<template>
	<view class="trailerStars-wrapper">
		<image 
			v-for="yellow in yellowScore"
			src="../static/ico/star-yellow.png" 
			class="star-icon"></image>
		<image 
			v-for="gray in grayScore"
			src="../static/ico/star.png" 
			class="star-icon"></image>
		<view class="score" v-if="showNum == 1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"trailerStars",
		data() {
			return {
				yellowScore: 0,
				grayScore: 5
			};
		},
		props: {
			innerScore: 0,
			showNum: 0
		},
		created() {
			var tempScore = 0;
			if(this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
				tempScore = this.innerScore / 2
			}
			this.yellowScore = parseInt(tempScore)
			this.grayScore = 5 - parseInt(tempScore)
		}
	}
</script>

<style lang="scss">
	.trailerStars-wrapper {
		display: flex;
		flex-direction: row;
		.star-icon {
			width: 20rpx;
			height: 20rpx;
			margin-top: 6rpx;
		}
		.score {
			font-size: 12px;
			color: grey;
			margin-left: 8rpx;
		}
	}
</style>
