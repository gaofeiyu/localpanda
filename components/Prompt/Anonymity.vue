<script>
	import {regExp} from "../../assets/js/plugin/utils"
	export default {
		name: "anonymity",
		data() {
			return {
				fbToken: '',
				faceUserID: '', //facebook 
				AnonymityActive: "",
				a: "",
				userid: "", //localpanda
				islogIn: 0,
				logImg: '',
				first:"",
				firstErr:false,
				last:"",
				lastErr:false,
				email:"",
				emailErr:"",
				errorText:"",
				loadJs:false,
			}
		},
		methods: {
			
			foucsIn(id){
				if(id==0){
					this.firstErr=false
					this.errorText=""
				}else if(id==1){
					this.lastErr=false
					this.errorText=""
				}else{
					this.emailErr=false
					this.errorText=""
				}
				
			},
			
			submitInfo(){
				let that=this
				if(that.first == "" || regExp.isNub(that.first) || regExp.isCode(that.first)){
					that.firstErr=true
					that.errorText="The information highlighted in red is not entered correctly. please enteragain.if you cannot retrieve your reservee's information, you can contact us at customer service:0086 21 80182090 or  service@localpanda.com"
					
				}else if(that.last == "" || regExp.isNub(that.last) || regExp.isCode(that.last)){
					that.lastErr=true
					that.errorText="The information highlighted in red is not entered correctly. please enteragain.if you cannot retrieve your reservee's information, you can contact us at customer service:0086 21 80182090 or  service@localpanda.com"
					
				}else if(!regExp.isEmail(that.email)){
					that.emailErr=true
					that.errorText="The information highlighted in red is not entered correctly. please enteragain.if you cannot retrieve your reservee's information, you can contact us at customer service:0086 21 80182090 or  service@localpanda.com"	
				}else{
					let obj={
						"lastName": that.last,
					    "firstName":that.first,
					    "emailAddress":that.email
					/* "lastName": "yao",
					    "firstName":"lulu",
					    "emailAddress":"luluyao@localpanda.com"*/
					}
					that.axios.post("https://www.localpanda.com/api/activity/order/list", JSON.stringify(obj), {
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						}
						}).then(function(response) {
							obj=JSON.stringify(obj)
							if(response.data.length>0){
								window.localStorage.setItem("obj",obj)
								window.location.href="https://www.localpanda.com/MyBookings.html?menu=0&flag=1"
							}else{
								that.errorText="Sorry, we didn't find an order under this name and email"	
							}
							
						}, function(response) {})
				}
			},
			
			loadScript(url, callback,Fn) {
				var that=this
				var script = document.createElement('script');
			    var head = document.getElementsByTagName('head')[0];
			    var loaded;
			    script.src = url;
			    if(typeof callback === 'function'){
			        script.onload = script.onreadystatechange = function(){
			            if(!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))){
			                script.onload = script.onreadystatechange = null;
			                loaded = true;
			                callback();
			                if(that.loadJs==true){
			                	Fn()
			                }
			            }
			        }
			    }
			    head.appendChild(script);
			},
			
			
			
			fbAsyncInit() {
				let that = this
				FB.init({
					appId: '487179281653793',
					cookie: true,
					xfbml: true,
					version: 'v2.10'
				});
				FB.AppEvents.logPageView();

				// check on loading
				FB.getLoginStatus(function(response) {
					that.ChangeCallback(response);
				})
				that.loadJs=true
				
			},
			cancle() {
				this.$emit('anonymity-back', false);
				this.AnonymityActive = false;
			},
			ok() {
			
				let that = this
				that.loadScript("//connect.facebook.net/en_US/sdk.js",that.fbAsyncInit,that.logIn)
				

			},
			logIn(){
				let that=this
				FB.login(function(response) {
					/*console.log("login"+response)*/
					if(response.authResponse) {
						that.checkLoginState()
					}
				});
			},
			checkLoginState() {
				let that = this
				FB.getLoginStatus(function(response) {
					that.statusChangeCallback(response);
					//location.reload()
				})
			},
			ChangeCallback(response) {
				if(response.status === 'connected') {

				} else if(response.status === 'not_authorized') { //未经授权
					FB.logout(function(response) {})
				} else {
					//console.log('不是登陆到Facebook;不知道是否授权');
				}
			},
			statusChangeCallback(response) {
				const that = this
				if(response.status === 'connected') { //登陆状态已连接
					that.fbToken = response.authResponse.accessToken;
					that.faceUserID = response.authResponse.userID;
					/*console.log(response.authResponse.userID )
					console.log(that.faceUserID)*/
					var Istrue = false
					//获取用户信息
					FB.api('/me?fields=name,picture', function(response) {
						Istrue = true
						that.logImg = response.picture.data.url
						
						window.localStorage.setItem("key", that.logImg)
						

						that.$emit('anonymity-back', false);
						that.AnonymityActive = false;
						that.islogIn = 1;

						window.localStorage.setItem("logstate", that.islogIn);
						window.localStorage.setItem("fbToken", that.fbToken)
						
						that.getToken(Istrue)
					});

					//setTimeout(function(){history.go(0)},300)
				} else if(response.status === 'not_authorized') { //未经授权
					FB.logout(function(response) {})
				} else {
					//console.log('不是登陆到Facebook;不知道是否授权');
				}
			},
			getToken(Istrue) {
				if(Istrue == true) {
					let $this = this;
					let obj = {
						accessToken: $this.fbToken,
						userId: $this.faceUserID
					}
					
					
					/*async asyncData ({ params },callback) {
					    let { data } = await axios.post('https://www.localpanda.com/user/login/facebook',JSON.stringify(obj))
					    return { title: data.title }
					 }*/
					$this.axios.post("http://13.59.63.250/user/login/facebook", JSON.stringify(obj), {
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						}
					}).then(function(response) {
						/*console.log("getToken"+response)*/
						
						$this.userid = response.data
						
						window.localStorage.setItem("userid", $this.userid)
						
						window.location.href="https://www.localpanda.com/MyBookings.html?menu=0&flag=1"
						

					}, function(response) {})
				}
			}

			/*
			 * Actions for self-defined button
			 */

		},
		watch: {
			AnonymityStatus: function(val, oldVal) {
				console.log(val)
				if(val) {
					
					this.AnonymityActive = true;
				} else {
					this.AnonymityActive = false;
				}
			}
		},
		mounted() {
			//this.fbAsyncInit()
		},
		props: ['AnonymityStatus',"obj"]
	}
