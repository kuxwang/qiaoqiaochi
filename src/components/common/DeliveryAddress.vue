<template>
	<div class="main">
      <mt-header fixed title="管理收货地址" class="ocolor header">
        <a slot="left" @click="goBack">
          <mt-button icon="back" >返回</mt-button>
        </a>
      </mt-header>
      <ul class="deliveryAddress">
      	<li class="on">
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      	<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      	<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      		<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      	<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      		<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      	<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      		<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      	<li>
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：孙秀明
	      		</div>
	      		<div class="fr">
	      			18395319906
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
      			江苏省无锡市滨湖区雪浪街道 科教创业园3号楼10F 江苏微盛网络科技有限公司 1005室
      		</p>
      	</li>
      </ul>
      <router-link class="addDeliveryAddress" tag="div" :to="{name:'addaddress'}">
      	新增收货地址
      </router-link>
	  	<transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight" >
	    	<router-view></router-view>
	    </transition>
    </div>
</template>
<script>
	export default{
		methods:{
			goBack(){
				this.$router.go(-1);
			}
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
	    background: #ececec;
	    overflow: auto;
	    z-index: 50
  	}
  	.header{
  		font-size: 0.16rem;
  		height: 0.44rem;
  	}
  	.deliveryAddress{
  		margin-top: 0.54rem;
  		margin-bottom: 0.58rem;
  	}
  	.deliveryAddress li{
  		height: 0.92rem;
  		padding:0.1rem 0.58rem 0.1rem 0.1rem;
  		background: #fff;
  		border-bottom: 0.01rem solid #D8D8D8;
  		position: relative;
  	}
  	.deliveryAddress-tp{
  		font-size: 0.16rem;
  		color:#666;
  	}
  	.deliveryAddress-mid{
  		font-size: 0.12rem;
  		color:#666;
  		text-align: left;
  		margin-top: 0.1rem;
  		line-height: 0.20rem;
  	}
  	.deliveryAddress li.on{
  		background: #5e6b85;
  	}
  	.deliveryAddress li.on:before {
    	content: "✔";
	    position: absolute;
	    top: 0.26rem;
	    right: 0.1rem;
	    font-size: 0.26rem;
	    color:#fff;
	}
  	.deliveryAddress li.on .deliveryAddress-tp{
  		color:#fff;
  	}
  	.deliveryAddress li.on .deliveryAddress-mid{
  		color:#fff;
  	}
  	.addDeliveryAddress{
  		position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 0;
  		height: 0.48rem;
  		line-height: 0.48rem;
  		background: #F5751D;
  		text-align: center;
  		color:#fff;
  		font-size: 0.16rem;
  	}
</style>