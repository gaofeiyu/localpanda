<script>
import {loadScript} from "~/assets/js/plugin/utils.js"
	export default {
		
		name: "alertTitle",
		data() {
			return {
				fbToken: '',
				faceUserID: '', //facebook 
				alertTitleActive: "",
				a: "",
				userid: "", //localpanda
				islogIn: 0,
				logImg: '',
				loadJs:false,
				
			}
		},
		methods: {
			
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
				this.$emit('alert-title-call-back', true);
				this.alertTitleActive = false;
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
						

						that.$emit('alert-title-call-back', true);
						that.alertTitleActive = false;
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
					$this.axios.post("https://www.localpanda.com/user/login/facebook", JSON.stringify(obj), {
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						}
					}).then(function(response) {
						/*console.log("getToken"+response)*/
						
						$this.userid = response.data
						
						window.localStorage.setItem("userid", $this.userid)
						location.reload()
						
						

					}, function(response) {})
				}
			}

			/*
			 * Actions for self-defined button
			 */

		},
		watch: {
			alertTitleStatus: function(val, oldVal) {
				if(val) {
					this.alertTitleActive = true;
				} else {
					this.alertTitleActive = false;
				}
			}
		},
		mounted() {
			let that = this
			//that.fbAsyncInit()
		},
		props: ['alertTitleStatus',"obj"]
	}
</script>
<template>
	<div id="alertTitle" v-bind:class="['alertTitleOuter',alertTitleActive ? 'on' : 'off']">

		<div v-bind:class="{'boxshow animated zoomIn' : alertTitleActive , 'boxshow animated zoomOut' : !alertTitleActive}">
			<div class="false" @click="cancle"><i class="iconfont">&#xe629;</i></div>
			<div class="con">
				<!--父级组件调用 -->
				<!--<p slot="alertMessage">XXXXX</p>-->
				<!--<slot name="alertMessage">
					
				</slot>-->
				<!--<h3 slot="alertTitle"></h3>
				<p slot="alertMessage"></p>-->
				<slot name="alertTitleLogin"></slot>
				<slot name="alertTitleMessage"></slot>

			</div>
			<div class="btn" @click="ok"><button><span class="iconfont">&#xe61d;</span>Log in with Facebook</button></div>
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
		z-index: 999;
		top: 0;
		left: 0;
		&.on {
			display: block;
		}
		&.off {
			display: none;
		}
		.boxshow {
			width: 398px;
			/*height: 4.4rem;*/
			background: $white;
			height: 300px;
			overflow: hidden;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -150px 0 0 -149px;
			box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
			.con {
				width: 350px;
				/*height: 2.493333rem;*/
				padding-top: 62px;
				font-size: $font32;
				margin: 0 auto;
				h3 {
					font-size: 24px;
					color: #030303;
					text-align: center;
					font-weight: 700;
				}
				p {
					color: #969696;
					font-size: 18px;
					margin-top: 26px;
					vertical-align: middle;
					text-align: center;
					white-space: normal;
				}
			}
			.btn {
				text-align: center;
				margin-top: 46px;
				button {
					span {
						margin-right: 20px;
					}
					height: 42px;
					font-size:18px;
					line-height: 42px;
					width: 318px;
					text-align: center;
					background:#44619d;
					color: #fff;
					border-radius: 21px;
					margin: 0 auto;
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
	}
</style>