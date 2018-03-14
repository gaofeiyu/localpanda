 <template>
    <div id="activitiesDetail">
       <HeaderCommon :logIn="logIn"></HeaderCommon>
       <Meau v-if="isShowMeau"></Meau>
		<ActivityBanner :bannerPhotos="detail.bannerPhotos" :destination="destination"></ActivityBanner>
        
        <Activities :remark="remark" :introduction="introduction" :isShowBookNow="isShowBookNow" :isscroll="isscroll" :id="id" :detail="detail" :highlights="highlights" :destinations="destinations" :itemsIncluded="itemsIncluded"></Activities>
       
        <FooterCommon></FooterCommon>
       	<div class="toast-container" v-if="toastShow">
       		<div class="toast-message clearfix">
       			<span>
       				<svg class="icon" aria-hidden="true">
					    <use xlink:href="#icon-tishi"></use>
					</svg>
       			</span>
       			<div class="toast-text">
       				{{toast}}
       			</div>
       		</div>
       	</div>
        
    </div>
</template>

<script>
import HeaderCommon from '../../components/HeaderCommon/HeaderCommon';
import FooterCommon from '../../components/FooterCommon/FooterCommon';
import ActivityBanner from './components/ActivityBanner'
import Activities from './components/Activities'
import Meau from './components/Meau'
import {GetQueryString,getUrlParams,delNullArr}from '../../assets/js/plugin/utils'


export default {
    name: 'activitiesDetail',
    data () {
        return {
          	detail:{},//详情数据
			highlights:[],//highlights字符串转成数组
			destinations:'',//目的地
			itemsIncluded: [],//itemsIncluded转成数组
          	logIn:'',
          	id:getUrlParams(),
          	isShowMeau:false,
          	isShowBookNow:false,
          	isscroll:false,
          	introduction:'',
          	remark:[],
          	destination:'',
          	toast:"This activity was booked by another guest an hour ago",
          	toastShow:false
          	
        }
    },
    components: {
        HeaderCommon,
        FooterCommon,
        ActivityBanner,
        Activities,
        Meau
        
    },
    methods: {
		scorllBar(){
			let that=this
			var hightLights=document.getElementById("heightLights").offsetTop+document.getElementById("banner").offsetHeight+60-76;
			var recommendTop
			document.getElementById("recommend").offsetTop?recommendTop=document.getElementById("recommend").offsetTop:recommendTop=2000
			
			if(window.scrollY > hightLights && window.scrollY < recommendTop) {
				that.isShowMeau = true
				that.isShowBookNow = true
				that.isscroll=true
				

			} else if(window.scrollY > recommendTop) {
				that.isShowBookNow = false
			} else {
				that.isShowMeau = false
				that.isShowBookNow = false
				that.isscroll=false
				
			}
		},
        getInfo(){
        	let that=this
        	that.axios.get("https://www.localpanda.com/api/activity/basic/"+that.id).then(function(response){
        		if(response.data.valid==1){
        			that.detail=response.data
					response.data.highlights?that.highlights=delNullArr(response.data.highlights.split('\n')):''
					response.data.itemsIncluded?that.itemsIncluded=delNullArr(response.data.itemsIncluded.split('\n')):''
					that.destinations=response.data.destinations.join(", ")
					response.data.introduction?that.introduction=delNullArr(response.data.introduction.split('\n')):''
					response.data.remark?that.remark=delNullArr(response.data.remark.split('\n')):''
					that.destination=response.data.destinations[0]
					
					
					if(response.data.latestBooking<1){
						that.toast="This activity was booked by another guest in the past hour."
					}else if(response.data.latestBooking==1){
						that.toast="This activity was booked by another guest an hour ago."
					}else{
						that.toast="This activity was booked by another guest "+response.data.latestBooking+" hours ago."
					}
					
					var title=document.getElementsByTagName("title")[0];
					var keywords=document.querySelector("meta[name=keywords]");
					var description=document.querySelector("meta[name=description]")
					
					var keywordsContent=response.data.tourTypes.join(",")
					var descriptionContent=response.data.category+" "+response.data.duration+" "+response.data.durationUnit+" "+response.data.title
					title.innerHTML= response.data.title
					
					keywords.setAttribute("content",keywordsContent)
					description.setAttribute("content",descriptionContent)
					
        		}else{
        			
        			window.location.href = "https://www.localpanda.com/falsePage.html"
        		}
				
			},function(response){
				window.location.href = "https://www.localpanda.com/falsePage.html"
			})
        }
    },
    mounted: function() {
    	let that=this
    	this.id=getUrlParams()
       	this.getInfo()
        this.logIn=window.localStorage.getItem("logstate")
        window.addEventListener('scroll', this.scorllBar)
    },
    watch:{
    	"detail.latestBooking":function(val,oldVal){
    		console.log(val)
    		let that=this
    		if(val){
    			
    			setTimeout(function(){
    				that.toastShow=true
	        	},3000)
    		}else{
    			that.toastShow=false
    		}
    	}
    	
    }
}
</script>
<style lang="scss">
   @import '../../assets/scss/_main.scss';
   @import '../../assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
@import "../../assets/scss/base/_setting.scss";
.icon {
   width: 36px; height: 36px;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
#activitiesDetail{
	overflow-x:hidden;
    .bannerImg{
    	height:552px;
    	img{
    		width: 100%;
    		height:100%;
    	}
    	.pic{
    		position: relative;
    		width: 1170px;
    		margin:0 auto;
    		.view{
	    		position: absolute;
	    		width: 100px;
				height: 36px;
				line-height: 36px;
				text-align: center;
				background: #fff;
				box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
				border-radius: 3px;
				bottom: 20px;
			
    		}
    	}
    	
    }
    .toast-container{
    	position: fixed;
    	bottom:12px;
    	left:12px;
    	animation: fa 8s ease-in-out forwards;
    	padding: 10px 20px;
    	transform: translateY(100%);
    	width: 260px;
    	background:#565e66;
    	.toast-text{
    		float: right;
    		font-size: 16px;
    		color: #fff;
    		width: 200px;	
    	}
    	@keyframes fa{
			0%{
				transform: translateY(100%);
			}
			10%{
				transform: translateY(0);
			}
			20%{
				transform: translateY(0);
				opacity: 1;
			}
			50%{
				transform: translateY(0);
				opacity: 1;
			}
			70%{
				transform: translateY(0);
				opacity: 1;
			}
			100%{
				transform: translateY(0);
				opacity:0
			}
		}
		
    }
   
}
</style>
