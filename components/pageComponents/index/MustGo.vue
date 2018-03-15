<template>
	<div id="mustGo">
		<div class="titleTag">
			<h3>Destinations</h3>
			<p>Our local experts will revolutionize your journey</p>
		</div>
		<ul>
			<li :key="index" v-for=" (item,index) in dataSource" :class="index==0?'first-houst':''">
				<a :class="!item.linkUrl?'cur':''" :href="item.linkUrl ?item.linkUrl: 'javaScript:'">
					<div class="localPanda_host">
						<img v-lazy="item.cover" />
						<span v-html="item.title"></span>
					</div>
					<div class="masker">
						<h3 v-html="item.title"></h3>
						<div class="maskertext">
							<p v-for="i in item.content">{{i}}</p>
							
							
						</div>
					</div>
				</a>
				
			</li>
		</ul>
		<button  class="more-destinations">More Destinations Coming Soon!</button>
	</div>
</template>

<script>
	export default {
		
		name:"mustGo",
		data() {
			return {
				dataSource: [
					{
						cover: 'https://d2q486kjf9cwwu.cloudfront.net/static/homePage/Beijing.jpg',
						title: 'Beijing',
						value: 'Beijing',
						linkUrl:'/activity/list/Beijing',
						content: [
							'See All Tours & Activities',
							'The center of China’s imperial history & modern power, where the nation’s political and cultural elite still reside.',
						
						],
					},
					{
						cover: 'https://d2q486kjf9cwwu.cloudfront.net/static/homePage/Shanghai.png',
						title: 'Shanghai',
						value: 'Shanghai',
						content: [
							'See All Tours & Activities',
							'Nestled between the skyscrapers of this massive metropolis lies a city rich with history, secrets, and fun things to do!'
						],
						linkUrl:'/activity/list/Shanghai',
					},
					{
						cover: 'https://d2q486kjf9cwwu.cloudfront.net/static/homePage/Chengdu.jpg',
						title: 'Chengdu',
						value: 'Chengdu',
						linkUrl:'/activity/list/Chengdu',
						content: [
							'See All Tours & Activities',
							'Giant pandas, beautiful mountain scenery, baby pandas, delicious spicy food, red pandas, tea houses, and more pandas!'
						]
					},

					{
						cover: "https://d2q486kjf9cwwu.cloudfront.net/static/homePage/Xi'an.png",
						title: 'Xi\'an',
						value: 'Xi\'an',
						linkUrl:'/activity/list/Xian',
						content: [
							'See All Tours & Activities',
							'Home to the legendary Terra-cotta Warriors of Qin Shi Huang, China’s first emperor, Xi’an holds the heart of Chinese civilization. '
						]
					},
					{
						cover: 'https://d2q486kjf9cwwu.cloudfront.net/static/homePage/Guilin.png',
						title: 'Guilin',
						linkUrl:'/activity/list/Guilin',
						value:'Guilin',
						content: ['Float down the Li river and bike',
							'through thousand-year-old villages as you take in the stunning beauty of Southern China’s Iconic Karsk Mountains.'
							]
					},
					
					
				]
			}
		},
		components: {},
		mounted() {

		},
		methods: {}
	}
</script>
<style lang="scss">

	

</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	#mustGo {
		width: 1170px;
		margin: 60px auto 0;
		text-align: center;
		ul{
			clear: both;
			li{
				float: left;
				width: 376px;
				height: 305px;
				overflow: hidden;
				position: relative;
				margin:20px 20px 0 0;
				&:nth-child(2){
					margin-right:0;
				}
				&:last-child{
					margin-right: 0;
				}
				&.first-houst{
					width: 773px;
					height:305px;
				}
				&:hover .masker{
					-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
					transition: all .5s cubic-bezier(0, 1, 0.5, 1);
					transform: translateY(0);
				
				}
				a{
					display: block;
					
						img{
							width: 100%;
							height:305px;
						}
						span{
							font-weight: bold;
							position:absolute;
							left: 50%;;
							top: 50%;
							-webkit-transform:translate(-50%,-50%);
							transform: translate(-50%,-50%);
							-moz-transform:translate(-50%,-50%);
							-ms-transform:translate(-50%,-50%);
							color: #fff;
							font-size: 38px;
							text-shadow :2.5px 2.5px 10px rgba(0,0,0,.3);
							
						}
						
					
					
				}
				.masker{
					
					position: absolute;
					text-align: left;
					top: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(135deg,#1bbc9d 0%, #009efd 100%);
					transform: translateY(200%);
					-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
					transition: all .5s cubic-bezier(0, 1, 0.5, 1);
					h3{
						
						color: #fff;
						font-size: 38px;
						position: relative;
						margin-top: 40px;
						text-align:center; 
						font-weight:bold; 
						&:after{
							content: "";
					         height: 2px;
					         width: 50px;
					         background: #fff;
					         left: 50%;
					         margin-left: -25px;
					         bottom: -20px;
					         display: block;
					         position: absolute;
					         
						}
					}
					.maskertext{
						padding-left: 20px;
						padding-right: 20px;
						margin-top: 50px;
						
						p{
							position:relative; 
							color: #fff;
							font-size: 16px;
							margin-top: 16px;
							&:first-child{
								margin-top: 0;
							}
							
						
						}
						
						
					}
					
				}
				
			}
		}
		.more-destinations{
			width: 318px;
			height: 42px;
			line-height: 42px;
			text-align: center;
			border-radius: 21px;
			margin-top: 30px;
			background: #d2d5da;
			font-size: 14px;
			color: #fff;
			cursor: inherit;
		}
		.cur{
			cursor: inherit;
		}
	}
</style>