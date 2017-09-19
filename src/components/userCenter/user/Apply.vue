<template>
  <div class="page">
    <mt-header title="店铺管理" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="title">
        <h1>优源店主</h1>
        <div>六大特权&nbsp<span>专属<b>6</b>大特权</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    methods:{

    },
    created(){

    }
  }
</script>



<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .page {
    .page-view(1);
    background-color: red;
    z-index: 100;
  }
  .container {
    .title {
      width: 100%;
      height: 1.56rem;
      background-color: #9e0028;
      h1 {
        font-family: RTWSYueRoudGoDemo;
        font-size: .36rem;
        color: #e5c558;

      }
    }
  }

</style>

