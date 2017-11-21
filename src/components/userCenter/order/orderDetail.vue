<template>
  <div class="main ">
    <mt-header title="订单详情" class="is-fixed header">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="orderdetail-content">
      <div class="context">
        <ul class="trace-info" v-if="orderStatus==3">
          <li>订单号：
            <span>{{ordersin}}</span>
          </li>
        </ul>
        <div class="buyer-info">
          <div class="buyer-info-box">
            <div class="iconfont">
              &#xe66f;
            </div>
            <ul class="order-state">
              <li v-if="orderStatus==3">订单号：{{ordersin}}</li>
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
            <p class="lr2"> {{province}}{{city}}{{area}}{{address}}</p>
          </div>
        </div>
        <div class="product-info-box">
          <div class="pib-header">
            <span class="iconfont">&#xe6ce;</span>
            {{shopname}}
          </div>
          <router-link class="good-info" v-for="(s,i) in goodlist" :to="{path:'details',query:{id: s.id}}" tag="div" :key="i">
            <img :src="s.thumb" class="order-small">
            <p>{{s.title}}</p>
            <div class="good-price">
              <p>￥{{s.realprice}}</p>
              <p>×{{s.total}}</p>
            </div>
          </router-link>
          <ul class="pib-list">
            <li>商品金额：
              <p>￥{{price}}</p>
            </li>
            <li>运费：
              <p>￥{{tranprice}}</p>
            </li>
            <li>会员折扣：
              <p>￥{{discount}}</p>
            </li>
            <li>实付费(含运费)：
              <p>￥{{proprice}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom-content">
        <button class="cancel-order" v-if="orderStatus==0" @click="cancelOrder()">
          取消订单
        </button>
        <button class="charge-order ocolor" v-if="orderStatus==0" @click="payMent()">
          付款
        </button>
        <button class="charge-order ocolor" v-if="obj.canrefund&&obj.refundid==0" @click="applyRefund">
          申请退款
        </button>
        <button class="charge-order1" v-if="orderStatus==2&&obj.refundid==0" @click="confirmReceipt">
          确认收货
        </button>

        <button class="look-logi ocolor" v-if="orderStatus==2||orderStatus==3" @click="viewLogistics">
          查看物流
        </button>
        <button class="charge-order ocolor" v-if="obj.canrefund&&refundid!=0&&orderStatus!=0" @click="refunding">
          退款申请中
        </button>
        <!-- <router-link class="charge-order1 " :to="{path:'drawback',query:{money:proprice,orderid:oid}}" tag="button" v-if="orderStatus==3 && obj.canrefund&&obj.refundid==0">
                                  申请退款
                                </router-link> -->

      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { Header, MessageBox, Toast } from 'mint-ui'
import { orderDetail, orderManu } from "../../../api/api.js"
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
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
      flush: false,
      goodlist: []
    }
  },
  methods: {
    goBack() {
      let _this = this;
      _this.$router.push({ name: 'order' });
    },
    init() {
      let _this = this;
      _this.oid = _this.$route.query.oid;
      let params = {
        data: {
          orderid: _this.$route.query.oid
        }
      }
      orderDetail(params, function(res) {

        if (res.statusCode == 1) {
          _this.myid = res.data.refundid;
          _this.obj = res.data
          _this.price = res.data.goodsprice;
          _this.tranprice = res.data.dispatchprice;
          _this.relname = res.data.address.realname;
          _this.province = res.data.address.province;
          _this.city = res.data.address.city;
          _this.area = res.data.address.area;
          _this.address = res.data.address.address;
          _this.shopname = res.data.set.name;
          _this.discount = res.data.discountprice;
          _this.proprice = res.data.price;
          _this.realprice = res.data.price;
          _this.ordersin = res.data.ordersn;
          _this.endtime = res.data.finishtime;
          _this.goodlist = res.data.goods;
          _this.exp = res.data.express;
          _this.expsn = res.data.expresssn;
          _this.refundid = res.data.refundid;
          _this.canrefund = res.data.canrefund;
          _this.orderStatus = res.data.status;
          _this.setorderdetails(res.data); //订单详情存入vuex（orderdetails）

        } else {
          console.log('orderdetail orderDetail:' + res.data);
        }

      });
    },
    cancelOrder() {//取消订单
      let _this = this;
      let orderid = _this.oid;
      console.log(_this.oid);
      MessageBox({
        title: '提示',
        message: '确定取消订单吗?',
        showCancelButton: true
      }).then(action => {
        if (action == 'confirm') {
          _this.isSelect = !_this.isSelect;
          let params = {
            data: {
              orderid: orderid,
              type: 'canl'
            }
          }
          orderManu(params, function(res) {
            console.log(res)
            if (res.statusCode == 1) {
              MessageBox.alert('操作成功').then(action => {
                // _this.$router.push({ path: 'details', query: { id: _this.goodsId } })
                _this.$router.push({ name: 'order' });
              });
            }
          })
        } else if (action == 'cancel') {
          console.log('点击了取消');
        }
      });
    },
    payMent() {  //付款
      let _this = this;
      _this.orderinfo(_this.ordersin);
      _this.$router.push({ path: 'payselect', query: { orderid: _this.ordersin } });
    },
    applyRefund() {  //申请退款
      let _this = this;
      _this.$router.push({ name: 'drawback', query: { money: _this.proprice, orderid: _this.oid } })
    },
    confirmReceipt() { //确认收货
      let _this = this;
      let orderid = _this.oid;
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
          orderManu(params, function(res) {
            if (res.statusCode == 1) {
              _this.$router.push({ name: 'order' });
            }
            else {
              console.log('orderDEtail orderManu' + res.data);
            }
          })
        } else if (action == 'cancel') {

        }
      });
    },
    viewLogistics() {//查看物流
      let _this = this;
      _this.$router.push({ name: 'logistics', query: { id: _this.oid, exp: _this.exp, expsn: _this.expsn } });
    },
    refunding() {//申请退款中
      let _this = this;
      _this.$router.push({ name: 'drawbackInfo', query: { refundid: _this.myid } })
    },
    ...mapMutations({
      orderinfo: 'ORDERINFO',
      setorderdetails: 'ORDERDETAILS'
    }),
  },
  mounted() {
    let _this = this;
    _this.init();
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';
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
  display: flex;
  align-items: center;
  padding: 0rem 0.1rem;
}

