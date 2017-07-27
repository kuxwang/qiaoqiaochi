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
    width: 3.75rem;
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
  .mint-msgbox-confirm{
    color:#F5751D !important;
  }
  .mint-msgbox-message{
    font-size: 0.15rem;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
