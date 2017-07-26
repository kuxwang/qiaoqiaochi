<template>
  <div>
    <mt-tabbar>
      <router-link class="mint-tab-item" :to="{name:'home'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe89f;</div>
          立即购买
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'order'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe7d8;</div>
          我的订单
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'shoppingCart'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe607;</div>
          购物车
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'vipCenter'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe603;</div>
          会员中心
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'qrCode'}"  tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe60c;</div>
          我的二维码
        </div>
      </router-link>
    </mt-tabbar>
    </div>
</template>
<script>
  import { Tabbar ,TabItem } from 'mint-ui';
  export default{
    components:{
      Tabbar,
      TabItem
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  .tabIcon{
   font-size: 0.24rem;
  }
  .mint-tabbar{
    background: #fff;
    border-top: 1px solid #E7E7E7;
    position: fixed;
  }
  .mint-tab-item{
    color:#525252;
  }
  .router-link-exact-active{
    color:#ff771b;
  }
</style>
