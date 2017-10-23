<template>
  <div class="main">
    <mt-header title="意见反馈" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">

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
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';

  .mian {
    .page-view(1);
  }
  .container {
    margin-top: .45rem;
  }










</style>
