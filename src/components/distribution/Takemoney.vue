<template>
  <div class="main">
    <section>
      <mt-header title="提现">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <div class="container">
      <div class="title">
        <div>
          <span class="up">可提现金额（元）</span>
          <span class="down">{{ok}}</span>
        </div>
      </div>
      <h5>收入</h5>
      <ul class="view">
        <li class="cell">
          <span>累计销售收益</span>
          <span>{{defaults}}元</span>
        </li>
        <li class="cell">
          <span>累计管理收益</span>
          <span>{{manage}}元</span>
        </li>
      </ul>
      <h5>支出</h5>
      <ul class="view">
        <router-link class="cell" :to="{name: 'moneylist'}" tag="li">
          <span>已提现金额</span>
          <span>
            <span class="iconfont">&#xe61b;</span>
            <span>{{pay}}元</span>
          </span>
        </router-link>
      </ul>
      <h5>推广业绩</h5>
      <ul class="view">
        <li class="cell">
          <span>已收货的业绩</span>
          <span>{{o_status_3}}元</span>
        </li>
        <li class="cell">
          <span>已提现业绩</span>
          <span>{{pay}}元</span>
        </li>
        <li class="cell">
          <span>可提现业绩</span>
          <span>{{ok}}元</span>
        </li>
        <li class="cell">
          <span>被驳回业绩</span>
          <span>{{invalid}}元</span>
        </li>
        <li class="cell">
          <span>申请中业绩</span>
          <span>{{apply}}元</span>
        </li>
        <li class="cell">
          <span>待打款业绩</span>
          <span>{{check}}元</span>
        </li>
      </ul>
      <div class="btn" @click="go1">提现</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>

import { withdrawals_get, withdrawals_post, recordStatistics_get } from '../../api/api.js';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      // ok: '',
      // pay: '',
      // manage: '',
      // defaults: ''
      ok: '0',  //可提现业绩  可提现金额
      defaults: '0',  //累积销售收益
      manage: '0',  //累积管理收益
      o_status_3: '0',  //已收货业绩
      pay: '0',  //已提现业绩  已提现金额
      invalid: '0', //被驳回的业绩
      apply: '0', //申请中业绩
      check: '0', //待打款业绩
    }
  },
  methods: {
    init() {
      let _this = this;
      let params = {
        data: {}
      }
      recordStatistics_get(params, (res) => {
        if (res.statusCode === 1) {
          console.log(res);
          _this.defaults = res.data.default.c_money_sum;  //累积销售收益
          _this.manage = res.data.manage.c_money_sum; //累积管理收益
          _this.o_status_3 = res.data.o_status_3.c_money_sum || 0;  //已收货业绩
          _this.pay = res.data.pay.c_money_sum || 0;  //已提现业绩 可提现金额
          _this.ok = res.data.ok.c_money_sum || 0;  //可提现业绩 可提现金额
          _this.invalid = res.data.invalid.cg_money_sum || 0;  //被驳回业绩
          _this.apply = res.data.apply.c_money_sum;  //申请中业绩
          _this.check = res.data.check.c_money_sum || 0;  //待打款业绩
        } else {
          console.log('请求失败')
        }
      })
    },
    go1() {
      if (this.ok > 0) {
        this.$router.push({ name: 'outmoney' })
      } else {
        Toast({
          message: '没有可提现的金额',
          position: 'middle',
          duration: 2000
        });
      }
    },
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log('路由变化')
  //   this.init()
  //   next()
  // },
  mounted() {
    this.init();
  },
}

</script>

<style lang="less" scoped>
  @import "../../assets/less/index.less";
  @import '../../assets/less/reset.less';
  @import '../../assets/fonts/iconfont.css';
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #F8F8F8;
  overflow: hidden;
  z-index: 20;
  display: flex;
  flex-direction: column;
}

.title {
  /* margin: .1rem 0 0.1rem 0; */
  width: 100%;
  text-align: center;
  height: 1.75rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.1rem;
}

.title span {
  display: block;
  /* color: #333; */
  color: #A7BA2C;
  font-size: 0.20rem;
  text-align: center;
  font-weight: 400;
}

.up {
  /* font-size: .18rem; */
  /* position: relative;
  top: .6rem; */
}

.down {
  /* font-size: .28rem; */
  /* position: relative;
  top: .75rem; */
  font-size: 0.14rem;
  text-align: center;
  margin-top: 0.1rem;
}

h5 {
  text-align: left;
  color: #000;
  border-width: 800;
  line-height: 2.5;
  /*margin-bottom: .05rem;*/
  background-color: #fff;
  padding: 0 0.1rem;
  font-size: 0.16rem;
}

.view {
  background-color: #fff;
  margin-bottom: .05rem;
  border-top: 1px solid #efefef;
  padding: 0 0.1rem 0 0.12rem;
  color: #666;
}

.cell {
  border-bottom: 1px #eee solid;
  text-align: left;
  height: 0.40rem;
  line-height: 0.40rem;
  padding: 0 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .14rem;
}

.cell span {
  float: right;
  height: .36rem;
  font-size: .14rem;
  color: #666;
}

.cell span .iconfont {
  font-size: 0.18rem;
}

.btn {
  width: 95%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  border-radius: 0.05rem;
  background: #19AC15;
  color: #fff;
  margin: 0.4rem auto;
}

.mint-header {
  z-index: 3;
}

.mint-header .mint-button {
  line-height: .41rem;
}

.container {
  width: 100%;
  overflow: auto;
  /*overflow-y: scroll;*/
  -webkit-overflow-scrolling: touch;
  background-color: #F8F8F8;
  /*overflow-y: scroll;*/
  flex: 1;
  /*margin-top: .45rem;*/
}

section {
  /*position: fixed;*/
  width: 100%;
}
</style>
