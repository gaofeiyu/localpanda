<template>
	<div id="activities">

		<div class="activitiesDel">
			<div class="activitiesInfo">
				<div class="tags clearfix">
					<span class="tag">{{detail.category}}</span>
					<em class="productId">Product ID: {{detail.activityId}}</em>
				</div>
				<div class="activitiyTitle">
					<h3>{{detail.title}}</h3>
					<div class="types">
						<span v-for="i in detail.tourTypes">{{i}}</span>

					</div>
				</div>
				<ul class="description clearfix">
					<li>
						<label class="iconfont">&#xe653;</label>
						<span>Type: {{detail.trafficType}}</span>
					</li>
					<li>
						<label class="iconfont">&#xe624;</label>
						<span>Duration: {{detail.duration}} {{detail.durationUnit|firstUpperCase}}</span>
					</li>
					<li>
						<label class="iconfont" style="font-size: 20px;">&#xe652;</label>
						<span v-if="picInfo.minParticipants==picInfo.maxParticipants">{{picInfo.minParticipants}}</span>
						<span v-else>Participants: {{picInfo.minParticipants}} - {{picInfo.maxParticipants}}</span>
					</li>
					<li>
						<label class="iconfont">&#xe627;</label>
						<span>Languages: English</span>
					</li>
					<li>
						<label class="iconfont" style="font-size: 20px;">&#xe610;</label>
						<span>{{destinations}}</span>
					</li>

				</ul>
				<p class="says">{{detail.recommendedReason}}</p>
				<div class="heightLights" id="heightLights">
					<p :key="index" class="clearfix" v-for="(item,index) in highlights"><i class="iconfont">&#xe654;</i><span>{{item}}</span></p>

				</div>
				<div class="journey" id="journey" ref="journey">
					<div class="expect">
						<h3>What You Can Expect</h3>
						<p v-if="introduction.length==1">{{introduction[0]}}</p>
						<div class="introduction" :class="{'overflow':isShowView}" v-if="introduction.length>1">
							<p v-if="isShowView==false">{{introduction[0]}}</p>
							<p :key="index" v-else v-for="(j,index) in introduction">{{j}}</p>
						</div>
						<div v-if="introduction.length>1&&isShowView==false" class="viewMore" @click="showVeiwMore()">View more</div>
					</div>
					<ul>
						<li :key="index" v-for="(i,index) in detail.itineraries">
							<div class="item_v clearfix" v-if="i.photoUrl">
								<div class="contTitle">
									<h3>{{i.title}}</h3>
									<p>{{i.description}}</p>
								</div>
								<div class="cont">
									<img v-lazy="i.photoUrl" />
								</div>

							</div>
							<div class="item clearfix" v-else>
								<div class="cont_title" id="aa">{{i.title}}</div>
								<div class="cont">{{i.description}}</div>
							</div>
						</li>
					</ul>

				</div>
				<div class="provide" id="provide">
					<h3>What's Included?</h3>
					<ul>
						<li :key="index" v-for="(item,index) in itemsIncluded">{{item}}</li>

					</ul>
				</div>
				<div class="notes" id="notes">
					<h3>Notes</h3>
					<p v-if="remark" :key="index" v-for="(item,index) in remark">{{item}}</p>
					<p v-if="picInfo.priceInstructions">{{picInfo.priceInstructions}}</p>
					<p v-if="picInfo.refundInstructions">{{picInfo.refundInstructions}}</p>
					<p v-if="detail.venues" :key="index" v-for="(i,index) in detail.venues">{{i}}</p>
				</div>

			</div>
			<div class="recommend" id="recommend" v-if="recommed.length>0">
				<h3>Similar Experiences</h3>
				<ul class="clearfix">
					<li :key="index" v-for="(i,index) in recommed">
						<a :href="'https://www.localpanda.com/activity/details/'+i.activityId">
							<div class="activity-pic">
								<img v-lazy="i.coverPhotoUrl">
							</div>
							<div class="activity-cont">
								<div class="activity-info clearfix">
									<div class="activity-cont-type"><i class="iconfont">&#xe653;</i>{{i.category}}</div>
									<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{i.duration}} {{i.durationUnit|firstUpperCase}}</div>
								</div>

								<h4 style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">{{i.title}}</h4>

								<div class="pic">
									<div class="old-pic" v-if="i.originalPrice">${{i.originalPrice}}</div>
									<div class="current-price">From<b>${{i.bottomPrice}}</b><span>  pp</span></div>
								</div>
							</div>
						</a>
					</li>

				</ul>
			</div>
			<div class="book">
				<div :class="{'position':isShowBookNow}">
					<div class="boxshowdow">
						<div class="bookbox">
							<div class="picPp clearfix">
								<div class="picLeft">
									From <span>${{picInfo.originalPrice}}</span>
									<b>${{picInfo.bottomPrice}}</b> pp
								</div>
								<div class="picRight" @mouseover="showNode" @mouseleave="hidden">
									Price Note
									<span class="iconfont">&#xe659;</span>
								</div>
								<div class="priceNote" v-if="isShowPicNode">
									<h4>Price Note</h4>
									<p>Price is in USD and calculated based on the number of people in your tour group and the vehicle required.</p>
								</div>

							</div>
							<div class="selectBox">
								<div class="select clearfix">
									<div class="selectDate" :class="picInfo.departureTime?'':'long'">
										<b>Date</b>
										<flatPickr placeholder="Date" v-model="dateTime" :config="options"></flatPickr>
									</div>
									<div class="selectTime" v-if="picInfo.departureTime">
										<b>Time</b>
										<div class="time" @click.stop="showTime">
											<input readonly="readonly" v-model="time" />
											<i class="iconfont" v-if="!isShowTime">&#xe60f;</i>
											<i class="iconfont" v-else>&#xe63f;</i>
											<div v-if="isShowTime" @click.stop="showTime" class="timeList">
												<ul>
													<li :key="index" v-for="(item,index) in picInfo.departureTime" @click.stop="confirmTime(index)">{{item}}</li>

												</ul>
											</div>
										</div>

									</div>
								</div>
								<div class="selectPepole">
									<b>Guests</b>
									<div class="Guests" @click.stop="showAdults">
										<!--<input class="people" readonly="readonly" v-model="people" />-->
										<div class="people" v-if="children==0&&adults==0">{{people}}</div>
										<div class="people" v-if="children==0&&adults==1">{{people}} Person</div>
										<div class="people" v-if="children>0||adults>1">{{people}} People</div>

										<i class="iconfont" v-if="!isShowAdults">&#xe60f;</i>
										<i class="iconfont" v-else>&#xe63f;</i>
										<p v-if="isSelectDate" style="margin-top: 10px; font-size: 12px; color:red;">{{dateErrText}}</p>
										<p style="margin-top: 10px; font-size:12px;color:red;" v-if="error">{{dateErrText}}</p>
										<p style="margin-top: 10px;color:#353a3f;font-size:12px;opacity: .5;" v-if="!error&&!isSelectDate">{{dateErrText}}</p>

										<div class="choose" v-if="isShowAdults">
											<div class="adults clearfix">
												<b>Adults</b>
												<div class="selectAdults">
													<em class="iconfont color" v-if="adults>1" @click.stop="del(0)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="adults" />
													<em class="iconfont" v-if="(children+adults)>=picInfo.maxParticipants">&#xe64b;</em>
													<em class="iconfont color" v-else @click.stop="add(0)">&#xe64b;</em>
												</div>
											</div>
											<div class="children clearfix">
												<b>Children<span v-if="picInfo.childStandard">{{picInfo.infantStandard}} - {{picInfo.childStandard}} years</span></b>
												<div class="selectAdults">
													<em class="iconfont color" v-if="children>0" @click.stop="del(1)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="children" />
													<em class="iconfont" v-if="(children+adults)>=picInfo.maxParticipants">&#xe64b;</em>
													<em class="iconfont color" v-else @click.stop="add(1)">&#xe64b;</em>
												</div>
											</div>
											<div class="children clearfix">
												<b>Babies</b>
												<div class="selectAdults">
													<em class="iconfont color" v-if="infant>0" @click.stop="del(3)">&#xe64d;</em>
													<em class="iconfont" v-else>&#xe64d;</em>
													<input readonly v-model="infant" />
													<em class="iconfont color" v-if="infant<picInfo.maxParticipants-1" @click.stop="add(3)">&#xe64b;</em>
													<em class="iconfont" v-else>&#xe64b;</em>
												</div>
											</div>
											<!--<p style="margin-top: 10px; font-size:12px;color:red;" v-if="error">*Mimimum number of travelers:{{picInfo.minParticipants}}.</p>
											<p style="margin-top: 10px;font-size:12px;" v-else>*Final headcount does not include babies.</p>-->

										</div>

									</div>
								</div>
								<div class="picDetail" v-if="isShowBook">
									<b class='headTitle'>Price Breakdown</b>
									<ul>
										<li class="clearfix">
											<div class="formula" v-if="children==0&&adults==1">${{round(adultsPic/(adults+children))}} x {{adults+children}} Person</div>
											<div class="formula" v-else>${{round(adultsPic/(adults+children))}} x {{adults+children}} People </div>

											<div class="pic">${{adultsPic}}</div>
										</li>
										<li class="clearfix" v-if="children>0&&picInfo.childDiscount">
											<div class="formula"><b style="display: inline-block;">- ${{children*picInfo.childDiscount}}</b> for child(ren)</div>
										</li>
									</ul>
									<div class="total clearfix">
										<div class="totalText">Total</div>
										<div class="totalPic" v-if="children>0&&picInfo.childDiscount">${{cutXiaoNum(adultsPic-children*picInfo.childDiscount,1)}}</div>
										<div class="totalPic" v-else>${{adultsPic}}</div>
									</div>
								</div>
								<div class="inquiry">
									<button class="bookNow" @click="order">Book Now</button>
									<div class="cancat" @click="showContact">
										<p>Not sure if this is the tour for you? We can </br>help you design your dream tour!<span> Inquire</span> </p>
										<i class="iconfont">&#xe64a;</i>
									</div>
								</div>

							</div>

						</div>
					</div>
					<div class="blockUsPs" :class="{block:isShow}">
						<ul>
							<li v-if="detail.category=='Private tour'||detail.category=='Transportation'">
								<i class="iconfont">&#xe654;</i>
								<p>100% Private</p>
							</li>
							<li v-if="detail.category=='Private tour'||detail.category=='Transportation'">
								<i class="iconfont">&#xe654;</i>
								<p>100% Personalizable</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Easy booking</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Best price guaranteed</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>Professional customer service</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>No hidden booking or credit card fees</p>
							</li>
							<li>
								<i class="iconfont">&#xe654;</i>
								<p>No cancellation fee with early notice</p>
							</li>
						</ul>
					</div>

				</div>
			</div>
		</div>
		<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack" :enName="enName" :objectId="detail.activityId" :objectType="objectType"></Contact>
		<Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
