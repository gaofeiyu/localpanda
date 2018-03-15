<template>
	<div class="fillYourInfo">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="fill">
			<div class="fillPageLeft">
				<div class="link">
					<a href="javascript:">1. Fill in your information</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">2. confirmation</a>
				</div>
				<h3>Fill in your information</h3>
				<div class="orderContact">
					<h4>Reservation Information</h4>
					<div class="cont">
						<div class="emalAddress">
							<p>First name<b>*</b></p>
							<input :class="{err:oderFirstNameErr}" @focus="fousOderfisrtname" v-model="oderFirstName" />
						</div>
						<div class="phone">
							<p>Last name<b>*</b></p>
							<input :class="{err:oderlastNameErr}" @focus="fousoderlastName" v-model="oderlastName" />
						</div>
					</div>
					<div class="cont">
						<div class="emalAddress">
							<p>Email Address<b>*</b></p>
							<input :class="{err:emailAddressErr}" @focus="fousEmal" v-model="emailAddress" />
						</div>
						<div class="phone">
							<p>Mobile phone<b>*</b></p>
							<input :class="{err:phoneErr}" @focus="fousPhone" v-model="phone" />
						</div>
					</div>
					<span>Your voucher will be sent here, make sure it is correct</span>

				</div>
				<div class="addOrderContact">
					<ul>
						<li v-if="infor.id == 0">

							<h4>Key Traveler 
								<label v-if="oderFirstName&&oderlastName&&emailAddress&&phone">
									<span>(If the key traveller is the same as the reservee, please ticket the box)</span>
									<em v-if="check==0" @click="checkFn(0)" class="checkbox"></em>
									<em v-if="check==1" @click="checkFn(1)" class="checkbox backgrond iconfont">&#xe61e;</em>
								</label>
								
								<!--<span class="checkbox iconfont"></span>-->
							</h4>
							<div class="name">
								<div class="firstName">
									<p>First name<b>*</b></p>
									<input :class="{err:TravellerFirstNameErr}" @focus="fousFirst()" v-model="TravellerFirstName" />

								</div>
								<div class="lastname">
									<p>Last name<b>*</b></p>
									<input :class="{err:TravellerlastNameErr}" @focus="fousLastName()" v-model="TravellerlastName" />
								</div>
							</div>
							<div class="nuber">
								<div class="paddnumber">
									<p>Email Address<b>*</b></p>
									<input :class="{err:TravelleremailAddressErr}" @focus="fousEmal" v-model="TravelleremailAddress" />
								</div>
								<div class="Mobilephone">
									<p>Mobile phone<b>*</b></p>
									<input :class="{err:TravellerphoneErr}" @focus="fousphonenumb()" v-model="Travellerphone" />
								</div>
							</div>
						</li>
						<li v-if="infor.id==1">

							<h4>Key Traveler 
								<label v-if="oderFirstName&&oderlastName&&emailAddress&&phone">
									<span>(If the key traveller is the same as the reservee, please ticket the box)</span>
									<em v-if="check==0" @click="checkFn(0)" class="checkbox"></em>
									<em v-if="check==1" @click="checkFn(1)" class="checkbox backgrond iconfont">&#xe61e;</em>
								</label>
								
								<!--<span class="checkbox iconfont"></span>-->
							</h4>
							<div class="name">
								<div class="firstName">
									<p>First name<b>*</b></p>
									<input :class="{err:TravellerFirstNameErr}" @focus="fousFirst()" v-model="TravellerFirstName" />

								</div>
								<div class="lastname">
									<p>Last name<b>*</b></p>
									<input :class="{err:TravellerlastNameErr}" @focus="fousLastName()" v-model="TravellerlastName" />
								</div>
							</div>
							<div class="nuber">
								<div class="paddnumber">
									<p>Email Address<b>*</b></p>
									<input :class="{err:TravelleremailAddressErr}" @focus="fousEmal" v-model="TravelleremailAddress" />
								</div>
								<div class="Mobilephone">
									<p>Mobile phone</p>
									<input :class="{err:TravellerphoneErr}" @focus="fousphonenumb()" v-model="Travellerphone" />
								</div>
							</div>
						</li>
					</ul>

				</div>

				<div class="Comments">
					<div class="information">
						<h4>Other required information</h4>
						<textarea v-model="comments"></textarea>
					</div>
					<button class="btnlinner next" @click="next">NEXT</button>
				</div>
			</div>
			<div class="oderdetial">
				<div class="payfordetail" v-if="infor.id==0">
					<div class="head clearfix">
						<div class="serviceform">
							<h3>These Services Come from {{infor.enName}}</h3>
							<p>{{infor.valueCarall}}</p>
						</div>
						<div class="gideheadlog">
							<img :src="infor.logimg" />
						</div>
					</div>
					<div class="halfday" v-if="infor.startTimeHalfCar">
						<b>Half day</b>
						<p>{{infor.startTimeHalfCar|sortDate}}</p>
						<span>${{infor.halfcarpic*infor.startTimeHalfCar.split(',').length}}</span>
					</div>
					<div class="halfday" v-if="infor.startTimeAllCar">
						<b>Full day</b>
						<p>{{infor.startTimeAllCar|sortDate}}</p>
						<span>${{infor.startTimeAllCar.split(',').length*infor.allcarpic}}</span>
					</div>
					<div class="total" v-if="infor.startTimeHalfCar&&!infor.startTimeAllCar">
						<p>Total (USD)</p>
						<b>${{infor.halfcarpic*infor.startTimeHalfCar.split(',').length}}</b>
					</div>
					<div class="total" v-if="infor.startTimeAllCar&&!infor.startTimeHalfCar">
						<p>Total (USD)</p>
						<b>${{infor.allcarpic*infor.startTimeAllCar.split(',').length}}</b>
					</div>
					<div class="total" v-if="infor.startTimeHalfCar&&infor.startTimeAllCar">
						<p>Total (USD)</p>
						<b>${{infor.halfcarpic*infor.startTimeHalfCar.split(',').length+infor.allcarpic*infor.startTimeAllCar.split(',').length}}</b>
					</div>
				</div>
				<div class="payfordetail" v-if="infor.id==1">
					<div class="head clearfix">
						<div class="serviceform">
							<h3>These Services Come from {{infor.enName}}</h3>
							<p>{{infor.value}}</p>
						</div>
						<div class="gideheadlog">
							<img :src="infor.logimg" />
						</div>
					</div>
					<div class="halfday" v-if="infor.startTimeHalfTour">
						<b>Half day</b>
						<p>{{infor.startTimeHalfTour|sortDate}}</p>
						<span>${{infor.halfTourpic*infor.startTimeHalfTour.split(',').length}}</span>
					</div>
					<div class="halfday" v-if="infor.startTimeAllTour">
						<b>Full day</b>
						<p>{{infor.startTimeAllTour|sortDate}}</p>
						<span>${{infor.startTimeAllTour.split(',').length*infor.allTourpic}}</span>
					</div>
					<div class="total" v-if="infor.startTimeHalfTour&&!infor.startTimeAllTour">
						<p>Total (USD)</p>
						<b>${{infor.halfTourpic*infor.startTimeHalfTour.split(',').length}}</b>
					</div>
					<div class="total" v-if="infor.startTimeAllTour&&!infor.startTimeHalfTour">
						<p>Total (USD)</p>
						<b>${{infor.allTourpic*infor.startTimeAllTour.split(',').length}}</b>
					</div>
					<div class="total" v-if="infor.startTimeAllTour&&infor.startTimeHalfTour">
						<p>Total (USD)</p>
						<b>${{infor.halfTourpic*infor.startTimeHalfTour.split(',').length+infor.allTourpic*infor.startTimeAllTour.split(',').length}}</b>
					</div>
				</div>
				<div class="bookbtn">
					<p>Pay with:</p>
					<div class="payfor">
						<img style="width:200px"  src="https://s3.us-east-2.amazonaws.com/localpanda.images/static/icon/stripe.png"/>
					</div>
					<div style=" width:316px;font-size: 16px;line-height: 20px;display: block; margin-top: 20px;"><b>Secure Payment:</b> <br>We use Stripe’s online payment system, which sends your payment info directly to Stripe’s secure servers, so your data is never sent to Local Panda’s servers and cannot be stolen.</div>
				</div>
			</div>

		</div>
		<AlertGoBack :isShowAlertTitle="isShowAlertTitle" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlertFn="getIsShowAlertFn"></AlertGoBack>
		<Alert :isShowAlert="isShowAlert" :alertTitle='alertTitle' :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
		<FooterCommon></FooterCommon>
	</div>
