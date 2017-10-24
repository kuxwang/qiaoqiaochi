<!--<template>-->
  <!--<ul class="order-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">-->
    <!--<void-list ref="requestStatus">-->
      <!--<li v-for="(v,i) in statusResult">-->
        <!--<div>订单号：{{v.ordersn}}</div>-->
        <!--<router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status}}"-->
                     <!--tag="div">-->
          <!--<img :src=v.goods[0].thumb alt="" class="order-small">-->
          <!--<p>{{v.goods[0].title}}</p>-->
          <!--<div class="good-price">-->
            <!--<p>{{v.goods[0].marketprice}}</p>-->
            <!--<p>×{{v.goods[0].total}}</p>-->
          <!--</div>-->
        <!--</router-link>-->
        <!--<div class="good-pay">-->
          <!--<span>共{{v.goods[0].total}}件商品 实付：</span> ￥{{v.price}}-->
        <!--</div>-->
        <!--<div class="good-btn">-->
          <!--<button class="cancel-order" v-if="v.status==0" @click="cancel(v.id)">-->
            <!--取消订单-->
          <!--</button>-->
          <!--<button class="charge-order ocolor" @click="pay(v.ordersn)" v-if="v.status==0">-->
            <!--付款-->
          <!--</button>-->
          <!--<router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:v.price,orderid:v.id}}"-->
                       <!--tag="button" v-if="v.canrefund&&v.refundid==0">-->
            <!--申请退款-->
          <!--</router-link>-->
          <!--<button class="charge-order1" v-if="v.status==2 && v.refundid==0" @click="fn1(v.id)">-->
            <!--确认收货-->
          <!--</button>-->
          <!--<router-link class="look-logi ocolor"-->
                       <!--:to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button"-->
                       <!--v-if="v.status==2">-->
            <!--查看物流-->
          <!--</router-link>-->
          <!--<button class="charge-order ocolor" v-if="v.canrefund && v.refundid!=0 && v.status!=0"-->
                  <!--@click="refund(v.refundid)">-->
            <!--退款申请中-->
          <!--</button>-->
          <!--<router-link class="look-logi ocolor"-->
                       <!--:to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button"-->
                       <!--v-if="v.status==3">-->
            <!--查看物流-->
          <!--</router-link>-->
        <!--</div>-->
      <!--</li>-->
      <!--<p class="page-infinite-loading" v-if="loading&&isloading">-->
        <!--<span>-->
          <!--<div class="mint-spinner-fading-circle circle-color-112" style="width: 28px; height: 28px;">-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle2"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle3"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle4"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle5"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle6"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle7"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle8"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle9"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle10"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle11"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle12"></div>-->
            <!--<div class="mint-spinner-fading-circle-circle is-circle13"></div>-->
          <!--</div>-->
        <!--</span>-->
        <!--加载中...-->
      <!--</p>-->
    <!--</void-list>-->
  <!--</ul>-->
<!--</template>-->


