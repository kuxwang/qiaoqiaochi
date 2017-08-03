<template>
  <mt-tab-container v-model="selected" class="orderList" id="content-list">
    <ul class="order-list">
      <li v-for="(v,i) in statusResult.all">
        <div>订单号：{{v.ordersn}}</div>
        <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status,num:v.goods[0].total}}"
                     tag="div">
          <img :src=v.goods[0].thumb alt="" class="order-small">
          <p>{{v.goods[0].title}}</p>
          <div class="good-price">
            <p>{{v.goods[0].marketprice}}</p>
            <p>×{{v.goods[0].total}}</p>
          </div>
        </router-link>
        <div class="good-pay">
          <span>共{{v.goods[0].total}}件商品 实付：</span> ￥{{v.price}}
        </div>
        <div class="good-btn">
          <button class="cancel-order" v-if="v.status==0" @click="cancel(v.id)">
            取消订单
          </button>
          <button class="charge-order ocolor" @click="pay(v.ordersn)" v-if="v.status==0">
            付款
          </button>
          <!--<router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:v.price,orderid:v.id}}" tag="button"   v-if="v.status==1" v-show="v.canrefund||v.refundid==0"> -->
          <router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:v.price,orderid:v.id}}"
                       tag="button" v-if="v.canrefund&&v.refundid==0">
            申请退款
          </router-link>
          <!--<router-link class="charge-order ocolor" :to="{path:'drawbackInfo',query:{money:v.price,orderid:v.id}}" tag="button" v-if="v.canrefund&&v.refundid!=0">-->
          <!--退款申请中-->
          <!--</router-link>-->
          <button class="charge-order1" v-if="v.status==2 && v.refundid==0" @click="fn1(v.id)">
            确认收货
          </button>
          <router-link class="look-logi ocolor"
                       :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button"
                       v-if="v.status==2">
            查看物流
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
    </ul>
    <div class="share-page" v-show="statusShow.all">
      <div class="iconfont">
        &#xe60f;
      </div>
      <p>您还没有相关订单</p>
      <p>赶快去购物吧</p>
      <router-link tag="button" to="/">再逛逛</router-link>
    </div>
  </mt-tab-container>
</template>
<script>
  import {MessageBox, Loadmore, Toast, InfiniteScroll} from 'mint-ui';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {orderList, orderManu} from '../../api/api.js'
  export default {
    data(){
      return {
        statusResult: [],
        page: 1
      }
    },
    props: [],
    methods: {},
    computed: {},
    created(){
      let params = {
        data: {
          page: this.page,
          status: this.statusType
        }
      };
      orderList(params, function (res) {
        console.log(res)
      });
    }
  }
</script>
<style scoped>
  .order-list {
    background: #efefef;
    padding-top: .01rem
  }

  .order-list > li {
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

  .order-list > li > div {
    padding: .12rem 0;
    border-bottom: 1px solid #ddd;
  }

  .good-info {
    height: .75rem;
  }

  .good-info > img {
    float: left;
  }

  .good-info > p {
    float: left;
    margin-left: .08rem;
  }

  .good-price {
    float: right
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

  /*.delete-order{*/
  /*background:#ddd;*/
  /*color:#777 !important;*/
  /*width:.9rem !important;*/
  /*margin-right:.05rem;*/
  /*}*/
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

</style>
