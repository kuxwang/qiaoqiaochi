<template>
  <div class="mian1">
    <section>
      <mt-header fixed title="列表">
        <router-link to="/partner" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
    </section>
    <section class="top">
    </section>
    <ul class="p-list" v-for="n in 1">
      <li class="p-cell">
        <div class="logo">
          <img src="../../assets/images/shoppingCart-01.jpg"/>
        </div>
        <div class="info">
          <h5>名字</h5>
          <span>123112</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .p-list {
    display: block;
    background-color: #fff;
    margin-top: 0.5rem;
  }
  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    border-top:1px solid #eee;
  }
  .logo {
    flex: 1;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.1rem;
  }
  .info h5 {
    margin: 0.1rem 0;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
  }
  .mian1 {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: #eee;
    z-index: 10;
  }
</style>
