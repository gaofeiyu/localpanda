<template>
	<div class="bottom" :class="{scroll:scrollTopshow}">
		<div class="bottom_count">
			<p>If there are no tours that attract you, our travel consultants can customize you an ideal trip plan 
based on your needs!</p>
			<div class="btn">
				
				<button @click="showContact">Customize Your Trip</button>
			</div>
			
		</div>
		<div class="false" @click="falseClick">
			<i class="iconfont">&#xe606;</i>
		</div>
		<Contact :ContactStatus="ContactStatus" v-on:isshowfn="isShowFn" v-on:contact-call-back="contactCallBack"  :objectType="objectType"></Contact>
		<Alert   :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
	</div>
</template>

<script>
	
	import Contact from '~/components/Contact/Contact';
	import Alert from '~/components/Prompt/Alert';
	export default {
		props:["scrollTop","isListPage"],
		name: 'bottom',
		data() {
			return {
				scrollTopshow:false,
				ContactStatus:false,
				isShowAlert:false,
				alertTitle:'',
				alertMessage:"",
				istrue:false,
				objectType:'CONSULTING'
			}
		},
		components: {
			Contact,
			Alert
		},
		methods: {
			isShowFn(val){
				this.istrue=val
				if(this.istrue==true){
					this.isShowAlert=true
					this.alertTitle="Submission completed!"
					this.alertMessage="Thank you for your feedback.We will get back to you within 1 day."
					this.istrue=false
				}else{
					this.isShowAlert=true
					this.alertMessage="Failed!"
				}
			},
			getIsShowAlert(val){
				this.isShowAlert=val
			},
			showContact(){
				let that=this
				if(this.isListPage){
					ga('gtag_UA_107010673_1.send', {
						hitType: 'event',
						eventCategory: 'Button',
						eventAction: 'Click',
						eventLabel: 'trip_customizing_list',
	
					});
				}else{
					ga('gtag_UA_107010673_1.send', {
					hitType: 'event',
					eventCategory: 'Button',
					eventAction: 'Click',
					eventLabel: 'trip_customizing_lp',
				});
				}
				that.ContactStatus=true
			},
			contactCallBack(val){
				this.ContactStatus=false
			},
			falseClick(){
				 this.scrollTopshow = false;
			},
			 checkSticky() {
			 	
	            if (window.scrollY > this.scrollTop) {
	                this.scrollTopshow = true;
	            } else {
	                this.scrollTopshow = false;
	            }
        	},
				
		},
		mounted: function() {
	        window.addEventListener('scroll', (e) => {
	            this.checkSticky();
	        })
		}
	}
</script>

<style lang="scss" scoped>
.bottom{
	width: 100%;
	height: 100px;
	background-image: linear-gradient(-90deg,#009efd 0%,#1bbc9d 100%);
	position: fixed;
	bottom: -100%;
	left: 0;
	.bottom_count{
		width: 1170px;
		height:100px;
		margin: 0 auto;
		padding: 26px 0;
		position: relative;
		
		P{
			width: 60%;
			font-weight: bold;
			color: #fff;
			font-size: 20px;
		}
		.btn{
			position: absolute;
			right: 0;
			top: 50%;
			margin-top: -50px;
			span{
				margin-top: 20px;
				font-size: 18px;
				color: #fff;
			}
			button{
				width: 182px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				border-radius: 25px;
				background: #fff;
			
				 
				color: #1bbc9d;
				font-size: 14px;
				font-weight: bold;
				
		
			}
		}
		
	}
	.false{
			cursor: pointer;
			position: absolute;
			right: 10px;
			font-size: 26px;
			color: #fff;
			top: 10px;
		}
}
.scroll{
	animation: fadebottom 1s ease-in-out forwards;

}
@keyframes fadebottom{
	from{
		bottom: -100%;
	}
	to{
		bottom: 0;
	}
}

</style>