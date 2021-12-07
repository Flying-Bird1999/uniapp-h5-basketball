<template>
	<view class="page-block hot-team">
		<view class="hot-title-wrapper">
			<image :src="url" class="hot-ico" v-if="url"></image>
			<view class="hot-title">
				{{title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"hotTitle",
		data() {
			return {
				
			};
		},
		props: ['url', 'title'],
	}
</script>

<style lang="scss">
.hot-team {
	margin-top: 12rpx;
	padding: 20rpx;
	.hot-title-wrapper {
		display: flex;
		flex-direction: row;
		.hot-ico {
			height: 35rpx;
			width: 35rpx;
			margin-top: 12rpx;
		}
		.hot-title {
			font-size: 20px;
			margin-left: 20rpx;
			font-weight: bold;
		}
	}
}
</style>
