<template>
	<view class="page">
		<view v-if="isSign">
			<view class="teamInfo page-block">
				<image @click="lookImg(teamInfo.teampic)" :src="teamInfo.teampic" class="u-face"></image>
				<view class="u-right">
					<view class="right-top">
						<view class="t-name">{{teamInfo.teamName}}</view>
					</view>
					<view class="right-bottom">
						<view>评分：{{teamInfo.score}}</view>
						<view>组别：{{teamInfo.groupName}}组</view>
						<view>积分：{{teamInfo.integral}}</view>
					</view>
				</view>
			</view>
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
			<hotTitle :title="'球队赛程'" :url="'http://120.25.203.54:3000/images/篮球.png'"></hotTitle>
			<view class="game page-block" v-for="item in competition" :key="item.id">
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
		<view class="sign-n page-block" v-else>
			非参赛球员，已无更多内容~
		</view>
	</view>
</template>

<script>
	import hotTitle from '../../components/hotTitle.vue'
	export default {
		data() {
			return {
				isSign: false,
				teamInfo: {},
				competition: [],
				everyData: {}
			}
		},
		onShow() {
			let token = sessionStorage.getItem("token")
			uni.request({
				url: `${this.serverUrl}/user/teamMyself`,
				method: 'POST',
				header: {
					'authorization': 'Bearer '+token
				},
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res)
						this.isSign = true
						this.teamInfo = res.data.data.teamInfo
						this.competition = res.data.data.competitionInfo
						uni.setNavigationBarTitle({
							title: res.data.data.teamInfo.teamName
						})
					}
				}
			})
			
			// 获取个人数据
			uni.request({
				url: `${this.serverUrl}/user/loginEveryData`,
				method: 'POST',
				header: {
					'authorization': 'Bearer '+token
				},
				success: (res) => {
					if(res.data.code == 200) {
						// console.log(res)
						this.everyData = res.data.data
						// 将个人数据 保留小数点后一位
						for(let item in this.everyData) {
							if(item !== 'times') {
								this.everyData[item] = (this.everyData[item]).toFixed(1)
							}
						}
					}
				}
			})
		},
		methods: {
			lookImg(url){
				let faceArr = []
				faceArr.push(url)
				uni.previewImage({
					urls: faceArr,
					current: faceArr[0]
				})
			},
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
		filters:{
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
		},
		components: {
			hotTitle
		}
	}
</script>

<style lang="scss">
	@import "team.scss";
</style>