</template>

<script>
import { regExp } from "~/assets/js/plugin/utils";
import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
import FooterCommon from "~/components/FooterCommon/FooterCommon";
import AlertGoBack from "~/components/Prompt/AlertGoBack";
import Alert from "~/components/Prompt/Alert";
import Vue from "vue";

export default {
  name: "fillYourInfo",
  async asyncData({ apiBasePath }) {
    return {
      apiBasePath: apiBasePath
    }
  },
  data() {
    return {
      infor: {},
      oderFirstName: "",
      oderFirstNameErr: false,
      oderlastName: "",
      oderlastNameErr: false,
      emailAddress: "",
      emailAddressErr: false,
      phone: "",
      phoneErr: false,

      TravellerFirstName: "",
      TravellerFirstNameErr: false,
      TravellerlastName: "",
      TravellerlastNameErr: false,
      TravelleremailAddress: "",
      TravelleremailAddressErr: false,
      Travellerphone: "",
      TravellerphoneErr: false,

      comments: "",
      isShowAlertTitle: false, //弹框返回状态
      alertMessage: "", //弹框内容
      alertTitle: "", //弹框标题
      logIn: "",
      iserror: "",
      isShowAlert: false, //错误
      check: 0 //checked
    };
  },
  components: {
    HeaderCommon,
    FooterCommon,
    AlertGoBack,
    Alert
  },
  filters: {
    sortDate: function(val) {
      var Dates = val.split(",");
      for (var F = Dates.length; F; )
        Dates[--F] = [new Date(Dates[F]).getTime(), Dates[F]];
      Dates.sort(function(A, B) {
        return A[0] - B[0];
      });
      for (var F = Dates.length; F; ) Dates[--F] = Dates[F][1];
      return Dates.join(",");

      //arr.sort()
    }
  },
  methods: {
    getIsShowAlert(val) {
      this.isShowAlert = val;
    },
    getIsShowAlertFn(val) {
      this.isShowAlertTitle = val;
    },
    checkFn(id) {
      if (id == 0) {
        this.check = 1;

        this.TravellerFirstName = this.oderFirstName;
        console.log(this.TravellerFirstName);
        this.TravellerlastName = this.oderlastName;
        this.TravelleremailAddress = this.emailAddress;
        this.Travellerphone = this.phone;
      } else {
        this.check = 0;

        this.TravellerFirstName = "";
        this.TravellerlastName = "";
        this.TravelleremailAddress = "";
        this.Travellerphone = "";
      }
    },
    goBackFn() {
      let $this = this;
      if (window.history && window.history.pushState) {
        window.addEventListener("popstate", function() {
          var hashLocation = location.hash;
          var hashSplit = hashLocation.split("#!/");
          var hashName = hashSplit[1];
          if (hashName !== "") {
            var hash = window.location.hash;
            if (hash === "") {
              $this.isShowAlertTitle = true;
              $this.alertMessage =
                "The information will not be saved and whether to leave the current page";
              $this.alertTitle = "warm prompt!";
            }
          }
        });
        window.history.pushState("popstate", null, "#");
      }
    },
    fousOderfisrtname() {
      this.oderFirstNameErr = false;
    },
    fousoderlastName() {
      this.oderlastNameErr = false;
    },
    fousEmal() {
      this.emailAddressErr = false;
    },
    fousPhone() {
      this.phoneErr = false;
    },
    fousFirst() {
      this.TravellerFirstNameErr = false;
    },
    fousLastName() {
      this.TravellerlastNameErr = false;
    },
    fousidcard() {
      this.TravelleremailAddressErr = false;
    },
    fousphonenumb() {
      this.TravellerphoneErr = false;
    },
    next() {
      const that = this;
      if (
        that.oderFirstName == "" ||
        regExp.isNub(that.oderFirstName) ||
        regExp.isCode(that.oderFirstName)
      ) {
        that.oderFirstNameErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else if (
        that.oderlastName == "" ||
        regExp.isNub(that.oderlastName) ||
        regExp.isCode(that.oderlastName)
      ) {
        that.oderlastNameErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else if (!regExp.isEmail(that.emailAddress)) {
        that.emailAddressErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else if (that.phone == "" || !regExp.isMobil(that.phone)) {
        that.phoneErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else if (
        that.TravellerFirstName == "" ||
        regExp.isNub(that.TravellerFirstName) ||
        regExp.isCode(that.TravellerFirstName)
      ) {
        that.TravellerFirstNameErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else if (
        that.TravellerlastName == "" ||
        regExp.isNub(that.TravellerlastName) ||
        regExp.isCode(that.TravellerlastName)
      ) {
        that.TravellerlastNameErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else if (!regExp.isEmail(that.TravelleremailAddress)) {
        that.TravelleremailAddressErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else if (
        that.Travellerphone == "" ||
        !regExp.isMobil(that.Travellerphone)
      ) {
        that.TravellerphoneErr = true;
        that.isShowAlert = true;
        that.alertMessage =
          "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled.";
      } else {
        if (that.infor.id == 0) {
          var cont = "";
          if (this.infor.startTimeHalfCar && !this.infor.startTimeAllCar) {
            cont =
              this.infor.halfcarpic *
              this.infor.startTimeHalfCar.split(",").length;
          } else if (
            this.infor.startTimeAllCar &&
            !this.infor.startTimeHalfCar
          ) {
            cont =
              this.infor.allcarpic *
              this.infor.startTimeAllCar.split(",").length;
          } else {
            cont =
              this.infor.halfcarpic *
                this.infor.startTimeHalfCar.split(",").length +
              this.infor.allcarpic *
                this.infor.startTimeAllCar.split(",").length;
          }
          let obj = {
            userId: localStorage.getItem("userid"),
            guideId: this.infor.guideId,
            serviceType: this.infor.serviceType,
            participants: parseInt(this.infor.valueCarall.substring(0, 1)),
            hoursPerDay: this.infor.hoursPerDay,
            fullDayPrice: this.infor.allcarpic,
            halfDayPrice: this.infor.halfcarpic,
            amount: cont,
            currency: this.infor.currency,
            comments: this.comments ? this.comments : null,
            fullDates: this.infor.startTimeAllCar
              ? this.infor.startTimeAllCar.split(",")
              : null,
            halfDates: this.infor.startTimeHalfCar
              ? this.infor.startTimeHalfCar.split(",")
              : null,
            contactInfo: {
              lastName: that.oderlastName,
              firstName: that.oderFirstName,
              phoneNumber: that.phone,
              emailAddress: that.emailAddress
            },
            travelerInfo: {
              firstName: that.TravellerFirstName,
              lastName: that.TravellerlastName,
              phoneNumber: that.Travellerphone,
              emailAddress: that.TravelleremailAddress
            }
          };

          Vue.axios
            .put(
              this.apiBasePath + "order/create",
              JSON.stringify(obj),
              {
                headers: {
                  "Content-Type": "application/json; charset=UTF-8"
                }
              }
            )
            .then(
              function(response) {
                window.location.href = "payNow.html?objectId=" + response.data;
              },
              function(response) {}
            );
        } else if (that.infor.id == 1) {
          //console.log(111)
          var cont = "";
          if (this.infor.startTimeHalfTour && !this.infor.startTimeAllTour) {
            cont =
              this.infor.halfTourpic *
              this.infor.startTimeHalfTour.split(",").length;
          } else if (
            this.infor.startTimeAllTour &&
            !this.infor.startTimeHalfTour
          ) {
            cont =
              this.infor.allTourpic *
              this.infor.startTimeAllTour.split(",").length;
          } else {
            cont =
              this.infor.halfTourpic *
                this.infor.startTimeHalfTour.split(",").length +
              this.infor.allTourpic *
                this.infor.startTimeAllTour.split(",").length;
          }
          let obj = {
            userId: localStorage.getItem("userid"),
            //userId: "10024",
            guideId: this.infor.guideId,
            serviceType: this.infor.serviceType,
            participants: parseInt(this.infor.value.substring(0, 1)),
            hoursPerDay: this.infor.hoursPerDay,
            fullDayPrice: this.infor.allTourpic,
            halfDayPrice: this.infor.halfTourpic,
            amount: cont,
            currency: this.infor.currency,
            comments: this.comments ? this.comments : null,
            fullDates: this.infor.startTimeAllTour
              ? this.infor.startTimeAllTour.split(",")
              : null,
            halfDates: this.infor.startTimeHalfTour
              ? this.infor.startTimeHalfTour.split(",")
              : null,
            contactInfo: {
              lastName: that.oderlastName,
              firstName: that.oderFirstName,
              phoneNumber: that.phone,
              emailAddress: that.emailAddress
            },
            travelerInfo: {
              firstName: that.TravellerFirstName,
              lastName: that.TravellerlastName,
              phoneNumber: that.Travellerphone,
              emailAddress: that.TravelleremailAddress
            }
          };

          Vue.axios
            .put(
              this.apiBasePath + "order/create",
              JSON.stringify(obj),
              {
                headers: {
                  "Content-Type": "application/json; charset=UTF-8"
                }
              }
            )
            .then(
              function(response) {
                window.location.href = "payNow.html?objectId=" + response.data;
              },
              function(response) {}
            );
        }
      }
    }
  },
  created: function() {
  },
  mounted: function() {
    this.infor = JSON.parse(window.localStorage.getItem("infor"));
    this.logIn = window.localStorage.getItem("logstate");
    this.goBackFn();
  },
  watch: {}
};
</script>
<style lang="scss">
@import "~assets/scss/_main.scss";
@import "~/assets/font/iconfont.css";
#header {
  box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
}
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
.fillYourInfo {
  .fill {
    width: 1170px;
    margin: 0 auto;
    padding: 60px 0 100px;
    position: relative;
    .oderdetial {
      position: absolute;
      top: 60px;
      right: 0;
      .payfordetail {
        box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
        background: #fff;
        padding: 30px 30px 40px;
        width: 316px;
        .head {
          padding-bottom: 30px;
          border-bottom: 1px solid #dde0e0;
          .serviceform {
            float: left;
            width: 143px;
            h3 {
              font-size: 18px;
              margin-bottom: 0;
              font-weight: bold;
            }
            p {
              margin-top: 12px;
              font-size: 18px;
            }
          }
          .gideheadlog {
            width: 138px;
            height: 92px;
            float: left;
            margin-left: 19px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .halfday {
          padding: 30px 0;
          position: relative;
          border-bottom: 1px solid #dde0e0;
          b {
            font-size: 18px;
            color: #353a3f;
          }
          p {
            font-size: 18px;
            width: 78%;
          }
          span {
            position: absolute;
            right: 0;
            top: 42px;
            font-size: 18px;
          }
        }
        .total {
          padding: 30px 0 27px;
          position: relative;
          p {
            font-size: 18px;
          }
          b {
            font-size: 18px;
            position: absolute;
            top: 33px;
            right: 0;
          }
        }
      }
      .bookbtn {
        margin-top: 20px;
        padding: 30px;
        background: #faf9f8;
        p {
          font-size: 18px;
          font-weight: bold;
        }
        .payfor {
          span {
            display: inline-block;
            width: 58px;
            height: 36px;
            margin-right: 10px;
          }
        }
      }
    }
    .fillPageLeft {
      width: 734px;
      .link {
        a {
          font-size: 16px;
          color: #dde0e0;
          cursor: auto;
          &:first-child {
            color: #353a3f;
          }
        }
        i {
          font-size: 10px;
          color: #dde0e0;
          margin: 0 20px;
        }
      }
      h3 {
        font-size: 36px;
        color: #353a3f;
        font-weight: bold;
        margin-top: 55px;
      }
      .orderContact {
        margin-top: 35px;
        padding-bottom: 33px;
        border-bottom: 1px solid #dde0e0;
        h4 {
          font-size: 18px;
          font-weight: bold;
        }
        .cont {
          margin-top: 25px;
          display: flex;
          .emalAddress,
          .phone {
            flex: 1;
            p {
              font-size: 18px;
              margin-bottom: 10px;
              font-weight: bold;
              b {
                color: red;
              }
            }
            input {
              width: 345px;
              height: 44px;
              font-size: 18px;
              border: 1px solid #dde0e0;
              border-radius: 3px;
              &:hover {
                border-color: #1bbc9d;
              }
            }
          }
        }
        span {
          display: inline-block;
          font-size: 16px;
          color: #878e95;
          margin-top: 16px;
        }
      }
      .addOrderContact {
        margin-top: 40px;
        padding-bottom: 34px;
        border-bottom: 1px solid #dde0e0;
        p {
          font-size: 16px;
          margin-top: 15px;
        }
        ul {
          li {
            position: relative;

            border-bottom: 1px solid #dde0e0;
            &:last-child {
              border: none;
            }
            b {
              color: red;
            }
            h4 {
              font-size: 18px;
              color: #353a3f;
              margin-top: 40px;
              font-weight: bold;
              position: relative;
              span {
                font-size: 16px;
                color: #878e95;
              }
              .checkbox {
                position: absolute;
                right: 0;
                width: 26px;
                height: 26px;
                text-align: center;
                border: 1px solid #1bbc9d;
                border-radius: 50%;
                top: 50%;
                margin-top: -16px;
                cursor: pointer;
                line-height: 28px;
                color: #fff;
                font-size: 12px;
              }
              .backgrond {
                background-image: linear-gradient(
                  270deg,
                  #009efd 0%,
                  #1bbc9d 100%
                );
              }
            }
            .name {
              display: flex;
              .firstName,
              .lastname {
                flex: 1;
                p {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
                input {
                  width: 345px;
                  height: 44px;
                  font-size: 18px;
                  border-radius: 3px;
                  border: solid 1px #dde0e0;
                  &:hover {
                    border-color: #1bbc9d;
                  }
                }
              }
            }
            .nuber {
              margin-top: 10px;
              display: flex;
              .paddnumber,
              .Mobilephone {
                flex: 1;
                p {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
                input {
                  width: 345px;
                  height: 44px;
                  font-size: 18px;
                  border-radius: 3px;
                  border: solid 1px #dde0e0;
                  &:hover {
                    border-color: #1bbc9d;
                  }
                }
              }
            }
          }
        }
      }
      .Comments {
        margin-top: 30px;
        .information {
          h4 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          textarea {
            width: 630px;
            height: 100px;
            border-radius: 3px;
            border: solid 1px #dde0e0;
            resize: none;
            font-size: 18px;
          }
          p {
            font-size: 18px;
            margin-top: 30px;
            a {
              color: #1bbc9d;
            }
          }
        }
        .next {
          width: 90px;
          height: 46px;
          font-weight: bold;
          margin-top: 20px;
        }
      }
    }
  }
  .err {
    border-color: red !important;
  }
}
</style>