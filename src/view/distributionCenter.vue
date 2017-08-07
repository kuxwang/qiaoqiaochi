<template>
  <div class="main">
    <mt-header fixed title="个人信息" class="header">
      <router-link to="/vipCenter" slot="left">
        <!--<mt-button icon="back"></mt-button>-->
      </router-link>
    </mt-header>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :top-distance="85" ref="loadmore">
      <router-link class="avatar" tag="section" :to="{name:'userinfo'}">
        <div class="icon">
          <img :src="memberInfo.avatar" alt="">
        </div>
        <div class="message">
          <div>
            <span>昵称:</span>
            <span>{{memberInfo.nickname}}</span>
          </div>
          <div>
            <span>会员ID:</span>
            <span>{{memberInfo.id}}</span>
          </div>
          <div>
            <span>会员等级:</span>
            <span>{{memberInfo.leveldetail.levelname}}</span>
          </div>
          <div>
            <span>推荐人:</span>
            <span>{{memberInfo.from}}</span>
          </div>
        </div>
        <i class="iconfont right">&#xe649;</i>
        <!-- <router-link class="iconfont right" :to="{name:'userinfo'}" tag="i">&#xe649;</router-link> -->
      </router-link>
      <section class="top">
        <!--<div class="top_1">-->
     <!--   <router-link class="topdiv-first" :to="{name: 'takemoney'}" tag="div">
          &lt;!&ndash;<span class="title">推广？、费</span>&ndash;&gt;
          &lt;!&ndash;<span class="num">{{recordStatistics_get.cg_money_sum}}</span><span class="yuan"> 元</span>&ndash;&gt;
          推广费
        </router-link>
        &lt;!&ndash;</div>&ndash;&gt;
        &lt;!&ndash;<div>&ndash;&gt;
        <router-link :to="{name: 'takemoney'}" tag="div">
          &lt;!&ndash;<span class="title">{{recordStatistics_get.c_money_sum}}</span><span class="yuan"> 元</span>&ndash;&gt;
          {{recordStatistics_get.c_money_sum}} 元
          &lt;!&ndash;<span class="title">佣金</span>&ndash;&gt;
          &lt;!&ndash;<span class="num">{{recordStatistics_get.c_money_sum}}</span><span class="yuan"> 元</span>&ndash;&gt;
        </router-link>-->

        <!--</div>-->

        <router-link class="money-top" :to="{name: 'takemoney'}" tag="div">
          推广费:{{recordStatistics_get.c_money_sum}} 元
        </router-link>
      </section>
      <section class="content">
        <div class="mfriend">
          <span class="mint-cell-text">我的伙伴</span>
        </div>
        <ul>
          <!--<router-link to="/partner" tag="li">-->
          <router-link class="li1" :to="{path:'partner',query:{stab:1,type:'all'}}" tag="li">
          <!--<li class="li1" @click="partnertab(1)">-->
            <div class="title">所有伙伴</div>
            <div class="iconfont listicon">&#xe646;</div>
            <div class="nummoney">
              <span class="num">{{teamsStatistics.all}}</span><span class="yuan"> 人</span>
            </div>
          <!--</li>-->
          </router-link>
          <router-link class="li1" :to="{path:'partner',query:{stab:2,type:'agent'}}" tag="li">
          <!--<li class="li2" @click="partnertab(2)">-->
            <div class="title">已购买伙伴</div>
            <div class="iconfont listicon">&#xe600;</div>
            <div class="nummoney">
              <span class="num">{{teamsStatistics.purchased}}</span><span class="yuan"> 人</span>
            </div>
          <!--</li>-->
          </router-link>
          <router-link class="li1" :to="{path:'partner',query:{stab:3,type:'fans'}}" tag="li">
          <!--<li class="li3" @click="partnertab(3)">-->
            <div class="title">未购买伙伴</div>
            <div class="iconfont listicon">&#xe60d;</div>
            <div class="nummoney">
              <span class="num">{{teamsStatistics.no_purchased}}</span><span class="yuan"> 人</span>
            </div>
          <!--</li>-->
          </router-link>
        </ul>

        <div class="mfriend">
          <span class="mint-cell-text">推广订单</span>
        </div>
        <ul class="order-list">
          <!--<li class="li1" @click="ordertab(1)">-->
            <router-link class="li1" :to="{path:'extension',query:{stab:1,type:'total'}}" tag="li">
            <div class="title">全部</div>
            <div class="iconfont listicon">&#xe624;</div>
            <div class="nummoney">
              <span class="num">{{orderStatistics.total}}</span><span class="yuan"> 单</span>
            </div>
            </router-link>
          <!--</li>-->
          <router-link class="li1" :to="{path:'extension',query:{stab:2,type:'lock'}}" tag="li">
          <!--<li @click="ordertab(2)" class="li1">-->
            <div class="title">未结算</div>
            <div class="iconfont listicon">&#xe624;</div>
            <div class="nummoney">
              <span class="num">{{orderStatistics.lock}}</span><span class="yuan"> 单</span>
            </div>
            </router-link>
          <!--</li>-->
          <router-link class="li1" :to="{path:'extension',query:{stab:3,type:'refund'}}" tag="li">
          <!--<li class="li2" @click="ordertab(3)">-->
            <div class="title">已退款</div>
            <div class="iconfont listicon">&#xe8b5;</div>
            <div class="nummoney">
              <span class="num">{{orderStatistics.refund}}</span><span class="yuan"> 单</span>
            </div>
          <!--</li>-->
          </router-link>
          <router-link class="li1" :to="{path:'extension',query:{stab:4,type:'ok'}}" tag="li">
          <!--<li class="li3" @click="ordertab(4)">-->
            <div class="title">已结算</div>
            <div class="iconfont listicon">&#xe619;</div>
            <div class="nummoney">
              <span class="num">{{orderStatistics.ok}}</span><span class="yuan"> 单</span>
            </div>
          <!--</li>-->
          </router-link>
        </ul>

        <div class="mfriend">
          <span class="mint-cell-text">推广费</span>
          <span class="mint-cell-text-right">去提现</span>
          <router-link class="text-right" tag="div" to="/takemoney"></router-link>
        </div>
        <ul class="tuiguang">
          <li class="li1">
            <div class="title">已收货业绩</div>
            <div class="iconfont listicon">&#xe61e;</div>
            <div class="nummoney">
              <span class="num">{{recordStatistics_get.o_status_3}}</span><span class="yuan"> 元</span>
            </div>
          </li>
          <li class="li2">
            <div class="title">已提现业绩</div>
            <div class="iconfont listicon">&#xe630;</div>
            <div class="nummoney">
              <span class="num">{{recordStatistics_get.pay}}</span><span class="yuan"> 元</span>
            </div>
          </li>
          <li class="li3">
            <div class="title">可提现业绩</div>
            <div class="iconfont listicon">&#xe608;</div>
            <div class="nummoney">
              <span class="num">{{recordStatistics_get.check}}</span><span class="yuan"> 元</span>
            </div>
          </li>
          <li class="li4">
            <div class="title">被驳回业绩</div>
            <div class="iconfont listicon">&#xe620;</div>
            <div class="nummoney">
              <span class="num">{{recordStatistics_get.invalid}}</span><span class="yuan"> 元</span>
            </div>
          </li>
          <li class="li5">
            <div class="title">申请中业绩</div>
            <div class="iconfont listicon">&#xe602;</div>
            <div class="nummoney">
              <span class="num">{{recordStatistics_get.apply}}</span><span class="yuan"> 元</span>
            </div>
          </li>
          <li class="li6">
            <div class="title">待打款业绩</div>
            <div class="iconfont listicon">&#xe625;</div>
            <div class="nummoney">
              <span class="num">{{recordStatistics_get.o_status_0}}</span><span class="yuan"> 元</span>
            </div>
          </li>
        </ul>
        <button class="outLogin" @click="outLogin">退出登录</button>

      </section>
      <!--  <transition name="slide">
         <router-view></router-view>
       </transition> -->
    </mt-loadmore>
    <v-tabbar></v-tabbar>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>

  import vTabbar from '../components/common/Tabbar.vue'
  import {recordStatistics_get, teamsStatistics, orderStatistics, memberInfo, LOGINOUT} from '../api/api'
  import {_webapp} from '../config/_webapp.js';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {MessageBox} from 'mint-ui';

  export default{
    data () {
      return {
        topStatus: '',
        recordStatistics_get: {
          cg_money_sum: '',//销售总额
          c_money_sum: '', //佣金总额
          o_status_3: '', //已收货
          pay: '', //已提现
          check: '', //可提现
          invalid: '', //被驳回的业绩
          apply: '', //申请中
          o_status_0: '' //待打款
        },
        teamsStatistics: {
          all: '',  //总人数
          purchased: '',  //已购买人数
          no_purchased: ''  //未购买人数
        },
        orderStatistics: {
          total: '',//全部
          lock: '',//未结算
          refund: '',//已退款
          ok: '', //已结算
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
        defaultAvatar: ''
      }
    },
    components: {
      vTabbar
    },
    watch: {
      $route (from) {
        if (from.name == 'vipCenter') {
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
      init () {
        let _this = this;
        //佣金统计
        memberInfo({}, function (res) {
          if (res.statusCode == 1) {
              console.log(res)
            _this.memberInfo.nickname = res.data.nickname
            _this.memberInfo.id = res.data.id
            _this.memberInfo.level = res.data.level
            _this.memberInfo.leveldetail = res.data.leveldetail
            _this.memberInfo.avatar = res.data.avatar
            _this.memberInfo.from = res.data.parent_name
            _this.setImgUrl(_this.memberInfo.avatar)
            recordStatistics_get({data: {type: ''}}, function (res) {
                console.log(res)
              if (res.statusCode == 1) {
                let data = res.data
                console.log(res.data)
                _this.recordStatistics_get.cg_money_sum = res.data.total.c_money_sum || 0;
                _this.recordStatistics_get.c_money_sum = res.data.total.c_money_sum || 0;
                _this.recordStatistics_get.o_status_3 = res.data.o_status_3.c_money_sum || 0;
                _this.recordStatistics_get.pay = res.data.pay.c_money_sum || 0;
//                _this.recordStatistics_get.check = res.data.check.c_money_sum || 0;
                _this.recordStatistics_get.check = res.data.ok.c_money_sum || 0;
                _this.recordStatistics_get.invalid = res.data.invalid.cg_money_sum || 0;
                _this.recordStatistics_get.apply = res.data.apply.c_money_sum;
                _this.recordStatistics_get.o_status_0 = res.data.o_status_0.c_money_sum || 0;
                teamsStatistics({}, function (res) {
                  if (res.statusCode == 1) {
                    _this.teamsStatistics.all = res.data.all  || 0;
                    _this.teamsStatistics.purchased = res.data.purchased  || 0;
                    _this.teamsStatistics.no_purchased = res.data.no_purchased  || 0;
                    orderStatistics({}, function (res) {
                      console.log('orderStatistics');
                      if (res.statusCode == 1) {
                        _this.orderStatistics.total = res.data.total.order_count  || 0
                        _this.orderStatistics.lock = res.data.lock.order_count  || 0
                        _this.orderStatistics.refund = res.data.refund.order_count  || 0
                        _this.orderStatistics.ok = res.data.ok.order_count  || 0
                        _this.$refs.loadmore.onTopLoaded();
                      } else {
                        console.log('获取团队数量统计接口数据异常')
                      }
                    })
                  } else {
                    console.log('佣金统计接口数据异常')
                  }
                });
              }
            })
          } else {
            console.log('会员接口数据异常')
          }
        });
      },
      partnertab(idx){
        this.tabselect(idx)
        this.$router.push({name: `partner`})
      },
      ordertab(idx){
        this.tabselect(idx)
        this.$router.push({name: `extension`})
      },
      outLogin(){
        MessageBox({title: '确认退出当前账号?', message: '点击确认退出', showCancelButton: true}).then(action => {
          if (action == 'confirm') {//表示点击了确定
            // _webapp.logOut((res)=>{})
            LOGINOUT(function (res) {

            })
          } else if (action == 'cancel') {//表示点击了取消

          }
        })
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop(){
        this.init()
      },
      ...mapMutations({
        tabselect: 'TABSELECT',
        setImgUrl: 'IMGURL'
      })
    },
    filter: {
      setdefault (value) {
        return value || 0
      }
    },
    mounted(){
      this.init();
    }
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
    overflow: auto;
    /*overflow: hidden;*/
  }

  .avatar {
    position: relative;
    top: 0;
    left: 0;
    margin-top: .4rem;
    height: 1rem;
    padding: .15rem;
    color: #fff;
    background-color: #f47f2f;
  }

  .icon {
    width: .70rem;
    height: .70rem;
    background: grey;
    float: left;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .icon > img {
    width: .70rem;
    height: .70rem;
    background: url('../assets/images/userinfo-02.png') no-repeat 100% 100%;
    background-size: 100% 100%;
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
    /*height: 33%;*/
    height: 25%;
  }

  .message > div > span {
    display: block;
    max-width: 100%;
    height: 100%;
    float: left;
    font-size: .14rem;
    line-height: .23rem;
    padding: 0 0 0 10px;
  }

  .message > span {
    font-size: .14rem;
    float: left;
    display: block;
    padding: 0 0 0 10px;
  }

  .avatar > .right {
    position: absolute;
    top: .4rem;
    right: .2rem;
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
    margin-bottom: .7rem;
  }

  .content .mfriend {
    position: relative;
    margin-top: .05rem;
    text-align: left;
    color: rgba(0, 0, 0, .7);
    background-color: #fff;
    padding: .08rem .2rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .mint-cell-text {
    font-size: 0.14rem;
    font-weight: 700;
  }

  .content ul {
    /*margin-top: .1rem;*/
    height: .90rem;
    -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
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
    padding: .1rem .2rem;
  }

  .content .li1:after, .content .li2:after, .content .li4:after, .content .li5:after {
    content: '';
    position: absolute;
    right: 0;
    top: .14rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .content .li4, .content .li5, .content .li6 {
    border-top: 1px solid rgba(0, 0, 0, .2)
  }

  .content .title {
    color: rgba(0, 0, 0, .5);
    font-size: .14rem;
    line-height: .2rem;
  }

  .content .iconfont {
    width: .28rem;
    height: .30rem;
    margin-left: auto;
    margin-right: auto;
    font-size: .20rem;
    /*border: 1px solid #F5751D;*/
    line-height: .3rem;
    /*color: #F5751D;*/
    border-radius: 50%;
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
  .top>.money-top {
    width: 100% ;
    font-size: .16rem;
    line-height: .35rem;
  }
  .nummoney {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
