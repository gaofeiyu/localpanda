<template>
	<div id="packageOptions">

		<div class="PackageOptionsDetail clearfix">
			<h3>Booking Options</h3>
			<p class="text">Booking here gives you access to any of this guide’s tours. We will follow up to confirm which tour/s you are interested in. Please pay attention to whether the tour requires a car.</p>
			<ul>
				<li v-if="picmsg.vehicleAvailable==1">
					<div class="iconfont font-type">&#xe616;</div>
					<!--带车全天 -->
					<div class="typeItem">
						<div class="typeItem-l">
							<div class="typeItem-row">
								<h3>Tour guide with a car</h3>
								<p v-if="!allcarpic&&!halfcarpic"><span>Full day({{picmsg.hoursPerDay}}hours) price: ${{picmsg.vehicleFullDayPrice}}</span><span v-if="picmsg.halfDayAvailable==1">Half day(4hours) price: ${{picmsg.vehicleHalfDayPrice}}</span></p>
								<p v-else><span>Full day({{picmsg.hoursPerDay}}hours) price:<label class="green"> ${{allcarpic}}</label></span><span v-if="picmsg.halfDayAvailable==1">Half day(4hours) price: <label class="green">${{halfcarpic}}</label></span></p>
							</div>
							<div class="paybtn">
								<b><span>From</span> ${{picmsg.vehicleFullDayPrice}}</b>
								<button v-if="seletId2==0" @click="seletall(1),gaSendvehicle()">SELECT</button>
								<button class="bac" v-if="seletId2==1" @click="seletall(0)">SELECTED</button>
							</div>
						</div>
						<div class="choose" v-if="seletId2==1">
							<div class="hint">
								<b><span class="iconfont">&#xe654;</span>No hidden booking or credit card fees</b>
								<b><span class="iconfont">&#xe654;</span>Free Cancellation - Up to 5 days before</b>
							</div>
							<div class="Guests">
								<h3>Guests</h3>
								<div class="slectPeople">
									<i class="iconfont">&#xe63d;</i>
									<el-select v-model="valueCarall" placeholder="Please Select" @change="changeselet">
										<el-option v-for="item in carTourPic" :key="item.people" :label="item.people" :value="item.people"></el-option>
										<div class="TourGuidePicE">{{picmsg.maxVehicleParticipants}} guests maximum. Infants don’t count toward the number of guests.</div>
									</el-select>
								</div>

							</div>
							<div class="payfortime">
								<h3>Select date（full day）</h3>
								<div class="date">
									<i class="iconfont font-blue" v-if="!startTimeAllCar.time">&#xe60d;</i>
									<i class="iconfont cancelDate" v-else @click.stop="dateClear(startTimeAllCar.time)">&#xe647;</i>
									<flatPickr placeholder="Select Date" v-model="startTimeAllCar.time" :config="allcaroptions"></flatPickr>
								</div>

							</div>
							<div class="payfortime" v-if="picmsg.halfDayAvailable==1">
								<h3>Select date（half day）</h3>
								<div class="date">
									<i class="iconfont font-blue" v-if="!startTimeHalfCar.time">&#xe60d;</i>
									<i class="iconfont cancelDate" v-else @click.stop="dateClear(startTimeHalfCar.time)">&#xe647;</i>
									<flatPickr placeholder="Select Date" v-model="startTimeHalfCar.time" :config="halfcaroptions"></flatPickr>
								</div>
							</div>
						</div>
					</div>
				</li>

				<li v-if="picmsg.hikingAvailable==1">
					<div class="iconfont font-type font-typeb">&#xe607;</div>
					<!--徒步全天 -->
					<div class="typeItem">
						<div class="typeItem-l">
							<div class="typeItem-row">
								<h3>Tour guide</h3>
								<p v-if="!allTourpic&&!halfTourpic"><span>Full day({{picmsg.hoursPerDay}}hours) price: ${{picmsg.hikingFullDayPrice}}</span><span v-if="picmsg.halfDayAvailable==1">Half day(4hours) price: ${{picmsg.hikingHalfDayPrice}}</span></p>
								<p v-else><span>Full day({{picmsg.hoursPerDay}}hours) price: <label class="green">${{allTourpic}}</label></span><span v-if="picmsg.halfDayAvailable==1">Half day(4hours) price: <label class="green">${{halfTourpic}}</label></span></p>
							</div>
							<div class="paybtn">
								<b><span>From</span> ${{picmsg.hikingFullDayPrice}}</b>
								<button v-if="seletId==0" @click="selet(1),gaSendtour()">SELECT</button>
								<button class="bac" v-if="seletId==1" @click="selet(0)">SELECTED</button>
							</div>
						</div>
						<div class="choose" v-if="seletId==1">
							<div class="hint">
								<b><span class="iconfont">&#xe654;</span>No hidden booking or credit card fees</b>
								<b><span class="iconfont">&#xe654;</span>Free Cancellation - Up to 5 days before</b>
							</div>
							<div class="Guests">
								<h3>Guests</h3>
								<div class="slectPeople">
									<i class="iconfont">&#xe63d;</i>
									<el-select v-model="value" placeholder="Please Select" @change="changeTour">
										<el-option v-for="item in allTourPic" :key="item.people" :label="item.people" :value="item.people"></el-option>
										<div class="TourGuidePicE">{{picmsg.maxHikingParticipants}} guests maximum. Infants don’t count toward the number of guests.</div>
									</el-select>
								</div>
							</div>
							<div class="payfortime">
								<h3>Select date（full day）</h3>
								<div class="date">
									<i class="iconfont font-blue" v-if="!startTimeAllTour.time">&#xe60d;</i>
									<i class="iconfont cancelDate" v-else @click.stop="dateClear(startTimeAllTour.time)">&#xe647;</i>
									<flatPickr v-model="startTimeAllTour.time" placeholder="Select Date" :config="touralloptions"></flatPickr>
								</div>

							</div>
							<div class="payfortime" v-if="picmsg.halfDayAvailable==1">
								<h3>Select date（half day）</h3>
								<div class="date">
									<i class="iconfont font-blue" v-if="!startTimeHalfTour.time">&#xe60d;</i>
									<i class="iconfont cancelDate" v-else @click.stop="dateClear(startTimeHalfTour.time)">&#xe647;</i>
									<flatPickr v-model="startTimeHalfTour.time" placeholder="Select Date" :config="tourhalfoptions"></flatPickr>
								</div>
							</div>
						</div>
					</div>
				</li>

			</ul>
			<!-- 带车个人信息 -->
			<div class="payfordetail" v-if="valueCarall&&(startTimeAllCar.time||startTimeHalfCar.time)&&seletId2==1">
				<div class="head clearfix">
					<div class="serviceform">
						<h3>These Services Come from {{detail.enName}}</h3>
						<p>{{valueCarall}}</p>
					</div>
					<div class="gideheadlog">
						<img :src="detail?detail.guidePhoto.headPortraitUrl:''" />
					</div>
				</div>
				<div class="halfday" v-if="startTimeHalfCar.time">
					<b>Half day</b>
					<p>{{startTimeHalfCar.time|sortDate}}</p>
					<span>${{halfcarpic*startTimeHalfCar.time.split(',').length}}</span>
				</div>
				<div class="halfday" v-if="startTimeAllCar.time">
					<b>Full day</b>
					<p>{{startTimeAllCar.time|sortDate}}</p>
					<span>${{allcarpic*startTimeAllCar.time.split(',').length}}</span>
				</div>
				<div class="total" v-if="startTimeHalfCar.time&&!startTimeAllCar.time">
					<p>Total (USD)</p>
					<b>${{halfcarpic*startTimeHalfCar.time.split(',').length}}</b>
				</div>
				<div class="total" v-if="startTimeAllCar.time&&!startTimeHalfCar.time">
					<p>Total (USD)</p>
					<b>${{allcarpic*startTimeAllCar.time.split(',').length}}</b>
				</div>
				<div class="total" v-if="startTimeHalfCar.time&&startTimeAllCar.time">
					<p>Total (USD)</p>
					<b>${{halfcarpic*startTimeHalfCar.time.split(',').length+allcarpic*startTimeAllCar.time.split(',').length}}</b>
				</div>
				<div class="bookbtn">
					<p v-if="Date.parse(sortDate(startTimeHalfCar.time).split(',')[0])-Date.parse(new Date())<5*86400000||Date.parse(sortDate(startTimeAllCar.time).split(',')[0])-Date.parse(new Date())<5*86400000">Since you are booking less than 5 days before departure, we cannot provide a refund if you have to cancel.</p>
					<button class="btnlinner no-margin" @click="jumpfill(0)">BOOK NOW</button>
				</div>
			</div>
			<!-- 不带车个人信息 -->
			<div class="payfordetail" v-if="value&&(startTimeAllTour.time||startTimeHalfTour.time)&&seletId==1">
				<div class="head clearfix">
					<div class="serviceform">
						<h3>These Services Come from {{detail.enName}}</h3>
						<p>{{value}}</p>
					</div>
					<div class="gideheadlog">
						<img :src="detail?detail.guidePhoto.headPortraitUrl:''" />
					</div>
				</div>
				<div class="halfday" v-if="startTimeHalfTour.time">
					<b>Half day</b>
					<p>{{startTimeHalfTour.time|sortDate}}</p>
					<span>${{halfTourpic*startTimeHalfTour.time.split(',').length}}</span>
				</div>
				<div class="halfday" v-if="startTimeAllTour.time">
					<b>Full day</b>
					<p>{{startTimeAllTour.time|sortDate}}</p>
					<span>${{allTourpic*startTimeAllTour.time.split(',').length}}</span>
				</div>
				<div class="total">
					<p>Total (USD)</p>
					<b v-if="startTimeHalfTour.time&&!startTimeAllTour.time">${{halfTourpic*startTimeHalfTour.time.split(',').length}}</b>
					<b v-if="startTimeAllTour.time&&!startTimeHalfTour.time">${{allTourpic*startTimeAllTour.time.split(',').length}}</b>
					<b v-if="startTimeHalfTour.time&&startTimeAllTour.time">${{halfTourpic*startTimeHalfTour.time.split(',').length+allTourpic*startTimeAllTour.time.split(',').length}}</b>
				</div>
				<div class="bookbtn">
					<p v-if="Date.parse(sortDate(startTimeHalfTour.time).split(',')[0])-Date.parse(new Date())<5*86400000||Date.parse(sortDate(startTimeAllTour.time).split(',')[0])-Date.parse(new Date())<5*86400000">Since you are booking less than 5 days before departure, we cannot provide a refund if you have to cancel.</p>
					
					<button class="btnlinner no-margin" @click="jumpfill(1)">BOOK NOW</button>
				</div>
			</div>
		</div>
		<div id="Supplementary" v-if="SupplementaryCar.length>0||SupplemenTourPic.length>0">
			<div class="SupplementaryItem">
				<h3>Additional Info</h3>
				<ul v-if="show==true">
					<li :key="index" v-for="(i,index) in SupplementaryCar">{{i}}</li>

				</ul>
				<ul v-if="show==false">
					<li v-if="SupplemenTourPic.length==1">{{SupplemenTourPic[0]}}</li>
					<li v-if="SupplemenTourPic.length>1" :key="index" v-for="(i,index) in SupplemenTourPic">{{i}}</li>
				</ul>

			</div>
		</div>
		
	</div>
