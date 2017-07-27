<template>
  <div class="main">
    <!--<section>-->
      <!--<mt-header fixed title="会员中心" class="ocolor">-->
        <!--<router-link to="/test" slot="left">-->
          <!--<mt-button icon="back">返回</mt-button>-->
        <!--</router-link>-->
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      <!--</mt-header>-->
    <!--</section>-->
    <section class="avatar">
      <div class="icon"></div>
      <div class="message">
        <div>
          <span>昵称</span>
          <span>也希腊类</span>
        </div>
        <div>
          <span>会员ID</span>
          <span>188947</span>
        </div>
        <div>
          <span>会员等级</span>
          <span>塑料</span>
        </div>
      </div>
      <!-- <i class="iconfont right" @click="goUserInfo">&#xe649;</i> -->
      <router-link class="iconfont right" :to="{name:'userinfo'}" tag="i">&#xe649;</router-link>
    </section>
    <section class="top">
      <div class="top_1">
        <span class="title">营业额</span>
        <span class="num">703205</span><span class="yuan"> 元</span>
      </div>
      <div>
        <span class="title">佣金</span>
        <span class="num">1308.34</span><span class="yuan"> 元</span>
      </div>
    </section>
    <section class="content">
      <div class="mfriend">
        <span class="mint-cell-text">我的伙伴</span>
      </div>
      <ul>
        <router-link to="/partner" tag="li">
        <!--<li class="li1">-->
          <div class="title">所有伙伴</div>
          <div class="iconfont listicon">&#xe646;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 人</span>
          </div>
        <!--</li>-->
        </router-link>
        <router-link to="/partner" tag="li">
        <!--<li class="li2">-->
          <div class="title">已购买伙伴</div>
          <div class="iconfont listicon">&#xe600;</div>
          <div>
            <span class="num">10</span><span class="yuan"> 人</span>
          </div>
        <!--</li>-->
        </router-link>
        <router-link to="/partner" tag="li">
        <!--<li class="li3">-->
          <div class="title">未购买伙伴</div>
          <div class="iconfont listicon">&#xe60d;</div>
          <div>
            <span class="num">100</span><span class="yuan"> 人</span>
          </div>
        <!--</li>-->
        </router-link>
      </ul>

      <div class="mfriend">
        <span class="mint-cell-text">推广订单</span>
      </div>
      <ul>
        <!--<li class="li1">-->
          <router-link to="/extension" tag="li">
            <div class="title">下单已付款</div>
            <div class="iconfont listicon">&#xe624;</div>
            <div>
              <span class="num">1</span><span class="yuan"> 单</span>
            </div>
          </router-link>
        <!--</li>-->
        <router-link to="/extension" tag="li">
        <!--<li class="li2">-->
          <div class="title">下单已发货</div>
          <div class="iconfont listicon">&#xe8b5;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 单</span>
          </div>
        <!--</li>-->
        </router-link>
        <router-link to="/extension" tag="li">
        <!--<li class="li3">-->
          <div class="title">订单已完成</div>
          <div class="iconfont listicon">&#xe619;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 单</span>
          </div>
        <!--</li>-->
        </router-link>
      </ul>

      <div class="mfriend">
        <span class="mint-cell-text">推广费</span>
      </div>
      <ul class="tuiguang">
        <li class="li1">
          <div class="title">已收货业绩</div>
          <div class="iconfont listicon">&#xe61e;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 元</span>
          </div>
        </li>
        <li class="li2">
          <div class="title">已提现业绩</div>
          <div class="iconfont listicon">&#xe630;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 元</span>
          </div>
        </li>
        <li class="li3">
          <div class="title">可提现业绩</div>
          <div class="iconfont listicon">&#xe608;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 元</span>
          </div>
        </li>
        <li class="li4">
          <div class="title">被驳回业绩</div>
          <div class="iconfont listicon">&#xe620;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 元</span>
          </div>
        </li>
        <li class="li5">
          <div class="title">申请中业绩</div>
          <div class="iconfont listicon">&#xe602;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 元</span>
          </div>
        </li>
        <li class="li6">
          <div class="title">待打款业绩</div>
          <div class="iconfont listicon">&#xe625;</div>
          <div>
            <span class="num">1</span><span class="yuan"> 元</span>
          </div>
        </li>
      </ul>
    </section>
   <!--  <transition name="slide">
      <router-view></router-view>
    </transition> -->
    <v-tabbar></v-tabbar>
    <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight" >
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import vTabbar from '../components/common/Tabbar.vue'
  export default{
    data () {
      return {}
    },
    components: {
      vTabbar
    }
  }
</script>
<style scoped>
  @import '../assets/css/fonts/iconfont.css';
  @import '../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
  }

  .main,.main1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: auto;
  }

  .avatar {
    position: relative;
    top: 0;
    left: 0;
    /*margin-top: .4rem;*/
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
    height: .64rem;
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
    font-size: .18rem;
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
    margin-bottom: .6rem;
  }

  .content .mfriend {
    margin-top: .05rem;
    text-align: left;
    color: rgba(0, 0, 0, .7);
    background-color: #fff;
    padding: .1rem .2rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
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
</style>
