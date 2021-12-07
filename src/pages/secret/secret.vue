<template>
	<view class="page">
		<view class="c-item page-block">
			<view class="c-word">黑名单</view>
			<image src="../../static/ico/right.png" class="c-icon"></image>
		</view>
		<view class="c-item page-block">
			<view class="c-word">个人信息保护设置</view>
			<image src="../../static/ico/right.png" class="c-icon"></image>
		</view>
		<view class="item page-block">
			<view class="i-top">
				<view class="c-word">广告过滤</view>
				<switch checked="true" />
			</view>
			<view class="i-bottom">
				智能过滤网站广告，为你节省更多流量
			</view>
		</view>
		<view class="item page-block">
			<view class="i-top">
				<view class="c-word">允许推荐给可能认识的人</view>
				<switch />
			</view>
			<view class="i-bottom">
				关闭后，不会因为你们认识或对方通讯录中存储了你的手机号码，而将你和你的内容推荐给对方
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.page {
		height: 1227rpx;
		background-color: #f7f7f7;
		padding-top: 20rpx;
	}
	.c-item {
		height: 100rpx;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		padding: 20rpx 25rpx 0;
		justify-content: space-between;
		border-bottom: 1px solid #dbdbdb;
		margin-bottom: 20rpx;
		.c-icon {
			width: 40rpx;
			height: 40rpx;
			color: #8a8a8a;
			margin-top: 8rpx;
		}
		.c-word {
			font-size: 18px;
			color: #707070;
			font-weight: bold;
			letter-spacing: 2rpx;
		}
	}
	.item {
		display: flex;
		flex-direction: column;
		padding: 30rpx 20rpx;
		margin-bottom: 20rpx;
		.i-top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: 18px;
			color: #707070;
			font-weight: bold;
			letter-spacing: 2rpx;
			margin-bottom: 10rpx;
		}
		.i-bottom {
			color: #8a8a8a;
			font-weight: bold;
			margin-top: 10rpx;
		}
	}
</style>
