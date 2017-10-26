<template>
  <div class="main">
    <section>
      <mt-header title="支付">
        <router-link :to="{name:'order',query:{flush:1}}" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <ul class="order">
      <div class="pic">
        <!--<img src="../../assets/images/confirmorder-01.jpg" alt="">-->
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
              <!--<input type="checkbox" :checked="isChecked==1" class="mint-checkbox-input" @click="isChecked=1">-->
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
              <!--<input type="checkbox" :checked="isChecked==2" class="mint-checkbox-input" @click="isChecked=2">-->
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
    <!--<div>1234567</div>-->
    <!--{{data}}-->
    <button class="commit ocolor" @click="pay">
      {{payText}}
    </button>
  </div>
</template>

<script>
  import {Checklist, Toast, Indicator} from 'mint-ui';
  import {mapState} from 'Vuex';
  import {_webapp} from '../../config/hook';

  import {payment_post, payment_get, paymentFun} from '../../api/api';
  export default {
    data () {
      return {
        isChecked: 2,
        goods: [],
        shopSet: [],
        order: [],
        payment: [],
        wechat_app: [],
        alipay_app: [],
        payStstus: 0,
        payText : '支付订单'
//        loadingStatus: 0,
//        post: {},
//        data:[]
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to.query.orderid)
      let params = {
        data: {
          ordersn: to.query.orderid
        }
      }
      payment_get(params, res => {
//        Indicator.close()
        to.meta.post = res
//        console.log(res)
        next()
      })
    },
    watch: {
//      '$route' (from, to) {
////        console.log('1111111')
//
//      },
//      isChecked (newValue) {
//        console.log(newValue)
//      }
    },
    methods: {
      checkStatus (idx, isTrue) {
        this.isChecked = idx;
        if (!isTrue) {
          Toast({
            message: '暂未开通',
            position: 'bottom',
            duration: 1000
          })
        }

      },
      pay () {
        if (this.isChecked) {
          let _this = this
          let type = this.isChecked == 1 ? 'wechat_app' : this.isChecked == 2 ? 'alipay_app' : ''
          let params = {
            data: {
              ordersn: this.order.ordersn || '',
              type
            }
          }
          _this.payText = '订单提交中...';
          payment_post(params, res => {
//            let testData = {"statusCode":1,"result":"biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%2279.20%22%2C%22subject%22%3A%22%5Cu6735%5Cu4e91%5Cu5bb6%5Cu8ba2%5Cu5355%3A+SH201709090448288640%22%2C%22body%22%3A%222%3A0%22%2C%22out_trade_no%22%3A%22SH201709090448288640%22%7D&app_id=2017070407639762&method=alipay.trade.app.pay&charset=UTF-8&timestamp=2017-09-09+05%3A53%3A06&version=1.0&sign_type=RSA&notify_url=http%3A%2F%2Fduoyunjiav2.wshoto.com%2Faddons%2Fewei_shop%2Fpayment%2Falipay%2Fnotify_app.php&sign=Q%2FNg0crDmBplk6d7aub9WlBkZ1THKx9iFxLnwGvXzD4ynEdcZ1WH1gUoa%2BqDTSFkln6J58qxpEZlnYKIBl2KsZv%2FsDVAZXs2q49TpTG7kKuTfxcDCbYBKOWPTofKnWfz3jlGzL7yaKWbiI%2BYm8EI1VZa2NRT%2Fi%2Bq9jiYJBALIWk%3D"}
//            console.log(res);
            let _this = this;

            _this.payText = '正在发起支付...';
            _webapp.payment(type, res.data, function(payResult){
              _this.loadingStatus = 0;

              if (payResult.statusCode == 1) {
                _this.payStstus = 1
                Toast({
                  message: '支付成功',
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(() => {
                  _this.$router.push({name:'order'})
                }, 2000)
              } else {
                Toast({
                  message: `支付异常：${payResult.data}`,
                  position: 'middle',
                  duration: 2500
                });
              }

              _this.payText = '支付订单';
            });

//            return ;
//            this.loadingStatus = 0
//            Toast({
//              message: `${typeof res.statusCode}|${res.statusCode}`,
//              position: 'middle',
//              duration: 2000
//            });
//            if (res.statusCode == 1) {
//              _this.payStstus = 1
//              Toast({
//                message: '支付成功',
//                position: 'middle',
//                duration: 2000
//              });
//              setTimeout(() => {
//                _this.$router.push({name:'order'})
//
//              }, 2000)
//            } else {
//              Toast({
//                message: `支付异常：${res.data}`,
//                position: 'middle',
//                duration: 2000
//              });
//            }

            /*if (res.statusCode == 1) {
             paymentFun(type, res.data, data => {

             })
             } else {
             console.log('支付失败')
             }*/
          })
        } else {
          Toast({
            message: '请选择支付方式',
            position: 'middle',
            duration: 2000
          });
        }

      }
    },
    activated(){
      this.payText = '支付订单';
      //        console.log(this.post)
      let res = this.$route.meta.post
      console.log(res)
      if (res.statusCode == 1) {
//        this.loadingStatus = 1
        this.goods = res.data.order.goods[0]
        this.shopSet = res.data.shopSet
        this.order = res.data.order
        this.payment = res.data.payment
        this.wechat_app = res.data.payment.wechat_app
        this.alipay_app = res.data.payment.alipay_app
      } else {
        console.log('支付订单获取接口异常')
      }
    },
    computed: {
      ...mapState([
        'orderInfo'
      ])
    },
    mounted () {
//        console.log(this.post)
      let res = this.$route.meta.post
      console.log(res)
      if (res.statusCode == 1) {
//        this.loadingStatus = 1
        this.goods = res.data.order.goods[0]
        this.shopSet = res.data.shopSet
        this.order = res.data.order
        this.payment = res.data.payment
        this.wechat_app = res.data.payment.wechat_app
        this.alipay_app = res.data.payment.alipay_app
      } else {
        console.log('支付订单获取接口异常')
      }
    },
    created () {
//      let res = this.$route.meta.post
//      console.log(res)
//      if (res.statusCode == 1) {
////        this.loadingStatus = 1
//        this.goods = res.data.order.goods[0]
//        this.shopSet = res.data.shopSet
//        this.order = res.data.order
//        this.payment = res.data.payment
//        this.wechat_app = res.data.payment.wechat_app
//        this.alipay_app = res.data.payment.alipay_app
//      } else {
//        console.log('支付订单获取接口异常')
//      }
//      })
    }
  }


</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  .main {
    font-size: .16rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    /*overflow: auto;*/
    overflow: hidden;


    /*background: #fff;*/
  }


  ul {

    background: #fff;
    /*background-color: #efeff4*/

  }

  ul.order {
    width: 100%;
    height: 1rem;
    margin-top: .1rem;
    margin-left: auto;
    margin-right: auto;
    /*border-radius: 5%;*/
    -webkit-box-shadow: 0 .04rem .12rem rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 .04rem .12rem rgba(138, 138, 138, .3);
    box-shadow: 0 .04rem .12rem rgba(138, 138, 138, .3);
  }

  .order > .pic {
    /*display: inline-block;*/
    width: .6rem;
    height: .6rem;
    margin-top: .18rem;
    border-radius: 50%;
    margin-left: .3rem;
    vertical-align: middle;
    float: left
  }

  .order > .pic > img {
    width: 100%;
    border-radius: 50%;
  }

  .order > .details {
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

  ul > li {
    display: flex;
    justify-content: space-between;
    line-height: .35rem;
    padding-left: .2rem;
    padding-right: .2rem;
  }

  ul > li:first-child {
    border-bottom: 1px solid #efeff4;
    border-top: 1px solid #efeff4
  }

  ul > li:last-child {
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

  ul.pay > li {
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
    width: 3.55rem;
    height: .5rem;
    font-size: .16rem;
    color: #fff;
    line-height: .5rem;
    margin-top: .2rem;
    margin-left: auto;
    margin-right: auto;
    -webkit-border-radius: .02rem;
    -moz-border-radius: .02rem;
    border-radius: .02rem;
    /*background-color: #ffcb05;*/
    -webkit-box-shadow: 0 .01rem .01rem rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 .01rem .01rem rgba(138, 138, 138, .3);
    box-shadow: 0 .01rem .01rem rgba(138, 138, 138, .3);
    outline: none;
  }

  .commit:active {
    background-color: #999 !important
  }

  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #EC5151;
    border-color: #EC5151;
  }

  .mint-checkbox-input[disabled] + .mint-checkbox-core {
    background-color: #d9d9d9;
    border-color: #ccc;
  }
</style>

