 <template>
    <div id="activitiesDetail">
       <HeaderCommon :logIn="logIn"></HeaderCommon>
       <Meau v-if="isShowMeau"></Meau>
		<ActivityBanner :bannerPhotos="detail.bannerPhotos" :destination="destination"></ActivityBanner>
        
        <Activities :remark="remark" :introduction="introduction" :isShowBookNow="isShowBookNow" :isscroll="isscroll" :picInfo="picInfo" :id="id" :detail="detail" :highlights="highlights" :destinations="destinations" :itemsIncluded="itemsIncluded" :recommed="recommed"></Activities>
       
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
import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
import FooterCommon from "~/components/FooterCommon/FooterCommon";
import ActivityBanner from "~/components/pageComponents/activity/details/ActivityBanner";
import Activities from "~/components/pageComponents/activity/details/Activities";
import Meau from "~/components/pageComponents/activity/details/Meau";
import { delNullArr } from "~/assets/js/plugin/utils";

import Vue from 'vue';

export default {
  name: "activitiesDetail",
  async asyncData({ route, store, error, apiBasePath, redirect }) {
    let id = route.params.id;
    // 服务端渲染部分 这部分操作还没有页面实例，只是初始化页面数据
    let data = {
      detail: {}, //详情数据
      highlights: [], //highlights字符串转成数组
      destinations: "", //目的地
      itemsIncluded: [], //itemsIncluded转成数组
      logIn: "",
      id: id,
      isShowMeau: false,
      isShowBookNow: false,
      isscroll: false,
      introduction: "",
      remark: [],
      destination: "",
      toast: "This activity was booked by another guest an hour ago",
      toastShow: false
    };
    let response = {};
    let apiActivityPriceRes = {};
    let apiActivityRecommendRes = {};
    try {
      response = await Vue.axios.get(apiBasePath + "activity/basic/" + id);
      if (response.data.valid == 1) {
        data.detail = response.data;
        response.data.highlights
          ? (data.highlights = delNullArr(response.data.highlights.split("\n")))
          : "";
        response.data.itemsIncluded
          ? (data.itemsIncluded = delNullArr(
              response.data.itemsIncluded.split("\n")
            ))
          : "";
        data.destinations = response.data.destinations.join(", ");
        response.data.introduction
          ? (data.introduction = delNullArr(
              response.data.introduction.split("\n")
            ))
          : "";
        response.data.remark
          ? (data.remark = delNullArr(response.data.remark.split("\n")))
          : "";
        data.destination = response.data.destinations[0];

        if (response.data.latestBooking < 1) {
          data.toast =
            "This activity was booked by another guest in the past hour.";
        } else if (response.data.latestBooking == 1) {
          data.toast = "This activity was booked by another guest an hour ago.";
        } else {
          data.toast =
            "This activity was booked by another guest " +
            response.data.latestBooking +
            " hours ago.";
        }
      } else {
        return error({ statusCode: 500, message: "500" });
      }


      apiActivityRecommendRes = await Vue.axios.get(
        apiBasePath + "activity/recommend/" + id
      );
      data.recommed = apiActivityRecommendRes.data;

      apiActivityPriceRes = await Vue.axios.get(
        apiBasePath + "activity/price/" + id
      );
      // if (apiActivityPriceRes.data.available == 1) {
        data.picInfo = apiActivityPriceRes.data;
        data.picInfo.departureTime
          ? (data.time = data.picInfo.departureTime[0])
          : (data.time = "");
      // } else {
        // return redirect("/");
      // }
    } catch (err) {
      console.log(err);
      return error({ statusCode: 500, message: JSON.stringify(err) });
    }
    console.log(data);
    return data;
  },
  components: {
    HeaderCommon,
    FooterCommon,
    ActivityBanner,
    Activities,
    Meau
  },
  methods: {
    scorllBar() {
      let data = this;
      var hightLights =
        document.getElementById("heightLights").offsetTop +
        document.getElementById("banner").offsetHeight +
        60 -
        76;
      var recommendTop;
      document.getElementById("recommend").offsetTop
        ? (recommendTop = document.getElementById("recommend").offsetTop)
        : (recommendTop = 2000);

      if (window.scrollY > hightLights && window.scrollY < recommendTop) {
        data.isShowMeau = true;
        data.isShowBookNow = true;
        data.isscroll = true;
      } else if (window.scrollY > recommendTop) {
        data.isShowBookNow = false;
      } else {
        data.isShowMeau = false;
        data.isShowBookNow = false;
        data.isscroll = false;
      }
    }
  },
  mounted: function() {
    let data = this;
    this.logIn = window.localStorage.getItem("logstate");
    window.addEventListener("scroll", this.scorllBar);
  },
  watch: {
    "detail.latestBooking": function(val, oldVal) {
      console.log(val);
      let data = this;
      if (val) {
        setTimeout(function() {
          data.toastShow = true;
        }, 3000);
      } else {
        data.toastShow = false;
      }
    }
  }
};
</script>
<style lang="scss">
@import "~assets/scss/_main.scss";
@import "~/assets/font/iconfont.css";
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
.icon {
  width: 36px;
  height: 36px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#activitiesDetail {
  overflow-x: hidden;
  .bannerImg {
    height: 552px;
    img {
      width: 100%;
      height: 100%;
    }
    .pic {
      position: relative;
      width: 1170px;
      margin: 0 auto;
      .view {
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
  .toast-container {
    position: fixed;
    bottom: 12px;
    left: 12px;
    animation: fa 8s ease-in-out forwards;
    padding: 10px 20px;
    transform: translateY(100%);
    width: 260px;
    background: #565e66;
    .toast-text {
      float: right;
      font-size: 16px;
      color: #fff;
      width: 200px;
    }
    @keyframes fa {
      0% {
        transform: translateY(100%);
      }
      10% {
        transform: translateY(0);
      }
      20% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(0);
        opacity: 1;
      }
      70% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(0);
        opacity: 0;
      }
    }
  }
}
</style>
