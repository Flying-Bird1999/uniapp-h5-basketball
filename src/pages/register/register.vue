<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="info-wapper">
				<label class="words-lbl">用户名</label>
				<input type="text" v-model="user.username" name="username" class="input" placeholder="请输入用户名" placeholder-class="graywords" />
			</view>
			<view class="info-wapper" style="margin-top: 40rpx;">
				<label class="words-lbl">密码</label>
				<input type="text" v-model="user.password" password="true" name="password" class="input" placeholder="请输入密码" placeholder-class="graywords" />
			</view>
			<view class="info-wapper" style="margin-top: 40rpx;">
				<label class="words-lbl">班级</label>
				<input type="text" v-model="user.className" name="class" class="input" placeholder="请输入班级" placeholder-class="graywords" />
			</view>
			<button type="primary" form-type="submit" style="margin-top: 60rpx;width: 90%;">注册</button>
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					username: '',
					password: '',
					className: ''
				}
			}
		},
		methods: {
			formSubmit(){
				uni.request({
					url: `${this.serverUrl}/user/register`,
					method: 'POST',
					data: this.user,
					success: (res) => {
						if(res.data.code == 200) {
							uni.showToast({
								title: '恭喜您，注册成功',
								mask: true,
								duration: 1000
							})
						}
					},
					complete: () => {
						uni.navigateTo({
							url: '../registLogin/registLogin'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.body {
		border-top: solid 1px #dbdbda;
		padding: 80rpx 40rpx;
		.info-wapper {
			display: flex;
			flex-direction: row;
			justify-content: center;
			border-bottom: 1px solid #dbdbda;
			padding-bottom: 20rpx;
			.words-lbl {
				width: 100rpx;
				color: #808080;
				text-align: center;
			}
			.input {
				width: 480rpx;
				margin-left: 30rpx;
			}
			.graywords {
				color: #a7a7a7;
			} 
		}
	}
</style>
