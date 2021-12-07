<template>
	<view class="page">
		<!-- 已登录显示 -->
		<view class="header-y page-block" v-if="userIsLogin">
			<image @click="lookImg(user.userpic)" :src="user.userpic" class="h-head"></image>
			<view class="h-message">
				<view class="h-name">
					{{user.name}}
					<text>{{user.identity | identityFilter}}</text>
				</view> 
				<view class="h-class">{{user.class}}</view>
				<view class="h-userFans page-block">
					<view class="u-fans" @click="openFollows"><text>{{followAndFans.follow}}</text>关注</view>
					<view class="u-fans" @click="openFans"><text>{{followAndFans.fans}}</text>粉丝</view>
				</view>
			</view>
			<image src="../../static/ico/settings.png" class="h-setting" @click="toSetting"></image>
		</view>
		<!-- 未登录显示 -->
		<view class="header-n page-block" v-else>
			<navigator url="../registLogin/registLogin">
				<view class="login">
					登 陆
				</view>
			</navigator>
		</view>
		
		<view class="container page-block">
			<view class="c-item" @click="toNotify">
				<image src="../../static/ico/通知.png" class="c-icon"></image>
				<view class="c-word">消息通知</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item" @click="toSign">
				<image src="../../static/ico/报名.png" class="c-icon"></image>
				<view class="c-word">报名记录</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item" @click="toTeam">
				<image src="../../static/ico/队伍.png" class="c-icon"></image>
				<view class="c-word">战绩统计</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
			<view class="c-item" @click="toOpinion">
				<image src="../../static/ico/意见.png" class="c-icon"></image>
				<view class="c-word">意见反馈</view>
				<image src="../../static/ico/right.png" class="c-icon"></image>
			</view>
		</view>
	
		<!-- 遮罩层 -->
		<view v-if="shadeShow" class="shade" @click="shade"></view>
		<!-- 关注与粉丝弹窗 -->
		<view class="followFans" :animation="animationData">
			<view class="b-title">
				<view class="t-icon"></view>
				<view class="t-word">{{ title }}</view>
			</view>
			<view class="fF_user" v-for="user in fF_arr" :key="user.id">
				<view class="fF_user-imgBorder">
					<image class="fF_user-img" :src="user.userpic"></image>
				</view>
				<view class="fF_user-username">
					<view class="fF_user-name">{{user.name}}</view>
					<view class="fF_user-identity">{{user.identity | identityFilter}}</view>
				</view>
				<button :type="title==='关注列表'?'default':'warn'" class="fF_user-btn">{{title==='关注列表'?'已关注':'回关'}}</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				userIsLogin: '', //判断用户是否已登录
				followAndFans: {},
				// flag: false,
				shadeShow: false,
				animationData: {},
				fF_arr: [],
				title: ''
			}
		},
		onShow() {
			let token = sessionStorage.getItem("token")
			// 登录状态userIsLogin 由获取到的token进行赋值
			this.userIsLogin = token?true:false
			// 获取登录用户的详情资料信息并赋值
			if(token!=null && token!=undefined && token!='') {
				uni.request({
					url: `${this.serverUrl}/user/getUserInfo`,
					method: 'POST',
					header: {
						'authorization': 'Bearer '+token
					},
					success: (res) => {
						if(res.data.code === 200) {
							this.userIsLogin = true
							//console.log(res)
							this.user = res.data.data
						}
					},
					// 这一步操作主要是为了获取用户的关注数和粉丝数
					complete: () => {
						// 由用户的username获取到用户的id (因为上一步操作是用jwt的token进行获取)
						uni.request({
							url: `${this.serverUrl}/user/getId`,
							method: 'POST',
							data: {username: this.user.username},
							success: (res) => {
								if(res.data.code === 200) {
									// 成功获取到用户id之后就可以发送请求获取登录用户的关注数和粉丝数
									uni.request({
										url: `${this.serverUrl}/user/checkFollowAndFans/${res.data.id}`,
										method: 'POST',
										success: (res) => {
											this.followAndFans = res.data.data
										}
									})
								}
							}
						})
					}
				})
			}else {
				this.userIsLogin = false
			}
			
			//在页面创建的时候创建一个临时动画对象
			this.animation = uni.createAnimation({
				timingFunction: "ease",
			})
		},
		onUnload(){
			//页面卸载的时候，清除动画数据
			this.animationData = {}
		},
		methods: {
			// 预览图片
			lookImg(url){
				let faceArr = []
				faceArr.push(url)
				uni.previewImage({
					urls: faceArr,
					current: faceArr[0]
				})
			},
			toSetting(){
				uni.navigateTo({
					url: '../setting/setting'
				})
			},
			toOpinion(){
				uni.navigateTo({
					url: '../opinion/opinion'
				})
			},
			toNotify(){
				uni.navigateTo({
					url: '../notify/notify'
				})
			},
			toSign(){
				uni.navigateTo({
					url: '../sign/sign'
				})
			},
			toTeam(){
				uni.navigateTo({
					url: '../team/team'
				})
			},
			openFollows(){
				this.shadeShow = true //显示遮罩层
				//构建动画数据，并且用过step来表示这组动画的完成
				this.animation.height(350).step({
					duration: 250
				})
				//导出动画数据到view组件，实现组件的动画效果
				this.animationData = this.animation.export()
				
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/getFollows`,
						method: 'POST',
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code === 200) {
								this.fF_arr = res.data.data
								this.title = '关注列表'
							}
						}
					})
				}
			},
			openFans(){
				this.shadeShow = true //显示遮罩层
				this.animation.height(350).step({
					duration: 250
				})
				this.animationData = this.animation.export()
				
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/getFans`,
						method: 'POST',
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code === 200) {
								this.fF_arr = res.data.data
								this.title = '粉丝列表'
							}
						}
					})
				}
			},
			shade(){
				this.shadeShow = false //隐藏遮罩层
				// 退出动画
				this.animation.height(0).step({
					duration: 100
				})
				this.animationData = this.animation.export()
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
	@import "mine.scss";
</style>
