<template>
	<div id="Activities">
		<div class="titleTag">
			<h3>Top Activities</h3>
			<p>These tours are so hot right now</p>
		</div>
	<!--	<div class="activitie-list">
			<ul>
				<li v-for="item in activeList">
					<a :href="item.id?'https://www.localpanda.com/activity/detail/'+item.id:'#'">
						<div class="listCont">
							<img class="log" :src="item.guidePhotoUrl">
							<div class="img">
								<img class="coverPhotoUrl" :src="item.coverPhotoUrl" />
								
								<div class="maskerInfo">
									<div class="maskerInfop">
										<div>
											<h3>Activity Intensity</h3>
											<span v-for="i in item.intensity"></span>
										</div>
										<div>
											<h3>Activity Difficulty</h3>
											<span v-for="i in item.difficulty"></span>
										</div>
										<div>
											<h3>Activity Time</h3>
											<p>{{item.duration}} hours total</p>
										</div>
									</div>
	
								</div>
							</div>
							
							
						</div>
						<div class="listInfo">
							<div class="local-guide">{{item.tourTypes}}</div>
							<p class="slogan">{{item.title}}</p>
							<p>From<span>${{item.price}}</span></p>
						</div>

					</a>
				</li>

			</ul>
		</div>-->
		<div class="topSearchList clearfix">
					<div class="topSearchList-item" v-for="item in activeList">
						<a :href="'/activity/details/'+item.activityId">
							
							<div class="activity">
								
									<div class="activity-photo" v-lazy:background-image="item.coverPhotoUrl">
										
									</div>
								
							</div>
							<div class="activitDe">
								<div class="info">
									<div class="activeType clearfix">
										<div class="tourType"><i class="iconfont">&#xe653;</i>{{item.category}}</div>
										<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
									</div>
									<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
										{{item.title}}
									</div>
									<div class="totalPic">
										
										<div class="nowPic">From <b>${{item.bottomPrice}}</b><span>  pp</span></div>
									</div>
								</div>
							
							</div>
								<div class="highlights">
									<b><span>Highlights</span></b>
									<ul v-if="item.highlights">
										<li v-for="i in delNullArr(item.highlights.split('\n'))">{{i}}</li>
									</ul>
								</div>
						</a>
					</div>
				</div>

	</div>

</template>

