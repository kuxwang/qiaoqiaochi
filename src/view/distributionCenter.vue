<template>
  <div class="page">
    <mt-header title="分销中心" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div  class="container">
      <div class="userinfo">
        <!--<div class="userinfo-tp" @click="goUserinfo">-->
        <div class="userinfo-tp">
          <div class="userinfo-lf">
            <div class="userphoto">
              <img :src="memberInfo.avatar"/>
            </div>
            <div class="userinfo-item">
              <div class="userinfo-p">
                昵称：{{memberInfo.nickname}}
              </div>
              <div class="userinfo-p">
                会员ID：{{memberInfo.id}}
              </div>
              <div class="userinfo-p">
                等级：{{memberInfo.level}}
              </div>
              <div class="userinfo-p">
                推荐人：{{memberInfo.from}}
              </div>
            </div>
          </div>
          <div class="userinfo-lr deltriangle">
            <!-- <text class="deltriangle"></text> -->
          </div>
        </div>
        <div class="userinfo-bt">
          <div class="userinfo-cost">
            推广费：{{recordStatistics_get.c_money_sum}}元
          </div>
        </div>
      </div>
      <!-- 分割块 -->
      <div class="delblock"></div>
      <div class="partner">
        <div class="mypartner">
          <!--<img :src="../../public/imgs/hb.png"/>-->
          <div class="iconfont">&#xe612;</div>
          <span>我的伙伴</span>
        </div>
        <div class="partner-list">
          <!--<div class="partner-content" data-status="0" @click="partnerInfoTap">-->
            <router-link class="partner-content"
                         :to="{path:'partner',query:{stab:1,type:'all',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"
                         tag="div">
            <div class="mydingdan-list">
              <div class="dingdan-icon ">
                <!--<img :src="../../public/imgs/syhb2.png" />-->
                <div class="iconfont">&#xe646;</div>
                <span class="num">{{teamsStatistics.all}}</span>
              </div>
              <span> 所有伙伴</span>
            </div>
            </router-link>
          <!--</div>-->
          <!--<div class="partner-content" data-status="1" @click="partnerInfoTap">-->
          <router-link class="partner-content"
                       :to="{path:'partner',query:{stab:2,type:'agent',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"
                       tag="div">
            <div class="mydingdan-list">
              <div class="dingdan-icon ">
                <!--<img :src="../../public/imgs/ygmhb2.png" />-->
                <div class="iconfont">&#xe612;</div>
                <span class="num">{{teamsStatistics.purchased}}</span>
              </div>
              <span> 已购买伙伴</span>
            </div>
          </router-link>

          <router-link class="partner-content"
                       :to="{path:'partner',query:{stab:3,type:'fans',all:teamsStatistics.all,agent:teamsStatistics.purchased,fans:teamsStatistics.no_purchased}}"
                       tag="div">
          <!--<div class="partner-content" data-status="2" @click="partnerInfoTap">-->
            <div class="mydingdan-list">
              <div class="dingdan-icon ">
                <div class="iconfont">&#xe64d;</div>
                <span class="num">{{teamsStatistics.no_purchased}}</span>
              </div>
              <span> 未购买伙伴</span>
            </div>
          <!--</div>-->
          </router-link>
        </div>
      </div>
      <!-- 分割块 -->
      <div class="delblock"></div>
      <div class="partner">
        <div class="mypartner">
          <!--<img :src="../../public/imgs/ddtg.png">-->
          <div class="iconfont">&#xe650;</div>
          <span>推广订单</span>
        </div>
        <div class="partner-list partner-list2">
          <!--<div class="partner-content" data-status="0" @click="distributionOrderInfo">-->
          <router-link class="partner-content"
                       :to="{path:'extension',query:{stab:1,type:'total',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
                       tag="div">
            <div class="mydingdan-list">
              <div class="dingdan-icon ">
                <!--<img :src="../../public/imgs/dfk.png" />-->
                <div class="iconfont">&#xe66f;</div>
                <span class="num">{{orderStatistics.total}}</span>
              </div>
              <span> 全部</span>
            </div>
          </router-link>
          <!--</div>-->
          <!--<div class="partner-content" data-status="1" @click="distributionOrderInfo">-->
            <router-link class="partner-content"
                         :to="{path:'extension',query:{stab:2,type:'lock',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
                         tag="div">
            <div class="mydingdan-list">
              <div class="dingdan-icon ">
                <div class="iconfont">&#xe624;</div>
                <span class="num">{{orderStatistics.lock}}</span>
              </div>
              <span> 未结算</span>
            </div>
            </router-link>
          <!--</div>-->
          <!--<div class="partner-content" data-status="2" @click="distributionOrderInfo">-->
            <router-link class="partner-content"
                         :to="{path:'extension',query:{stab:3,type:'refund',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
                         tag="div">
            <div class="mydingdan-list">
              <div class="dingdan-icon ">
                <div class="iconfont">&#xe8b5;</div>
                <span class="num">{{orderStatistics.refund}}</span>
              </div>
              <span> 已退款</span>
            </div>
            </router-link>
          <!--</div>-->
          <!--<div class="partner-content" data-status="3" @click="distributionOrderInfo">-->
            <router-link class="partner-content"
                         :to="{path:'extension',query:{stab:4,type:'ok',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"
                         tag="div">
            <div class="mydingdan-list">
              <div class="dingdan-icon ">
                <div class="iconfont">&#xe619;</div>
                <span class="num">{{orderStatistics.ok}}</span>
              </div>
              <span> 已结算</span>
            </div>
            </router-link>
          <!--</div>-->
        </div>
      </div>
      <!-- 分割块 -->
      <div class="delblock"></div>
      <!--<div class="goWithdrawals" @click="goWithdrawals">-->
      <div class="goWithdrawals" @click="gomoney()">
        <div class="goWithdrawals-lf">
          <!--<img :src="../../public/imgs/mymoney.png" class="partner-md goWithdrawals-img">-->
          <div class="iconfont">&#xe670;</div>
          <span>推广费</span>
        </div>
        <div class="goWithdrawals-lr">
          <span>去提现</span>
          <span class="deltriangle"></span>
        </div>
      </div>
      <!--<div class="goWithdrawals" @click="goQrcode">-->
      <div class="goWithdrawals" @click="goqcode()">
        <div class="goWithdrawals-lf">
          <!--<img :src="../../public/imgs/qr-icon.png" class="partner-md goWithdrawals-img">-->
          <div class="iconfont">&#xe609;</div>
          <span>我的二维码</span>
        </div>
        <div class="goWithdrawals-lr">
          <span>去分享</span>
          <span class="deltriangle"></span>
        </div>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {recordStatistics_get, teamsStatistics, orderStatistics, memberInfo, } from '../api/api'
  import {_webapp} from '../config/hook.js';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {MessageBox} from 'mint-ui';

  export default {
    data(){
      return {
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
          total: 0,//全部
          lock: 0,//未结算
          refund: 0,//已退款
          ok: 0, //已结算
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
            _this.memberInfo.from = res.data.parent_name || '总店'
            _this.memberInfo.level = res.data.agentleveldetail.levelname
//            _this.setImgUrl(_this.memberInfo.avatar)

          } else {
            console.log('会员接口数据异常')
          }
        })
