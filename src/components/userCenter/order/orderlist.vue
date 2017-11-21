<template>
  <div class="page">
    <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :autoFill="isTrue" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="order-list" v-show="defShow">
        <li v-for="(v,i) in statusResult" :key="i">
          <div class="ordernumber">订单号：{{v.ordersn}}</div>
          <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status}}" v-for=" (s,index) in v.goods" :key="index" tag="div">
            <img :src=s.thumb alt="" class="order-small">
            <p>{{s.title}}</p>
            <div class="good-price">
              <p>¥ {{s.realprice}}</p>
              <p>×{{s.total}}</p>
            </div>
          </router-link>
          <div class="good-pay">
            <span>共{{v.goods.length}}件商品 实付：</span> ￥{{v.price}}
          </div>
          <div class="good-btn">
            <button class="cancel-order" v-if="v.status==0" @click="cancelOrder(v)">
              取消订单
            </button>
            <button class="charge-order" v-if="v.status==0" @click="payMent(v)">
              付款
            </button>
            <button class="charge-order" v-if="v.canrefund&&v.refundid==0" @click="applyRefund(v)">
              申请退款
            </button>
            <button class="charge-order" v-if="v.status==2 && v.refundid==0" @click="confirmReceipt(v)">
              确认收货
            </button>
            <button class="charge-order" v-if="v.status==2||v.status==3" @click="viewLogistics(v)">
              查看物流
            </button>
            <button class="charge-order" v-if="v.canrefund && v.refundid!=0 && v.status!=0" @click="refunding(v)">
              退款申请中
            </button>
          </div>
        </li>
      </ul>
      <div slot="bottom" class="mint-loadmore-bottom" v-show="!allLoaded">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
        <span v-show="bottomStatus === 'loading'">
          <mt-spinner type="snake"></mt-spinner>
        </span>
      </div>
    </mt-loadmore>
    <!-- 没有订单时 -->
    <default-img :defData="defMsg" v-show="!defShow"></default-img>
  </div>
