<template>
	<view class="page">
		<!-- 遮罩层 -->
		<view v-if="shadeShow" class="shade" @click="shade"></view>
		<!-- 搜索框 -->
		<view class="search">
			<view class="search-left page-block">
				<image src="../../static/ico/搜索.png" class="left-ico"></image>
				<input @input="search" @focus="searchFocus" type="text" v-model="searchText" class="left-input" placeholder="请输入搜索的用户名" />
			</view>
			<view class="search-right" @click="toUser">搜索</view>
		</view>
		<!-- 搜索显示的内容 -->
		<view class="search-con page-block" v-show="searchConShow">
			<view class="search-user" v-for="item in searchCon" :key="item.id" @click="unameClick(item)">
				<view class="user-left">
					<image src="../../static/ico/搜索.png" class="search-user-ico1"></image>
					<view class="search-user-name">{{item.username}}</view>
				</view>
				<image src="../../static/ico/斜箭头.png" class="search-user-ico2"></image>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:duration="1000"
			class="banner">
			<swiper-item v-for="item in banners" :key="item.id">
				<image :src="item.image" class="banner"></image>
			</swiper-item>
		</swiper>
		
		<!-- 热门球队 -->
		<!-- <view class="page-block hot-team">
			<view class="hot-title-wrapper">
				<image src="../../static/ico/火焰.png" class="hot-ico"></image>
				<view class="hot-title">
					热门球队
				</view>
			</view>
		</view> -->
		<!-- <scroll-view scroll-x="true" class="page-block hot">
			<view class="hot-container" v-for="item in hotTeam" :key="item.id">
				<view class="hot-wrapper">
					<image :src="item.url" class="hot-img"></image>
					<view class="hot-name">
						{{item.name}}
					</view>
					<trailerStars :innerScore="item.score" :showNum="1" />
				</view>
			</view>
		</scroll-view> -->
		<hotTitle :title="'热门球队'" :url="'http://120.25.203.54:3000/images/火焰.png'"></hotTitle>
		<hotCon :data='hotTeam'></hotCon>
		
		<!-- 裁判队伍 -->
		<hotTitle :title="'裁判队伍'" :url="'http://120.25.203.54:3000/images/裁判.png'"></hotTitle>
		<hotCon :data="judges"></hotCon>
		<!-- <scroll-view scroll-x="true" class="page-block hot">
			<view class="hot-container" v-for="item in judges" :key="item.id">
				<view class="hot-wrapper">
					<image :src="item.url" class="hot-img"></image>
					<view class="hot-name hot-man">
						{{item.name}}
					</view>
					<view class="hot-name">
						{{item.class}}
					</view>
				</view>
			</view>
		</scroll-view> -->
		
		<!-- 赛事相关 -->
		<hotTitle :title="'赛事相关'" :url="'http://120.25.203.54:3000/images/篮球.png'"></hotTitle>
		<view class="related page-block">
			<view class="related-item" @click="toRules">
				<image src="../../static/ico/规则.png" class="related-ico"></image>
				<view class="related-name">赛事规则</view>
			</view>
			<view class="related-item" @click="toWonderful">
				<image src="../../static/ico/精彩.png" class="related-ico"></image>
				<view class="related-name">精彩瞬间</view>
			</view>
			<view class="related-item" @click="toAbout">
				<image src="../../static/ico/我们.png" class="related-ico"></image>
				<view class="related-name">关于我们</view>
			</view>
			<view class="related-item">
				<image src="../../static/ico/合作.png" class="related-ico"></image>
				<view class="related-name">合作伙伴</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import hotTitle from '../../components/hotTitle.vue'
	import trailerStars from '../../components/trailerStars.vue'
	import hotCon from '../../components/hotCon.vue'
	export default {
		data() {
			return {
				banners: [],
				hotTeam: [],
				judges: [],
				searchId:'',
				searchText:'',
				searchConShow: false,
				searchCon: [],
				shadeShow: false
			}
		},
		onLoad() {
			let serverUrl = this.serverUrl
			// 获取轮播图
			uni.request({
				url: `${serverUrl}/index/banner`,
				method: 'GET',
				success: (res) => {
					if(res.data.code === 200){
						this.banners = res.data.data
					}
				}
			})
			// 获取热门球队
			uni.request({
				url: `${serverUrl}/index/hotTeam`,
				method: 'GET',
				success: (res) => {
					if(res.data.code === 200){
						this.hotTeam = res.data.data
					}
				}
			})
			// 获取裁判队伍
			uni.request({
				url: `${serverUrl}/index/judges`,
				method: 'GET',
				success: (res) => {
					if(res.data.code === 200){
						//console.log(res)
						this.judges = res.data.data
					}
				}
			})
		},
		methods: {
			// 遮罩层
			shade(){
				this.searchConShow = false
				this.shadeShow = false
			},
			toRules(){
				uni.navigateTo({
					url: '../rules/rules'
				})
			},
			toWonderful(){
				uni.navigateTo({
					url: '../wonderful/wonderful'
				})
			},
			toAbout(){
				uni.navigateTo({
					url: '../about/about'
				})
			},
			// 在下一个方法中有效输入时触发
			// 根据关键字查询到含有value的用户名
			searchMethod(){
				uni.request({
					url: `${this.serverUrl}/user/search`,
					method: 'POST',
					data: {"value": this.searchText.trim()},
					success: (res) => {
						if(res.data.code === 200){
							//console.log(res)
							this.searchCon = res.data.data
						}else if(res.data.code === 400) {
							this.searchCon = []
						}
					}
				})
			},
			// 在input框输入时触发，对查到的用户名栏和遮罩层的显示与隐藏进行控制
			search(){
				if(this.searchText.trim() == '') {
					this.searchConShow = false
					this.shadeShow = false
				}else {
					this.searchConShow = true
					this.shadeShow = true
					this.searchMethod()
				}
			},
			// 光标在input框上时触发
			searchFocus(){
				if(this.searchText.trim() !== '') {
					this.searchConShow = true
					this.shadeShow = true
					this.searchMethod()
				}
			},
			// 在查询到的显示栏上点击时，将相应的用户名赋值给input双向绑定的searchText
			unameClick(item){
				this.searchText = item.username
				this.searchId = item.id
				this.searchConShow = false
				this.shadeShow = false
			},
			toUser(){
				this.searchConShow = false
				this.shadeShow = false
				// 当input框有值才会发送请求
				if(this.searchText.trim()){
					uni.request({
						url: `${this.serverUrl}/user/getId`,
						method: 'POST',
						data: {"username": this.searchText},
						success: (res) => {
							if(res.data.code === 200){
								// 路由跳转时，携带用户的id
								uni.navigateTo({
								url: `../user/user?id=${res.data.id}`
								})
							}else if(res.data.code === 400) {
								uni.showToast({
									title:res.data.msg,
									mask: true,
									duration: 1000,
									icon: 'none'
								})
							}
						},
						complete: () => {
							this.searchText = ''
						}
					})
				}else{
					uni.showToast({
						title:'请输入内容',
						mask: true,
						duration: 1000,
						icon: 'none'
					})
				}
				
			}
		},
		components: {
			hotTitle,
			trailerStars,
			hotCon
		}
	}
</script>

<style lang="scss">
	@import "index.scss";
</style>