</script>
<template>
	<div id="anonymity" v-bind:class="['alertTitleOuter',AnonymityActive ? 'on' : 'off']">

		<div v-bind:class="{'boxshow animated zoomIn' : AnonymityActive , 'boxshow animated zoomOut' : !AnonymityActive}">
			<div class="false" @click="cancle"><i class="iconfont">&#xe629;</i></div>
			<div class="con">
				<div class="facebook">
					<h3 class="title">Log in with Facebook</h3>
					<p>If you have already logged in via your Facebook account and placed an order, you can login through Facebook and view the status of your order.</p>
					<div class="btn" @click="ok"><button><span class="iconfont">&#xe61d;</span>Log in with Facebook</button></div>
				</div>
				<div class="others">
					<h3>For Guest Users</h3>
					<p>Please enter reservee's following information to view the order status</p>
					<div class="name clearfix">
						<div class="firstName">
							<input v-model="first" placeholder="First name" @focus="foucsIn(0)" :class="{err:firstErr}"/>
						</div>
						<div class="lastName">
							<input v-model="last" placeholder="Last name" @focus="foucsIn(1)" :class="{err:lastErr}"/>
						</div>
					</div>
					<div class="email">
						<input v-model="email" placeholder="Email" @focus="foucsIn(3)" :class="{err:emailErr}"/>
					</div>
					<div class="othersBtn" @click="submitInfo">Submit</div>
				</div>
				<p style="text-align: left; color: red;">{{errorText}}</p>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	@import "../../assets/scss/base/_animate.scss";
	.alertTitleOuter {
		background: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		&.on {
			display: block;
		}
		&.off {
			display: none;
		}
		.boxshow {
			width: 540px;
			background: $white;
			overflow: hidden;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -303px 0 0 -275px;
			box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
			.con {
				input{
					&:hover{
						border-color: #1bbc9d!important;
					}
				}
				padding:30px;
				h3 {
					font-size: 22px;
					text-align: center;
					font-weight: 700;
				}
				p {
					font-size: 14px;
					margin-top: 15px;
					vertical-align: middle;
					text-align: center;
					white-space: normal;
				}
			}
			.facebook{
				.btn {
					text-align: center;
					margin-top: 15px;
					padding-bottom:26px;
					border-bottom: 1px solid #dde0e0;
					button {
						span {
							margin-right: 20px;
						}
						height: 42px;
						font-size:18px;
						line-height: 42px;
						width: 100%;
						text-align: center;
						background:#44619d;
						color: #fff;
						border-radius: 21px;
						margin: 0 auto;
					}
				}
			}
			.others{
				margin-top:20px ;
				.name{
					margin-top: 16px;
					height:44px;
					
					.firstName{
						float: left;
						width: 220px;
						input{
							width: 188px;
							padding-left: 30px;
							border: solid 1px #dde0e0;
							height: 44px;
							border-radius: 21px;
							font-size: 16px;
						};
					}
					.lastName{
						float: left;
						margin-left: 20px;
						width: 220px;
						input{
							width: 188px;
							padding-left: 30px;
							border: solid 1px #dde0e0;
							height: 44px;
							border-radius: 21px;
							font-size: 16px;
						};
					}
				}
				.email{
					margin-top: 20px;
					input{
							width: 428px;
							padding-left: 30px;
							border: solid 1px #dde0e0;
							height: 44px;
							border-radius: 21px;
							font-size: 16px;
					}
				}
				.othersBtn{
					margin-top: 20px;
					width: 100%;
					height: 44px;
					background-image: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%);
					border-radius:21px;
					text-align: center;
					line-height:44px;
					font-size: 18px;
					color: #fff;
					font-weight: bold;
					cursor: pointer;
	
				}
			}
			
			.false {
				&:hover {
					cursor: pointer;
				}
				position: absolute;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background: #dde0e0;
				color: #fff;
				right: 10px;
				top: 11px;
				line-height: 24px;
				text-align: center;
			}
		}
		.err{
			border-color: red!important;
		}
	}
</style>