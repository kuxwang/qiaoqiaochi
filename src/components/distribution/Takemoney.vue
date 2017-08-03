<template>
  <div class="main">
    <section>
      <mt-header title="提现">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <div class="title">
      <span class="up">可提现金额（元）</span>
      <span class="down">{{ok}}</span>
    </div>
    <h5>收入</h5>
    <ul class="view">
      <li class="cell">
        累计销售收益
        <span>{{defaults}}元</span>
      </li>
      <li class="cell">
        累计管理收益
        <!--<span class="iconfont">&#xe61b;</span>-->
        <span>{{manage}}元</span>
      </li>
      <!-- <li class="cell">
         累计消费省钱
         <span>1231元</span>
       </li>-->
    </ul>
    <h5>支出</h5>
    <ul class="view">
      <!--<li class="cell">-->
      <router-link class="cell" :to="{name: 'moneylist'}" tag="li">
        已提现金额
        <span class="iconfont">&#xe61b;</span>
        <span>{{pay}}元</span>
      </router-link>
      <!--</li>-->
    </ul>
    <!--  <router-link to="./outmoney" tag="div" class="btn" >
        提现
      </router-link>-->
    <div class="btn" @click="go1">提现</div>

    <router-view></router-view>
  </div>
</template>
<script>

  import {withdrawals_get, withdrawals_post, recordStatistics_get} from '../../api/api.js';
  import {Toast} from 'mint-ui';

  export default{
    data(){
      return {
        ok: '',
        pay: '',
        manage: '',
        defaults: ''
      }
    },
    created(){
      console.log('run created.');
      console.log(this.moneylist);
    },
    mounted(){
      let params = {
        data: {
//          type:'all',
        }
      }
      recordStatistics_get(params, (res) => {
        if (res.statusCode === 1) {
          console.log(res)
          this.ok = res.data.ok.c_money_sum;
          this.pay = res.data.pay.c_money_sum;
          this.defaults = res.data.default.c_money_sum;
          this.manage = res.data.manage.c_money_sum;


//          console.log(this.moneylist)
          console.log(res)

        } else {
          console.log('请求失败')
        }
      })
    },
    methods: {

      go1(){
        if (this.ok !== 0) {
          this.$router.push({name: 'outmoney'})
        } else {
          Toast({
            message: '没有可提现的金额',
            position: 'middle',
            duration: 2000
          });
        }
      }
    }

  }

</script>


<style scoped>
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: auto;
    z-index: 2;
  }

  .title {
    margin: .1rem 0 0.1rem 0;
    /*margin: .5rem 0 0.1rem 0;*/
    width: 100%;
    text-align: center;
    height: 2rem;
    background-color: #f5751d;
    /*margin-bottom: 0.1rem;*/

  }

  .title span {
    display: block;
    color: #fff;
  }

  .up {
    font-size: .18rem;
    position: relative;
    top: .6rem;
  }

  .down {
    font-size: .28rem;
    position: relative;
    top: .75rem;
  }

  h5 {
    text-align: left;
    font-size: .14rem;
    color: #000;
    border-width: 800;
    line-height: 2.5;
    /*margin-bottom: .05rem;*/
    background-color: #fff;
    padding: 0 0.1rem;

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
    line-height: 2.5;
    padding: 0 0.1rem;

  }

  .cell span {
    float: right;
  }

  .btn {
    display: block;
    width: 100%;
    margin: 0 auto;
    height: .45rem;
    background-color: #f5751d;
    color: #fff;
    line-height: .45rem;
    position: fixed;
    bottom: 0;

  }

  .mint-header {
    z-index: 3;
  }
  .mint-header .mint-button {
    line-height: .41rem;
  }

</style>
