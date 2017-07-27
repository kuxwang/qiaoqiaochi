<template>
  <div class="main order-detail-header">
    <mt-header title="订单详情" class="ocolor">
      <router-link to="/order" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="buyer-info ocolor">
      <div class="buyer-info-box">
        <div class="iconfont" >
        </div>
        <ul class="order-state">
          <li>交易完成</li>
          <li>订单金额(含运费)：￥99.00</li>
          <li>运费：￥0.00</li>
        </ul>
      </div>
    </div>
    <div class="buyer-address">
      <div class="buyer-address-detail">
        <p>收件人：XXXXX</p>
        江苏省无锡市滨湖区山水科教园
      </div>
    </div>
    <div class="product-info-box">
      <div class="pib-header">
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
  </div>
</template>
<script>
  import { Header} from 'mint-ui'
  import PageNavbar from "../../view/Order.vue";
  export default {
    components: {PageNavbar}
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
  .order-state{
    position:absolute;
    left:.7rem;
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
  .buyer-address-detail{
    text-align: left;
    font-size: .14rem;
    position:absolute;
    left:.4rem;
  }
  .buyer-address-detail>p{
    margin-bottom:.04rem;
  }
  .product-info-box{
    background: #fff;
    padding:0 .1rem;
    height:3rem;
  }
  .pib-header{
    text-align: left;
    padding:.08rem 0;
    border-bottom:1px solid #ddd;
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
    float:right
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
</style>
