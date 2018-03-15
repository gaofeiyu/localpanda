<template>
	<div id="page" class="page" :class="{hide: !(totalPage>0)}">
		<div class="pageList">
			<span v-if="pageNumber != 1" @click="prev"><i class="iconfont">&#xe6b9;</i></span>
			<ul>
				<li v-for="(item,index) in totalPage" v-bind:class="{activeli:pageNumber==(index+1)}" v-on:click="clickPageLi(index)">{{ index+1 }}</li>
			</ul>
			<span v-if="pageNumber != totalPage" v-on:click="next"><i class="iconfont">&#xe6b5;</i>{{count}}</span>
		</div>
		<div class="goPage">
			<em>跳转到：</em>
			<input type="number" name="" v-model.number="currentPage" style="overflow:hidden; resize:none;">
			<div class="goBtn" v-on:click="goPage">GO</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "page",
		props:['totalPage'],
		data() {
			return {
				pageNumber:"1",   //当前页码
				tokenkey:"", 
				currentPage:""
			}
		},
		methods: {
			clickPageLi(index) {  
				let $this = this
				$this.pageNumber = index+1
				$this.$emit("setPageNumber",$this.pageNumber) 
			},
			goPage() {
				let $this = this
				if($this.currentPage<=$this.totalPage && $this.currentPage>0){
					$this.pageNumber = $this.currentPage
					$this.$emit("setPageNumber",$this.pageNumber)
				}
			},
			next() {
				let $this = this
				$this.pageNumber++
				$this.$emit("setPageNumber",$this.pageNumber) 
			},
			prev() {
				let $this = this
				$this.pageNumber--
				$this.$emit("setPageNumber",$this.pageNumber)
			}
		}
		
	}
</script>
<style lang="scss" scoped>
	@import "../../assets/scss/base/_setting.scss";
	.hide{
		display: none;
	}
	.page {
		height: 40px;
		margin: 30px auto;
		text-align: center;
		.pageList{
			height: 30px;
			display: inline-block;
			span{
				width: 30px;
				height: 30px;
				border:1px solid #E5E5E5;
				border-radius: 4px;
				display: inline-block;
				line-height: 30px;
				text-align: center;
				float: left;
				&:hover{
					cursor:pointer;
				}
				i{

				}
			}
			ul{
				margin:0 10px;
				margin-right: 0;
				float: left;
				li{
					width: 30px;
					height: 30px;
					text-align: center;
					float: left;
					line-height: 30px;
					border-radius: 4px;
					margin-right: 10px;
					border:1px solid #E5E5E5;
					color: #999;
					&:hover{
						border:1px solid #2EA1F1;
						cursor: pointer;
					}
				}
				.activeli{
					background: #2EA1F1;
					color: #fff;
					border:1px solid #2EA1F1;
				}
			}
		}
		.goPage{
			vertical-align: top;
			height: 30px;
			display: inline-block;
			margin-left: 10px;
			input{
				width: 50px;
				height: 30px;
				border:1px solid #E5E5E5;
				background: #fff;
				border-radius: 4px;
				margin-right: 10px;

			}
			input::-webkit-outer-spin-button,
			input::-webkit-inner-spin-button{ 
			 -webkit-appearance: none !important
			}
			
			em{
				height: 30px;
				line-height: 30px;
			}
			.goBtn{
				width: 28px;
				height: 28px;
				line-height: 28px;
				text-align:center;
				float: right;
				border:1px solid #E5E5E5;
				border-radius: 4px;
				&:hover{
					cursor:pointer
				}

			}
		}
	}
</style>