<template>
	<div id="alertTitle" class="alertTitle" v-if="isShowAlertTitle">
		<div class="fixed"></div>
		<div v-bind:class="{'box animated zoomIn' : isShowAlertTitle , 'box animated zoomOut' : !isShowAlertTitle}">
			<div class="false" @click="cancle"><i class="iconfont">&#xe629;</i></div>
			<div class="con">

				<span v-show="isShowTitle">{{alertTitle}}</span>
				<p>{{alertMessage}}</p>
			</div>
			<div class="selectBtn clearfix">
				<div class="btn" v-on:click="conmmitFn">Yes, I will leave </div>
				<div class="btn margin" v-on:click="cancle">No, I will stay</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default {
		name: "alertTitle",
		props: ['isShowAlertTitle','alertTitle','alertMessage'],
		data() {
			return {
				isShowTitle:true,  //是否有标题

			}
		},
		methods: {
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
			conmmitFn() {
				// this.isShowAlertTitle = !this.isShowAlertTitle;
				this.$emit("setIsShowAlertFn",!this.isShowAlertTitle)
				localStorage.removeItem("infor")
				window.history.back(); 
			},
			cancle(){
				this.$emit("setIsShowAlertFn",!this.isShowAlertTitle)
				this.goBackFn()
			}
		},
		watch: {
			alertTitle: function(val,oldVal){ //监听是否有标题
				if(this.alertTitle == ""){  
					this.isShowTitle = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	@import "../../assets/scss/base/_animate.scss";
	.alertTitle {
		.fixed{
			width: 100%;
			height: 100%;
			position: fixed;
			top:0;
			left:0;
			background: #000;
			opacity: 0.7;
			z-index: 1000;
		}
		.box{
			width: 398px;
			height: 300px;
			background: #fff;
			box-shadow: 0px 0px 1px #ccc;
			position: fixed;
			margin: auto;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 1100;
			.con{
				width:300px;
				margin: 0 auto;
				padding-top: 62px;
				span{
			
					font-size: 24px;;
					color: #353a3f;
					font-weight: bold;
					display: block;
					text-align: center;
				}
				p{
					color: #353a3f;
					font-size: 18px;
					margin-top: 26px;
					vertical-align: middle;
					text-align: center;
					word-wrap:break-word;
					margin-top: 26px;

				}
			}
			.selectBtn{
				height: 42px;
				margin: 46px auto 0;
				width: 86%;
				.btn{
					float: left;
					width: 45%;
					
					text-align: center;
					line-height: 30px;
					color: #fff;
					line-height: 42px;
					border-radius: 20px;
					background-image: linear-gradient(45deg,#1bbc9d 0%,#009efd 100%);
					font-size:14px; 
					&:hover{
						cursor: pointer;
					}
					
				}
				.margin{
						margin-left: 20px;
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
				line-height: 22px;
				text-align: center;
			}
		}
	}
	
</style>