</template>

<script>
	import { GetDateStr, addmulMonth } from '~/assets/js/plugin/utils.js'
	import flatPickr from 'vue-flatpickr-component';
	
	export default {
		props: ["guideId", "detail"],
		name: 'packageOptions',
		data() {
			return {
				obj:'',
				isNowPage:true,
				allcarpic: '', //动态带车全天价格
				halfcarpic: "", //动态带车半天价格
				allTourpic: '', //动态不带车全天价格
				halfTourpic: '', //动态不不带车半天价格

				valueCarall: '', //带车全天人数

				carTourPic: [], //带车全天价格
				halfcarTourPic: [], //带车半天价格

				allTourPic: [], //不带车全天
				halfTourPic: [], //不带车半天

				value: '', //不带车全天人数
				seletId: 0, //切换不带车

				seletId2: 0, //切换带车

			
				picmsg: '',
				SupplementaryCar: '',
				SupplemenTourPic: '',
				show: false,

				carAllarr: [], //带车全天选中日期
				carHalfarr: [], //带车半天选中日期
				tourAllarr: [], //不带车全天选中日期
				tourHalfarr: [], //不带车半天选中日期

				Function: '',
				carAllsuerDate: [],
				carHalfsuerDate: [],
				tourAllsuerDate: [],
				tourHalfsuerDate: [],

				//data 
				startTimeAllCar: {
					time: '',
				},
				startTimeHalfCar: {
					time: '',

				},
				startTimeAllTour: {
					time: ''
				},
				startTimeHalfTour: {
					time: ''
				},
				//带车全天日期
				allcaroptions: {

				},
				//带车半天日期
				halfcaroptions: {

				},
				//不带车全天日期
				touralloptions: {

				},
				//不带车半天日期
				tourhalfoptions: {

				}

			}

		},
		components: {
			flatPickr,
			
		},
		methods: {
			dateClear(val) {
				if(val == this.startTimeAllCar.time) {

					this.carHalfarr = this.carHalfarr.concat(this.startTimeAllCar.time.split(", "))
					this.carAllarr = this.carAllarr.concat(this.startTimeHalfCar.time.split(", "))
					this.startTimeAllCar.time = ""
					
					//console.log(this.carHalfsuerDate)

				} else if(val == this.startTimeHalfCar.time) {
					
					this.carAllarr = this.carAllarr.concat(this.startTimeHalfCar.time.split(", "))
					this.carHalfarr = this.carHalfarr.concat(this.startTimeAllCar.time.split(", "))
					this.startTimeHalfCar.time = ""
					
				} else if(val == this.startTimeAllTour.time) {
					this.tourHalfarr = this.tourHalfarr.concat(this.startTimeAllTour.time.split(", "))
					this.tourAllarr = this.tourAllarr.concat(this.startTimeHalfTour.time.split(", "))
					this.startTimeAllTour.time = ""
					
				} else if(val == this.startTimeHalfTour.time) {
					this.tourAllarr = this.tourAllarr.concat(this.startTimeHalfTour.time.split(", "))
					this.tourHalfarr = this.tourHalfarr.concat(this.startTimeAllTour.time.split(", "))
					this.startTimeHalfTour.time = ""
					
				}
			},

			alertTitleCallBack(val) {
				//回调后关闭弹框
				var that = this;

				that.alertTitleStatus = false;
			},

			//带车
			jumpfill(oderId) {
				const that=this
				
				window.ga && ga('gtag_UA_107010673_1.send', {
				  hitType: 'event',
				  eventCategory: 'Button',
				  eventAction: 'Click',
				  eventLabel: 'guide_book',
				  eventValue: that.guideId
				});
				if(oderId == 0) {
					that.obj = {
						id: 0,
						currency: this.picmsg.currency,
						hoursPerDay: this.picmsg.hoursPerDay,
						guideId: this.detail.guideId,
						serviceType: "VEHICLE",
						enName: this.detail.enName,
						logimg: this.detail.guidePhoto.headPortraitUrl,
						allcarpic: this.allcarpic,
						halfcarpic: this.halfcarpic,
						valueCarall: this.valueCarall,
						startTimeAllCar: this.startTimeAllCar.time,
						startTimeHalfCar: this.startTimeHalfCar.time

					}
				} else {
					that.obj = {
						id: 1,
						currency: this.picmsg.currency,
						hoursPerDay: this.picmsg.hoursPerDay,
						guideId: this.detail.guideId,
						serviceType: "HIKING",
						enName: this.detail.enName,
						logimg: this.detail.guidePhoto.headPortraitUrl,
						allTourpic: this.allTourpic,
						halfTourpic: this.halfTourpic,
						value: this.value,
						startTimeAllTour: this.startTimeAllTour.time,
						startTimeHalfTour: this.startTimeHalfTour.time
					}
				}
				
					that.obj = JSON.stringify(that.obj)
					console.log(that.obj)
					localStorage.setItem("infor", that.obj)
					window.location.href = 'https://www.localpanda.com/fillYourInfo.html'
				
			},
			//动态改变带车价格
			changeselet() {
				const that = this
				//带车全天
				for(let i = 0; i < that.carTourPic.length; i++) {

					if(that.valueCarall == that.carTourPic[i].people) {

						that.allcarpic = that.carTourPic[i].money

					}
				}
				//带车半天
				for(let i = 0; i < that.halfcarTourPic.length; i++) {
					if(that.valueCarall == that.halfcarTourPic[i].people) {
						that.halfcarpic = that.halfcarTourPic[i].money
					}
				}

			},
			//动态改变徒步价格
			changeTour() {
				const that = this
				//徒步全天
				for(var i = 0; i < that.allTourPic.length; i++) {

					if(that.value == that.allTourPic[i].people) {

						that.allTourpic = that.allTourPic[i].money

					}
				}
				//徒步半天
				for(var i = 0; i < that.halfTourPic.length; i++) {
					if(that.value == that.halfTourPic[i].people) {

						that.halfTourpic = that.halfTourPic[i].money

					}
				}

			},
			array_diff(a, b) {
				for(var i = 0; i < b.length; i++) {
					for(var j = 0; j < a.length; j++) {
						if(a[j] == b[i]) {
							a.splice(j, 1);
							j = j - 1;
						}
					}
				}
				return a;
			},
			gaSendtour(){
				let that=this
				window.ga && ga('gtag_UA_107010673_1.send', {
				  hitType: 'event',
				  eventCategory: 'Button',
				  eventAction: 'Click',
				  eventLabel: 'guide_select_hiking',
				  eventValue: that.guideId
				});
			},
			gaSendvehicle(){
				let that=this
				window.ga && ga('gtag_UA_107010673_1.send', {
				  hitType: 'event',
				  eventCategory: 'Button',
				  eventAction: 'Click',
				  eventLabel: 'guide_select_vehicle',
				  eventValue: that.guideId
				});
			},
			selet(id) {
				/*if(localStorage.getItem("logstate") == 0||localStorage.getItem("logstate")==null) {
							
							
							this.alertTitleStatus = true
							this.alertTitle = "Log in to Local Panda",
							this.alertTitleMessage = "Log in to add things to your wishlist and access your bookings from any device."
				} else {*/
				this.seletId = id
				this.show = false
				this.seletId2 = 0
				this.startTimeAllCar.time = ""
				this.startTimeHalfCar.time = ""
				this.allcarpic = ""
				this.halfcarpic = ""
				this.carHalfarr = this.carHalfarr.concat(this.startTimeAllCar.time.split(", "))
				this.carAllarr = this.carAllarr.concat(this.startTimeHalfCar.time.split(", "))
				this.tourHalfarr = this.tourHalfarr.concat(this.startTimeAllTour.time.split(", "))
				this.tourAllarr = this.tourAllarr.concat(this.startTimeHalfTour.time.split(", "))
				this.valueCarall=''
				//}
			},
			seletall(id) {
				/*if(localStorage.getItem("logstate") == 0||localStorage.getItem("logstate")==null) {
						console.log(111)
						
						this.alertTitleStatus = true
						this.alertTitle = "Log in to Local Panda",
						this.alertTitleMessage = "Log in to add things to your wishlist and access your bookings from any device."
				} else {*/
				this.seletId2 = id
				this.show = true
				this.seletId = 0
				this.startTimeAllTour.time = ""
				this.startTimeHalfTour.time = ""
				this.allTourpic = ""
				this.halfTourpic = ""
				this.carHalfarr = this.carHalfarr.concat(this.startTimeAllCar.time.split(", "))
				this.carAllarr = this.carAllarr.concat(this.startTimeHalfCar.time.split(", "))
				this.tourHalfarr = this.tourHalfarr.concat(this.startTimeAllTour.time.split(", "))
				this.tourAllarr = this.tourAllarr.concat(this.startTimeHalfTour.time.split(", "))
				this.value=''
				//}
			},
			//库存
			sortDate(date){
				var Dates = date.split(",");
				for(var F = Dates.length; F;) Dates[--F] = [(new Date(Dates[F])).getTime(), Dates[F]]
				Dates.sort(function(A, B) {
					return A[0] - B[0]
				})
				for(var F = Dates.length; F;) Dates[--F] = Dates[F][1]
				return Dates.join(',')
			},
			getPrice() {
				let that = this
				that.axios.get('https://www.localpanda.com/api/guide/price/' + that.guideId).then(function(response) {
					that.picmsg = response.data
					let str = response.data.prices.hikingFullDayPrices
					//console.log(response.data.prices.hikingFullDayPrices)
					let halfStr = response.data.prices.hikingHalfDayPrices
					let carStr = response.data.prices.vehicleFullDayPrices
					let halfcarstr = response.data.prices.vehicleHalfDayPrices
					//徒步全天
					if(response.data.prices.hikingFullDayPrices == null) {
						for(var i = 0; i < response.data.maxHikingParticipants; i++) {
							var arr = {
								'people': (i + 1) + ' people',
								"money": response.data.hikingFullDayPrice
							}
							//console.log(arr)
							that.allTourPic.push(arr)
							that.allTourPic[0] = {
								"people": 1 + " person",
								"money": that.allTourPic[0].money
							}
						}
					} else {
						for(let i in str) {
							var arr = {
								"people": i + " people",
								"money": str[i]
							}
							that.allTourPic.push(arr)

						}
						that.allTourPic[0] = {
							"people": 1 + " person",
							"money": that.allTourPic[0].money
						}

					}
					//徒步半天
					if(response.data.prices.hikingHalfDayPrices == null) {
						for(var i = 0; i < response.data.maxHikingParticipants; i++) {
							var half = {
								'people': (i + 1) + ' people',
								"money": response.data.hikingHalfDayPrice
							}
							that.halfTourPic.push(half)

						}
						that.halfTourPic[0] = {
							'people': 1 + ' person',
							"money": that.halfTourPic[0].money
						}

					} else {
						for(var i in halfStr) {
							var half = {
								"people": i + " people",
								"money": halfStr[i]
							}
							that.halfTourPic.push(half)
						}
						that.halfTourPic[0] = {
							"people": 1 + " person",
							"money": that.halfTourPic[0].money
						}
						//console.log(that.halfTourPic)
					}
					//带车全天
					if(response.data.vehicleAvailable!=0){
						for(var i in carStr) {
							var car = {
								"people": i + " people",
								"money": carStr[i]
							}
							that.carTourPic.push(car)
	
						}
						that.carTourPic[0] = {
							"people": 1 + " person",
							"money": that.carTourPic[0].money
						}
						//带车半天
						for(var i in halfcarstr) {
							var carhalf = {
								"people": i + " people",
								"money": halfcarstr[i]
							}
							that.halfcarTourPic.push(carhalf)
	
						}
						that.halfcarTourPic[0] = {
							"people": 1 + " person",
							"money": that.halfcarTourPic[0].money
						}
					}
					if(response.data.vehicleInstructions){
						that.SupplementaryCar = response.data.vehicleInstructions.split("\r\n")
					}	
					
					if(response.data.hikingInstructions){
						that.SupplemenTourPic = response.data.hikingInstructions.split("\r\n")
					}	

					for(var i = 0; i < that.SupplemenTourPic.length; i++) {
						if(that.SupplemenTourPic[i] == '') {
							that.SupplemenTourPic.splice(i, 1);
							i = i - 1;
						}
					}

				}, function(response) {

				})
			}
		},
		filters: {
			sortDate: function(val) {
				var Dates = val.split(",");
				for(var F = Dates.length; F;) Dates[--F] = [(new Date(Dates[F])).getTime(), Dates[F]]
				Dates.sort(function(A, B) {
					return A[0] - B[0]
				})
				for(var F = Dates.length; F;) Dates[--F] = Dates[F][1]
				return Dates.join(',')

				//arr.sort()
			}
		},
		mounted: function() {
			this.getPrice()
			
			
		},
		created: function() {
			const that = this
			that.axios.get("https://www.localpanda.com/api/stock/guide/" + that.guideId + "?startDate=" + GetDateStr(3) + "&days=90").then(function(response) {
				that.carAllsuerDate = response.data
				that.carHalfsuerDate = response.data
				//that.carHalfarr=response.data
				that.tourAllsuerDate = response.data
				that.tourHalfsuerDate = response.data
				//带车全天日历
				that.allcaroptions = {
					mode: "multiple",
					enable: that.carAllsuerDate,
					minDate: GetDateStr(3),
					maxDate: addmulMonth(GetDateStr(3), 3),
					onOpen: function(selectedDates, dateStr, instance) {/*
						if(that.startTimeHalfCar.time != "") {
							console.log(1111)
							var arr = that.startTimeHalfCar.time.split(", ")
							that.carAllarr = dateStr.split(", ").concat(that.array_diff(that.carAllsuerDate, arr))
							that.Function = instance.clear
							console.log(that.carAllarr)
							instance.set(that.allcaroptions, {
								mode: "multiple",
								enable: that.carHalfarr,
								minDate: GetDateStr(4),
								maxDate: addmulMonth(GetDateStr(4), 3),
							})
						}

						//console.log()
						//instance.config.disable=arr

					*/}

				}
				//带车半天日历
				that.halfcaroptions = {
					mode: "multiple",
					enable: that.carHalfsuerDate,
					minDate: GetDateStr(3),
					maxDate: addmulMonth(GetDateStr(3), 3),
					onOpen: function(selectedDates, dateStr, instance) {/*

						if(that.startTimeAllCar.time != '') {
							console.log(222)
							var arr1 = that.startTimeAllCar.time.split(", ")
							that.carHalfarr = that.array_diff(that.carHalfsuerDate, arr1).concat(dateStr.split(", "))
							//instance.config.enable = that.carHalfarr
							that.Function = instance.clear
							instance.set(that.halfcaroptions, {
								mode: "multiple",
								enable: that.carHalfarr,
								minDate: GetDateStr(4),
								maxDate: addmulMonth(GetDateStr(4), 3),
							})
						}

					*/}

				}
				//徒步全天日历
				that.touralloptions = {
					mode: "multiple",
					enable: that.tourAllsuerDate,
					minDate: GetDateStr(3),
					maxDate: addmulMonth(GetDateStr(3), 3),
					onOpen: function(selectedDates, dateStr, instance) {/*

						if(that.startTimeHalfTour.time != "") {
							var arr = that.startTimeHalfTour.time.split(', ')
							that.tourAllarr = that.array_diff(that.tourAllsuerDate, arr)
							that.Function = instance.clear
							instance.set(that.halfcaroptions, {
								mode: "multiple",
								enable: that.tourAllarr,
								minDate: GetDateStr(4),
								maxDate: addmulMonth(GetDateStr(4), 3),
							})
						}

						//console.log()
						//instance.config.disable=arr

					*/}

				}
				//不带车半天日历
				that.tourhalfoptions = {
					mode: "multiple",
					enable: that.tourHalfsuerDate,
					minDate: GetDateStr(3),
					maxDate: addmulMonth(GetDateStr(3), 3),
					onOpen: function(selectedDates, dateStr, instance) {/*

						if(that.startTimeAllTour.time != "") {
							var arr = that.startTimeAllTour.time.split(", ")
							that.tourHalfarr = that.array_diff(that.tourHalfsuerDate, arr)
							that.Function = instance.clear
							instance.set(that.halfcaroptions, {
								mode: "multiple",
								enable: that.tourHalfarr,
								minDate: GetDateStr(4),
								maxDate: addmulMonth(GetDateStr(4), 3),
							})
						}
						//console.log(instance.config.disable)
						//console.log()
						//instance.config.disable=arr

					*/}
				}

			}, function(response) {})

		},
		watch: {
			/*"startTimeAllCar.time": function(val,oldVal) {
				let that = this
				if(val!='') {
					console.log(that.halfcaroptions.onOpen)
					that.halfcaroptions.onOpen=function(selectedDates, dateStr, instance) {
							console.log(111)
							var arr1 = val.split(", ")
							console.log(arr1)
							that.carHalfarr = that.array_diff(that.carHalfsuerDate, arr1).concat(dateStr.split(", "))
							//instance.config.enable = that.carHalfarr
							that.Function = instance.clear
							instance.set(that.halfcaroptions, {
								mode: "multiple",
								enable: that.carHalfarr,
								minDate: GetDateStr(4),
								maxDate: addmulMonth(GetDateStr(4), 3),
							})

						}
					}
				
			},

			"startTimeHalfCar.time": function(val, oldVal) {
				let that = this
				if(val!='') {
					that.allcaroptions.onOpen=function(selectedDates, dateStr, instance) {

							var arr = val.split(", ")
							that.carAllarr = dateStr.split(", ").concat(that.array_diff(that.carAllsuerDate, arr))
							that.Function = instance.clear
							console.log(that.carAllarr)
							instance.set(that.allcaroptions, {
								mode: "multiple",
								enable: that.carHalfarr,
								minDate: GetDateStr(4),
								maxDate: addmulMonth(GetDateStr(4), 3),
							})

							//console.log()
							//instance.config.disable=arr

						}

					

				}
			}*/
		}
	}
