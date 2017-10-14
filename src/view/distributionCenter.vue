<template>
  <div class="page">
    <!--<mt-header title="个人中心" fixed>-->
      <!--<router-link to="/userCenter" slot="left">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->
    <div v-if="issale" class="container">
      <div class="user">
          <div class="user__logo">
            <img :src="memberInfo.avatar"/>
          </div>
          <div class="user__info">
            <h5>{{memberInfo.nickname}}</h5>
            <div class="user__info__id">ID:{{memberInfo.id}}</div>
          </div>
          <div class="user__qcode">
            <img :src="img1"/>
          </div>
        <router-link class="user__update" :to="{name:'disapply'}"  tag="a">
          升级店铺
        </router-link>

      </div>
      <ul class="nagative">
        <!--<li class="nav__item">-->
          <router-link class="nav__item" :to="{path:'partner',query:{stab:1,type:'all',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"  tag="li">
          <div class="logo">
            <img src="../assets/images/panter.png"/>
          </div>
          <span>团队管理</span>
          </router-link>
        <!--</li>-->
        <!--<li class="nav__item">-->
          <router-link class="nav__item" :to="{path:'extension',query:{stab:1,type:'total',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"  tag="li">
          <div class="logo">
            <img src="../assets/images/order.png"/>
          </div>
          <span>订单管理</span>
          </router-link>
        <!--</li>-->
        <router-link class="nav__item" :to="{name:'takemoney'}"  tag="li">
        <!--<li class="nav__item">-->
          <div class="logo">
            <img src="../assets/images/money.png"/>
          </div>
          <span>收益管理</span>
        <!--</li>-->
        </router-link>
      </ul>
      <section>
        <div class="title">
          <div class="icon"></div>
          <div class="text">直属团队</div>
          <div class="right">邀请加入<span class="iconfont">&#xe61b;</span></div>
        </div>
        <div class="info">
          <div class="info__item1">
            <div>100</div>
            总人数
          </div>
          <div class="info__item2">
            <div>100</div>
            本月人数
          </div>
        </div>
      </section>
      <section>
        <div class="title">
          <div class="icon"></div>
          <div class="text">收益</div>
          <div class="right" @click="clickDetailed">每月明细<span class="iconfont">&#xe61b;</span></div>
        </div>
        <div class="money">
          <div class="info__item3">
            今日收益（元）
            <div>100</div>
          </div>
          <p>本月收益<span>88.88</span>元</p>
          <p>累计收益<span>88.88</span>元</p>
        </div>
      </section>
    </div>
    <div class="tip" v-else>
      <span class="iconfont">&#xe64d;</span>
      <div class="text">抱歉！您还没有开店</div>
      <!--<router-link  class="btn">我要开店</router-link>-->
      <router-link class="btn" :to="{name:'disapply'}"  tag="div">
        我要开店
      </router-link>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <v-tabbar></v-tabbar>
  </div>
</template>

<script>
  import {recordStatistics_get, teamsStatistics, orderStatistics, memberInfo, } from '../api/api'
  import {_webapp} from '../config/hook.js';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {MessageBox} from 'mint-ui';
  import vTabbar from '../components/mode/Tabbar.vue'

  export default {
    data(){
      return {
        img1: require('../assets/images/confirmorder-01.jpg'),
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
          no_purchased: '0'  //未购买人数
        },
        orderStatistics: {
          total: '0',//全部
          lock: '0',//未结算
          refund: '0',//已退款
          ok: '0', //已结算
        },
        topStatus: '',
        disindex: 3,
        defaultAvatar: '',
        issale:true,
        webDebug : _webapp.debug
      }
    },
    methods: {
      init(){
        let _this=this;
        memberInfo({data : {}}, function (res) {
          _webapp.log('memberInfo res');
          _webapp.log(res);

          if (res.statusCode == 1) {
//            console.log(res)
            _this.memberInfo.nickname = res.data.nickname
            _this.memberInfo.id = res.data.id
            _this.memberInfo.level = res.data.level
            _this.memberInfo.leveldetail = res.data.leveldetail
            _this.memberInfo.avatar = res.data.avatar
            _this.memberInfo.from = res.data.parent_name || '朵云家'
            _this.memberInfo.level = res.data.agentleveldetail.levelname
//            _this.setImgUrl(_this.memberInfo.avatar)

          } else {
            console.log('会员接口数据异常')
          }
        })
        teamsStatistics({data : {}}, function (res) {
          if (res.statusCode == 1) {
            _this.teamsStatistics.all = res.data.all || 0;
            _this.teamsStatistics.purchased = res.data.purchased || 0;
            _this.teamsStatistics.no_purchased = res.data.no_purchased || 0;
          } else {
            console.log('佣金统计接口数据异常')
          }
        });
        teamsStatistics({data : {}}, function (res) {
          if (res.statusCode == 1) {
            _this.teamsStatistics.all = res.data.all || 0;
            _this.teamsStatistics.purchased = res.data.purchased || 0;
            _this.teamsStatistics.no_purchased = res.data.no_purchased || 0;
          } else {
            console.log('佣金统计接口数据异常')
          }
        });
        orderStatistics({data : {}}, function (res) {
          if (res.statusCode == 1 && res.data == true) {
            _this.orderStatistics.total = res.data.total.order_count || 0
            _this.orderStatistics.lock = res.data.lock.order_count || 0
            _this.orderStatistics.refund = res.data.refund.order_count || 0
            _this.orderStatistics.ok = res.data.ok.order_count || 0
//          _this.$refs.loadmore.onTopLoaded();
          } else {
            console.log('获取团队数量统计接口数据异常')
          }
        })
      },
      partnertab(idx){
        this.tabselect(idx)
        this.$router.push({name: `partner`})
      },
      ordertab(idx){
        this.tabselect(idx)
        this.$router.push({name: `extension`})
      },
      clickDetailed(){
        this.$router.push({name:'detailed'});
      }
    },
    components: {
      vTabbar: vTabbar
    },
    created(){
      this.init()
    }
  }

