<template>
  <div class="main">
    <mt-header title="二维码" fixed>
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    <div class="container">
        <div>

        </div>
    </div>



  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>


<style scoped lang="less">
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  .main {
    .page-view(3);
    .container {
      .scroll-view(100%)

    }

  }






</style>
