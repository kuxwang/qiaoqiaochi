<template>
  <div class="main">
    <section>
      <mt-header fixed title="我的伙伴" style="z-index: 3">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <div class="container">
      <section class="top">
      </section>
      <ul class="nav-tab">
        <li :class="{tabActive: selected==1 }" @click="switchPartner('all',1)">
          <div class="title">所有伙伴</div>
          <div class="iconfont listicon">&#xe646;</div>
          <div>
            <span class="num">{{personnumall}}</span>
            <span class="yuan"> 人</span>
          </div>
        </li>
        <li :class="{tabActive: selected==2}" @click="switchPartner('agent',2)">
          <div class="title">已购买伙伴</div>
          <div class="iconfont listicon">&#xe600;</div>
          <div>
            <span class="num">{{personp}}</span>
            <span class="yuan"> 人</span>
          </div>
        </li>
        <li :class="{tabActive: selected==3 }" @click="switchPartner('fans',3)">
          <div class="title">未购买伙伴</div>
          <div class="iconfont listicon">&#xe60d;</div>
          <div>
            <span class="num">{{personnp}}</span>
            <span class="yuan"> 人</span>
          </div>
        </li>
      </ul>
      <div class="search">
        <input type="text" v-model="find" placeholder="输入手机号、粉丝ID" />
        <div @click="searchPartner">搜索</div>
      </div>
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :autoFill="isTrue" :bottom-all-loaded="allLoaded"
        ref="loadmore">
        <ul class="p-list" v-show="defShow">
          <li class="p-cell" v-for="(v,i) in personlist" @click.stop="goPartnerInfo(v)" :key="i">
            <div class="logo">
              <img :src="v.avatar" />
            </div>
            <div class="info">
              <h5>{{v.nickname}}</h5>
              <span>{{v.id}}</span>
              <span class="usertime lr1">{{v.createtime}}关注</span>
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
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Popup, Picker, Toast } from "mint-ui";
import { teamsStatistics, teamsLists, teams } from "../../api/api.js";
import { mapMutations, mapGetters } from "vuex";
import loadingList from "../common/loadinglist.vue";
import defaultImg from "../base/defaultImg/defaultImg";
import myDefImg from "../../assets/images/wdhb.png";

