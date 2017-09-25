<template>
  <div class="page">
    <mt-header title="联系客服" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">

    </div>
  </div>
</template>

<script>
  import {_webapp} from '../../../config/webapp.js';
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
    background: #F5F4F9;
    .content{
      width:100%;
      margin-top:.45rem;
      padding:.15rem;
    }
  }
</style>

