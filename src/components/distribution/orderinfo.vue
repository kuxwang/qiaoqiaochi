<template>
  <div class="main2">
    <mt-header title="订单详情" fixed class="header">
      <router-link to="/extension" slot="left" class="pro-white">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="title">
        <h3>{{ordernum.price}}</h3>
        <span>{{ordernum.status}}</span>
      </div>
      <ul class="orderinfo">
        <li class="ordercell">
          <div class="left">购买用户</div>
          <div class="right">{{ordernum.nickname}}</div>
        </li>
        <li class="ordercell">
          <div class="left">用户编号</div>
          <div class="right">{{ordernum.id}}</div>
        </li>
        <!--<li class="ordercell">
              <div class="left">手机号</div>
              <div class="right">{{ordernum.mobile}}</div>
            </li>-->
        <li class="ordercell">
          <div class="left">订单号</div>
          <div class="right">{{ordernum.ordersn}}</div>
        </li>
        <li class="ordercell">
          <div class="left">付款时间</div>
          <div class="right">{{ordernum.paytime}}</div>
        </li>
      </ul>
      <div class="tianchong"></div>
      <ul class="order-list">
        <li v-for="(v,i) in ordercom" :key="i">
          <div class="left">
            <span class="icon">{{v.c_rank}}</span>
          </div>
          <div class="right" :class="{'color': comparefun(ordercom,i)}">
            <div class="money">
              <p class="dec-left">昵称：
                <em>{{v.nickname}}</em>
              </p>
              <p class="yong">佣金金额：{{v.c_money}}</p>
            </div>
            <div class="dec">
              <p class="dec-left">用户编号：{{v.id}}</p>
              <p class="yong">佣金比列：{{v.c_rate}}</p>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { orders } from '../../api/api';
export default {
  data() {
    return {
      ordernum: [],
      ordercom: {}
    }
  },
  methods: {
    init() {
      let _this=this;
      let params = {
        data: {
          ordersn: _this.$route.query.ordersn,
          mid:_this.$route.query.mid
        }
      }
      orders(params, (res) => {
         if (res.statusCode === 1) {
          _this.ordernum = res.data.order;
          _this.ordercom = res.data.commssion;
        }else{
          console.log('orderinfo orders:'+res.data);
        }
      })
    },
    comparefun(obj, i) {
      if (i == obj.length - 1) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    let _this = this;
    _this.init();
  }
}
</script>


<style lang="less" scoped>
  @import "../../assets/less/index.less";
  @import '../../assets/less/reset.less';
  @import '../../assets/fonts/iconfont.css';
.title {
  background: #fff;
  padding: .26rem 0px .1rem;
  margin-top: .45rem
}

.title span {
  font-weight: 400;
  color: #666;
}

.main2 {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 99999;
}

h3 {
  font-size: .46rem;
  color: #F5751D;
}

.userinfo {
  display: flex;
}

.left {
  flex: 1;
  text-align: left;
}

.right {
  flex: 3;
  text-align: right;
}

ul.orderinfo {
  overflow: hidden;
  background: #fff;
  padding: .1rem;
}

ul.orderinfo li {
  display: flex;
  justify-content: space-around;
  padding: .06rem 0px;
}

ul.order-list {
  margin-top: .1rem;
  padding: 0rem 0.05rem;
}

ul.order-list li {
  display: flex;
  overflow: hidden;
  background: #fff;
  padding: .05rem 0rem;
  border-bottom: 1px solid #dedede;
}

ul.order-list .left {
  width: .3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul.order-list .left span {
  display: block;
  width: .45rem;
  height: .45rem;
  line-height: 0.45rem;
  border-radius: .45rem;
  border: 1px #F5751D solid;
  /* background: #F5751D; */
  color: #333;
}

ul.order-list .right {
  text-align: left;
  flex: 6;
  padding: .1rem;
}

ul.order-list .money {
  display: flex;
  font-size: .14rem;
  margin-bottom: .01rem;
  justify-content: space-between;
  white-spacing: nowrap
}

ul.order-list .money em {
  font-style: normal;
  font-size: .16rem;
}

ul.order-list .dec {
  font-size: .14rem;
  display: flex;
  /*justify-content: space-between;*/
  white-spacing: nowrap
}

.dec .dec-left {
  flex: 1.5;
  max-width: 1.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

ul.order-list .yong {
  width: 1.1rem;
  text-align: left;
  font-size: .12rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  color: #6C6C6C;
  line-height: .4rem;
  text-align: center;
  border: 1px #F5751D solid
}

.tianchong {
  background-color: #efefef;
  height: .1rem;
  width: 100%;
}

.color {
  border-bottom: none !important;
}

.title h3 {
  font-size: 0.30rem;
}

.ordercell div.left {
  font-size: 0.14rem;
  color: #666;
}

.ordercell div.right {
  font-size: 0.14rem;
  color: #999;
}

.money {
  font-size: 0.14rem;
}

ul.order-list p.yong {
  font-size: 0.14rem;
}

.money .dec-left {
  flex: 1.5;
  max-width: 1.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.money .young {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

.container {
  position: absolute;
  top: 0;
  width: 100%;
  overflow: auto;
  /*overflow-y: scroll;*/
  -webkit-overflow-scrolling: touch;
  height: 6.67rem;
  /*overflow-y: scroll;*/
}
</style>
