<template>
	<div id="alertTitle" class="alertTitle" v-if="isShowAlert">
		<div class="fixed"></div>
		<div v-bind:class="{'box animated zoomIn' : isShowAlert , 'box animated zoomOut' : !isShowAlert}">
			<div class="con">
				<span :class="{magin:isShowAlert}">{{alertTitle}}</span>
				<p>{{alertMessage}}</p>
			</div>
			<div class="btn" v-on:click="conmmitFn">Confirm</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "alertTitle",
		props: ['isShowAlert','alertTitle','alertMessage'],
		data() {
			return {
				isShowTitle:true,  //是否有标题

			}
		},
		methods: {
			conmmitFn() {
				// this.isShowAlertTitle = !this.isShowAlertTitle;
			
				this.$emit("setIsShowAlert",!this.isShowAlert)
			},
			
		},
		watch: {
			alertTitle: function(val,oldVal){ //监听是否有标题
				if(val == ""){ 
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
					.margin{
						margin-bottom:24px;
					}
				}
				p{
					color: #353a3f;
					font-size: 18px;
					vertical-align: middle;
					text-align: center;
					word-wrap:break-word;

				}
			}
			.btn{
				width: 318px;
				height: 42px;
				border-radius: 20px;
				background-image: linear-gradient(45deg,#1bbc9d 0%,#009efd 100%);
				margin: 46px auto 0;
				text-align: center;
				line-height: 30px;
				color: #fff;
				line-height: 42px;
				font-size:18px; 
				&:hover{
					cursor: pointer;
				}
			}
		}
	}
	
</style>