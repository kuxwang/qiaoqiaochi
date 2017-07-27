<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    name: 'app',
  }
</script>

<style>
  #app {
    /*width: 3.75rem;*/
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
  }

  input {
    outline: medium;
  }

  .ocolor {
    background-color: #F5751D !important;
  }

  .clear:after {
    content:'';
    clear: both;
  }
  a {
    text-decoration: none;
  }

  li {
    list-style-type: none
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  /*我的订单navbar字体设置*/
  .page-navbar .mint-tab-item-label{
    font-size: .15rem;
    line-height: .06rem;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 2px solid #F5751D;
    color: #F5751D;
    font-size:.15rem;
  }
  .order-header .mintui-back:before{
    color:#fff;
  }
  .order-header .mint-header-title{
    color:#fff;
  }
  /*订单详情页*/
</style>
