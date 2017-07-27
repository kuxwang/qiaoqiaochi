<template>
  <transition name="slide">
    <div class="main">
      <mt-header title="商品详情" fixed>
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="box">
        <div class="img-box">
          <img src="../../assets/images/home-01.jpg" alt="" class="content"/>
        </div>
      </div>
      <div class="intro">
        <p>竹享</p>
        <span>￥199.00</span>
        <p class="vip-intro"><span class="iconfont">&#xe631;</span>您是<span>高级会员</span> 可享<span>8.00</span>折优惠</p>
      </div>
      <div class="b-intro">
        <div class="bottom-nav">
          图文详情
        </div>
        <p class="img-p">
          <img src="../../assets/images/home-02.jpg" alt=""/>
          <img src="../../assets/images/home-02.jpg" alt=""/>
          <img src="../../assets/images/home-02.jpg" alt=""/>
          <img src="../../assets/images/home-02.jpg" alt=""/>
        </p>
      </div>
      <div class="bottom-navbar">
        <router-link class="icon-box" :to="{name:''}"  tag="a">
          <div class="icon-b">
            <div class="iconfont tabIcon">&#xe613;</div>
            收藏
          </div>
        </router-link>
        <router-link class="icon-box icon-box-car" :to="{name:'shoppingCart'}"  tag="a">
          <div class="icon-b">
            <div class="iconfont tabIcon icon-car">&#xe607;</div>
            购物车
          </div>
        </router-link>
        <button class="icon-btn icon-btn-car ocolor" @click="handleClick">
          加入购物车
        </button>
        <router-link class="icon-btn icon-btn-con" :to="{name:''}"  tag="button">
          立即购买
        </router-link>
      </div>
      <mt-popup v-model="popupVisible" position="bottom" modal=true>
        <div class="popup-box">
          <img src="../../assets/images/xiaotu.jpg" >
          <div class="popup-info">
            <p>￥99.00</p>
            <span>库存：99999件</span>
          </div>
          <div class="cal-box">

            <div>
              <button class="reduce-down" @click="reduce(num)">-</button>
              <input class="num-box" :value=num />
              <button class="add-up" @click="add">+</button>
            </div>
            <p>购买数量</p>
          </div>
          <button class="confirm ocolor">确认</button>
        </div>
      </mt-popup>
    </div>
  </transition>

</template>
<script>
  import { Header,Popup} from 'mint-ui'
  export default {
    data(){
      return{
        popupVisible:false,
        num:'1',
      }
    },
    methods:{
      handleClick:function () {
        this.popupVisible = true
      },
      reduce:function (num) {
        if(num>1){
          this.num--
        }
      },
      add:function () {
        this.num++
      }
    },
    components: {}
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  .main {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background: rgba(243,195,151,0.7);*/
    background:#f3f3f3;
    font-size:.15rem;
    overflow:auto
  }
  .mint-header {
    background: #fff;
    color: #252525;
    border-bottom: 1px solid #e3e3e3;
    font-size: 0.16rem;
    height:46px;
  }
  .router-link-active {
    color: #666;
  }
/*商品信息*/
  .box {
    width: 100%;
  }
  .img-box {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    margin-top: 46px;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .intro{
    padding-top:.1rem;
    text-align: left;
    padding-left:.06rem;
    background: #fff;
  }
  .intro>p{
    font-size: .15rem;
    text-align: left;
    margin-bottom: .05rem;
    padding-left:.03rem;
  }
  .intro>span{
    font-size:.18rem;
    color:#f01e1f;
  }
  p.vip-intro{
    margin-top:.06rem;
    font-size:.14rem;
    color:#999;
  }
  .b-intro{
    margin-top: .15rem;
    background: #fff;
  }
  .bottom-nav{
    padding:.1rem 0;
    border-top:.02rem solid #696d6f;
  }
  .img-p{
    width:100%;
    margin-bottom:50px;
  }
  .img-p>img{
    width:99.6%;
  }
  .bottom-navbar{
    width: 100%;
    height:48px;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    /*border-top: 1px solid #DDDDDD;*/
  }
  .icon-box{
    width:18%;
    height:48px;
    float:left;
    text-align: center;
    color:#666;
    border-top: 1px solid #DDDDDD;
  }
  .icon-box-car{
    margin-right:-.09rem;
  }
  .icon-b{
    font-size:.12rem;
  }
  .iconfont{
    font-size:.19rem;
    margin-top:.03rem;
  }
  .icon-car{
    font-size:.24rem;
    margin-top:.015rem;
    margin-bottom:-.037rem;
  }
  .icon-btn{
    margin:0;
    width:32.5%;
    height:48px;
    outline: none;
    color:#fff;
    font-size:.15rem;
  }
  .icon-btn-car{
    margin-right:-.05rem;
    background: #ff9500;
  }
  .icon-btn-con{
    background: #dd2727;
    margin-right:-0.05rem;
  }
  /*弹出框样式*/
  .mint-popup-bottom{
    width:100%;
  }
  .popup-box{
    height:2rem;
    width:100%;
    position: relative;
  }
  .popup-box>img{
    width:.8rem;
    height:.8rem;
    border-radius: .03rem;
    border:1px solid #ddd;
    position: absolute;
    left:.12rem;
    top:-.12rem;
  }
  .popup-box>div.popup-info{
    text-align:left;
    position: absolute;
    left:1.1rem;
    top:.12rem;
    color:#000;
  }
  .popup-box>div.popup-info>p{
    margin-bottom:.03rem;
  }
  .popup-box>div.popup-info>span{
    font-size:.12rem;
    color:#999;
    margin-left:.02rem;
  }
  .popup-box>.confirm{
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
    color:#fff;
    font-size:.16rem;
    height:.46rem;
  }
  .cal-box{
    position:absolute;
    left:0;
    top:.88rem;
    width:100%;
    padding:0 .15rem;
  }
  .cal-box>p{
    padding-top:.08rem;
    margin-left:1.3rem;
    font-size:.13rem;
    color:#999;
  }
  .cal-box>div{
    float:right;
    width:1.4rem;
    border:1px solid #dedede;
    height:.35rem;
    margin-bottom:.05rem;
  }
  .cal-box>div>button{
    float:left;
    height:.33rem;
    width:.38rem;
    background:#eee;
    font-weight:bold;
    font-size:.15rem;
    padding-bottom:.02rem;
  }
  .cal-box>div>button.add-up{
    float:right;
  }
  .cal-box>div>input.num-box{
    width:.62rem;
    height:.33rem;
    text-align: center;
  }
</style>
