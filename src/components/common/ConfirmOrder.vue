<template>
	<div class="main">
      <mt-header fixed title="确认订单">
        <a slot="left" @click="goBack">
          <mt-button icon="back" ></mt-button>
        </a>
      </mt-header>
      <router-link class="deliveryAddress" tag="div" :to="{name:'deliveryaddress'}">
	      	<ul class="fl deliveryAddress-lr">
	      		<li class="delivery-people clearfix">
	      			<span class="fl">收货人：孙秀明</span>
	      			<span class="fr">18395319906</span>
	      		</li>
	      		<li class="deliveryAddress-lr-addr">
	      			收货地址：科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室 
	      		</li>
	      	</ul>
      	</router-link>
      <!-- 	<router-link class="noDeliveryAddress" tag="div" :to="{name:'deliveryaddress'}">
	      	设置收货地址
      	</router-link> -->
      	<ul class="goodsList">
      		<li>
      			<div class="goodsList-tp">
      				<i class="iconfont">&#xe6a8;</i>
      				onet凡兔旗舰店
      			</div>
      			<div class="goodsList-mids">
      				<div class="goodsList-mid clearfix">
	      				<div class="goods-img fl">
	      					<img src="../../assets/images/confirmorder-01.jpg">
	      				</div>
	      				<div class="goods-introduce fl lr3">
	      					韩版男装牛仔外套男修身男士秋季夹克学生外衣大码牛仔衣潮褂上衣
	      					韩版男装牛仔外套男修身男士秋季夹克学生外衣大码牛仔衣潮褂上衣
	      					韩版男装牛仔外套男修身男士秋季夹克学生外衣大码牛仔衣潮褂上衣
	      				</div>
	      				<div class="goods-unitPrice fr">
	      					<div class="goods-price">
								¥
								<span class="goods-intPrice">10</span>
								<span class="goods-folatPrice">.00</span>
							</div>
							<div class="goods-num">X<i>11</i></div>
	      				</div>
	      			</div>
	      			<div class="goodsList-mid clearfix">
	      				<div class="goods-img fl">
	      					<img src="../../assets/images/confirmorder-01.jpg">
	      				</div>
	      				<div class="goods-introduce fl lr3">
	      					韩版男装牛仔外套男修身男士秋季夹克学生外衣大码牛仔衣潮褂上衣
	      					韩版男装牛仔外套男修身男士秋季夹克学生外衣大码牛仔衣潮褂上衣
	      					韩版男装牛仔外套男修身男士秋季夹克学生外衣大码牛仔衣潮褂上衣
	      				</div>
	      				<div class="goods-unitPrice fr">
	      					<div class="goods-price">
								¥
								<span class="goods-intPrice">10</span>
								<span class="goods-folatPrice">.00</span>
							</div>
							<div class="goods-num">X<i>11</i></div>
	      				</div>
	      			</div>
      			</div>
      			<router-link class="deliveryMode deflist" tag="div" :to="{name:'deliverymode'}">
  					<div class="deliveryMode-lf fl">
  						配送方式
      				</div>
      				<div class="deliveryMode-lr fr">
      					快递免邮
      				</div>
      			</router-link>
      			<div class="deliveryMode deflist clearfix">
  					<div class="deliveryMode-lf fl">
  						给卖家留言:
      				</div>
      				<div class="deliveryMode-lr fl">
      					<input type="text" name="" placeholder="选填:对本次交易的说明)">
      				</div>
      			</div>
      			<div class="goods-total clearfix">
      				<span class="goods-total-lf">
      					共 11 件, 合计：
      				</span>
      				<span class="mygoods-price">
						¥
						<span class="goods-intPrice">10</span>
						<span class="goods-folatPrice">.00</span>
					</span>
      			</div>
      		</li>
      	</ul>
      	<ul class="exhibition">
      		<li class="clearfix">
      			<div class="exhibition-lf fl">
      				商品金额
      			</div>
      			<span class="mygoods-price fr">
					¥
					<span class="goods-intPrice">10</span>
					<span class="goods-folatPrice">.00</span>
				</span>
      		</li>
      		<li class="clearfix">
      			<div class="exhibition-lf fl">
      				+运费
      			</div>
      			<span class="mygoods-price fr">
					¥
					<span class="goods-intPrice">10</span>
					<span class="goods-folatPrice">.00</span>
				</span>
      		</li>
      		<li class="clearfix">
      			<div class="exhibition-lf fl">
      				-会员折扣(8折)
      			</div>
      			<span class="mygoods-price fr">
					-¥
					<span class="goods-intPrice">10</span>
					<span class="goods-folatPrice">.00</span>
				</span>
      		</li>
      	</ul>
      	<div class="settlement clearfix">
      		<div class="settlement-lf fl">
      			<span class="settlement-item-lf">
      				共
      				<span>
      					13
      				</span>
      				件 , 总金额
      			</span>
      			<span class="mygoods-price">
					¥
					<span class="goods-intPrice">10</span>
					<span class="goods-folatPrice">.00</span>
				</span> 
      		</div>
      		<div class="settlement-lr fr" @click="goPay">
      			提交订单
      		</div>
      	</div>
      	<transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight" >
	    	<router-view></router-view>
	    </transition>

	</div>
