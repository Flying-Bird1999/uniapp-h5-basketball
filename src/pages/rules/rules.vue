<template>
	<view class="page">
		<view class="rules page-block">
			<view class="r-title">计科院篮球院赛规则</view>
			<view class="r-secondTitle">
				<view class="r-icon"></view>
				<view class="r-word">比赛赛制</view>
			</view>
			<view class="r-item" v-for="item in rules1">
				{{item}}
			</view>
			
			<view class="r-secondTitle">
				<view class="r-icon"></view>
				<view class="r-word">比赛规则</view>
			</view>
			<view class="r-item" v-for="item in rules2">
				{{item}}
			</view>
			
			<view class="r-secondTitle">
				<view class="r-icon"></view>
				<view class="r-word">参赛方式</view>
			</view>
			<view class="r-item" v-for="item in rules3">
				{{item}}
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rules1: [
					'1、根据本部的实际情况，虽然有24个非毕业班具有参赛权，但并没有24支代表队。因此，下面的赛制说明将在假定有20支代表队参赛的情况下进行，但实际情况与赛制安排将在报名后再作调整（视报名情况安排）。',
					'2、20支队伍将派代表抽签决定分组。我们将会设（A,B,C,D）4个小组，每个小组有5支队。抽签分组（若参赛队伍为奇数队，则先选出种子队）。',
					'3、比赛分设初赛和淘汰赛两部分。初赛为小组组内循环赛；小组第一名和第二名直接进入淘汰赛。淘汰赛采用的方式是分区对阵比赛，胜者晋级下轮直至决赛。',
					'4、小组赛胜一场得2分，负一场得1分，弃权得0分。若积分相同，按总得分/总失分=N，N值大者名次列前，若再积分相同则净胜分多者名次列前。'
				],
				rules2: [
					'1、比赛分为四节进行，每节10分钟；中场休息3分钟，其他休息1分钟。（该项由于不停表，故不按国家规则）',
					'2、初赛阶段，前四节（第四节最后3分钟除外）比赛当遇到罚球、出界球以及暂停时，记录处不停表（小组赛），第四节最后三分钟罚球、暂停时停表，出界球视情况停表。',
					'3、比赛中前三节双方每节各有一次暂停机会，最后一节有两次（暂停次数不累积，每次时间不可超过1分钟）。',
					'4、比赛规定个人犯规满5次下场，第四节全队犯规满5次后，后面的犯规都罚球；前三节不规定犯规满5次后的每次都必须罚球，而是视犯规情况而定。',
					'5、小组赛胜一场得2分，负一场得1分，弃权得0分。每一场比赛都有规则“24秒违例”。',
					'6、若比赛常规时间结束双方比分持平，则2分钟后进行加时赛，加时赛计时5分钟。',
					'7、希望各班能准时参赛，如迟到10分钟当弃权处理。'
				],
				rules3: [
					'1、以班（合班最多不超过2个班级）为单位组队参加，比赛将以正规的全场五人制篮球赛进行。则每队最少可报运动员5人、最多可报12人。',
					'2、在规定的时间内交完报名费（每支队50元）,否则当做不参与本次活动。',
					'3、最多2个班跨班组队，需统一队服。',
					'4、比赛规则将以报名情况做调整。'
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import "rules.scss"
</style>
