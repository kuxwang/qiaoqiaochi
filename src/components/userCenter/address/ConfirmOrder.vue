<template>
  <div class="main">
    <mt-header fixed title="确认订单">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="order">
      <div class="confirmorder-content" v-show="!on1">
        <div class="order-top">
          <!-- 没有默认地址时候显示 -->
          <div class="noDeliveryAddress" v-if="addressLists.length==0" @click="addtype">设置收货地址</div>
          <!-- 默认地址 -->
          <div class="deliveryAddress" v-else @click="addtype">
            <ul class="fl deliveryAddress-lr">
              <li class="delivery-people clearfix">
                <span class="fl lr1">
                  <i class="lr1">收货人：</i>{{defaultAddress.realname}}</span>
                <span class="fr lr1">{{defaultAddress.mobile}}</span>
              </li>
              <li class="deliveryAddress-lr-addr lr1">
                收货地址：{{defaultAddress.province}} {{defaultAddress.city}} {{defaultAddress.area}} {{defaultAddress.address}}
              </li>
            </ul>
            <div class="addressline"></div>
          </div>
          <ul class="goodsList">
            <li>
              <div class="goodsList-tp">
                <i class="iconfont">&#xe6a8;</i>
                {{shopsName.name}}
              </div>
              <div class="goodsList-mids">
                <div class="goodsList-mid clearfix" v-for="(v,i) in orderGoods" @click="goProducts(v)" :key="i">
                  <div class="goods-img fl">
                    <img :src="v.thumb">
                  </div>
                  <div class="goods-introduce fl lr3">
                    <p class="lr2">{{v.title}}</p>
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
                    <div class="goods-num">X
                      <i>{{v.total}}</i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="deliveryMode bt deflist" @click="goDeliverMode">
                <div class="deliveryMode-lf fl">
                  配送方式
                </div>
                <div class="deliveryMode-lr fr">
                  {{dispatche.dispatchname}}
                </div>
              </div>
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
                <span class="goods-intPrice">{{dispatcheMoney | calculatePrice1}}.</span>
                <span class="goods-folatPrice">{{dispatcheMoney | calculatePrice2}}</span>
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

      </div>
      <!-- loading -->
      <div class="loading-container" v-show="on1">
        <loading></loading>
      </div>
      <!-- 提交订单 -->
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
            <span class="goods-intPrice">{{memberDiscount.realprice + dispatcheMoney | calculatePrice1}}.</span>
            <span class="goods-folatPrice">{{memberDiscount.realprice | calculatePrice2}}</span>
          </span>
        </div>

        <button id="commitForm" class="settlement-lr fr" @click="goPay">
          提交订单
        </button>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { Header, MessageBox, Toast } from 'mint-ui';
