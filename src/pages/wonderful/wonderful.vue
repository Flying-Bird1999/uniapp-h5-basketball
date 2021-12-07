<template>
	<view class="page">
		<view class="w-title">
			精选十佳球
		</view>
		<view class="page-block w-movie" v-for="item in wonderfulVideo" :key="item.id">
			<video 
				:id="String(item.id)"
				:src="item.url" 
				:poster="item.poster"
				class="w-video"
				@play="meIsPlaying(String(item.id))"
				controls>
			</video>
			<view class="w-desc">
				{{item.describe}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wonderfulVideo: []
			}
		},
		onLoad() {
			uni.request({
				url: `${this.serverUrl}/index/video`,
				method: 'GET',
				success: (res) => {
					if(res.data.code === 200){
						// console.log(res)
						this.wonderfulVideo = res.data.data
					}
				}
			})
		},
		methods: {
			meIsPlaying(id){
				console.log(id)
				let videoId = ''
				if(id) {
					videoId = id
					this.videoContext = uni.createVideoContext(videoId)
				}
				for(let i=0; i<this.wonderfulVideo.length; i++) {
					if(videoId !== String(this.wonderfulVideo[i].id)) {
						uni.createVideoContext(String(this.wonderfulVideo[i].id)).pause()
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import 'wonderful.scss'
</style>
