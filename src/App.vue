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

<<<<<<< HEAD
=======
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
  }

  /*公共头部*/
  .mint-header {
    background: #fff !important;
    color: #252525 !important;
    border-bottom: 1px solid #e3e3e3;
    font-size: 0.16rem !important;
    height:45px !important;
  }

  .ocolor {
    background-color: #F5751D !important;
  }
  input {
    outline: medium;
  }
  .clear:after {
    content:'';
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
  .page-navbar .mint-tab-item-label{
    font-size: .15rem;
    line-height: .06rem;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 2px solid #F5751D;
    color: #F5751D;
    font-size:.15rem;
  }

  /*yellowStar*/
  .mint-msgbox-confirm{
    color:#F5751D;
  }
  ::-webkit-scrollbar{
    display:none;
  }
</style>
>>>>>>> 562645b9c04b518fc8cf5d826ec244fd0a22fd8d
