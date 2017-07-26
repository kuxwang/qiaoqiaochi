<template>
	<div class="content">
		<mt-header title="购物车">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<ul class="goods-list">
			<li class="clearfix" v-for="(v,i) in getShCartData">
				<label class="mint-checklist-label fl">
					<div class="mint-checkbox">
						<input type="checkbox" class="mint-checkbox-input" v-model="checkItem" >
						<span class="mint-checkbox-core"></span>
					</div>
				</label>
				<div class="goods-img fl">
					<img :src="v.thumb">
				</div>
				<div class="goods-info fl">
					<h3 class="goods-title lr1">{{v.title}}</h3>
					<div class="goods-attr">
						<span class="goods-price">
							¥
							<span class="goods-intPrice">{{v.marketprice|getIntNmb}}</span>
							<span class="goods-folatPrice">{{v.marketprice|getFloatNmb}}</span>
						</span>
						<del>¥{{v.productprice}}</del>
					</div>
					<div class="goods-num">X<i>{{v.total}}</i></div>
				</div>
				<div class="goods-total fr">
					 <div class="goods-del">
                    	<i class="iconfont">&#xe6db;</i>
                    </div>
					<div class="dt_sku_numm_m clearfix">
						<span class="dt_subt fl"  @click="reduceTotal(v)">-</span>
						<span class="dt_num fl">{{v.total}}</span>
						<span class="dt_add" @click="addTotal(v,i)">+</span>
                    </div>
				</div>
			</li>
		</ul>
		<div class="total_area clearfix">
			<label class="mint-checklist-label fl">
				<span class="mint-checkbox fl">
					<input type="checkbox" class="mint-checkbox-input" value="全选" :checked="isTrue" @click="allCheckBox">
					<span class="mint-checkbox-core"></span>
				</span>
				<span class="mint-checkbox-label">全选</span>
			</label>
			<div class="payment fr clearfix">
				<div class="payment-lf fl">
					<h3>
						合计:
						<span class="goods-price">
							¥
							<span class="goods-intPrice">{{defPrice|getIntNmb}}</span>
							<span class="goods-folatPrice">{{defPrice|getFloatNmb}}</span>
						</span>
					</h3>
					<h4>
						不含运费
					</h4>
				</div>
				<div class="payment-lr fl lr1">
					结算({{defTotal}})
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Header,Checklist } from 'mint-ui';
	import {setStore, getStore} from '../config/myUtils';
	export default{
		data(){
			return {
				value1: [],
				getShCartData:[
					{goodsid:"4",id:"1111",marketprice:"99.00",maxbuy:"0",optionid:"0",optionstock:"null",optiontitle:"null",productprice:"120.20",specs:"null",stock:"96198",thumb:"http://duoyunjiav2.wshoto.com/attachment/images/2/2017/07/LwQEua5Wt2KBKOalLBou5eaXxauvOo.jpg",title:"植护竹浆本色抽纸10包装",total:"2"
					},
					{goodsid:"4",id:"2222",marketprice:"88.89",maxbuy:"0",optionid:"0",optionstock:"null",optiontitle:"null",productprice:"150.00",specs:"null",stock:"96198",thumb:"http://duoyunjiav2.wshoto.com/attachment/images/2/2017/07/LwQEua5Wt2KBKOalLBou5eaXxauvOo.jpg",title:"植护竹浆本色抽纸10包装",total:"3"
					},
					{goodsid:"4",id:"3333",marketprice:"88.00",maxbuy:"0",optionid:"0",optionstock:"null",optiontitle:"null",productprice:"100.00",specs:"null",stock:"96198",thumb:"http://duoyunjiav2.wshoto.com/attachment/images/2/2017/07/LwQEua5Wt2KBKOalLBou5eaXxauvOo.jpg",title:"植护竹浆本色抽纸10包装",total:"4"
					},
					{goodsid:"4",id:"4444",marketprice:"125.25",maxbuy:"0",optionid:"0",optionstock:"null",optiontitle:"null",productprice:"210.50",specs:"null",stock:"96198",thumb:"http://duoyunjiav2.wshoto.com/attachment/images/2/2017/07/LwQEua5Wt2KBKOalLBou5eaXxauvOo.jpg",title:"植护竹浆本色抽纸10包装",total:"5"
					}
				],
				defPrice:'1442.82',
				defTotal:'14',
				isTrue:false,
				checkItem:false
			}
		},
		methods:{
			addTotal(val,i){
				val.total++;
				Number(this.defTotal++);
			},
			reduceTotal(val){
				var total=val.total;
				if(total>1){
					val.total--;
					Number(this.defTotal--)
				}
			},
			// selectInp(v,i){
			// 	console.log(i)
			// },
			allCheckBox(){
				if(this.isTrue==false){
					this.checkItem=true;
					this.isTrue=true;
				}else{
					this.checkItem=false;
					this.isTrue=false;
				}

			}
		},
		filters:{
			getIntNmb:function(val){
				val=Number(val).toFixed(2);
				var numIndex=val.indexOf('.');
				if(numIndex!=-1){
					return val.substring(0,numIndex)
				}else{
					return val
				}
			},
			getFloatNmb:function(val){
				val=Number(val).toFixed(2);
				var numIndex=val.indexOf('.');
				if(numIndex!=-1){
					return val.substring(numIndex,val.length);
				}else{
					return ''
				}
			}
		}
	}