<template>
  <ul class="order-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
    <void-list ref="requestStatus">
      <li v-for="(v,i) in statusResult">
        <div>订单号：{{v.ordersn}}</div>
        <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status}}" v-for=" (s,index) in v.goods"
                     :key="index" tag="div">
          <img :src=s.thumb alt="" class="order-small">
          <p>{{s.title}}</p>
          <div class="good-price">
            <p>{{s.marketprice}}</p>
            <p>×{{s.total}}</p>
          </div>
        </router-link>
        <div class="good-pay">
          <span>共{{v.goods.length}}件商品 实付：</span> ￥{{v.price}}
        </div>
        <div class="good-btn">
          <button class="cancel-order" v-if="v.status==0" @click="cancel(v.id)">
            取消订单
          </button>
          <!--  <button class="charge-order ocolor" @click="pay(v.ordersn)" v-if="v.status==0">
              付款
            </button>
  -->

          <router-link class="charge-order ocolor" :to="{name: 'orderpay', query: {orderid: v.ordersn}}"
                       tag="button" v-if="v.status==0">
            付款
          </router-link>




          <router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:v.price,orderid:v.id}}"
                       tag="button" v-if="v.canrefund&&v.refundid==0">
            申请退款
          </router-link>
          <button class="charge-order1" v-if="v.status==2 && v.refundid==0" @click="fn1(v.id)">
            确认收货
          </button>
          <router-link class="look-logi ocolor"
                       :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button"
                       v-if="v.status==2">
            查看物流
          </router-link>

          <router-link class="look-logi ocolor"
                       :to="{path:'comment',query:{id:v.id }}" tag="button"
                       v-if="v.status==3">
            评价
          </router-link>

          <button class="charge-order ocolor" v-if="v.canrefund && v.refundid!=0 && v.status!=0"
                  @click="refund(v.refundid)">
            退款申请中
          </button>
          <router-link class="look-logi ocolor"
                       :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button"
                       v-if="v.status==3">
            查看物流
          </router-link>
        </div>
      </li>
      <p class="page-infinite-loading" v-if="loading&&isloading">
        <span>
          <div class="mint-spinner-fading-circle circle-color-112" style="width: 28px; height: 28px;">
            <div class="mint-spinner-fading-circle-circle is-circle2"></div>
            <div class="mint-spinner-fading-circle-circle is-circle3"></div>
            <div class="mint-spinner-fading-circle-circle is-circle4"></div>
            <div class="mint-spinner-fading-circle-circle is-circle5"></div>
            <div class="mint-spinner-fading-circle-circle is-circle6"></div>
            <div class="mint-spinner-fading-circle-circle is-circle7"></div>
            <div class="mint-spinner-fading-circle-circle is-circle8"></div>
            <div class="mint-spinner-fading-circle-circle is-circle9"></div>
            <div class="mint-spinner-fading-circle-circle is-circle10"></div>
            <div class="mint-spinner-fading-circle-circle is-circle11"></div>
            <div class="mint-spinner-fading-circle-circle is-circle12"></div>
            <div class="mint-spinner-fading-circle-circle is-circle13"></div>
          </div>
        </span>
        加载中...
      </p>
    </void-list>
  </ul>
