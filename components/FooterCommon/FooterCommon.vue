<template>
	<div id="footercommon">
		<div class="footInfo">
			<div class="footLeft">
				<h3>Message</h3>
				<p>If you have any questions, suggestions, or just want to chat, feel free to contact us using the boxes below. We'll get back to you within 1 business day.</p>
				<div class="inpt">
					<input type="" name="" class="name"  :class="{borderflase:nameError}" @focus="nameF" value="" placeholder="Name" v-model="name" />
					<input type="" name="" class="email" :class="{borderflase:emailError}" value="" placeholder="Mail" v-model="email" />
				</div>
				<div class="text">
					<textarea placeholder="Message" :class="{borderflase:textareaError}" v-model="textarea"></textarea>
				</div>
				<button class="btnlinner" @click="submit">SUBMIT</button>
			</div>
			<div class="footRight">
				<h3>More Info</h3>
				<p>We provide private tours specifically for you! </p>
				<p class="no-margin">Contact our guides today with your questions.</p>
				<div class="emaillog">
					<div>
						<i class="iconfont" style="font-size: 17px;">&#xe649;</i>Contact
					</div>
					<p>0086 21 80182090</p>
					<p>+1-818-404-8141</p>
					<p>service@localpanda.com</p>
					
				</div>
				<div class="address">
					<div><i class="iconfont">&#xe610;</i>Address</div>
					<p>762 Tianshan Rd,6F F-Town Room 630, </p>
					<p>Changning District, Shanghai 200051</p>
				</div>
			</div>
		</div>
		<div class="footCooperation">
			<div class="footCooperationInfo">
				<div class="footCooperationL">
					<span class="iconfont">&#xe621;</span>
					<div class="logtext">
						<p>© Local Panda 2017</p>
						<p>All Rights Reserved</p>
					</div>
				</div>
				<div class="footCooperationR">
					 <a href="https://www.facebook.com/LocalPandaGuides/?fref=ts">
					 	<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-facebook"></use>
						</svg>
					 </a>
					 <a href="https://twitter.com/LocalPandaGuide">
					 	<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-twitter1"></use>
						</svg>
					 </a>
					 <a href="https://www.instagram.com/localpandaguides/">
					 	<svg class="icon" aria-hidden="true">
						    <use xlink:href="#icon-instagram"></use>
						</svg>
					 </a>
					 
					 <span style="margin-left: 20px;">
					 	<svg class="icon1" aria-hidden="true">
						    <use xlink:href="#icon-mastercard"></use>
						</svg>
					 </span>
					 <span>
					 	<svg class="icon1" aria-hidden="true">
						    <use xlink:href="#icon-americanexpress"></use>
						</svg>
					 </span>
					 <span>
					 	<svg class="icon1" aria-hidden="true">
						    <use xlink:href="#icon-paypal"></use>
						</svg>
					 </span>
					 <span>
					 	<svg class="icon1" aria-hidden="true">
						    <use xlink:href="#icon-visa"></use>
						</svg>
					 </span>
					<!-- <span class="footlog log1"></span>
					<span class="footlog log4"></span>
					<span class="footlog log3"></span>
					<span class="footlog log2"></span>-->
				</div>
			</div>

		</div>
		<Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
	
	
	
	