</script>
<style lang="scss">
	@import '~assets/scss/_main.scss';
	@import '~/assets/font/iconfont.css';
	
	/** select **/
	.el-popper[x-placement^=bottom]{
		margin-top: 0!important;
	}
	.el-select .el-input.is-focus .el-input__inner{
		border-color:#1bbc9d!important; 
	}
	.popper__arrow{
		
		border-bottom-color:#fff!important;
		
	}
	.el-popper .popper__arrow, .el-popper .popper__arrow::after{border-style: none!important;}
	.block {
		.el-date-editor.el-input,
		.el-date-editor.el-input__inner {
			width: 258px!important;
		}
		.el-date-table td.current:not(.disabled) span {
			background-image: linear-gradient(135deg, #1bbc9d 0%, #009efd 100%)!important;
		}
		.el-input--prefix .el-input__inner {
			padding-left: 89px!important;
			color: #fff;
		}
		.el-input__inner {
			border-radius: 20px!important;
			height: 50px!important;
			background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%), linear-gradient( #1bbc9d, #1bbc9d)!important;
			color: #fff;
		}
		.el-input__prefix {
			i {
				width: 64px!important;
				color: #fff;
				font-size: 24px!important;
				border-right: 1px solid #66d8c2;
				color: #fff!important;
			}
		}
	}
	
	.Guests {
		.el-select {
			width: 326px!important;
		}
		.el-input__inner {
			font-size: 18px!important;
			height: 50px!important;
			padding-left: 57px!important;
		}
		.el-icon-arrow-up {
			&:before {
				content: "\e60c"!important;
				color: #353a3f;
			}
		}
	}
	
	.el-select-dropdown__item.hover,
	.el-select-dropdown__item:hover {
		background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%)!important;
		color: #fff!important;
	}
	
	.el-select-dropdown__item {
		font-size: 18px!important;
		height: 58px!important;
		line-height: 58px!important;
	}
	
	.el-select-dropdown__wrap {
		max-height: none!important;
	}
	
	.TourGuidePicE {
		max-width: 266px;
		margin: 30px;
	}
	::-webkit-input-placeholder { /* WebKit browsers */
   	color: #878e95!important;
	}
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	   color:#878e95!important;
	}
	::-moz-placeholder { /* Mozilla Firefox 19+ */
	    color:#878e95!important;
	}
	:-ms-input-placeholder { /* Internet Explorer 10+ */
	    color: #878e95!important;
	}
