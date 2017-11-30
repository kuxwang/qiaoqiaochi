<template>
  <div class="main">
    <section>
      <mt-header fixed title="推广订单" style="z-index: 3">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <div class="containers">
      <div class="list-header c-1">
        <transition name="slide">
          <router-view></router-view>
        </transition>
        <ul class="nav-tab">
          <li :class="{tabActive: selected==1 }" @click="switchOrder('total',1)">
            <div class="title">全部</div>
            <div class="iconfont listicon">&#xe624;</div>
            <div>
              <span class="num">{{ordertotal}}</span>
              <span class="yuan"> 单</span>
            </div>
          </li>
          <li :class="{tabActive: selected==2 }" @click="switchOrder('lock',2)">
            <div class="title">未结算</div>
            <div class="iconfont listicon">&#xe624;</div>
            <div>
              <span class="num">{{orderlock}}</span>
              <span class="yuan"> 单</span>
            </div>
          </li>
          <li :class="{tabActive: selected==3 }" @click="switchOrder('refund',3)">
            <div class="title">已退款</div>
            <div class="iconfont listicon">&#xe8b5;</div>
            <div>
              <span class="num">{{orderrefund}}</span>
              <span class="yuan"> 单</span>
            </div>
          </li>
          <li :class="{tabActive: selected==4 }" @click="switchOrder('ok',4)">
            <div class="title">已结算</div>
            <div class="iconfont listicon">&#xe619;</div>
            <div>
              <span class="num">{{orderok}}</span>
              <span class="yuan"> 单</span>
            </div>
          </li>
        </ul>
        <div class="search">
          <input type="text" results="1" v-model="find" placeholder="输入订单号、粉丝ID" />
          <div @click="searchOrder">搜索</div>
        </div>
      </div>
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :autoFill="isTrue" :bottom-all-loaded="allLoaded"
        ref="loadmore">
        <ul class="p-list" v-show="defShow">
          <li class="p-cell" v-for="(v,i) in orderlist" @click="goOrderInfo(v)" :key="i">
            <div class="up">
              <span class="ordernum">订单编号{{v.ordersn}}</span>
              <span class="time">{{i.createtime}}</span>
            </div>
            <div class="down">
              <div class="logo">
                <img :src="v.avatar" />
              </div>
              <div class="info">
                <h5>{{v.nickname}}</h5>
                <span>{{v.mid}}</span>
              </div>
              <div class="ordertype">
                <span>{{v.status}}</span>
                <span>￥{{v.price}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom" v-show="!allLoaded">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
      <!-- 没有伙伴时 -->
      <default-img :defData="defMsg" v-show="!defShow"></default-img>
    </div>
  </div>
</template>
<script>
import { Search, Loadmore, InfiniteScroll, Toast } from "mint-ui";
import { mapMutations, mapGetters } from "vuex";
import { orderStatistics, orderLists, orders } from "../../api/api";
import defaultImg from "../base/defaultImg/defaultImg";
import myDefImg from "../../assets/images/wdhb.png";

export default {
  data() {
    return {
      active: "tab-container1",
      selected: 1,
      find: "",
      ordernum: {},
      ordertotal: 0,
      orderlock: 0,
      orderrefund: 0,
      orderok: 0,
      defShow: true,
      ordersn: "",
      mid: "",
      defMsg: {
        img: myDefImg,
        title1: "还没有相关订单",
        title2: ""
      },
      orderlist: [],
      psize: 10,
      page: 1,
      bottomStatus: "",
      allLoaded: true,
      isTrue: false,
      type: ""
    };
  },
  methods: {
    init() {
      //初始化
      let _this = this;
      _this.selected = _this.$route.query.stab;
      _this.ordertotal = _this.$route.query.total;
      _this.orderrefund = _this.$route.query.refund;
      _this.orderlock = _this.$route.query.lock;
      _this.orderok = _this.$route.query.ok;
      _this.type = _this.$route.query.type;
      _this.switchOrder(_this.$route.query.type, _this.$route.query.stab);
    },
    switchOrder(type, index) {
      //切换
      let _this = this;
      //数据重置
      _this.psize = 10;
      _this.page = 1;
      _this.bottomStatus = "";
      _this.type = type;
      _this.allLoaded = true;
      _this.isTrue = false;
      _this.selected = index;
      _this.orderlist = [];
      _this.find = ""; //每次切换清空搜索框
      let params = {
        data: {
          type: type,
          page: _this.page,
          psize: _this.psize
        }
      };
      orderLists(params, res => {
        console.log(res);
        if (res.statusCode == 1) {
          _this.orderlist = res.data;
          // 当orderlist length<=0时 显示默认图
          _this.orderlist.length <= 0
            ? (_this.defShow = false)
            : (_this.defShow = true);
          // 当orderlist length<_this.psize 表示可以上拉，否则禁止
          _this.orderlist.length < _this.psize
            ? (_this.allLoaded = true)
            : (_this.allLoaded = false);
        } else {
          _this.defShow = false;
          console.log("extension orderLists" + res.data);
        }
      });
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      //上拉加载
      let _this = this;
      let params = {
        data: {
          page: ++_this.page,
          type: _this.type,
          psize: _this.psize
        }
      };
      console.log(params.data);
      orderLists(params, res => {
        if (res.statusCode === 1) {
          _this.orderlist = _this.orderlist.concat(res.data);
        }
        this.$refs.loadmore.onBottomLoaded();
        if (res.data.length < _this.psize) {
          Toast({
            message: "亲，已经到底了哦~",
            position: "middle",
            duration: 1500
          });
          _this.allLoaded = true;
          return false;
        }
      });
    },

    searchOrder() {
      let _this = this;
      if (_this.find.length == 12) {
        _this.ordersn = _this.find;
      } else if (Number(_this.find)) {
        _this.mid = _this.find;
      } else {
        Toast({
          message: "订单号或用户ID输入有误!",
          position: "top",
          duration: 1500
        });
        _this.find = ""; //输入错误时候，清空搜索框
        return false;
      }
      let params = {
        data: {
          ordersn: _this.ordersn || "",
          mid: _this.mid || ""
        }
      };
      orders(params, res => {
        if (res.statusCode === 1) {
          _this.orderlist = [];
          _this.orderlist = res.data.order;
          _this.find = ""; //请求完成，清空搜索框
        } else {
          Toast({
            message: res.data,
            position: "top",
            duration: 1500
          });
          _this.find = ""; //输入错误时候，清空搜索框
        }
      });
    },
    goOrderInfo(v) {
      console.log(v);
      let _this = this;
      _this.$router.push({
        name: "orderinfo",
        query: { ordersn: v.ordersn, mid: v.mid }
      });
    },
    ...mapMutations({
      searchnum: "SEARCHNUM",
      isScrolls: "ISSCROLL"
    })
  },
  components: {
    defaultImg
  },
  mounted() {
    let _this = this;
    _this.init();
  }
};
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
  background: @background;
  overflow: auto;
  z-index: 20;
}

