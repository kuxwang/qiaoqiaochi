<template>
  <div class="main">
    <section>
      <mt-header fixed title="我的伙伴" class="ocolor">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
    </section>
    <section class="top">
    </section>
    <ul>
      <!--<li class="list-type" v-for="item in cell">
        <span class="iconfont">&#xe612;</span>新的粉丝
        <span class="num-right">62人</span>
      </li>-->
      <router-link to="/partnerlist" tag="li" class="list-type" v-for="item in cell">
        <span class="iconfont">&#xe612;</span>新的粉丝
        <span class="num-right">62人</span>
      </router-link>
    </ul>
    <!--<mt-tab-container v-model="active">-->
    <!--<mt-tab-container-item id="tab-container1">-->
    <!--<mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>-->
    <!--</mt-tab-container-item>-->
    <!--<mt-tab-container-item id="tab-container2">-->
    <!--<mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>-->
    <!--</mt-tab-container-item>-->
    <!--<mt-tab-container-item id="tab-container3">-->
    <!--<mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>-->
    <!--</mt-tab-container-item>-->
    <!--</mt-tab-container>-->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">所有伙伴</mt-tab-item>
      <mt-tab-item id="2">已购买伙伴</mt-tab-item>
      <mt-tab-item id="3">未购买伙伴</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <!--<mt-cell v-for="n in 5" :title="'内容 ' + n" />-->
        <!--<mt-cell v-for="n in 5">-->
          <!--<div class="logo">-->
            <!--<img src="../../assets/images/shoppingCart-01.jpg"/>-->
          <!--</div>-->
          <!--<div class="info">-->
            <!--<h5>名字</h5>-->
            <!--<span>123112</span>-->
          <!--</div>-->
        <!--</mt-cell>-->
        <ul class="p-list" v-for="n in 5">
          <li class="p-cell">
            <div class="logo">
              <img src="../../assets/images/shoppingCart-01.jpg"/>
            </div>
            <div class="info">
              <h5>名字</h5>
              <span>123112</span>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul class="p-list" v-for="n in 13">
          <li class="p-cell">
            <div class="logo">
              <img src="../../assets/images/shoppingCart-01.jpg"/>
            </div>
            <div class="info">
              <h5>名字</h5>
              <span>123112</span>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul class="p-list" v-for="n in 7">
          <li class="p-cell">
            <div class="logo">
              <img src="../../assets/images/shoppingCart-01.jpg"/>
            </div>
            <div class="info">
              <h5>名字</h5>
              <span>123112</span>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <div>
        <div class="pop-logo">
          <img src="../../assets/images/shoppingCart-01.jpg"/>
          <span>名字</span>
          <span>ID</span>
        </div>
        <ul class="pop-info">
          <li>粉丝：</li>
          <li>关注方式</li>
          <li>消费金额</li>
          <li>微信号</li>
          <li></li>
        </ul>
      </div>
    </mt-popup>
    <router-view></router-view>
  </div>

</template>
<script>
  import {Popup, Picker} from 'mint-ui';
  //  import {TabContainer, TabContainerItem, Cell}  from 'mint-ui'
  export default{
    data () {
      return {
        active:'tab-container1',
        selected:1,
        cell: [1,2,3,4],
        popupVisible:false
      }
    },
    components: {
//      'mt-cell': Cell,
//      'mt-tab-container': TabContainer,
//      'mt-tab-container-item': TabContainerItem,
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
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
    height: 0rem;
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
  .list-type {
    height: 0.4rem;
    border-bottom: 1px solid #fff;
    text-align: left;
    padding: 0.1rem 0.2rem;
  }
  .list-type .num-right {
    float: right;
  }
  .p-list {
    display: block;
    background-color: #fff;
  }
  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
  }
  .logo {
    flex: 1;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.1rem;
  }
  .info h5 {
    margin: 0.1rem 0;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
  }
  .mint-navbar .mint-tab-item.is-selected {
    color: red;
  }
  .mint-tab-container-item {
    overflow: hidden;
    overflow-y: scroll;
    height: 4.2rem;
  }
</style>
