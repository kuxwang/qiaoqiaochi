<template>
  <div class="main">
    <section>
      <mt-header fixed title="推广订单" class="ocolor">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
    </section>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <section class="top">
      <div class="top_1" >
        <span class="title">累计奖励(元)</span>
        <span class="num">58229.63</span><span class="yuan"> 元</span>
      </div>
      <div>
        <span class="title">推广销售(元)</span>
        <span class="num">130834.09</span><span class="yuan"> </span>
      </div>
    </section>

    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1" :class="">全部</mt-tab-item>
      <mt-tab-item id="2">未结算</mt-tab-item>
      <mt-tab-item id="3">已退款</mt-tab-item>
      <mt-tab-item id="4">已结算</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
          <router-link to="/orderinfo" tag="div" class="p-cell" v-for="n in 5">
            <div class="up">
              <span>订单编号</span>
              <span class="time">2017-7-23 32：23：23</span>
            </div>
            <div class="down">
              <div class="logo">
                <img src="../../assets/images/shoppingCart-01.jpg"/>
              </div>
              <div class="info">
                <h5>名字</h5>
                <span>123112</span>
              </div>
              <div class="ordertype">
                <span>已发货</span>
                <span>￥0.36</span>
              </div>
            </div>
          </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <router-link to="/orderinfo" tag="div" class="p-cell"  v-for="n in 10">
          <div class="up">
            <span>订单编号</span>
            <span class="time">2017-7-23 32：23：23</span>
          </div>
          <div class="down">
            <div class="logo">
              <img src="../../assets/images/shoppingCart-01.jpg"/>
            </div>
            <div class="info">
              <h5>名字</h5>
              <span>123112</span>
            </div>
            <div class="ordertype">
              <span>已发货</span>
              <span>￥0.36</span>
            </div>
          </div>
        </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <router-link to="/orderinfo" tag="div" class="p-cell"  v-for="n in 3">
          <div class="up">
            <span>订单编号</span>
            <span class="time">2017-7-23 32：23：23</span>
          </div>
          <div class="down">
            <div class="logo">
              <img src="../../assets/images/shoppingCart-01.jpg"/>
            </div>
            <div class="info">
              <h5>名字</h5>
              <span>123112</span>
            </div>
            <div class="ordertype">
              <span>已发货</span>
              <span>￥0.36</span>
            </div>
          </div>
        </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <router-link to="/orderinfo" tag="div" class="p-cell"  v-for="n in 6">
          <div class="up">
            <span>订单编号</span>
            <span class="time">2017-7-23 32：23：23</span>
          </div>
          <div class="down">
            <div class="logo">
              <img src="../../assets/images/shoppingCart-01.jpg"/>
            </div>
            <div class="info">
              <h5>名字</h5>
              <span>123112</span>
            </div>
            <div class="ordertype">
              <span>已发货</span>
              <span>￥0.36</span>
            </div>
          </div>
        </router-link>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>

</template>
<script>
  import MtCell from "../../../node_modules/mint-ui/packages/cell/src/cell";
//  import {TabContainer, TabContainerItem, Cell}  from 'mint-ui'
  export default{
    data () {
      return {
        active:'tab-container1',
        selected:'1'
      }
    },
    components: {


    },
    methods: {

    },
    created(){

    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
  }
  .mint-header {
    border-bottom: 0;
    color: #fff;
  }

  .main {
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
    margin-top:.4rem;
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
  .p-list {
    display: block;
    background-color: #fff;

  }
  .p-cell {
    display: flex;
    flex-direction: column;
    padding:  0;
    margin-top: 0.05rem;
    background-color: #fff;
    border-top:1px solid #e2e2e2;
  }
  .up {
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    padding: 0 0.1rem;
    line-height: 0.32rem;

  }

.up .time {
  float: right;
  font-size: 0.12rem;

}

  .down {
    flex: 2.5;
    height: 0.68rem;
    display: flex;
    padding: 0 0.1rem;
  }
  .logo {
    flex: 1;
    padding: 0.1rem 0;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.1rem;
    padding: 0.05rem 0;
    color: #666;
  }
  .info h5 {
    margin: 0.05rem 0;
    color: #666;
  }
  .info span {
    color: #000;
    font-size: 0.14rem;
    color: #666;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
    vertical-align: middle;
    display: block;
  }
  .ordertype {
    flex: 3;
    padding: 0.05rem 0;
    color: #666;
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
    color: #F5751D;

  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom:2px solid #F5751D;
  }

</style>
