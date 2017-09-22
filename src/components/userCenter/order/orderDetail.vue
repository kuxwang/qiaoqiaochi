<template>
  <!--<transition name="slide">-->
  <div class="main ">
    <mt-header title="订单详情">
      <a @click=goBack slot="left" class="router-link-active">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="context">
      <div class="buyer-info">
        <div class="buyer-info-box">
          <div class="iconfont">
            &#xe66f;
          </div>
          <ul class="order-state">
            <li v-if="orderStatus==3 && refundid==0">交易完成</li>
            <li v-if="orderStatus==0">等待付款</li>
            <li v-if="orderStatus==1&&refundid==0">等待发货</li>
            <li v-if="orderStatus==1&&refundid!=0">退款申请中</li>
            <li v-if="orderStatus==3&&refundid!=0">退款申请中</li>
            <li v-if="orderStatus==2">运输中</li>
            <li>订单金额(含运费)：￥{{proprice}}</li>
            <li>运费：￥{{tranprice}}</li>
          </ul>
        </div>
      </div>
      <div class="buyer-address">
        <div class="iconfont">
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
        <!--<router-link class="good-info" v-for="(s.i) in goodlist" :to="{path:'details',query:{goodsId:goodsid}}" tag="div" >-->
        <router-link class="good-info" v-for="(s,i) in goodlist" :to="{path:'details',query:{goodsId: 1}}" tag="div" :key="i">
          <img :src="s.thumb" class="order-small">
          <p>{{s.title}}</p>
          <div class="good-price">
            <p>￥{{s.marketprice}}</p>
            <p>×{{s.total}}</p>
          </div>
        </router-link>
        <ul class="pib-list">
          <li>商品金额：<p>￥{{price}}</p></li>
          <li>运费：<p>￥{{tranprice}}</p></li>
          <li>会员折扣：<p>￥{{discount}}</p></li>
          <li>实付费(含运费)：<p>￥{{proprice}}</p></li>
        </ul>
      </div>
      <ul class="trace-info" v-if="orderStatus==3">
        <li>订单号：<p>{{ordersin}}</p></li>
        <li v-show="false">交易完成时间：<p>{{endtime}}</p></li>
      </ul>
    </div>
    <div class="bottom-box">
      <button class="cancel-order" @click="cancel(oid)" v-if="orderStatus==0">
        取消订单
      </button>
      <button class="charge-order ocolor" @click="pay(ordersin)" v-if="orderStatus==0">
        付款
      </button>
      <router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:proprice,orderid:oid}}" tag="button"
                   v-if="obj.canrefund&&obj.refundid==0">
        申请退款
      </router-link>
      <button class="charge-order1" v-if="orderStatus==2&&obj.refundid==0" @click="fn1(oid)">
        确认收货
      </button>
      <router-link class="look-logi ocolor" :to="{path:'logistics',query:{id:oid,exp:exp,expsn:expsn}}" tag="button"
                   v-if="orderStatus==2">
        查看物流
      </router-link>
      <router-link class="charge-order1 " :to="{path:'drawback',query:{money:proprice,orderid:oid}}" tag="button"
                   v-if="orderStatus==3 && obj.canrefund&&obj.refundid==0">
        申请退款
      </router-link>
      <button class="charge-order ocolor" v-if="obj.canrefund&&refundid!=0&&orderStatus!=0" @click="refund(refundid)">
        退款申请中
      </button>
      <router-link class="look-logi ocolor" :to="{path:'logistics',query:{id:oid,exp:exp,expsn:expsn}}" tag="button"
                   v-if="orderStatus==3">
        查看物流
      </router-link>
    </div>
    <router-view></router-view>
  </div>
  <!--</transition>-->
