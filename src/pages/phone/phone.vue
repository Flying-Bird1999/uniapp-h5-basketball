<template>
	<view class="page-block">
		<view class="p-title">输入要绑定的手机号</view>
		<view class="p-con">绑定之后，可以用当前手机号与密码进行登录</view>
		<form @submit="phoneSubmit">
			<view class="info-wapper">
				<label class="words-lbl">手机号</label>
				<input type="text" v-model="phone" class="input" placeholder="请输入手机号" placeholder-class="graywords" @input="surePhone" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">验证码</label>
				<input type="text" v-model="codeNum" class="input code" placeholder="请输入验证码" placeholder-class="graywords" />
				<button type="warn" class="btn-code" :disabled="codeClick" @click="getCode">{{btnMsg}}</button>
			</view>
			<button type="primary" form-type="submit" style="margin-top: 30rpx;width: 90%;">绑定手机号</button>
		</form>
		<view>{{receiveCode}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeClick: true,
				btnMsg: '获取验证码',
				num: 61,
				timer: null,
				phone: '',
				codeNum: '',
				receiveCode: ''
			}
		},
		onLoad() {
			if(this.num == 0) {
				this.num = 0
				clearInterval(this.timer)
			}
		},
		methods: {
			// 发送请求获取验证码
			getCode(){
				this.codeClick = true
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/sendCode`,
						method: 'POST',
						data: {
							phone: this.phone
						},
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code == 200) {
								this.receiveCode = res.data.codeNum
								// 获取验证码之后，开启60秒倒计时的定时器
								this.timer = setInterval(()=>{
									this.num -= 1
									this.btnMsg = `获取中(${this.num})`
									if(this.num == 0) {
										this.btnMsg = `获取验证码`
										this.codeClick = false
										this.num = 61
										clearInterval(this.timer)
									}
								},1000)
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
				}
			},
			surePhone(e){
				// 用正则表达式进行判断 决定 按钮是否能按下
				if (/^1[3-9]\d{9}$/.test(parseInt(e.detail.value))){
					this.codeClick = false
				}else {
					this.codeClick = true
				}
			},
			// 提交数据，绑定手机号
			phoneSubmit(){
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/bindPhone`,
						method: 'POST',
						data: {
							phone: this.phone,
							code: this.codeNum
						},
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code == 200) {
								uni.showToast({
									title: '绑定手机号成功',
									icon: 'success',
									mask: true,
									duration: 1000
								})
							}else {
								uni.showToast({
									title: '验证码错误',
									icon: 'none',
									mask: true,
									duration: 1000
								})
							}
						},
						complete: () => {
							this.btnMsg = `获取验证码`
							this.codeClick = true
							clearInterval(this.timer)
							this.phone = this.codeNum = this.receiveCode = ''
						}
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
	.page-block {
		padding-top: 20rpx;
	}
	.p-title {
		font-size: 20px;
		font-weight: bold;
		margin: 30rpx;
		color: #515151;
	}
	.p-con {
		margin: -15rpx 0 20rpx 30rpx;
		color: #707070;
		font-weight: bold;
	}
	.info-wapper {
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 20rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #dbdbda;
		font-size: 20px;
		.words-lbl {
			color: #808080;
			font-weight: bold;
		}
		.input {
			width: 500rpx;
			height: 90rpx;
			margin-left: 30rpx;
			font-size: 19px;
		}
		.code {
			width: 300rpx;
		}
		.btn-code {
			width: 240rpx;
			//font-size: 14px;
		}
		.graywords {
			color: #a7a7a7;
		} 
	}
</style>
