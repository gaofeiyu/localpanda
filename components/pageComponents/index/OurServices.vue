<template>
	<div id="OurServices">
		<div class="titleTag">
			<h3>Why Local Panda?</h3>
			<p>Our quality services deliver a perfect travel experience</p>
		</div>
		<div class="OurServicesList">
			<ul>
				<li :class="{'fadein-first':show}">
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot" >&#xe650;</i>
						</div>
						<div class="text">
							<p v-for="i in logText1">{{i}}</p>
						</div>
					</div>
					
				</li>
				<li :class="{'fadein-two':show}">
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot">&#xe64f;</i>
						</div>
						<div class="text">
							<p v-for="i in logText2">{{i}}</p>
						</div>
					</div>
					
				</li>
				<li :class="{'fadein-three':show}">
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot">&#xe651;</i>
						</div>
						<div class="text">
							<p v-for="i in logText3">{{i}}</p>
						</div>
					</div>
					
				</li>
				<li :class="{'fadein-last':show}">
					<div class="servicesList-item">
						<div class="imglog">
							<i class="iconfont hot">&#xe64e;</i>
						</div>
						<div class="text">
							<p v-for="i in logText4">{{i}}</p>
						</div>
					</div>
					
				</li>
			
			</ul>
		</div>

	</div>

</template>

<script>
	export default {
		name: "OurServices",
		data() {
			return {
				
						
				logText1:["Real Locals","All guides are experts in the local area"],
			
				logText2:["Flat Rate","We don’t hide extra fees or charge per-person"],
			
				logText3:["Hand Picked Guides",'All our guides are carefully selected for their expertise and glowing customer reviews'],
			
				
				logText4:["Private & Customizable","No groups, no tourist traps. You’ll only do what you want at your own pace"],
				
				show:false,
			}
		},
		components: {},
		mounted() {
			window.addEventListener('scroll', (e) => {
	            this.getScroll();
	        })
		},
		methods: {
			getScroll(){
			
				if (window.scrollY > document.getElementById('OurServices').scrollHeight) {
	            	
	                this.show = true;
	            } else {
	                this.show = false;
	            }
			}
		}
	}
</script>
<style lang="scss">	
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	#OurServices{
		width: 1170px;
		margin:60px auto 0;
		.OurServicesList{
			ul{
				display:flex;
				box-sizing: content-box;
				-webkit-display:flex;
				-moz-display:flex;
				-o-display:flex;
				-ms-display:flex;
				li{
					-webkit-flex-shrink:0;
					-moz-flex-shrink:0;
					-o-flex-shink:0;
					-ms-flex-shink:0;
					width: 270px;
					margin-right:30px;
					transform:translateY(-10px);
					opacity: 0;
					&:first-child{
						
						i{
							font-size: 48px!important;
						}
						
					}
					&:nth-child(2){
						
						i{
							font-size: 46px!important;
						}
					}
					&:last-child{
						
						margin-right: 0;
					}
					&.fadein-first{
						animation: fadein 1s ease-in-out 0.7s forwards;
					}
					&.fadein-two{
						animation: fadein 1s ease-in-out 1.2s forwards;
					}
					&.fadein-three{
						animation: fadein 1s ease-in-out 1.6s forwards;
					}
					&.fadein-last{
						animation: fadein 1s ease-in-out 2s forwards;
					}
					@keyframes fadein{
						0%{
							transform: translateY(-10px);
							opacity: 0;
						}
						100%{
							transform: translateY(10px);
							opacity: 1;
						}
					}
					.servicesList-item{
						margin: 25px 0 60px;
						.imglog{
							width: 86px;
							height: 86px;
							background-color: #faf9f8;
							border-radius: 50%;
							margin: 0 auto;
							text-align: center;
							line-height: 86px;
							i{
								font-size: 40px;
								&.hot{
									background-image: -webkit-linear-gradient(135deg,#009efd,#1bbc9d);
								-webkit-text-fill-color: transparent;
								-webkit-background-clip: text;
								
								
								background-image: -moz-linear-gradient(135deg,#009efd,#1bbc9d);
								-moz-text-fill-color: transparent;
								-moz-background-clip: text;
								
								background-image: -moz-linear-gradient(135deg,#009efd,#1bbc9d);
								-ms-text-fill-color: transparent;
								-ms-background-clip: text;
								
								background-image: -o-linear-gradient(135deg,#009efd,#1bbc9d);
								-o-text-fill-color: transparent;
								-o-background-clip: text;
								}
								
							}
						}
						.text{
							text-align: center;
							margin-top: 24px;
							
							p{
								&:last-child{
									width: 190px;
									margin: 12px auto 0;
									font-size: 14px;
								}
								&:first-child{
									font-size: 18px;
									font-weight: bold;
								}
								
								color: #353a3f;
							}
						}
					}
				}
			}
		}

		
	}
	
</style>