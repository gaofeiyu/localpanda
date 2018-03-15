<template>
	<div class="topSeach">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="hotbanner" :class="loc=='Beijing'?'beijing':'shanghai'">
			<p v-if="loc=='Beijing'">
				<span>Beijing</span> History, Culture, and Art in China’s Capital
				</br> Our guides can speak English, Spanish, Russian, Japanese, Korean and other languages.
			</p>
			<p v-else>
				<span>Shanghai</span> Where China’s past and future collide
				</br> Our guides can speak English, Spanish, Russian, Japanese, Korean and other languages.
			</p>
		</div>
		<div class="topSeachInfo">
			
			<div class="seachType">
				<div class="swiper-button-prev" ><i class="iconfont">&#xe615;</i></div>
				<div class="swiper-button-next" ><i class="iconfont">&#xe620;</i></div>
				<!--<swiper :options="swiperOption" v-if="loc=='Beijing'">

					<swiper-slide v-for="slide in swiperSlides" >
						<a @click="GaAll" :class="link==slide.url?'cur':''" :href="link==slide.url?'javascript:':slide.url">
							<div class="seachItem" :class="link==slide.url?'border':''" v-bind:style="{backgroundImage:'url(' + slide.imgUrl + ')'}">
								<div :class="link==slide.url?'curColor':''" v-html="slide.keywords"></div>
							</div>
						</a>
					</swiper-slide>
				</swiper>-->
				<div v-swiper:mySwiper="swiperOption" v-if="loc=='Beijing'">
				    <div class="swiper-wrapper">
				      <div class="swiper-slide" v-for="slide in swiperSlides">
				        <a @click="GaAll" :class="link==slide.url?'cur':''" :href="link==slide.url?'javascript:':slide.url">
							<div class="seachItem" :class="link==slide.url?'border':''" v-bind:style="{backgroundImage:'url(' + slide.imgUrl + ')'}">
								<div :class="link==slide.url?'curColor':''" v-html="slide.keywords"></div>
							</div>
						</a>
				      </div>
				    </div>
				  </div>
				  <div v-swiper:mySwiper="swiperOption" v-else>
				    <div class="swiper-wrapper">
				      <div class="swiper-slide" v-for="item in slides">
				       <a @click="GaAll" :class="link==item.url?'cur':''" :href="link==item.url?'javascript:':item.url">
							<div class="seachItem" :class="link==item.url?'border':''"  v-bind:style="{backgroundImage:'url(' + item.imgUrl + ')'}">
								<div :class="link==item.url?'curColor':''" v-html="item.keywords"></div>
							</div>
						</a>
				      </div>
				    </div>
				  </div>
				<!--<swiper :options="swiperOption" v-else>

					<swiper-slide v-for="item in slides">
						<a @click="GaAll" :class="link==item.url?'cur':''" :href="link==item.url?'javascript:':item.url">
							<div class="seachItem" :class="link==item.url?'border':''"  v-bind:style="{backgroundImage:'url(' + item.imgUrl + ')'}">
								<div :class="link==item.url?'curColor':''" v-html="item.keywords"></div>
							</div>
						</a>
					</swiper-slide>
				</swiper>-->
			</div>

			<div class="searchList">
				<h3>
					{{information.title}}
					<a v-if="loc=='Beijing'"  href="https://www.localpanda.com/activity/list/Beijing">All Beijing Activities</a>
					<a v-if="loc=='Shanghai'" href="https://www.localpanda.com/activity/list/Shanghai">All Shanghai Activities</a>
				</h3>

				<div class="topSearchList clearfix">
					<div class="topSearchList-item" v-for="item in activities">
						<a :href="'https://www.localpanda.com/activity/details/'+item.activityId" target="_blank">
							<p v-if="item.recommendedReason" class="title" :title="item.recommendedReason" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">{{item.recommendedReason}}</p>
							<div class="activity">

								<div class="activity-photo" v-lazy:background-image="item.coverPhotoUrl">

								</div>

							</div>
							<div class="activitDe">
								<div class="info">
									<div class="activeType clearfix">
										<div class="tourType"><i class="iconfont">&#xe653;</i>{{item.category}}</div>
										<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
									</div>
									<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
										{{item.title}}
									</div>
									<div class="totalPic">
										<div class="oldpic" v-if="item.originalPrice">${{returnFloat(item.originalPrice)}}</div>
										<div class="nowPic">From <b>${{returnFloat(item.bottomPrice)}}</b><span>  pp</span></div>
									</div>
								</div>

							</div>
							<div class="highlights">
								<b><span>Highlights</span></b>
								<ul v-if="item.highlights">
									<li v-for="i in delNullArr(item.highlights.split('\n'))">{{i}}</li>
								</ul>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<Bottom :scrollTop="300"></Bottom>
		<FooterCommon></FooterCommon>
	</div>