</template>

<script>
import {
  GetDateStr,
  addmulMonth,
  getUrlParams
} from "~/assets/js/plugin/utils";
import Contact from "~/components/pageComponents/guide/detail/Contact";
import Alert from "~/components/Prompt/Alert";
import flatPickr from "vue-flatpickr-component";
export default {
  props: [
    "remark",
    "detail",
    "highlights",
    "destinations",
    "itemsIncluded",
    "id",
    "isscroll",
    "isShowBookNow",
    "picInfo",
    "recommed",
    "introduction"
  ],
  name: "Activities",
  data() {
    return {
      open: null,
      infant: 0, //婴儿
      dateTime: "", //riqi
      adults: 0, //成人  默认1人
      children: 0, //儿童
      people: "Please Select",
      time: "",
      isShowBook: false,
      isShowAdults: false,
      isShowTime: false,
      options: {
        minDate: GetDateStr(2),
        maxDate: addmulMonth(GetDateStr(2), 12)
      },
      adultsPic: "",
      objectType: "ACTIVITY",
      //tangkuang
      ContactStatus: false,
      isShowAlert: false,
      alertTitle: "",
      alertMessage: "",
      istrue: false,
      error: false,
      isSelectDate: false,
      dateErrText: "*Final headcount does not include babies.",
      isShow: false, //价格说明
      margin: 0,
      isShowView: false,
	  isShowPicNode: false,
	  enName:'',
    };
  },
  components: {
    flatPickr,
    Contact,
    Alert
  },
  methods: {
    showVeiwMore() {
      this.isShowView = true;
      window.ga && ga("gtag_UA_107010673_1.send", {
        hitType: "event",
        eventCategory: "Button",
        eventAction: "Click",
        eventLabel: "activity_view_more"
      });
    },
    showNode() {
      this.isShowPicNode = true;
    },
    hidden() {
      this.isShowPicNode = false;
    },
    cutXiaoNum(num, len) {
      var numStr = num.toString();
      if (len == null || len == undefined) {
        len = numStr.length;
      }
      var index = numStr.indexOf(".");
      if (index == -1) {
        index = numStr.length;
        numStr += ".0000000000000";
      } else {
        numStr += "0000000000000";
      }
      var newNum = numStr.substring(0, index + len + 1);
      return newNum;
    },
    round(val) {
      if (typeof val === "number" && val % 1 === 0) {
        return val;
      } else if (val.toString().split(".")[1].length <= 1) {
        return val;
      } else {
        return (parseFloat(this.cutXiaoNum(val, 1)) + 0.1).toFixed(1);
      }
    },

    isShowFn(val) {
      this.istrue = val;
      if (this.istrue == true) {
        this.isShowAlert = true;
        this.alertTitle = "Submission completed!";
        this.alertMessage =
          "Thank you for your feedback.We will get back to you within 1 day.";
        this.istrue = false;
      } else {
        this.isShowAlert = true;
        this.alertMessage = "Failed!";
      }
    },
    getIsShowAlert(val) {
      this.isShowAlert = val;
    },
    showContact() {
      let that = this;
      that.ContactStatus = true;
      window.ga && ga("gtag_UA_107010673_1.send", {
        hitType: "event",
        eventCategory: "Button",
        eventAction: "Click",
        eventLabel: "activity_inquiry"
      });
    },
    contactCallBack(val) {
      this.ContactStatus = false;
    },

    add(id) {
      if (id == 0) {
        this.adults++;
      } else if (id == 1) {
        this.children++;
      } else {
        this.infant++;
      }
    },
    del(id) {
      if (id == 0) {
        this.adults--;
      } else if (id == 1) {
        this.children--;
      } else {
        this.infant--;
      }
    },

    showTime() {
      this.isShowTime = true;
      if (this.isShowAdults == true) {
        this.isShowAdults = false;
      }
    },
    confirmTime(index) {
      this.time = this.picInfo.departureTime[index];
      this.isShowTime = false;
    },
    showAdults() {
      window.ga && ga("gtag_UA_107010673_1.send", {
        hitType: "event",
        eventCategory: "Selection",
        eventAction: "Click",
        eventLabel: "activity_guests_select"
      });
      if (this.people == "Please Select") {
        this.adults = this.adults + 1;
        this.people = this.adults + this.children;
      }
      if (this.isShowTime == true) this.isShowTime = false;
      this.isShowAdults = true;
    },

    order() {
      window.ga && ga("gtag_UA_107010673_1.send", {
        hitType: "event",
        eventCategory: "Button",
        eventAction: "Click",
        eventLabel: "activity_book"
      });
      let that = this;
      if (that.dateTime == "") {
        that.isSelectDate = true;
        that.dateErrText = "*Please select a date first.";
      } else if (that.children + that.adults < that.picInfo.minParticipants) {
        that.error = true;
        that.dateErrText =
          "*Mimimum number of travelers:" + that.picInfo.minParticipants + ".";
      } else {
        that.error = false;
        that.isSelectDate = false;
        that.dateErrText = "*Final headcount does not include babies.";
        var orderInfo = {
          userId: localStorage.getItem("userid")
            ? localStorage.getItem("userid")
            : null,
          activityId: that.detail.activityId,
          amount:
            that.children > 0 && that.picInfo.childDiscount
              ? that.cutXiaoNum(
                  that.adultsPic - that.children * that.picInfo.childDiscount,
                  1
                )
              : that.adultsPic,
          currency: "USD",
          adultNum: that.adults,
          childrenNum: that.children,
          infantNum: that.infant,
          startDate: that.dateTime,
          startTime: that.time ? that.time : null,
          adultsPic: that.adultsPic,
          coverPhotoUrl: that.detail.coverPhotoUrl,
          title: that.detail.title,
          childDiscountP: that.picInfo.childDiscount,
          category: that.detail.category,
          averagePrice: that.round(
            that.adultsPic / (that.adults + that.children)
          ),
          childDiscount: that.picInfo.childDiscount
            ? that.children * that.picInfo.childDiscount
            : null
        };
        orderInfo = JSON.stringify(orderInfo);
        console.log(orderInfo);
        localStorage.setItem("orderInfo", orderInfo);

       location.href = "/activity/fillYourInfo";
        //routes.push('/fillYourInfo')
      }
    },
  },
  watch: {
    dateTime(val, oldVal) {
      window.ga && ga("gtag_UA_107010673_1.send", {
        hitType: "event",
        eventCategory: "Selection",
        eventAction: "Click",
        eventLabel: "activity_date_select"
      });
      if (val == "") {
        this.isSelectDate = true;
        this.dateErrText = "*Please select a date first.";
      } else {
        this.isSelectDate = false;
      }
    },
    adults(val, odlVal) {
      this.people = val + this.children;
    },
    children(val, oldVal) {
      this.people = val + this.adults;
    },
    people(val, odlVal) {
      let that = this;
      that.isShowBook = true;
      if (val >= that.picInfo.minParticipants) {
        that.error = false;
        that.dateErrText = "*Final headcount does not include babies.";
      }
      for (var i = 0; i < that.picInfo.details.length; i++) {
        if (that.adults + that.children == that.picInfo.details[i].capacity) {
          that.adultsPic = that.picInfo.details[i].price;
          console.log(that.adultsPic);
          break;
        } else {
          if (that.adults + that.children < that.picInfo.details[i].capacity) {
            that.adultsPic = that.picInfo.details[i].price;
            console.log(that.adultsPic);
            break;
          }
        }
      }
    },
    isShowBook(val, oldVal) {
      if (val) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  filters: {
    firstUpperCase(val) {
      if (val)
        return val.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
    }
  },
  mounted: function() {
    let that = this;
    document
      .getElementsByTagName("body")[0]
      .addEventListener("click", function() {
        that.isShowTime = false;
        that.isShowAdults = false;
      });
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/font/iconfont.css";
#activities {
  .activitiesDel {
    position: relative;
    max-width: 1170px;
    margin: 0 auto;
    .book {
      width: 386px;
      position: absolute;
      right: 0;
      top: 0;
      .boxshowdow {
        width: 386px;
        background: #fff;
        position: relative;
        z-index: 200;
        box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
        .bookbox {
          .picPp {
            cursor: pointer;
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            background: #353a3f;

            font-size: 14px;
            .picLeft {
              color: #fff;
              float: left;
              b {
                font-size: 24px !important;
                vertical-align: middle;
                margin: 0 6px;
              }
              span {
                text-decoration: line-through;
                margin-left: 5px;
              }
            }
            .picRight {
              color: #fff;
              float: right;
              position: relative;
              opacity: 0.5;
              span {
                font-size: 10px;
              }
            }
            .priceNote {
              width: 200px;
              background: #fff;
              padding: 16px;
              position: absolute;
              z-index: 200;
              top: -10px;
              font-size: 14px;
              box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
              h4 {
                font-weight: bold;
                line-height: 20px;
              }
              p {
                margin-top: 14px;
                line-height: 20px;
              }
            }
          }
          .selectBox {
            padding: 20px;
            .select {
              .selectDate {
                b {
                  font-size: 14px;
                  margin-bottom: 10px;
                  display: block;
                }
                width: 50%;
                float: left;
                .flatpickr-input {
                  height: 40px !important;
                  padding-left: 10px !important;
                  width: calc(100% - 10px) !important;
                  border-color: #e3e5e9;
                  border-right: none;
                  border-radius: 0px 3px 0px 3px !important;
                  &:hover {
                    border-color: #e3e5e9 !important;
                  }
                }
              }
              .selectTime {
                b {
                  font-size: 14px;
                  margin-bottom: 10px;
                  display: block;
                }
                width: 50%;
                float: left;
                .time {
                  position: relative;
                  input {
                    width: calc(100% - 10px);
                    height: 40px;
                    border: 1px solid #e3e5e9;
                    border-radius: 3px 0px 3px 0;
                    cursor: pointer;
                    font-size: 16px;
                  }
                  i {
                    position: absolute;
                    right: 10px;
                    font-size: 10px;
                    top: 50%;
                    margin-top: -5px;
                  }
                  .timeList {
                    position: absolute;
                    top: 47px;
                    max-width: 175px;
                    max-height: 300px;
                    overflow: auto;
                    background: #fff;
                    box-shadow: 0px 2px 10px 0px rgba(53, 58, 63, 0.2);
                    z-index: 300;
                    ul {
                      li {
                        height: 50px;
                        width: 175px;
                        text-align: center;
                        line-height: 50px;
                        font-size: 18px;
                        cursor: pointer;
                        &:hover {
                          background-image: linear-gradient(
                            -90deg,
                            #009efd 0%,
                            #1bbc9d 100%
                          );
                          color: #fff;
                        }
                      }
                    }
                  }
                }
              }
            }
            .selectPepole {
              width: 100%;
              margin-top: 10px;
              b {
                font-size: 14px;
                margin-bottom: 10px;
                display: block;
              }
              .Guests {
                position: relative;
                font-size: 16px;
                .people {
                  line-height: 40px;
                  border: 1px solid #e3e5e9;
                  border-radius: 3px;
                  cursor: pointer;
                  padding-left: 10px;
                }
                i {
                  position: absolute;
                  right: 10px;
                  font-size: 8px;
                  top: 50%;
                  margin-top: -15px;
                }
                .choose {
                  position: absolute;
                  top: -132px;
                  left: -20px;
                  width: 346px;
                  box-shadow: 0px 2px 10px 0px rgba(53, 58, 63, 0.2);
                  background: #fff;
                  padding: 20px;
                  b {
                    font-size: 18px;
                    line-height: 40px;
                    display: inline-block;
                    margin: 0;
                    span {
                      font-weight: normal;
                      color: #878e95;
                      font-size: 14px;
                      margin-left: 10px;
                    }
                  }
                  .children {
                    margin-top: 10px;
                  }
                  .adults,
                  .children {
                    .color {
                      color: #1bbc9d;
                    }
                    .selectAdults {
                      float: right;
                      input {
                        width: 30px;
                        height: 30px;
                        font-size: 18px;
                        font-weight: bold;
                        padding: 0;
                        border: solid 2px #ebebeb;
                        border-radius: 2px;
                        text-align: center;
                        line-height: 30px;
                        margin: 0 10px;
                      }
                      em {
                        cursor: pointer;
                        font-weight: bold;
                      }
                    }
                  }
                  .apply {
                    width: 100%;
                    height: 42px;
                    text-align: center;
                    background-image: linear-gradient(
                      270deg,
                      #009efd 0%,
                      #1bbc9d 100%
                    );
                    color: #f5f5f5;
                    line-height: 42px;
                    font-size: 16px;
                    font-weight: bold;
                    border-radius: 30px;
                    margin-top: 20px;
                  }
                }
              }
            }
            .picDetail {
              .headTitle {
                display: block;
                font-size: 14px;
                margin-top: 24px;
                padding-bottom: 10px;
              }
              ul {
                border-bottom: 1px solid #ebebeb;
                border-top: 1px solid #ebebeb;
                padding: 14px 0;
                li {
                  &:nth-child(2) {
                    padding-top: 14px;
                  }
                  b {
                    margin: 0;
                    font-size: 16px;
                  }
                  .formula {
                    float: left;
                    font-size: 16px;
                  }
                  .pic {
                    float: right;
                    font-size: 16px;
                  }
                }
              }
              .total {
                width: 100%;
                padding-top: 14px;
                .totalText {
                  float: left;
                  font-size: 16px;
                }
                .totalPic {
                  font-weight: bold;
                  float: right;
                  font-size: 24px;
                }
              }
            }
            .inquiry {
              .bookNow {
                width: 100%;
                height: 42px;
                text-align: center;
                background-image: linear-gradient(
                  270deg,
                  #009efd 0%,
                  #1bbc9d 100%
                );
                color: #f5f5f5;
                line-height: 42px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 30px;
                margin-top: 20px;
              }
              .cancat {
                margin-top: 20px;
                position: relative;
                cursor: pointer;
                p {
                  font-size: 14px;
                  line-height: 20px;
                  span {
                    color: #1bbc9d;
                  }
                }
                i {
                  position: absolute;
                  right: 0;
                  top: 50%;
                  margin-top: -4px;
                }
              }
            }
          }
        }
      }
      .blockUsPs {
        width: 346px;
        background: #f1f1f1;
        padding: 9px 20px 24px 20px;
        overflow: hidden;
        position: relative;
        ul {
          li {
            margin-top: 15px;
            i {
              font-size: 12px;
              color: #1bbc9d;
            }
            p {
              display: inline-block;
              margin-left: 14px;
              font-size: 16px;
            }
          }
        }
      }
    }
    .activitiesInfo {
      width: 734px;
      .tags {
        margin: 33px 0;
        .tag {
          float: left;
          color: #1bbc9d;
          font-size: 14px;
          border-top: 1px solid #1bbc9d;
          border-bottom: 1px solid #1bbc9d;
          padding: 3px 0;
        }
        .productId {
          float: right;
          font-size: 12px;
          color: #878e95;
        }
      }
      .activitiyTitle {
        h3 {
          font-weight: bold;
          font-size: 32px;
        }
        .types {
          margin: 29px 0 24px;
          span {
            font-size: 18px;
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
                background: #353a3f;
                position: absolute;
                left: 0px;
                top: 9px;
              }
            }
          }
        }
      }
      .description {
        padding: 33px 0;
        border-top: 1px solid #dde0e0;
        border-bottom: 1px solid #dde0e0;
        li {
          float: left;
          width: 33.33333%;
          &:nth-child(4) {
            margin-top: 24px;
          }
          &:nth-child(5) {
            margin-top: 24px;
            width: 66.6666%;
          }
          label {
            margin-right: 14px;
            font-size: 18px;
            color: #878e95;
          }
          span {
            font-size: 18px;
          }
        }
      }
      .says {
        padding: 33px 0;
        font-style: oblique;
        border-bottom: 1px solid #dde0e0;
        font-size: 18px;
        line-height: 26px;
        color: #353a3f;
      }
      .heightLights {
        padding: 33px 0;
        border-bottom: 1px solid #dde0e0;
        p {
          font-size: 18px;
          margin-top: 16px;
          &:first-child {
            margin-top: 0;
          }
          i {
            font-size: 12px;
            color: #1bbc9d;
            float: left;
            margin-top: 3px;
          }
          span {
            width: 90%;
            float: left;
            margin-left: 12px;
          }
        }
      }
      .journey {
        margin-top: 34px;
        .expect {
          h3 {
            font-size: 24px;
            font-weight: bold;
          }
          p {
            margin: 15px 0 20px;
            font-size: 18px;
            line-height: 26px;
          }
          .introduction {
            overflow: hidden;
          }
          .viewMore {
            color: #1bbc9d;
            font-size: 18px;
            cursor: pointer;
            margin: 6px 0 30px;
          }
        }
        ul {
          padding-bottom: 34px;
          border-bottom: 1px solid #dde0e0;
          li {
            &:nth-of-type(odd) {
              background: rgba(27, 188, 157, 0.06);
            }
            .item {
              padding: 24px 0;
              .cont_title {
                float: left;
                width: calc(50% - 20px);
                font-size: 18px;
                margin-left: 20px;
                font-weight: bold;
              }
              .cont {
                float: right;
                width: 50%;
                font-size: 18px;
                line-height: 26px;
              }
            }
            .item_v {
              .contTitle {
                width: calc(50% - 50px);
                float: left;
                padding: 24px 30px 0 20px;
                h3 {
                  font-size: 18px;
                  font-weight: bold;
                }
                p {
                  font-size: 18px;
                  line-height: 26px;
                  margin-top: 15px;
                }
              }
              .cont {
                width: 50%;
                float: right;
                img {
                  width: 100%;
                  height: 255px;
                }
              }
            }
          }
        }
      }
      .provide {
        margin-top: 34px;
        padding-bottom: 34px;
        border-bottom: 1px solid #dde0e0;
        h3 {
          font-size: 24px;
          font-weight: bold;
        }
        ul {
          li {
            padding-left: 20px;
            display: inherit;
            margin-top: 15px;
            font-size: 18px;
            position: relative;
            &:after {
              content: "";
              position: absolute;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #353a3f;
              left: 0px;
              top: 10px;
            }
            &:first-child {
              margin-top: 30px;
            }
          }
        }
      }
      .notes {
        margin-top: 34px;
        padding-bottom: 34px;
        border-bottom: 1px solid #dde0e0;
        h3 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 24px;
        }
        p {
          font-size: 18px;
          line-height: 26px;
          margin-top: 10px;
        }
      }
    }
    .recommend {
      margin-top: 34px;
      padding-bottom: 82px;
      h3 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      ul {
        li {
          float: left;
          margin-right: 20px;
          width: 376px;
          transition: 0.3s transform;
          &:hover {
            transform: translateY(-10px);
            box-shadow: 0px 10px 20px 0px rgba(53, 58, 63, 0.1);
          }
          &:last-child {
            margin-right: 0;
          }
          .activity-pic {
            width: 376px;
            height: 188px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            span {
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
          .activity-cont {
            height: 146px;
            position: relative;
            padding: 20px;
            box-shadow: 0px 2px 3px 0px rgba(53, 58, 63, 0.1);
            .activity-info {
              .duration {
                float: right;
                font-size: 14px;
                color: #878e95;
                i {
                  font-size: 12px;
                  color: #878e95;
                  margin-right: 6px;
                }
              }
              .activity-cont-type {
                float: left;
                font-size: 14px;
                color: #d87b65;
                i {
                  font-size: 12px;
                  color: #d87b65;
                  margin-right: 6px;
                }
              }
            }
            h4 {
              color: #353a3f;
              height: 48px;
              line-height: 24px;
              text-overflow: ellipsis;
              display: -webkit-box;
              display: -moz-box;
              -moz-box-orient: vertical;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              word-wrap: break-word;
              overflow: hidden;
              margin-top: 14px;
              font-size: 20px;
              font-weight: bold;
            }
            .activity-cont-duration {
              margin-top: 17px;
              i {
                font-size: 12px;
                color: #878e95;
                margin-right: 6px;
              }
              font-size: 14px;
              color: #878e95;
            }
            .pic {
              position: absolute;
              right: 20px;
              bottom: 20px;
              .old-pic {
                text-align: right;
                font-size: 14px;
                color: #878e95;
                text-decoration: line-through;
              }
              .current-price {
                font-size: 14px;
                color: #878e95;
                margin-top: 3px;
                b {
                  font-size: 20px;
                  color: #353a3f;
                  margin-left: 6px;
                }
                span {
                  color: #353a3f;
                }
              }
            }
          }
        }
      }
    }
  }
  .overflow {
    overflow: inherit !important;
    height: auto !important;
  }
  .block {
    display: none !important;
  }
  .position {
    position: fixed !important;
    top: 96px !important;
  }

  .long {
    width: 100% !important;
  }
}
</style>