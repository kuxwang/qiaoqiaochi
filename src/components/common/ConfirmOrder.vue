<template>
  <div class="main">
    <mt-header fixed title="确认订单">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container">
    <router-link class="deliveryAddress" tag="div" :to="{name:'deliveryaddress'}" v-if="defaultAddress">
      <ul class="fl deliveryAddress-lr">
        <li class="delivery-people clearfix">
          <span class="fl"><i>收货人：</i>{{defaultAddress.realname}}</span>
          <span class="fr">{{defaultAddress.mobile}}</span>
        </li>
        <li class="delive
        ryAddress-lr-addr lr1">
          收货地址：{{defaultAddress.province}}{{defaultAddress.city}}{{defaultAddress.area}}{{defaultAddress.address}}
        </li>
      </ul>
    </router-link>
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
              <!--<img src="../../assets/images/confirmorder-01.jpg">-->
            </div>
            <div class="goods-introduce fl lr3">
              {{v.title}}
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
					<span class="goods-intPrice">{{dispatches.price | calculatePrice1}}.</span>
					<span class="goods-folatPrice">{{dispatches.price | calculatePrice2}}</span>
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
    </ul>
    </div>

    <div class="settlement clearfix">
      <div class="settlement-lf">
      			<span class="settlement-item-lf">
      				共
      				<span>
      					{{memberDiscount.total}}
      				</span>
      				件 , 总金额
      			</span>
        <span class="mygoods-price">
					¥
					<span class="goods-intPrice">{{memberDiscount.realprice + dispatches.price | calculatePrice1}}.</span>
					<span class="goods-folatPrice">{{memberDiscount.realprice | calculatePrice2}}</span>
				</span>
      </div>

      <button id="commitForm" class="settlement-lr" @click="goPay">
        提交订单
      </button>
    </div>
    <!--<transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">-->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import {Header, MessageBox, Toast} from 'mint-ui';
  import {GET_MYADDRESS1, GET_ORDER1, confirm_post, DispatchMoney} from '../../api/api';
  import {mapMutations, mapState, mapGetters} from 'Vuex';
  //  import _ from 'lodash'
  export default {
    data() {
      return {
        orderGoods: [],
        defaultAddress: '',
        memberDiscount: '',
        dispatches: '',
        remark: '',
        shopSet: '',
        payed: false,
      }
    },
    methods: {
      init() {
        console.log('init run.');
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
          console.log('get_order1 res :');
          console.log(res);

          if (res.statusCode === 1) {
            _this.orderGoods = res.data.orderGoods
            _this.defaultAddress = res.data.defaultAddress
            _this.memberDiscount = res.data.memberDiscount
            _this.dispatches = res.data.dispatches[0]
            _this.shopSet = res.data.shopSet
            _this.ADDRESS(res.data.addressLists)
//            console.log(_this.defaultAddress)
          }
        })
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
          let dispatchid = this.dispatch.id
          let cartids = this.myOrders.cartids
          let remark = this.remark || '123'
          if (this.orderGoods) {
            for (let i = 0, j = this.orderGoods.length; i < j; i++) {
              console.log(this.orderGoods)
              if (i != j - 1) {
                goods = this.orderGoods[i].goodsid + ',' + '0' + ',' + this.orderGoods[i].total + '|'
              } else {
                goods = this.orderGoods[i].goodsid + ',' + '0' + ',' + this.orderGoods[i].total
              }
            }
          }

          let params = {
            data: {
              goods,
              dispatchid:1,
              addressid,
              cartids,
              remark,
            }
          }

          if (addressid == '') {
            Toast({
              message: `请选择收货地址`,
              position: 'middle',
              duration: 2000
            });
            this.payed = false;
          }

          confirm_post(params, res => {
            if (res.statusCode == 1) {
              let ordersn = res.data.ordersn
              // document.getElementById('commitForm').setAttribute('disabled', 'disabled')
              /*Toast({
               message: '订单提交成功',
               position: 'middle',
               duration: 2000
               });*/
              _this.ORDERINFO(ordersn);

              // setTimeout(() => {
              // document.getElementById('commitForm').removeAttribute('disabled')
              _this.$router.replace({name: 'payselect', query: {orderid: ordersn}})
              // }, 2000)
            } else if (res.statusCode == -1) {
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
        'ADDRESS', 'ORDERINFO'
      ])
    },
    computed: {
      ...mapState([
        'delivery', 'myOrders'
//        'delivery', 'myOrders'
      ]),
      ...mapGetters([
        'userAddress',
        'isNull',
        'defaultAddressIsNull'
      ]),
      dispatch() {
        let dispatch = this.dispatches || this.delivery
        return dispatch || '商家配送'
      }
    },


//    beforeRouteUpdate(to, from, next) {
////      console.log(to)
//      console.log('from:');
//      console.log(from);
//
//      let _this = this;
//
//      console.log('this:');
//      console.log(_this);
//
//      this.payed = false;
//      var myaddres = '';
////      setTimeout(() => {
////
////        if (from.name === 'deliveryaddress' && _this.isNull === true) {
////
////          if (this.defaultAddressIsNull == 0) {
////            console.log('add running.');
//////            this.defaultAddress = '';
////          } else {
////            if (!_this.userAddress.city) {
////              console.log('jinlail');
//////              console.log(_this.userAddress);
//////            myaddres = _this.userAddress.id;
//////          _this.defaultAddress = _this.userAddress;
////              _this.init()
////            }
////          }
////
////
////        }
////        else if (from.name === 'deliveryaddress' && this.isNull === false) {
////
//////          if(!_this.userAddress){
//////            myaddres = _this.userAddress.id;
//////            _this.defaultAddress = _this.userAddress;
//////          }
////
////          myaddres = _this.userAddress.id;
////          _this.defaultAddress = _this.userAddress;
////
////          console.log('_this.defaultAddress');
////          console.log(_this.defaultAddress);
////
////
////        } else if (from.name === 'addaddress') {
////          myaddres = this.defaultAddress.id
////        }
////        /* if(to.name === 'manageAddress'){
////           next({  path: '/qrCode'})
////         }*/
////        let params = {
////          data: {
////            optionid: this.myOrders.optionid || '',
////            total: this.myOrders.total || '',
////            goodsid: this.myOrders.goodsid || '',
////            dispatchid: 1,
////            addressid: myaddres
////          }
////        }
////        DispatchMoney(params, res => {
////          if (res.statusCode === 1) {
////            _this.orderGoods = res.data.orderGoods
////            _this.defaultAddress = res.data.defaultAddress
////            _this.memberDiscount = res.data.memberDiscount
////            _this.dispatches = res.data.dispatches
////            _this.shopSet = res.data.shopSet
////            _this.ADDRESS(res.data.addressLists)
////          }
////        });
////        next()
////      }, 100)
//
//
//    },
    filters: {
      calculatePrice1(value) {
        let num = '';
        if (typeof value === 'number') {
          num = Math.floor(value) || 0
        } else if (typeof value === 'string') {
          num = Math.floor(Number(value)) || 0
        }
        return num || 0
      },
      calculatePrice2(value) {
        let num = ''
        if (typeof value == 'number') {
          num = value.toFixed(2).toString().split('.')[1]
        }
        if (typeof value == 'string') {
          num = value.split('.')[1]
        }
        return num.length == 0 ? num + '00' : num.length == 1 ? num + '0' : num || '00'
      }
    },
    watch: {
      '$route'(to, from) {
        let _this = this;
        _this.payed = false
        console.log('route run.');
        console.log(this.userAddress);
        if (this.$route.query.type) {
          console.log(this.userAddress);
          this.defaultAddress = this.userAddress;
          console.log(this.defaultAddress);


          let params = {
            data: {
              cartids: this.myOrders.cartids || '',
              optionid: this.myOrders.optionid || '',
              total: this.myOrders.total || '',
              goodsid: this.myOrders.goodsid || '',
//              dispatchid: 1,
              dispatchid:1,
              addressid: this.defaultAddress.id
            }
          }


          DispatchMoney(params, res => {
            console.log('DispatchMoney 391');
            console.log(res);

            if (res.statusCode === 1) {
//              _this.orderGoods = res.data.orderGoods
//              _this.defaultAddress = res.data.defaultAddress
//              _this.memberDiscount = res.data.memberDiscount
              _this.dispatches = res.data.dispatches
//              _this.shopSet = res.data.shopSet
//              _this.ADDRESS(res.data.addressLists)
              _this.payed = false;
            }
          });

        }

        if (this.$route.query.addressListsLength === 0) {
          console.log(this.userAddress);
          this.defaultAddress = '';
          console.log(this.defaultAddress)

        }



        console.log(this.userAddress);

//        this.defaultAddress = this.userAddress
      },
//      remark: function (newValue) {
//        if (newValue.length > 0) {
//
//        }
//      }


    },
    mounted() {
    },
    updated() {
//      this.init();
    },
    activated() {
      this.payed = false;
      console.log('activated run.');
      this.init();
    },
    created() {
      console.log('created run.');
      this.init();
      this.payed = false
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
    overflow: auto;
    z-index: 30;
    display: flex;
    flex-direction: column;
  }

  .header {
    font-size: 0.16rem;
    height: 0.44rem;
  }

  .deliveryAddress {
    padding: 0.15rem;
    /*   height: 1rem;*/
    /*margin-top: 0.54rem;*/
    background: #fff;
    position: relative;
    overflow: hidden
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
    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
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
    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
    background-size: cover;
  }

  .deliveryMode-lr {
    margin-right: 0.2rem;
    font-size: 0.14rem;
    color: #666;
  }

  .deliveryMode {
    width: 95.2%;
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
    height: 0.50rem;
    border-top: 1px solid #e7e7e7;
    background: #fff;
    z-index: 50;
    display: flex;
  }

  .settlement-lf {
    width: 2.50rem;
    height: 0.50rem;
    line-height: 0.50rem;
    font-size: 0.14rem;
    color: #666;
    text-align: right;
    flex: 1;
    padding-right: .1rem;
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


  /*.settlement {
    !*position: fixed;*!
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    !*top: 92.5%;*!
    !*height: 0.50rem;*!
    padding: 0rem 0rem 0rem 0.1rem;
    border-top: 1px solid #e7e7e7;
    background: #fff;
    !*z-index: 31*!
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
*/







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
    /*margin-top: 0.55rem;*/
    height: 0.5rem;
    line-height: 0.5rem;
    background: #646C89;
    padding: 0 0.1rem;
    font-size: 0.14rem;
    color: #fff;
    text-align: left;
    position: relative;
  }

  .noDeliveryAddress:after {
    content: '';
    position: absolute;
    width: 0.065rem;
    height: 0.12rem;
    top: 0.19rem;
    right: 0.1rem;
    background: url('../../assets/images/userinfo-03.png') no-repeat center center;
    background-size: cover;
  }

  .mygoods-price, .goods-price, .goods-num {
    color: red !important;
  }

  .container {
    /*position: absolute;*/
    width: 100%;
    margin-top: .55rem;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
  }


</style>
