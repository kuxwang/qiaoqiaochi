<template>
  <div class="main2">
    <mt-header fixed title="订单详情" >
      <router-link to="/extension1" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div class="title">预计可提现金额<span>¥{{ordercom[0].c_money}}</span></div>
    <ul class="order-info">
      <li class="order-cell">
        <div class="left">订单号</div>
        <div class="right">{{ordernum.ordersn}}</div>
      </li>

      <li class="order-cell">
        <div class="left">下单时间</div>
        <!--<div class="right">{{Date(ordernum.createtime).toLocaleString()}}</div>-->
        <div class="right">{{ordernum.createtime}}</div>
      </li>
      <li class="order-cell">
        <div class="left">粉丝昵称</div>
        <div class="right">{{ordercom[0].nickname}}</div>
      </li>
      <li class="order-cell">
        <div class="left">粉丝ID</div>
        <div class="right">{{ordernum.id}}</div>
      </li>
      <li class="order-cell">
        <div class="left">订单金额</div>
        <div class="right">{{ordernum.goodsprice}}元</div>
      </li>

      <li class="order-cell">
        <div class="left">手机号</div>
        <div class="right">{{ordernum.mobile}}</div>
      </li>
      <li class="order-cell">
        <div class="left">分拥比例</div>
        <div class="right">{{ordercom[0].c_rate}}%</div>
      </li>
      <li class="order-cell">
        <div class="left">订单状态</div>
        <div class="right" v-if="ordernum.status==1">未付款</div>
        <div class="right" v-if="ordernum.status=='r1'">已退货</div>
        <div class="right" v-if="ordernum.status==3">已完成</div>
      </li>
      <!--<li class="order-cell">
        <div class="left">直接奖励</div>
        <div class="right">{{ordernum.ordersn}}</div>
      </li>-->
      <!--<li class="order-cell">
        <div class="left">备注</div>
        <div class="right">213123131</div>
      </li>-->
    </ul>

  </div>

</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';
  import {orders} from '../../api/api';
  export default{
    data () {
      return {
        ordernum:{},
        ordercom:{

        }
      }
    },
    components: {

    },
    methods: {
      ...mapMutations({
        tabselect: 'TABSELECT',
      })
    },
    created(){
      this.tabselect=1
    },
    mounted(){
      let params={
          data:{
            ordersn:this.ordersn
          }
      }
      orders(params,(res)=>{
        this.ordernum=res.data.order
        this.ordercom=res.data.commssion
        console.log(this.ordernum)
        console.log(this.ordercom)
      })
    },
    computed:{
      ...mapGetters([
        'ordersn',
      ]),
    }
  }
</script>


<style scoped>
  .main2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: auto;
    z-index: 200;
  }
  .mint-header {
    border-bottom: 0;
    color: #272727;
    border-bottom: 1px solid #eee;
  }
  .title {
    height: 0.48rem;
    border-bottom: 1px solid #eee;
    padding: 0.1rem;
    margin-top: 0.5rem;
    text-align: left;
    line-height: 0.28rem;
  }
  .title span {
    float: right;
    font-size: 0.24rem;
    display: block;
    margin-right: 0.05rem;
  }
  .order-info {
    width: auto;
    padding: 0.1rem;
    color: #666;
    margin: 0.05rem;
    border: 1px solid #e2e2e2;
    box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);
  }
  .order-cell {
    display: flex;
    border: none;
    height: 0.3rem;
    text-align: left;
  }
  .left {
    flex: 1;

  }
  .right {
    flex: 3.5;
    text-align: right;
  }
</style>
