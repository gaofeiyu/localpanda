<template>
	<div class="payNow">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="oderdetial">
				<div class="link">
					<a href="javascript:">1. Fill in your information</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">2. confirmation</a>
				</div>
				<div class="bookbtn">
				<p>Pay with:</p>
				<div class="payfor">
					<img style="width: 200px;" src="https://s3.us-east-2.amazonaws.com/localpanda.images/static/icon/stripe.png" />
				</div>
				<div style="font-size: 16px;line-height: 20px;display: block; margin-top: 20px;"><b>Secure Payment:</b> <br>We use Stripe’s online payment system, which sends your payment info directly to Stripe’s secure servers, so your data is never sent to Local Panda’s servers and cannot be stolen.</div>
			</div>
				<div class="payfordetail">
					<div class="head clearfix">
						<div class="serviceform">
							<h3>These Services Come from {{enName}}</h3>
							<p v-if="oderInfo.participants==1">{{oderInfo.participants}}person</p>
							<p v-else>{{oderInfo.participants}}people</p>
						</div>
						<div class="gideheadlog">
							<img :src="headPortraitUrl" />
						</div>
					</div>
					<div class="halfday" v-if="halfDates">
						<b>Half day</b>
						<p>{{halfDates|sortDate}}</p>
						<span>${{halfDayPrice}}</span>
					</div>
					<div class="halfday" v-if="fullDates">
						<b>Full day</b>
						<p>{{fullDates|sortDate}}</p>
						<span>${{fullDayPrice}}</span>
					</div>
					<div class="total">
						<p>Total (USD)</p>
						<b>${{oderInfo.amount}}</b>
					</div>
				</div>
				<button class="btnlinner paybtn" @click="pay">Pay Now</button>
			</div>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<FooterCommon></FooterCommon>
	</div>

</template>

<script>
import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";
import FooterCommon from "~/components/FooterCommon/FooterCommon";
import Loading from "~/components/Loading/Loading";
import api from "~/assets/js/plugin/api.js";
import Vue from 'vue';
import { throws } from 'assert';

export default {
  name: "payNow",

  async asyncData({ route, store, error, apiBasePath, redirect }) {
    let orderId = route.query.orderId || '';
    let data = {
      orderId: orderId,
      stripeHandler: "",
      oderInfo: "",
      halfDates: "",
      enName: "",
      headPortraitUrl: "",
      fullDates: "",
      fullDayPrice: "",
      amount: "",
      logIn: "",
      email: "",
      token: "",
      tokenType: "",
      loadingStatus: false,
      isPay: false
    }

    let apiOrderDetailRes = {};
    try {
      apiOrderDetailRes = await Vue.axios.get(
        apiBasePath + "order/detail/" + orderId
      );

      if(apiOrderDetailRes.data && apiOrderDetailRes.data.guideInfo){
        data.enName = apiOrderDetailRes.data.guideInfo.enName;
        data.headPortraitUrl = apiOrderDetailRes.data.guideInfo.headPortraitUrl;
        data.oderInfo = apiOrderDetailRes.data;
        if (apiOrderDetailRes.data.halfDates) {
          data.halfDayPrice =
            apiOrderDetailRes.data.halfDayPrice * apiOrderDetailRes.data.halfDates.length;
          data.halfDates = apiOrderDetailRes.data.halfDates.join(",");
        }

        if (apiOrderDetailRes.data.fullDates) {
          data.fullDayPrice =
            apiOrderDetailRes.data.fullDayPrice * apiOrderDetailRes.data.fullDates.length;
          data.fullDates = apiOrderDetailRes.data.fullDates.join(",");
        }
        data.amount = apiOrderDetailRes.data.amount;
      }else{
        throw new Error("")
      }
    } catch (err) {
      console.log(err);
      return error(JSON.stringify(err));
    }

    return data;
  },
  components: {
    HeaderCommon,
    FooterCommon,
    Loading
  },
  head(){
    return {
      script: [
        { 
          src: 'https://checkout.stripe.com/checkout.js', 
          type: 'text/javascript'
        }
      ]
    }
  },
  methods: {
    getToken() {
      let that = this;
      that.stripeHandler = StripeCheckout.configure({
        key: api.fb_code,
        image: "https://d2q486kjf9cwwu.cloudfront.net/static/icon/logo.png", // 显示在支付对话框的图片，可自己指定
        alipay: true, // 启用支付宝支付
        token: function(token) {
          // 用户填写完资料并且 Stripe 校验成功后的回调函数
          // 此时应该提交 token.id 到后台，比如 http://example.com/orders/1?stripeToken={token.id}
          that.loadingStatus = true;
          let obj = {
            amount: that.amount * 100,
            currency: "USD",
            objectId: that.orderId,
            token: token.id,
            email: token.email,
            tokenType: token.type,
            objectType: "GUIDE_SERVICE"
          };

          that.axios
            .post(
              "https://www.localpanda.com/api/payment/pay/stripe",
              JSON.stringify(obj),
              {
                headers: {
                  "Content-Type": "application/json; charset=UTF-8"
                }
              }
            )
            .then(
              function(response) {
                if (response.data.succeed) {
                  that.loadingStatus = true;
                  window.location.href =
                    "success.html?orderId=" +
                    that.orderId +
                    "&amount=" +
                    that.amount;
                }
                //
              },
              function(response) {}
            );
        }
      });
    },
    pay() {
      let that = this;
      ga("gtag_UA_107010673_1.send", {
        hitType: "event",
        eventCategory: "Button",
        eventAction: "Click",
        eventLabel: "guide_pay"
      });
      that.stripeHandler.open({
        name: "Local panda", // 收款方或商家名称，比如 Beansmile
        description: "", // 待支付商品的描述
        amount: that.amount * 100, // 支付金额，单位是“分”
        locale: "en_US",
        closed: function() {}
      });
    }
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
  mounted: function() {
    console.log(this.axios);
    this.getToken();
    this.logIn = window.localStorage.getItem("logstate");
  }
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
.payNow {
  .oderdetial {
    width: 1170px;
    margin: 0 auto;
    padding: 60px 0 100px;
    position: relative;
    .link {
      a {
        font-size: 16px;
        color: #353a3f;
        cursor: auto;
        &:last-child {
          color: #dde0e0;
        }
      }
      i {
        font-size: 10px;
        color: #dde0e0;
        margin: 0 20px;
      }
    }
    h3 {
      font-weight: bold;
      font-size: 36px;
      margin: 64px 0 44px;
    }
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
            margin-top: 0;
          }
          p {
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
      width: 242px;
      position: absolute;
      top: 60px;
      right: 0;
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
  .paybtn {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>