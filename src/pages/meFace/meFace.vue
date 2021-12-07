<template>
	<view class="page page-fill">
		<view class="pending-wapper">
			<image id="face" :src="tempFace" class="pending-face" mode="scaleToFill"></image>
		</view>
		
		<view class="notice">
			<view class="notice-words">
				* 请从相册中选择等比宽高的图片哦~
			</view>
		</view>
		
		<view class="footer-opertor">
			<view class="opertor-words" @click="changePendingFace">
				重新选择
			</view>
			<view class="opertor-words" @click="upload">
				确认上传
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFace: ''
			}
		},
		onLoad(params) {
			this.tempFace = params.tempFilePath
		},
		methods: {
			// 重新选择 改变图片的路径
			changePendingFace(){
				var me = this
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album"],
					success(res) {
						me.tempFace = res.tempFilePaths[0]
					}
				})
			},
			// 上传，发送请求上传图片
			upload(){
				let me = this
				let token = sessionStorage.getItem("token")
				uni.showLoading({
					mask: true,
					title: '上传中，请稍后'
				})
				uni.uploadFile({
					url: `${this.serverUrl}/user/editUserImg`,
					filePath: me.tempFace,
					name: 'file',
					header: {
						'authorization': 'Bearer '+token
					},
					success(res) {
						let resData = JSON.parse(res.data)
						if(resData.code == 200) {
							uni.redirectTo({
								url:'../meInfo/meInfo'
							})
						}else {
							uni.showToast({
								title: '头像修改失败',
								duration: 2000
							})
						}
					},
					complete(){
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style>
	.page-fill {
		width: 100%;
		height: 100%;
		position: absolute;
		background: black;
	}
	.pending-wapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		
		margin-top: 40rpx;
	}
	.pending-face {
		width: 600rpx;
		height: 600rpx;
	}
	.notice {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.notice-words {
		color: gray;
		font-size: 13px;
		margin-top: 30rpx;
		width: 600rpx;
	}
	
	.footer-opertor {
		position: fixed;
		bottom: 0;
		
		border-top: #515050 solid 1px;
		width: 100%;
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
		padding: 30rpx;
	}
	.opertor-words {
		color: #e8e5e5;
		font-size: 16px;
		width: 200rpx;
	}
</style>
