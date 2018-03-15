<script>
	export default {
		name: "confirmTitle",
		//data:function(){}，下面是es6写法
		data() {
			return {
				confirmTitleActive: false
			}
		},
		methods: {
			cancel() {
				console.log(1111)
				this.$emit('confirmTitle-call-back', false);
				this.confirmTitleActive = false;
			},
			ok() {
				console.log(2222)
				this.$emit('confirmTitle-call-back', true);
				this.confirmTitleActive = false;
				
			}
		},
		watch: {
			confirmTitleStatus: function(val, oldVal) {
				console.log("val",val)
				if(val) {
					this.confirmTitleActive = true;
				} else {
					this.confirmTitleActive = false;
				}
			}
		},
		props: ['confirmTitleStatus']
	}
</script>
<template>
	<div class="confirmTitleOuter" id="confirmTitle" v-bind:class="['confirmTitleOuter',confirmTitleActive ? 'on' : 'off']">
		<div class="box" v-bind:class="{'box animated zoomIn' : confirmTitleActive , 'box animated zoomOut' : !confirmTitleActive}">
			<div class="con">
			<!--父级组件调用方式 -->
			<!--<ConfirmTitle v-bind:confirmTitleStatus="confirmTitleStatus" v-on:confirmTitle-call-back="confirmTitleCallBack">
				<p slot="confirmTitleMessage"><b>绑定微信</b>您的上海房产帐号已经被其他微信绑定，点击“是”则将此帐号重新绑定在此微信上。</p>
			</ConfirmTitle>-->
				<slot name='confirmTitleMessage'></slot>
			</div>
			<div class="group-btn">
				<a @click="cancel">否</a>
				<a @click="ok">是</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	.confirmTitleOuter {
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
		.box {
			width: 7.466666rem;
			height: 5rem;
			background: $white;
			border-radius: $radius8;
			overflow: hidden;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -2.5rem 0 0 -3.733333rem;
			.con {
				width: 6.08rem;
				height: 3.666666rem;
				margin: 0 auto;
				text-align: center;
				display: table;
				p {
					color: $black;
					font-size: $font30;
					line-height: 0.56rem;
					color: #888;
					vertical-align: middle;
					display: table-cell;
					text-align: left;
					b {
						color: #000;
						font-size: $font36;
						font-weight: normal;
						text-align: center;
						display: block;
						padding: 0.266666rem 0 0.24rem 0;
					}
					em {
						color: $orange;
					}
				}
			}
			.group-btn {
				position: relative;
				&:before {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 1px;
					content: '';
					-webkit-transform: scaleY(.5);
					transform: scaleY(.5);
					background: $border;
					display: block;
				}
				a {
					width: 50%;
					height: 1.333333rem;
					line-height: 1.333333rem;
					color: $gray;
					font-size: $font36;
					display: inline-block;
					text-align: center;
					float: left;
					&:active {
						background: $promptBtn;
					}
					&:last-child {
						position: relative;
						color: $orange;
						&:before {
							position: absolute;
							top: 0;
							left: 0;
							width: 1px;
							height: 100%;
							content: '';
							-webkit-transform: scaleX(.5);
							transform: scaleX(.5);
							background: $border;
							display: block;
						}
					}
				}
			}
		}
	}
</style>