</template>
<script>
  import {Header, MessageBox} from 'mint-ui'
  import {orderDetail, orderManu} from "../../../api/api.js"
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    data(){
      return {
        price: '0.00',
        tranprice: '0.00',
        relname: '',
        province: '',
        city: '',
        area: '',
        address: '',
        discount: '',
        shopname: '',
        detailurl: '',
        proprice: '0.00',
        realprice: '0.00',
        mprice: '0.00',
        title: '',
        num: '',
        ordersin: '',
        endtime: '',
        exp: '',
        expsn: '',
        oid: '',
        ing: '',
        obj: '',
        canrefund: '',
        goodsId: '',
        refundid: '',
        myid: '',
        goodsid: '',
        orderStatus: '',
        flush : false,
        goodlist: []
      }
    },
    methods: {
      goBack: function () {
//        this.$router.go(-1)
//        this.$router.push({path:'order'})

        if(this.flush){
          this.$router.push({path:'order', query : {flush : 1}})
        }else{
          this.$router.push({path:'order'})
        }


      },
      refund: function () {
        this.$router.push({name: 'drawbackInfo', query: {refundid: this.myid}})
      },
      fn1: function (orderid) {
        let that = this;
        console.log(orderid)
        MessageBox({
          title: '提示',
          message: '请确定已收货 否则钱财两空哦',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            let params = {
              data: {
                orderid: orderid,
                type: 'comf'
              }
            }
            orderManu(params, function (res) {
              console.log(res)
              if (res.statusCode == 1) {
                that.orderStatus = 3;
                that.flush = true;
//                that.$router.push({name: 'order', query: {flush:1}})
              }
              else {
                MessageBox.alert('确认收货失败了，请返回上一页再次尝试。').then(action => {

                });
              }
            })
          } else if (action == 'cancel') {

          }
        });
      },
      pay(a){
        this.orderinfo(a);
        this.$router.push({path: 'payselect', query: {orderid: this.ordersin}})
      },
      cancel: function (orderid) {
        MessageBox({
          title: '提示',
          message: '确定取消订单吗?',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            this.isSelect = !this.isSelect;
            let that = this;
            let params = {
              data: {
                orderid: orderid,
                type: 'canl'
              }
            }
            orderManu(params, function (res) {
              console.log(res)
              if (res.statusCode == 1) {
//                for(let i=0; i<that.order0.length; i++) {
//                  if(that.order0[i].id ===orderid) {
//                    that.order0.splice(i, 1);
//                    break;
//                  }
//                }
                MessageBox.alert('操作成功').then(action => {
                  that.$router.push({path: 'details', query: {goodsId: that.goodsId}})
                });
              }
            })
          } else if (action == 'cancel') {
          }
        });
      },
      ...mapMutations({
        orderinfo: 'ORDERINFO',
        setorderdetails: 'ORDERDETAILS'
      }),
    },
    beforeRouteEnter (to, from, next) {
      console.log(to)
      let that=this;
      console.log(to.query.oid)
      let params = {
        data:{
          orderid:to.query.oid
        }
      }
      orderDetail(params, function (res) {
        if(res.statusCode==1){
          to.meta.post = res.data
          next(vm => {
            vm.myid = res.data.refundid;
            vm.obj = res.data
            vm.price = res.data.goodsprice;   //商品金额
            vm.tranprice = res.data.dispatchprice;
            vm.relname = res.data.address.realname;
            vm.province = res.data.address.province;
            vm.city = res.data.address.city;
            vm.area = res.data.address.area;
            vm.address = res.data.address.address;
            vm.shopname = res.data.set.name;
            vm.discount = res.data.discountprice;
            vm.proprice = res.data.price;
            vm.realprice = res.data.price;
            vm.ordersin = res.data.ordersn;
            vm.endtime = res.data.finishtime;
            vm.goodlist=res.data.goods;
            vm.exp = res.data.express;
            vm.expsn = res.data.expresssn;
            vm.refundid = res.data.refundid;
            console.log(vm.refundid)
            vm.canrefund = res.data.canrefund;
            vm.orderStatus = res.data.status;
            //订单详情存入vuex（orderdetails）
            vm.setorderdetails(res.data);
          })
        }
        else{
          next(vm => {
            vm.isShow=true;
          })
          console.log('请求失败`${res.statusCode} , ${res.data}` ')
        }
//        if(res.data.errno){
//          that.isShow=true;
//        }
      });
    },
    created:function () {
      this.oid=this.$route.query.oid
    }
  }
</script>
<style scoped>
  .main {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: .15rem;
    overflow: auto;
    z-index: 20;
  }

  .order-detail-header .mint-header {
    height: .45rem;
  }

  .order-detail-header .mint-header h1 {
    color: #252525;
  }

  .buyer-info {
    height: .8rem;
    width: 100%;
    margin-bottom: .1rem;
  }

  .buyer-info-box {
    height: .8rem;
    width: 100%;
    position: relative;
    background: #fff;
  }

  .buyer-info-box > div.iconfont {
    position: absolute;
    left: .05rem;
    top: .18rem;
    font-size: .35rem;
  }

  .order-state {
    position: absolute;
    left: .48rem;
    top: .1rem;
  }

  .order-state li {
    text-align: left;
    /*color:#fff;*/
    font-size: .13rem;
    margin-bottom: .03rem;
  }

  .buyer-address {
    background: #fff;
    padding: .16rem .1rem;
    position: relative;
    height: .75rem;
    margin-bottom: .1rem;
  }

  .buyer-address > div.iconfont {
    position: absolute;
    font-size: .18rem;
    left: .12rem;
    top: .27rem;
  }

  .buyer-address-detail {
    text-align: left;
    font-size: .14rem;
    position: absolute;
    left: .47rem;
  }

  .buyer-address-detail > p {
    margin-bottom: .04rem;
  }

  .product-info-box {
    background: #fff;
    padding: 0 .1rem;
    /*height: 2.35rem;*/
    margin-bottom: .1rem;
  }

  .pib-header {
    text-align: left;
    padding: .08rem .05rem;
    border-bottom: 1px solid #ddd;
  }

  .pib-header > span {
    margin-right: .05rem;
  }

  .good-info {
    height: .7rem;
    padding: .08rem 0;
    border-bottom: 1px solid #ddd;
  }

  .order-small {
    width: .5rem;
    height: .5rem;
    border: 1px solid #ddd;
  }

  .good-info > img {
    float: left;
  }

  .good-info > p {
    float: left;
    margin-left: .08rem;
    font-size: .13rem;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 2.2rem;
    text-align: left;
  }

  .good-price {
    float: right;
    font-size: .13rem;
  }

  .good-price > p {
    text-align: right;
    margin-bottom: .02rem;
  }

  .pib-list {
    padding: .2rem 0;
  }

  .pib-list > li {
    text-align: left;
    font-size: .13rem;
    margin-bottom: .06rem;
  }

  .pib-list > li > p {
    float: right;
  }

  .trace-info {
    background: #fff;
    padding: .08rem .1rem;
    padding-bottom: .06rem;
    font-size: .13rem;
  }

  .trace-info li {
    text-align: left;
    margin-bottom: .08rem;
  }

  .trace-info li p {
    float: right;
  }

  .bottom-box {
    height: .6rem;
    background: #fff;
    border-top: 1px solid #ddd;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  .bottom-box {
    text-align: right;
    padding-right: .15rem;
    padding-top: .1rem;
  }

  .bottom-box > button {
    width: .9rem;
    height: .4rem;
    border: none;
    outline: none;
    background: #dd2727;
    color: #fff;
    border-radius: .03rem;
  }

  .back-money-ing {
    background: #ff771b;
    margin-right: .05rem;
  }
  .context {
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
