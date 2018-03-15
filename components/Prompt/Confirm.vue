<template>
	<div id="confirm" v-show="isShowConfrim" class="confirm">
		<div class="fixed"></div>
		<div class="box" v-bind:class="{'box animated zoomIn':isShowConfrim , 'box animated zoomOut':!isShowConfrim}">
			<div class="con">
			     <span>{{confirmTitle}}</span>
			     <p>{{alertMessage}}</p>
				
			</div>
			<div class="group-btn">
				<a class="cancel" v-on:click="cancel">取消</a>
				<a class="commit" v-on:click="commit">确认</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "confirm",
		props: ['alertMessage','isShowConfrim','confirmTitle'],   //alertMessage 消息文字    ／／isShowConfrim 弹框是否显示状态  ／／confirmTitle 标题文字
		data() {
			return {
				
			}
		},
		methods: {
			cancel() {
				this.$emit("setIsShowConfirmFn",!this.isShowConfrim)
			},
			commit() {
				this.$emit("setIsShowConfirmFncall",!this.isShowConfrim)
			}
		},
		watch: {
			// confirmStatus: function(val, oldVal) {
			// 	if(val) {
			// 		console.log(val);
			// 		this.confirmActive = true;
			// 	} else {
			// 		this.confirmActive = false;
			// 	}
			// }
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	@import "../../assets/scss/base/_animate.scss";
	.confirm {
		.fixed{
			background: rgba(0, 0, 0, 0.5);
			height: 100%;
			width: 100%;
			position: fixed;
			z-index: 999;
			top: 0;
			left: 0;
		}
		.box {
			width:360px;
			height: 218px;
			background: $white;
			position: fixed;
			border-radius: 4px;
			box-shadow: 0px 0px 1px #ccc;
			margin: auto;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 1000;
			.con {
				width: 89%;
				height: 130px;
				margin: 0 auto;
				padding-top: 20px;
				margin: 0 auto;
				text-align: center;
				span{
					color: #000;
					font-size: $font18;
					display: inline-block;
					padding:10px 0;
				}
				p{
					color: #000;
					font-size: $font14;
					line-height: 22px;
				}
				
			}
			.group-btn {
				width: 86%;
				margin: 0 auto;
				.cancel{
					width: 110px;
					height: 40px;
					line-height: 40px;
					color: #fff;
					background: #658292;
					font-size:14px;
					display: inline-block;
					text-align: center;
					float: left;
					border-radius: 4px;
					&:active {
						background: $promptBtn;
					}
				}
				.commit{
					@extend .cancel;
					background: #2697D5;
					float: right;

				}
			}
		}
	}
</style>