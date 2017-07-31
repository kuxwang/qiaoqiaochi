<template>
  <!--<transition name="slide">-->
  <div class="main ">
    <mt-header title="订单详情" >
      <a @click="goBack" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="buyer-info">
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
        <p>{{title}}</p>
        <div class="good-price">
          <p>￥{{mprice}}</p>
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
      <router-link to="/drawbackInfo" class="back-money-ing" tag="button" v-if="ing==true">
        退款申请中
      </router-link>
      <button class="cancel-order" @click="cancel(oid)" v-if="status==0">
        取消订单
      </button>
      <router-link class="charge-order ocolor" to="" tag="button" v-if="status==0">
        付款
      </router-link>
      <router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:proprice,orderid:oid}}" tag="button" v-if="status==1">
        申请退款
      </router-link>
      <router-link class="charge-order1" to="" tag="button" v-if="status==2">
        确认收货
      </router-link>
      <router-link class="look-logi ocolor" :to="{path:'logistics',query:{id:oid,exp:exp,expsn:expsn}}" tag="button" v-if="status==2">
        查看物流
      </router-link>
      <router-link class="charge-order1 " :to="{path:'drawback',query:{money:proprice,orderid:oid}}" tag="button" v-if="status==3">
        申请退款
      </router-link>
      <router-link class="look-logi ocolor" :to="{path:'logistics',query:{id:oid,exp:exp,expsn:expsn}}" tag="button" v-if="status==3">
        查看物流
      </router-link>
    </div>
    <router-view></router-view>
  </div>
  <!--</transition>-->
</template>
<script>
  import { Header,MessageBox} from 'mint-ui'
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
        discount:'',
        shopname:'',
        detailurl:'',
        proprice:'0.00',
        realprice:'0.00',
        mprice:'0.00',
        title:'',
        num:'',
        ordersin:'',
        endtime:'',
        exp:'',
        expsn:'',
        oid:'',
        ing:''
      }
    },
    methods:{
      goBack:function () {
        this.$router.go(-1)
      },
      fn1:function () {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        }).then(action=>{
          if(action=='confirm'){

          }else if(action=='cancel'){

          }
        });
      }
    },
    created:function () {
      var that=this;
      this.status=that.$route.query.sta;
      this.oid=this.$route.query.oid;
      this.ing=this.$route.query.ing;
      console.log(this.ing)
      let params={
        data:{
          orderid:this.oid
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
        that.endtime=res.data.finishtime;
        that.mprice=res.data.goods.price;
        that.title=res.data.goods.title;
        that.num=res.data.goods.total;
       that.exp=res.data.express;
       that.expsn=res.data.expresssn
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
  .order-detail-header .mint-header {
    height:.45rem;
  }
  .order-detail-header .mint-header h1{
    color:#252525;
  }
  .buyer-info{
    height:.8rem;
    width:100%;
    margin-bottom: .1rem;
  }
  .buyer-info-box{
    height:.8rem;
    width:100%;
    position:relative;
    background: #fff;
  }
  .buyer-info-box>div.iconfont{
    position:absolute;
    left:.05rem;
    top:.18rem;
    font-size:.35rem;
  }
  .order-state{
    position:absolute;
    left:.48rem;
    top:.1rem;
  }
  .order-state li{
    text-align: left;
    /*color:#fff;*/
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
    background:#dd2727;
    color:#fff;
    border-radius:.03rem;
  }
  .back-money-ing{
    background:#ff771b;
    margin-right:.05rem;
  }
</style>