<script>
	
	export default {
		props:["activeList","isDeviceType"],
		name: "Activities",
		data() {
			return {
				activities: [],
				
			}
		},
		components: {},
		mounted() {
			
		},
		methods: {
				delNullArr(array) {
				for(var i = 0; i < array.length; i++) {
					if(array[i] == "" || typeof(array[i]) == "undefined") {
						array.splice(i, 1);
						i = i - 1;

					}

				}
				return array;
			},
		},
		filters:{
			
			firstUpperCase(val) {
				if(val)
		  		return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
	}
</script>

<style lang="scss">
	@import "~assets/scss/base/_setting.scss";
	
	#Activities {
		width: 1170px;
		margin: 60px auto 0;
		.topSearchList {
					
					margin-top:19px;
					.topSearchList-item {
						position:relative;
						float:left;
						box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
						overflow:hidden;
						background: #fff;
						margin-right:20px;
						&:nth-child(3n+0) {
							margin-right: 0;
						}
						width:376px;
						margin-top: 20px;
						.title {
						    height: 72px;
						    width: 330px;
						    overflow: hidden;
						    border-left: 4px solid  #1bbc9d;
						    text-overflow: ellipsis;
						    display: -webkit-box;
						    display: -moz-box;
						    -moz-box-orient: vertical;
						    -webkit-box-orient:vertical;
						    
						    -webkit-line-clamp: 3;
						     -moz-line-clamp:3;
						     -o-text-overflow: ellipsis;
						    word-wrap: break-word;
							margin: 30px 20px 20px;
							font-size: 20px;
							font-weight: bold;
							position: relative;
							padding-left: 14px;
							line-height: 24px;
							
							
						}
						.activity {
							.activity-photo {
								width: 376px;
								height: 188px;
								background-repeat: no-repeat!important;
								background-size:cover!important;
								position: relative;
								.type{
									position: absolute;
									top: 10px;
									left: 10px;
									padding: 5px;
									font-size: 14px;
									font-weight: bold;
									background: #f4b33f;
									color: #fff;
								}
							}
						}
						.activitDe{
							padding:0 20px 20px;
							.activeType{
								height: 48px;
								line-height: 48px;
								.tourType{
									float: left;
									color:#d87b65;
									font-size: 14px;
									i{
										font-size: 12px;
										margin-right: 8px;
									}
								}
								.duration{
									float: right;
									font-size:14px;
									color: #878e95;
									i{
										font-size: 12px;
										margin-right: 8px;
									}
								}
								
							}
							.titleText{
								width: 100%;
								height:50px;
								 text-overflow: ellipsis;
						    display: -webkit-box;
						    display: -moz-box;
						    -moz-box-orient: vertical;
						    -webkit-box-orient:vertical;
						    
						    -webkit-line-clamp: 2;
						     -moz-line-clamp:2;
						     -o-text-overflow: ellipsis;
						    word-wrap: break-word;
								
							font-size: 20px;
							font-weight: bold;
							text-align: left;
							overflow: hidden;
								
								
							}
							.totalPic{
								padding-top: 20px;
								.oldpic{
									text-align: right;
									font-size: 14px;
									color: #878e95;
									text-decoration: line-through;
								}
								.nowPic{
									text-align: right;
									font-size: 14px;
									color:#878e95;
									b{
										color: #353a3f;
										font-size: 20px;
									}
									span{
										color: #353a3f;
									}
								}
							}
							
						}
						&:hover .highlights{
							-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								transform: translateY(0);
						}
						.highlights {
							position: absolute;
							top: 0;
							transform: translateY(200%);
							-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							transition: all .5s cubic-bezier(0, 1, 0.5, 1);
							background-image: linear-gradient(135deg, #009efd 0%, #1bbc9d 100%);
							width: 100%;
							height:100%;
							b{
								color: #fff;
								font-size: 20px;
								
								margin-top: 20px;
								display: block;
								text-align:center; 
								span{
									position: relative;
									&:after{
										content: "";
								         height: 2px;
								         width: 100%;
								         background: #fff;
								         left: 50%;
								         margin-left: -50%;
								         bottom: -20px;
								         display: block;
								         position: absolute;
								         
									}
								}
								
							};
									ul {
										
										padding: 50px 20px 0;
										height: 250px;
										li {
											color: #fff;
											font-size: 16px;
											position: relative;
											padding-left: 16px;
											margin-top: 12px;
											line-height: 22px;
											&:first-child {
												margin-top: 0;
											}
											&:after {
												position: absolute;
												content: "";
												width: 4px;
												height: 4px;
												border-radius: 50%;
												background: #fff;
												left: 0;
												top: 8px;
											}
										}
									}
							}	
								
							
						
					}
				}
		/*.activitie-list {
			ul {
				overflow: auto;
				li {
					float: left;
					width: 370px;
					position: relative;
					margin: 30px 30px 0 0;
					&:last-child {
						margin-right: 0;
					}
					&:nth-child(3) {
						margin-right: 0;
					}
					a {
						display: block;
						.listCont {
							width: inherit;
							height: 246px;
							position: relative;
							.log {
								position: absolute;
								bottom: -22px;
								right: 18px;
								width: 44px;
								height: 44px;
								border-radius: 50%;
								z-index: 10;
								border:2px solid #fff;
							}
							.img{
								height:246px;
								position: relative;
								overflow: hidden;
								.coverPhotoUrl{
									width: 100%;
								    height: 100%;
								    objec-fit: cover;
								}
							}
							&:hover .maskerInfo{
								-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								transform: translateY(0);
							}
							.maskerInfo {
								position: absolute;
								width: 100%;
								height: 100%;
								top: 0;
								transform: translateY(200%);
								-webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								transition: all .5s cubic-bezier(0, 1, 0.5, 1);
								background-image: linear-gradient(135deg, #009efd 0%, #1bbc9d 100%);
								.maskerInfop {
									text-align: center;
									margin: 40px 0;
									div {
										margin-top: 18px;
										color: #fff;
										&:first-child {
											margin-top: 0;
										}
										h3{
											font-size: 16px;
											font-weight: bold;
											
										}
										span{
											display: inline-block;
											width: 14px;
											height: 14px;
											background: #fff;
											border-radius: 50%;
											margin-left: 10px;
											margin-top:7px; 
											&:first-child{
												margin-left: 0;
											}
										}
										p{
											font-size: 16px;
										}
									}
									
								}
							}
						}
						.listInfo {
							
							margin-top: 15px;
							.local-guide {
								font-size: 14px;
								color:#d87b65;
							}
							P {
								margin-top: 6px;
								font-size: 16px;
								color: #353a3f;
								span {
									font-size: 20px!important;
									margin-left: 8px;
								}
								&.slogan {
									font-size: 20px;
									font-weight: bold;
								}
							}
						}
					}
				}
			}
		}*/
		.allActivities {
			text-align: center;
			margin-bottom: 100px;
			button {
				margin: 56px auto 0;
				width: 134px;
				height: 42px;
				border-radius: 21px;
				background-image: linear-gradient(270deg, #009efd 0%, #1bbc9d 100%), linear-gradient(#1bbc9d, #1bbc9d);
				color: #fff;
				font-size: 12px;
			}
		}
	}
</style>