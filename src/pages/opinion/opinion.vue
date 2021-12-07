<template>
	<view class="page-block">
		<view class="title page-block">请选择反馈类型</view>
		<view class="item page-block">
			<view class="item-title">向体育部反馈</view>
			<view class="item-con" @click="toOpinionInfo">
				<view class="item-con-words">
					<view class="words-t">裁判吹罚</view>
					<view class="words-b">请向体育部反馈相关裁判吹罚尺度不一致</view>
				</view>
				<image src="../../static/ico/right.png" class="item-con-icon"></image>
			</view>
			<view class="item-con" @click="toOpinionInfo">
				<view class="item-con-words">
					<view class="words-t">队伍作弊</view>
					<view class="words-b">请向体育部反馈相关队伍的违规情况</view>
				</view>
				<image src="../../static/ico/right.png" class="item-con-icon"></image>
			</view>
			<view class="item-con" @click="toOpinionInfo">
				<view class="item-con-words">
					<view class="words-t">赛事意见</view>
					<view class="words-b">请向体育部反馈你对该赛事的意见</view>
				</view>
				<image src="../../static/ico/right.png" class="item-con-icon"></image>
			</view>
		</view>
		
		<view class="item page-block">
			<view class="item-title">向开发者反馈</view>
			<view class="item-con" @click="toOpinionInfo">
				<view class="item-con-words">
					<view class="words-t">功能异常</view>
					<view class="words-b">请向开发者反馈小程序功能异常问题</view>
				</view>
				<image src="../../static/ico/right.png" class="item-con-icon"></image>
			</view>
			<view class="item-con" @click="toOpinionInfo">
				<view class="item-con-words">
					<view class="words-t">产品建议</view>
					<view class="words-b">请向开发者反馈你对产品的相关建议</view>
				</view>
				<image src="../../static/ico/right.png" class="item-con-icon"></image>
			</view>
		</view>
		
		<view class="item page-block" @click="toOpinionInfo">
			<view class="item-title">向平台投诉</view>
			<view class="item-con">
				<view class="item-con-words">
					<view class="words-t">违规举报</view>
					<view class="words-b">若遇色情、诱导、骚扰、欺诈、恶意营销、违法犯罪等情况，可向平台举报</view>
				</view>
				<image src="../../static/ico/right.png" class="item-con-icon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toOpinionInfo(){
				uni.navigateTo({
					url: '../opinionInfo/opinionInfo'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "opinion.scss";
</style>
