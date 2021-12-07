<template>
	<view class="page">
		<view class="sign" v-if="isSign">
			<image src="../../static/ico/gou.png" class="sign-icon"></image>
			<view class="sign-success">您已成功报名本次赛事</view>
			<view class="sign-words">姓名：{{user.name}}</view>
			<view class="sign-words">身份：{{user.identity | identityFilter}}</view>
			<view class="sign-words">队伍：{{user.teamName}}</view>
			<button class="sign-btn" type="primary" @click="toSignInfo">查看队伍详情信息</button>
		</view>
		<view class="sign-n" v-else>
			非参赛球员，已无更多内容~
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSign: false,
				user: {}
			}
		},
		methods: {
			toSignInfo(){
				uni.navigateTo({
					url: '../signInfo/signInfo'
				})
			}
		},
		onLoad() {
			// 获取登录用户报名的信息
			let token = sessionStorage.getItem("token")
			if(token!=null && token!=undefined && token!='') {
				uni.request({
					url: `${this.serverUrl}/user/signed`,
					method: 'POST',
					header: {
						'authorization': 'Bearer '+token
					},
					success: (res) => {
						if(res.data.code === 200) {
							this.isSign = true
							this.user = res.data.data
						}
					}
				})
			}
		},
		filters: {
			identityFilter(identity){
				switch(identity) {
					case '1': return '队长'; break;
					case '0': return '队员'; break;
					default: return '观众'
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 200rpx;
	}
	.sign {
		display: flex;
		flex-direction: column;
		.sign-icon {
			width: 160rpx;
			height: 160rpx;
			align-self: center;
		}
		.sign-success {
			font-size: 24px;
			font-weight: bold;
			margin: 30rpx 0;
		}
		.sign-words {
			margin-left: 100rpx;
			margin-bottom: 8rpx;
			font-size: 18px;
			color: #707070;
			font-weight: bold;
		}
		.sign-btn {
			margin-top: 30rpx;
			letter-spacing: 2rpx;
		}
	}
	.sign-n {
		font-size: 18px;
		color: #707070;
		margin-top: -100rpx;
	}
</style>
