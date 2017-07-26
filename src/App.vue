<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    name:'app',
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

  button {
    /*outline: none;*/
  }

  .ocolor{
    background:#F5751D !important
  }
</style>