</template>

<script>
	import Vue from "vue";
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Bottom from '~/components/bottom/Bottom'
	import bus from '~/assets/js/pages/bus.js'
	if (process.browser) {
	  	const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  		bus.use(VueAwesomeSwiper)
	  	require('swiper/dist/css/swiper.css')
	}
	export default {
		name: 'activityRecommend',
		async asyncData ({route, store, error, apiBasePath, redirect }) {
			let loc=route.params.loc;
			let keywords=route.params.keywords;
			 let data={
			 	logIn: '',
				showBook: false,
				information: '',
				activities: [],
				link:'',
				loc:loc,
				keyword:keywords,
				swiperLeftBtnStatus:false,
				swiperRightBtnStatus:true,
				activeIndex: '',
				swiperOption: {
					setWrapperSize: true,
					slidesPerView: 6,
					spaceBetween: 20,
					mousewheelControl: false,
					noSwiping : true,
					 navigation: {
			            nextEl: '.swiper-button-next',
			            prevEl: '.swiper-button-prev'
			         },
					initialSlide: 0,
				
				},
				slides:[
					{
						keywords:"Popular & <br/>Classic Tours",
						url:"/activity/recommend/Shanghai/Popular-And-Classic-Tours",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/PopularAndClassicTours.jpg'
					},
					{
						keywords:"Sales & <br/>Deals",
						url:"/activity/recommend/Shanghai/Sales-and-Deals",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/SalesAndDeals.jpg'
					},
					{
						keywords:"Ancient <br/>Water Towns",
						url:"/activity/recommend/Shanghai/Ancient-Water-Towns",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/AncientWaterTowns.jpg'
					},
					{
						keywords:"Day Trips & Excursions",
						url:"/activity/recommend/Shanghai/Day-Trips-and-Excursions",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/DayTripsAndExcursions.jpg'
					},
					{
						keywords:"City Tours",
						url:"/activity/recommend/Shanghai/City-Tours",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/CityTours.jpg'
					},
					{
						keywords:"Layover<br/> Tours & Quick Excursions",
						url:"/activity/recommend/Shanghai/Layover-Tours-and-Quick-Excursions",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/LayoverToursAndQuickExcursions.jpg'
					},
					{
						keywords:"Food & Local Experiences",
						url:"/activity/recommend/Shanghai/Food-and-Local-Experiences",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/FoodAndLocalExperiences.jpg'
					},
					{
						keywords:"Affordable Group Tours",
						url:"/activity/recommend/Shanghai/Affordable-Group-Tours",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/AffordableGroupTours.jpg'
					},
					{
						keywords:"Multi-day & Extended <br/> Tours",
						url:"/activity/recommend/Shanghai/Multi-day-and-Extended-Tours",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Multi-dayAndExtendedTours.jpg'
					},
					{
						keywords:"Shows & <br/>Tickets",
						url:"/activity/recommend/Shanghai/Shows-and-Tickets",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/ShowsAndTickets.jpg'
					}
				],
				swiperSlides: [
					{
						keywords: "Popular & Classic Tours",
						url: "/activity/recommend/Beijing/Popular-and-Classic-Tours",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/PopularAndClassicTours.jpg'
					},
					{
						keywords: "Sales & Deals",
						url: "/activity/recommend/Beijing/Sales-and-Deals",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/SalesAndDeals.jpg'
					},
					{
						keywords: "Great Wall of China",
						url: "https://www.localpanda.com/activity/recommend/Beijing/Great-Wall-of-China",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/GreatWallofChina.jpg'
					},
					{
						keywords: "Walking & <br/>City Tours",
						url: "/activity/recommend/Beijing/Walking-and-City-Tours",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/WalkingAndCityTours.jpg'
					},
					
					{
						keywords: "Layover <br/>Tours & Quick Excursions",
						url: "/activity/recommend/Beijing/Layover-Tours-and-Quick-Excursions",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/LayoverToursAndQuickExcursions.jpg'
					},
					{
						keywords: "Food & Local Experiences",
						url: "/activity/recommend/Beijing/Food-and-Local-Experiences",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/FoodAndLocalExperiences.jpg'
					},
					{
						keywords: "Multi-day & Extended <br/> Tours",
						url: "https://www.localpanda.com/activity/recommend/Beijing/Multi-day-and-Extended-Tours",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Multi-dayAndExtendedTours.jpg'
					},
					{
						keywords: "Shows &<br/> Tickets",
						url: "/activity/recommend/Beijing/Shows-and-Tickets",
						imgUrl:'https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/ShowsAndTickets.jpg'
					},
				]
			}
			let listdata={}
			try {
		        listdata = await Vue.axios.get(apiBasePath+"/recommend/"+ data.loc + "/" + data.keyword)
		       
			 	
		      } catch (err) {
		      	//return error(JSON.stringify(err));
		    }
	 		data.information=listdata.data
	 		data.activities=data.information.references
			 
			return data
		},
		components: {
			HeaderCommon,
			FooterCommon,
			Bottom
		},
		methods: {
			delNullArr(array) {
				for(var i = 0; i < array.length; i++) {
					if(array[i] == "" || typeof(array[i]) == "undefined") {
						array.splice(i, 1);
						i = i - 1;

					}

				}
				return array;
			},
			GaAll(){
				ga('gtag_UA_107010673_1.send', {
					hitType: 'event',
					eventCategory: 'Link',
					eventAction: 'Click',
					eventLabel: 'activity_theme_switch',

				});
			},
			returnFloat(value) {
				var value = Math.round(parseFloat(value) * 100) / 100;
				var xsd = value.toString().split(".");
				if(xsd.length == 1) {
					value = value.toString() + ".00";
					return value;
				}
				if(xsd.length > 1) {
					if(xsd[1].length < 2) {
						value = value.toString() + "0";
					}
					return value;
				}
			},
			/*getMes() {
				let that = this
				that.axios.get("http://13.59.63.205/api/recommend/" + that.loc + "/" + that.keyword).then(function(resopnse) {
					console.log(resopnse)
					that.information = resopnse.data
					that.activities = resopnse.data.references
					//that.recommendations = resopnse.data.recommendations
				}, function(resopnse) {

				})
			}*/

		},
		filters: {

			firstUpperCase(val) {
				if(val)
					return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		mounted: function() {
			let that = this
			
			that.link=location.href
			
			//that.getMes()
			that.logIn = localStorage.getItem("logstate");
			/*var title = document.getElementsByTagName("title")[0];
			var keywords = document.querySelector("meta[name=keywords]");
			var description = document.querySelector("meta[name=description]");
			title.innerHTML = "The Top Local " + that.loc + " Tours | The Best Authentic " + that.loc + " Activities and Experiences."
			keywords.setAttribute("content", "Things to do in " + that.loc + ", " + that.loc + " destinations, " + that.loc + " landmarks, top things to see in " + that.loc + ", " + that.loc + " tourist attractions, Best " + that.loc + " tours, " + that.loc + " tours, " + that.loc + " walking tours, " + that.loc + " sightseeing")
			if(that.loc == "Beijing") {
				description.setAttribute("content", "Experience the best things to do in " + that.loc + ", walking & biking tours, history & culture tours, explore the Forbidden City, Temple of Heaven, Great Wall, Tiananmen Square, and Summer Palace, see dying hutongs, enjoy Peking duck & opera, cooking & Tai Chi classes, and cheap shopping")
			} else if(that.loc == "Shanghai") {
				description.setAttribute("content", "Experience the best things to do in " + that.loc + ", walking & biking tours, history & culture tours, explore the bund & French concession, see local dying neighborhoods, enjoy tea ceremonies, wet markets, and cheap shopping")
			} else if(that.loc == "Suzhou") {
				description.setAttribute("content", "Experience the best things to do in " + that.loc + ", walking & biking tours, history & culture tours, explore Suzhou Gardens, Canals, and Silk crafts & production, see ancient water towns, enjoy stunning photography, local traditions, and cheap shopping")
			}
*/
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	body,
	html {
		height: 100%;
		background: #FAF9F8!important;
	}
	
	#headercommon {
		background: #fff!important;
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.topSeach {
		overflow-X:hidden;
		.hotbanner {
			display: -webkit-box;
			-webkit-box-pack: center;
			-webkit-box-align: center;
			&.beijing {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Beijing.jpg") no-repeat;
				background-size: cover;
			}
			&.shanghai {
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Shanghai.jpg") no-repeat;
				background-size: cover;
			}
			height:260px;
			p {
				span {
					display: block;
					font-size: 38px;
					font-weight: bold;
					margin-bottom: 6px;
					text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, .3);
				}
				text-align: center;
				text-shadow :2.5px 2.5px 10px rgba(0,
				0,
				0,
				.3);
				color: #fff;
				font-size: 20px;
			}
		}
		.topSeachInfo {
			padding-bottom: 100px;
			width: 1170px;
			margin: 0 auto;
			
			.seachType {
				margin-top: 20px;
				position: relative;
				.seachItem {
					width: 178px;
					height: 130px;
					background: #000;
					font-size: 24px;
					color: #fff;
					
					display: table;
					div{
						display: table-cell;
						vertical-align: middle;
						width: 70%;
						text-align: center;
						background:rgba(0,0,0,0.3);
						&:hover{
							background:rgba(0,0,0,0)
						}
					}
				}
			}
			.searchList {
				margin-top: 60px;
				h3 {
					font-size: 32px;
					color: #3a3a3a;
					font-weight: bold;
					a{
						float: right;
						font-size: 18px;
						text-decoration: underline;
					}
				}
				.import-text {
					text-align: center;
					font-size: 16px;
					color: #3a3a3a;
					width: 800px;
					margin: 10px auto 0;
					line-height: 24px;
				}
				.topSearchList {
					margin-top: 10px;
					.topSearchList-item {
						position: relative;
						float: left;
						overflow: hidden;
						background: #fff;
						margin-right: 30px;
						&:nth-child(3n+0) {
							margin-right: 0;
						}
						width:370px;
						margin-top: 30px;
						.title {
							height: 72px;
							width: 330px;
							overflow: hidden;
							border-left: 4px solid #1bbc9d;
							text-overflow: ellipsis;
							display: -webkit-box;
							display: -moz-box;
							-moz-box-orient: vertical;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							-moz-line-clamp: 3;
							-o-text-overflow: ellipsis;
							word-wrap: break-word;
							margin: 30px 20px 20px;
							font-size: 20px;
							font-weight: bold;
							position: relative;
							padding-left: 14px;
							line-height: 24px;
						}
						.activity {
							.activity-photo {
								width: 370px;
								height: 188px;
								background-repeat: no-repeat!important;
								background-size: cover!important;
								position: relative;
								.type {
									position: absolute;
									top: 10px;
									left: 10px;
									padding: 5px;
									font-size: 14px;
									font-weight: bold;
									background: #f4b33f;
									color: #fff;
								}
							}
						}
						.activitDe {
							padding: 0 20px 20px;
							.activeType {
								height: 48px;
								line-height: 48px;
								.tourType {
									float: left;
									color: #d87b65;
									font-size: 14px;
									i {
										font-size: 12px;
										margin-right: 8px;
									}
								}
								.duration {
									float: right;
									font-size: 14px;
									color: #878e95;
									i {
										font-size: 12px;
										margin-right: 8px;
									}
								}
							}
							.titleText {
								width: 100%;
								height: 48px;
								text-overflow: ellipsis;
								display: -webkit-box;
								display: -moz-box;
								-moz-box-orient: vertical;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								-moz-line-clamp: 2;
								-o-text-overflow: ellipsis;
								word-wrap: break-word;
								font-size: 20px;
								font-weight: bold;
								text-align: left;
								overflow: hidden;
							}
							.totalPic {
								height: 40px;
								padding: 20px 0 0;
								.oldpic {
									text-align: right;
									font-size: 14px;
									color: #878e95;
									text-decoration: line-through;
								}
								.nowPic {
									text-align: right;
									font-size: 14px;
									color: #878e95;
									b {
										color: #353a3f;
										font-size: 20px;
									}
									span {
										color: #353a3f;
									}
								}
							}
						}
						&:hover .highlights {
							-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							transform: translateY(0);
						}
						.highlights {
							position: absolute;
							top: 0;
							left: 0;
							transform: translateY(200%);
							-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							background-image: linear-gradient(135deg, #009efd 0%, #1bbc9d 100%);
							width: 100%;
							height: 100%;
							b {
								color: #fff;
								font-size: 20px;
								margin-top: 50px;
								display: block;
								text-align: center;
								span {
									position: relative;
									&:after {
										left: 50%;
										margin-left: -50%;
										content: "";
										height: 2px;
										width: 100%;
										background: #fff;
										bottom: -24px;
										display: block;
										position: absolute;
									}
								}
							}
							ul {
								padding: 50px 20px 0;
								height: 250px;
								li {
									color: #FFF;
									font-size: 16px;
									position: relative;
									padding-left: 16px;
									margin-top: 12px;
									line-height: 22px;
									&:first-child {
										margin-top: 0;
									}
									&:after {
										position: absolute;
										content: "";
										width: 4px;
										height: 4px;
										border-radius: 50%;
										background: #FFF;
										left: 0;
										top: 8px;
									}
								}
							}
						}
					}
				}
			}
		}
		.margin {
			margin-top: 30px;
		}
		.swiper-button-prev {
			background-image: none;
			width: 40px;
			height: 40px;
			background: #fff;
			box-shadow: 1px 3px 3px rgba(53, 58, 63, 0.2);
			
			text-align: center;
			line-height: 40px;
			border-radius: 50%;
			left: -20px;
			z-index: 999;
			opacity: 1;
			&:hover{
				background: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%);
				color: #fff;
			}
		}
		.swiper-button-next {
			background-image: none;
			
			width: 40px;
			height: 40px;
			background: #fff;
	        
			box-shadow: 1px 3px 3px rgba(53, 58, 63, 0.2);
			text-align: center;
			line-height: 40px;
			border-radius: 50%;
			right: -20px;
			z-index: 999;
			opacity: 1;
			&:hover{
				background: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%);
				color: #fff;
			}
		}
		.swiper-button-disabled {
			display: none;
			
		}
		.cur{
			cursor:auto;
		}
		.border{
			border:2px solid #1bbc9d;
			
		}
		.curColor{
			background:rgba(0,0,0,0)!important;
			
		}
		
	}
</style>