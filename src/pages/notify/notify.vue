<template>
	<view>
		<view class="page" v-if="status">
			<view class="notify-item page-block" v-for="item in notify" :key="item.id">
				<view class="notify-item-title">
					<view class="title-cicle" v-if="item.status==0"></view>
					<view class="title-words">{{item.title}}</view>
					<!-- <image class="title-icon" src="../../static/ico/right.png"></image> -->
				</view>
				<view class="notify-item-message">
					{{item.message}}
				</view>
				<view class="notify-item-bottom">
					<view class="bottom-time">{{item.create_time | timeFilter}}</view>
					<button 
						class="bottom-btn" 
						:type="item.status==0?'default':'warn'" 
						size="mini"
						@click.once="receive(item.id)">{{item.status | statusFilter}}
					</button>
				</view>
			</view>
		</view>
		<view class="notify-n" v-else>
			<view>仅队长能查看相关通知</view>
			<view>已无更多内容~</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				notify: [],
				status: false //用于判断该用户是否为队长
			}
		},
		onLoad() {
			// 触发获取信息的方法
			this.getNotify()
		},
		methods: {
			// 获取信息通知的列表
			getNotify(){
				let token = sessionStorage.getItem("token")
				if(token!=null && token!=undefined && token!='') {
					uni.request({
						url: `${this.serverUrl}/user/notify`,
						method: 'POST',
						header: {
							'authorization': 'Bearer '+token
						},
						success: (res) => {
							if(res.data.code === 200) {
								this.status = true
								this.notify = res.data.data
								// console.log(this.notify)
							}
						}
					})
				}
			},
			// 收到信息的方法
			receive(id){
				this.notify.forEach(item => {
					// 遍历信息列表,判断当 该条信息的id == 点击信息的id, 发送请求
					if(item.id == id){
						let token = sessionStorage.getItem("token")
						if(token!=null && token!=undefined && token!='') {
							uni.request({
								url: `${this.serverUrl}/user/getNotify/${item.id}`,
								method: 'POST',
								header: {
									'authorization': 'Bearer '+token
								},
								success: (res) => {
									if(res.data.code == 200) {
										// 收到信息成功后,再次触发该方法刷新页面
										this.getNotify()
									}
								},
								complete() {
									uni.showToast({
										title: '您已成功收到信息',
										icon: 'success',
										mask: true,
										duration: 1000
									})
								}
							})
						}
					}
				})
			}
		},
		filters: {
			statusFilter(status){
				switch(status){
					case '0': return '收到'; break;
					case '1': return '已收到'; break;
				}
			},
			timeFilter(time) {
				var d = new Date(time)
				var times = d.getFullYear() +'-'+ ((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)) +'-'+ ((d.getDate())<10?'0'+(d.getDate()):(d.getDate())) +' '+ ((d.getHours())<10?'0'+(d.getHours()):(d.getHours())) +':'+ ((d.getMinutes())<10?'0'+(d.getMinutes()):(d.getMinutes())) +':'+ ((d.getSeconds())<10?'0'+(d.getSeconds()):(d.getSeconds()))
				return times
			}
		}
	}
</script>

<style lang="scss">
	@import "notify.scss";
</style>
