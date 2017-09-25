<template>
  <div class="main">
    <mt-header fixed title="确认订单">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="order">
      <div class="order-top">
    <!--<router-link class="deliveryAddress" tag="div" :to="{name:'deliveryaddress'}" v-if="defaultAddress">-->
      <div class="deliveryAddress"  v-if="defaultAddress" @click="addtype">
      <ul class="fl deliveryAddress-lr">
        <li class="delivery-people clearfix">
          <span class="fl"><i>收货人：</i>{{defaultAddress.realname}}</span>
          <span class="fr">{{defaultAddress.mobile}}</span>
        </li>
        <li class="deliveryAddress-lr-addr lr1">
          收货地址：{{defaultAddress.province}}{{defaultAddress.city}}{{defaultAddress.area}}{{defaultAddress.address}}
        </li>
      </ul>
      </div>
    <!--</router-link>-->
    <router-link class="noDeliveryAddress" tag="div" :to="{name:'deliveryaddress'}" v-if="!defaultAddress">
      设置收货地址
    </router-link>

    <ul class="goodsList">
      <li>
        <div class="goodsList-tp">
          <i class="iconfont">&#xe6a8;</i>
          {{shopSet.name}}
        </div>
        <div class="goodsList-mids">
          <div class="goodsList-mid clearfix" v-for="v in orderGoods" @click="goProducts(v)">
            <div class="goods-img fl">
              <img :src="v.thumb">
            </div>
            <div class="goods-introduce fl lr3">
              <p>{{v.title}}</p>
              <div class="goods-option">
               规格： {{v.optiontitle}}
              </div>
            </div>
            <div class="goods-unitPrice fr">
              <div class="goods-price">
                ¥
                <span class="goods-intPrice">{{v.marketprice | calculatePrice1}}.</span>
                <span class="goods-folatPrice">{{v.marketprice | calculatePrice2}}</span>
              </div>
              <div class="goods-num">X<i>{{v.total}}</i></div>
            </div>
          </div>
        </div>
        <router-link class="deliveryMode bt deflist" tag="div" :to="{name:'deliverymode'}">
          <div class="deliveryMode-lf fl">
            配送方式
          </div>
          <div class="deliveryMode-lr fr">
            {{dispatch.dispatchname}}
          </div>
        </router-link>
        <div class="deliveryMode deflist clearfix">
          <div class="deliveryMode-lf fl">
            给卖家留言:
          </div>
          <div class="deliveryMode-lr fl">
            <input type="text" name="" v-model="remark" placeholder="选填:对本次交易的说明)">
          </div>
        </div>
        <div class="goods-total clearfix">
      				<span class="goods-total-lf">
      					共 {{memberDiscount.total}} 件, 合计：
      				</span>
          <span class="mygoods-price">
						¥
						<span class="goods-intPrice">{{memberDiscount.goodsprice | calculatePrice1}}.</span>
						<span class="goods-folatPrice">{{memberDiscount.goodsprice | calculatePrice2}}</span>
					</span>
        </div>
      </li>
    </ul>
    <ul class="exhibition">
      <li class="clearfix">
        <div class="exhibition-lf fl">
          商品金额
        </div>
        <span class="mygoods-price fr">
					¥
					<span class="goods-intPrice">{{memberDiscount.goodsprice | calculatePrice1}}.</span>
					<span class="goods-folatPrice">{{memberDiscount.goodsprice | calculatePrice2}}</span>
				</span>
      </li>
      <li class="clearfix">
        <div class="exhibition-lf fl">
          +运费
        </div>
        <span class="mygoods-price fr">
					+¥
					<span class="goods-intPrice">{{dispatchesprice | calculatePrice1}}.</span>
					<span class="goods-folatPrice">{{dispatchesprice | calculatePrice2}}</span>
				</span>
      </li>
      <li class="clearfix">
        <div class="exhibition-lf fl">
          -会员折扣(8折)
        </div>
        <span class="mygoods-price fr">
					-¥
					<span class="goods-intPrice">{{memberDiscount.discountprice | calculatePrice1}}.</span>
					<span class="goods-folatPrice">{{memberDiscount.discountprice | calculatePrice2}}</span>
				</span>
      </li>
      <li class="clearfix">
        <div class="exhibition-lf fl">
          优惠券
        </div>
        <span class="mygoods-price fr">
          <input class="coupon" type="number"  placeholder="请输入优惠券" v-model="coupon"/>
				</span>
      </li>
    </ul>
      </div>

    <div class="settlement clearfix">
      <div class="settlement-lf fl">
      			<span class="settlement-item-lf">
      				共
      				<span>
      					{{memberDiscount.total}}
      				</span>
      				件 , 总金额
      			</span>
        <span class="mygoods-price">
					¥
					<span class="goods-intPrice">{{memberDiscount.realprice-coupon + dispatchesprice | calculatePrice1}}.</span>
					<span class="goods-folatPrice">{{memberDiscount.realprice | calculatePrice2}}</span>
				</span>
      </div>

      <button id="commitForm" class="settlement-lr fr" @click="goPay">
        提交订单
      </button>
    </div>
    <!--<transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">-->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
  </div>
