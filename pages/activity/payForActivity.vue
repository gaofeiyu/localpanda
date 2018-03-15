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
				<div style="font-size: 16px;line-height: 20px;display: block; margin-top: 20px;"><b>Secure Payment:</b></br>We use Stripe’s online payment system, which sends your payment info directly to Stripe’s secure servers, so your data is never sent to Local Panda’s servers and cannot be stolen.</div>
			</div>
			<div class="payfordetail">
				<div class="head clearfix">
					<div class="serviceform">
					<h3>{{opctions.activityInfo?opctions.activityInfo.title:''}}</h3>
						<p v-if="opctions.adultNum==1&&opctions.childrenNum==0">1 Person</p>
						<p v-else>{{opctions.adultNum+opctions.childrenNum}} People</p>
					</div>
				</div>
				<div class="date">
					<p>{{opctions.startDate}}</p>
					<p v-if="opctions.startTime">{{opctions.startTime}}</p>
				</div>
				<div class="pic">
					<div class="adult clearfix">
						<div class="formula" v-if="opctions.childrenNum==0&&opctions.adultNum==1">${{returnFloat(opctions.averagePrice)}} x 1 Person</div>
						<div class="formula" v-else>$ {{returnFloat(opctions.averagePrice)}} x {{opctions.adultNum+opctions.childrenNum}} People </div>
						<div class="adultPic" >$ {{returnFloat(cutXiaoNum(opctions.averagePrice*(opctions.adultNum+opctions.childrenNum),1))}}</div>
					</div>
					<div class="child" v-if="opctions.childDiscount">
						<b>- ${{returnFloat(opctions.childDiscount)}}</b> for child(ren)
					</div>
					<div class="child" v-if="opctions.couponDiscount">
						<b>- ${{returnFloat(opctions.couponDiscount)}}</b> for discount
					</div>
					
				</div>
				<div class="total clearfix">
					<div class="totle-title">Total (USD)</div>
					<div class="totalPic">${{returnFloat(opctions.amount)}}</div>
				</div>

			</div>
			<p style="width: 600px;color: red;margin-top: 10px;">You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</p>
			<button class="btnlinner paybtn" @click="pay">Pay Now</button>
		</div>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<FooterCommon></FooterCommon>
	</div>

</template>

<script>
	import { GetQueryString } from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Loading from '~/components/Loading/Loading'
	import api from '~/assets/js/plugin/api.js'
	import Vue from 'vue'
	export default {
	name: 'payNow',
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
	  async asyncData({ apiBasePath }) {
		  	return {
	      apiBasePath: apiBasePath
	    }	
	  },
		
		data() {
			return {
				opctions:{},
				stripeHandler: "",	
				halfDates: '',
				enName: '',
				headPortraitUrl: '',
				orderId: '',
				logIn: '',
				email: '',
				token: '',
				tokenType: '',
				loadingStatus: false,
				isPay: false

			}
		},
		components: {
			HeaderCommon,
			FooterCommon,
			Loading
		},
		methods: {
			cutXiaoNum(num, len) {
				var numStr = num.toString();
				if(len == null || len == undefined) {
					len = numStr.length;
				}
				var index = numStr.indexOf('.');
				if(index == -1) {
					index = numStr.length;
					numStr += ".0000000000000";
				} else {
					numStr += "0000000000000";
				}
				var newNum = numStr.substring(0, index + len + 1);
				return newNum;
			},
			round(val) {
				if(typeof val === 'number' && val % 1 === 0) {
					return val
				} else {
					return (parseFloat(this.cutXiaoNum(val, 1))+0.1).toFixed(1)

				}

			},
			returnFloat(value) {
				var value = Math.round(parseFloat(value) * 100) / 100;
				var xsd = value.toString().split(".");
				if(xsd.length == 1) {
					value = value.toString() + ".00";
					return value;
				}
				if(xsd.length > 1) {
					if(xsd[1].length < 2) {
						value = value.toString() + "0";
					}
					return value;
				}
			},
			getToken() {
				let that = this
				that.stripeHandler = StripeCheckout.configure({
					key: api.fb_code,
					image: 'https://d2q486kjf9cwwu.cloudfront.net/static/icon/logo.png', // 显示在支付对话框的图片，可自己指定
					alipay: true, // 启用支付宝支付
					token: function(token) { // 用户填写完资料并且 Stripe 校验成功后的回调函数
						// 此时应该提交 token.id 到后台，比如 http://example.com/orders/1?stripeToken={token.id}
						that.loadingStatus = true
						let obj = {
							amount: that.opctions.amount * 100,
							currency: "USD",
							objectId: that.orderId,
							token: token.id,
							email: token.email,
							tokenType: token.type,
							objectType: "ACTIVITY"
							
						}
						console.log(obj)
						Vue.axios.post(that.apiBasePath+"payment/pay/stripe", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(function(response) {

							if(response.data.succeed) {
								that.loadingStatus = true
								window.location.href = "/success?orderId=" + that.orderId + '&amount=' + that.opctions.amount
							}
							//
						}, function(response) {})
					}
				})
			},
			getInfo(){
				let that=this
				Vue.axios.get(this.apiBasePath+"activity/order/detail/"+that.orderId).then(function(res){
					that.opctions=res.data
				},function(res){})
			},
			pay() {
				let that = this;
				ga('gtag_UA_107010673_1.send', {
						hitType: 'event',
						eventCategory: 'Button',
						eventAction: 'Click',
						eventLabel: 'activity_pay',
	
					});
				that.stripeHandler.open({
					name: 'Local panda', // 收款方或商家名称，比如 Beansmile
					description: "", // 待支付商品的描述
					amount: that.amount * 100, // 支付金额，单位是“分”
					locale: 'en_US',
					closed: function() {

					}
				})
			}
		},
		created: function() {
			
			
		},
		mounted: function() {
			this.orderId = GetQueryString("objectId")
			this.getInfo()
			this.getToken()
			this.logIn = window.localStorage.getItem("logstate")
			
			
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	#headercommon {
		box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
	}
</style>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
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
			.title_head {
				font-weight: bold;
				font-size: 36px;
				margin: 64px 0 44px;
			}
			.payfordetail {
				margin-top: 10px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				background: #fff;
				padding: 30px 30px 40px;
				width: 316px;
				.head {
					padding-bottom: 30px;
					border-bottom: 1px solid #dde0e0;
					.serviceform {
						h3 {
							font-size: 18px;
							margin-bottom: 0;
							font-weight: bold;
						}
						p {
							margin-top: 12px;
							font-size: 18px
						}
					}
					
				}
				.date {
					padding: 30px 0;
					border-bottom: 1px solid #dde0e0;
					p {
						font-size: 18px;
					}
				}
				.pic {
					padding: 30px 0;
					border-bottom: 1px solid #dde0e0;
					.adult {
						.formula {
							float: left;
							font-size: 18px;
						}
						.adultPic {
							float: right;
							font-size: 18px;
						}
					}
					.child {
						margin-top: 20px;
						font-size: 18px;
					}
				}
				.total {
					padding-top: 30px;
					.totle-title {
						float: left;
						font-size: 18px;
					}
					.totalPic {
						float: right;
						font-size: 18px;
						font-weight: bold;
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