</template>
<script>
  import {MessageBox, Loadmore, Toast, InfiniteScroll} from 'mint-ui';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {orderList, orderManu} from '../../../api/api.js'
  import voidList from './voidlist'

  export default {
    data(){
      return {
        statusResult: [],
        statusType: '',
        page: 1,
        loading: true,
        canReason: '其他原因',
        isloading: true,
        psize:5
      }
    },
    methods: {
      init (statusType) {
        this.page = 1;
        this.statusType = statusType;
        this.loading = false;
//        this.this.statusResult = [];
//        this.$refs.requestStatus.loadingStatus = 1
        this.$refs.requestStatus.loadingStatus = 1
        let params = {
          data: {
            page: this.page,
            status: statusType,
            psize:this.psize
          }
        };

        console.log('orderdetail running')

        orderList(params, res => {

            console.log(res)
            if (res.statusCode == 1) {
              this.statusResult = res.data
              this.isloading=false;
              console.log(this.statusResult)
            } else {
              this.statusResult = []
//              this.loading = true
              this.$refs.requestStatus.loadingStatus = this.statusResult ? 1 : 0
            }
          });
//        }, 5000)
//        orderList(params, res => {
//          console.log(res)
//          if (res.statusCode == 1) {
//            this.statusResult = res.data
//            console.log(this.statusResult)
//
//          } else {
//            this.statusResult = []
//            this.$refs.requestStatus.loadingStatus = this.statusResult ? 1 : 0
//
//          }
//        });
      },
      loadMore () {
//        console.log(123)
//        console.log(this.loading)
        this.loading = true;
        let params = {
          data: {
            page: ++this.page,
            status: this.statusType,
            psize:this.psize
          }
        };
        orderList(params, res => {
            console.log(this.loading)
          if (res.statusCode == 1) {
//                console.
              if(res.data != ''){
                this.statusResult = this.statusResult.concat(res.data);
                setTimeout(() => {
                  this.loading = false;
                }, 1000)
              }else{
                this.loading = true;
              }


          } else {
            this.isloading = false
            this.loading = true;
//              Toast({
//                message: res.data,
//                position: 'middle',
//                duration: 1000
//              });
          }
        });
//        }
      },
      cancel: function (orderid) {
        MessageBox({title: '确定取消订单吗?', message: '点击确认取消', showCancelButton: true}).then(action => {
          if (action == 'confirm') {//表示点击了确定
            this.isSelect = !this.isSelect;
            let that = this;
            let params = {
              data: {
                orderid: orderid,
                type: 'canl',
                reason: that.canReason
              }
            }
            orderManu(params, function (res) {
              if (res.statusCode == 1) {
                for (let i = 0; i < that.statusResult.length; i++) {
                  if (that.statusResult[i].id === orderid) {
                    that.statusResult.splice(i, 1);
                    break;
                  }
                }
              } else {
                Toast({
                  message: res.data,
                  position: 'middle',
                  duration: 1000
                });

                that.init(that.statusType);
              }
            })
          } else if (action == 'cancel') {//表示点击了取消
          }
        })
      },
      pay(x){
//        this.orderinfo(x);
        this.$router.push({name: 'orderpayselect', query: {orderid: x}});
      },
      refund: function (refundid) {
        this.$router.push({name: 'drawbackInfo', query: {refundid: refundid}});
      },
      fn1: function (orderid) {
        this.$router.push({path: '/orderd', query: {oid: orderid, sta: 2}});
      },
    },

    computed: {},
    components: {
      voidList
    },
    mounted(){
      this.init(this.statusType)

    },

    created(){
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .order-list {
    background: #efefef;
    padding-top: .01rem;
    margin-left: auto;
    margin-right: auto;
    /*margin-bottom: .8rem;*/
    /*overflow: scroll;*/
  }

  .order-list li {
    margin-top: .09rem;
    background: #fff;
    text-align: left;
    padding: 0 .12rem;
  }

  .order-small {
    width: .5rem;
    height: .5rem;
    border: 1px solid #ddd;
  }

  .order-list li > div {
    padding: .12rem 0;
    border-bottom: 1px solid #ddd;
  }

  .good-info {
    height: .75rem;
    display: flex;
  }

  .good-info > img {
    display: block;
  }

  .good-info > p {
    margin-left: .08rem;
    margin-right: .08rem;
    flex: 1;
    .text-overflow(2);
    overflow: hidden;
  }

  .good-price {
    max-width: .68rem;
  }

  .good-price > p {
    text-align: right;
    margin-bottom: .02rem;
  }

  .good-pay {
    text-align: right;
    color: #666;
  }

  .good-pay > span {
    color: #999;
  }

  div.good-btn {
    text-align: right;
    padding: .08rem 0 !important;
    border-bottom: none !important;
  }

  .good-btn > button {
    width: .9rem;
    height: .3rem;
    border: none;
    outline: none;
    color: #fff;
    border-radius: .03rem;
    font-size: .14rem;
  }

  .look-logi {
    width: .9rem !important;
    margin-right: .05rem;
  }

  .cancel-order {
    background: #ddd;
    color: #777 !important;
    width: .9rem !important;
    margin-right: .05rem;
  }

  .back-money {
    width: .9rem !important;
  }

  .charge-order1 {
    background: #ddd;
    color: #777 !important;
    margin-right: .05rem;
  }

  /*加载*/
  .page-infinite-loading {
    margin-top: .01rem;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #fff;
  }

  .page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }


  .mint-spinner-fading-circle-circle.is-circle2:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle4:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle5:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle6:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle7:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle8:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle9:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle10:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle11:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle12:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .mint-spinner-fading-circle-circle.is-circle13:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  /*.mint-spinner-fading-circle-circle.is-circle2 {*/
  /*-webkit-transform: rotate(30deg);*/
  /*transform: rotate(30deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle3 {*/
  /*-webkit-transform: rotate(60deg);*/
  /*transform: rotate(60deg)*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle4 {*/
  /*-webkit-transform: rotate(90deg);*/
  /*transform: rotate(90deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle5 {*/
  /*-webkit-transform: rotate(120deg);*/
  /*transform: rotate(120deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle6 {*/
  /*-webkit-transform: rotate(150deg);*/
  /*transform: rotate(150deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle7 {*/
  /*-webkit-transform: rotate(180deg);*/
  /*transform: rotate(180deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle8 {*/
  /*-webkit-transform: rotate(210deg);*/
  /*transform: rotate(210deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle9 {*/
  /*-webkit-transform: rotate(240deg);*/
  /*transform: rotate(240deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle10 {*/
  /*-webkit-transform: rotate(270deg);*/
  /*transform: rotate(270deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle11 {*/
  /*-webkit-transform: rotate(300deg);*/
  /*transform: rotate(300deg);*/
  /*}*/

  /*.mint-spinner-fading-circle-circle.is-circle12 {*/
  /*-webkit-transform: rotate(330deg);*/
  /*transform: rotate(330deg);*/
  /*}*/

  /*.page-infinite-loading div {*/
  /*display: inline-block;*/
  /*vertical-align: middle;*/
  /*margin-right: 5px;*/
  /*}*/
</style>
