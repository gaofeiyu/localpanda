<template>
	<div id="menu">
			<div class="menu_list">
				<ul class="clearfix">
					<li @click="goAnchor('journey')">What to Expect</li>
					<li @click="goAnchor('provide')">What's Included</li>
					<li @click="goAnchor('notes')">Notes</li>
					<li @click="goAnchor('recommend')">Similar Experiences</li>
				</ul>
			</div>
		</div>
</template>

<script>
		export default {
		
		name: "menuType",
		data() {
			return {
			}

		},
		components: {
			
		},
		methods: {
			goAnchor(selector) {
				
				var anchor = document.getElementById(selector)
				console.log()
				document.body.scrollTop = anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
				document.documentElement.scrollTop =anchor.offsetTop+document.getElementById("banner").offsetHeight+60-76
			},
		},
		
	}	
</script>

<style lang="scss">
	#menu {
			position: relative;
			.menu_list {
				animation: fadein 0.3s ease-in-out forwards;
				transform: translateY(-100%);
				background: #fff!important;
				width: 100%;
				height: 76px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				position: fixed;
				top: 0;
				z-index: 99999;
				ul {
					width: 1170px;
					position: fixed;
					left: 0;
					right: 0;
					top: 0;
					z-index: 99999;
					margin: 0 auto;
					li {
						float: left;
						line-height: 76px;
						font-size: 16px;
						margin-right: 36px;
						cursor: pointer;
						position:relative;
						&:hover{
							color: #1bbc9d;
							&:after{
								content: "";
								position: absolute;
								width: 100%;
								height: 3px;
								background:#1bbc9d;
								bottom:0;
								left: 0;
							}
						}
					}
				}
				@keyframes fadein{
					0%{
						transform: translateY(-100%);
					}
					100%{
						transform: translateY(0);
					}
				}
			}
		}
</style>