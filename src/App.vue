<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!$route.meta.nokeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.nokeepAlive"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
    created () {},
    methods: {},
    /*watch: {
      "$route"(to,form){
        console.log(to)
      }
    }*/
  }
</script>

<style>
  @import './assets/css/fonts/iconfont.css';

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    background-color: #fff !important;
    overflow: hidden;

  }

  .header {
    -webkit-transform: translateZ(0) !important;
  }

  /*公共头部*/
  .mint-header {
    background: #fff !important;
    color: #252525 !important;
    border-bottom: 1px solid #e3e3e3;
    font-size: 0.16rem !important;
    /*height: .45rem !important;*/
    height: .64rem !important;
  }

  .mintui {
    font-size: .20rem !important;
  }

  .ocolor {
    background-color: #F5751D !important;
  }

  input {
    outline: medium;
  }

  .clear:after {
    content: '';
    clear: both;
  }

  a {
    text-decoration: none;
  }

  ul {
    /*box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);*/
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
  .page-navbar .mint-tab-item-label {
    font-size: .15rem;
    line-height: .06rem;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #F5751D;
    color: #F5751D;
    font-size: .15rem;
  }

  /*yellowStar*/
  .mint-msgbox-confirm {
    color: #F5751D;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .scroll-style {
    height: 100%;
    /*width: 100%;*/
    /*height: 6.2rem;*/
    overflow: hidden;
  }

  .mint-header .mint-button {
    width: .4rem;
  }

  .mint-header-button > a {
    display: block;
  }

  .mint-indicator {
    position: fixed !important;
    top: 1rem !important;
    z-index: 100 !important;
    height: .5rem !important;
  }

  .mint-indicator-wrapper {
    height: 1rem !important;

  }

  .mint-indicator-spin {
    position: absolute;

  }

  .mint-indicator-text {
    position: relative;
    top: .35rem;
  }

  .mint-spinner-fading-circle {
    width: .32rem !important;
    height: .32rem !important;
    left: -0.15rem !important;
    top: .03rem !important;
  }

  .mint-header-title {
    font-size: .17rem !important;
  }
  .mint-msgbox-confirm {
   color: #F5751D;
  }
  .mint-msgbox-message {
    line-height: .2rem;

  }


</style>

