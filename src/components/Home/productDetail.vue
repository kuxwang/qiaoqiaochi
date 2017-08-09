<template>
  <transition name="slide">
    <div class="main">
      <mt-header title="商品详情" fixed class="header">
        <router-link to="/" slot="left" class="pro-white">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container">
      <div v-show="isShow">
        <div class="box">
          <div class="img-box">
            <img :src="bandimg" class="content"/>
            <!-- <img v-lazy="bandimg" class="content"/> -->
          </div>
        </div>
        <div class="intro">
          <div class="goodsTitle">
             <p>{{name}}</p>
            <span>￥{{marketPrice}}</span>
          </div>
          <p class="vip-intro" v-show="isVip"><span class="iconfont">&#xe631;</span>您是{{vipname}} 可享{{vipcount}}折优惠</p>
        </div>
      </div>
      <div class="b-intro">
        <div class="bottom-nav">
          图文详情
        </div>
        <div id="intro">
        </div>
      </div>
      </div>
      <div class="bottom-navbar">
        <!-- <router-link class="icon-box" :to="{name:''}"  tag="a">
          <div class="icon-b">
            <div class="iconfont tabIcon">&#xe613;</div>
            收藏
          </div>
        </router-link> -->
        <router-link class="icon-box icon-box-car" :to="{name:'shoppingCart'}"  tag="a">
          <div class="icon-b">
            <div class="iconfont tabIcon icon-car">&#xe607;</div>
            购物车
            <i class="carNum" v-if="delGoodsNum>0">{{goodNums}}</i>
          </div>
        </router-link>
      <!--   <a class="icon-box icon-box-car" @click="goShopCart">
          <div class="icon-b">
            <div class="iconfont tabIcon icon-car">&#xe607;</div>
            购物车
            <i class="carNum" v-if="delGoodsNum>0">{{goodNums}}</i>
          </div>
        </a> -->
        <button class="icon-btn icon-btn-car ocolor" @click="handleClick">
          加入购物车
        </button>
         <button class="icon-btn icon-btn-con" @click="goPay">
          立即购买
        </button>
      </div>
      <mt-popup v-model="popupVisible" position="bottom" modal=true>
        <div class="popup-box">
          <img :src="bandimg" >
          <div class="popup-info">
            <p>￥{{marketPrice}}</p>
            <span>库存：{{total}}件</span>
          </div>
          <div class="cal-box">
            <div>
              <button class="reduce-down" @click="reduce(num)">-</button>
              <input class="num-box" v-model=num />
              <button class="add-up" @click="add">+</button>
            </div>
            <p>购买数量</p>
          </div>
          <button class="confirm ocolor" @click="toast">确认</button>
        </div>
      </mt-popup>
    </div>
  </transition>
