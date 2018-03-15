<template>
	<div id="confirm" v-show="ConfirmAlert.status" class="confirm">
		<div class="fixed"></div>
		<div class="box" v-bind:class="{'box animated zoomIn':ConfirmAlert.status , 'box animated zoomOut':!ConfirmAlert.status}">
			<div class="con">
				<span>{{ConfirmAlert.title}}</span>
				<p>{{ConfirmAlert.info}}</p>
			</div>
			<div class="group-btn">
				<a class="cancel" v-on:click="cancel">{{cancelText}}</a>
				<a class="commit" v-on:click="commit">{{commitText}}</a>
			</div>
		</div>
	</div>
</template>
<script>
	/*
	 * ConfirmAlert 
	 * 名称：弹窗组件
	 * 父组件传传入子组件的是一个 "ConfirmAlert"对象
	 * 
	 *  {
	 * 	 	title:"此处是弹窗的标题"
	 * 	 	info:"此处是弹窗的正文信息"
	 * 	 	status:"此处是弹窗是否显示的状态,true为显示，反正隐藏"
	 * 		yes:"此处为确认按钮中的文本"
	 * 		no:"此处为取消按钮中的文本"
	 *  }
	 * 
	 * 子组件通过childConfirmStatus函数返回给父组件的是一个布尔值
	 */
	export default {
		name: "confirmAlert",
		props: ['ConfirmAlert'],
		data() {
			return {
				commitText:"确认",
				cancelText:"取消",
			}
		},
		methods: {
			cancel() {
				this.$emit("childConfirmStatus", false);
			},
			commit() {
				this.$emit("childConfirmStatus", true);
			}
		},
		mounted:function(){
			let no =this.ConfirmAlert.no;
			let yes =this.ConfirmAlert.yes;
			
			no==undefined||no==""?"":this.cancelText=no;
			yes==undefined||yes==""?"":this.commitText=yes;
		},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	@import "../../assets/scss/base/_animate.scss";
	.confirm {
		.fixed {
			background: rgba(0, 0, 0, 0.5);
			height: 100%;
			width: 100%;
			position: fixed;
			z-index: 999;
			top: 0;
			left: 0;
		}
		.box {
			width: 360px;
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
				span {
					color: #000;
					font-size: $font18;
					display: inline-block;
					padding: 10px 0 20px;
				}
				p {
					color: #000;
					font-size: $font14;
					line-height: 22px;
				}
			}
			.group-btn {
				width: 86%;
				margin: 0 auto;
				.cancel {
					width: 110px;
					height: 40px;
					line-height: 40px;
					color: #fff;
					background: #658292;
					font-size: 14px;
					display: inline-block;
					text-align: center;
					float: left;
					border-radius: 4px;
					cursor: pointer;
					&:active {
						background: $promptBtn;
					}
				}
				.commit {
					@extend .cancel;
					background: #2697D5;
					float: right;
					cursor: pointer;
				}
			}
		}
	}
</style>