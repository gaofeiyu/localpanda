 <template>
    <div class="indexst">
    <HeaderCommon :logIn="logIn" :isIndex="isIndex"></HeaderCommon>
        <Banner ></Banner>
        <MustGo ></MustGo>
       
        <Activities :activeList="initialState.activeList" ></Activities>
         <Guide :guidelist="initialState.guidelist" ></Guide> 
        <OurServices ></OurServices>
      <FooterCommon></FooterCommon>
        
    </div>
</template>

<script>
import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
import FooterCommon from '~/components/FooterCommon/FooterCommon';
import Banner from '~/components/Banner/Banner';
import MustGo from '~/components/pageComponents/index/MustGo';
import Activities from '~/components/pageComponents/index/Activities';
import Guide from "~/components/pageComponents/index/Guide";
import OurServices from '~/components/pageComponents/index/OurServices';
import axios from 'axios';
export default {
    async asyncData ({ route, store, error, env, apiBasePath}) {
      // 服务端渲染部分 这部分操作还没有页面实例，只是初始化页面数据
      let data = {
        id:["10023","10033","10045","10030"],
        activityId:["11015","11032","11031","11037","11043","11036"],
        guidelist:'',
        activeList:'',
        logIn:'',
        
        isIndex:true
      }
      let briefRes = {};
      let batchRes = {};
      try {
        briefRes = await axios.get(apiBasePath + 'guide/brief/' + data.id);
        batchRes = await axios.get(apiBasePath + 'activity/batch/' + data.activityId);
      } catch (err) {
        if (err.response.status !== 404) {
          return error({ statusCode: 500, message: store.state.lang.text.an_error_occured })
        }
        return error({ statusCode: 404, message: store.state.lang.text.api_page_not_found })
      }
      data.initialState = {
        guidelist: briefRes.data,
        activeList: batchRes.data
      };
      return data;
    },
    components: {
        HeaderCommon,
        FooterCommon,
        Banner,
        MustGo,
        Activities,
        Guide,
        OurServices
    },
    methods: {
        
    },
    created() {
    },
       
    mounted: function() {
    
    }
}
</script>
<style lang="sass">
   @import '~assets/scss/_main.scss';
   @import '~/assets/font/iconfont.css';
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
.indexst{
   
}
</style>
