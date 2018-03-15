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
							<input :class="{err:emailAddressErr}" @focus="fousEmal" @blur="gabulr" v-model="emailAddress" />
						</div>
						<div class="phone">
							<p>Mobile phone(optional)</p>
							<input :class="{err:phoneErr}" @focus="fousPhone" v-model="phone" />
						</div>
					</div>
					<span>Your voucher will be sent here, make sure it is correct</span>

				</div>
				<div class="check">
					<span>Check this box if the contact for the reservation does NOT match the Primary Traveler.</span>
					<em v-if="check==0" @click="checkFn(0)" class="checkbox"></em>
					<em v-if="check==1" @click="checkFn(1)" class="checkbox backgrond iconfont">&#xe61e;</em>
				</div>
				<div class="addOrderContact" v-if="check==1">
					<ul>
						<li>
							<h4>Key Traveler</h4>

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
									<input :class="{err:TravelleremailAddressErr}" @focus="fousidcard" v-model="TravelleremailAddress" />
								</div>
								<div class="Mobilephone">
									<p>Mobile phone(optional)</p>
									<input :class="{err:TravellerphoneErr}" @focus="fousphonenumb()" v-model="Travellerphone" />
								</div>
							</div>

						</li>
					</ul>

				</div>

				<div class="Comments">
					<div class="information">
						<h4>Other required information</h4>
						<textarea v-if="opctions.category=='Private Tour'" placeholder="please provide your hotel address so the guide can pick you up." v-model="comments"></textarea>
						<textarea v-else v-model="comments"></textarea>

						<div class="nextBtn clearfix">
							<div class="next" @click="next">NEXT</div>
							<div class="text">You ordered as a guest. To view your order details, you can click "My Bookings" on the top bar then type in the reservee's email address and name you entered before to access that information.</div>
						</div>

					</div>
				</div>
			</div>
			<div class="oderdetial">
				<div class="payfordetail">
					<div class="head clearfix">
						<div class="serviceform">
							<h3>{{opctions.title}}</h3>
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
							<div class="formula" v-if="opctions.childrenNum==0 && opctions.adultNum==1">${{returnFloat(opctions.adultsPic)}} x 1 Person</div>
							<div class="formula" v-else>$ {{returnFloat(round(opctions.adultsPic/(opctions.adultNum+opctions.childrenNum)))}} x {{opctions.adultNum+opctions.childrenNum}} People </div>
							<div class="adultPic">$ {{returnFloat(opctions.adultsPic)}}</div>
						</div>
						<div class="child" v-if="opctions.childrenNum>0&&opctions.childDiscount">
							<b>- ${{returnFloat(opctions.childrenNum*opctions.childDiscountP)}}</b> for child(ren)
						</div>
					</div>
					<div class="total clearfix">
						<div class="totle-title">Total (USD)</div>
						<div class="totalPic">${{returnFloat(opctions.amount)}}</div>
					</div>

				</div>
				<div class="bookbtn">
					<p>Pay with:</p>
					<div class="payfor">
						<img style="width:200px" src="https://s3.us-east-2.amazonaws.com/localpanda.images/static/icon/stripe.png" />
					</div>
					<div style=" width:316px;font-size: 16px;line-height: 20px;display: block; margin-top: 20px;"><b>Secure Payment:</b> </br>We use Stripe’s online payment system, which sends your payment info directly to Stripe’s secure servers, so your data is never sent to Local Panda’s servers and cannot be stolen.</div>
				</div>
			</div>

		</div>
		<AlertGoBack :isShowAlertTitle="isShowAlertTitle" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlertFn="getIsShowAlertFn"></AlertGoBack>
		<Alert :isShowAlert="isShowAlert" :alertTitle='alertTitle' :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
		<FooterCommon></FooterCommon>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { regExp } from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import AlertGoBack from '~/components/Prompt/AlertGoBack';
	import Alert from '~/components/Prompt/Alert'
	
	export default {
	async asyncData({ apiBasePath }) {
	    return {
	      apiBasePath: apiBasePath
	    }
	  },
		name: 'fillYourInfo',
		data() {
			return {
				opctions: {},
				//订单联系人
				oderFirstName: '',
				oderFirstNameErr: false,
				oderlastName: '',
				oderlastNameErr: false,
				emailAddress: '',
				emailAddressErr: false,
				phone: '',
				phoneErr: false,

				//出游联系人
				TravellerFirstName: '',
				TravellerFirstNameErr: false,
				TravellerlastName: '',
				TravellerlastNameErr: false,
				TravelleremailAddress: '',
				TravelleremailAddressErr: false,
				Travellerphone: '',
				TravellerphoneErr: false,

				comments: '', //提交意见咨询

				isShowAlertTitle: false, //弹框返回状态
				alertMessage: "", //弹框内容
				alertTitle: "", //弹框标题
				logIn: '', //是否登陆
				isShowAlert: false, //错误弹框
				check: 0, //checked
				addOder: false
			}

		},
		components: {
			HeaderCommon,
			FooterCommon,
			AlertGoBack,
			Alert

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
				}else {
					return(parseFloat(this.cutXiaoNum(val, 1)) + 0.1).toFixed(1)

				}

			},
			checkFn(id) {
				if(id == 0) {
					this.check = 1

				} else {
					this.check = 0
					this.TravellerFirstName = ''
					this.TravellerlastName = ''
					this.TravelleremailAddress = ''
					this.Travellerphone = ''

				}
			},
			getIsShowAlert(val) {
				this.isShowAlert = val;
			},
			getIsShowAlertFn(val) {
				this.isShowAlertTitle = val;
			},

			goBackFn() {
				let $this = this
				if(window.history && window.history.pushState) {
					window.addEventListener('popstate', function() {
						var hashLocation = location.hash;
						var hashSplit = hashLocation.split("#!/");
						var hashName = hashSplit[1];
						if(hashName !== '') {
							var hash = window.location.hash;
							if(hash === '') {
								$this.isShowAlertTitle = true
								$this.alertMessage = "If you leave the page, the information will not be saved. Are you sure to leave?";
							}

						}
					})
					window.history.pushState('popstate', null, '#');

				}
			},
			gabulr() {
				ga('gtag_UA_107010673_1.send', {
					hitType: 'event',
					eventCategory: 'Text Input',
					eventAction: 'Lose Focus',
					eventLabel: 'activity_booking_email',
				});
			},
			fousOderfisrtname() {
				this.oderFirstNameErr = false
			},
			fousoderlastName() {
				this.oderlastNameErr = false
			},
			fousEmal() {
				this.emailAddressErr = false
			},
			fousPhone() {
				this.phoneErr = false
			},
			fousFirst() {
				this.TravellerFirstNameErr = false

			},
			fousLastName(i) {
				this.TravellerlastNameErr = false
			},
			fousidcard(i) {
				this.TravelleremailAddressErr = false
			},
			fousphonenumb(i) {
				this.TravellerphoneErr = false
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
			next() {
				const that = this
				var obj;
				//that.addOder = true
				if(that.oderFirstName == "" || regExp.isNub(that.oderFirstName) || regExp.isCode(that.oderFirstName)) {
					that.oderFirstNameErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else if(that.oderlastName == "" || regExp.isNub(that.oderlastName) || regExp.isCode(that.oderlastName)) {
					that.oderlastNameErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else if(!regExp.isEmail(that.emailAddress)) {
					that.emailAddressErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else if(!regExp.isMobil(that.phone)) {
					that.phoneErr = true
					that.isShowAlert = true
					that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
				} else {
					if(that.check == 1) {
						if(that.TravellerFirstName == "" || regExp.isNub(that.TravellerFirstName) || regExp.isCode(that.TravellerFirstName)) {
							that.TravellerFirstNameErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else if(that.TravellerlastName == "" || regExp.isNub(that.TravellerlastName) || regExp.isCode(that.TravellerlastName)) {
							that.TravellerlastNameErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else if(!regExp.isEmail(that.TravelleremailAddress)) {
							that.TravelleremailAddressErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else if(!regExp.isMobil(that.Travellerphone)) {
							that.TravellerphoneErr = true
							that.isShowAlert = true
							that.alertMessage = "There are required fields without values or with incorrect values. Please check the info you've provided and make sure all the required fields have been filled."
						} else {
							obj = {
								"userId": that.opctions.userId,
								"activityId": that.opctions.activityId,
								"amount": that.opctions.amount,
								"currency": "USD",
								"adultNum": that.opctions.adultNum,
								"childrenNum": that.opctions.childrenNum,
								"infantNum": that.opctions.infantNum,
								"startDate": that.opctions.startDate,
								"startTime": that.opctions.startTime,
								"averagePrice": that.opctions.averagePrice,
								"childDiscount": that.opctions.childDiscount,
								"comments": that.comments ? that.comments : null,
								"contactInfo": {
									"firstName": that.oderFirstName,
									"lastName": that.oderlastName,
									"phoneNumber": that.phone ? that.phone : null,
									"emailAddress": that.emailAddress
								},
								"travelerInfo": {
									"firstName": that.TravellerFirstName,
									"lastName": that.TravellerlastName,
									"phoneNumber": that.Travellerphone,
									"emailAddress": that.TravelleremailAddress
								},
								"utcOffset": new Date().getTimezoneOffset() / 60 * -1
							}
							if(that.addOder == false) {
								that.axios.put("https://www.localpanda.com/api/activity/order/create", JSON.stringify(obj), {
									headers: {
										'Content-Type': 'application/json; charset=UTF-8'
									}
								}).then(function(response) {
									
									window.location.href = "payForActivity.html?objectId=" + response.data
								}, function(response) {})
							}
						}
					} else {
						obj = {
							"userId": that.opctions.userId,
							"activityId": that.opctions.activityId,
							"amount": that.opctions.amount,
							"currency": "USD",
							"adultNum": that.opctions.adultNum,
							"childrenNum": that.opctions.childrenNum,
							"infantNum": that.opctions.infantNum,
							"startDate": that.opctions.startDate,
							"startTime": that.opctions.startTime,
							"averagePrice": that.opctions.averagePrice,
							"childDiscount": that.opctions.childDiscount,
							"comments": that.comments ? that.comments : null,
							"contactInfo": {
								"firstName": that.oderFirstName,
								"lastName": that.oderlastName,
								"phoneNumber": that.phone ? that.phone : null,
								"emailAddress": that.emailAddress
							},
							"utcOffset": new Date().getTimezoneOffset() / 60 * -1
						}
						if(that.addOder == false) {
							that.addOder = true
							that.axios.put(this.apiBasePath+"activity/order/create", JSON.stringify(obj), {
								headers: {
									'Content-Type': 'application/json; charset=UTF-8'
								}
							}).then(function(response) {
								
								window.location.href = "/activity/payForActivity?objectId=" + response.data
							}, function(response) {})
						}
					}
					console.log(that.addOder)

				}
			}

		},
		created: function() {
			
			
		},
		mounted: function() {
			this.opctions = localStorage.getItem("orderInfo")?JSON.parse(localStorage.getItem("orderInfo")):''
			this.logIn = window.localStorage.getItem("logstate")
			this.goBackFn()

		},
		watch: {

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
					b {
						color: red;
					}
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
				.check {
					margin-top: 40px;
					position: relative;
					span {
						font-size: 16px;
						color: #878e95;
						margin-left: 40px;
					}
					.checkbox {
						position: absolute;
						left: 0;
						width: 26px;
						height: 26px;
						text-align: center;
						border: 1px solid #dde0e0;
						border-radius: 50%;
						top: 50%;
						margin-top: -16px;
						cursor: pointer;
						line-height: 28px;
						color: #fff;
						font-size: 12px;
					}
					.backgrond {
						background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
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
							height: 25px;
							border-radius: 3px;
							border: solid 1px #dde0e0;
							resize: none;
							padding: 20px;
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
					.nextBtn {
						margin-top: 20px;
						.next {
							width: 90px;
							height: 46px;
							font-weight: bold;
							float: left;
							text-align: center;
							line-height: 46px;
							background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
							color: #fff;
							border-radius: 20px;
							font-size: 16px;
							cursor: pointer;
						}
						.text {
							float: left;
							width: 568px;
							margin-left: 30px;
							color: red;
							font-size: 14px;
							word-break: break-all;
						}
					}
				}
			}
		}
		.err {
			border-color: red!important;
		}
	}
</style>