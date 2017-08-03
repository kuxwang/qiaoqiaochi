<template>
  <div class="main order-header">
    <mt-header title="我的订单" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="page-navbar">
      <mt-navbar class="page-part" v-model="selected" fixed>
        <mt-tab-item id="all">全部</mt-tab-item>
        <mt-tab-item id="will-pay">待付款</mt-tab-item>
        <mt-tab-item id="will-send">待发货</mt-tab-item>
        <mt-tab-item id="will-reserve">待收货</mt-tab-item>
        <mt-tab-item id="done">已完成</mt-tab-item>
      </mt-navbar>
      <order-lists></order-lists>
    </div>
    <v-tabbar></v-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import {Navbar, MessageBox, Loadmore, Toast} from 'mint-ui';
  import vTabbar from '../components/common/Tabbar';
  import orderLists from '../components/order/orderlist';
  import {orderList, orderManu} from '../api/api.js'
  import {mapMutations, mapGetters} from 'vuex'
  export default{
    name: 'page-navbar',
    data(){
      return {
        selected: 'all',
        statusType: '',
      }
    },
    watch: {
      selected(val){
        switch (val) {
          case 'all' :
            console.log(val)
            break;
          case 'will-pay' :
            console.log(val)

            break;
          case 'will-send' :
            console.log(val)

            break;
          case 'will-reserve' :
            console.log(val)

            break;
          case 'done' :
            console.log(val)

            break;
        }
      }
    },
    methods: {},
    created(){
      this.getOrderList(this.statusPage.all);
    },
    computed: {},
    components: {
      vTabbar,
      orderLists
    },
  }
</script>
<style scoped>
  @import '../assets/css/reset/reset.css';

  * {
    font-size: .15rem;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .main {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    font-size: .15rem;
    overflow: auto
  }

  .page-part {
    top: .45rem;
    height: .4rem
  }

  .share-page {
    padding: .5rem 1rem;
    color: #999;
  }

  .share-page > div.iconfont {
    font-size: .7rem;
  }

  .share-page > p {
    font-size: .14rem;
  }

  .share-page > button {
    width: .7rem;
    height: .35rem;
    border-radius: .03rem;
    margin-top: .15rem;
    background: #ff4f4f;
    outline: none;
    color: #ddd;
  }

</style>
