<script>
	require('swiper/dist/css/swiper.css')
  
	export default {
		name: "pic",
		data() {
			return {
				alertPicActive: "",
				 swiperOptionTop: {
			          spaceBetween: 10,
			          loop: true,
			          loopedSlides: 5, //looped slides should be the same
			          navigation: {
			            nextEl: '.swiper-button-next',
			            prevEl: '.swiper-button-prev'
			          }
			        },
			        swiperOptionThumbs: {
			          spaceBetween: 10,
			          slidesPerView: 4,
			          touchRatio: 0.2,
			          loop: true,
			          loopedSlides: 5, //looped slides should be the same
			          slideToClickedSlide: true,
			        }
			      
			}
		},
		methods: {

			cancle() {
				this.$emit('alert-call-back', true);
				this.alertPicActive = false;
			}
			

		},
		watch: {
			alertPicStatus: function(val, oldVal) {
				if(val) {
					this.alertPicActive = true;
				} else {
					this.alertPicActive = false;
				}
			}
		},
		mounted:function() {
			let that=this
			that.$nextTick(function(){
		        const swiperTop = that.swiperTop;
		        
		        
		        console.log(that)
		        const swiperThumbs = that.swiperThumbs;
		        // swiperTop.controller.control = swiperThumbs
		        // swiperThumbs.controller.control = swiperTop
		      })
				
		},
		props: ['alertPicStatus']
	}
</script>
<template>
	<div id="pic" v-bind:class="['alertPicOuter',alertPicActive ? 'on' : 'off']">
		<div class="false" @click="cancle"><i class="iconfont">&#xe606;</i></div>
		<div v-bind:class="{'boxshow animated zoomIn' : alertPicActive , 'boxshow animated zoomOut' : !alertPicActive}">
			
			<div v-swiper:swiperTop="swiperOptionTop" class="gallery-top">
				<div class="swiper-wrapper">
					<div class="swiper-slide slide-1"></div>
					<div class="swiper-slide slide-2"></div>
					<div class="swiper-slide slide-3"></div>
					<div class="swiper-slide slide-4"></div>
					<div class="swiper-slide slide-5"></div>
				</div>
				<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
				<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
			</div>

			<div v-swiper:swiperThumbs="swiperOptionThumbs" class="gallery-thumbs">
				<div class="swiper-wrapper">
					<div class="swiper-slide slide-1"></div>
					<div class="swiper-slide slide-2"></div>
					<div class="swiper-slide slide-3"></div>
					<div class="swiper-slide slide-4"></div>
					<div class="swiper-slide slide-5"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	@import "~assets/scss/base/_animate.scss";
	.alertPicOuter {
		background: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		&.on {
			display: block;
		}
		&.off {
			display: none;
		}
		.boxshow {
			border-radius: 10px;
			width: 860px;
			/*height: 4.4rem;*/
			background: $white;
			overflow: hidden;
			position: absolute;
			height: 692px;
			left: 50%;
			top: 50%;
			margin: -346px 0 0 -430px;
				
			 .swiper-container {
			        width: 100%;
			        height: 300px;
			        margin-left: auto;
			        margin-right: auto;
			    }
			    
			         .swiper-slide {
					    background-size: cover;
					    background-position: center;
					    &.slide-1 {
					      background-image:url('~/static/banner/6.png');
					    }
					    &.slide-2 {
					      background-image:url('~/static/banner/6.png');
					    }
					    &.slide-3 {
					      background-image:url('~/static/banner/6.png');
					    }
					    &.slide-4 {
					      background-image:url('~/static/banner/6.png');
					    }
					    &.slide-5 {
					      background-image:url('~/static/banner/6.png');
					    }
  					
			    }
			    .gallery-top {
			        height: 80%;
			        width: 100%;
			    }
			    .gallery-thumbs {
			        height: 20%;
			        box-sizing: border-box;
			        margin-top: 10px;
			    }
			    .gallery-thumbs .swiper-slide {
			        height: 100%;
			        opacity: 0.4;
			        width: 138px;
			    }
			    .gallery-thumbs .swiper-slide-active {
			        opacity: 1;
			    }
			    
		}
		.false {
			&:hover {
				cursor: pointer;
			}
			i {
				font-size: 36px;
				color: #fff;
			}
			position: absolute;
			right: 40px;
			top: 31px;
		}
	}
</style>