<script>
	export default {
		name: "alertTitle",
		data() {
			return {
				alertTitleActive: "",
				
			}
		},
		methods: {
			
			cancle() {
				this.$emit('alert-title-call-back', true);
				this.alertTitleActive = false;
			},
			
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
			
		},
		props: ['alertTitleStatus']
	}
</script>
<template>
	<div id="alertTitle" v-bind:class="['alertTitleOuter',alertTitleActive ? 'on' : 'off']">
		<div class="fix"></div>
		<div v-bind:class="{'boxshow animated zoomIn' : alertTitleActive , 'boxshow animated zoomOut' : !alertTitleActive}">
			
			<div class="con">
				<h3>Language Competency Levels</h3>
				<div class="cancle" @click="cancle">Close</div>
				<p>These descriptions should reflect the level of competency of the working language of a guide.</p>
				<div class="item">
					<b>Basic</b>
					<p>-You understand simple phrases and can communicate only basic ideas. These basic ideas include: Greetings, yes, no, simple directions, telling the time. You can express yourself but only to a certain point. You are able to readand write with limited comprehension, and repeat yourself more than once.</p>
				</div>
				<div class="item">
					<b>Conversational</b>
					<p>-You are able to better express yourself and give clearer explanations and directions. You can read and understand most information and are able to read it back to the Traveler in a way that he or she can understand. You may have to repeat yourself more than once.</p>
				</div>
				<div class="item">
					<b>Advanced</b>
					<p>- You can write, read, and speak with very few errors. Communication is clear and you have excellent control over the language. You can translate fromyour language to the other quickly and you very rarely repeat yourself. You can express yourself and can talk about more abstract things; science, politics,
 philoophy, history, without any problems.</p>
				</div>
				<div class="item">
					<b>Fluent</b>
					<p>- You have native* control of the language. You articulate clearly and effectively, and you do not have to translate between your language and the other. You make few, if any, grammatical mistakes. Linguistic expression comes naturally and you have no problems working in that language.</p>
				</div>
				<p>* Native control means you speak as if you were a native speaker of that language; you have grown up with, been educated in, and spoken that language your entire life</p>
				<div class="cancle" @click="cancle">Close</div>
			</div>
			
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	@import "../../assets/scss/base/_animate.scss";
	.alertTitleOuter {
		.fix{
			position:fixed;
			width:100%;
			height:100%;
			background:rgba(0,0,0,0.5);
			top:0;
			left:0;
		}
		&.on {
			display: block;
		}
		&.off {
			display: none;
		}
		.boxshow {
			width: 686px;
			overflow: scroll;
			background: $white;
			overflow: hidden;
			position: absolute;
			top: 50px;
			left: 50%;
			margin: 0px 0 0 -343px;
			box-shadow:0px 2px 6px 0px rgba(53, 58, 63, 0.1);
			.con {
				padding: 40px;
				margin: 0 auto;
				h3 {
					font-size: 24px;
					color: #353a3f;
					text-align: center;
					font-weight: 700;
					margin-bottom: 31px;
					cursor: pointer;
				}
				.cancle{
					cursor: pointer;
					text-align: center;
					font-size: 18px;
					color: #1bbc9d;
				}
				p {
					color:#353a3f;
					font-size: 18px;
					margin-top: 32px;
					vertical-align: middle;
					white-space: normal;
					line-height: 30px;
				}
				.item{
					b{
						font-size: 18px;
					}
					margin-top: 35px;
					p{
						margin-top: 12px;
					}
					
				}
			}
			
		}
	}
</style>