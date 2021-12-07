<template>
	<view class="warp">
		<view class="box">
			<view class="title">战队：{{tableList[0].teamName}}</view>
			<t-table>
				<t-tr :fontSize="'22'">
					<t-th>阵容</t-th>
					<t-th>号码</t-th>
					<t-th>身份</t-th>
				</t-tr>
				<t-tr :fontSize="'20'" v-for="item in tableList" :key="item.id">
					<t-td>{{ item.name }}</t-td>
					<t-td>{{ item.num }}</t-td>
					<t-td>{{ item.identity | identityFilter }}</t-td>
				</t-tr>
			</t-table>
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
				tableList: [
					// 不添加teamName,页面正常渲染,但会报错
					{
						teamName: ''
					}
				]
			}
		},
		onLoad() {
			// 获取队伍的详情信息
			let token = sessionStorage.getItem("token")
			if(token!=null && token!=undefined && token!='') {
				uni.request({
					url: `${this.serverUrl}/user/signInfo`,
					method: 'POST',
					header: {
						'authorization': 'Bearer '+token
					},
					success: (res) => {
						if(res.data.code === 200) {
							// console.log(res.data)
							this.tableList = res.data.data
						}
					}
				})
			}
		},
		methods: {
			
		},
		filters: {
			identityFilter(item){
				switch(item) {
					case '1': return '队长'; break;
					case '0': return '队员'; break;
				}
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

<style>
	.title {
		height: 170rpx;
		line-height: 150rpx;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
	}
</style>
