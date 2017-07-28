<template>
	<div class="main">
      <mt-header fixed title="配送方式" class="ocolor header">
        <a slot="left" @click="goBack">
          <mt-button icon="back" >返回</mt-button>
        </a>
      </mt-header>
      <ul class="deliverymode-list">
      	<li>
      		<span>
      			商家配送
      		</span>
      	</li>
      	<li>
      		<span>
      			商家配送
      		</span>
      	</li>
      	<li>
      		<span>
      			商家配送
      		</span>
      	</li>
      </ul>
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
  	.deliverymode-list{
  		margin-top: 0.55rem;
  	}
  	.deliverymode-list li{
  		height:0.5rem;
  		line-height: 0.5rem;
  		background: #fff;
  		border-bottom: 0.01rem solid #D8D8D8;
  		font-size: 0.15rem;
  		padding: 0rem 0.1rem;
  		text-align: left;
  		color:#666;
  		position: relative;
  	}
  	.deliverymode-list li:after{
  		content:'✔';
  		position: absolute;
  		left:0.2rem;
  		top:0px;
  		font-size: 0.20rem;
  		color:#F5751D;
  	}
  	.deliverymode-list li:before{
  		content: '';
	    position: absolute;
	    width: 0.065rem;
	    height: 0.12rem;
	    top: 0.18rem;
	    right: 0.2rem;
	    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
	    background-size: cover;
  	}
  	.deliverymode-list li span{
  		padding-left: 0.4rem;
  	}
</style>