<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {}
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
  }

  input {
    outline: medium;
  }

  button {
    /*outline: none;*/
  }

  * {
    margin: 0;
    padding: 0;
    font-size: .28rem
    /*font-family: PingFangSC-Regular, sans-serif;*/
  }

  a {
    text-decoration: none;
  }

  li {
    list-style-type: none
  }
</style>
