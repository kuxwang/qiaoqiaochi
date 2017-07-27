<template>
  <div class="main order-detail-header">
    <mt-header title="订单详情" class="ocolor">
      <a @click="goBack" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="buyer-info ocolor">
      <div class="buyer-info-box">
        <div class="iconfont" >
          &#xe66f;
        </div>
        <ul class="order-state">
          <li>交易完成</li>
          <li>订单金额(含运费)：￥99.00</li>
          <li>运费：￥0.00</li>
        </ul>
      </div>
    </div>
    <div class="buyer-address">
      <div class="iconfont" >
        &#xe621;
      </div>
      <div class="buyer-address-detail">
        <p>收件人：XXXXX</p>
        江苏省无锡市滨湖区山水科教园
      </div>
    </div>
    <div class="product-info-box">
      <div class="pib-header">
        <span class="iconfont">&#xe6ce;</span>
        朵云家
      </div>
      <router-link class="good-info" to="/details" tag="div">
        <img src="../../assets/images/xiaotu.jpg" alt="" class="order-small">
        <p>竹享</p>
        <div class="good-price">
          <p>￥99.00</p>
          <p>×1</p>
        </div>
      </router-link>
      <ul class="pib-list">
        <li>商品金额：<p>￥99.00</p></li>
        <li>运费：<p>￥99.00</p></li>
        <li>会员折扣：<p>￥99.00</p></li>
        <li>实付费(含运费)：<p>￥99.00</p></li>
      </ul>
    </div>
    <ul class="trace-info">
      <li>订单号：<p>WDSFDFGEDEDEDEDE</p></li>
      <li>交易完成时间：<p>2017-07-27 22:00:00</p></li>
    </ul>
    <div class="bottom-box">
      <router-link to="/drawbackInfo" class="back-money-ing" tag="button">
        退款申请中
      </router-link>
      <button class="delete-order">删除订单</button>
      <router-link to="/logistics" tag="button" class="ocolor">
        查看物流
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { Header} from 'mint-ui'
  import PageNavbar from "../../view/Order.vue";
  export default {
    components: {PageNavbar},
    methods:{
      goBack:function () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .main{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size:.15rem;
    overflow:auto;
    z-index:20;
  }
  .order-detail-header .mint-header {
    height:.45rem;
  }
  .buyer-info{
    height:1rem;
    width:100%;
    background: rgba(245,117,29,.2);
  }
  .buyer-info-box{
    height:1rem;
    width:100%;
    background: rgba(0,0,0,.25);
    position:relative;
  }
  .buyer-info-box>div.iconfont{
    position:absolute;
    left:.05rem;
    top:.28rem;
    color:#fff;
    font-size:.35rem;
  }
  .order-state{
    position:absolute;
    left:.48rem;
    top:.2rem;
  }
  .order-state li{
    text-align: left;
    color:#fff;
    font-size:.13rem;
    margin-bottom:.03rem;
  }
  .buyer-address{
    background:#fff;
    padding:.16rem .1rem;
    position:relative;
    height:.75rem;
    margin-bottom:.15rem;
  }
  .buyer-address>div.iconfont{
    position:absolute;
    font-size:.18rem;
    left:.12rem;
    top:.27rem;
  }
  .buyer-address-detail{
    text-align: left;
    font-size: .14rem;
    position:absolute;
    left:.47rem;
  }
  .buyer-address-detail>p{
    margin-bottom:.04rem;
  }
  .product-info-box{
    background: #fff;
    padding:0 .1rem;
    height:2.35rem;
    margin-bottom:.15rem;
  }
  .pib-header{
    text-align: left;
    padding:.08rem .05rem;
    border-bottom:1px solid #ddd;
  }
  .pib-header>span{
    margin-right:.05rem;
  }
  .good-info{
    height:.7rem;
    padding:.08rem 0;
    border-bottom:1px solid #ddd;
  }
  .order-small{
    width:.5rem;
    height:.5rem;
    border:1px solid #ddd;
  }
  .good-info>img{
    float:left;
  }
  .good-info>p{
    float:left;
    margin-left:.08rem;
    font-size:.13rem;
  }
  .good-price{
    float:right;
    font-size:.13rem;
  }
  .good-price>p{
    text-align: right;
    margin-bottom:.02rem;
  }
.pib-list{
  padding:.2rem 0;
}
.pib-list>li{
  text-align: left;
  font-size:.13rem;
  margin-bottom:.06rem;
}
.pib-list>li>p{
  float:right;
}
.trace-info{
  background: #fff;
  padding:.08rem .1rem;
  padding-bottom:.06rem;
  font-size: .13rem;
}
.trace-info li{
  text-align: left;
  margin-bottom:.08rem;
}
.trace-info li p{
  float:right;
}
  .bottom-box{
    height:.6rem;
    background: #fff;
    border-top:1px solid #ddd;
    position:absolute;
    width:100%;
    left:0;
    bottom:0;
  }
  .bottom-box{
    text-align:right;
    padding-right:.15rem;
    padding-top:.1rem;
  }
  .bottom-box>button{
    width:.9rem;
    height:.4rem;
    border:none;
    outline: none;
    color:#fff;
    border-radius:.03rem;
  }
  .delete-order{
    background:#ddd;
    color:#666 !important;
    width:.9rem !important;
    margin-right:.05rem;
  }
  .back-money-ing{
    background:#ff771b;
    margin-right:.05rem;
  }
</style>