import { GET_MYADDRESS1, GET_ORDER1, confirm_post, DispatchMoney } from '../../../api/api';
import { mapMutations, mapState, mapGetters } from 'Vuex';
import Loading from '../../../components/base/loading/loading';
export default {
  data() {
    return {
      shopsName: {},  //商铺名
      defaultAddress: {},  //默认地址
      orderGoods: [],      //订单商品列表
      memberDiscount: {},  //订单消费明细
      addressLists: [],    //地址列表
      dispatches: [],      //配送方式列表
      dispatche: '',        //默认配送方式
      dispatcheId: '',     //配送ID
      addressId: '',       //收货地址ID
      dispatcheMoney: 0,  //运费
      remark: '',  //留言
      goodsId: [],  //商品ID
      payed: false,
      on1: true,
      newcartid:''
    }
  },
  methods: {
    goBack() {
      this.$router.push('home');
    },
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
          console.log(res.data);
          _this.newcartid=res.data.cartids || '';
          _this.shopsName = res.data.shopSet;  //商铺名
          _this.orderGoods = res.data.orderGoods; //商品列表
          _this.addressLists = res.data.addressLists; //收货地址列表
          _this.dispatches = res.data.dispatches;  //配送方式列表
          _this.memberDiscount = res.data.memberDiscount;  //订单消费明细
          _this.on1 = false;
          //循环商品列表获得goodsid
          for (let i = 0; i < _this.orderGoods.length; i++) {
            _this.goodsId.push(_this.orderGoods[i].goodsid);
          }

          //默认地址和默认地址ID
          if (_this.addressLists.length > 0) {
            _this.defaultAddress = _this.addressLists[0];
            console.log(_this.defaultAddress);
            _this.addressId = _this.addressLists[0].id;
          } else {
            _this.defaultAddress = '';
            _this.addressId = '';
          }
          //修改默认地址和默认地址ID
          if (_this.changeAddress.id !== undefined) {
            _this.defaultAddress = _this.changeAddress;
            _this.addressId = _this.changeAddress.id;
          }

          //默认配送方式和默认配送方式id和运费
          if (_this.dispatches.length > 0) {
            _this.dispatche = _this.dispatches[0];
            _this.dispatcheId = _this.dispatches[0].id;
            _this.dispatcheMoney = _this.dispatches[0].price;
          } else {
            _this.dispatche = '';
            _this.dispatcheId = '';
            _this.dispatcheMoney = '';
          }

          //修改运费
          if (_this.changeDeliveryIndex != '') {
            let i = _this.changeDeliveryIndex;
            _this.dispatcheMoney = _this.dispatches[i].price;
          }

          //修改修改默认配送方式和默认配送方式id
          if (_this.changeDelivery.id != undefined) {
            _this.dispatche = _this.changeDelivery;
            _this.dispatcheId = _this.changeDelivery.id;
          }
        }/*else{
           MessageBox.alert(res.data).then(action => {
            _this.$router.go(-1);
          });*/
//        }
      })
    },
    addtype() { //地址跳转
      if (this.addressLists.length <= 0) {  //没有设置地址时，默认进入编辑地址
        this.$router.push({ name: 'editAddress', query: { state: 1 } });
      } else {
        this.$router.push({ name: 'manageAddress' });
      }
    },
    goDeliverMode() {  //配送方式列表
      let _this = this;
      _this.$router.push({ name: 'deliverymode' });
    },
    goPay() {
      let _this = this
      let payed = _this.payed;
      if (payed === false) {
        _this.payed = true;
        let addressid = _this.addressId || '';
        let dispatchid = _this.dispatcheId;
        let cartids = _this.myOrders.cartids;
//        let cartids = this.myOrders.cartids;
        if(_this.$route.query.order){
          cartids=_this.newcartid
        }else {
          cartids=_this.myOrders.cartids
        }
        let remark = _this.remark || '';
        let goods = '';
        if (_this.orderGoods.length > 0) {
          for (let i = 0, j = _this.orderGoods.length; i < j; i++) {
            if (i != j - 1) {
              goods += _this.orderGoods[i].goodsid + ',' + _this.orderGoods[i].optionid + ',' + _this.orderGoods[i].total + '|'
            } else {
              goods += _this.orderGoods[i].goodsid + ',' + _this.orderGoods[i].optionid + ',' + _this.orderGoods[i].total
            }
          }
        }
        let params = {
          data: {
            goods,
            dispatchid,
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
          return;
        } else {
          confirm_post(params, res => {
            if (res.statusCode == 1) {
              let ordersn = res.data.ordersn
              _this.ORDERINFO(ordersn);
              _this.$router.replace({ name: 'payselect', query: { orderid: ordersn } })
            } else {
              Toast({
                message: `操作频繁请稍候`,
                position: 'middle',
                duration: 1500
              });
              _this.payed = false;
            }
          })
        }
      }
    },
    goProducts(v) {
      let goodsId = v.goodsid;
      this.$router.push({ name: 'details', query: { id: goodsId } })
    },
    ...mapMutations([
      'ADDRESS', 'ORDERINFO'
    ])
  },
  computed: {
    ...mapState([
      'delivery', 'myOrders'
    ]),
    ...mapGetters([
      'userAddress',
      'userAddress',
      'changeAddress',
      'changeDeliveryIndex',
      'changeDelivery'
    ])
  },
  components: {
    Loading
  },
  filters: {
    calculatePrice1(value) {
      let num = '';
      if (typeof value == 'number') {
        num = Math.floor(value) || 0
      } else if (typeof value == 'string') {
        num = Math.floor(Number(value)) || 0
      } else if (typeof value == 'undefined') {
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
    },
    mustnum(value) {
      return value > this.memberDiscount.realprice ? this.memberDiscount.realprice : value
    }
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/index.less';
@import '../../../assets/less/reset.less';
@import '../../../assets/fonts/iconfont.css';

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  overflow: auto;
  z-index: 30
}

.order {
  position: relative;
  width: 100%;
  .scroll-view(100%);
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
  margin-top: 0.5rem;
  background: #fff;
  position: relative;
  overflow: hidden;
  /*margin-top: .1rem;*/
}

.addressline {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 4px;
  background: url(../../../assets/images/addressLine.png) no-repeat center center;
  background-size: 100%;
  z-index: 10;
}

.delivery-people {
  display: flex;
  justify-content: space-between;
}
.delivery-people span{
  flex:1;
  font-size: 0.14rem;
  line-height: 0.15rem;
}
.delivery-people span:first-child{
  text-align: left;
  line-height: 0.2rem;
}
.delivery-people span:last-child{
  text-align: right;
}
.delivery-people span i {
  color: #333;
  line-height: 0.2rem;
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

.goods-unitPrice {}

.goods-introduce {
  width: 1.90rem;
  font-size: 0.12rem;
  color: #666;
  text-align: left;
  margin-left: 0.1rem;
}

.goods-introduce p {
  width: 1.90rem;
  font-size: 0.14rem;
  color: #666;
  text-align: left;
  margin-bottom: 0.05rem;
  line-height: 0.19rem;
}

.goods-introduce .goods-option {
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
  border-bottom: 0.01rem solid #F6F6F9;
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
  position: fixed; // position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0rem 0rem 0rem 0.1rem;
  border-top: 0.01rem solid #F6F6F9;
  background: #fff;
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
  background: @themeColor1;
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
  border-bottom: 0.01rem solid #F6F6F9;
}
.exhibition li:last-child{
  border-bottom:none;
}
.exhibition li .coupon {
  text-align: right;
  display: block;
  height: .46rem;
  margin-top: -0.1rem;
  font-size: .16rem;
  color: red;
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

.mygoods-price,
.goods-price,
.goods-num {
  color: red !important;
}

.loading-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: Center;
  z-index: 20;
}
</style>
