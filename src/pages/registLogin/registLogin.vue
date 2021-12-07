<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/ico/boy.png" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">帐号</label>
				<input type="text" v-model="user.username" name="username" class="input" placeholder="请输入用户名/手机号/邮箱" placeholder-class="graywords" />
			</view>
			
			<view class="info-wapper" style="margin-top: 40rpx;">
				<label class="words-lbl">密码</label>
				<input type="text" v-model="user.password" password="true" name="password" class="input" placeholder="请输入密码" placeholder-class="graywords" />
			</view>
			<view class="regist" @click="toRegister">没有账号？<text>点击注册</text></view>
			<button type="primary" form-type="submit" style="margin-top: 60rpx;width: 90%;">登陆</button>
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			formSubmit(){
				uni.request({
					url: `${this.serverUrl}/user/login`,
					method: 'POST',
					data: this.user,
					success: (res) => {
						if(res.data.code === 200) {
							// uni.setStorageSync('token',res.data.token)
							sessionStorage.setItem('token',res.data.token)
							uni.switchTab({
								url: '../mine/mine'
							})
						}else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								mask: true,
								duration: 1000
							})
						}
					}
				})
			},
			toRegister(){
				uni.navigateTo({
					url: '../register/register'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "registLogin.scss";
</style>
