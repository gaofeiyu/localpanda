<template>
	<div id="Guide">
		<div class="titleTag">
			<h3>Popular Guides</h3>
			<p>Professional tour guides with local knowledge and user-centered services</p>
		</div>
		<div class="guideList">
			<div class="guideListInfo">
				<!--<div class="swiper-button-prev" ><i class="iconfont">&#xe615;</i></div>
				<div class="swiper-button-next" ><i class="iconfont">&#xe620;</i></div>-->
				<ul class="guide-infomation clearfix">

					<li v-for="item in guidelist">
						<a :href="item.guideId?'/guide/detail/'+item.guideId:'#'">
							<div class="guide-infomation-img">
								<img v-lazy="item.headPortraitUrl" />
							</div>
							<div class="guide-infomation-introduce">
								<div class="guide-details">
									<h3>{{item.enName}}</h3>
									<span class="iconfont gradeList" v-for="i in item.pingfen">&#xe61f;</span>
									<p>{{item.location}}</p>
								</div>
								<div class="include ">
									<p v-if="item.vehicleAvailable==1"><i class="iconfont car">&#xe616;</i>Tour Guide with a Car</p>
									<p v-else><i class="iconfont car">&#xe607;</i>Tour Guide</p>
									<p><i class="iconfont cn">&#xe632;</i>{{item.englishLevel}}</p>
								</div>
								<div class="taglist">
									<span v-for="j in item.tourTypes">{{j}}</span>

								</div>
							</div>
							<div class="maskerList">
								<div class="maskerList-item">
									<h3>${{item.price}}</h3>
									<p>per day ({{item.hoursPerDay}} hours)</p>
									<div class="maskerListText">
										{{item.selfIntro}}
									</div>
								</div>
							</div>
						</a>
					</li>

				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: ["guidelist"],
		name: "Guide",
		data() {
			return {

				activeIndex: '',
				btnLeftFlag: true,
				btnRgightFlag: false,
				/*swiperOptionMob:{
					slidesPerView:1 ,
					spaceBetween:20,
					paginationClickable: true,
					mousewheelControl: false,
					initialSlide: 0,
					onSlideChangeEnd: function(swiper){
				      //console.log(swiper.slides.length)
				      	
				      	//swiper.width=swiper.width-140+"px"
				       //切换结束时，告诉我现在是第几个slide
				    }
				},*/
				swiperOptionPic: {
					setWrapperSize: true,
					slidesPerView: 4,
					spaceBetween: 30,
					paginationClickable: true,
					mousewheelControl: false,
					/*prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',*/
					initialSlide: 0,
				},

			}

		},
		components: {},
		mounted() {

		},

		methods: {

		}

	}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	#Guide {
		margin-top: 60px;
		.guideList {
			background: url("https://d2q486kjf9cwwu.cloudfront.net/static/homePage/background.jpg") no-repeat;
			background-size: cover;
			height: 488px;
			padding-top: 31px;
			.guideListInfo {
				width: 1170px;
				margin: 0 auto;
				.guide-infomation {
					width: 1170px;
					li {
						overflow: hidden;
						position: relative;
						width: 277px;
						margin-right:20px;
						&:nth-child(2){
							margin-right: 22px;
						}
						&:last-child{
							margin-right: 0;
						}
						&:hover .maskerList {
							-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							transform: translateY(0);
						}
						.maskerList {
							position: absolute;
							width: 100%;
							height: 100%;
							top: 0;
							transform: translateY(200%);
							-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							background-image: linear-gradient(135deg, #1bbc9d 0%, #009efd 100%);
							.maskerList-item {
								margin: 48px 27px;
								text-align: center;
								color: #fff;
								h3 {
									font-size: 26px;
									font-weight: bold;
								}
								p {
									font-size: 20px;
									font-weight: bold;
									position: relative;
									&:after {
										content: "";
										position: absolute;
										bottom: -26px;
										width: 42px;
										height: 2px;
										background: #fff;
										left: 40%;
									}
								}
								.maskerListText {
									line-height: 26px;
									height: 234px;
									font-size: 16px;
									margin-top: 52px;
									position: relative;
									overflow: hidden;
									&:after {
										content: ".....";
										position: absolute;
										bottom: 0;
										right: 0;
										background: #009efd;
									}
								}
							}
						}
						float: left;
						
						.guide-infomation-img {
							height: 184px;
							img {
								height: 184px;
								width: 277px;
							}
						}
						.guide-infomation-introduce {
							width: 249px;
							padding: 14px 14px 24px;
							background: #fff;
							.guide-details {
								text-align: center;
								h3 {
									font-size: 22px;
									color: #353a3f;
									font-weight: bold;
									margin-bottom: 10px;
								}
								span {
									font-size: 14px;
								}
								p {
									color: #353a3f;
									;
									font-size: 18px;
								}
							}
							.include {
								margin-top: 10px;
								p {
									font-size: 16px;
									margin-top: 10px;
									i {
										margin-right: 14px;
										&.car {
											color: #f4b33f;
											font-size: 20px;
										}
										&.cn {
											font-size: 22px!important;
											color: #459aa9;
											vertical-align: middle;
										}
									}
								}
							}
							.taglist {
								margin-top: 10px;
								height: 66px;
								span {
									padding: 0 10px;
									height: 20px;
									line-height: 20px;
									border-radius: 20px;
									background: #d87b65;
									font-size: 12px;
									color: #fff;
									margin-bottom: 10px;
									margin-right: 10px;
									display: inline-block;
								}
							}
						}
					}
				}
			}
		}
	}
	
	.swiper-button-prev {
		background-image: none;
		width: 40px;
		height: 40px;
		background-color: #ffffff;
		box-shadow: 1px 3px 3px rgba(53, 58, 63, 0.2);
		text-align: center;
		line-height: 40px;
		border-radius: 50%;
		left: -20px;
		z-index: 100;
		opacity: 1;
	}
	
	.swiper-button-next {
		background-image: none;
		width: 40px;
		height: 40px;
		background-color: #ffffff;
		box-shadow: 1px 3px 3px rgba(53, 58, 63, 0.2);
		text-align: center;
		line-height: 40px;
		border-radius: 50%;
		right: -20px;
		z-index: 100;
		opacity: 1;
	}
	
	.swiper-button-disabled {
		display: none;
	}
	
	.swiper-slide {}
</style>