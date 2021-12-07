<template>
	<view class="page">
		<view class="game" v-for="item in competition" :key="item.id">
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
	export default {
		data() {
			return {
				pageNo: 1, //当前第几页
				pageSize: 6, //每页显示多少条数据
				competition: [],
				pageTotal: 1 //一共有多少页数据
			}
		},
		onLoad() {
			// 页面加载时 加载数据
			this.getcompetition(this.pageNo,this.pageSize)
		},
		// 页面触底时触发 
		onReachBottom(){
			this.pageNo += 1 
			// 当 第几页>总页数时 不再触发该事件 防止重复触发
			if(this.pageNo > this.pageTotal){
				return
			}
			this.getcompetition(this.pageNo,this.pageSize)
		},
		methods: {
			// 根据pageNo和pageSize向后端请求数据
			getcompetition(pageNo, pageSize){
				uni.showLoading({
					mask: true,
					title: '请稍后...',
				})
				uni.showNavigationBarLoading()
				uni.request({
					url: `${this.serverUrl}/com/competition/${pageNo}/${pageSize}`,
					method: 'GET', 
					success: (res) => {
						if(res.data.code === 200) {
							this.competition = this.competition.concat(res.data.data.data)
							// console.log(this.competition)
							this.pageTotal = res.data.data.pageTotal
						}
					},
					complete: () => {
						uni.hideLoading()
						uni.hideNavigationBarLoading()
					}
				})
			},
			// 根据不同的时间类型，将时间戳进行整理展示
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
				// 只有当比赛状态为已结束 才会进行页面跳转
				if(item.status == 1) {
					// 页面跳转时，将三个数据传过去
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
		}
	}
</script>

<style lang="scss">
	@import "schedule.scss";
</style>
