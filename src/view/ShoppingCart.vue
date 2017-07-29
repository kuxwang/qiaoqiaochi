<template>
	<div class="content">
		<mt-header title="购物车" class="is-fixed">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<ul class="goods-list" v-show="isShow">
			<li class="clearfix" v-for="(v,i) in getShCartData">
				<label class="mint-checklist-label fl">
					<div class="mint-checkbox">
						<input type="checkbox" class="mint-checkbox-input" :checked="v.isChecked" @click="nowChecked($event,v,i)">
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
					 <div class="goods-del" @click="delGoods(v,i)">
                    	<i class="iconfont">&#xe6db;</i>
                    </div>
					<div class="dt_sku_numm_m clearfix">
						<span class="dt_subt fl"  @click="reduceTotal(v,i)">-</span>
						<span class="dt_num fl">{{v.total}}</span>
						<span class="dt_add" @click="addTotal(v,i)">+</span>
                    </div>
				</div>
			</li>
		</ul>
		<div class="total_area clearfix" v-show="isShow">
			<label class="mint-checklist-label fl">
				<span class="mint-checkbox fl">
					<input type="checkbox" class="mint-checkbox-input" value="当前值" :checked="isTrue" @click="allCheckBox">
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
				<div class="payment-lr fl lr1" @click="goConfirmorder">
					结算({{defTotal}})
				</div>
			</div>
		</div>
		<div class="nogoods" v-show="!isShow">
			<div class="nogoods-tp">
				<img src="../assets/images/shoppingCart-02.png">
			</div>
			<p class="nogoods-mid">
				没有添加商品 <br>
				购物车都饿扁了，快去喂它吧!
			</p>
			<div class="nogoods-bt">
				去购物
			</div>
		</div>
	</div>
