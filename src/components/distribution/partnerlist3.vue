<template>
  <div class="mian1">

    <ul class="p-list" >
      <li class="p-cell" v-for="n in 3">
        <div class="logo">
          <img src="../../assets/images/shoppingCart-01.jpg"/>
        </div>
        <div class="info">
          <h5>名字</h5>
          <span>123112</span>
          <span class="usertime">关注</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .p-list {
    display: block;
    background-color: #fff;
  }
  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    border-top:1px solid #e2e2e2;
  }
  .logo {
    flex: 1;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.2rem;
    position: relative;
  }
  .info h5 {
    margin-top: 0.1rem;
    color: #27272f;
    font-size: 0.14rem;
  }
  .info span {
    font-size: 0.14rem;
    color: #666;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
  }
  .mian1 {
    position: fixed;
    top: 2.05rem;
    width: 100%;
    /*height: 100%;*/
    background: #eee;
    z-index: 10;
  }
  .usertime {
    position: absolute;
    right: 0;
    bottom:0.05rem;
    font-size: 0.12rem;
  }
</style>
