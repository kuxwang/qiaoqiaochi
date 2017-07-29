<template>
  <transition name="slide">
  <div class="main order-detail-header">
    <mt-header title="订单详情" class="ocolor myOrderDetail">
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
          <li v-if="status==3">交易完成</li>
          <li v-if="status==0">等待付款</li>
          <li v-if="status==1">等待发货</li>
          <li v-if="status==2">运输中</li>
          <li>订单金额(含运费)：￥{{price}}</li>
          <li>运费：￥{{tranprice}}</li>
        </ul>
      </div>
    </div>
    <div class="buyer-address">
      <div class="iconfont" >
        &#xe621;
      </div>
      <div class="buyer-address-detail">
        <p>收件人：{{relname}}</p>
        {{province}}{{city}}{{area}}{{address}}
      </div>
    </div>
    <div class="product-info-box">
      <div class="pib-header">
        <span class="iconfont">&#xe6ce;</span>
        {{shopname}}
      </div>
      <router-link class="good-info" to="/details" tag="div">
        <img :src=detailurl class="order-small">
        <p>竹享</p>
        <div class="good-price">
          <p>￥99.00</p>
          <p>×{{num}}</p>
        </div>
      </router-link>
      <ul class="pib-list">
        <li>商品金额：<p>￥{{price}}</p></li>
        <li>运费：<p>￥{{tranprice}}</p></li>
        <li>会员折扣：<p>￥{{discount}}</p></li>
        <li>实付费(含运费)：<p>￥{{proprice}}</p></li>
      </ul>
    </div>
    <ul class="trace-info" v-if="status==3">
      <li>订单号：<p>{{ordersin}}</p></li>
      <li v-show="false">交易完成时间：<p>{{endtime}}</p></li>
    </ul>
    <div class="bottom-box">
      <router-link to="/drawbackInfo" class="back-money-ing" tag="button" v-if="">
        退款申请中
      </router-link>
      <button class="cancel-order" @click="fn1" v-if="status==0">
        取消订单
      </button>
      <router-link class="charge-order ocolor" to="" tag="button" v-if="status==0">
        付款
      </router-link>
      <router-link class="charge-order ocolor" to="/drawback" tag="button" v-if="status==1">
        申请退款
      </router-link>
      <router-link class="charge-order1" to="" tag="button" v-if="status==2">
        确认收货
      </router-link>
      <router-link class="look-logi ocolor" to="/logistics" tag="button" v-if="status==2">
        查看物流
      </router-link>
      <router-link class="charge-order1 " to="/drawback" tag="button" v-if="status==3">
        申请退款
      </router-link>
      <router-link class="look-logi ocolor" to="/logistics" tag="button" v-if="status==3">
        查看物流
      </router-link>
    </div>
    <router-view></router-view>
  </div>
  </transition>
</template>
<script>
  import { Header} from 'mint-ui'
  import PageNavbar from "../../view/Order.vue";
  import {orderDetail} from "../../api/api.js"
  export default {
    components: {PageNavbar},
    data(){
      return{
        status:'',
        price:'0.00',
        tranprice:'0.00',
        relname:'',
        province:'',
        city:'',
        area:'',
        address:'',
        shopname:'',
        detailurl:'',
        proprice:'0.00',
        realprice:'',
        num:'',
        ordersin:'',
        endtime:''
      }
    },
    methods:{
      goBack:function () {
        this.$router.go(-1)
      },
    },
    created:function () {
      var that=this;
      this.status=that.$route.query.sta;
      this.num=that.$route.query.num;
      let params={
        data:{
          orderid:this.$route.query.oid
        }
      }
      orderDetail(params,function (res) {
        console.log(res)
        that.price=res.data.order.goodsprice;
        that.tranprice=res.data.dispatchprice;
        that.relname=res.data.address.realname;
        that.province=res.data.address.province;
        that.city=res.data.address.city;
        that.area=res.data.address.area;
        that.address=res.data.address.address;
        that.shopname=res.data.set.name;
        that.detailurl=res.data.goods.thumb;
        that.discount=res.data.discountprice;
        that.proprice=res.data.price;
        that.realprice=res.data.price;
        that.ordersin=res.data.ordersn;
        that.endtime=res.data.finishtime
      })
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
  .mint-header{
    border-bottom:none;
    color:#fff;
  }
  .mint-header a{
    color:#fff;
  }
  .mint-header-title{
    color:#fff;
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
    margin-bottom:.1rem;
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
  .cacel-order{
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
