<template>
	<div class="guideList">
		<HeaderCommon :logIn="logIn"></HeaderCommon>
		<div class="banner" :class="city(loc)">
			<div class="selectInfo">
				<div class="linkseting">
					<a href="/">Home</a>
					<em class="iconfont">&#xe64a;</em>
					<a href="javascript:" v-if="loc=='Shanghai'">Shanghai Activities</a>
					<a href="javascript:" v-if="loc=='Beijing'">Beijing Activities</a>
					<a href="javascript:" v-if="loc=='Chengdu'">Chengdu Activities</a>
					<a href="javascript:" v-if="loc=='Xian'">Xi'an Activities</a>
					<a href="javascript:" v-if="loc=='Guilin'">Guilin Activities</a>
				</div>
				<div class="position">
					<span v-if="loc=='Shanghai'">Shanghai</span>
					<span v-if="loc=='Beijing'">Beijing</span>
					<span v-if="loc=='Chengdu'">Chengdu</span>
					<span v-if="loc=='Xian'">Xi'an</span>
					<span v-if="loc=='Guilin'">Guilin</span>
					<el-select v-model="value">
						<a :href="item.url" v-for="item in options">
							<el-option  :key="item.value" :label="item.label" :value="item.value" >
						
							</el-option>
						</a>
					</el-select>
				</div>
				
			</div>
		</div>
		<div class="selectType" v-if="loc!='Chengdu'&&loc!='Xian'&&loc!='Guilin'">
			<ul class="clearfix">
				<li>
					
					<div class="bg">
						<div class="bgTitle">Activities</div>
						<p>Activities with the most authentic </p>
						<p>experiences, handpicked by our travel consultants</p>
					</div>
						
					
				</li>
				<li>
					<a :href="'/guide/list/'+loc">
						<div class="bg">
							<div class="bgTitle">Guides</div>
							<p>Professional tour guides with local </p>
							<p>knowledge and user-centered services</p>
						</div>
						
					</a>
				</li>
			</ul>
		</div>
		<div class="list-cont">
			<ul class="clearfix">
				<li class="activity-item" v-for="item in activityList">
					
						<a :href="'/activity/details/'+item.activityId" target="_blank">
							<div class="activity">
								
									<div class="activity-photo" v-lazy:background-image="item.coverPhotoUrl">
										
									</div>
								
							</div>
							<div class="activitDe">
								<div class="info">
									<div class="activeType">
										<div class="tourType"><i class="iconfont">&#xe653;</i>{{item.category}}</div>
										
									</div>
									<div class="titleText" style="-moz-box-orient: vertical;
							    -webkit-box-orient:vertical;">
										{{item.title}}
									</div>
									<div class="duration"><i class="iconfont">&#xe624;</i>Duration: {{item.duration}} {{item.durationUnit|firstUpperCase}}</div>
									<div class="totalPic">
										
										<div class="nowPic">From <b>${{returnFloat(item.bottomPrice)}}</b><span>  pp</span></div>
									</div>
								</div>
							
							</div>
						</a>
					
				</li>
			</ul>
			<div v-if="!isdisabled" class="more" @click="more()">View More</div>
			
		</div>
		<FooterCommon></FooterCommon>
		<Loading :loadingStatus="loadingStatus"></Loading>
		<Bottom  :scrollTop="600" :isListPage="isListPage"></Bottom>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { SelectId } from 'element-ui';