.avatar {
  position: relative;
  top: 0;
  left: 0;
  margin-top: 0.4rem;
  height: 1rem;
  padding: 0.15rem;
  color: #fff;
  background-color: #f47f2f;
}

.icon {
  width: 0.7rem;
  height: 0.7rem;
  background: grey;
  float: left;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}

.message {
  width: 78%;
  height: 100%;
  float: left;
}

.message div {
  width: 100%;
  height: 33%;
}

.message > div > span {
  display: block;
  max-width: 100%;
  height: 100%;
  float: left;
  font-size: 0.14rem;
  line-height: 0.23rem;
  padding: 0 0 0 10px;
}

.message > span {
  font-size: 0.14rem;
  float: left;
  display: block;
  padding: 0 0 0 10px;
}

.avatar > .right {
  position: absolute;
  top: 0.4rem;
  right: 0.2rem;
}

.top {
  /*height: .64rem;*/
  /*background: #fff;*/
  margin-top: 0.4rem;
  background: rgb(244, 127, 47);
  -webkit-box-shadow: 0 2px 8px rgba(138, 138, 138, 0.4);
  -moz-box-shadow: 0 2px 8px rgba(138, 138, 138, 0.4);
  box-shadow: 0 2px 8px rgba(138, 138, 138, 0.4);
}

.yuan {
  color: #333;
  font-size: 0.1rem;
}

.num {
  color: #333;
  font-size: 0.18rem;
}

.top_1:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0.1rem;
  width: 1px;
  height: 70%;
  background-color: rgba(0, 0, 0, 0.1);
}

.details li {
  margin-top: 0.04rem;
}

.mint-loadmore {
  width: 100%;
}

.p-cell {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 0;
  margin-top: 0.05rem;
  background-color: #fff;
  border-top: 1px solid #f6f5fa;
  width: 100%;
}

