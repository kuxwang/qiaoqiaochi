<template>
  <div class="main order-header">
    <mt-header id="topheader" title="我的订单" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container1"> </div>
    <div class="mint-navbar page-part" id="nav">
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
    <div id="b" class="container">
    <div id="page-navbar" class="page-navbar">
      <order-lists ref="mylist"></order-lists>
    </div>
    </div>

    <v-tabbar id="tabbar"></v-tabbar>
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
            this.$refs.mylist.init(0);
            console.log(this.isConfirm)
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
      },
      $route (to,from) {

        if (from.name === 'orderd'&&this.isConfirm===2) {
//        this.memberInfo.avatar = this.imgUrl
          console.log(this.isConfirm)
          this.isConf(1)
          this.isselect = 1
          this.$refs.mylist.statusType = '';
          this.$refs.mylist.init('')
      }
    }
    },

    methods: {
      ...mapMutations({
        isConf:'ISCONFIRM'
      }),
      setHeight () {
        /*let contentDiv = document.getElementById('page-navbar');
        let topDiv = document.getElementById('topheader');
        let navDiv = document.getElementById('nav');
        let tabbarDiv = document.getElementsByClassName('tabbar');
        let diffHeght = (document.body.clientHeight - topDiv.clientHeight - navDiv.clientHeight - 50) / 100 + 'rem';*/
//        contentDiv.style.height = diffHeght;
        let a = document.getElementById('b');
        let topDiv = document.getElementById('topheader');
        let navDiv = document.getElementById('nav');
        let diffHeght = (document.body.clientHeight - topDiv.clientHeight - navDiv.clientHeight - 10) / 100 + 'rem';
          a.style.height = diffHeght;
          console.log(diffHeght)
      }
    },
    created(){

    },
    mounted () {
      this.setHeight()
    },
    computed: {
      ...mapGetters([
        'isConfirm'
      ])
    },
//    activated () {
//      console.log('1')
//      this.$refs.mylist.init('')
//    },

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
    overflow: hidden;
  }

  .page-part {
    top: .4rem;
    height: .45rem !important;
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
    overflow-y: scroll;
    margin-top: .8rem;
    /*height: 6.22rem;*/
    -webkit-overflow-scrolling: touch
  }

  * {
    box-sizing: border-box;
  }
  .container {
    position: absolute;
    top:0;
    width: 100%;
    overflow: auto;
    /*overflow-y: scroll;*/
    -webkit-overflow-scrolling: touch;
    height: 100%;
    /*overflow-y: scroll;*/

  }
  /*.container1 {
    position: absolute;
    top:0;
    width: 100%;
    overflow: hi;
    !*overflow-y: scroll;*!
    !*-webkit-overflow-scrolling: touch;*!
    height: 100%;
    !*overflow-y: scroll;*!

  }*/
  #nav {
    z-index: 4;
  }


</style>