</template>
<script>
  import { Header,Popup,Toast} from 'mint-ui';
  import {productDetail,addCart,GET_CARTNUMS} from '../../api/api.js';
  import {setStore, getStore} from '../../config/myUtils';
  import {mapMutations, mapGetters } from 'Vuex';
  export default {
    data(){
      return{
        popupVisible:false,
        isVip:false,
        bandimg:'',
        num:'1',
        name: '',
        marketPrice:0.00,
        vipname:'',
        vipcount:'0.00',
        total:'',
        myStata:'',
        goodNums:'',
        goodsId:'',
        optionId:0,
        cartids:'',
        delGoodsNum:'',
        goodsid:4,
        isShow:false
      }
    },
    methods:{
      handleClick:function () {
        this.popupVisible = true;
        this.myStata=1
      },
      toast:function () {
        if(this.myStata===1){//加入购物车

          this.popupVisible = false;
            let that=this;
            let params={
              data:{
                goodsid:this.goodsid,
                total:this.num
              }
          }
          let _this=this;
          addCart(params,function (res) {
            console.log(_this)
            if(res.statusCode==1){
              let params={};
              let that=_this;
              GET_CARTNUMS(params,function (res) {//获取购物车当前数量
                if(res.statusCode===1){
                  that.delGoodsNum=res.data.cartcount;
                }else{
                  console.log('请求失败')
                }
              })
              Toast({
                message: '操作成功 商品已在购物车',
                position: 'middle',
                duration: 1800
              });
            }else{
              Toast({
                message: '添加失败',
                position: 'bottom',
                duration: 1800
              });
            }
          })
        }else if(this.myStata===2){//立即购买
          let myOrders={
            goodsid:this.goodsId,
            optionid:this.optionId,
            cartids:'',
            total:this.num
          }
          this.getMyorders(myOrders);
          this.$router.push({name:'confirmorder'})
        }
      },
      reduce:function (num) {
        if(num>1){
          this.num--
        }
      },
      add:function () {
        this.num++;
      },
      getInfo:function () {

        let that=this;
        let good_id=this.$route.query.goodsId;
        let params={
          'data':{
            goodsid:good_id,
          }
        }
        productDetail(params,function (res) {
          if(res.statusCode===1){
            that.goodNums=res.data.goodscount;
            let goods=res.data.goods
            that.goodsId=goods.id;
            that.name=goods.title;
            that.marketPrice=goods.marketprice;
            that.bandimg=res.data.pics[0];
            that.total=goods.total;
            that.isShow=true;
            document.getElementById("intro").innerHTML=goods.content;
            if(res.data.level.levelname){
              that.isVip=true;
              that.vipname=res.data.level.levelname;
              that.vipcount=res.data.level.discount;
            };
            let params={};
            let _that=that;
            GET_CARTNUMS(params,function (res) {//获取购物车当前数量
              if(res.statusCode===1){
                _that.delGoodsNum=res.data.cartcount;
              }else{
                console.log('请求失败')
              }
            })
          }else{
            console.log('请求失败')
          }
        })
      },
      goPay(){
        this.myStata=2;
        this.popupVisible = true;
      },
      goShopCart(){
        console.log(888)
      },
      ...mapMutations({
        getMyorders:'GET_MYORDERS'
      })
    },
    beforeRouteLeave (to, from, next) {
      this.popupVisible = false;
      next()
    },
    mounted(){
      this.getInfo();
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  .main {
    /*-webkit-transform: translateZ(0)；*/
    position: fixed;
    /*-webkit-transform: translateZ(0);*/
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:#ececec;
    font-size:.15rem;
    /*overflow:auto;*/
    overflow:hidden;
    z-index:20;
  }
  .mint-header {
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
    padding-bottom: 100%;
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
    text-align: left;
    background: #fff;
    padding:0rem 0.05rem;
  }
  .intro>p{
    font-size: .15rem;
    text-align: left;
    padding-left:.03rem;
  }
  .intro>span{
    font-size:.18rem;
    color:#f01e1f;
  }
  p.vip-intro{
    font-size:.14rem;
    color:#999;
    padding:0.03rem 0rem 0.10rem 0rem;
  }
   .vip-intro span.iconfont{
    font-size: 0.15rem;
   }
  .b-intro{
    margin-top: .1rem;
    background: #fff;
  }
  .bottom-nav{
    padding:.1rem 0;
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
    -webkit-transform: translateZ(0);
    /*border-top: 1px solid #DDDDDD;*/
  }
  .icon-box{
    width:32%;
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
    position: relative;
  }
  .carNum{
    position: absolute;
    top:-0.02rem;
    left:55%;
    display: inline-block;
    background-color: #f23030;
    line-height: 0.1rem;
    font-style: normal;
    border-radius: 8px;
    padding: 0.01rem 0.04rem;
    font-size: 0.08rem;
    color: #fff;
    border:0.01rem solid #fff;
  }
  .iconfont{
    font-size:.19rem;
    margin-top:.03rem;
  }
  .icon-car{
    font-size:.28rem;
    margin-top:.015rem;
    margin-bottom:-.037rem;
  }
  .icon-btn{
    margin:0;
    width:35%;
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
    width:.37rem;
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
  .goodsTitle{
    overflow: hidden;
    border-bottom:0.01rem solid #eee;
    padding-bottom: 0.03rem;
  }
  .goodsTitle p{
    float: left;
    margin-right: 0.05rem;
    font-size: 0.14rem;
  }
  .goodsTitle span{
    float: left;
    font-size: 0.16rem;
    /*font-weight: 700*/
    /*color: #dd2727;*/
  }
  button{
    outline: none;
  }
  .container {
    position: absolute;
    top:0;
    width: 100%;
    overflow: auto;
    /*overflow-y: scroll;*/
    -webkit-overflow-scrolling: touch;
    height: 6.2rem;
    /*overflow-y: scroll;*/

  }
</style>
