<template>
  <div class="main">
    <section>
      <mt-header title="提现明细" >
        <router-link to="/takemoney" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <ul class="moneylists" v-if="moneylist.length">
      <li class="moneycell" v-for="(i,index) in moneylist" :class="{'colorbor': comparefun(moneylist,index)}">
        <div class="left">
          <div class="time">{{i.applytime.substr(0,10)}}</div>
        </div>
        <div class="mid">
          <!--<span class="ordersn">订单号：1212312313</span>-->
          <div class="money">{{i.commission}}元</div>
        </div>
        <div class="right">
          <span class="type" >{{i.type}}</span>
          <!--<span class="type" v-if="i.status==2">审核通过</span>
          <span class="type" v-if="i.status==1">审核通过</span>-->
        </div>
      </li>
    </ul>
    <div v-if="!moneylist.length" class="tips">
      <span class="iconfont">&#xe66f;</span>
      没有提现记录<br>
    </div>
  </div>
</template>

<script>
  import {withdrawals_get, withdrawals_post} from '../../api/api.js';

  export default{
    data(){
      return {
        moneylist: []
      }
    },
    created(){

    },
    mounted(){
      let params = {
        data: {
          type: 'all',
          page: 1,
          psize: 10
        }
      }
      withdrawals_get(params, (res) => {
        this.moneylist = res.data.all
//        this.moneylist = []
//        console.log(this.moneylist)
      })
    },
    methods: {
      comparefun(obj,i){
//        console.log(obj.length)
//        console.log(i)
        if( i == obj.length-1){
          return true
        }else {
          return false
        }
//        return true
      }
    }

  }

</script>

<style scoped>
  .main {
    position: fixed;
    top: 0rem;
    width: 100%;
    height: 100%;
    background: #eee;
    z-index: 3;
    overflow: hidden;
  }

  ul {
    width: 100%;
    padding: 0.1rem;
    background: #fff;
    /*margin-top: .5rem;*/
    border: 1px solid #eee;

  }

  li {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    /*border-top: 1px solid rgba(0, 0, 0, .1) !important;*/
    margin-top: 0.05rem;
    padding: 0.1rem 0;
    height: 0.5rem;

  }
  li:last-child{

    /*border-bottom: 1px solid rgba(0, 0, 0, .1);*/

  }
  .left {
    flex: 1;
    position: relative;
    line-height: .3rem;
  }

  .money {
    color: #f5751d;
    font-size: .18rem;
  }

  .right {
    flex: 1;
    position: relative;
    text-align: right;
    height: 100%;
  }

  .time {
    font-size: .14rem;
    right: 0.05rem;
  }

  .time {

  }
  .type {
    color: #46DC88;
    line-height: .3rem;
  }
  .ordersn {
    font-size: .12rem;
  }
  .mid {
    flex: 2;
  }
  .colorbor {
    border-bottom: none !important;
  }

  .tips {
    text-align: center;
    font-size: .14rem;
    color: #666;
    margin-top: 2rem;

  }

  .tips .iconfont {
    display: block;
    font-size: .8rem;
  }

</style>


