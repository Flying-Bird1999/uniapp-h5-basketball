<template>
	<view class="page">
		<view class="container page-block">
			<view class="c-item" @click="toMeInfo">
				<view class="c-word">编辑资料</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item" @click="toSafety">
				<view class="c-word">帐号安全</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item" @click="toSecret">
				<view class="c-word">个人隐私</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
		</view>
		<view class="container page-block" style="margin-top: 20rpx;">
			<view class="c-item" @click="edition">
				<view class="c-word">检查版本</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item">
				<view class="c-word">关于软件</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
		</view>
		<view class="container page-block" style="margin-top: 20rpx;">
			<view class="c-item" @click="logout">
				<view class="c-word logout">退出登陆</view>
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
			toMeInfo(){
				uni.navigateTo({
					url: '../meInfo/meInfo'
				})
			},
			toSafety(){
				uni.navigateTo({
					url: '../safety/safety'
				})
			},
			toSecret(){
				uni.navigateTo({
					url: '../secret/secret'
				})
			},
			edition(){
				uni.showToast({
					title: '已经是最新版本',
					duration: 1000,
					mask: true,
					icon: 'none'
				})
			},
			logout(){
				sessionStorage.removeItem('token')
				uni.switchTab({
					url: '../mine/mine'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 1227rpx;
		background-color: #f7f7f7;
		padding-top: 20rpx;
	}
	.container {
		.c-item {
			height: 100rpx;
			display: flex;
			flex-direction: row;
			box-sizing: border-box;
			padding: 20rpx 25rpx 0;
			justify-content: space-between;
			border-bottom: 1px solid #dbdbdb;
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
				margin-right: 390rpx;
				letter-spacing: 2rpx;
			}
			.logout {
				margin: 0 0 0 250rpx;
				font-size: 19px;
				color: #f12219;
			}
		}
	}
</style>
