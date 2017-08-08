<template>
  <div class="content">
    <div class="container">
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </div>
    <v-tabbar></v-tabbar>
    <router-view></router-view>
  </div>

</template>

<script>
  import vTabbar from '../components/common/Tabbar';
  import vScroll from '../components/common/scroll';
  import { Swipe, SwipeItem } from 'mint-ui';

  export default{
    data(){
      return {
        img1:require('../assets/images/home-01.jpg'),
        img2:require('../assets/images/home-02.jpg')
      }
    },
    mounted(){
    },
    components:{
      vTabbar,
      vScroll
    }
  }
</script>
<style scoped>
  .content{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
    /*overflow: auto;*/
    overflow: hidden;
    z-index: 50;
    -webkit-overflow-scrolling: auto;
  }

  .container {
    position: absolute;
    top:0;
    width: 100%;
    overflow: auto;
    /*overflow-y: scroll;*/
    -webkit-overflow-scrolling: touch;
    height: 6.7rem;
    /*overflow-y: scroll;*/

  }
</style>
