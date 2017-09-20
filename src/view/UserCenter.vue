<template>
  <div class="main">
    <div class="container">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :maxDistance="60"
                   :distanceIndex="disindex"
                   :top-distance="30" ref="loadmore">
        <div slot="top" class="mint-loadmore-top">
          <span class="iconfont" v-show="topStatus !== 'loading'"
                :class="{ 'rotate': topStatus === 'drop' }">&#xe732;下拉刷新</span>
          <span class="loading" v-show="topStatus === 'loading'">加载中</span>
        </div>
        <router-link class="option" :to="{name:'userinfo'}">
          设置
        </router-link>
        <section class="avatar">
          <router-link class="icon" :to="{name:'userinfo'}">
            <img :src="memberInfo.avatar" alt="">
          </router-link>
          <div class="message">
            <div>
              <span class="hello">{{memberInfo.nickname}}</span>
              <span class="level">{{memberInfo.leveldetail.levelname}}</span>
            </div>
            <router-link class="mymoney" :to="{name: 'takemoney'}" tag="div">
              <p>
                {{memberInfo.credit2}} 元
              </p>
              <p>
                我的余额
              </p>
            </router-link>
          </div>
        </section>

        <section class="content">

          <router-link class="mfriend" :to="{path:'order',query:{stab:1}}" tag="div">
            <span class="mint-cell-text">我的订单</span>
            <i class="iconfont right">&#xe649;</i>
          </router-link>
          <ul class="order-list">
            <!--<li class="li1" @click="ordertab(1)">-->
            <router-link class="li1" :to="{path:'order',query:{stab:1}}" tag="li">
              <div class="iconfont listicon">&#xe626;</div>
              <div class="title">全部</div>
            </router-link>
            <!--</li>-->
            <router-link class="li1" :to="{path:'order',query:{stab:2}}" tag="li">
              <div class="iconfont listicon">&#xe65d;</div>
              <div class="title">待付款</div>

            </router-link>
            <!--</li>-->
            <router-link class="li1" :to="{path:'order',query:{stab:3}}" tag="li">
              <div class="iconfont listicon">&#xe655;</div>
              <div class="title">待发货</div>
            </router-link>
            <router-link class="li1" :to="{path:'order',query:{stab:4}}" tag="li">
              <!--<li class="li3" @click="ordertab(4)">-->
              <div class="iconfont listicon">&#xe660;</div>
              <div class="title">待收货</div>
            </router-link>
            <router-link class="li1" :to="{path:'order',query:{stab:5}}" tag="li">
              <div class="iconfont listicon">&#xe6de;</div>
              <div class="title">已完成</div>
            </router-link>
          </ul>
          <ul class="center-list">
            <router-link class="center-cell" :to="{name:'useraddress',query:{from:1}}" tag="li">
              <div class="iconfont icon1">&#xe60a;</div>
              <div class="title-list">收货地址管理</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>
            <!--<router-link class="center-cell" :to="{name:'takemoney'}" tag="li">-->
            <li class="center-cell" @click="msg()">
              <div class="iconfont icon2">&#xe69d;</div>
              <div class="title-list">我的钱包</div>
              <i class="iconfont right">&#xe649;</i>
            </li>
            <!--</router-link>-->
            <router-link class="center-cell" :to="{name:'collect'}" tag="li">
              <div class="iconfont icon3">&#xe615;</div>
              <div class="title-list">我的收藏</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>
            <router-link class="center-cell" :to="{name:'footprint'}" tag="li">
              <div class="iconfont icon4">&#xe617;</div>
              <div class="title-list">我的足迹</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>

            <router-link class="center-cell" :to="{name:'applys'}" tag="li">
            <div class="iconfont icon5">&#xe616;</div>
            <div class="title-list">我要开店</div>
            <i class="iconfont right">&#xe649;</i>
            </router-link>
            <router-link class="center-cell" :to="{name:'coupon'}" tag="li">
              <div class="iconfont icon6">&#xe639;</div>
              <div class="title-list">优惠券</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>
          </ul>
          <button class="outLogin" @click="outLogin">退出登录</button>
        </section>
      </mt-loadmore>
      <!--<router-view></router-view>-->
    </div>
    <v-tabbar></v-tabbar>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>

  import vTabbar from '../components/mode/Tabbar.vue'
  import {recordStatistics_get, teamsStatistics, orderStatistics, memberInfo, LOGINOUT} from '../api/api'
  import {_webapp} from '../config/_webapp.js';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {MessageBox, Toast} from 'mint-ui';

  export default {
    data() {
      return {
        topStatus: '',
        disindex: 3,
        orderStatistics: {
          total: '0',//全部
          lock: '0',//未结算
          refund: '0',//已退款
          ok: '0', //已结算
        },
        memberInfo: {
          nickname: '',//昵称
          id: '',//会员id
          level: '',//会员等级
          avatar: '',
          leveldetail: {
            levelname: '默认等级',
          },
          mobile: '',
          from: '',  //推荐人
          credit1: '',
          credit2: '',
        },
        defaultAvatar: ''
      }
    },
    components: {
      vTabbar
    },
    watch: {
      $route(from) {
        if (from.name === 'vipCenter') {
          this.memberInfo.avatar = this.imgUrl
        }
      }
    },
    computed: {
      ...mapState([
        'imgUrl'
      ])
    },
    methods: {
      init() {
        let _this = this;
        //用户信息
        memberInfo({}, function (res) {
          if (res.statusCode == 1) {
            _this.$refs.loadmore.onTopLoaded();
            _this.memberInfo.nickname = res.data.nickname
            _this.memberInfo.id = res.data.id
            _this.memberInfo.level = res.data.level
            _this.memberInfo.leveldetail = res.data.leveldetail
            _this.memberInfo.avatar = res.data.avatar
            _this.memberInfo.from = res.data.parent_name
            _this.memberInfo.mobile = res.data.mobile
            _this.memberInfo.credit2 = res.data.credit2
            _this.memberInfo.credit1 = res.data.credit1
            _this.setImgUrl(_this.memberInfo.avatar)
          } else {
            console.log('会员接口数据异常')
          }
        });
      },
      outLogin() {

        MessageBox({title: '确认退出当前账号?', message: '点击确认退出', showCancelButton: true}).then(action => {
          if (action == 'confirm') {//表示点击了确定
            // _webapp.logOut((res)=>{})
            console.log('试试')
            LOGINOUT(function (res) {
              console.log('推出成功')
            })
          } else if (action === 'cancel') {//表示点击了取消

          }
        })
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {

      },
      msg() {
        Toast({
          message: '暂未开通',
          position: 'middle',
          duration: 1800
        });
      },
      ...mapMutations({
        tabselect: 'TABSELECT',
        setImgUrl: 'IMGURL'
      })
    },
    filter: {
      setdefault(value) {
        return value || 0
      }
    },
    activated() {
      this.init();
    },
    mounted() {

    },
    beforeRouteUpdate(to, from, next) {
      if (from.name === 'userinfo') {
        this.init();
      }
      next()
    },

  }
</script>
<style scoped>
  @import '../assets/css/fonts/iconfont.css';
  @import '../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
  }

  .main, .main1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    /*overflow: auto;*/
    overflow: hidden;
  }

  .option {
    position: absolute;
    right: .16rem;
    top: .6rem;
    font-size: .13rem;
    font-weight: bold;
    color: #fff;
    z-index: 10
  }

  .avatar {
    position: relative;
    top: 0;
    left: 0;
    /*margin-top: .4rem;*/
    height: 1.47rem;
    padding: .50rem .15rem .15rem .15rem;
    color: #fff;
    /*background: url('../assets/images/centertopbg.png') center center no-repeat;*/
    background-size: 100% 100%;
  }

  .icon {
    width: .70rem;
    height: .70rem;
    background: grey;
    float: left;
    border: 2px solid #ffffff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .icon > img {
    width: .70rem;
    height: .70rem;
    /*background: url('../assets/images/userinfo-02.png') no-repeat 100% 100%;*/
    background-size: 100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .message {
    width: 50%;
    height: .5rem;
    float: left;
  }

  .message > div {
    width: 100%;
    text-align: left;
    padding: .18rem 0 .18rem .24rem;
  }

  .message > div > .hello {
    display: block;
    height: 100%;
    font-size: .15rem;
    line-height: .23rem;
    text-align: left;
    /*padding-left: .24rem;*/
    font-weight: bold;
  }

  .message > div > .level {
    display: inline-block;
    height: 100%;
    font-size: .13rem;
    line-height: .13rem;
    text-align: left;
    font-weight: bold;
    padding: .01rem;
    border: 1px solid #fff;
    -webkit-border-radius: .04rem;
    -moz-border-radius: .04rem;
    border-radius: .04rem;
  }

  .message > span {
    font-size: .14rem;
    float: left;
    display: block;
    padding: 0 0 0 10px;
  }

  .top {
    /*height: .55rem;*/
    height: .35rem;
    /*background: #fff;*/
    background: rgb(244, 127, 47);
    -webkit-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
  }

  .top > div {
    position: relative;
    width: 50%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    float: left;
    line-height: .5484rem;
    color: #fff;
    font-size: .25rem;
  }

  .top > div > span {
    line-height: .32rem;
    /*color: red;*/
    color: #fff;
  }

  .top .title {
    display: block;
    height: .25rem;
    font-size: .14rem;
    /*color: #666;*/
    color: #fff;
  }

  .yuan {
    color: red;
    font-size: .10rem;
  }

  .num {
    color: red;
    font-size: .14rem;
  }

  .top_1:after {
    content: '';
    position: absolute;
    right: 0;
    top: .1rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .content {
    margin-bottom: .25rem;
    position: inherit !important;
    /*height: 5r em;*/
    height: 100%;
  }

  .content .mfriend {
    position: relative;
    height: .5rem;
    line-height: .34rem;
    /*margin-top: .05rem;*/
    text-align: left;
    color: rgba(0, 0, 0, .7);
    background-color: #fff;
    padding: .08rem .2rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .mint-cell-text {
    font-size: 0.16rem;
    font-weight: 700;
  }

  .content ul.order-list {
    /*margin-top: .1rem;*/
    height: .90rem;
    /*-webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);*/
    /*-moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);*/
    /*box-shadow: 0 1px 2px rgba(138, 138, 138, .4);*/
  }

  .content .tuiguang {
    height: 1.8rem;
  }

  .content .order-list li {
    position: relative;
    display: block;
    width: 33.3%;
    height: .90rem;
    float: left;
    background-color: #fff;
    padding: .18rem .02rem;
  }

  .content .title {
    color: rgba(0, 0, 0, .5);
    font-size: .10rem;
    line-height: .2rem;
    margin-top: .08rem;
  }

  .content .iconfont {
    /*width: .28rem;*/
    /*height: .30rem;*/
    margin-left: auto;
    margin-right: auto;
    font-size: .3rem;
    /*border: 1px solid #F5751D;*/
    line-height: .3rem;
    color: #ff6500;
    border-radius: 50%;
  }

  .title-list {
    float: left;
    font-size: .13rem;
    font-weight: bold;
    margin-left: .1rem;
  }

  .details {
    margin-top: .1rem;
  }

  .details li {
    margin-top: .04rem;
    /*border-top: 1px solid rgba(0, 0, 0, .3)*/
    /*border-top: 1px solid rgba(0, 0, 0, .3)*/
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
    height: .48rem;
    width: 100%;
    line-height: .48rem;
    background-color: #fff;
    border-bottom: 1px solid #efeff4;
    outline: none;
    font-size: 0.16rem;
    color: rgba(0, 0, 0, .5);

  }

  .topdiv-first:after {
    content: '';
    position: absolute;
    width: 1px;
    height: .40rem;
    top: .09rem;
    right: 0;
    background: rgba(255, 255, 255, .1);

  }

  .mint-cell-text-right {
    position: absolute;
    right: .4rem;
    top: .1rem;
    font-size: 0.14rem;
    /*font-weight: 700;*/
    color: rgba(0, 0, 0, .3);

  }

  .mint-cell-text-right:after {
    content: '>';
    position: absolute;
    top: -.01rem;
    width: .1rem;
    right: -.2rem;
    color: rgba(0, 0, 0, .3);
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

  /*.top > .money-top {*/
  /*width: 100%;*/
  /*font-size: .16rem;*/
  /*line-height: .35rem;*/
  /*}*/

  .mymoney {
    position: absolute;
    top: .5rem;
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
    position: absolute;
    top: 0;
    width: 100%;
    /*overflow: auto;*/
    overflow-y: scroll;
    /*-webkit-overflow-scrolling: touch;*/
    /*height: 6.2rem;*/
    height: 100%;
    /*overflow-y: scroll;*/

  }

  .nametype {
    display: inline-block;
    width: .6rem;
    text-align: right;
  }

  .mint-loadmore-top {
    background: rgba(255, 255, 255, .7);
  }

  .mint-loadmore {
    height: 100%;
  }

  .loading {
    position: relative;
  }

  .loading:before {
    content: '';
    position: absolute;
    left: -0.35rem;
    top: -.08rem;
    width: .4rem;
    height: .4rem;
    display: block;
    /*background: url('../assets/images/Spinner.gif') no-repeat 100% 100%;*/
    background-size: 100% 100%;
  }

  .center-list {
    width: 100%;
    margin-top: .1rem;
    text-align: left;
    font-size: .1rem;
    color: rgba(0, 0, 0, .5);
  }

  .center-cell {
    position: relative;
    height: .48rem;
    width: 100%;
    line-height: .48rem;
    background-color: #fff;
    border-bottom: 1px solid #efeff4;

  }

  .center-cell .iconfont {
    /*margin-right: -.1rem;*/
    margin-left: 0.1rem;
    padding: 0 .1rem;
    float: left;
    height: 100%;
    font-size: .23rem;
    line-height: .48rem;
  }

  .center-cell > .right {
    position: absolute;
    right: .1rem;
    font-size: .15rem;
    font-weight: bold;
    color: rgba(0, 0, 0, .4);
  }

  .mfriend > .right {
    position: absolute;
    right: .15rem;
    font-size: .15rem;
    font-weight: bold;
    color: rgba(0, 0, 0, .4);
  }

  .icon1 {
    color: #6491f7 !important
  }

  .icon2 {
    color: #f99e4a !important
  }

  .icon3 {
    color: #fdcf30 !important
  }

  .icon4 {
    color: #ef6262 !important
  }

  .icon5 {
    color: #65b2fa !important
  }

  .icon6 {
    color: #ef6262 !important
  }

  .postUserInfo {
    width: 100%;
    margin-top: 0.2rem;
  }

  .postUserInfo-item {
    width: 100%;
    height: 0.45rem;
    box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);
    background: #F5751D;
    color: #fff;
    font-size: 0.16rem;
  }
</style>
