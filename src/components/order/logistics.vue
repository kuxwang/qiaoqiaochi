<template>
  <div class="main order-detail-header">
    <mt-header title="查看物流" class="ocolor">
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
          <li>物流单位</li>
          <li>运单编号：1234567877</li>
        </ul>
      </div>
    </div>
    <div class="product-info-box">
      <div class="pib-header">
        <span class="iconfont">&#xe6ce;</span>
        物品信息
      </div>
      <router-link class="good-info" to="/details" tag="div">
        <img src="../../assets/images/xiaotu.jpg" alt="" class="order-small">
        <p>竹享</p>
        <div class="good-price">
          <p>￥99.00</p>
          <p>×1</p>
        </div>
      </router-link>
    </div>
    <div class="logistics-info">
      <div class="pib-header">
        <span class="iconfont">&#xe606;</span>
        物流跟踪
      </div>
      <ul>
        <li class="active">
          <b></b>
          <p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>
          <p>2017-07-22 22:12:22</p>
        </li>
        <li>
          <b></b>
          <p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>
          <p>2017-07-22 22:12:22</p>
        </li>
        <li>
          <b></b>
          <p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>
          <p>2017-07-22 22:12:22</p>
        </li>
        <li>
          <b></b>
          <p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>
          <p>2017-07-22 22:12:22</p>
        </li>
        <li>
          <b></b>
          <p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>
          <p>2017-07-22 22:12:22</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { Header} from 'mint-ui'
  export default {
    components: {},
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
    color:#666;
  }
  .mint-header{
    border-bottom:none;
    color:#fff;
  }
  .order-detail-header .mint-header {
    height:.45rem;
  }
  .buyer-info{
    height:.8rem;
    width:100%;
    background: rgba(245,117,29,.2);
    margin-bottom:.1rem;
  }
  .buyer-info-box{
    height:.8rem;
    width:100%;
    background: rgba(0,0,0,.25);
    position:relative;
  }
  .buyer-info-box>div.iconfont{
    position:absolute;
    left:.08rem;
    top:.2rem;
    color:#fff;
    font-size:.35rem;
  }
  .order-state{
    position:absolute;
    left:.5rem;
    top:.2rem;
  }
  .order-state li{
    text-align: left;
    color:#fff;
    font-size:.13rem;
    margin-bottom:.03rem;
  }
  .product-info-box{
    background: #fff;
    padding:0 .1rem;
    height:1.2rem;
    margin-bottom:.1rem;
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
  .logistics-info{
    background: #fff;
    padding:.1rem .15rem;
    margin-bottom:1rem;
  }
  .logistics-info>div.pib-header>span.iconfont{
    font-size:.2rem;
    /*line-height:.3rem;*/
  }
  .logistics-info>ul{
    margin:.1rem 0;
    margin-left:.05rem;
    padding-left:.3rem;
    text-align:left;
    border-left:1px solid #ddd;
  }
  .logistics-info>ul>li{
    border-bottom:1px solid #ddd;
    padding:.1rem 0;
    padding-right:.3rem;
    font-size:.13rem;
    position:relative;
  }
  .logistics-info>ul>li.active{
    color:#F5751D;
  }
  .logistics-info>ul>li.active>b{
    background:#F5751D ;
  }
  .logistics-info>ul>li>b{
    position: absolute;
    left:-.35rem;
    top:.05rem;
    width:.1rem;
    height:.1rem;
    border-radius:50%;
    background: #ddd;
  }
  .logistics-info>ul>li>p{
    line-height: .24rem;
  }
  .logistics-info>ul>li>p.first{
    margin-bottom:.2rem;
  }
  .logistics-info>ul>li:last-child{
    border-bottom: none;
  }
</style>