.up {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: left;
  border-bottom: 1px solid #f6f5fa;
  padding: 0 0.1rem;
  line-height: 0.36rem;
}

.up .ordernum {
  font-size: 0.13rem;
}

.up .time {
  float: right;
  font-size: 0.1rem;
  font-size: 0.13rem;
}

.down {
  flex: 3;
  height: 0.68rem;
  display: flex;
  padding: 0 0.1rem;
}

.logo {
  flex: 1;
  width: 0.43rem;
  height: 0.43rem;
  margin-top: 0.1rem;
  /*padding: 0.1rem 0;*/
}

.info {
  flex: 4;
  text-align: left;
  margin-left: 0.1rem;
  padding: 0.05rem 0;
  color: #666;
}

.info h5 {
  margin-top: 0.1rem;
  color: #27272f;
  font-size: 0.14rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 1.72rem;
  margin-bottom: 0.05rem;
}

.info span {
  font-size: 0.14rem;
  color: #666;
}

.logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  vertical-align: middle;
  display: block;
}

.ordertype {
  flex: 3;
  padding: 0.05rem 0;
  color: #666;
  max-width: 1.29rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ordertype span {
  display: block;
  text-align: right;
  font-size: 0.14rem;
  margin-top: 0.05rem;
}

.ordertype span:last-child {
  margin-top: 0.1rem;
}

.mint-tab-container-item {
  overflow: hidden;
  overflow-y: scroll;
  height: 4.8rem;
}

.mint-navbar .mint-tab-item.is-selected {
  color: #333;
}

.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 2px solid #333;
}

.nav-tab {
  /*margin-top: .5rem;*/
  height: 0.9rem;
  display: flex;
  position: fixed;
  width: 100%;
  top: 0.45rem;
  z-index: 1;
  background: #fff;
}

.nav-tab li {
  position: relative;
  display: block;
  /*width: 33.3%;*/
  height: 0.9rem;
  /*float: left*/
  background-color: #fff;
  padding: 0.1rem 0.2rem;
  flex: 1;
}

.nav-tab .li1:after,
.nav-tab .li2:after,
.nav-tab .li4:after,
.nav-tab .li5:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0.14rem;
  width: 1px;
  height: 70%;
  background-color: rgba(0, 0, 0, 0.1);
}

.nav-tab .li4,
.content .li5,
.content .li6 {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.nav-tab .title {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.14rem;
  line-height: 0.2rem;
}

.nav-tab .iconfont {
  width: 0.28rem;
  height: 0.3rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.2rem;
  /*border: 1px solid #F5751D;*/
  line-height: 0.3rem;
  /*color: #F5751D;*/
  border-radius: 50%;
}

.search {
  height: 0.5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* margin: .2rem 2%; */
  width: 100%;
  position: fixed;
  z-index: 2;
  background-color: @background;
  top: 1.31rem;
  // padding: 0 2%;
}

.search input {
  border: none;
  display: block;
  height: 0.4rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 0 0.2rem;
  background: #fff;
  margin-top: 0.15rem;
}

.search div {
  background-color: #f5751d;
  display: block;
  height: 0.4rem;
  -webkit-box-flex: 0.3;
  -ms-flex: 0.3;
  flex: 0.3;
  color: #fff;
  // line-height: 0.4rem;
  margin-top: 0.15rem;
  font-size: 0.14rem;
  display: flex;
  align-items:center;
  justify-content: center;
}

.nav-tab .tabActive {
  background-color: #fff;
  color: @themeColor1;
}

.nav-tab .tabActive .title {
  color: @themeColor1;
}

.tabActive .num,
.tabActive .yuan {
  color: @themeColor1;
}

.c-1 {
  z-index: 3;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
}

.tips {
  text-align: center;
  font-size: 0.14rem;
  color: #666;
  margin-top: 2.8rem;
}

.tips .iconfont {
  display: block;
  font-size: 0.8rem;
}

.list-content {
  overflow: hidden;
  position: absolute;
  top: 1.9rem;
  width: 100%;
}

.mint-loadmore-bottom span {
  display: inline-block;
  transition: 0.2s linear;
  vertical-align: middle;
}

.p-list {
  background-color: @background;
  padding-bottom: 0.1rem;
  margin-top: 1.9rem;
  .scroll-view(100%); // .scroll-view(5rem);
}

.mint-loadmore {
  overflow: hidden;
}
</style>
