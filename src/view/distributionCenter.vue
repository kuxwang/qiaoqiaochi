<template>
  <div class="main needsclick">
    <div class="container">
      <mt-header title="会员中心" class="header" fixed>
        <a slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <div class="vipcenter-content" v-show="!on1">
        <div slot="top" class="mint-loadmore-top">
          <span class="iconfont" v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">&#xe732;下拉刷新</span>
          <span class="loading" v-show="topStatus === 'loading'">加载中</span>
        </div>
        <section class="avatar">
          <div class="avatar-content">
            <div class="icon">
              <img :src="memberInfo.avatar" alt="">
            </div>
            <div class="message">
              <p class="nametype">昵称:{{memberInfo.nickname}}</p>
              <p class="nametype">会员ID:{{memberInfo.id}}</p>
              <p class="nametype">等级:{{memberInfo.level}}</p>
              <p class="nametype">推荐人:{{memberInfo.from}}</p>
            </div>
          </div>
        </section>
        <section class="top">
          <router-link class="money-top" :to="{name: 'takemoney'}" tag="div">
            推广费:{{recordStatistics_get.c_money_sum}} 元
          </router-link>
        </section>
        <section class="content">
          <!-- 我的伙伴 -->
          <div class="mfriend">
            <span class="mint-cell-text">
              <span class="iconfont">
                &#xe612;
              </span>
              我的伙伴
            </span>
          </div>
          <ul class="order-list">
            <!--<router-link class="li1" :to="{path:'partnerlevel',query:{stab:1,type:'all',level:'1'}}" tag="li">-->

            <router-link class="li1"
                         :to="{path:'partnerlevel',query:{stab:2,type:'agent',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"
                         tag="li">

              <div class="title lr1">所有伙伴</div>
              <div class="iconfont listicon">&#xe646;</div>
              <div class="nummoney">
                <span class="num">{{teamsStatistics.all}}</span>
                <span class="yuan"> 人</span>
              </div>
            </router-link>
            <!--<router-link class="li1" :to="{path:'partnerlevel',query:{stab:1,type:'agent',level:'1'}}" tag="li">-->
            <router-link class="li1"
                         :to="{path:'partnerlevel',query:{stab:2,type:'agent',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"
                         tag="li">
              <div class="title lr1">已购买伙伴</div>
              <div class="iconfont listicon">&#xe600;</div>
              <div class="nummoney">
                <span class="num">{{teamsStatistics.purchased}}</span>
                <span class="yuan"> 人</span>
              </div>
            </router-link>
            <!--<router-link class="li1" :to="{path:'partnerlevel',query:{stab:1,type:'fans',level:'1'}}" tag="li">-->
            <router-link class="li1"
                         :to="{path:'partnerlevel',query:{stab:2,type:'agent',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"
                         tag="li">
              <div class="title lr1">未购买伙伴</div>
              <div class="iconfont listicon">&#xe60d;</div>
              <div class="nummoney">
                <span class="num">{{teamsStatistics.no_purchased}}</span>
                <span class="yuan"> 人</span>
              </div>
            </router-link>
            <!-- 区域合伙人 -->
            <!--<router-link class="li1" :to="{path:'partnerlevel',query:{stab:1,type:'area',level:'1',isHide:'1'}}" tag="li" v-show="isAreaPartner">-->
            <!--<router-link class="li1"
                         :to="{path:'partnerlevel',query:{stab:2,type:'agent',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"
                         tag="li">
            <div class="title lr1">区域合伙人</div>
              <div class="iconfont listicon">&#xe60d;</div>
              <div class="nummoney">
                <span class="num">{{teamsStatistics.area}}</span>
                <span class="yuan"> 人</span>
              </div>
            </router-link>-->
          </ul>

          <!-- 我的合伙人 -->
          <!-- <div class="mfriend" v-show="partnerAgents">
            <span class="mint-cell-text">
              <span class="iconfont">
                &#xe612;
              </span>
              我的合伙人
            </span>
          </div>
          <ul class="order-list" v-show="partnerAgents">
            <router-link class="li1" :to="{path:'extension',query:{stab:1,type:'total',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
              tag="li">
              <div class="title">中级合伙人</div>
              <div class="iconfont listicon">&#xe624;</div>
              <div class="nummoney">
                <span class="num">{{orderStatistics.total}}</span>
                <span class="yuan"> 单</span>
              </div>
            </router-link>
          </ul> -->
          <!-- 推广订单 -->
          <div class="mfriend">
            <span class="mint-cell-text">
              <span class="iconfont">
                &#xe650;
              </span>
              推广订单
            </span>
          </div>
          <ul class="order-list">
            <router-link class="li1" :to="{path:'extension',query:{stab:1,type:'total',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
              tag="li">
              <div class="title">全部</div>
              <div class="iconfont listicon">&#xe624;</div>
              <div class="nummoney">
                <span class="num">{{orderStatistics.total}}</span>
                <span class="yuan"> 单</span>
              </div>
            </router-link>
            <router-link class="li1" :to="{path:'extension',query:{stab:2,type:'lock',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
              tag="li">
              <div class="title">未结算</div>
              <div class="iconfont listicon">&#xe624;</div>
              <div class="nummoney">
                <span class="num">{{orderStatistics.lock}}</span>
                <span class="yuan"> 单</span>
              </div>
            </router-link>
            <router-link class="li1" :to="{path:'extension',query:{stab:3,type:'refund',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
              tag="li">
              <div class="title">已退款</div>
              <div class="iconfont listicon">&#xe8b5;</div>
              <div class="nummoney">
                <span class="num">{{orderStatistics.refund}}</span>
                <span class="yuan"> 单</span>
              </div>
            </router-link>
            <router-link class="li1" :to="{path:'extension',query:{stab:4,type:'ok',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
              tag="li">
              <div class="title">已结算</div>
              <div class="iconfont listicon">&#xe619;</div>
              <div class="nummoney">
                <span class="num">{{orderStatistics.ok}}</span>
                <span class="yuan"> 单</span>
              </div>
            </router-link>
          </ul>
          <!-- 推广费 -->
          <router-link class="mfriend" tag="div" to="/takemoney">
            <div class="mint-cell-text">
              <span class="iconfont tgf">
                &#xe670;
              </span>
              推广费
            </div>
            <div class="mfriend-right ">
              <span>去提现</span>
              <span class="iconfont">
                &#xe61b;
              </span>
            </div>
          </router-link>
        </section>
      </div>
      <!-- loading -->
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
  import { recordStatistics_get, teamsStatistics, orderStatistics, memberInfo, } from '../api/api'
  import { _webapp } from '../config/hook.js';
  import { mapMutations, mapGetters, mapState } from 'vuex'
  import { MessageBox } from 'mint-ui';
  import Loading from '../components/base/loading/loading';

  export default {
    data() {
      return {
        topStatus: '',
        disindex: 3,
        recordStatistics_get: {
          cg_money_sum: '0',//销售总额
          c_money_sum: '0', //佣金总额
          o_status_3: '0', //已收货
          pay: '0', //已提现
          check: '0', //可提现
          invalid: '0', //被驳回的业绩
          apply: '0', //申请中
          o_status_0: '0', //待打款
          ok: '0'
        },
        teamsStatistics: {
          all: '0',  //总人数
          purchased: '0',  //已购买人数
          no_purchased: '0',  //未购买人数
          area:'0'
        },
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
          from: ''  //推荐人
        },
        defaultAvatar: '',
        webDebug: _webapp.debug,
        on1: true,
        isAreaPartner:'',
        partnerAgents:''
      }
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'userCenter' });
      },
      init() {  //初始化
        let _this = this;
        memberInfo({ data: {} }, function (res) {
          if (res.statusCode === 1) {
            _this.on1 = false;
            _this.memberInfo.nickname = res.data.nickname;
            _this.memberInfo.id = res.data.id;
            _this.memberInfo.level = res.data.level;
            _this.memberInfo.leveldetail = res.data.leveldetail;
            _this.memberInfo.avatar = res.data.avatar
            _this.memberInfo.from = res.data.parent_name || '总店';
            _this.memberInfo.level = res.data.agentleveldetail.levelname;
            _this.isAreaPartner=res.data.isAreaPartner;
            _this.partnerAgents=res.data.partnerAgents;
          } else {
            console.log('distributionCenter memberInfo:' + res.data);
          }
        });
        recordStatistics_get({ data: { type: '' } }, function (res) {
          if (res.statusCode === 1) {
            _this.recordStatistics_get.cg_money_sum = res.data.total.cg_money_sum || 0;
            _this.recordStatistics_get.c_money_sum = res.data.total.c_money_sum || 0;
            _this.recordStatistics_get.o_status_3 = res.data.o_status_3.c_money_sum || 0;
            _this.recordStatistics_get.pay = res.data.pay.c_money_sum || 0;
            _this.recordStatistics_get.check = res.data.check.c_money_sum || 0;
            _this.recordStatistics_get.ok = res.data.ok.c_money_sum || 0;
            _this.recordStatistics_get.invalid = res.data.invalid.cg_money_sum || 0;
            _this.recordStatistics_get.apply = res.data.apply.c_money_sum;
            _this.recordStatistics_get.o_status_0 = res.data.o_status_0.c_money_sum || 0;
          } else {
            console.log('distributionCenter recordStatistics_get:' + res.data);
          }
        })
        teamsStatistics({ data: {} }, function (res) {
          if (res.statusCode == 1) {
            _this.teamsStatistics.all = res.data.all || 0;
            _this.teamsStatistics.purchased = res.data.purchased || 0;
            _this.teamsStatistics.no_purchased = res.data.no_purchased || 0;
            _this.teamsStatistics.area=res.data.area;
          } else {
            console.log('distributionCenter teamsStatistics:' + res.data);
          }
        });
        orderStatistics({ data: {} }, function (res) {
          if (res.statusCode == 1) {
            _this.orderStatistics.total = res.data.total.order_count || 0;
            _this.orderStatistics.lock = res.data.lock.order_count || 0;
            _this.orderStatistics.refund = res.data.refund.order_count || 0;
            _this.orderStatistics.ok = res.data.ok.order_count || 0;
          } else {
            console.log('distributionCenter orderStatistics:' + res.data);
          }
        })
      },
      partnertab(idx) {
        this.tabselect(idx)
        this.$router.push({ name: `partner` })
      },
      ordertab(idx) {
        this.tabselect(idx)
        this.$router.push({ name: `extension` })
      },
      ...mapMutations({
        tabselect: 'TABSELECT',
        setImgUrl: 'IMGURL'
      })
    },
    computed: {
      ...mapState([
        'imgUrl'
      ])
    },
    components: {
      Loading
    },
    filter: {
      setdefault(value) {
        return value || 0
      }
    },
    // watch: {
    //   $route(from) {
    //     if (from.name === 'vipCenter') {
    //       this.memberInfo.avatar = this.imgUrl
    //     }
    //   }
    // },
    mounted() {
      this.init();
    }
  }
