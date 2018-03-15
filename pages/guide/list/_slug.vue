<template>
	<div class="guideList">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner" :class="loc=='Shanghai'?'shanghai':'beijing'">
			<div class="selectInfo">
				<div class="linkseting">
					<a href="/">Home</a>
					<em class="iconfont">&#xe64a;</em>
					<a href="javascript:" v-if="loc=='Shanghai'">Shanghai Guides</a>
					<a href="javascript:" v-else>Beijing Guides</a>
				</div>
				<div class="position">
					<span v-if="loc=='Shanghai'">Shanghai</span>
					<span v-else>Beijing</span>
					<el-select v-model="value" @change="changeVal(value)">
						<a :href="item.url" :key= "index" v-for="(item, index) in options">
							<el-option  :key="item.value" :label="item.label" :value="item.value" >
						
							</el-option>
						</a>
					</el-select>
				</div>
				
			</div>
		</div>
		<div class="selectType">
			<ul class="clearfix">
				<li>
					<a :href="'/activity/list/'+loc">
						<div class="bg">
							<div class="bgTitle">Activities</div>
							<p>Activities with the most authentic </p>
							<p>experiences, handpicked by our travel consultants</p>
						</div>
						
					</a>
				</li>
				<li>
					<div class="bg">
						<div class="bgTitle">Guides</div>
						<p>Professional tour guides with local </p>
						<p>knowledge and user-centered services</p>
					</div>
					
				</li>
			</ul>
		</div>
		<div class="list-cont">
			<ul>
				<li :key="index" v-for="(item, index) in guideList">
					<a :href="item.guideId ?'/guide/detail/'+item.guideId : '#'">
						<div class="guideHeadImg">
							<img v-lazy="item.headPortraitUrl">
						</div>
						<div class="guideHeadInfor">
							<h3>{{item.enName}}</h3>
							<!--<div class="grade">
								<span v-for="i in 5" class="iconfont gradeList">&#xe61f;</span>
							</div>-->
							<p>
								<span v-if="item.vehicleAvailable==1"><i class='iconfont car'>&#xe616;</i>Tour Guide with a Car</span>
								<span v-else><i class='iconfont car'>&#xe607;</i>Tour Guide </span>
								<span><i class='iconfont cn'>&#xe632;</i>{{item.englishLevel}}</span>
							</p>
							<div class="recommend">
								<span :key="index" v-for="(i, index) in item.tourTypes">{{i}}</span>
								
							</div>
							<div class="slogan">{{item.selfIntro}}</div>
						</div>
						<div class="guideHeadRight">
							<div class="pay-money"><span>From</span> ${{item.price}}</div>
							<div class="pay-type">per  day ({{item.hoursPerDay}} hours)</div>
							<button>VIEW DETAILS</button>
						</div>
					</a>

				</li>
			</ul>
		</div>
		<FooterCommon></FooterCommon>
	</div>
</template>

<script>
import { SelectId } from "element-ui";
import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
import FooterCommon from "~/components/FooterCommon/FooterCommon";
import Vue from 'vue';

export default {
  name: "guideList",

  async asyncData({ route, store, error, apiBasePath, redirect }) {
    let loc = route.params.slug;
    // 服务端渲染部分 这部分操作还没有页面实例，只是初始化页面数据
    let data = {
      options: [
        {
          value: "Shanghai",
          label: "Shanghai",
          url: "/guide/list/Shanghai"
        },
        {
          value: "Beijing",
          label: "Beijing",
          url: "/guide/list/Beijing"
        }
      ],
      value: loc,
      tags: "",
      loc: loc,
      guideList: [],
      showbg: "",
      logIn: ""
    };

    let apiGuideLocalBriefRes = {};
    try {
      apiGuideLocalBriefRes = await Vue.axios.get(
        apiBasePath + "guide/" + loc + "/brief"
      );
      data.guideList = apiGuideLocalBriefRes.data;
    } catch (err) {
      console.log(err);
      return error(JSON.stringify(err));
    }
    return data;
  },
  data() {
    return {
      options: [
        {
          value: "Shanghai",
          label: "Shanghai",
          url: "https://www.localpanda.com/guide/list/Shanghai"
        },
        {
          value: "Beijing",
          label: "Beijing",
          url: "https://www.localpanda.com/guide/list/Beijing"
        }
      ],
      value: "",
      tags: "",
      loc: "",
      guideList: [],
      showbg: "",
      logIn: ""
    };
  },


  head() {
    let location = this.loc;
    let title =
      "The Top Local " +
      location +
      " Guides | The Best Professional " +
      location +
      " Tour Guides.";
    let keywords =
      "" +
      location +
      " Tour Guide, " +
      location +
      " Professional Guide, Things to do in " +
      location +
      ", " +
      location +
      " destinations, " +
      location +
      " history, " +
      location +
      " culture, " +
      location +
      " locals, " +
      location +
      " tourist attractions, " +
      location +
      " tours"
    let description =
      "Book the best local tour guides in " +
      location +
      ", authentic tours & experiences, real local activities, cut the lines with professional guides, " +
      location +
      "’s best history, culture, food, architecture, art, and photo, and nightlife tours."
    return {
      title: title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: keywords
        },
        {
          hid: "description",
          name: "description",
          content: description
        },
      ]
    };
  },
  components: {
    HeaderCommon,
    SelectId,
    FooterCommon
  },
  methods: {
    changeVal(loc) {
      let that = this;
      that.axios
        .get("https://www.localpanda.com/api/guide/" + that.loc + "/brief")
        .then(
          function(response) {
            that.guideList = response.data;
          },
          function(response) {}
        );
    }
  },
  created: function() {
  },
  mounted: function() {
    this.logIn = window.localStorage.getItem("logstate");
  }
};
</script>
<style lang="scss">
@import "~assets/scss/_main.scss";
@import "~/assets/font/iconfont.css";
.el-input__inner {
  width: 168px !important;
  height: 40px;
  font-size: 18px !important;
  border-radius: 20px !important;
  border-color: none;
  padding-left: 20px !important;
  border: none !important;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 2px !important;
}
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  border-style: none !important;
}
.el-select-dropdown {
  text-align: center;
  border-radius: 20px !important;
  border: none !important;
}

