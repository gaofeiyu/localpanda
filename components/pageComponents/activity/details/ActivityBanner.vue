<template>
	<div id="banner">
		<div class="linkseting">
			<div class="linkinfo">
				<a href="/">Home</a>
				<em class="iconfont">&#xe64a;</em>
				<a v-if="destination=='Xi\'an'" href="/activity/list/Xian">Xi'an Activities</a>
				<a v-else :href="'/activity/list/'+destination">{{destination}} Activities</a>
				
				<em class="iconfont">&#xe64a;</em>
				<span>Activity Details</span>
			</div>
		</div>
		<div v-swiper:swiper="swiperOptionBannerPc">
			<div class="swiper-wrapper">
				<div class="swiper-slide" :key="index" v-for="(slide, index) in bannerPhotos">
					<img :src="slide"  />
				</div>
			</div>
			
		</div>
		<div class="swiper-button-prev swiper-button-white"></div>
    	<div class="swiper-button-next swiper-button-white"></div>
	</div>
</template>
<script>

import bus from '~/assets/js/pages/bus.js'
if (process.browser){
  	const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
	bus.use(VueAwesomeSwiper)
  	require('swiper/dist/css/swiper.css')
  	console.log(VueAwesomeSwiper)
};
export default {
  props: ["bannerPhotos", "destination"],
  name: "banner",
  data() {
    return {
      swiperOptionBannerPc: {
        lazy: true,
        autoplay: true,
        delay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 1000,
        loop: true,
        slidesPerView: 3,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        setWrapperSize: true,
		initialSlide: 0,
      },
    };
  },
  components: {},
  methods: {
    
  },
  mounted: function() {
   	 console.log(this.bannerPhotos)
  }
};
</script>
<style lang="scss" scoped>
#banner {
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .linkseting {
    width: 1170px;
    margin: 0 auto;

    .linkinfo {
      position: absolute;
      z-index: 200;
      top: 24px;
      a {
        color: #fff;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
        text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.3);
      }
      em {
        font-size: 12px;
        color: #fff;
        text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.3);
      }
      span {
        color: #fff;
        font-size: 14px;
        text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>