</template>
<script>
	import { regExp } from '~/assets/js/plugin/utils'
	import Alert from '../Prompt/Alert'
	export default {
		props:["showBook","logIn"],
		name: 'footercommon',
		data() {
			return {
				name: '',
				email: '',
				textarea: '',
				nameError: false,
				emailError: false,
				textareaError: false,
				isShowAlert: false,//弹框返回状态
				alertMessage: "",//弹框内容
				alertTitle:'',
				deviceWidth:''
			}
		},
		components:{
			Alert
		},
		methods: {
			getIsShowAlert(val) {
				this.isShowAlert = val;
			},
			submit() {
				const that = this
				if(that.name==''|| regExp.isNub(that.name)||regExp.isCode(that.name)) {
					that.nameError = true
				} else if(!regExp.isEmail(that.email)) {
					that.emailError = true
				} else if(that.textarea == "") {
					that.textareaError = true
				} else {
					if(window.localStorage.getItem("userid")){
						var obj = {
							userId:window.localStorage.getItem("userid"),
							objectType:"GENERAL",
							userName: that.name,
							emailAddress: that.email,
							message: that.textarea
						}
					}else{
						var obj = {
							objectType:"GENERAL",
							userName: that.name,
							emailAddress: that.email,
							message: that.textarea
						}
					}
						that.axios.post("http://13.59.63.205/user/feedback/commit", JSON.stringify(obj), {
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
						}).then(function(response) {
							
							if(response.data.succeed){
								that.isShowAlert=true
								that.alertTitle="Submission completed!"
								that.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
								that.name=""
								that.email=""
								that.textarea=""
							}else{
								that.isShowAlert=true
								that.alertMessage="Failed!"
								that.name=""
								that.email=""
								that.textarea=""
							}
							
						}, function(response) {
	
						})
					
				}
			},
			nameF() {
				this.nameError = false
			},
			emailF() {
				this.emailError = false
			},
			textF() {
				this.textareaError = false
			}

		},
		mounted() {
			
			
		},
		
		created(){
		}
	}
</script>
<style lang="scss">
	.btnlinner {
		margin-top: 20px;
		width: 114px;
	}
