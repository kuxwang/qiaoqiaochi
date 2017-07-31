<template>
  <div class="main2">
    <mt-header title="订单详情" fixed class="header">
      <router-link to="/extension1" slot="left" class="pro-white">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="title">
      <h3>{{ordernum.goodsprice}}</h3>
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
    <ul class="order-list" >


      <li v-for="(i,index) in ordercom" >
        <div class="left">
          <span class="icon">{{i.c_rank}}</span>
        </div>
        <div class="right" :class="{'color': comparefun(ordercom,index)}">
          <div class="money">
            <p>+<em>{{i.nickname}}</em></p>
            <p class="yong">佣金金额：{{i.c_money}}</p>
          </div>
          <div class="dec">
            <p>{{i.id}}</p>
            <p class="yong">佣金比列:{{i.c_rate}}</p>
          </div>
        </div>
      </li>

    </ul>

  </div>

</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';
  import {orders} from '../../api/api';
  export default{
    data () {
      return {
        ordernum: [],
        ordercom: {},
        totalmoney: '',
        nickname: '',
        c_rate: ''
      }
    },
    components: {},
    methods: {
      ...mapMutations({
        tabselect: 'TABSELECT',
      }),
      comparefun(obj,i){
          console.log(obj.length)
          console.log(i)
          if( i == obj.length-1){
              return true
          }else {
              return false
          }
//        return true
      }
    },
    created(){
      this.tabselect(1)
    },
    mounted(){

      let params = {
        data: {
          ordersn: this.ordersn
        }
      }
      orders(params, (res) => {
        this.ordernum = res.data.order
        this.ordercom = res.data.commssion
        this.totalmoney = res.data.commssion[0].c_money
        this.nickname = res.data.commssion[0].nickname
        this.c_rate = res.data.commssion[0].c_rate
        console.log(this.ordernum)
        console.log(this.ordercom)
        console.log(res)
//        this.totalmoney=res.data.order[0].c_money
      })
    },
    computed: {
      ...mapGetters([
        'ordersn',
      ]),
    }
  }
</script>


<style scoped>
  .title {
    background: #fff;
    padding: .26rem 0px .1rem;
    margin-top: .5rem
  }

  .main2 {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 200;
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
  }

  ul.order-list li {
    display: flex;
    overflow: hidden;
    background: #fff;
    padding: .05rem 0px;
  }

  ul.order-list .left {
    width: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul.order-list .left span {
    display: block;
    width: .4rem;
    height: .4rem;
    border-radius: .3rem;
    border: 1px #F5751D solid;
  }

  ul.order-list .right {
    border-bottom: 1px solid #dedede;
    text-align: left;
    flex: 6;
    padding: .1rem;
  }

  ul.order-list .money {
    display: flex;
    font-size: .14rem;
    margin-bottom: .01rem;
    justify-content: space-between;
  }

  ul.order-list .money em {
    font-style: normal;
    font-size: .16rem;
  }

  ul.order-list .dec {
    font-size: .14rem;
    display: flex;
    justify-content: space-between;
  }

  ul.order-list .yong {
    width: 1rem;
    text-align: left;
    font-size: .12rem;
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

</style>
