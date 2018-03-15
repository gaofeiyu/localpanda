<template>
	<div class="success">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="successInfo">
			<div class="link">
					<a href="javascript:">1. Fill in your information</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">2. Select payment method</a>
					<i class="iconfont">&#xe620;</i>
					<a href="javascript:">3. confirmation</a>
				</div>
				<h3>Confirmation</h3>
				<div class="odermesg">
					<div class="title">
						<span class="iconfont">&#xe61e;</span>
						<b>Your booking is Complete! You made a great choice :)</b>
					</div>
					<div class="detail">
						<span>Order ID: {{orderId}}</span>
						<span>Time of transaction: {{date}}</span>
					</div>
					<div class="amount">Payment amount<b>${{amount}}</b></div>
					<p style="margin-top: 10px;"> To view the details of your order, click “My Bookings” at the top of this page. If you ordered as a guest, you must enter your reservation email and the primary contact’s name to access your booking. </p>
					<p>Our staff are in the process of finalizing your booking. You will receive a confirmation email within 1 business day.</p>
					
				</div>
				
				<div class="contact ">
					<p>You can contact us by mail</p>
					<p>service@localpanda.com</p>
				</div>
		</div>

		<FooterCommon></FooterCommon>
	</div>

</template>

<script>
	import { GetQueryString } from '~/assets/js/plugin/utils.js'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon'
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	export default {

		name: 'payNow',
		data() {
			return {
				orderId:'',
				amount:'',
				logIn:'',
				date:"",
				userId:'',
				
				
			}
		},
		components: {
			HeaderCommon,
			FooterCommon
		},
		methods: {
			fomtdate(){
				var that=this
				Date.prototype.Format = function (fmt) { //author: meizz 
				    var o = {
				        "M+": this.getMonth() + 1, //月份 
				        "d+": this.getDate(), //日 
				        "h+": this.getHours(), //小时 
				        "m+": this.getMinutes(), //分 
				        "s+": this.getSeconds(), //秒 
				        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
				        "S": this.getMilliseconds() //毫秒 
				    };
				    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				    for (var k in o)
				    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				    return fmt;
				}
				that.date=new Date().Format("yyyy-MM-dd hh:mm:ss")
			}
		},
		mounted: function() {
			this.orderId=GetQueryString("orderId")
			this.amount=GetQueryString("amount")
			this.fomtdate()
			this.logIn=window.localStorage.getItem("logstate")
			this.userId=window.localStorage.getItem("userid")
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
@import "~assets/scss/base/_setting.scss";
	.successInfo{
		width: 1170px;
		margin:0 auto;
		padding: 60px 0 100px;
		position: relative;
		.contact{
			position:absolute;
			bottom:221px;
			left:793px;
			p{
				color: #353a3f;
				font-size: 18px;
				&:first-child{
					font-weight: bold;
				}
			}
		}
		
		
		.link {
			a {
				font-size: 16px;
				color: #353a3f;
				cursor:auto; 
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
			.odermesg{
				width:650px;
				padding:60px 0 54px 84px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				.title{
					position: relative;
					span{
						position: absolute;
						left:-52px;
						top:0;
						color:#fff;
						width: 34px;
						height: 34px;
						border-radius: 50%;
						text-align: center;
						line-height: 34px;
						background:#1bbc9d;
					}
					b{
						font-size: 24px;
					}
					
				}
				.detail{
					margin-top: 10px;
					span{
						font-size: 18px;
						&:last-child{
							padding-left: 42px;
							position:relative; 
							&:after{
								content: "";
								position: absolute;
								width: 2px;
								height: 10px;
								background: #878e95;
								left: 21px;
								top:8px
							}
						}
						
					}
				}
				.amount{
					margin-top: 10px;
					font-size: 18px;
					b{
						color: #1bbc9d;
						margin-left: 5px;
					}
					a{
						color:#d87b65;
						font-size: 16px;
						margin-left: 20px;
					}
				}
				p{
					margin-top: 10px;
					font-size:16px;
					color: #878e95;
					width: 560px;
				}
				.backorderbtn{
					width: 200px;
					height: 40px;
					border-radius: 4px;
					text-align: center;
					line-height: 40px;
					margin: 20px auto 0;
					background: #1bbc9d;
					color: #fff;
					font-size: 18px;
					font-weight: bold;
					cursor: pointer;
				}
			}
	}
</style>