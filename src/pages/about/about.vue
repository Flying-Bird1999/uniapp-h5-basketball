<template>
	<view class="page">
		<view class="rules page-block" >
			<view v-for="item in activity" :key="item.id">
				<view class="r-secondTitle">
					<view class="r-icon"></view>
					<view class="r-word">{{item.title}}</view>
				</view>
				<view class="r-item">
					{{item.msg}}
				</view>		
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity: [
					{
						id: 1,
						title: '主办单位',
						msg: '主办单位：计算机科学学院团委学生会。承办单位：计算机科学学院学生会体育部'
					},
					{
						id: 2,
						title: '活动主题',
						msg: '2020-2021年度计算机科学学院学生班级篮球赛'
					},
					{
						id: 3,
						title: '活动目的',
						msg: '为了增强同学们体育锻炼的意识，提高同学们的综合素质，促进同学之间的友好相处；为了丰富同学们的校园课余活动，缓解同学们的学习压力，增进学生间的凝聚力，使得校园气氛更加活跃；为了挖掘发现更多更具运动能力的同学以提高我院体育水平、增强我院的体育实力，我们将以组织比赛的形式为平时缺乏体育锻炼的学生创造运动机会，提供展现集体风采的舞台；以促进热爱篮球的同学们的交流和沟通为根本出发点；我们将本着"友谊第一,比赛第二"的原则,努力组织好本次计科院学生班级篮球赛。'
					},
					{
						id: 4,
						title: '参赛单位',
						msg: '计算机科学学院非毕业班班级（毕业班班级不参加）。本部有24个非毕业班班级，以上班级将遵循以下参赛方式参与此次比赛。'
					},
					{
						id: 5,
						title: '活动时间',
						msg: '2021年4月10日至5月25日。（条件不允许的情况下会适当推迟）'
					},
					{
						id: 6,
						title: '活动地点',
						msg: '校本部比赛场地为旧篮球场'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.page {
		box-sizing: border-box;
		padding: 30rpx;
	}
	.rules {
		box-sizing: border-box;
		padding: 30rpx;
		border-radius: 25rpx;
		.r-secondTitle {
			display: flex;
			height: 50rpx;
			margin-bottom: 20rpx;
			.r-icon {
				width: 4px;
				height: 20px;
				background-color: #f9a215;
				margin-right: 12rpx;
				margin-top: 6rpx;
			}
			.r-word {
				font-size: 18px;
				font-weight: bold;
				color: #515151;
			}
		}
		.r-item {
			font-size: 16px;
			margin-bottom: 50rpx;
			letter-spacing: 2rpx;
		}
	}
</style>