</template>
<script>
import {
  MessageBox,
  Loadmore,
  Toast,
  InfiniteScroll,
  Indicator
} from "mint-ui";
import { mapMutations, mapGetters, mapState } from "vuex";
import { orderList, orderManu } from "../../../api/api.js";
import defaultImg from "../../base/defaultImg/defaultImg";
import myDefImg from "../../../assets/images/ddlb.png";
export default {
  data() {
    return {
      isShow: false,
      statusResult: [],
      statusType: "",
      page: 1,
      canReason: "其他原因",
      psize: 5,
      defMsg: {
        img: myDefImg,
        title1: "您还没有相关订单",
        title2: ""
      },
      defShow: true,
      bottomStatus: "",
      allLoaded: true,
      isTrue: false
    };
  },
  methods: {
    init(statusType) {
      //订单列表初始化
      let _this = this;
      _this.page = 1;
      _this.statusType = statusType;
      let params = {
        data: {
          page: _this.page,
          status: statusType,
          psize: _this.psize
        }
      };
      orderList(params, res => {
        console.log("orderlist orderList:" + res);
        if (res.statusCode == 1) {
          _this.statusResult = res.data;
          _this.statusResult.length < _this.psize
            ? (_this.allLoaded = true)
            : (_this.allLoaded = false); //判断是否大于psize
          _this.statusResult.length <= 0
            ? (_this.defShow = false)
            : (_this.defShow = true);
        } else {
          _this.defShow = false;
          console.log("orderlist orderList :" + res.data);
        }
      });
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      //上拉加载
      let _this = this;
      let params = {
        data: {
          page: ++_this.page,
          status: _this.statusType,
          psize: _this.psize
        }
      };
      orderList(params, res => {
        if (res.statusCode == 1) {
          _this.statusResult = _this.statusResult.concat(res.data);
        }
        this.$refs.loadmore.onBottomLoaded();
        if (res.data.length < _this.psize) {
          Toast({
            message: "亲，已经到底了哦~",
            position: "middle",
            duration: 1500
          });
          _this.allLoaded = true;
          return;
        }
      });
    },
    cancelOrder(v) {
      //取消订单
      MessageBox({
        title: "确定取消订单吗?",
        message: "点击确认取消",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          let _this = this;
          let orderid = v.id;
          _this.isSelect = !_this.isSelect;
          let params = {
            data: {
              orderid: orderid,
              type: "canl",
              reason: _this.canReason
            }
          };
          orderManu(params, function(res) {
            if (res.statusCode == 1) {
              for (let i = 0; i < _this.statusResult.length; i++) {
                if (_this.statusResult[i].id === orderid) {
                  _this.statusResult.splice(i, 1);
                  _this.statusResult.length <= 0
                    ? (_this.defShow = false)
                    : (_this.defShow = true);
                  break;
                }
              }
            } else {
              Toast({
                message: res.data,
                position: "middle",
                duration: 1500
              });
              _this.init(_this.statusType);
            }
          });
        } else if (action == "cancel") {
          console.log("点击了取消");
        }
      });
    },
    payMent(v) {
      //付款
      let _this = this;
      _this.$router.replace({
        name: "orderpay",
        query: { orderid: v.ordersn }
      });
    },
    applyRefund(v) {
      //退款申请
      let _this = this;
      _this.$router.replace({
        name: "drawback",
        query: { money: v.price, orderid: v.id }
      });
    },
    confirmReceipt(v) {
      //确认收货
      let _this = this;
      _this.$router.replace({ name: "orderd", query: { oid: v.id, sta: 2 } });
    },
    viewLogistics(v) {
      //查看物流
      let _this = this;
      _this.$router.replace({
        name: "logistics",
        query: { exp: v.express, expsn: v.expresssn, id: v.id }
      });
    },
    refunding(v) {
      //退款申请中
      let _this = this;
      this.$router.replace({
        name: "drawbackInfo",
        query: { refundid: v.refundid }
      });
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === "logistics" || from.name === "orderd") {
        this.isselect = this.orderStatus;
      }
    }
  },
  components: {
    defaultImg
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/common.less";
.page {
  // height: 100%;
  padding-bottom: 0.5rem;
  .order-list {
    background: @background;
    padding-bottom: 0.5rem;
    li {
      margin-top: 0.09rem;
      background: #fff;
      text-align: left;
      .good-info {
        display: flex;
        padding: 0.08rem 0.12rem;
        background: @background;
        .order-small {
          display: block;
          width: 0.85rem;
          height: 0.85rem;
          border: 1px solid #eee;
          border-radius: 0.04rem;
        }
        p {
          margin-left: 0.08rem;
          font-size: 0.14rem;
          flex: 1;
          .text-overflow(2);
          overflow: hidden;
          line-height: 0.19rem;
        }
        .good-price {
          // max-width: 0.68rem;
          p {
            text-align: right;
            margin-bottom: 0.02rem;
          }
          p:last-child {
            margin-top: 0.05rem;
          }
        }
      }
      .good-pay {
        text-align: right;
        color: #666;
        height: 0.4rem;
        line-height: 0.4rem;
        padding-right: 0.12rem;
        border-bottom: 1px solid #e6e6e6;
        span {
          color: #999;
          font-size: 0.14rem;
        }
      }
      .good-btn {
        text-align: right;
        border-bottom: none !important;
        padding: 0.08rem 0.12rem;
        button {
          width: 0.9rem;
          height: 0.3rem;
          border-radius: 0.2rem;
          font-size: 0.14rem;
        }
        .look-logi {
          width: 0.9rem !important;
          margin-right: 0.05rem;
          background: #fff;
          color: @themeColor1;
          border: 1px solid @themeColor1;
        }
        .cancel-order {
          background: #fff;
          color: #333;
          margin-right: 0.05rem;
          border: 1px solid #bababa;
        }
        .charge-order {
          background: #fff;
          color: @themeColor1;
          border: 1px solid @themeColor1;
        }
      }
    }
  }
  .mint-loadmore-bottom span {
    display: inline-block;
    transition: 0.2s linear;
    vertical-align: middle;
  }
}

/*加载*/

.page-infinite-loading {
  margin-top: 0.01rem;
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

.ordernumber {
  height: 0.45rem;
  line-height: 0.45rem;
  padding: 0 0.12rem;
}
</style>
