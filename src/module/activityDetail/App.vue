 <template>
    <div id="activitiesDetail">
       <HeaderCommon :logIn="logIn"></HeaderCommon>
		
       <ActivitiesType :ActivitiesInfo="ActivitiesInfo" :itemsIncluded="itemsIncluded" :activities="activities"></ActivitiesType>
        <FooterCommon></FooterCommon>
        <Bottom  :name="ActivitiesInfo.guideName" :scrollTop="300" :id="id"></Bottom>
        
    </div>
</template>

<script>
import HeaderCommon from '../../components/HeaderCommon/HeaderCommon';
import FooterCommon from '../../components/FooterCommon/FooterCommon';
import ActivitiesType from './components/ActivitiesType'
import {GetQueryString,getUrlParams}from '../../assets/js/plugin/utils'
import Bottom from './components/Bottom'

export default {
    name: 'activitiesDetail',
    data () {
        return {
          	ActivitiesInfo:"",
          	itemsIncluded:'',
          	guideId:'',
          	id:"",
          	activities:"",
          	tourTypes:'',
          	logIn:''
        }
    },
    components: {
        HeaderCommon,
        ActivitiesType,
        FooterCommon,
        Bottom,
   
        
    },
    methods: {
        getActivities(){
        	let that=this;
        	that.axios.get("https://www.localpanda.com/api/guide/activity/"+that.id).then(function(response){
        		that.ActivitiesInfo=response.data
        		if(response.data.itemsIncluded){
        			that.itemsIncluded=response.data.itemsIncluded.split("\n")
        		}
        		
        		for(var i = 0;i<that.itemsIncluded.length;i++){
					    if(that.itemsIncluded[i]==''){
					        that.itemsIncluded.splice(i,1);
					        i=i-1;
					    }
					}
        		that.guideId=response.data.guideId
        		that.getGuide()
        		var title=document.getElementsByTagName("title")[0];
				title.innerHTML= response.data.title
        		
        	},function(response){})
        },
        getGuide(){
        	let that=this
	   	 	that.axios.get('https://www.localpanda.com/api/guide/activity/recommend/'+that.id).then(function(response){
		    	
		    	that.activities=response.data
		    	
		    	
	    	},function(response){
	    		
	    		})
        }
    },
    mounted: function() {
    	this.id=getUrlParams()
        this.getActivities()
        this.logIn=window.localStorage.getItem("logstate")
        
    }
}
</script>
<style lang="scss">
   @import '../../assets/scss/_main.scss';
   @import '../../assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
@import "../../assets/scss/base/_setting.scss";
#activitiesDetail{
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
}
</style>