.el-select-dropdown__item.selected {
  color: #1bbc9d !important;
  font-weight: normal !important;
}

.el-select-dropdown__item {
  font-size: 18px !important;
  text-align: left !important;
  &.hover {
    background-color: #fff !important;
    border-radius: 20px;
  }
  &:hover {
    background-color: #fff !important;
    border-radius: 20px;
    color: #1bbc9d;
  }
}
.el-icon-arrow-up {
  &:before {
    content: "\e60c" !important;
    color: #353a3f;
  }
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #b4bccc !important;
}
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
.guideList {
  width: 100%;
  .banner {
    &.beijing {
      background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Beijing.jpg")
        no-repeat;
      background-size: cover;
    }
    &.shanghai {
      background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Shanghai.jpg")
        no-repeat;
      background-size: cover;
    }

    height: 260px;

    .selectInfo {
      width: 1284px;
      margin: 0 auto;
      position: relative;
      height: 260px;
      .linkseting {
        padding-top: 19px;
        a {
          font-size: 14px;
          color: #fff;
          &:hover {
            text-decoration: underline;
          }
          &:last-child {
            &:hover {
              text-decoration: none;
              cursor: auto;
            }
          }
        }
        em {
          color: #fff;
          font-size: 12px;
        }
      }
      .position {
        position: absolute;
        top: 107px;
        span {
          margin-right: 30px;
          font-size: 38px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          vertical-align: bottom;
        }
        .el-select {
          .el-icon-arrow-up:before {
            content: "\e60f" !important;
          }
        }
      }
    }
  }
  .selectType {
    width: 1284px;
    margin: 20px auto 40px;
    ul {
      li {
        width: 632px;
        height: 130px;
        background: #0074d9;
        float: left;
        background-size: cover;
        &:first-child {
          margin-right: 20px;
          background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Activities.jpg")
            no-repeat;
        }
        &:last-child {
          background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Guides.jpg")
            no-repeat;
        }
        .bg {
          width: 604px;
          height: 74px;
          padding: 28px 0 28px 28px;
          color: #fff;
          .bgTitle {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 13px;
          }
          p {
            font-size: 16px;
          }
        }
      }
    }
  }
  .list-cont {
    margin: 0 auto;
    width: 1284px;
    h3 {
      text-align: center;
      margin: 66px 0 46px;
      color: #353a3f;
      font-size: 30px;
      font-weight: bold;
    }
    ul {
      padding-bottom: 100px;
      li {
        height: 180px;
        padding: 20px;
        margin-bottom: 20px;
        &:hover {
          box-shadow: 0px 0px 50px 0px rgba(53, 58, 63, 0.1);
        }
        .guideHeadImg {
          float: left;
          width: 270px;
          height: 180px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .guideHeadInfor {
          width: 626px;
          float: left;
          margin-left: 30px;
          h3 {
            font-size: 22px;
            color: #353a3f;
            font-weight: bold;
            margin: 0;
            display: inline-block;
          }
          .grade {
            display: inline;
            margin-left: 43px;
          }
          p {
            margin-top: 10px;
            span {
              color: #353a3f;
              font-size: 16px;
              font-weight: bold;
              margin-right: 40px;
              overflow: hidden;
              vertical-align: middle;
              &:first-child {
                width: 228px;
                display: inline-block;
              }
              i {
                margin-right: 14px;
                font-size: 20px;
                &.car {
                  color: #f4b33f !important;
                  font-weight: normal;
                }
                &.cn {
                  font-size: 22px !important;
                  color: #459aa9 !important;
                  vertical-align: top;
                  font-weight: normal;
                }
              }
            }
          }
          .recommend {
            height: 54px;
            margin: 10px 0;
            span {
              font-size: 16px;
              color: #1bbc9d;
              position: relative;
              padding: 0 16px;
              &:first-child {
                padding-left: 0;
              }
              &:not(:first-child) {
                &:after {
                  content: "";
                  width: 4px;
                  height: 4px;
                  border-radius: 50%;
                  background: #1bbc9d;
                  position: absolute;
                  left: 0px;
                  top: 7px;
                }
              }
            }
          }
          .slogan {
            position: relative;
            line-height: 20px;
            /* 3 times the line-height to show 3 lines */
            height: 40px;
            overflow: hidden;
            font-size: 16px;

            &:after {
              content: "...";
              position: absolute;
              bottom: 0px;
              right: 0;
              padding: 0 10px 1px 10px;
              background: #fff;
            }
          }
        }
        .guideHeadRight {
          float: right;
          padding: 20px 30px 52px 0;
          .pay-money {
            span {
              font-size: 16px;
            }
            font-size: 22px;
            color: #353a3f;
            font-weight: bold;
          }
          .pay-type {
            margin-top: 8px;
            font-size: 16px;
            color: #353a3f;
          }
          button {
            color: #f5f5f5;
            font-size: 12px;
            margin-top: 30px;
            width: 124px;
            height: 42px;
            border-radius: 21px;
            font-weight: bold;
            background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%),
              linear-gradient(#1bbc9d, #1bbc9d);
            background-blend-mode: normal, normal;
          }
        }
      }
    }
  }
}
</style>