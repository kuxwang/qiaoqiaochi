<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  //  import BScroll from 'better-scroll'
  //  import Vue from 'vue'
  export default {
    name: 'app',
    created () {

//      const allScroll = new BScroll(this.$refs.app, {})
    },
    methods: {
//        initScroll () {
//          const allScroll = new BScroll(document.getElementById('app'), {})
//        }
//
    }
  }
</script>


<style>
  @import './assets/css/fonts/iconfont.css';

  #app {
    /*width: 3.75rem;*/
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    background-color: #efeff4 !important;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .header {
    -webkit-transform: translateZ(0);
  }

  /*公共头部*/
  .mint-header {
    background: #fff !important;
    color: #252525 !important;
    border-bottom: 1px solid #e3e3e3;
    font-size: 0.16rem !important;
    height: 45px !important;
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


</style>