</template>
<script>
	import { Header,MessageBox} from 'mint-ui'
	export default{
		data(){
			return{
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			goPay(){
				this.$router.push({name:'payselect'})
			}
		},
		mounted(){
	      MessageBox({title: '您还未设置收货地址，请设置地址?',message: '点击确认设置',showCancelButton: true}).then(action => {
	          if(action=='confirm'){//表示点击了确定
	            
	          }else if(action=='cancel'){//表示点击了取消
	            // console.log('点击了取消')
	          }
	      })
	    }
	}
</script>
<style scoped>
	@import '../../assets/css/fonts/iconfont.css';
  	@import '../../assets/css/reset/reset.css';
	.main {
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background:#efeff4 ;
	    overflow: auto;
	    z-index: 30
  	}
  	.header{
  		font-size: 0.16rem;
  		height: 0.44rem;
  	}
  	.deliveryAddress{
  		padding:0.15rem;
  		height: 1rem;
  		margin-top:0.54rem;
  		background: #fff;
  		position: relative;
  	}
  	.delivery-people{
  		overflow: hidden
  	}
  	.deliveryAddress:after{
  		content: '';
	    position: absolute;
	    width: 0.065rem;
	    height: 0.12rem;
	    top: 0.44rem;
	    right: 0.1rem;
	    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
	    background-size: cover;
  	}
  	.deliveryAddress-lf{
  		width: 10%;
  		font-size: 0.18rem;
  		position: absolute;
  		top:50%;
  		left:0.1rem;
  		margin-top: -0.1rem;
  	}
  	.deliveryAddress-lr{
  		width: 90%;
  		font-size: 0.14rem;
  		text-align: left;
  		color:#666;
  	}
  	.deliveryAddress-lr-addr{
  		line-height: 0.22rem;
  	}
  	.goods-price{
		color:#F5751D;
		font-size: 0.12rem;
	}
	.goods-intPrice{
		font-size: 0.2rem;
	}
	.goods-folatPrice{
		font-size: 0.12rem;
	}
	.goods-num{
		font-size:0.12rem;
		text-align: right;
		color:#666;
	}
	.goods-num i{
		font-size: 0.14rem
	}
	.goodsList{
		margin-top: 0.10rem;
	}
	.goodsList li{
		background: #fff;
		margin-bottom: 0.1rem;
	}
	.goodsList-tp{
		padding:0.15rem 0.1rem;
		font-size: 0.14rem;
		text-align: left;
		color:#666;
	}
	.goodsList-tp i{
		font-size: 0.18rem;
	}
	.goodsList-mid{
		height:0.7rem;
		padding:0.1rem;
	}
	.goods-img{
		width:0.50rem;
		height:0.50rem;
	}
	.goods-img img{
		display: block;
		width:100%;
	}
	.goods-unitPrice{

	}
	.goods-introduce{
		width: 1.90rem;
		font-size: 0.12rem;
		color:#666;
		text-align: left;
		margin-left: 0.1rem;
	}
	.deflist{
		height: 0.46rem;
		line-height: 0.46rem;
		color:#999;
		font-size: 0.14rem;
		position: relative;
		overflow: hidden;
	}
	.deflist:after{
  		content: '';
	    position: absolute;
	    width: 0.065rem;
	    height: 0.12rem;
	    top: 0.17rem;
	    right: 0rem;
	    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
	    background-size: cover;
  	}
	.deliveryMode-lr{
		margin-right: 0.2rem;
		font-size: 0.14rem;
		color:#666;
	}
	.deliveryMode{
		width: 3.57rem;
		margin: 0rem 0.1rem;
		border-bottom: 0.01rem solid #E5E5E5;
	}
	.deliveryMode-lf{
		font-size: 0.14rem;
		color:#666;
	}
	.deliveryMode-lr input{
		display: block;
		width: 2.5rem;
		line-height: 0.44rem;
		font-size: 0.14rem;
		color:#333;
		margin-left: 0.1rem;
	}
	.mygoods-price{
		/*height:0.46rem;
		line-height: 0.46rem;*/
		text-align: right;
		font-size: 0.12rem;
		color:#F5751D;
	}
	.goods-total{
		height:0.46rem;
		line-height: 0.46rem;
		text-align: right;
		font-size: 0.12rem;
		padding: 0rem 0.1rem;
	}
	.goods-total-lf{
		font-size: 0.14rem;
		color: #666;
    	font-weight: bolder;
	}
	.settlement{
		position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    height: 0.50rem;
	    padding: 0rem 0rem 0rem 0.1rem;
	    border-top: 1px solid #e7e7e7;
	    background: #fff;
	    z-index: 50
	}
	.settlement-lf{
		width:2.50rem;
		height: 0.50rem;
	    line-height: 0.50rem;
	    font-size: 0.14rem;
	    color:#666;
	    text-align: right
	}
	.settlement-lr{
		width: 1.10rem;
	    height: 0.50rem;
	    line-height: 0.50rem;
	    font-size: 0.16rem;
	    background: #F5751D;
	    color: #fff;
	    text-align: center;
	}
	.settlement-item-lf span{
		color:#F5751D;
	}
	.exhibition{
		margin: 0.1rem 0rem 0.6rem 0rem;
		background: #fff;
	}
	.exhibition li{
		height: 0.46rem;
	    width: 100%;
	    font-size: 0.14rem;
	    color: #666;
	    padding:0rem 0.1rem;
	}
	.exhibition-lf{
		line-height: 0.46rem;
	}
	.exhibition .mygoods-price{
		margin-top: 0.1rem;	
	}
	.goodsList-mids .goods-price{
		font-size: 0.12rem;
		color:#666;
	}
	.goodsList-mids .goods-intPrice{
		font-size: 0.16rem;
	}
	.goodsList-mids .goods-num i{
		font-size: 0.12rem;
	}
	.exhibition .mygoods-price{
		color:#666;
	}
	.exhibition .goods-intPrice{
		font-size: 0.16rem
	}
	.noDeliveryAddress{
		margin-top: 0.55rem;
		height: 0.5rem;
		line-height: 0.5rem;
		background: #646C89;
		padding:0 0.1rem;
		font-size: 0.14rem;
		color: #fff;
		text-align: left;
		position: relative;
	}
	.noDeliveryAddress:after{
  		content: '';
	    position: absolute;
	    width: 0.065rem;
	    height: 0.12rem;
	    top: 0.19rem;
	    right: 0.1rem;
	    background: url('../../assets/images/userinfo-03.png') no-repeat center center;
	    background-size: cover;
  	}
</style>