</style>
<style lang="scss" scoped>
	#footercommon {
		.icon {
	       width: 26px; height: 26px;
	       vertical-align:middle;
	       fill: currentColor;
	       margin:0px 14px 0 0;
	       overflow: hidden;
	    }
	    .icon1{
	    	width: 58px; height: 36px;
	    	vertical-align: middle;
	       fill: currentColor;
	       overflow: hidden;
	       border-radius: 5px;
	       
	    }
		background: #faf9f8;
		.footInfo {
			margin: 0 auto;
			width: 1170px;
			padding: 60px 0;
			overflow: auto;
			.footLeft {
				float: left;
				width: 671px;
				h3 {
					font-size: 18px;
					color: #353a3f;
					font-weight: bold;
					line-height: 30px;
					padding-bottom: 12px;
					border-bottom: 2px solid #e8e8e8;
				}
				p {
					margin: 30px 0;
					padding-right: 20px;
					font-size: 16px;
				}
				.inpt {
					display: flex;
					display: -webkit-flex;
					display: -ms-flex;
					flex-direction: row;
					-webkit-flex-direction: row;
					-moz-flex-direction: row;
					-ms-flex-direction: row;
					align-items: center;
					input {
						flex: 1;
						-webkit-flex: 1;
						-moz-box-flex: 1;
						-ms-flex: 1;
						margin-right: 17px;
						border: none;
						height: 34px;
						color: #353a3f;
						font-size: 14px;
						&:last-child {
							margin-right: 0;
						}
						
					}
				}
				.text {
					margin-top: 16px;
					height: 141px;
					width: 671px;
					textarea {
						width: calc(100% - 10px);
						height: 131px;
						padding-top: 10px;
						padding-left: 10px;
						border: none;
						resize:none;
						font-size: 14px;
					}
				}
			}
			.footRight {
				float: right;
				width: 340px;
				h3 {
					font-size: 18px;
					color: #353a3f;
					font-weight: bold;
					line-height: 30px;
					border-bottom: 2px solid #e8e8e8;
					padding-bottom: 12px;
				}
				p {
					width: 340px;
					margin-top: 30px;
					font-size: 16px;
					&.no-margin {
						margin: 0;
					}
				}
				.emaillog,
				.address {
					margin-top: 20px;
					div {
						font-size: 16px;
						color: #1bbc9d;
						i{
							margin-right: 8px;
						}
					}
					p {
						margin-top: 10px;
					}
				}
			}
		}
		.footCooperation {
			background: #353a3f;
			height: 140px;
			.footCooperationInfo {
				margin: 0 auto;
				width: 1170px;
				height: 140px;
				overflow: hidden;
				.footCooperationL {
					float: left;
					
					span {
						float: left;
						font-size: 42px;
						color: #fff;
						display: inline-block;
						line-height: 150px;
					}
					.logtext {
						float: left;
						margin: 52px 0 0 20px;
						color: #fff;
						font-size: 16px;
					}
				}
				.footCooperationR {
					a{
						cursor: pointer;
					}
					span{
						display: inline-block;
						margin-right: 20px;
					}
					float: right;
					line-height: 159px;
					
					
					}
				}
			}
		
	}
	.borderflase {
		border: 1px solid red!important;
	}
	/* phone */
	/*#footerMob{
		padding: 0 0.4rem;
		
		.footTitle{
			font-size:0.613333rem;
			padding-top: 1.066666rem ;
			border-top: 1px solid #ebebeb;
			color: #353a3f;
			font-weight: bold;
			text-align: center;
		}
		.subhead{
			font-size: 0.373333rem;
			text-align: center;
			margin-top: 0.12rem;
		}
		.input{
			height: 1.146666rem;
			margin-top: 0.48rem;
			input{
				height: 100%;
				width:calc(100% - 0.4rem);
				border:1px solid #dde0e0;
				font-size: 0.32rem;
			}
			
		}
		.textinput{
			margin-top: 0.48rem;
			textarea{
				width:calc(100% - 0.4rem);
				height: 2.56rem;
				padding-top: 10px;
				padding-left: 10px;
				border: 1px solid #dde0e0;
				resize:none;
				font-size:0.32rem ;
				
			}
		}
		.submitBtn{
			height: 1.146666rem;
			background-image: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%), linear-gradient(#878e95,#878e95);
			width: 100%;
			border-radius:  0.573333rem;
			text-align: center;
			color: #fff;
			font-size: 0.346666rem;
			margin-top: 0.48rem;
			margin-bottom: 1.066666rem;
		}
		.contactInfo{
			overflow: hidden;
			background-image: linear-gradient(135deg,#1bbc9d 0%,#009efd 100%),linear-gradient(#878e95, #878e95);
			padding: 1.066666rem 0 1.2rem 0.4rem;
			margin:0 -0.4rem;
			.emailinfo{
				h3{
					font-size: 0.266666rem;
					color: rgba(255,255,255,.5);
				}
				b{
					display: block;
					font-size: 0.373333rem;
					color: #fff;
					margin-top: 0.32rem;
				}
			}
			.address{
				margin-top: 0.72rem;
				h3{
					font-size: 0.266666rem;
					color: rgba(255,255,255,.5);
				}
				b{
					display: block;
					font-size: 0.373333rem;
					color: #fff;
					margin-top: 0.32rem;
				}
			}
			.footLog{
				margin-top: 2.146666rem;
				text-align: center;
				.loaclpandaLog{
					i{
						font-size: 1.066666rem;
						color: #fff;
					}
				}
				.cooperation{
					margin-top: 0.746666rem;
					 span{
					 	display: inline-block;
					 	width:0.746666rem;
					 	height: 0.746666rem;
					 	text-align: center;
					 	line-height: 0.746666rem;
					 	border-radius: 50%;
					 	background: #fff;
					 	margin-left: 0.373333rem;
					 	&:first-child{
					 		margin-left: 0;
					 	}
					 	i{
					 		font-size: 0.373333rem;
					 		background-image: -webkit-linear-gradient(135deg,#009efd,#1bbc9d);
								-webkit-text-fill-color: transparent;
								-webkit-background-clip: text;
								
								
								background-image: -moz-linear-gradient(135deg,#009efd,#1bbc9d);
								-moz-text-fill-color: transparent;
								-moz-background-clip: text;
								
								background-image: -moz-linear-gradient(135deg,#009efd,#1bbc9d);
								-ms-text-fill-color: transparent;
								-ms-background-clip: text;
								
								background-image: -o-linear-gradient(135deg,#009efd,#1bbc9d);
								-o-text-fill-color: transparent;
								-o-background-clip: text;
					 	}
					 }
				}
				.localPanda_text{
					margin-top: 0.746666rem;
					font-size: 0.373333rem;
					color: #fff;
				}
			}
		}
	}*/
	
	
</style>