<script>
	export default {
		name: "bubble",
		data() {
			return {
				time: 1000,
				status: false,
			}
		},
		methods: {},
		mounted: function() {},
		watch: {
			'BubbleAlert.status': function(flag) {
				let that = this;
				
				if(flag) {
					that.status = true;
					setTimeout(function() {
						that.status = false;
						that.$emit("setBubbleAlert", true);
					}, that.time);
				}
			},
		},
		props: ['BubbleAlert']
	}
</script>
<template>
	<div id="bubble">
		<div class="box" :class="{isShow:status}">
			<p>{{BubbleAlert.info}}</p>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	.box {
		display: none;
		position: fixed;
		background: rgba(0, 0, 0, 0.7);
		border-radius: $radius10;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		p {
			padding: 15px 30px;
			text-align: center;
			color: $white;
			font-size: 24px;
		}
		&.isShow {
			display: block;
		}
	}
</style>