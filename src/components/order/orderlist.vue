<template>
  <ul class="order-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <void-list>
      <li v-for="(v,i) in statusResult">
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
    </void-list>
  </ul>
</template>
<script>
  import {MessageBox, Loadmore, Toast, InfiniteScroll} from 'mint-ui';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {orderList, orderManu} from '../../api/api.js'
  import voidList from './voidlist'
  export default {
    data(){
      return {
        statusResult: [],
        statusType: '',
        page: 1,
        loading: false,
        canReason: '其他原因',
      }
    },
    methods: {
      init (statusType) {
        this.page = 1;
        this.statusType = statusType;
        this.loading = false;
        let params = {
          data: {
            page: this.page,
            status: statusType
          }
        };
        orderList(params, res => {
          if (res.statusCode == 1) {
            this.statusResult = res.data
//            console.log(res)
          }
        });
      },
      loadMore () {
        if (!this.loading) {
            console.log(this.loading+'/')
          this.loading = true;
          let params = {
            data: {
              page: ++this.page,
              status: this.statusType
            }
          };
          setTimeout(() => {
            orderList(params, res => {
              if (res.statusCode == 1) {
                this.statusResult = this.statusResult.concat(res.data);
                this.loading = false;
              } else {
                this.loading = true;
                Toast({
                  message: res.data,
                  position: 'middle',
                  duration: 1000
                });
              }
            });

            this.loading = false;
          }, 2500);
        }
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
        this.$router.push({path: 'payselect', query: {orderid: x}});
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
    created(){
      this.init(this.statusType)
    }
  }
</script>
<style scoped>
  .order-list {
    background: #efefef;
    padding-top: .01rem;
    margin-left: auto;
    margin-right: auto;

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