export default {
  data() {
    return {
      selected: 1,
      find: "",
      popupVisible: false,
      personnum: {},
      personlist: [],
      myCurNo: 1,
      onePage: false,
      personnumall: 0,
      personp: 0,
      personnp: 0,
      defMsg: {
        img: myDefImg,
        title1: "尚无我的伙伴",
        title2: ""
      },
      defShow: true,
      psize: 10,
      page: 1,
      bottomStatus: "",
      allLoaded: true,
      isTrue: false,
      type: ""
    };
  },
  components: {
    loadingList,
    defaultImg
  },
  methods: {
    init() {
      //初始化
      let _this = this;
      _this.selected = _this.$route.query.stab;
      _this.personnumall = _this.$route.query.all;
      _this.personp = _this.$route.query.agent;
      _this.personnp = _this.$route.query.fans;
      _this.type = _this.$route.query.type;
      _this.switchPartner(_this.$route.query.type, _this.$route.query.stab);
    },
    switchPartner(type, index) {
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
      _this.personlist = [];
      _this.find = ""; //每次切换清空搜索框
      let params = {
        data: {
          type: type,
          page: _this.page,
          psize: _this.psize
        }
      };
      console.log(params);
      teamsLists(params, res => {
        if (res.statusCode === 1) {
          _this.personlist = res.data.lists;
          // 当orderlist length<=0时 显示默认图
          _this.personlist.length < _this.psize
            ? (_this.allLoaded = true)
            : (_this.allLoaded = false);
          // 当orderlist length<_this.psize 表示可以上拉，否则禁止
          _this.personlist.length <= 0
            ? (_this.defShow = false)
            : (_this.defShow = true);
        } else {
          _this.defShow = false;
          console.log("partner teamsLists:" + res.data);
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
          type: _this.$route.query.type,
          psize: _this.psize
        }
      };
      console.log(params.data);
      teamsLists(params, res => {
        if (res.statusCode === 1) {
          _this.personlist = _this.personlist.concat(res.data.lists);
        }
        this.$refs.loadmore.onBottomLoaded();
        if (res.data.lists.length < _this.psize) {
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

    searchPartner() {
      //搜索
      let _this = this;
      let partnerData = {};
      if (_this.find.length == 11) {
        let reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (reg.test(_this.find)) {
          partnerData = {
            mobile: _this.find
          };
        } else {
          Toast({
            message: "手机号格式不正确",
            position: "top",
            duration: 1500
          });
          return false;
        }
      } else if (Number(_this.find)) {
        partnerData = {
          id: _this.find
        };
      } else {
        Toast({
          message: "请属于正确的会员ID或会员手机号。",
          position: "top",
          duration: 1500
        });
        return false;
      }
      let params = {
        data: partnerData
      };
      teams(params, res => {
        console.log(res.data);
        if (res.statusCode === 1) {
          _this.personlist = [];
          _this.personlist.push(res.data);
          console.log(_this.personlist);
        } else {
          Toast({
            message: res.data,
            position: "top",
            duration: 1500
          });
        }
      });
    },
    goPartnerInfo(v) {
      let _this = this;
      _this.$router.push({ name: "partnerInfo", query: { openid: v.openid } });
    }
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

.main,
.main1 {
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
  height: 0rem;
  /*background: #fff;*/
  margin-top: 0.4rem;
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
}

.top > div > span {
  line-height: 0.32rem;
  /*color: red;*/
  color: #fff;
}

.top .title {
  display: block;
  height: 0.25rem;
  font-size: 0.14rem;
  /*color: #666;*/
  color: #fff;
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

.content {
  margin-bottom: 0.6rem;
}

.content .mfriend {
  margin-top: 0.05rem;
  text-align: left;
  color: rgba(0, 0, 0, 0.7);
  background-color: #fff;
  padding: 0.1rem 0.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.content ul {
  /*margin-top: .1rem;*/
  height: 0.9rem;
  -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, 0.4);
  -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, 0.4);
  box-shadow: 0 1px 2px rgba(138, 138, 138, 0.4);
}

.content .tuiguang {
  height: 1.8rem;
}

.content li {
  position: relative;
  display: block;
  width: 33.3%;
  height: 0.9rem;
  float: left;
  background-color: #fff;
  padding: 0.1rem 0.2rem;
}

.content .li1:after,
.content .li2:after,
.content .li4:after,
.content .li5:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0.14rem;
  width: 1px;
  height: 70%;
  background-color: rgba(0, 0, 0, 0.1);
}

.content .li4,
.content .li5,
.content .li6 {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.content .title {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.14rem;
  line-height: 0.2rem;
}

.content .iconfont {
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

.details {
  margin-top: 0.1rem;
}

.details li {
  margin-top: 0.04rem;
  /*border-top: 1px solid rgba(0, 0, 0, .3)*/
  /*border-top: 1px solid rgba(0, 0, 0, .3)*/
}

.list-type {
  height: 0.4rem;
  border-bottom: 1px solid #e2e2e2;
  text-align: left;
  padding: 0.05rem 0.2rem;
  line-height: 0.3rem;
}

.list-type .num-right {
  float: right;
}

.p-list {
  display: block;
  background-color: @background;
  // margin-top: 1.86rem;
  padding-bottom: 0.4rem;
}

.p-cell {
  display: flex;
  height: 0.78rem;
  padding: 0.1rem 0.2rem;
  background-color: @background;
}

.logo {
  width: 0.58rem;
  height: 0.58rem;
}

.info {
  flex: 1;
  text-align: left;
  margin-left: 0.2rem;
  position: relative;
}

.info h5 {
  margin: 0.1rem 0rem 0.05rem 0rem;
  color: #27272f;
  font-size: 0.14rem;
}

.info span {
  font-size: 0.14rem;
  color: #666;
}

.mint-navbar .mint-tab-item.is-selected {
  /*color: #F5751D;*/
  color: #333;
  border-bottom: none;
}

.mint-tab-container-item {
  overflow: hidden;
  overflow-y: scroll;
  height: 4.2rem;
}

.iconfont {
  display: inline-block;
  margin-right: 0.05rem;
  font-size: 0.2rem;
}

.usertime {
  width: 1.6rem;
  position: absolute;
  right: 0;
  bottom: 0.05rem;
  font-size: 0.12rem;
}

.partner-type {
  background: #fff;
  color: #666;
  margin-top: 0.5rem;
}

.mint-navbar .mint-tab-item {
  padding: 0.1rem 0;
  font-size: 0.2rem;
  border-right: 1px solid #e2e2e2;
}

.mint-navbar {
  margin: 0.05rem 0;
}

.nav-tab {
  height: 0.9rem;
  display: flex;
  position: fixed;
  width: 100%;
  top: 0.46rem;
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
  color: #333;
  border-radius: 50%;
}

.search {
  height: 0.5rem;
  display: flex;
  /*margin: .2rem 2%;*/
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
  flex: 1;
  padding: 0 0.2rem;
  background: #fff;
  margin-top: 0.15rem;
}

.search div {
  background-color: @themeColor1;
  display: block;
  height: 0.4rem;
  flex: 0.3;
  color: #fff;
  // line-height: 0.4rem;
  margin-top: 0.15rem;
  font-size: 0.14rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-tab .tabActive {
  // background-color: #333;
  background: #fff;
  color: #fff;
}

.nav-tab .tabActive .title {
  color: @themeColor1;
}

.tabActive .num,
.tabActive .yuan {
  color: @themeColor1;
}

.tabActive .iconfont {
  color: @themeColor1;
}

/*修改样式哦*/

.p-list {
  // display: block;
  /*margin-bottom: .5rem;*/
  // height: 4.68rem;
  // overflow: hidden;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  .scroll-view(100%);
}

.p-cell {
  display: flex;
  height: 0.78rem;
  padding: 0.1rem 0.2rem;
  border-top: 1px solid #f6f5fa;
  border-bottom: 1px solid #f6f5fa;
  background-color: #fff;
  margin-top: 0.05rem;
}

.logo {
  /*flex: 1;*/
  width: 0.58rem;
}

.info {
  flex: 1;
  text-align: left;
  margin-left: 0.1rem;
  position: relative;
}

.info h5 {
  margin-top: 0.1rem;
  color: #27272f;
  font-size: 0.14rem;
}

.info span {
  font-size: 0.14rem;
  color: #666;
}

.logo img {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  display: block;
  margin: 10% auto;
}

.usertime {
  position: absolute;
  right: 0;
  bottom: 0.05rem;
  font-size: 0.12rem;
}

.mint-popup {
  width: 3rem;
  padding: 0.1rem;
}

/*.pop-up img {*/

/*width: 60%;*/

/*}*/

.pop-up h5 {
  font-size: 0.16rem;
}

.pop-up span {
  font-size: 0.12rem;
}

.pop-down ul {
  width: 100%;
  font-size: 0.1rem;
  color: #333;
  font-weight: 300;
}

.pop-down li {
  display: block;
  text-align: left;
  padding-left: 0.1rem;
}

.pop-left {
  /*flex: 1;*/
}

.pop-right {
  /*flex: 3;*/
  text-align: right;
}

.mint-loadmore {
  position: absolute;
  top: 1.9rem;
}

.mint-loadmore {
  /*overflow-y: scroll;*/
  width: 100%;
  overflow: hidden;
}

.pop-info {
  text-align: center;
}

.pop-info div.img img {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
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

.container {
  // position: absolute;
  // top: 0;
  // width: 100%;
  // overflow: hidden;
  // height: 100%;
  // padding-bottom: 0.5rem;
}
.mint-loadmore-bottom span {
  display: inline-block;
  transition: 0.2s linear;
  vertical-align: middle;
}
</style>
