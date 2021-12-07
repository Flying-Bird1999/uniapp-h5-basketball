<template>
	<view class="page">
		<view class="behave-top page-block">
			<view class="b-t-left">
				<image :src="competitionData.tempic_A" class="l-pic"></image>
				<view class="l-text">{{competitionData.teamNameA}}</view>
			</view>
			<view class="b-t-middle">
				<view class="score">{{competitionData.countA}}</view>
				<view class="status">
					<view class="status-sORe">{{competitionData.status | statusFilter}}</view>
					<view class="status-date">{{timeFilter(competitionData.time,'date')}}</view>
					<view class="status-date">{{timeFilter(competitionData.time,'time')}}</view>
				</view>
				<view class="score">{{competitionData.countB}}</view>
			</view>
			<view class="b-t-left">
				<image :src="competitionData.tempic_B" class="l-pic"></image>
				<view class="l-text">{{competitionData.teamNameB}}</view>
			</view>
		</view>
		<view class="behave-bottom page-block">
			<view class="b-title">
				<view class="t-icon"></view>
				<view class="t-word">比赛统计</view>
			</view>
			<view class="b-warp" v-for="behavior in behaviorData" :key="behavior.id">
				<t-table>
					<t-tr :fontSize="'18'">
						<!-- 获取队伍的名字 -->
						<t-th>{{behavior[0].user_teamName}}</t-th>
						<t-th>得分</t-th>
						<t-th>篮板</t-th>
						<t-th>助攻</t-th>
						<t-th>犯规</t-th>
					</t-tr>
					<t-tr :fontSize="'18'" v-for="item in behavior" :key="item.id">
						<t-td>{{item.user_name}}</t-td>
						<t-td>{{item.point}}</t-td>
						<t-td>{{item.backboard}}</t-td>
						<t-td>{{item.assist}}</t-td>
						<t-td>{{item.foul}}</t-td>
					</t-tr>
				</t-table>
			</view>
		</view>
		<view class="behave-comment page-block">
			<view class="b-title">
				<view class="t-icon"></view>
				<view class="t-word">比赛评论</view>
			</view>
			<view class="b-userComment">
				<view v-for="item in comments" :key='item.id' class="commentContent">
					<view class="commentContent-head">
						<image class="commentConten-head-img" :src="item.userpic"></image>
						<view class="commentConten-head-middle">
							<view class="middle-username">{{`${item.name}（${item.username}）`}}</view>
							<view class="middle-time">{{item.create_time | timeFilters}}</view>
						</view>
						<image class="commentConten-head-good" src="../../static/ico/点赞.png" mode=""></image>
					</view>
					<view class="commentContent-body">
						{{item.user_comment}}
					</view>
				</view>
			</view>
		</view>
		<view class="behave-pushComment">
			<view class="search-left page-block">
				<image src="../../static/ico/bianji.png" class="left-ico"></image>
				<input class="left-input" v-model="commentVal" placeholder="写评论..." />			</view>
			<view class="search-right" @click="pushComment">发表</view>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		data() {
			return {
				competitionData:{},
				behaviorData: [],
				comments: [],
				commentVal: '',
				competition_id: ''
			}
		},
		onLoad(param) {
			// 获取上个页面传过来的三个数据
			let {competition_id,team_id_A,team_id_B} = param
			// 获取该页面需要的 “队伍信息” “比赛统计” 信息
			uni.request({
				url: `${this.serverUrl}/user/behavior`,
				method: 'POST',
				data: {
					"competition_id": competition_id,
					"team_id_A": team_id_A,
					"team_id_B": team_id_B
				},
				success: (res) => {
					if(res.data.code == 200) {
						// console.log(res)
						this.competitionData = res.data.data.competitionData
						// 将数据按照不同的队伍整理为以下该形式
						// [
						// 	 [{},{},{}],
						// 	 [{},{},{}]
						// ]
						let behaviorData = res.data.data.behaviorData
						// 定义整理后数据的数据形式
						let newData = [[],[]]
						// 获取两个队伍的队伍id数组 (需要去重)
						let team_id = [...(new Set(behaviorData.map(item => item.team_id)))]
						behaviorData.forEach(item => {
							// 根据不同的队伍id进行数组的push
							if(item.team_id === team_id[0]){
								newData[0].push(item)
							}else if(item.team_id === team_id[1]){
								newData[1].push(item)
							}
						})
						this.behaviorData = newData
						// console.log(this.behaviorData)
					}
				}
			})
			this.competition_id = competition_id
			// 获取评论列表
			this.getComment(competition_id)
		},
		methods: {
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
			getComment(competition_id){
				uni.request({
					url: `${this.serverUrl}/user/getComments`,
					method: 'POST',
					data: {
						"competition_id": competition_id
					},
					success: (res) => {
						if(res.data.code === 200){
              console.log(res.data)
							this.comments = res.data.data
						}
					}
				})
			},
			pushComment() {
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/pushComment`,
						method: 'POST',
						data: {
							"user_comment": this.commentVal,
							"competition_id": this.competition_id
						},
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code === 200) {
								uni.showToast({
									title: res.data.msg,
									icon: 'success',
									mask: true,
									duration: 1500
								})
							}
							this.getComment(this.competition_id)
							this.commentVal = ''
						}
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
			},
			timeFilters(time) {
				var d = new Date(time)
				var times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate())) +' '+ ((d.getHours())<10?'0'+(d.getHours()):(d.getHours())) +':'+ ((d.getMinutes())<10?'0'+(d.getMinutes()):(d.getMinutes())) +':'+ ((d.getSeconds())<10?'0'+(d.getSeconds()):(d.getSeconds()))
				return times
			}
		},
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		}
	}
</script>

<style lang="scss">
	@import "teamBehavior.scss"
</style>
