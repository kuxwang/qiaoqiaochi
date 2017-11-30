<template>
  <div class="tabbar">
    <mt-tabbar>
      <router-link class="mint-tab-item" :to="{name:'home'}" tag="a">
        <div class="mint-tab-item-label">
          <!--<div class="iconfont tabIcon">&#xe648;</div>-->
          <div class="iconfont tabIcon">&#xe640;</div>
          全部商品
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'class'}" tag="a">
        <div class="mint-tab-item-label">
          <!--<div class="iconfont tabIcon">&#xe64a;</div>-->
          <div class="iconfont tabIcon">&#xe654;</div>
          精选
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'shoppingCart'}" tag="a">
        <div class="mint-tab-item-label">
          <!--<div class="iconfont tabIcon">&#xe64a;</div>-->
          <div class="iconfont tabIcon">&#xe63c;</div>
          购物车
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'userCenter'}" tag="a">
        <div class="mint-tab-item-label">
          <!--<div class="iconfont tabIcon">&#xe64d;</div>-->
          <div class="iconfont tabIcon">&#xe63f;</div>
          个人中心
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'qrCode'}" tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe609;</div>
          我的二维码
        </div>
      </router-link>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  components: {

  }
}
</script>
<style lang="less" scoped>
  @import '../../assets/less/index.less';
  @import '../../assets/less/reset.less';
  @import '../../assets/fonts/iconfont.css';
.tabIcon {
    font-size: 0.24rem;
    padding-bottom: 0.05rem;
}

.tabbar {
    z-index: 10 !important;
}

.mint-tabbar {
    background: #fff;
    border-top: 1px solid #E7E7E7;
    position: fixed;
    z-index: 10;
    align-items: center;
}

.mint-tab-item {
    color: #7A7E83;

}
.mint-tab-item-label{
  font-size:.12rem;
}
.router-link-exact-active {
    color: #ff771b;
}

.mint-tabbar {
    height: 0.5rem;
}
</style>
