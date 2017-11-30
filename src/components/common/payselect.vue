<template>
  <div class="main">
    <mt-header title="支付" class="is-fixed header">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="payselect-content">
      <ul class="order">
        <div class="pic">
          <img :src="goods.thumb" alt="icon">
        </div>
        <div class="details">
          <span class="span1">￥{{order.price}}</span>
          <span class="span2">{{shopSet.name}}-{{order.ordersn}}</span>
        </div>
      </ul>
      <ul class="pay">
        <li class="num" @click="checkStatus(1,wechat_app.switch)">
          <div class="order-num">
            <span class="iconfont w">&#xe605;</span>
            <label for="one">微信</label>
          </div>
          <div>
            <label class="mint-checklist-label fl">
              <span class="mint-checkbox" v-if="wechat_app.switch">
                <input type="checkbox" :checked="isChecked==1" class="mint-checkbox-input">
                <span class="mint-checkbox-core"></span>
              </span>
              <span class="mint-checkbox" v-if="!wechat_app.switch">
                <input type="checkbox" disabled="disabled" class="mint-checkbox-input" value="值A">
                <span class="mint-checkbox-core"></span>
              </span>
            </label>
          </div>
        </li>
        <li class="num" @click="checkStatus(2,alipay_app.switch)">
          <div class="order-num">
            <span class="iconfont a">&#xe65b;</span>
            <label for="one">支付宝</label>
          </div>
          <div>
            <label class="mint-checklist-label fl">
              <span class="mint-checkbox" v-if="alipay_app.switch">
                <input type="checkbox" :checked="isChecked==2" class="mint-checkbox-input">
                <span class="mint-checkbox-core"></span>
              </span>
              <span class="mint-checkbox" v-if="!alipay_app.switch">
                <input type="checkbox" disabled="disabled" class="mint-checkbox-input" value="值A">
                <span class="mint-checkbox-core"></span>
              </span>
            </label>
          </div>
        </li>
      </ul>
      <button class="commit ocolor" @click="pay">
        {{payText}}
      </button>
    </div>
  </div>
</template>

<script>
import { Checklist, Toast, Indicator } from 'mint-ui';
import { mapState, mapMutations } from 'Vuex';
import { _webapp } from '../../config/hook';
import { payment_post, payment_get, paymentFun } from '../../api/api';
export default {
  data() {
    return {
      isChecked: 2,
      goods: [],
      shopSet: [],
      order: [],
      payment: [],
      wechat_app: [],
      alipay_app: [],
      payStstus: 0,
      payText: '支付订单'
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.query.orderid)
    let params = {
      data: {
        ordersn: to.query.orderid
      }
    }
    payment_get(params, res => {
      to.meta.post = res
      next()
    })
  },
  methods: {
    init() {
      let res = this.$route.meta.post
      if (res.statusCode == 1) {
        this.goods = res.data.order.goods[0]
        this.shopSet = res.data.shopSet
        this.order = res.data.order
        this.payment = res.data.payment
        this.wechat_app = res.data.payment.wechat_app
        this.alipay_app = res.data.payment.alipay_app
      } else {
        console.log('payselect init' + res.data);
      }
    },
    goBack() {
      let _this = this;
      _this.setOrderStatus(1); //支付未完成的情况下，将订单状态存入 vuex , 参数1表示是 全部订单
      _this.$router.push({ name: 'order' });
    },
    checkStatus(idx, isTrue) {
      console.log(isTrue);
      this.isChecked = idx;
      if (!isTrue) {
        Toast({
          message: '暂未开通',
          position: 'bottom',
          duration: 1000
        })
      }
    },
    pay() {
      if (this.isChecked) {
        let _this = this
        let type = this.isChecked == 1 ? 'wechat_app' : this.isChecked == 2 ? 'alipay_app' : '';
        let params = {
          data: {
            ordersn: this.order.ordersn || '',
            type
          }
        }
        _this.payText = '订单提交中...';
        payment_post(params, res => {
          _this.payText = '正在发起支付...';
          _webapp.payment(type, res.data, function(payResult) {
            _this.loadingStatus = 0;

            if (payResult.statusCode == 1) {
              _this.payStstus = 1
              Toast({
                message: '支付成功',
                position: 'middle',
                duration: 1500
              });
              // setTimeout(() => {
                _this.setOrderStatus(1); //支付成功的情况下，将订单状态存入 vuex , 参数1表示是 全部订单
                _this.$router.replace({ name: 'order' });
              // }, 2000)
            } else {
              Toast({
                message: `支付异常：${payResult.data}`,
                position: 'middle',
                duration: 1500
              });
              // setTimeout(() => {
                _this.setOrderStatus(1); //支付未完成的情况下，将订单状态存入 vuex , 参数1表示是 全部订单
                _this.$router.replace({ name: 'order' });
              // }, 2000)
            }
            _this.payText = '支付订单';
          });
        })
      } else {
        Toast({
          message: '请选择支付方式',
          position: 'middle',
          duration: 2000
        });
      }
    },
    ...mapMutations({
      setOrderStatus: 'SET_ORDERSTATUS'
    })
  },
  computed: {
    ...mapState([
      'orderInfo'
    ])
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/less/index.less";
  @import '../../assets/less/reset.less';
  @import '../../assets/fonts/iconfont.css';

.main {
  font-size: .16rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  overflow: hidden;
}

ul {
  background: #fff;
}

ul.order {
  width: 100%;
  height: 1rem;
  margin-top: .1rem;
  margin-left: auto;
  margin-right: auto;
}

.order>.pic {
  width: .6rem;
  height: .6rem;
  margin-top: .18rem;
  border-radius: 50%;
  margin-left: .3rem;
  vertical-align: middle;
  float: left
}

.order>.pic>img {
  width: 100%;
  border-radius: 50%;
}

.order>.details {
  width: 70%;
  float: left;
  margin-top: .24rem;
}

.order span {
  display: block;
}

.order .span1 {
  padding-left: .2rem;
  font-size: .24rem;
  text-align: left;
}

.order .span2 {
  padding-left: .2rem;
  font-size: .1rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

ul>li {
  display: flex;
  justify-content: space-between;
  line-height: .35rem;
  padding-left: .2rem;
  padding-right: .2rem;
}

ul>li:first-child {
  border-bottom: 1px solid #efeff4;
  border-top: 1px solid #efeff4
}

ul>li:last-child {
  /*margin-bottom: .3rem;*/
  border-bottom: 1px solid #efeff4;
}

ul.pay {
  margin-top: .1rem;
}

.payType {
  padding-left: .2rem;
  background-color: #efeff4;
  line-height: .3rem;
  text-align: left;
}

ul.pay>li {
  height: .6rem;
  line-height: .6rem;
}

.w {
  color: #2ba245;
  font-size: 0.4rem;
  vertical-align: middle;
}

.a {
  color: #1296db;
  font-size: 0.4rem;
  vertical-align: middle;
}

.commit {
  width: 95%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  margin: 0 auto;
  border-radius: 0.05rem;
  background: #19AC15;
  color: #fff;
  margin-top: 0.4rem;
}

.commit:active {
  background-color: #999 !important
}

.mint-checkbox-input:checked+.mint-checkbox-core {
  background-color: #F5751D;
  border-color: #F5751D;
}

.mint-checkbox-input[disabled]+.mint-checkbox-core {
  background-color: #d9d9d9;
  border-color: #ccc;
}
.payselect-content{
  padding-top: 0.45rem;
}
</style>