/*        teamsStatistics({data : {}}, function (res) {
          if (res.statusCode == 1) {
            _this.teamsStatistics.all = res.data.all || 0;
            _this.teamsStatistics.purchased = res.data.purchased || 0;
            _this.teamsStatistics.no_purchased = res.data.no_purchased || 0;
          } else {
//            console.log('佣金统计接口数据异常')
            console.log(res.data)
          }
        });*/
        teamsStatistics({data : {}}, function (res) {
          if (res.statusCode == 1) {
            _this.teamsStatistics.all = res.data.all || 0;
            _this.teamsStatistics.purchased = res.data.purchased || 0;
            _this.teamsStatistics.no_purchased = res.data.no_purchased || 0;
          } else {
//            console.log('佣金统计接口数据异常')
            console.log(res.data)
          }
        });
        orderStatistics({data : {}}, function (res) {
//          if (res.statusCode == 1 && res.data == true) {
          if (res.statusCode == 1) {
            _this.orderStatistics.total = res.data.total.order_count || 0
            _this.orderStatistics.lock = res.data.lock.order_count || 0
            _this.orderStatistics.refund = res.data.refund.order_count || 0
            _this.orderStatistics.ok = res.data.ok.order_count || 0
            console.log(_this.orderStatistics)
          } else {
            console.log(res.data)
          }
        })
      },
      gomoney(){
        this.$router.push('takemoney')
      },
      goqcode(){
        this.$router.push('qCode')
      }
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
    padding-top: .45rem;

  }
  .userinfo{
    height:1.9rem;
  }
  .userinfo-tp{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: .34rem;
  }
  .userphoto{
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    overflow: hidden;
    margin-left: .14rem;
  }
  .userphoto img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .userinfo{
    position:relative;
  }
  .userinfo-item{
    margin-left: .15rem;
  }
  .userinfo-lf{
    display: flex;
    justify-content: center space-around;
    align-items:center;
  }
  .userinfo-p{
    display: block;
    font-size: 12px;
    color:#333;
    line-height: 20px;
  }
  .userinfo-bt{
    width: 100%;
    margin-top: .25rem;
    position: absolute;
    bottom: .2rem;
    left:0px;
  }
  .userinfo-cost{
    padding-top: .15rem;
    font-size: 14px;
    color:#333;
    text-align: center;
  }
  .userinfo-lr.deltriangle{
    width: .1rem;
    height:.1rem;
    border-top:1px solid #fff;
    border-left:1px solid #fff;
    margin-right: .26rem;
  }
  .mypartner{
    height: .5rem;
    line-height: .5rem;
    padding-left: .1rem;
    border-bottom: 1px solid #F6F5FA;
    text-align: left;
    display: flex;
  }
  .mypartner .iconfont{
    width:.2rem;
    height:.2rem;
    position: relative;
    top: .02rem;
    left:0px;
    color: #dd2727;
    font-weight: 800;
  }
  .mypartner span{
    font-size: 15px;
    color:#333;
    margin-left: .15rem;
  }
  .partner-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .partner-content{
    padding: .25rem 0;
    text-align: center;
    flex: 1;
  }
  .partner-item{
    text-align: center;
    border-right:1px solid #eee;
  }
  .last-item{
    border:none;
  }
  .partner-tp{
    font-size:14px;
    color: #999;
    line-height: 14px;
  }
  .partner-md{
    display: block;
    width: .2rem;
    height:.2rem;
    margin:0 auto;
    margin-top:.15rem;
    line-height: .14rem;

  }
  .partner-bt{
    font-size: 14px;
    color:#EE0B09;
    line-height: 14px;
    margin-top: .15rem;
  }
  .goWithdrawals{
    height:.5rem;
    line-height:.5rem;
    border-bottom:1px solid #F5F5F5;
    display: flex;
    justify-content:space-between;
    align-items: center;
    /* margin-bottom: 50rpx; */
    padding-left:.1rem;
  }
  .goWithdrawals-lf,.goWithdrawals-lr{
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .goWithdrawals-lf span{
    font-size:15px;
    color:#333;
    margin-left:.15rem;
  }
  .goWithdrawals-lf .iconfont{
    font-size:.15rem;
    color:#dd2727;
    font-weight: 800;
  }





  .goWithdrawals-lr span{
    font-size:14px;
    color:#666;
    margin-right:.15rem;
  }
  /* .goWithdrawals-lr text:nth-child(1){
      margin-right:10rpx;
  } */
  .goWithdrawals-img{
    margin:0;
  }

  /* 新增 */
  .mydingdan-list {
    padding: 0 .05rem;
    border-right: 1px solid #F6F6F9;
    flex: 1;

  }
  .mydingdan-list .dingdan-icon div{
    width: 100%;
    height: 100%;
    font-size: .3rem;
  }
  .mydingdan-list .dingdan-icon {
    width:30px;
    height:30px;
    margin:0 auto;
    position:relative;
  }
  .mydingdan-list span{
    display:block;
    margin-top: 5px;
  }
  .mydingdan-list .num{
    text-align:center;
    background:#EC5151;
    color:#fff;
    width:.15rem;
    height:.15rem;
    line-height:.15rem;
    border-radius:.11rem;
    position:absolute;
    right:-.05rem;
    top:-.05rem;
    font-size:.12rem;
  }














</style>
