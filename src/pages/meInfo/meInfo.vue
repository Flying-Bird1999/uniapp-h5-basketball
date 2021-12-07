<template>
	<view class="page page-block">
		<form @submit="formSubmit">
			<view class="info-face">
				<image @click="changeFace" :src="user.userpic" class="face"></image>
				<image @click="changeFace" src="../../static/ico/相机.png" class="camera"></image>
				<view @click="changeFace" class="changeFace">点击更换头像</view>
			</view>
			<view class="info-wapper">
				<label class="words-lbl">战队</label>
				<input type="text" disabled v-model="user.teamName" class="input" placeholder="您暂未加入任何战队" placeholder-class="graywords" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">用户名</label>
				<input type="text" v-model="user.username" class="input" placeholder="请输入用户名" placeholder-class="graywords" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">邮箱</label>
				<input type="text" v-model="user.email" class="input" placeholder="请输入邮箱" placeholder-class="graywords" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">名字</label>
				<input type="text" v-model="user.name" class="input" placeholder="请输入名字" placeholder-class="graywords" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">班级</label>
				<input type="text" v-model="user.class" class="input" placeholder="请输入班级" placeholder-class="graywords" />
			</view>
			<view class="info-wapper">
				<label class="words-lbl">性别</label>
				<!-- <input type="text" value="男" class="input" placeholder="请输入性别" placeholder-class="graywords" /> -->
				<radio-group name="radio" style="margin-left: 40rpx;" @change="sexChange">
					<label>
						<radio value="1" :checked="user.sex == 1" /><text>男</text>
					</label>
					<label style="margin-left: 40rpx;">
						<radio value="0" :checked="user.sex == 0" /><text>女</text>
					</label>
				</radio-group>
			</view>
			<view class="info-wapper">
				<label class="words-lbl">生日</label>
				<picker style="width: 600rpx;" mode="date" @change="dateChange">
					<view style="margin-left: 30rpx;">{{user.birthday}}</view>
				</picker>
			</view>
			<button type="primary" form-type="submit" style="margin-top: 50rpx;width: 90%;">修改资料</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			}
		},
		onLoad() {
			let token = sessionStorage.getItem("token")
			if(token!=null && token!=undefined && token!='') {
				// 将个人资料进行展示
				uni.request({
					url: `${this.serverUrl}/user/getUserInfo`,
					method: 'POST',
					header: {
						'authorization': 'Bearer '+token
					},
					success: (res) => {
						if(res.data.code == 200) {
							this.user = res.data.data
							// 将生日的时间戳进行形式转换
							this.user.birthday = this.dateFilter(this.user.birthday)
						}
					}
				})
			}
		},
		methods: {
			dateFilter(time){
				// 当用户生日未设置时，依旧设置为 null
				// 当用户生日已设置时，将时间戳的格式改为：1999-07-27
				// 只有这样转换，才能在修改资料时，将该数据格式发送给后端
				let d = new Date(time)
				let times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate()))
				switch(time) {
					case null: return null; break;
					//case '': return null; break;
					default: return times; break;
				}
			},
			// 修改头像
			changeFace(){
				let me = this
				uni.showActionSheet({
					itemList: ["查看我的头像", "从相册选择上传"],
					success(res) {
						let index = res.tapIndex
						// "查看我的头像" 预览图片
						if(index == 0) {
							var faceArr = []
							faceArr.push(me.user.userpic)
							uni.previewImage({
								urls: faceArr,
								current: faceArr[index]
							})
						}else if(index == 1) {
							// "从相册选择上传"
							uni.chooseImage({
								count: 1,
								sizeType: ['compressed'],
								sourceType: ['album'],
								success(res) {
									// 上传图片的地址
									let tempFilePath = res.tempFilePaths[0]
									// 携带该地址跳转到meFace页面
									uni.redirectTo({
										url: '../meFace/meFace?tempFilePath='+tempFilePath
									})
								}
							})
						}
					}
				})
			},
			sexChange(e){
				this.user.sex = Number(e.detail.value)
			},
			dateChange(e){
				this.user.birthday = e.detail.value
			},
			// 修改资料
			formSubmit(){
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/editUserInfo`,
						method: 'POST',
						// 获取资料时，班级的健是 class
						// 修改资料时，后端要求传入的是 className
						// 所以在data中加入“className: this.user.class”
						data: {
							...this.user,
							className: this.user.class
						},
						header: {
							'authorization': 'Bearer '+token
						},
						success(res) {
							if(res.data.code == 200) {
								uni.showToast({
									title: '修改成功',
									icon: 'success',
									mask: true,
									duration: 1000
								})
							}else if(res.data.code == 400){
								uni.showToast({
									title: '修改失败',
									icon: 'none',
									mask: true,
									duration: 1000
								})
							}
						}
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	@import 'meInfo.scss'
</style>
