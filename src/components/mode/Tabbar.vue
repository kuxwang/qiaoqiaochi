<template>
  <div class="tabbar">
    <mt-tabbar>
      <router-link class="mint-tab-item" :to="{name:'home'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe640;</div>
          首页
        </div>
      </router-link>
      <!--<router-link id="ordertab" class="mint-tab-item"  :to="{name:'category'}"  tag="a">-->
        <!--<div class="mint-tab-item-label">-->
          <!--<div class="iconfont tabIcon">&#xe7d8;</div>-->
          <!--分类-->
        <!--</div>-->
      <!--</router-link>-->
      <router-link class="mint-tab-item" :to="{name:'shoppingCart'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe63c;</div>
          购物车
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'vipCenter'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe74b;</div>
          店铺
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'userCenter'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe63f;</div>
          个人中心
        </div>
      </router-link>
     <!-- <router-link class="mint-tab-item" :to="{name:'qrCode'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe60c;</div>
          我的二维码
        </div>
      </router-link>-->
    </mt-tabbar>
    </div>
</template>
<script>
//  import { Tabbar ,TabItem } from 'mint-ui';
  export default{
    components:{

    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  .tabIcon{
   font-size: 0.24rem;
    margin-bottom:.04rem;
  }
  .tabbar {
    z-index: 1 !important;
  }
  .mint-tabbar{
    background: #fff;
    border-top: 1px solid #E7E7E7;
    position: fixed;
    -webkit-transform: translateZ(0);
    z-index: 1;
  }
  .mint-tab-item{
    color:#525252;
  }
  .router-link-exact-active{
    /*color:#ff771b;*/
    color:#000;
  }
  .mint-tabbar {
    height: .5rem;
  }
  .mint-tab-item-label {

  }
</style>