</script>

<style lang="less" scoped>
  @import '../assets/css/reset/reset.css';
  @import '../assets/css/reset/common.less';
  @import '../assets/css/fonts/iconfont.css';

  .page {
    .page-view();
  }
  .container {
    /*margin-top: .64rem;*/
    font-size: .14rem;
    height: 100%;
    .user {
      /*height: 1.2rem;*/
      color: #fff;
      height: 1.47rem;
      width: 100%;
      background-color: @style2;
      display: flex;
      /*padding: .26rem .2rem;*/
      padding: .5rem .2rem;
      justify-content: flex-start;
      .user__logo {
        width: .68rem;
        height: .68rem;
        border-radius: 50%;
        img {
          .imgfull(50%)
        }
      }
      .user__info {
        flex: 1;
        width: 100%;
        text-align: left;
        margin-left: .1rem;
      }
      .user__qcode {
        width: .4rem;
        border-radius: 50%;
        height: .68rem;
        display: block;
        img {
          .imgfull(50%);
          height: .4rem;
          vertical-align: middle;
          /*margin-top: .14rem;*/
        }
      };
      .user__update {
        position: absolute;
        top: 1rem;
        right: .2rem;
        color: #fff;
        font-size: .12rem;
      }
    }
    .nagative {
      margin-top: .1rem;
      padding: .2rem 0;
      text-align: center;
      display: flex;
      border-bottom: 1px solid @border;
      .nav__item {
        flex: 1;
        display: block;
        .logo {
          width: .38rem;
          height: .38rem;
          margin: 0 auto;
          margin-bottom: .1rem;
          img {
            .imgfull(50%)
          }
        }
        span {
          font-size: .14rem;
          display: block;
          margin-bottom: .05rem;
        }
      }
    }
  }
  section {
    padding: 0 .1rem;
    border-bottom: 1px solid @border;
    border-top: 1px solid @border;
    margin-bottom: .1rem;
    .title {
      width: 100%;
      height: .42rem;
      line-height: .42rem;
      display: flex;
      text-align: left;
      .icon {
        width: 5px;
        background-color: @style2;
        height: .14rem;
        margin-top: .14rem;
        margin-right: .1rem;
      }
      .text {
        flex: 1;
        font-size: .14rem;
      }
      .right {
        font-weight: bold;
        color: @style2;
        width: .8rem;
        font-size: .11rem;
        text-align: right;
      }
    }
  }
  section {
    .info {
      width: 100%;
      display: flex;
      .info__item1 {
        width: 1.16rem;
        font-size: .11rem;
        div {
          /*font-size: .22rem;*/
          font-size: .26rem;
          text-transform: uppercase;
          color: #007aff;
        }
      }
      .info__item2 {
          width: 1.16rem;
          font-size: .11rem;
          div {
            /*font-size: .22rem;*/
            font-size: .215rem;
            text-transform: uppercase;
            color: #333;
          }
        }
      }
    .money {
      .info__item3 {
        height: 1rem;
        padding: .2rem 0 .26rem .15rem;
        text-align: left;
        font-size: .12em;
        color: #007aff;
        div {
          /*font-size: .22rem;*/
          font-size: .31rem;
          text-transform: uppercase;
          color: #333;
          margin-top: .08rem;
        }
      }
      p {
        line-height: .48rem;
        border-top: 1px solid #ebecf1;
        font-size: .12rem;
        color: #333;
        text-align: left;
        padding-left: .15rem;
        span {
          color: #007aff;
        }
      }
    }





  }
  .tip {
    width: 100%;
    height: 100%;
    font-size: .16rem;
    .iconfont {
      display: block;
      width: 1.25rem;
      height: 1.15rem;
      font-size: 1.25rem;
      margin: 0 auto;
      margin-top: 1rem;
    }
    .text {
      font-size: .16rem;
      color: @style2;
      margin-top: .3rem;
      margin-bottom: .1rem;
    }
    .btn {
      width: 1.75rem;
      height: .48rem;
      font-size: .2rem;
      background-color: @style2;
      color: #fff;
      line-height: .48rem;
      border-radius: .05rem;
      margin: 0 auto;
    }

  }












</style>
