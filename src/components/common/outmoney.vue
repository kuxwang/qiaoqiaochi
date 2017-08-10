<template>
  <div class="main">
    <section>
      <mt-header title="提现">
        <router-link to="/takemoney" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <ul class="order">
     <!-- <div class="pic">
        &lt;!&ndash;<img src="../../assets/images/confirmorder-01.jpg" alt="">&ndash;&gt;
        &lt;!&ndash;<img :src="goods.thumb" alt="icon">&ndash;&gt;
      </div>-->
      <div class="details">
        <span class="span1">￥{{moneytotal}}</span>
        <!--<span class="span2">{{shopSet.name}}-{{order.ordersn}}</span>-->
      </div>

    </ul>
    <ul class="pay">
      <li class="num">
        <div class="order-num">
          <span class="iconfont w">&#xe605;</span>
          <label for="one">微信</label>
        </div>
        <div>
          <label class="mint-checklist-label fl" @click="isChecked=1">
            <span class="mint-checkbox" v-if="wechat_app.switch">
              <input type="checkbox" :checked="true" class="mint-checkbox-input" >
              <span class="mint-checkbox-core"></span>
            </span>
            <span class="mint-checkbox" v-if="!wechat_app.switch">
              <input type="checkbox" class="mint-checkbox-input" value="值A" disabled>
              <span class="mint-checkbox-core"></span>
            </span>
          </label>
        </div>
      </li>
      <li class="num">
        <div class="order-num">
          <span class="iconfont a">&#xe65b;</span>
          <label for="one">支付宝</label>
        </div>
        <div>
          <label class="mint-checklist-label fl" @click="isChecked=2">
            <span class="mint-checkbox" v-if="alipay_app.switch" >
              <input type="checkbox" :checked="isChecked==2" class="mint-checkbox-input" >
              <span class="mint-checkbox-core"></span>
            </span>
            <span class="mint-checkbox" v-if="!alipay_app.switch">
              <input type="checkbox" class="mint-checkbox-input" value="值A">
              <span class="mint-checkbox-core"></span>
            </span>
            <input type="checkbox" disabled="disabled" class="mint-checkbox-input" value="值A">
          </label>
        </div>
      </li>
    </ul>

    <button class="commit ocolor" @click="pay">
      确认提现
    </button>
  </div>
</template>

<script>
  import {Checklist, Toast} from 'mint-ui';
  import {mapState} from 'Vuex';
  import {withdrawals_post,recordStatistics_get} from '../../api/api';
  export default {
    data () {
      return {
        isChecked: '',
        goods: [],
        shopSet: [],
        order: [],
        payment: [],
        wechat_app: [],
        alipay_app: [],
        payStstus: 0,
        value: 0,
        type: 0,
        moneytotal:''
      }
    },
    methods: {
      pay () {
        if (this.isChecked) {
          let params = {
            data: {
              type: this.isChecked
            }
          }
          withdrawals_post(params, (res) => {
            console.log(res);
            Toast({
              message: '提现成功',
              position: 'middle',
              duration: 2000
            });
            setTimeout(()=>{
              this.$router.push({name:'takemoney'})
            },2000)

          })
        } else {
          Toast({
            message: '请选择提现方式',
            position: 'middle',
            duration: 2000
          });
        }

      }
    },
    watch: {
      isChecked(newValue){
        console.log(newValue)
      }
    },
    created () {
      let _this=this
      let params={
        data: {

        }
      }
      recordStatistics_get(params,(res)=>{
        if(res.statusCode==1){
         /* this.moneylist=res.data
          console.log(this.moneylist)*/
          console.log(res)
          _this.moneytotal=res.data.ok.c_money_sum
        }else {
          console.log('请求失败')
        }
      })
    }
  }


</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  .main {
    font-size: .16rem;
    height: 6.67rem;
    background: #fff;
    width: 100%;
    /*height: 100%;*/
    z-index: 3;
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
    float: left;
    text-align: center;
  }

  .order > .pic > img {
    width: 100%;
    border-radius: 50%;
  }

  .order > .details {
    width: 100%;
    float: left;
    margin-top: .24rem;
  }

  .order span {
    display: block;
  }

  .order .span1 {
    /*padding-left: .2rem;*/
    font-size: .3rem;
    text-align: center;
    margin: 0 auto;
    display: block;
    width: 100%;
    color: #F5751D !important;
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
    background-color: #F5751D;
    border-color: #F5751D;
  }

  .mint-checkbox-input[disabled] + .mint-checkbox-core {
    background-color: #d9d9d9;
    border-color: #ccc;
  }
  .detail {
    width: 100%;
  }
</style>

