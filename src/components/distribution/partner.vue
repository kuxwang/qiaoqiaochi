<template>
  <div class="main">
    <section>
      <mt-header fixed title="我的伙伴" class="ocolor">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>

    </section>
    <section class="top">
    </section>

    <ul class="nav-tab">
      <router-link to="/partner1" tag="li">
        <!--<li class="li1">-->
        <div class="title">所有伙伴</div>
        <div class="iconfont listicon">&#xe646;</div>
        <div>
          <span class="num">1</span><span class="yuan"> 人</span>
        </div>
        <!--</li>-->
      </router-link>
      <router-link to="/partner2" tag="li">
        <!--<li class="li2">-->
        <div class="title">已购买伙伴</div>
        <div class="iconfont listicon">&#xe600;</div>
        <div>
          <span class="num">10</span><span class="yuan"> 人</span>
        </div>
        <!--</li>-->
      </router-link>
      <router-link to="/partner3" tag="li">
        <!--<li class="li3">-->
        <div class="title">未购买伙伴</div>
        <div class="iconfont listicon">&#xe60d;</div>
        <div>
          <span class="num">100</span><span class="yuan"> 人</span>
        </div>
        <!--</li>-->
      </router-link>
    </ul>
    <div class="search">
      <input type="search" results="1" v-model="find" placeholder="输入订单号、粉丝ID"/>
      <button>搜索</button>
    </div>

    <router-view></router-view>
 <!--   <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">所有伙伴</mt-tab-item>
      <mt-tab-item id="2">已购买伙伴</mt-tab-item>
      <mt-tab-item id="3">未购买伙伴</mt-tab-item>
    </mt-navbar>-->

   <!-- <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <router-link to="/partnerlist" tag="div" class="p-cell">
            <div class="logo">
              <img src="../../assets/images/shoppingCart-01.jpg"/>
            </div>
            <div class="info">
              <h5>名字</h5>
              <span>123112</span>
            </div>
        </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <router-link to="/partnerlist" tag="div" class="p-cell">
          <div class="logo">
            <img src="../../assets/images/shoppingCart-01.jpg"/>
          </div>
          <div class="info">
            <h5>名字</h5>
            <span>123112</span>
          </div>
        </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <router-link to="/partnerlist" tag="div" class="p-cell">
          <div class="logo">
            <img src="../../assets/images/shoppingCart-01.jpg"/>
          </div>
          <div class="info">
            <h5>名字</h5>
            <span class="userid">123112</span>
            <span class="usertime">关注</span>
          </div>
        </router-link>
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
    <transition name="slide">
      <router-view></router-view>
    </transition>-->
  </div>

</template>
<script>
  import {Popup, Picker} from 'mint-ui';
  //  import {TabContainer, TabContainerItem, Cell}  from 'mint-ui'
  import {Carts,Goods,ApiLogin} from '../../api/api.js'
  export default{
    data () {
      return {
        active:'tab-container1',
        selected:'1',
        find:'',
        cell: [
          {
              icon:'&#xe612',
              type: '新的粉丝',
              num:'1'
          },
          {
            icon:'&#xe612',
            type: '新的粉丝',
            num:'1'
          },
          {
            icon:'&#xe610;',
            type: '高价值粉丝',
            num:'1'
          },{
            icon:'&#xe612',
            type: '分享达人',
            num:'1'
          },

        ],
        popupVisible:false
      }
    },
    components: {
//      'mt-cell': Cell,
//      'mt-tab-container': TabContainer,
//      'mt-tab-container-item': TabContainerItem,
    },
    methods: {
        open(){
            this.popupVisible=true
        }
    },
    created(){
       /* let params={
          timestamp:1500922207,
          sign:'TIMESTAMP=1500922207&key=MJJB614J',
          access_token:"78dddb9fe91d6ac654af8c4abd9fb036",
        }
      Goods(params).then((res)=>{
        console.log(res)
      })*/
        }



    }

</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

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
  .mint-header {
    border-bottom: 0;
    color: #fff;
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
    background-color: #fff;
  }
  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    border-top:1px solid #e2e2e2;
    border-bottom:1px solid #e2e2e2;
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
    margin-top: 0.1rem;
    color: #27272f;
    font-size: 0.14rem;

  }
  .info span {
    font-size: 0.14rem;
    color: #666;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
  }
  .mint-navbar .mint-tab-item.is-selected {
    color: #F5751D;
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
    position: absolute;
    right: 0;
    bottom:0.05rem;
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
    margin-top: .5rem;
    height: .90rem;
    -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    display: flex;
  }


  .nav-tab li {
    position: relative;
    display: block;
    /*width: 33.3%;*/
    height: .90rem;
    /*float: left*/
    background-color: #fff;
    padding: .1rem .2rem;
    flex: 1;
  }

  .nav-tab .li1:after, .nav-tab .li2:after,.nav-tab .li4:after, .nav-tab .li5:after {
    content: '';
    position: absolute;
    right: 0;
    top: .14rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .nav-tab .li4, .content .li5, .content .li6 {
    border-top: 1px solid rgba(0, 0, 0, .2)
  }

  .nav-tab .title {
    color: rgba(0, 0, 0, .5);
    font-size: .14rem;
    line-height: .2rem;
  }

  .nav-tab .iconfont {
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

  .search {
    height: .3rem;
    display: flex;
    margin: .2rem 2% ;
    width: 96%;
  }
  .search input {
    border: none;
    display: block;
    height: 100%;
    flex: 1;
  }
  .search button {
    background-color: #F5751D;
    display: block;
    height: 100%;
    flex: .2;
  }
  .mint-header {
    color: #fff !important;
  }
</style>