</style>
<style lang="scss" scoped>
	@import "~assets/scss/base/_setting.scss";
	.no-margin {
		margin-top: 24px;
		width: 300px!important;
	}
	#packageOptions {
		background: #faf9f8;
		padding: 40px 0 0;
		.PackageOptionsDetail {
			width: 1170px;
			margin: 0 auto;
			h3 {
				font-size: 24px;
				color: #353a3f;
				margin-bottom: 20px;
				font-weight: bold;
			}
			.text{
				width:724px!important;
				font-size: 18px;
				margin-bottom: 30px;
			}
			.block {
				margin: 26px 0 24px 0;
				.demonstration {
					margin-left: 30px;
					font-size: 16px;
				}
			}
			.payfordetail {
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);;
				float: right;
				background: #fff;
				padding: 34px 30px 30px 30px;
				width: 312px;
				.head {
					padding-bottom: 30px;
					border-bottom: 1px solid #dde0e0;
					.serviceform {
						float: left;
						width: 143px;
						h3 {
							font-size: 18px;
							margin-bottom: 0;
							line-height: 22px;
						}
						p {
							font-size: 18px
						}
					}
					.gideheadlog {
						width: 138px;
						height: 92px;
						float: left;
						margin-left: 19px;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
				.halfday {
					padding: 30px 0;
					position: relative;
					border-bottom: 1px solid #dde0e0;
					b {
						font-size: 18px;
						color: #353a3f;
					}
					p {
						font-size: 18px;
						width: 78%;
					}
					span {
						position: absolute;
						right: 0;
						top: 42px;
						font-size: 18px;
					}
				}
				.total {
					padding-top: 30px;
					position: relative;
					p {
						font-size: 18px;
					}
					b {
						font-size: 18px;
						position: absolute;
						top: 33px;
						right: 0;
					}
				}
				.bookbtn {
					p{
						font-size: 14px;
						margin-top: 14px;
						color: red;
					}
					text-align: center;
				}
			}
			ul {
				float: left;
				li {
					position: relative;
					width: 734px;
					background: #fff;
					margin-bottom: 10px;
					padding-right: 30px;
					height:auto; 
					&:last-child {
						margin-bottom: 0;
					}
					.font-type {
						font-size: 32px;
						position: absolute;
						top: 29px!important;
						left: 26px!important;
					}
					.font-typeb{
						font-size: 38px;
						top: 26px;
						left: 30px;
					}
					.typeItem {
						border-bottom: 1px solid #ebebeb;
						margin-left: 84px;
						overflow: auto;
						&:last-child {
							border: none;
						}
						.typeItem-row {
							float: left;
							padding: 20px 0;
							h3 {
								font-size: 18px;
								margin-bottom: 14px;
							}
							p {
								font-size: 16px;
								color: #878e95;
								span {
									font-size: 16px;
									position: relative;
									&:not(:first-child) {
										padding-left: 14px;
										margin-left: 14px;
										&:after {
											content: "";
											height: 8px;
											width: 2px;
											position: absolute;
											top: 50%;
											margin-top: -4px;
											left: 0;
											background: #878e95;
											;
										}
									}
								}
							}
						}
						.paybtn {
							float: right;
							height: 100%;
							margin:22px 0 21px;
							b {
								text-align:center;
								display: block;
								font-size: 18px;
								span {
									font-weight: normal;
									font-size: 14px;
									color: #878e95;
								}
							}
							button {
								margin-top: 10px;
								width: 92px;
								height: 30px;
								border: 1px solid #1bbc9d;
								border-radius: 20px;
								color: #1bbc9d;
								text-align: center;
								line-height: 28px;
								background: #fff;
								font-size: 12px;
								&.bac {
									background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
									color: #fff!important;
								}
							}
						}
					}
					.choose {
						clear: both;
						padding: 0 0 40px;
						border-top: 1px solid #ebebeb;
						.hint{
							padding:20px 0;
							b{
								line-height: 20px;
								position: relative;
								&:first-child{
									margin-right: 30px;
								}
								
								color: #1bbc9d;
								span{
									font-size: 8px;
									font-weight: normal;
									margin-right: 10px;
								}
								
							}
						}
						h3 {
							font-size: 14px;
							margin-bottom: 10px;
							font-weight: bold;
						}
						;
						.payfortime {
							margin-top: 28px;
							.date {
								
								position: relative;
								i {
									position: absolute;
									top: 13px;
									left: 21px;
									font-size: 20px;
									z-index: 10;
									&.font-blue {
										color: #1bbc9d;
									}
									&.cancelDate {
										cursor: pointer;
										color: #dde0e0;
									}
								}
							}
						}
						.Guests {
							.slectPeople {
								
								width: 326px;
								position: relative;
								i {
									top: 13px;
									color: #1bbc9d;
									font-size: 20px;
									position: absolute;
									z-index: 111;
									left: 21px;
								}
							}
							p {
								margin-top: 12px;
								font-size: 16px;
								color: #878e95;
								span {
									position: relative;
									&:not(:first-child) {
										padding-left: 14px;
										margin-left: 14px;
										&:after {
											content: "";
											height: 8px;
											width: 2px;
											position: absolute;
											top: 50%;
											margin-top: -4px;
											left: 0;
											background: #878e95;
											;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		#Supplementary {
			background: #fff;
			margin-top: 40px;
			.SupplementaryItem {
				width: 1170px;
				margin: 0 auto;
				padding: 40px 0 100px;
				h3 {
					font-size: 24px;
					font-weight: bold;
					color: #353a3f;
				}
				ul {
					margin-top: 26px;
					li {
						position: relative;
						font-size: 18px;
						line-height: 30px;
						width: 702px;
						margin-top: 15px;
						padding-left: 21px;
						&:first-child {
							margin-top: 0;
						}
						&:after {
							content: "";
							position: absolute;
							width: 4px;
							height: 4px;
							background: #1bbc9d;
							border-radius: 50%;
							top: 10px;
							left: 0;
						}
					}
				}
			}
		}
	}
	
	.hidden {
		display: none;
	}
	
	.date {
		width: 269px;
	}
	.green{
		color: #1bbc9d!important;
	}
</style>