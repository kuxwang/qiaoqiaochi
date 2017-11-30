<template>
  <div class="main">
    <mt-header title="个人中心">
    </mt-header>
    <div class="container">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :maxDistance="60" :distanceIndex="disindex" :top-distance="30" ref="loadmore" v-show="!on1">
        <div slot="top" class="mint-loadmore-top">
          <span class="iconfont" v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">&#xe732;下拉刷新</span>
          <span class="loading" v-show="topStatus === 'loading'">加载中</span>
        </div>
        <router-link class="iconfont option" :to="{name:'userInfo'}">
          设置
        </router-link>
        <section class="avatar">
          <div class="avatar-content">
            <router-link class="icon avatar-photo" :to="{name:'userInfo'}" tag="div">
              <img :src="memberInfo.avatar" alt="">
            </router-link>
            <div class="message">
              <div>
                <span class="hello">{{memberInfo.nickname}}</span>
                <span class="id" v-if="memberInfo.level">{{memberInfo.level}}</span>
                <span class="id" v-else>
                  {{memberInfo.leveldetail.levelname}}
                </span>

              </div>
            </div>
          </div>
          <div class="user-nav-box">
            <router-link class="nav-left" :to="{name:'collect'}" tag="div">
              收藏
            </router-link>
            <router-link class="nav-right" :to="{name:'footprint'}" tag="div">
              足迹
            </router-link>
          </div>
        </section>

        <section class="content">
          <div class="mfriend" @click="goOrder(1)">
            <span class="mint-cell-text">我的订单</span>
            <i class="iconfont right">
              <span>全部订单</span> &#xe649;
            </i>
          </div>
          <ul class="order-list">
            <li class="li1" @click="goOrder(2)">
              <div class="iconfont listicon">
                <img src="../assets/images/dfk.png" alt="">
                <span class="numpoint">{{status0Num}}</span>
              </div>
              <div class="title">待付款</div>
            </li>
            <li class="li1" @click="goOrder(3)">
              <div class="iconfont listicon">
                <img src="../assets/images/yfk.png" alt="">
                <span class="numpoint">{{status1Num}}</span>
              </div>
              <div class="title">待发货</div>
            </li>
            <li class="li1" @click="goOrder(4)">
              <div class="iconfont listicon">
                <img src="../assets/images/dhh.png" alt="">
                <span class="numpoint">{{status2Num}}</span>
              </div>
              <div class="title">待收货</div>
            </li>
            <li class="li1" @click="goOrder(5)">
              <div class="iconfont listicon">
                <img src="../assets/images/ywc.png" alt="">
                <span class="numpoint">{{status3Num}}</span>
              </div>
              <div class="title">已完成</div>
            </li>
          </ul>
          <ul class="center-list">
            <router-link class="center-cell" :to="{name:'vipCenter'}" tag="li">
              <div class="title-list">会员中心</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>
          </ul>
          <button class="outLogin" @click="outLogin">退出登录</button>
        </section>
      </mt-loadmore>
      <div class="loading-container" v-show="on1">
        <loading></loading>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import {
  recordStatistics_get,
  teamsStatistics,
  orderStatistics,
  memberInfo,
  LOGINOUT,
  GET_USERINFO,
  GET_STATISTICS
} from "../api/api";
import { mapMutations, mapGetters, mapState } from "vuex";
import { _webapp } from "../config/hook.js";
import { MessageBox, Toast } from "mint-ui";
import Loading from "../components/base/loading/loading";
export default {
  data() {
    return {
      topStatus: "",
      disindex: 3,
      status0Num: 0, //待付款
      status1Num: 0, //已付款
      status2Num: 0, //待收货
      status3Num: 0, //已完成
      memberInfo: {
        nickname: "", //昵称
        id: "", //会员id
        level: "", //会员等级
        avatar: "",
        leveldetail: {
          levelname: "默认等级"
        },
        mobile: "",
        from: "", //推荐人
        credit1: "",
        credit2: ""
      },
      defaultAvatar: "",
      on1: true
    };
  },
  methods: {
    init() {
      //初始化
      let _this = this;
      memberInfo({ data: {} }, function(res) {

        if (res.statusCode == 1) {
          console.log("userCenter init 初始化");
          console.log(res);
          if(Number(res.data.isagent)===0){
            _this.$router.push({name:'userInfo'});
          }
          _this.memberInfo.nickname = res.data.nickname;
          _this.memberInfo.id = res.data.id;
          _this.memberInfo.level = res.data.agentleveldetail.levelname;
          _this.memberInfo.leveldetail = res.data.leveldetail;
          _this.memberInfo.avatar = res.data.avatar;
          _this.memberInfo.from = res.data.parent_name;
          _this.memberInfo.mobile = res.data.mobile;
          _this.memberInfo.credit2 = res.data.credit2;
          _this.memberInfo.credit1 = res.data.credit1;
          _this.setImgUrl(_this.memberInfo.avatar);
          _this.$refs.loadmore.onTopLoaded();
        } else {
          console.log("会员接口数据异常");
          _this.$refs.loadmore.onTopLoaded();
        }
      });
      GET_STATISTICS({ data: {} }, function(res) {
        console.log(res);
        if (res.statusCode == 1) {
          _this.status0Num = res.data.o_status_0_count;
          _this.status1Num = res.data.o_status_1_count;
          _this.status2Num = res.data.o_status_2_count;
          _this.status3Num = res.data.o_status_3_count;
          _this.on1 = false;
        } else {
          console.log(res.data);
        }
      });
    },
    goOrder(v) {
      //去我的订单
      let _this = this;
      _this.setOrderStatus(v); //把每次点击的订单状态 存入vuex
      // _this.$router.push({ name: 'order', query: { stab: v } });
      _this.$router.push({ name: "order" });
    },
    outLogin() {
      MessageBox({
        title: "确认退出当前账号?",
        message: "点击确认退出",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          //表示点击了确定
          // _webapp.logOut((res)=>{})
          // console.log('试试')
          _webapp.nativeLogin();
          // LOGINOUT(function(res) {
          //   console.log('推出成功')
          // })
        } else if (action === "cancel") {
          //表示点击了取消
        }
      });
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      this.init();
    },
    ...mapMutations({
      setImgUrl: "IMGURL",
      setOrderStatus: "SET_ORDERSTATUS"
    })
  },
  computed: {
    ...mapState(["imgUrl"])
  },
  components: {
    Loading
  },
  filter: {
    setdefault(value) {
      return value || 0;
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === "order" || from.name === "userInfo") {
        this.init();
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/common.less";
.main,
.main1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  /*overflow: auto;*/
  overflow: hidden;
}

.option {
  position: absolute;
  right: 0.16rem;
  top: 0.6rem;
  font-size: 0.16rem;
  color: #333;
  z-index: 10;
}

.avatar {
  /* height: 1.47rem; */
  color: #fff;
  background-size: 100% 100%;
  background-color: #fff;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin-bottom: 0.1rem;
  background: #fff;
}

.icon {
  width: 0.9rem;
  height: 0.9rem;
  background: grey;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 1px solid #ffffff;
  overflow: hidden;
  margin: 0 auto;
}

.icon > img {
  display: block;
  width: 100%;
  height: 100%;
}

.adv {
  width: 100%;
}

.message {
  /* height: .5rem; */
  /* padding-left: 0.1rem; */
  /* text-align: left; */
}

.message > div {
  width: 100%;
}

.message span {
  font-size: 0.12rem;
  color: #333;
}

.message > div > .hello {
  display: block;
  height: 100%;
  font-size: 0.14rem;
  line-height: 0.23rem;
  text-align: left;
  text-align: center;
  margin-top: 0.05rem;
  color: #333;
}

.message > div > .level {
  display: inline-block;
  height: 100%;
  font-size: 0.12rem;
  line-height: 0.12rem;
  text-align: left;
  font-weight: bold;
  padding: 0.01rem;
  border: 1px solid #fff;
  -webkit-border-radius: 0.04rem;
  -moz-border-radius: 0.04rem;
  border-radius: 0.04rem;
}

.message > span {
  font-size: 0.14rem;
  float: left;
  display: block;
  padding: 0 0 0 10px;
}

.top {
  height: 0.35rem;
  background: rgb(244, 127, 47);
  -webkit-box-shadow: 0 2px 8px rgba(138, 138, 138, 0.4);
  -moz-box-shadow: 0 2px 8px rgba(138, 138, 138, 0.4);
  box-shadow: 0 2px 8px rgba(138, 138, 138, 0.4);
}

.top > div {
  position: relative;
  width: 50%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  float: left;
  line-height: 0.5484rem;
  color: #fff;
  font-size: 0.25rem;
}

.top > div > span {
  line-height: 0.32rem;
  color: #fff;
}

.top .title {
  display: block;
  height: 0.25rem;
  font-size: 0.14rem;
  color: #fff;
}

.yuan {
  color: red;
  font-size: 0.1rem;
}

.num {
  color: red;
  font-size: 0.14rem;
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

.content {
  margin-bottom: 0.25rem;
  position: inherit !important;
  height: 100%;
}

.content .mfriend {
  position: relative;
  height: 0.5rem;
  line-height: 0.34rem;
  text-align: left;
  background-color: #fff;
  padding: 0.08rem 0.15rem;
  border-bottom: 1px solid #f6f6f9;
}

.mint-cell-text {
  font-size: 0.14rem;
  color: #333;
  /* font-weight: bold; */
}

.content ul.order-list {
  padding: 0.25rem 0;
  background: #fff;
}

.content .tuiguang {
  height: 1.8rem;
}

.content .order-list li {
  padding: 0 0.05rem;
  border-right: 1px solid #f6f6f9;
  flex: 1;
  position: relative;
}

.content .title {
  color: #333;
  font-size: 0.14rem;
  line-height: 0.2rem;
  margin-top: 0.08rem;
}

.content .iconfont {
  /* margin: 0 auto; */
}

.li1 .iconfont {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 auto;
}

.content .iconfont img {
  display: block;
  width: 100%;
  height: 100%;
}

.numpoint {
  text-align: center;
  background: #ec5151;
  color: #fff;
  line-height: 15px;
  border-radius: 11px;
  position: absolute;
  right: 0.23rem;
  top: -5px;
  font-size: 12px;
  padding: 0 0.04rem;
}

.order-list li:first-child .listicon {
  font-size: 0.25rem;
}

.order-list li:last-child .listicon {
  font-size: 0.24rem;
}

.content .order-icon {
  vertical-align: middle;
  font-size: 0.18rem;
}

.title-list {
  float: left;
  font-size: 0.14rem;
  /* font-weight: bold; */
  margin-left: 0.15rem;
}

.details {
  margin-top: 0.1rem;
}

.details li {
  margin-top: 0.04rem;
}

.order-list {
  display: flex;
}

.order-list li {
  flex: 1;
}

.outLogin {
  display: block;
  margin-top: 0.05rem;
  height: 0.48rem;
  width: 100%;
  line-height: 0.48rem;
  background-color: #fff;
  border-bottom: 1px solid #efeff4;
  outline: none;
  font-size: 0.16rem;
  color: rgba(0, 0, 0, 0.5);
}

.topdiv-first:after {
  content: "";
  position: absolute;
  width: 1px;
  height: 0.4rem;
  top: 0.09rem;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
}

.mint-cell-text-right {
  position: absolute;
  right: 0.4rem;
  top: 0.1rem;
  font-size: 0.14rem;
  /*font-weight: 700;*/
  color: rgba(0, 0, 0, 0.3);
}

.mint-cell-text-right:after {
  content: ">";
  position: absolute;
  top: -0.01rem;
  width: 0.1rem;
  right: -0.2rem;
  color: rgba(0, 0, 0, 0.3);
}

.text-right {
  position: absolute;
  width: 30%;
  height: 100%;
  top: 0;
  right: 0;
}

.mint-header.is-fixed {
  top: 0rem;
}

.mymoney {
  position: absolute;
  top: 0.5rem;
  width: 30% !important;
  right: 0.2rem;
}

.mymoney > p {
  text-align: right;
  font-weight: bold;
}

.nummoney {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container {
  /*position: absolute;*/
  top: 0;
  width: 100%;
  overflow-y: scroll;
  /*-webkit-overflow-scrolling: touch;*/
  height: 100%;
  /*overflow-y: scroll;*/
  /* padding: 0 0 1.14rem 0 */
}

.nametype {
  display: inline-block;
  width: 0.6rem;
  text-align: right;
}

.mint-loadmore-top {
  margin-top: -51px;
  background: rgba(255, 255, 255, 0.7);
}

/*.mint-loadmore {*/

/*height: 100%;*/

/*}*/

.loading {
  position: relative;
}

.loading:before {
  content: "";
  position: absolute;
  left: -0.35rem;
  top: -0.08rem;
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  /*background: url('../assets/images/Spinner.gif') no-repeat 100% 100%;*/
  background-size: 100% 100%;
}

.center-list {
  width: 100%;
  margin-top: 0.1rem;
  text-align: left;
  font-size: 0.14rem;
  color: #333;
}

.center-cell {
  position: relative;
  height: 0.48rem;
  width: 100%;
  line-height: 0.48rem;
  background-color: #fff;
  border-bottom: 1px solid #efeff4;
}

.center-cell .iconfont {
  /*margin-right: -.1rem;*/
  /* margin-left: 0.1rem; */
  padding: 0 0.1rem;
  float: left;
  height: 100%;
  font-size: 0.23rem;
  line-height: 0.48rem;
}

.center-cell > .right {
  position: absolute;
  right: 0;
  font-size: 0.15rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
}

.mfriend > .right {
  position: absolute;
  right: 0.1rem;
  font-size: 0.14rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
}

.mfriend > .right span {
  font-size: 0.14rem;
  color: #888;
}

.icon1 {
  color: #6491f7 !important;
}

.icon2 {
  color: #f99e4a !important;
}

.icon3 {
  color: #fdcf30 !important;
}

.icon4 {
  color: #ef6262 !important;
}

.icon5 {
  color: #65b2fa !important;
}

.icon6 {
  color: #ef6262 !important;
}

.postUserInfo {
  width: 100%;
  margin-top: 0.2rem;
}

.postUserInfo-item {
  width: 100%;
  height: 0.45rem;
  box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, 0.3);
  background: #f5751d;
  color: #fff;
  font-size: 0.16rem;
}

/* 新增 */

.user-nav-box {
  width: 100%;

  font-size: 0.16rem;
  color: #333;
  display: flex;
}

.user-nav-box div {
  text-align: center;
  flex: 1;
  font-size: 0.16rem;
  padding: 0.15rem 0rem;
}

.avatar-content {
  padding-top: 0.2rem;
}
</style>
