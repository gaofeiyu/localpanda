<template>
	<div class="banner">
		
		<div v-swiper:mySwiper="swiperOptionBannerPc">
	    <div class="swiper-wrapper">
	      <div class="swiper-slide" v-for="slide in swiperSlides">
	        <a :href="slide.link">
				<div class="imgBanner" :style="{background:'url('+slide.url+')'}">
					
					<span>{{slide.loc}}</span>
				</div>
				
			</a>
	      </div>
	    </div>
	    <div class="swiper-pagination"></div>
	  </div>
		<div class="text">
			<p>Guides, Tours, and Activities</p>
			<p>It's your China adventure, led by locals</p>
		</div>
	</div>

</template>
<script>
	import bus from '~/assets/js/pages/bus.js'
	if (process.browser){
	  	const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  		bus.use(VueAwesomeSwiper)
	  	require('swiper/dist/css/swiper.css')
	};
	export default {
		
		name: "banner",
		data() {
			return {
				swiperOptionBannerPc: {
					lazy: true,
					autoplay: true,
					speed:1000,
					loop:true,
					pagination: {
						el:'.swiper-pagination'
						},
					effect : 'fade',
					paginationClickable :true,
					
					
				},
				deviceWidth:null,
				swiperSlides: [
					{
						url: "https://d2q486kjf9cwwu.cloudfront.net/static/homePage/banner1.jpg",
						link:'/activity/recommend/Beijing/Popular-and-Classic-Tours',
						loc:'Beijing Tours'
						
						
					},
					{
						url:"https://d2q486kjf9cwwu.cloudfront.net/static/homePage/banner2.jpg",
						link:'/activity/recommend/Shanghai/Popular-and-Classic-Tours',
						loc:'Shanghai Tours'
					}
					
				]
			}

		},
		components: {
			
		},
		methods: {
			
		},
		created(){
		
		}
	}
</script>
<style lang="scss">

.swiper-pagination-bullet-active {
		background:#fff;
		width: 10px;
		height: 10px;
		border:2px solid #1bbc9d!important;
		background:#fff!important;;
		
		
		
		}

	.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
		bottom: 20px!important;
	}

	.swiper-pagination-bullet{
			margin:0 2.5px!important;
			border:2px solid #fff;
			opacity: 1!important;
			
			
	}
	/*@media (max-width: 767px){
		.imgBanner{
			width:100%;
			height:7.04rem!important;
			background-size: cover!important;
			background-position:center!important;
			text-align: center;
			span{
				font-size: 0.266666rem!important;
			}
			
			
		}
		.swiper-pagination-bullet{
				width:0.106666rem!important;
				height: 0.106666rem!important;
				border:2px solid #fff;
		}
		.swiper-pagination-bullet-active {
			background:#fff!important;
			width:0.106666rem!important;
			height: 0.106666rem!important;
			border:2px solid #1bbc9d!important;
		
		}
		.text{
				width: 100%!important;
				text-align: center;
				height: auto!important;
			
				p{
				
					font-weight: bold;
					font-size:0.853333rem!important;
					color:#fff;
					text-shadow :2.5px 2.5px 10px rgba(0,0,0,.3);
					&:last-child{
						padding-top: 0;
						font-size: 0.426666rem!important;
						margin-top: 0.133333rem;
						
						
					}
				}
				
			}
	}*/
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.banner {
		
		
		
		position: relative;
		.imgBanner{
			width:100%;
			height:500px;
			
			background-size: cover!important;
			background-position:center!important;
			text-align: center;	
			span{
				position: absolute;
				right: 20px;
				bottom:25px;
				
				color: #fff;
				font-size: 18px;
				
				
			}
		}

		
		.text{
			height:112px;
			width:830px;
			position: absolute;
			z-index:100;
			left:50%;
			top:50%;
			transform: translate(-50%,-50%);
			p{
				text-align: center;
				font-weight: bold;
				font-size: 50px;
				color:#fff;
				text-shadow :2.5px 2.5px 10px rgba(0,0,0,.3);
				&:last-child{
					padding-top: 0;
					font-size: 24px;
					margin-top: 10px;
					
					
				}
			}
		}
	}
	
</style>