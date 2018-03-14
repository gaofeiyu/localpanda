<template>
	<div class="fillYourInfo">
		<div class="back"><i class="iconfont" @click="back">&#xe615;</i></div>
		<div class="fillInfo">
			<h3>Fill in your information</h3>
			<div class="oderInfo">
				<div class="oderTitle">{{opctions.title}}</div>
				<div class="oderDetail">
					<span>{{opctions.startDate}}</span>
					<span v-if="opctions.startTime">{{opctions.startTime}}</span>
					<span v-if="opctions.adultNum==1&&opctions.childrenNum==0">1 Person</span>
					<span v-else>{{opctions.adultNum+opctions.childrenNum}} People</span>
				</div>
			</div>
			<div class="orderContact">
				<h4>Reservation Information</h4>
				
				<div class="inputItem" :class="{err:oderFirstNameErr}">
					<p>First name</p>
					<input :class="{err:oderFirstNameErr}" @focus="fousOderfisrtname" v-model="oderFirstName" />
				</div>
				<div class="inputItem" :class="{err:oderlastNameErr}">
					<p>Last name</p>
					<input :class="{err:oderlastNameErr}" @focus="fousoderlastName" v-model="oderlastName" />
				</div>
			
			
				<div class="inputItem" :class="{err:emailAddressErr}">
					<p>Email Address</p>
					<input :class="{err:emailAddressErr}" @focus="fousEmal" @blur="gabulr" v-model="emailAddress" />
				</div>
				<div class="inputItem" :class="{err:phoneErr}">
					<p>Mobile phone(optional)</p>
					<input :class="{err:phoneErr}" @focus="fousPhone" v-model="phone" />
				</div>
			</div>
			<div class="check">
				<span>Check this box if the contact for the reservation does NOT match the Primary Traveler.</span>
				<em v-if="check==0" @click="checkFn(0)" class="checkbox"></em>
				<em v-if="check==1" @click="checkFn(1)" class="checkbox backgrond iconfont">&#xe61e;</em>
			</div>
			<div class="orderContact" v-if="check==1">
				
				<h4>Key Traveler</h4>
				<div class="inputItem" :class="{err:TravellerFirstNameErr}">
					<p>First name</p>
					<input :class="{err:TravellerFirstNameErr}" @focus="fousFirst()" v-model="TravellerFirstName" />

				</div>
				<div class="inputItem" :class="{err:TravellerlastNameErr}">
					<p>Last name</p>
					<input :class="{err:TravellerlastNameErr}" @focus="fousLastName()" v-model="TravellerlastName" />
				</div>
			
			
				<div class="inputItem" :class="{err:TravelleremailAddressErr}">
					<p>Email Address</p>
					<input :class="{err:TravelleremailAddressErr}" @focus="fousidcard" v-model="TravelleremailAddress" />
				</div>
				<div class="inputItem" :class="{err:TravellerphoneErr}">
					<p>Mobile phone(optional)</p>
					<input :class="{err:TravellerphoneErr}" @focus="fousphonenumb()" v-model="Travellerphone" />
				</div>
			</div>
			<div class="Comments">
				<div class="information">
					<h4>Other required information</h4>
					<textarea v-if="opctions.category=='Private Tour'" v-model="comments" placeholder="please provide your hotel address so the guide can pick you up." onfocus="this.placeholder=''" onblur="this.placeholder='please provide your hotel address so the guide can pick you up.'"></textarea>
					<!--<textarea v-else v-model="comments"></textarea>-->
				</div>
			</div>
		</div>
		<div class="nextBtn">
			<div class="next" @click="next">NEXT</div>
		</div>
	</div>

	<!--<AlertGoBack :isShowAlertTitle="isShowAlertTitle" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlertFn="getIsShowAlertFn"></AlertGoBack>-->
	<!--<Alert :isShowAlert="isShowAlert" :alertTitle='alertTitle' :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>-->
	<!--<FooterCommon></FooterCommon>-->

</template>

