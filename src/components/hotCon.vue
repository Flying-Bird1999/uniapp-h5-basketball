<template>
	<scroll-view scroll-x="true" class="page-block hot">
		<view class="hot-container" v-for="item in data" :key="item.id">
			<view class="hot-wrapper" v-if="data[0].class">
				<image @click="lookImg(item.judgepic)" :src="item.judgepic" class="hot-img"></image>
				<view class="hot-name hot-man">
					{{item.name}}
				</view>
				<view class="hot-name">
					{{item.class}}
				</view>
			</view>
			<view class="hot-wrapper" v-else>
				<image @click="lookImg(item.teampic)" :src="item.teampic" class="hot-img"></image>
				<view class="hot-name">
					{{item.teamName}}
				</view>
				<trailerStars :innerScore="item.score" :showNum="1" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import trailerStars from './trailerStars.vue'
	export default {
		name:"hotCon",
		data() {
			return {
				
			};
		},
		methods: {
			lookImg(url){
				let faceArr = []
				faceArr.push(url)
				uni.previewImage({
					urls: faceArr,
					current: faceArr[0]
				})
			}
		},
		components: {
			trailerStars
		},
		props: ['data']
	}
</script>

<style lang="scss">
	.hot {
		width: 100%;
		white-space: nowrap;
		.hot-container {
			display: inline-block;
			margin-left: 20rpx;
			.hot-wrapper {
				display: flex;
				flex-direction: column;
				.hot-img {
					width: 200rpx;
					height: 270rpx;
				}
				.hot-man {
					text-align: center;
				}
				.hot-name {
					width: 200rpx;
					margin-top: 10rpx;
					font-size: 14px;
					text-align: center;
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
