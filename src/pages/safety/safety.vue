<template>
	<view class="page">
		<view class="container page-block">
			<view class="c-item" @click="toPhone">
				<view class="c-word">手机号绑定</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item">
				<view class="c-word">第三方帐号绑定</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item" @click="toChangePwd">
				<view class="c-word">修改密码</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item" @click="toCancel">
				<view class="c-word">帐号注销</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
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
			toPhone(){
				uni.navigateTo({
					url: '../phone/phone'
				})
			},
			toChangePwd(){
				uni.navigateTo({
					url: '../changePwd/changePwd'
				})
			},
			toCancel(){
				uni.navigateTo({
					url: '../cancel/cancel'
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
		}
	}
</style>
