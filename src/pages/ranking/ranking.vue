<template>
	<view class="page">
		<view class="ranking" v-for="item,index in team" :key="index">
			<view class="ranking-group page-block">
				<view class="group">{{item[0].groupName}}组排名</view>
				<view class="team">球队</view>
				<view class="score">积分</view>
			</view>
			<view class="ranking-team page-block" v-for="cItem,cIndex in item" :key="cIndex">
				<view class="team-No">{{cIndex+1}}</view>
				<view class="team-name">{{cItem.teamName}}</view>
				<view class="team-score">{{cItem.integral}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				team: [],
				data: []
			}
		},
		onLoad() {
			uni.request({
				url: `${this.serverUrl}/com/ranking`,
				method: 'GET', 
				success: (res) => {
					if(res.data.code === 200) {
						this.data = res.data.data
						// console.log(res.data)
						// 将所有的组别筛选出来形成一个数组
						let dataGroup = this.data.map(item => item.groupName) 
						// 将含有组别的数组进行去重
						dataGroup = [...new Set(dataGroup)]
						// 将含有组别的数组进行排序
						dataGroup = dataGroup.sort()
						// 重新定义一个新数组
						let newData = []
						// 遍历组别数组
						for(let i=0; i< dataGroup.length; i++) {
							// 二维数组
							newData[i] = []
							this.data.forEach(item => {
								if(item.groupName == dataGroup[i]){
									// 当数据中的组别 与 组别数组 相同时，在新数组的二维中插入该数据
									newData[i].push(item)
								}
							})
						}
						// 将最终获得的新数组的二维数组 按照integral的大小 进行排序
						newData.forEach(item => {
							item.sort((a,b) => {
								return b.integral - a.integral
							})
						})
						this.team = newData
						// console.log(this.team)
					}
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import 'ranking.scss';
</style>
