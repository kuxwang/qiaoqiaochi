<template>
  <div class="main order-header">
    <mt-header title="我的订单" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mint-navbar page-part">
      <a class="mint-tab-item" :class="{'is-selected': isselect==1}" @click="isselect=1">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">全部</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==2}" @click="isselect=2">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">待付款</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==3}" @click="isselect=3">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">待发货</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==4}" @click="isselect=4">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">待收货</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==5}" @click="isselect=5">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">已完成</div>
      </a>
    </div>
    <div class="page-navbar">
      <!--<mt-navbar class="page-part" v-model="selected" fixed>-->
      <!--<mt-tab-item id="all">全部</mt-tab-item>-->
      <!--<mt-tab-item id="will-pay">待付款</mt-tab-item>-->
      <!--<mt-tab-item id="will-send">待发货</mt-tab-item>-->
      <!--<mt-tab-item id="will-reserve">待收货</mt-tab-item>-->
      <!--<mt-tab-item id="done">已完成</mt-tab-item>-->
      <!--</mt-navbar>-->


      <order-lists ref="mylist"></order-lists>
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
        isselect: 1
      }
    },
    watch: {
      isselect(val){
        switch (val) {
          case 1 :
            this.$refs.mylist.statusType = '';
            this.$refs.mylist.init('')
            break;
          case 2 :
            this.$refs.mylist.statusType = 0;
            this.$refs.mylist.init(0)
            break;
          case 3 :
            this.$refs.mylist.statusType = 1;
            this.$refs.mylist.init(1)
            break;
          case 4 :

            this.$refs.mylist.statusType = 2;
            this.$refs.mylist.init(2)
            break;
          case 5 :
            this.$refs.mylist.statusType = 3;
            this.$refs.mylist.init(3)
            break;
        }
      }
    },
    methods: {},
    created(){
      console.log(this.$refs)
//      this.$refs.mylist.statusType = ''
//      this.getOrderList(this.statusPage);
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
    height: .4rem;
    position: fixed;
    width: 100%;

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

  /*选项卡*/
  .mint-navbar .mint-tab-item {
    font-size: 15px;
    padding: 17px 0px;
    /*position: fixed;*/
    /*width: 100%;*/
  }

  .mint-tab-item {
    display: block;
    -webkit-box-flex: 1;
    padding: 7px 0px;
    flex: 1 1 0%;
    text-decoration: none;
  }

  a {
    color: inherit;
    background-color: transparent;
    text-decoration: none;
  }

  .mint-navbar {
    background-color: rgb(255, 255, 255);
    display: flex;
    text-align: center;
    /*margin-top: .46rem;*/
  }

  .page-navbar {
    overflow: scroll;
    margin-top: -1px;
    height: 6.22rem;
  }

  * {
    box-sizing: border-box;
  }


</style>