</template>
<script>
  import {Header, MessageBox, Toast} from 'mint-ui';
  import {GET_MYADDRESS1, GET_ORDER1, confirm_post, DispatchMoney} from '../../../api/api';
  import {mapMutations, mapState, mapGetters} from 'Vuex';
  //  import _ from 'lodash'
  export default {
    data() {
      return {
        orderGoods: [],
        defaultAddress: '',
        memberDiscount: '',
        dispatches: '',
        dispatchesprice: '',
        remark: '',
        shopSet: '',
        payed: false,
        send:{},
        new:false,
        coupon: 0
      }
    },
    methods: {
      init() {
        let _this = this;
        let params = {
          data: {
            cartids: this.myOrders.cartids || '',
            optionid: this.myOrders.optionid || '',
            total: this.myOrders.total || '',
            goodsid: this.myOrders.goodsid || ''
          }
        };

        // 首次进入，初始化展示内容。
        GET_ORDER1(params, res => {
          if (res.statusCode === 1) {
            _this.orderGoods = res.data.orderGoods
            _this.defaultAddress = res.data.defaultAddress
            _this.memberDiscount = res.data.memberDiscount
            _this.dispatches = res.data.dispatches[0]
            _this.dispatchesprice = res.data.dispatches[0].price
            _this.shopSet = res.data.shopSet
            _this.ADDRESS(res.data.addressLists)
          }
        })
      },
      addtype(){
        this.ADDTYPE(0)
        this.$router.push('deliveryaddress');
      },
      goBack() {
        this.$router.push('home');
      },
      goPay() {
        let _this = this
        let payed = this.payed;
        if (payed === false) {
          this.payed = true;
          let addressid = this.defaultAddress.id || ''
          let goods = ''
          let dispatchid = this.dispatches.id
          let cartids = this.myOrders.cartids
          let remark = this.remark || ''
          if (this.orderGoods) {
            for (let i = 0, j = this.orderGoods.length; i < j; i++) {
              if (i != j - 1) {
                goods += this.orderGoods[i].goodsid + ',' + this.orderGoods[i].optionid  + ',' + this.orderGoods[i].total + '|'
              } else {
                goods += this.orderGoods[i].goodsid + ',' + this.orderGoods[i].optionid  + ',' + this.orderGoods[i].total
              }
            }
          }

          let params = {
            data: {
              goods:goods,
              dispatchid:dispatchid,
              addressid,
              cartids,
              remark,
//              optionid: this.myOrders.optionid || '',

            }
          }

          if (addressid == '') {
            Toast({
              message: `请选择收货地址`,
              position: 'middle',
              duration: 2000
            });
            this.payed = false;
            return;
          }

          confirm_post(params, res => {
            if (res.statusCode == 1) {
              let ordersn = res.data.ordersn
              _this.ORDERINFO(ordersn);

              _this.$router.replace({name: 'payselect', query: {orderid: ordersn}})
            } else if (res.statusCode == -1) {
              Toast({
                message: `操作频繁请稍候`,
                position: 'middle',
                duration: 2000
              });
              this.payed = false;
            }else {
              Toast({
                message: `操作频繁请稍候`,
                position: 'middle',
                duration: 2000
              });
              this.payed = false;
            }
          })
        }


      },
      goProducts(v) {
        let goodsId = v.goodsid;
        this.$router.push({name: 'details', query: {goodsId: goodsId}})
      },
      ...mapMutations([
        'ADDRESS', 'ORDERINFO',
        'ADDTYPE'
      ])
    },

    computed: {
      ...mapState([
        'delivery', 'myOrders'
//        'delivery', 'myOrders'
      ]),
      ...mapGetters([
        'userAddress',
        'defaultAddressIsNull'
      ]),
      dispatch() {
        let dispatch = this.dispatches || this.delivery
        return dispatch || '商家配送'
      }
    },

    filters: {
      calculatePrice1(value) {
        let num = '';
        if (typeof value == 'number') {
          num = Math.floor(value) || 0
        } else if (typeof value == 'string') {
          num = Math.floor(Number(value)) || 0
        } else if (typeof value == 'undefined' ) {
          return
        }
        return num || 0
      },
      calculatePrice2(value) {
        let num = ''
        if (typeof value == 'number') {
          num = value.toFixed(2).toString().split('.')[1]
        }
        if (typeof value == 'string') {
          num = value.split('.')[1] || '00'
        }
        if (typeof value == 'undefined') {
          return
        }
        return num.length == 0 ? num + '00' : num.length == 1 ? num + '0' : num || '00'
      }
    },

    watch: {
      '$route'(to, from) {
        this.payed=false;
        let _this = this;
        if (from.name=='deliveryaddress' && to.name=='confirmorder') {
          this.defaultAddress = this.userAddress;
          _this.dispatches=_this.delivery

          let params = {
            data: {
              cartids: this.myOrders.cartids || '',
              optionid: this.myOrders.optionid || '',
              total: this.myOrders.total || '',
              goodsid: this.myOrders.goodsid || '',
              dispatchid:1,
              addressid: this.defaultAddress.id
            }
          }
          DispatchMoney(params, res => {
            if (res.statusCode === 1) {
              _this.dispatchesprice = res.data.dispatches.price
              _this.payed = false;
            }
          });
        }
        if (this.$route.query.addressListsLength === 0) {
          this.defaultAddress = '';
        }
      },

    },
    created() {
      this.init();
    }
  }
