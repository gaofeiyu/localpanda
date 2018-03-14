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
				<div style="font-size: 16px;line-height: 20px;display: block; margin-top: 20px;"><b>Secure Payment:</b> </br>We use Stripe’s online payment system, which sends your payment info directly to Stripe’s secure servers, so your data is never sent to Local Panda’s servers and cannot be stolen.</div>
			</div>
				<div class="payfordetail">
					<div class="head clearfix">
						<div class="serviceform">
							<h3>These Services Come from {{enName}}</h3>
							<p v-if="oderInfo.participants==1">{{oderInfo.participants}}person</p>
							<p v-else>{{oderInfo.participants}}people</p>
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
	import { GetQueryString } from '../../assets/js/plugin/utils.js'
	import HeaderCommon from '../../components/HeaderCommon/HeaderCommon'
	import FooterCommon from '../../components/FooterCommon/FooterCommon';
	import Loading from '../../components/Loading/Loading'
	import api from '../../assets/js/plugin/api.js'
	export default {

		name: 'payNow',
		data() {
			return {
				stripeHandler: "",
				orderId: "",
				oderInfo:'',
				halfDates:'',
				enName:'',
				headPortraitUrl:'',
				fullDates:'',
				fullDayPrice:'',
				orderId:'',
				amount:'',
				logIn:'',
				email:'',
				token:'',
				tokenType:'',
				loadingStatus:false,
				isPay:false
				
			}
		},
		components: {
			HeaderCommon,
			FooterCommon,
			Loading
		},
		methods: {
			getInfo() {
				let that = this
				that.axios.get('https://www.localpanda.com/api/order/detail/'+that.orderId).then(function(response) {
							
							that.enName=response.data.guideInfo.enName
							that.headPortraitUrl=response.data.guideInfo.headPortraitUrl
							that.oderInfo=response.data
							if(response.data.halfDates){
								that.halfDayPrice=response.data.halfDayPrice*response.data.halfDates.length
								that.halfDates=response.data.halfDates.join(",")
							}
							
							
							if(response.data.fullDates){
								that.fullDayPrice=response.data.fullDayPrice*response.data.fullDates.length
								that.fullDates=response.data.fullDates.join(",")
							}
							
							that.amount=response.data.amount
				}, function(response) {})
			},
			getToken() {
				let that=this
				that.stripeHandler = StripeCheckout.configure({
					key:api.fb_code,
					image: 'https://d2q486kjf9cwwu.cloudfront.net/static/icon/logo.png', // 显示在支付对话框的图片，可自己指定
					alipay: true, // 启用支付宝支付
					token: function(token) { // 用户填写完资料并且 Stripe 校验成功后的回调函数
						// 此时应该提交 token.id 到后台，比如 http://example.com/orders/1?stripeToken={token.id}
						that.loadingStatus=true
						let obj = {
							amount: that.amount*100,
							currency: "USD",
							objectId: that.orderId,
							token:token.id,
							email:token.email,
							tokenType:token.type,
							objectType: "GUIDE_SERVICE"
						}
						
						that.axios.post("https://www.localpanda.com/api/payment/pay/stripe", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(function(response) {
							
							if(response.data.succeed){
								that.loadingStatus=true
								window.location.href="success.html?orderId="+that.orderId+'&amount='+that.amount
							}
							//
						}, function(response) {})
					}
				})	
			},	
			pay() {
				
				let that = this;
				ga('gtag_UA_107010673_1.send', {
						hitType: 'event',
						eventCategory: 'Button',
						eventAction: 'Click',
						eventLabel: 'guide_pay',
	
					});
				that.stripeHandler.open({
					name: 'Local panda', // 收款方或商家名称，比如 Beansmile
					description: "", // 待支付商品的描述
					amount: that.amount*100, // 支付金额，单位是“分”
					locale: 'en_US',
					closed: function() { 
						
					}
				})
			}
		},
		filters:{
			sortDate:function(val){
				var Dates=val.split(",");
				for (var F = Dates.length;F;) Dates[--F] = [(new Date(Dates[F])).getTime(),Dates[F]]
				Dates.sort(function(A,B){return A[0] - B[0]})
				for (var F = Dates.length;F;) Dates[--F] = Dates[F][1]
				return Dates.join(',')
				
				//arr.sort()
			}
		},
		mounted: function() {
			this.orderId=GetQueryString("objectId"),
			this.getInfo()
			this.getToken()
			this.logIn=window.localStorage.getItem("logstate")
		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/_main.scss';
	@import '../../assets/font/iconfont.css';
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
						cursor:auto; 
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
				h3{
					font-weight: bold;
					font-size:36px;
					margin: 64px 0 44px;
					
				}
			.payfordetail {
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				background: #fff;
				padding: 30px 30px 40px;
				width: 316px;
				margin-top: 40px;
				.head {
					padding-bottom: 30px;
					border-bottom: 1px solid #dde0e0;
					.serviceform {
						
						h3 {
							font-size: 18px;
							margin-bottom: 0;
							margin-top: 0;
						}
						p {
							font-size: 18px
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
	.paybtn{
		font-size: 16px;
		font-weight: bold;
	}
}
</style>