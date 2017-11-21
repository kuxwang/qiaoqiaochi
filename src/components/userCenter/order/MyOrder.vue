<template>
  <div class="main order-header">
    <mt-header fixed title="我的订单">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="mint-navbar page-part" id="nav">
      <a class="mint-tab-item" :class="{'is-selected': isselect==1}" @click="switchOrderStatus(1)">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">全部</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==2}" @click="switchOrderStatus(2)">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">待付款</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==3}" @click="switchOrderStatus(3)">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">待发货</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==4}" @click="switchOrderStatus(4)">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">待收货</div>
      </a>
      <a class="mint-tab-item" :class="{'is-selected': isselect==5}" @click="switchOrderStatus(5)">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">已完成</div>
      </a>
    </div>

    <div class="container">
      <order-lists ref="mylist"></order-lists>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { Navbar, MessageBox, Loadmore, Toast } from 'mint-ui';
import orderLists from './orderlist';
import { orderList, orderManu } from '../../../api/api.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      selected: 'all',
      statusType: '',
      isselect: 0
    }
  },

  methods: {
    goBack() {
      let _this = this;
      _this.$router.push({ name: 'userCenter' });
    },
    init() {
      console.log('myorder 初始化了');
      let _this = this;
      _this.isselect = _this.orderStatus;
      _this.switchOrderStatus(_this.orderStatus);
    },
    switchOrderStatus(val) {
      // 0待付款 1已付款 2已发货 3已完成
      let _this = this;
      switch (val) {
        case 1:
          console.log('全部');
          _this.switchOrderItem('', val);
          break;
        case 2:
          console.log('代付款');
          _this.switchOrderItem(0, val);
          break;
        case 3:
          console.log('待收货');
          _this.switchOrderItem(1, val);
          break;
        case 4:
          console.log('待收货');
          _this.switchOrderItem(2, val);
          break;
        case 5:
          console.log('完成');
          _this.switchOrderItem(3, val);
          break;
      }
    },
    switchOrderItem(v1, v2) { //公共部分抽出来
      let _this = this;
      _this.$refs.mylist.statusType = v1;
      _this.$refs.mylist.init(v1);
      _this.isselect = v2;
      _this.setOrderStatus(v2);  //把每次点击的订单状态 存入vuex
    },
    ...mapMutations({
      isConf: 'ISCONFIRM',
      setOrderStatus: 'SET_ORDERSTATUS'
    })
  },
  watch: {
    $route(to, from) { //只要有路由变化，触发
      let _this = this;
      _this.isselect = _this.orderStatus;
      _this.switchOrderStatus(_this.orderStatus);
    }
  },
  computed: {
    ...mapGetters([
      'isConfirm',
      'orderStatus'
    ])
  },
  components: {
    orderLists
  },
  mounted() {
    let _this = this;
    _this.init();
  },
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0)
}

.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: @background;
  font-size: .15rem;
  overflow: hidden;
  z-index: 10;
}

.page-part {
  top: .45rem;
  height: .45rem !important;
  position: fixed;
  width: 100%;
}

.share-page {
  padding: .5rem 1rem;
  color: #999;
}

.share-page>div.iconfont {
  font-size: .7rem;
}

.share-page>p {
  font-size: .14rem;
}

.share-page>button {
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

.container {
  width: 100%;
  .scroll-view(100%);
  margin-top: 0.9rem;
}

#nav {
  z-index: 4;
}
</style>
