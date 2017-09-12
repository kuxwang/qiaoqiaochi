<template>
  <div class="content">
    <div class="top-bar">
      <div class="logo"></div>

    </div>
    <div class="scroll-view">





    </div>
    <v-tabbar></v-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import vTabbar from '../components/mode/Tabbar';
  import vScroll from '../components/mode/scroll';
  import {fn} from '../config/myUtils'

  export default{
    data(){
      return {
        img1: require('../assets/images/home-01.jpg'),
        img2: require('../assets/images/home-02.jpg')
      }
    },
    mounted () {

    },
    components: {
      vTabbar,
      vScroll
    }
  }
</script>
<style lang="less" scoped>
  @import '../assets/css/reset/reset.css';
  @import '../assets/css/reset/common.less';
  .content {
    .page-view();
  }

  .scroll-view {
    position: absolute;
    top: 0;
    .scroll-view(100%);
    width: 100%;
    padding-bottom: .5rem;
  }


</style>
