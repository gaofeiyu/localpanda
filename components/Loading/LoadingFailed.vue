<script>
	export default {
		name: "loadingFailed",
		//data:function(){}，下面是es6写法
		data() {
			return {
			}
		},
		methods: {

		},
		props:['loadingFailedStatus']
	}
</script>
<template>
	<!--//加载动画-->
	<div  v-bind:class="['loaders loadingFailed',loadingFailedStatus ? 'on' : 'off']">
		<div class="loader">
			<i class="iconfont">&#xe61c;</i>
			<!--<p class="loading-message">{{loadingFailed}}</p>-->
			<slot name="loadingFailed"></slot>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	@import '../../assets/font/iconfont.scss';
	.on{
		display: block;
	}
	.off{
		display: none;
	}
	.loaders {
		.loader {
			display:block;
			position:absolute;
			width: 3.2rem;
			height: 3.2rem;
			background: rgba(0,0,0,0.7);
			border-radius: $radius10;
			top:50%;
			left:50%;
			margin:-1.6rem auto 0 -1.6rem;
			i{
				color: $white;
				font-size:1.306666rem;
				margin: 0.8rem auto 0;
				display: block;
				text-align:center;
			}
			.loading-message{
				text-align: center;
				font-size: $font26;
				color: $white;
				position: absolute;
				bottom: 0.533333rem;
				width: 100%;
			}
		}
		/*position: fixed;
		top:0;*/
		width:100%;
		height:100%;
		z-index:999;
	}
</style>