</script>
<style lang="less" scoped>
  @import '../assets/less/common.less';
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #F8F8F8;
    /* overflow: auto; */
    overflow: hidden;
  }

  .avatar {
    /* height: 1.5rem; */
    display: flex;
    justify-content: center;
    background: #fff;
    padding-top: 0.2rem;
  }

  .avatar-content {
    display: flex;
    align-items: center;
  }

  .icon {
    width: .90rem;
    height: .90rem;
    background: grey;
    border-radius: 50%;
    border: 1px solid #ffffff;
    overflow: hidden;
  }

  .icon>img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .message {
    /* width: 78%; */
    margin-left: 0.1rem;
  }

  .message div {
    /* width: 100%; */
    /* height: 25%; */
  }

  .message>div>span {
    font-size: .14rem;
  }

  .avatar>.right {
    position: absolute;
    top: .4rem;
    right: .2rem;
  }

  .top {
    /* height: .35rem; */
    background: #fff;
    padding: 0.2rem 0rem;
  }

  .top>div {
    /* position: relative;
  width: 50%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  float: left;
  line-height: .5484rem;
  color: #fff;
  font-size: .25rem; */
  }

  .top>div>span {
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
    color: @themeColor2;
    font-size: .10rem;
  }

  .num {
    color: @themeColor2;
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
  }

  .content .mfriend {
    /* position: relative;
  margin-top: .1rem;
  text-align: left;
  color: rgba(0, 0, 0, .7);
  background-color: #fff;
  padding: .08rem .2rem;
  border-bottom: 1px solid rgba(0, 0, 0, .1); */
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: left;
    background: #fff;
    border-bottom: 1px solid #F6F5FA;
    padding-left: 0.15rem;
    color: #333;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mint-cell-text {
    font-size: 0.14rem;
    /* font-weight: 700; */
  }

  .mint-cell-text span.iconfont {
    color: @themeColor2;
    font-size: 0.19rem;
    margin-right: 0.05rem;
  }

  .mint-cell-text span.tgf {
    font-size: 0.21rem;
  }

  .content ul {
    /*margin-top: .1rem;*/
    height: .90rem;
    /* -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
  -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
  box-shadow: 0 1px 2px rgba(138, 138, 138, .4); */
  }

  .content .tuiguang {
    height: 1.8rem;
  }

  .content li {
    position: relative;
    display: block;
    width: 33.3%;
    height: .90rem;
    float: left;
    background-color: #fff;
    padding: .1rem;
  }

  .content .li1:after,
  .content .li2:after,
  .content .li4:after,
  .content .li5:after {
    content: '';
    position: absolute;
    right: 0;
    top: .14rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .content .li4,
  .content .li5,
  .content .li6 {
    border-top: 1px solid rgba(0, 0, 0, .2)
  }

  .content .title {
    color: #333;
    font-size: .14rem;
    line-height: .2rem;
  }

  .content .iconfont.listicon {
    width: .28rem;
    height: .30rem;
    margin-left: auto;
    margin-right: auto;
    font-size: .20rem;
    line-height: .3rem;
    color: #333;
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
    width: 100%;
    height: 0.45rem;
    -webkit-box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);
    box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);
    background: #fff;
    color: rgba(0, 0, 0, .5);
    font-size: 0.16rem;
    border: none;
    outline: none;
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
    color: #333;
  }

  .text-right {
    /* position: absolute;
  width: 30%;
  height: 100%;
  top: 0;
  right: 0; */
    color: #333;
  }

  .mint-header.is-fixed {
    top: 0rem;
  }

  .top>.money-top {
    width: 100%;
    font-size: .14rem;
    text-align: center;
    color: #333;
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
    height: 100%;
    /*overflow-y: scroll;*/
    // padding-bottom: .3rem;
  }

  .nametype {
    /* display: inline-block;
  width: .6rem;
  text-align: right; */
    font-size: 0.12rem;
    text-align: left;
    margin-top: 0.02rem;
    color: #333;
    line-height: 0.15rem;
  }

  .mint-loadmore-top {
    background: rgba(255, 255, 255, .7);
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
    background: url('../assets/images/Spinner.gif') no-repeat 100% 100%;
    background-size: 100% 100%;
  }

  .main1 {
    overflow-y: scroll !important;
  }

  .version {
    text-align: center;
    padding: 0 .1rem;
    font-size: .12rem;
    margin-top: .1rem;
    margin-bottom: .1rem;
    color: #b3abab;
  }








  /* 新增 */

  .mfriend-right {
    padding-right: 0.15rem;
  }

  .mfriend-right span {
    font-size: 0.14rem;
    color: #666;
  }

  .mfriend-right .iconfont {
    font-size: 0.18rem;
    color: #666;
  }

  .vipcenter-content {
    margin-top: .45rem;
  }
</style>