</script>
<style scoped>
  @import '../../../assets/css/fonts/iconfont.css';
  @import '../../../assets/css/reset/reset.css';

  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
    overflow: auto;
    z-index: 30
  }

  .order {
    position: relative;
    /*top:.45rem;*/
    width: 100%;
    /*bottom: .45rem;*/
    overflow: hidden;

    height: 100%;
  }
  .order-top {
    width: 100%;
    height: 92.5%;
    overflow-y: scroll;
  }


  .header {
    font-size: 0.16rem;
    height: 0.44rem;
  }

  .deliveryAddress {
    padding: 0.15rem;
    /*   height: 1rem;*/
    margin-top: 0.64rem;
    background: #fff;
    position: relative;
    overflow: hidden;
    /*margin-top: .1rem;*/
  }

  .delivery-people {
    overflow: hidden
  }

  .delivery-people span i {
    color: #333;
    font-size: 0.15rem;
  }

  .deliveryAddress:after {
    content: '';
    position: absolute;
    width: 0.065rem;
    height: 0.12rem;
    top: 0.295rem;
    right: 0.1rem;
    background: url('../../../assets/images/userinfo-01.png') no-repeat center center;
    background-size: cover;
  }

  .deliveryAddress-lf {
    width: 10%;
    font-size: 0.18rem;
    position: absolute;
    top: 50%;
    left: 0.1rem;
    margin-top: -0.1rem;
  }

  .deliveryAddress-lr {
    width: 90%;
    font-size: 0.14rem;
    text-align: left;
    color: #666;
  }

  .deliveryAddress-lr-addr {
    line-height: 0.22rem;
    font-size: 0.12rem;
  }

  .goods-price {
    color: #F5751D;
    font-size: 0.12rem;
  }

  .goods-intPrice {
    font-size: 0.2rem;
  }

  .goods-folatPrice {
    font-size: 0.12rem;
  }

  .goods-num {
    font-size: 0.12rem;
    text-align: right;
    color: #666;
  }

  .goods-num i {
    font-size: 0.14rem
  }

  .goodsList {
    margin-top: 0.10rem;
  }

  .goodsList li {
    background: #fff;
    margin-bottom: 0.1rem;
  }

  .goodsList-tp {
    padding: 0.15rem 0.1rem;
    font-size: 0.14rem;
    text-align: left;
    color: #666;
  }

  .goodsList-tp i {
    font-size: 0.18rem;
  }

  .goodsList-mid {
    height: 0.7rem;
    padding: 0.1rem;
    background: #fafafa;
  }

  .goods-img {
    width: 0.50rem;
    height: 0.50rem;
  }

  .goods-img img {
    display: block;
    width: 100%;
  }

  .goods-unitPrice {

  }

  .goods-introduce {
    width: 1.90rem;
    font-size: 0.12rem;
    color: #666;
    text-align: left;
    margin-left: 0.1rem;
  }
  .goods-introduce p {
    width: 1.90rem;
    font-size: 0.12rem;
    color: #666;
    text-align: left;
  }
  .goods-introduce .goods-option{
    width: 1.90rem;
    font-size: 0.1rem;
    color: #999;
    text-align: left;
    height: .16rem;
  }

  .deflist {
    height: 0.46rem;
    line-height: 0.46rem;
    color: #999;
    font-size: 0.14rem;
    position: relative;
    overflow: hidden;
  }

  .deflist:after {
    content: '';
    position: absolute;
    width: 0.065rem;
    height: 0.12rem;
    top: 0.17rem;
    right: 0rem;
    background: url('../../../assets/images/userinfo-01.png') no-repeat center center;
    background-size: cover;
  }

  .deliveryMode-lr {
    margin-right: 0.2rem;
    font-size: 0.14rem;
    color: #666;
  }

  .deliveryMode {
    width: 3.57rem;
    margin: 0rem 0.1rem;
    border-bottom: 0.01rem solid #E5E5E5;
  }

  .deliveryMode-lf {
    font-size: 0.14rem;
    color: #666;
  }

  .deliveryMode.bt {
    /*border-top: 0.01rem solid #E5E5E5;*/
  }

  .deliveryMode-lr input {
    display: block;
    width: 2.5rem;
    line-height: 0.44rem;
    font-size: 0.14rem;
    color: #333;
    margin-left: 0.1rem;
  }

  .mygoods-price {
    /*height:0.46rem;
        line-height: 0.46rem;*/
    text-align: right;
    font-size: 0.12rem;
    color: #F5751D;
  }

  .goods-total {
    height: 0.46rem;
    line-height: 0.46rem;
    text-align: right;
    font-size: 0.12rem;
    padding: 0rem 0.1rem;
  }

  .goods-total-lf {
    font-size: 0.14rem;
    color: #666;
    font-weight: bolder;
  }

  .settlement {
    /*position: fixed;*/
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    /*top: 92.5%;*/
    /*height: 0.50rem;*/
    padding: 0rem 0rem 0rem 0.1rem;
    border-top: 1px solid #e7e7e7;
    background: #fff;
    /*z-index: 31*/
  }

  .settlement-lf {
    width: 2.50rem;
    height: 0.50rem;
    line-height: 0.50rem;
    font-size: 0.14rem;
    color: #666;
    text-align: right

  }

  .settlement-lr {
    width: 1.10rem;
    height: 0.50rem;
    line-height: 0.50rem;
    font-size: 0.16rem;
    background: #F5751D;
    color: #fff;
    text-align: center;
    outline: none;
  }

  .settlement-item-lf span {
    color: #F5751D;
  }

  .exhibition {
    margin: 0.1rem 0rem 0.6rem 0rem;
    background: #fff;
  }

  .exhibition li {
    height: 0.46rem;
    width: 100%;
    font-size: 0.14rem;
    color: #666;
    padding: 0rem 0.1rem;
  }
  .exhibition li .coupon {
    text-align: right;
    display: block;
    height: .46rem;
    margin-top: -0.1rem;
    /*background-color: red;*/
  }









  .exhibition-lf {
    line-height: 0.46rem;
  }

  .exhibition .mygoods-price {
    margin-top: 0.1rem;
  }

  .goodsList-mids .goods-price {
    font-size: 0.12rem;
    color: #666;
  }

  .goodsList-mids .goods-intPrice {
    font-size: 0.16rem;
  }

  .goodsList-mids .goods-num i {
    font-size: 0.12rem;
  }

  .exhibition .mygoods-price {
    color: #666;
  }

  .exhibition .goods-intPrice {
    font-size: 0.16rem
  }

  .noDeliveryAddress {
    margin-top: 0.55rem;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #646C89;
    padding: 0 0.1rem;
    font-size: 0.14rem;
    color: #fff;
    text-align: left;
    position: relative;
    /*margin-top: .1rem;*/
  }

  .noDeliveryAddress:after {
    content: '';
    position: absolute;
    width: 0.065rem;
    height: 0.12rem;
    top: 0.19rem;
    right: 0.1rem;
    background: url('../../../assets/images/userinfo-03.png') no-repeat center center;
    background-size: cover;
  }

  .mygoods-price, .goods-price, .goods-num {
    color: red !important;
  }
</style>
