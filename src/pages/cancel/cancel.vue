<template>
	<view class="page-block">
		<form @submit="phoneSubmit">
			<view class="info-wapper">
				<label class="words-lbl">原密码</label>
				<input type="text" password="" class="input" placeholder="请输入密码" placeholder-class="graywords" @input="surePhone" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">手机号</label>
				<input type="text" class="input" placeholder="请输入手机号" placeholder-class="graywords" @input="surePhone" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">验证码</label>
				<input type="text" class="input code" placeholder="请输入验证码" placeholder-class="graywords" />
				<button type="warn" class="btn-code" :disabled="codeClick" @click.once="getCode">{{btnMsg}}</button>
			</view>
			<button type="primary" form-type="submit" style="margin-top: 30rpx;width: 90%;">注销帐号</button>
		</form>
		<view class="cancel"> 暂不开放注销功能~ </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeClick: true,
				btnMsg: '获取验证码',
				num: 61,
				timer: null
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
				this.timer = setInterval(()=>{
					this.num -= 1
					this.btnMsg = `获取中(${this.num})`
					if(this.num == 0) {
						this.btnMsg = `已获取`
						clearInterval(this.timer)
					}
				},1000)
				
			},
			surePhone(e){
				if (/^1[3-9]\d{9}$/.test(parseInt(e.detail.value))){
					this.codeClick = false
				}else {
					this.codeClick = true
				}
			},
			phoneSubmit(){
				uni.showModal({
					title: '注销帐号',
					content: '你确定要注销该帐号吗？',
					success: function (res) {
						if (res.confirm) {
							uni.switchTab({
								url:"../mine/mine"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page-block {
		padding-top: 20rpx;
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
	.cancel {
		text-align: center;
		margin-top: 100rpx;
		font-size: 24px;
		font-weight: bold;
		color: red;
	}
</style>
