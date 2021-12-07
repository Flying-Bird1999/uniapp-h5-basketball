<template>
	<view class="page-block">
		<form @submit="formSubmit">
			<view class="o-title">具体反馈内容</view>
			<textarea 
				placeholder="请如实填写您想反馈的问题以使我们提供更好的帮助" 
				placeholder-class="graywords"
				class="o-text"
				v-model="con.context">
			</textarea>
			<view class="o-wapper">
				<label class="words-lbl">联系方式</label>
				<input v-model="con.contact" type="text" class="input" placeholder="邮箱/手机号" placeholder-class="graywords" />
			</view>
			<label class="o-radio">
				<radio :checked="flag"/><text>允许工作人员在48小时内联系我</text>
			</label>
			<button form-type="submit" :disabled="!flag" type="primary" class="o-btn">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: true,
				con: {
					context: '',
					contact: ''
				}
			}
		},
		methods: {
			// 发送请求,将反馈的内容发给后端
			formSubmit(){
				let token = uni.getStorageSync("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/opinion`,
						method: 'POST',
						data: this.con,
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code === 200) {
								uni.showToast({
									title: '提交成功',
									duration: 1000,
									mask: true,
									icon: 'success'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page-block {
		padding: 30rpx;
	}
	.o-title {
		font-size: 20px;
		color: #2c2c2c;
		border-bottom: 1px solid #dbdbda;
		padding-bottom: 25rpx;
		margin: 10rpx 0;
	}
	.o-text {
		width: 100%;
		height: 400rpx;
		font-size: 18px;
		border-bottom: 1px solid #dbdbda;
	}
	.o-wapper {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #dbdbda;
		padding: 25rpx 0;
		margin-bottom: 40rpx;
		.words-lbl {
			font-size: 20px;
			color: #2c2c2c;
			margin-left: 8rpx;
		}
		.input {
			padding-top: 5rpx;
			font-size: 19px;
			width: 450rpx;
			margin-left: 40rpx;
		}
		.graywords {
			color: #a7a7a7;
		} 
	}
	.o-radio {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.o-btn {
		margin-top: 40rpx;
		width: 70%;
	}
</style>
