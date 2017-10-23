<template>
  <div class="main">
    <mt-header title="意见反馈" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="order-nav-bar">
        <div class="detail-bloc" v-for="(i,index) in type">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        type: [
          {
            title: '待使用',
            staus:0
          },
          {
            title: '已使用',
            staus:1
          },
          {
            title: '已过期',
            staus:2
          },
        ]
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

  .mian {
    .page-view(1);
  }
  .container {
    margin-top: .45rem;
  }








</style>