//import {getUrlParams}from '~/assets/js/plugin/utils'
	import HeaderCommon from '~/components/HeaderCommon/HeaderCommon';
	import FooterCommon from '~/components/FooterCommon/FooterCommon';
	import Loading from '~/components/Loading/Loading'
	import Bottom from '~/components/bottom/Bottom'

	export default {
		name: 'guideList',
		async asyncData ({ route, store, error, apiBasePath, redirect }) {
			let slug=route.params.slug;
			let data={
				options: [{
					value: 'Shanghai',
					label: 'Shanghai',
					url:'/activity/list/Shanghai'
				}, 
				{
					value: 'Beijing',
					label: 'Beijing',
					url:'/activity/list/Beijing'
				},
				{
					value: 'Chengdu',
					label: 'Chengdu',
					url:'/activity/list/Chengdu'
				},
				{
					value: "Xi'an",
					label: "Xi'an",
					url:'/activity/list/Xian'
				},
				{
					value: "Guilin",
					label: "Guilin",
					url:'/activity/list/Guilin'
				}
				],
				value:"",
				loc:slug,
				activityList:[],
				logIn:'',				
				pageSize:16,
				pageNum:1,
				loadingStatus:false,
				isdisabled:false,
				isListPage:true
				
			}
			let listdata={}
			let obj={
			 		destination:data.loc=="Xian"?"Xi\\'an":data.loc,
			 		pageNum:data.pageNum,
			 		pageSize:data.pageSize
			 	}
			try {
		        listdata = await Vue.axios.post(apiBasePath+"activity/list/",JSON.stringify(obj),{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
				})
		       	
		      } catch (err) {
		      	//return error(JSON.stringify(err));
		    }
		     
		      if(listdata.data.length>data.pageSize){
		      	 data.activityList=listdata.data
		      	data.activityList.pop()
		      }else{
		      	data.activityList=listdata.data
		      	data.isdisabled=true
		      }
		      
		      return data
		},
		
	/*	data() {
			return {
				options: [{
					value: 'Shanghai',
					label: 'Shanghai',
					url:'https://www.localpanda.com/activity/list/Shanghai'
				}, 
				{
					value: 'Beijing',
					label: 'Beijing',
					url:'https://www.localpanda.com/activity/list/Beijing'
				},
				{
					value: 'Chengdu',
					label: 'Chengdu',
					url:'https://www.localpanda.com/activity/list/Chengdu'
				},
				{
					value: "Xi'an",
					label: "Xi'an",
					url:'https://www.localpanda.com/activity/list/Xian'
				},
				{
					value: "Guilin",
					label: "Guilin",
					url:'https://www.localpanda.com/activity/list/Guilin'
				}
				],
				value:"",
				loc:'',
				activityList:[],
				logIn:'',				
				pageSize:16,
				pageNum:1,
				loadingStatus:false,
				isdisabled:false,
				isListPage:true
				
			}

		},*/
		
		components: {
			HeaderCommon,
			SelectId,
			FooterCommon,
			Loading,
			Bottom
		},
		methods: {
			returnFloat(value) {
				var value = Math.round(parseFloat(value) * 100) / 100;
				var xsd = value.toString().split(".");
				if(xsd.length == 1) {
					value = value.toString() + ".00";
					return value;
				}
				if(xsd.length > 1) {
					if(xsd[1].length < 2) {
						value = value.toString() + "0";
					}
					return value;
				}
			},
			city(loc){
				if(loc=='Shanghai')return 'shanghai'
				if(loc=='Beijing')return 'beijing'
				if(loc=='Chengdu')return 'chengdu'
				if(loc=='Xian')return 'xian'
				if(loc=='Guilin')return 'guilin'
			},
		
			 /*pageInit(){
			 	let that=this
			 	let obj={
			 		destination:that.loc=="Xian"?"Xi\\'an":that.loc,
			 		pageNum:that.pageNum,
			 		pageSize:that.pageSize
			 	}
			 	that.axios.post('https://www.localpanda.com/api/activity/list',JSON.stringify(obj),{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
				}).then(function(response){
					if(response.data.length>that.pageSize){
						that.activityList=response.data
						that.activityList.pop()
					}else{
						that.activityList=response.data
						that.isdisabled=true
					}
					
					
					
					
				},function(response){
					
				})
			 },*/
			 more(){
			 	let that=this
			 	that.pageNum++
			 	that.loadingStatus=true
			 	let obj={
			 		destination:that.loc=="Xian"?"Xi\\'an":that.loc,
			 		pageNum:that.pageNum,
			 		pageSize:that.pageSize
			 	}
			 	that.axios.post('http://13.59.63.205/api/activity/list',JSON.stringify(obj),{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
				}).then(function(response){
					if(response.data.length){
						that.loadingStatus=false
						if(response.data.length>that.pageSize){
							that.activityList=that.activityList.concat(response.data)
							that.activityList.pop()
							
						}else{
							that.activityList=that.activityList.concat(response.data)
							that.isdisabled=true
						}
						
					}
					
					
					
				},function(response){
					
				})
			 }
		},
		filters:{
			
			firstUpperCase(val) {
				if(val)
		  		return val.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
			}
		},
		created:function(){
			const that=this
			that.value=that.loc=="Xian"?"Xi'an":that.loc
        	 
      
		},
		mounted: function() {
			const that=this
 			 //that.pageInit()
 			 
 			 that.logIn=localStorage.getItem("logstate")
			
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	.el-input__inner {
		width: 168px!important;
		height: 40px;
		font-size: 18px!important;
		border-radius: 20px!important;
		border-color: none;
		padding-left: 20px!important;
		border:none!important;

	}
	.el-popper[x-placement^=bottom]{
		margin-top: 2px!important;
	}
	.el-popper .popper__arrow, .el-popper .popper__arrow::after{
		border-style: none!important;
	}
	.el-select-dropdown {
		text-align: center;
		border-radius: 20px!important;
		border:none!important;
	}
	
	.el-select-dropdown__item.selected {
		color: #1bbc9d!important;
		font-weight: normal!important;
	}

	.el-select-dropdown__item {
		font-size: 18px!important;
		text-align: left!important;
		&.hover {
			background-color: #fff!important;
			border-radius: 20px;
		}
		&:hover {
			background-color: #fff!important;
			border-radius: 20px;
			color: #1bbc9d;
		}
	}
	.el-icon-arrow-up{
			&:before{
				content: "\e60c"!important;
				color:#353a3f;
			}
		}
	.el-select .el-input.is-focus .el-input__inner {
		border-color: #b4bccc!important;
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.guideList {
		overflow-x:hidden;
		width:100%;
		.banner {
			&.beijing{
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Beijing.jpg") no-repeat;
				background-size:cover;
				
			}
			&.shanghai{
				background:url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Shanghai.jpg") no-repeat;
				background-size:cover;
			}
			&.chengdu{
				background:url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Chengdu.jpg") no-repeat;
				background-size:cover;
			}
			&.xian{
				background:url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Xian.jpg") no-repeat;
				background-size:cover;
			}
			&.guilin{
				background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Guilin.jpg") no-repeat;
				background-size:cover;
				
			}
			height: 260px;
			
			.selectInfo {
				width: 1284px;
				margin: 0 auto;
				position: relative;
				height: 260px;
				.linkseting{
					padding-top:19px;
					a{
						font-size: 14px;
						color: #fff;
						&:hover{
							text-decoration: underline;
						}
						&:last-child{
							&:hover{
								text-decoration: none;
								cursor:auto;
							}
						}
					}
					em{
						color: #fff;
						font-size: 12px;
						
					}
				}
				.position{
					position: absolute;
					top:107px;
					span{
						margin-right: 30px;
						font-size: 38px;
						font-weight: bold;
						color: #fff;
						display: inline-block;
						vertical-align: bottom;
					}
					.el-select {
						
						.el-icon-arrow-up:before {
							content: "\e60f"!important
						}
					}
				}
				
			}
		}
		.selectType{
			width: 1284px;
			margin: 20px auto 10px;
			ul{
				li{
					width: 632px;
					height: 130px;
					background: #0074D9;
					float: left;
					background-size:cover; 
					&:first-child{
						margin-right: 20px;
						background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Activities.jpg") no-repeat;
					}
					&:last-child{
						background: url("https://d2q486kjf9cwwu.cloudfront.net/static/headerPhotos/Guides.jpg") no-repeat;
					}
					.bg{
						width: 604px;
						height: 74px;
						padding: 28px 0 28px 28px;
						color: #fff;
						.bgTitle{
							font-size: 24px;
							font-weight: bold;	
							margin-bottom: 13px;
						}
						p{
							font-size: 16px;
						}
					}
					
					
				}
			}
		}
		.list-cont {
			background: #fff;
			margin: 0 auto 80px;
			width: 1284px;		
			.activity-item {
				&:hover {
					transform: translateY(-10px);
					box-shadow: 0px 10px 20px 0px rgba(53, 58, 63, 0.1);
				}
				transition: .3s transform;	
				float:left;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				overflow:hidden;
				background: #fff;
				margin-right:20px;
				&:nth-child(4n+0) {
					margin-right: 0;
				}
				width:306px;
				margin-top: 30px;
				.activity {
					.activity-photo {
						width: 306px;
						height: 153px;
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
						height: 40px;
						line-height: 40px;
						.tourType{
							
							color:#d87b65;
							font-size: 14px;
							i{
								font-size: 12px;
								margin-right: 8px;
							}
						}
						
						
					}
					.titleText{
						width: 100%;
						
						height: 42px;
						 text-overflow: ellipsis;
				    display: -webkit-box;
				    display: -moz-box;
				    -moz-box-orient: vertical;
				    -webkit-box-orient:vertical;
				    
				    -webkit-line-clamp: 2;
				     -moz-line-clamp:2;
				     -o-text-overflow: ellipsis;
				    word-wrap: break-word;
						
					font-size: 18px;
					font-weight: bold;
					text-align: left;
					overflow: hidden;
						
						
					}
					.duration{
							margin-top: 17px;
							font-size:14px;
							color: #878e95;
							i{
								font-size: 12px;
								margin-right: 8px;
							}
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
			}
			.more{
				width: 232px;
				height: 42px;
				background-image: linear-gradient(270deg,#009efd 0%,#1bbc9d 100%);
				border-radius: 20px;
				text-align: center;
				line-height: 42px;
				color: #fff;
				font-size: 16px;
				font-weight: bold;
				margin: 48px auto 0;
				cursor: pointer;
			}
		}
	}
</style>