.buyer-info-box>div.iconfont {
  font-size: .25rem;
  color: #666;
}

.order-state {
  margin-left: 0.1rem;
}

.order-state li {
  text-align: left;
  font-size: .14rem;
  line-height: 0.18rem;
  color: #666
}

.buyer-address {
  background: #fff; // padding: .16rem .1rem;
  position: relative;
  height: .75rem;
  margin-bottom: .1rem;
  display: flex;
  align-items: center;
  padding: 0rem 0.1rem;
}

.buyer-address>div.iconfont {
  font-size: .20rem;
}

.buyer-address-detail {
  text-align: left;
  font-size: .14rem;
  margin-left: 0.15rem;
}

.buyer-address-detail>p {
  line-height: 0.19rem;
  color: #666;
}

.product-info-box {
  background: #fff; // margin-bottom: .1rem;
}

.pib-header {
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: left;
  padding: 0rem 0.12rem;
}

.pib-header>span {
  margin-right: .05rem;
}

.good-info {
  display: flex;
  padding: 0.08rem 0.12rem;
  background: #f8f8f8;
}

.order-small {
  width: .5rem;
  height: .5rem;
  border: 1px solid #ddd;
}

.good-info>img {
  width: 0.85rem;
  height: 0.85rem;
  border: 1px solid #eee;
  border-radius: 0.04rem;
}

.good-info>p {
  float: left;
  margin-left: .08rem;
  font-size: .13rem;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 2.2rem;
  text-align: left;
  line-height: 0.2rem;
}

.good-price {
  float: right;
  font-size: .13rem;
}

.good-price>p {
  text-align: right;
  margin-bottom: .02rem;
}

.pib-list {
  padding: .2rem 0.1rem;
}

.pib-list>li {
  text-align: left;
  font-size: .13rem;
  line-height: 0.2rem;
}

.pib-list>li>p {
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
  height: .48rem;
  background: #fff;
  border-top: 1px solid #ddd; // position: fixed;
  width: 100%; // left: 0;
  // bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.2rem;
}

.bottom-content {
  width: 100%;
  height: 100%;
  display: flex;
}

.bottom-box>div>button {
  font-size: 0.14rem;
  height: 100%;
  border: none;
  outline: none;
  background: @themeColor2;
  color: #fff;
  flex: 1;
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

.bottom-box>div>button.ocolor {
  color: #fff;
  background: @themeColor1;
  border: none;
}

.orderdetail-content {
  margin-top: 0.45rem;
}
</style>
