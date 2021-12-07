<template>
	<view>
		<button class="btn" @click="flag=0" :class="{'active':flag==0}">原密码验证</button>
		<button class="btn" @click="flag=1" :class="{'active':flag==1}">短信验证</button>
		<view class="page-block" style="margin-top: 30rpx;" v-show="flag==0">
			<form @submit="pwdSubmit">
				<view class="info-wapper">
					<label class="words-lbl">原密码</label>
					<input type="text" v-model="pwdSubmitData.oldpassword" password class="input" placeholder="请输入原密码" placeholder-class="graywords" />
				</view>
				<view class="info-wapper">
					<label class="words-lbl">新密码</label>
					<input type="text" v-model="pwdSubmitData.newpassword" password class="input" placeholder="请输入新密码" placeholder-class="graywords" />
				</view>
				<view class="info-wapper">
					<label class="words-lbl">新密码</label>
					<input type="text" v-model="againNewpassword" password class="input" placeholder="请再次输入新密码" placeholder-class="graywords" />
				</view>
				<button type="primary" form-type="submit" style="margin-top: 30rpx;width: 90%;">修改密码</button>
			</form>
		</view>
		<view class="page-block" v-show="flag==1" style="margin-top: 30rpx;">
			<form @submit="phoneSubmit">
				<view class="info-wapper">
					<label class="words-lbl">手机号</label>
					<input type="text" v-model="phoneSubmitData.phone" class="input" placeholder="请输入手机号" placeholder-class="graywords" @input="surePhone" />
				</view>
				<view class="info-wapper">
					<label class="words-lbl">验证码</label>
					<input type="text" v-model="phoneSubmitData.code" class="input code" placeholder="请输入验证码" placeholder-class="graywords" />
					<button type="warn" class="btn-code" :disabled="codeClick" @click="getCode">{{btnMsg}}</button>
				</view>
				<view class="info-wapper">
					<label class="words-lbl">新密码</label>
					<input type="text" v-model="phoneSubmitData.newpassword" password class="input" placeholder="请输入新密码" placeholder-class="graywords" />
				</view>
				<button type="primary" form-type="submit" style="margin-top: 30rpx;width: 90%;">修改密码</button>
			</form>
		</view>
		<view>{{receiveCode}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: 1,
				codeClick: true,
				btnMsg: '获取验证码',
				num: 61,
				timer: null,
				pwdSubmitData: {
					oldpassword: '',
					newpassword: ''
				},
				againNewpassword: '',
				phoneSubmitData: {
					phone: '',
					code: '',
					newpassword: ''
				},
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
			getCode(){
				this.codeClick = true
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/sendCode`,
						method: 'POST',
						data: {
							phone: this.phoneSubmitData.phone
						},
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code == 200) {
								this.receiveCode = res.data.codeNum
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
				if (/^1[3-9]\d{9}$/.test(parseInt(e.detail.value))){
					this.codeClick = false
				}else {
					this.codeClick = true
				}
			},
			pwdSubmit(){
				let token = sessionStorage.getItem("token")
				if(this.pwdSubmitData.newpassword == this.againNewpassword) {
					if(token!=null && token!=undefined && token!='') {
						uni.request({
							url: `${this.serverUrl}/user/setPwd1`,
							method: 'POST',
							data: this.pwdSubmitData,
							header: {
								'authorization': 'Bearer '+token
							},
							success: (res) => {
								if(res.data.code === 200) {
									uni.showToast({
										title: res.data.msg,
										icon: 'success',
										mask: true,
										duration: 1000
									})
								}
							},
							complete: () => {
								this.pwdSubmitData.oldpassword = this.pwdSubmitData.newpassword = this.againNewpassword = ''
							}
						})
					}
				}else {
					uni.showToast({
						title: '两次密码输入不一致',
						icon: 'none',
						mask: true,
						duration: 2000
					})
				}
			},
			phoneSubmit(){
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/setPwd2`,
						method: 'POST',
						data: this.phoneSubmitData,
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code == 200) {
								uni.showToast({
									title: '修改密码成功',
									icon: 'success',
									mask: true,
									duration: 1000
								})
							}else {
								uni.showToast({
									title: res.data.msg,
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
							this.codeNum = this.phoneSubmitData.phone = this.phoneSubmitData.code = this.phoneSubmitData.newpassword = ''
						}
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	.btn {
		width: 44%;
		display: inline-block;
		margin: 20rpx;
		font-size: 20px;
	}
	.active {
		background-color: #fda618;
		font-weight: bold;
	}
	.page-block {
		border-top: 1px solid #dbdbda;
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