</script>
<style scoped>
	@import '../assets/css/fonts/iconfont.css';
  	@import '../assets/css/reset/reset.css';
  	.content{
  		height: 100%;
  	}
	.mint-header{
		background: #fff;
		color:#252525;
		border-bottom: 1px solid #e3e3e3;
		font-size:0.16rem;
	}
	.router-link-active{
		color:#666;
	}
	.goods-list .mint-checklist-label{
		height: 0.2rem;
	    width: 0.3rem;
	    text-align: left;
	    margin-top: 0.20rem;
	    padding: 0rem;
	}
	.goods-list{
		padding-bottom: 0.65rem;
	}
	.goods-list li{
		height: 1rem;
	    padding: 0.1rem;
	    border-bottom: 0.01rem solid #e3e3e3;
	}
	.goods-img{
		width: 0.8rem;
		height:0.8rem;
		margin-right:0.1rem;
	}
	.goods-img img{
		display: block;
		width: 100%
	}
	.goods-info{
		width:1.66rem;
	}
	.goods-title{
		font-size: 0.14rem;
		color:#27272f;
		text-align: left;
	}
	.goods-attr{
		color:#F5751D;
		line-height: 0.2rem;
		position: relative;
		text-align: left;
		padding: 0.05rem 0rem;
		font-size: 0.28rem;
	}
	.goods-price{
		font-size: 0.12rem;
	}
	.goods-intPrice{
		font-size: 0.2rem;
	}
	.goods-folatPrice{
		font-size: 0.12rem;
	}
	.goods-attr del{
		color: #bebebe;
    	font-size:0.12rem;
	}
	.goods-num{
		text-align: left;
		font-size:0.12rem;
		color:#27272f;
	}
	.goods-num i{
		font-size: 0.14rem
	}
	.mint-checkbox{
		font-size: 0.28rem;
	}
	.mint-checkbox-core{
		width:0.2rem;
		height: 0.2rem;
	}
	.mint-checkbox-core::after{
		border: 0.02rem solid transparent;
	    border-left: 0;
	    border-top: 0;
	    content: " ";
	    top: 0.03rem;
	    left: 0.06rem;
	    position: absolute;
	    width: 0.04rem;
	    height: 0.08rem;
	}
	.dt_sku_numm_m{
		width: 1rem;
	    border: 0.01rem solid #e2e2e2;
	    position: absolute;
	    bottom:0rem;
	    right:0rem;
	}
	.dt_sku_numm_m span{
		float: left;
		width: 33.3%;
		height: 0.25rem;
		line-height:0.25rem;
		text-align: center;
	  	font-size: 0.2rem;
    	color:#6b6b6b;
    	overflow:hidden;
	}
	.dt_sku_numm_m .dt_num{
		border:0.01rem solid #e2e2e2;
		border-bottom: none;
		border-top: none;
		font-size:0.15rem;
		color:#27272f;
	}
	.goods-del{
		position: absolute;
		top: 0rem;
		right:0rem;
		font-size: 0.25rem;
	}
	.goods-del i{
		font-size: 0.28rem;
		color:#999;
	}
	.goods-total{
		height: 100%;
		position: relative;
	}
	.total_area{
		position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    height: 0.54rem;
	    padding: 0rem 0rem 0rem 0.1rem;
	    border-top: 1px solid #e7e7e7;
	    background: #fff;
	}
	.total_area .mint-checklist-label{
		padding: 0rem;
		display: block;
		width:1rem;
		height: 0.54rem;
		line-height:0.54rem;
		text-align: left;
		font-size: 0.28rem
	}
	.mint-checkbox-label{
		font-size: 0.14rem;
		color:#051b28;
	}
	.payment-lf{
		height: 0.54rem;
	}
	.payment-lf h3{
		font-size: 0.14rem;
		margin-right: 0.1rem;
		margin-top: 0.05rem;
	}
	.payment-lf h4{
		font-size: 0.14rem;
	}
	.payment-lr{
		width: 1.10rem;
		height: 0.54rem;
		line-height: 0.54rem;
		font-size: 0.16rem;
		background: #F5751D;
		color:#fff;
		text-align: center;
	}
	.mint-checkbox-input:checked + .mint-checkbox-core{
		background-color: #F5751D;
    	border-color: #F5751D;
	}
	.goods-price{
		color:#F5751D;
	}
</style>