</template>
<script>
	import { Header,Checklist,MessageBox } from 'mint-ui';
	import {setStore, getStore} from '../config/myUtils';
	import {GET_MYCARTS,PUT_MYCARTS,GET_ORDER1} from '../api/api';
	export default{
		data(){
			return {
				value1: [],
				getShCartData:[],
				defPrice:'0',
				defTotal:'0',
				isTrue:false,
				checkItem:false,
				isShow:true
			}
		},
		methods:{
			addTotal(v,i){//加
				v.total++;
				var myTotal=Number(v.total);
				var myPrice=Number(v.marketprice);
				var myDefPrice=Number(this.defPrice);
				// console.log(this.getShCartData[i].isChecked)
				if(this.getShCartData[i].isChecked==true){
					this.defPrice=myDefPrice+myPrice;
					this.defTotal++
					let params = {
						'data':{
							cartid:v.id,
							type:'1'
						}
					}
					let _this=this
			    	PUT_MYCARTS(params, function (res) {
			    		if(res.statusCode===1){
			    			console.log('加成功')
			    		}else{
			    			console.log('请求失败')
			    		}
			      	})
				}
			},
			reduceTotal(v,i){//减
				var total=v.total;
				if(total>1){
					v.total--;
					var myTotal=Number(v.total);
					var myPrice=Number(v.marketprice);
					var myDefPrice=Number(this.defPrice);
					if(this.getShCartData[i].isChecked==true){
						this.defPrice=myDefPrice-myPrice;
						this.defTotal--
					}
					let params = {
						'data':{
							cartid:v.id,
							type:'-1'
						}
					}
					let _this=this
			    	PUT_MYCARTS(params, function (res) {
			    		if(res.statusCode===1){
			    			console.log('减成功')
			    		}else{
			    			console.log('请求失败')
			    		}
			      	})
				}
			},
			allCheckBox(){//全选
				this.isTrue=!this.isTrue;
				if(this.isTrue==true){
					var allPrice=0;
					var allTotal=0;
					for(var i=0;i<this.getShCartData.length;i++){
						this.getShCartData[i].isChecked=true;
						// console.log(this.getShCartData[i])
						var myTotal=Number(this.getShCartData[i].total);
						var myPrice=Number(this.getShCartData[i].marketprice);
						allPrice+=myPrice*myTotal;
						allTotal+=myTotal
					}
					this.defPrice=allPrice;
					this.defTotal=allTotal;
				}else{
					for(var i=0;i<this.getShCartData.length;i++){
						this.getShCartData[i].isChecked=false;
					}
					this.defPrice=0;
					this.defTotal=0;
				}
			},
			nowChecked(e,v,i){//单选
				this.getShCartData[i].isChecked=!this.getShCartData[i].isChecked;
				var myTotal=Number(v.total);
				var myPrice=Number(v.marketprice);
				var myDefPrice=Number(this.defPrice);
				var myDefTotal=Number(this.defTotal);
				if(this.getShCartData[i].isChecked==true){
					this.defPrice=myDefPrice+(myTotal*myPrice);
					this.defTotal=myDefTotal+myTotal;
				}else{
					if(myDefPrice-myTotal*myPrice>=0){
						this.defPrice=myDefPrice-(myTotal*myPrice);
						this.defTotal=myDefTotal-myTotal;
					}else{
						this.defPrice=0;
					}
				}

				var arr=[];
				for(var i=0;i<this.getShCartData.length;i++){
					if(this.getShCartData[i].isChecked==true){
						arr.push(this.getShCartData[i].isChecked);
						if(arr.length==this.getShCartData.length){
							this.isTrue=true
						}else{
							this.isTrue=false
						}
					}else{
						this.isTrue=false
					}
				}
			},
			delGoods(v,i){//删除
				MessageBox({title: '确认要删除此商品吗?',message: '点击确认删除',showCancelButton: true}).then(action => {
                    if(action=='confirm'){//表示点击了确定
                    	if(this.getShCartData[i].isChecked==true){
                    		var myTotal=Number(v.total);
							var myPrice=Number(v.marketprice);
							var myDefPrice=Number(this.defPrice);
							var myDefTotal=Number(this.defTotal);
                    		if(myDefPrice-(myTotal*myPrice)>=0){
								this.defPrice=myDefPrice-(myTotal*myPrice);
								this.defTotal=myDefTotal-myTotal;
							}else{
								this.defPrice=0;
							}
                    	}
                    	// console.log(this.getShCartData.length)
                    	if(this.getShCartData.length==1){
                    		this.isTrue=false;
                    		this.isShow=false;
                    	}
                    	this.getShCartData.splice(i,1);
                    }else if(action=='cancel'){//表示点击了取消
                      // console.log('点击了取消')
                    }
                })
			},
			goConfirmorder(){//去确认订单
				if(this.defPrice>0){
					this.$router.push({name:'confirmorder'})
					// console.log()
					// let m_goodsid=this.getShCartData.goodsid;
					// let m_optionid=this.getShCartData.optionid;
					// let m_cartids=this.getShCartData.cartids;
					// let m_total=this.getShCartData.total;
					// let m_type=this.getShCartData.goodsid;
					let params = {
						'data':{
							goodsid:'4',
							optionid:'0',
							cartids:'111',
							total:'22'
						}
					}
					let _this=this
			    	GET_ORDER1(params, function (res) {
			    		console.log(res)
			      	})
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
		},
		mounted(){
			let params = []
			let _this=this
	    	GET_MYCARTS(params, function (res) {
	    		// console.log(res)
	        	if(res.statusCode===1){
	        		// console.log(res.data)
	        		_this.getShCartData=res.data.list;
	        		for(let a in _this.getShCartData){
	        			_this.getShCartData[a].isChecked=false
	        		}
	        	}else{
	        		console.log('请求失败')
	        	}
	      	})
		}
	}
</script>
<style scoped>
	@import '../assets/css/fonts/iconfont.css';
  	@import '../assets/css/reset/reset.css';
  	.content{
  		position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background: #efeff4;
	    overflow: auto;
  	}
  	.header{
  		color: #fff;
  	}
	.mint-header{
		/*background: #fff;*/
		/*color:#fff;*/
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
		padding-top: 0.45rem;
	}
	.goods-list li{
		height: 1rem;
	    padding: 0.1rem;
	    background:#fff;
	    margin-top: 0.05rem;
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
		background: #FCFCFC;
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
	    height: 0.50rem;
	    padding: 0rem 0rem 0rem 0.1rem;
	    border-top: 1px solid #e7e7e7;
	    background: #fff;
	}
	.total_area .mint-checklist-label{
		padding: 0rem;
		display: block;
		width:1rem;
		height: 0.50rem;
		line-height:0.50rem;
		text-align: left;
		font-size: 0.28rem
	}
	.mint-checkbox-label{
		font-size: 0.14rem;
		color:#051b28;
	}
	.payment-lf{
		height: 0.50rem;
	}
	.payment-lf h3{
		font-size: 0.14rem;
		margin-right: 0.1rem;
	}
	.payment-lf h4{
		font-size: 0.14rem;
	}
	.payment-lr{
		width: 1.10rem;
		height: 0.50rem;
		line-height: 0.50rem;
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

	.mint-msgbox-confirm{
		color:#F5751D !important;
	}
	.nogoods{
		margin-top: 1.5rem;

	}
	.nogoods-tp{
		width:0.55rem;
		height: 0.47rem;
		margin: 0 auto;
	}
	.nogoods-tp img{
		display: block;
		width: 100%;
	}
	.nogoods-mid{
		margin-top: 0.2rem;
		font-size: 0.14em;
    	color: #666;
	}
	.nogoods-bt{
		width: 1.6rem;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		color:#fff;
		background: #F5751D;
		margin: 0 auto;
		margin-top: 0.2rem;
		font-size: 0.14rem;
		box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);
		border-radius: 0.04rem;
	}
</style>






