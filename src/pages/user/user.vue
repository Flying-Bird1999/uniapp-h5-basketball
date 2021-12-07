<template>
	<view class="page">
		<!-- 用户的相关资料信息 -->
		<view class="userInfo page-block">
			<image :src="user.userpic" class="u-face"></image>
			<view class="u-right">
				<view class="right-top">
					<view class="t-name">{{user.name}}</view>
					<image v-if="user.sex == 0" src="../../static/ico/女.png" class="t-icon"></image>
					<image v-if="user.sex == 1" src="../../static/ico/男.png" class="t-icon"></image>
				</view>
				<view class="right-bottom">
					<view>用户名：{{user.username}}</view>
					<view>班级：{{user.class}}</view>
					<view>生日：{{user.birthday | timeFilter}}</view>
				</view>
			</view>
		</view>
		<!-- 关注与粉丝的数量、关注按钮 -->
		<view class="userFans page-block">
			<view class="u-fans"><text>{{followAndFans.follow}}</text>关注</view>
			<view class="u-fans"><text>{{followAndFans.fans}}</text>粉丝</view>
			<!-- 判断查看的是自己时，隐藏关注按钮 -->
			<button v-if="!isMyself" @click="follow" :type="status?'default':'warn'" class="u-btn">{{btnMessage}}</button>
		</view>
		<!-- 报名情况 -->
		<hotTitle :title="'报名情况'" :url="'http://120.25.203.54:3000/images/篮球.png'"></hotTitle>
		<view class="userSign-y page-block" v-if="user.teamName">
			<view class="signSuccess">
				<image src="../../static/ico/gou.png" class="s-icon"></image>
				<view class="s-words">已成功报名本次计科院篮球赛~</view>
			</view>
			<view class="u-team">
				<view>参赛队伍：<text>{{user.teamName}}</text></view>
				<view>队伍身份：<text>{{user.identity | identityFilter}}</text></view>
			</view>
		</view>
		<view class="userSign-n page-block" v-else>
			<view class="s-words">该用户并无报名本次赛事~</view>
		</view>
		<!-- 个人数据 -->
		<hotTitle :title="'个人数据'" :url="'http://120.25.203.54:3000/images/篮球.png'"></hotTitle>
		<view v-if="isSign" class="everyData page-block">
			<view class="everyData-item">
				<view class="data">{{everyData.times}}</view>
				<view class="words">场次</view>
			</view>
			<view class="everyData-item">
				<view class="data">{{everyData.point}}</view>
				<view class="words">得分</view>
			</view>
			<view class="everyData-item">
				<view class="data">{{everyData.backboard}}</view>
				<view class="words">篮板</view>
			</view>
			<view class="everyData-item">
				<view class="data">{{everyData.assist}}</view>
				<view class="words">助攻</view>
			</view>
			<view class="everyData-item">
				<view class="data">{{everyData.foul}}</view>
				<view class="words">犯规</view>
			</view>
		</view>
		<!-- 球队战绩 -->
		<hotTitle :title="'球队战绩'" :url="'http://120.25.203.54:3000/images/篮球.png'"></hotTitle>
		<view v-if="isSign" class="game page-block" v-for="item in competition" :key="item.id">
			<view class="game-time">
				<view class="game-time-date">{{timeFilter(item.time,'date')}}</view>
				<view class="game-time-day">{{timeFilter(item.time,'day') | dayFilter}}</view>
				<view class="game-time-now">{{timeFilter(item.time,'time')}}</view>
			</view>
			<view class="game-message page-block">
				<view class="game-message-status">
					<view class="status-begin">
						{{item.status | statusFilter}}
					</view>
					<view class="status-which">
						{{item.team_group}}组小组赛
					</view>
				</view>
				<view class="game-message-competitor">
					<view class="competitor">
						<view class="competitor-name">{{item.teamNameA}}</view>
						<view class="competitor-score">{{item.countA | countFilter}}</view>
					</view>
					<view class="competitor">
						<view class="competitor-name">{{item.teamNameB}}</view>
						<view class="competitor-score">{{item.countB | countFilter}}</view>
					</view>
				</view>
				<view class="game-message-count" @click="toTeamBahavior(item)">
					统计
					<image src="../../static/ico/统计.png" class="count"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import hotTitle from '../../components/hotTitle.vue'
	export default {
		data() {
			return {
				userId: '',
				user: {},
				status: false,
				btnMessage:'+ 关注',
				isMyself: false,
				isSign: false, //用来判断该用户是否已报名比赛
				followAndFans: {},
				competition: [],
				everyData: {}
			}
		},
		onLoad(param) {
			// 获取上个页面传过来的用户id
			this.userId = param.id
			// 获取个人资料
			uni.request({
				url: `${this.serverUrl}/user/getOtheruserInfo/${this.userId}`,
				method: 'POST',
				success: (res) => {
					if(res.data.code === 200) {
						// console.log(res.data.data)
						this.user = res.data.data
						// 获取自己队伍的信息
						uni.request({
							url: `${this.serverUrl}/user/teamInfo`,
							method: 'POST',
							data: {
								"teamName": this.user.teamName
							},
							success: (res) => {
								if(res.data.code === 200) {
									this.isSign = true
									this.competition = res.data.data
								}
							}
						})
					}
				}
			})
			// 获取个人数据
			uni.request({
				url: `${this.serverUrl}/user/everyData/${this.userId}`,
				method: 'POST',
				success: (res) => {
					if(res.data.code == 200) {
						this.everyData = res.data.data
						for(let item in this.everyData) {
							if(item !== 'times') {
								this.everyData[item] = (this.everyData[item]).toFixed(1)
							}
						}
					}
				}
			})
			// 查看自己是否已经关注了该用户,由此改变关注按钮的文字与颜色
			let token = sessionStorage.getItem("token")
			uni.request({
				url: `${this.serverUrl}/user/checkFollow/${this.userId}`,
				method: 'POST',
				header: {
					'authorization': 'Bearer '+token
				},
				success: (res) => {
					if(res.data.code == 400){
						this.status = true
						this.btnMessage = '取消关注'
					} else if(res.data.code == 200) {
						this.status = false
						this.btnMessage = '+ 关注'
					}
				}
			})
			// 判断查看的是否为自己
			uni.request({
				url: `${this.serverUrl}/user/isMyself/${this.userId}`,
				method: 'POST',
				header: {
					'authorization': 'Bearer '+token
				},
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res)
						this.isMyself = true
					}
				}
			})
			// 触发 "获取关注数与粉丝数" 方法
			this.followAndFansNum(this.userId)
		},
		methods: {
			// 轻松请求获取该用户 关注数与粉丝数
			followAndFansNum(id){
				uni.request({
					url: `${this.serverUrl}/user/checkFollowAndFans/${id}`,
					method: 'POST',
					success: (res) => {
						this.followAndFans = res.data.data
					}
				})
			},
			// 关注与取消关注接口
			follow(){
				// 点击时,将按钮的状态取反
				this.status = !this.status
				// 当原始状态为true时, 发送"关注"请求
				if(this.status) {
					let token = sessionStorage.getItem("token")
					uni.request({
						url: `${this.serverUrl}/user/setFollow/${this.userId}`,
						method: 'POST',
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code == 200){
								uni.showToast({
									title: res.data.msg,
									mask: true,
									duration: 1000
								})
							}
						},
						complete: () => {
							this.btnMessage = '取消关注'
						}
					})
					//console.log(1)
				}else {
					// 当原始状态为false时, 发送"取消关注"请求
					let token = sessionStorage.getItem("token")
					uni.request({
						url: `${this.serverUrl}/user/cancelFollow/${this.userId}`,
						method: 'POST',
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code == 200){
								uni.showToast({
									title: res.data.msg,
									mask: true,
									duration: 1000
								})
							}
						},
						complete: () => {
							this.btnMessage = '+ 关注'
						}
					})
				}
				this.followAndFansNum(this.userId)
			},
			// 解析时间
			timeFilter(datetime, type="date") {
				let d = new Date(datetime)
				let times
				if(type == 'date') {
					times = (d.getMonth()+1) +'月'+ (d.getDate()) +'日'
				} else if(type == 'time') {
					times = ((d.getHours())<10?'0'+(d.getHours()):(d.getHours())) +':'
						+ ((d.getMinutes())<10?'0'+(d.getMinutes()):(d.getMinutes()))
				} else if(type == 'day') {
					times = d.getDay()
				}
				return times
			},
			toTeamBahavior(item){
				if(item.status == 1) {
					uni.navigateTo({
						url:`../teamBehavior/teamBehavior?competition_id=${item.id}&team_id_A=${item.team_id_A}&team_id_B=${item.team_id_B}`
					})
				}else {
					uni.showToast({
						title: '不好意思，该比赛还未开赛，暂无相关统计',
						mask: true,
						icon: 'none',
						duration: 1000
					})
				}
			}
		},
		components: {
			hotTitle
		},
		filters: {
			identityFilter(identity){
				switch(identity) {
					case '1': return '队长'; break;
					case '0': return '队员'; break;
					default: return '观众'
				}
			},
			timeFilter(datetime) {
				let d = new Date(datetime)
				let times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate()))
				switch(datetime) {
					case null: return '未设置'; break;
					default: return times; break;
				}
			},
			statusFilter(status){
				switch(status) {
					case 1: return '已结束'; break;
					case 0: return '未开始'; break;
				}
			},
			countFilter(count) {
				switch(count) {
					case '': return '--'; break;
					default: return count; break;
				}
			},
			dayFilter(day) {
				switch(day) {
					case 1: return '周一'; break;
					case 2: return '周二'; break;
					case 3: return '周三'; break;
					case 4: return '周四'; break;
					case 5: return '周五'; break;
					case 6: return '周六'; break;
					case 0: return '周日'; break;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "user.scss";
</style>