<script>
	import { regExp } from '../../assets/js/plugin/utils'
	/*import AlertGoBack from '../../components/Prompt/AlertGoBack';
	import Alert from '../../components/Prompt/Alert'*/
	import '../../assets/js/plugin/flexible.js'

	export default {
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
				addOder: false,
				
			}

		},
		components: {
			/*HeaderCommon,
			FooterCommon,
			AlertGoBack,
			Alert*/

		},
		methods: {
			back(){
				 history.back()
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
			a(){
				this.a=""
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
			next() {
				const that = this
				var obj;
				//that.addOder = true
				if(that.oderFirstName == "" || regExp.isNub(that.oderFirstName) || regExp.isCode(that.oderFirstName)) {
					that.oderFirstNameErr = true
					console.log(1)
					
				} else if(that.oderlastName == "" || regExp.isNub(that.oderlastName) || regExp.isCode(that.oderlastName)) {
					that.oderlastNameErr = true
					console.log(2)
					
				} else if(!regExp.isEmail(that.emailAddress)) {
					that.emailAddressErr = true
					console.log(3)
					
				} else if(!regExp.isMobil(that.phone)) {
					that.phoneErr = true
					console.log(4)
					
				} else {
					if(that.check == 1) {
						if(that.TravellerFirstName == "" || regExp.isNub(that.TravellerFirstName) || regExp.isCode(that.TravellerFirstName)) {
							that.TravellerFirstNameErr = true
							
							
						} else if(that.TravellerlastName == "" || regExp.isNub(that.TravellerlastName) || regExp.isCode(that.TravellerlastName)) {
							that.TravellerlastNameErr = true
							
							
						} else if(!regExp.isEmail(that.TravelleremailAddress)) {
							that.TravelleremailAddressErr = true
							
							
						} else if(!regExp.isMobil(that.Travellerphone)) {
							that.TravellerphoneErr = true
							
							
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
						console.log(6)
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
							that.axios.put("https://www.localpanda.com/api/activity/order/create", JSON.stringify(obj), {
								headers: {
									'Content-Type': 'application/json; charset=UTF-8'
								}
							}).then(function(response) {

								window.location.href = "payForActivity.html?objectId=" + response.data
							}, function(response) {})
						}
					}
					//console.log(that.addOder)

				}
			}

		},
		created: function() {
			
			this.opctions = JSON.parse(localStorage.getItem("orderInfo"))
			
		},
		mounted: function() {
			this.logIn = window.localStorage.getItem("logstate")
			this.goBackFn()

		},
		watch: {

		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/_main.scss';
	@import '../../assets/font/iconfont.css';
	#launcher{
		bottom: 2.133333rem!important;
	}
	
</style>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	.fillYourInfo {
		padding: 0 0.586666rem 1.946666rem;
		.back {
			line-height: 1.013333rem;;
			i {
				font-size: 0.426666rem;
				font-weight: bold;
			}
		}
		.fillInfo{
			margin-top: 0.493333rem;
			h3{
				font-size: 0.8rem;
				font-weight: bold;
			}
			.oderInfo{
				margin-top: 1.333333rem;
				.oderTitle{
					font-size: 0.453333rem;
					font-weight: bold;
				}
				.oderDetail{
					padding: 0.32rem 0 0.693333rem;
					border-bottom:2px solid #ebebeb;
					span{
						font-size: 0.346666rem;
						margin-right: 0.4rem;
						&:last-child{
							margin-right: 0;
						}
					}
				}
			}
			.orderContact{
				h4{
					padding-top:0.56rem;
					font-size: 0.426666rem;
				}
				.inputItem{
					margin-top:0.56rem;
					padding-bottom: 0.28rem;
					border-bottom: 2px solid #ebebeb;
					p{
						font-size:0.32rem;
					}
					input{
						width: 100%;
						border:none;
						padding-left: 0;
						font-size: 0.56rem;
						margin-top: 0.133333rem;
					}
				}
			}
			.check{
				
				margin-top: 0.8rem;
				position: relative;
				span {
					font-size: 0.293333rem;
					margin-left: 0.933333rem;
					display: block;
					line-height: 0.4rem;
				}
				.checkbox {
					position: absolute;
					left: 0;
					width: 0.666666rem;
					height: 0.666666rem;
					text-align: center;
					border: 1px solid #dde0e0;
					border-radius: 50%;
					top: 50%;
					margin-top: -0.393333rem;
					cursor: pointer;
					line-height: 0.693333rem;
					color: #fff;
					font-size: 0.346666rem;
				}
				.backgrond {
					background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%);
				}
				
			}
			.Comments{
				margin-top: 0.8rem;
				padding-bottom: 0.8rem;
				.information{
					padding-bottom: 0.266666rem;
					border-bottom: 2px solid #ebebeb;
					h4{
						font-size: 0.32rem;
						span{
							color: #878E95;
						}
					};
					textarea{
						height: 1.2rem;
						width: 100%;
						padding-left: 0;
						border: none;
						margin-top: 0.346666rem;
						font-size: 0.346666rem;
						&:-webkit-placeholder { /* Mozilla Firefox 4 to 18 */
    						color: #dde0e0; 
						}
					}
				}
			}
			
		}
		.nextBtn{
				border-top:2px solid #ebebeb;
				width: 100%;
				background: #fff;
				padding:0.373333rem 0;
				position: fixed;
				bottom: 0;
				left: 0;
				.next{
					width: 90%;
					height:1.2rem;
					background-image: linear-gradient(270deg,#009efd 0%, #1bbc9d 100%);
					font-size: 0.346666rem;
					color: #FFF;
					text-align: center;
					line-height: 1.2rem;
					margin: 0 auto;
					border-radius: 0.6rem;

				}
			}
			.err{
				border-color: red!important;
				color: red!important;
			}
	}
	
</style>