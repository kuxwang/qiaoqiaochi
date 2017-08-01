<template>
  <div class="content">
      <ul class="goodsList">
        <li class="goodsList-itme1">
          <!-- <img src="../assets/images/home-01.jpg"> -->
          <img v-lazy="img1">
        </li>
        <router-link class="goodsList-itme2" :to="{path:'/details',query:{goodsId:4}}" tag="li">
           <img v-lazy="img2">
        </router-link>
      </ul>
      <v-tabbar></v-tabbar>
      <router-view></router-view>
  </div>
</template>
<script>
  import vTabbar from '../components/common/Tabbar';
  import vScroll from '../components/common/scroll';

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
    overflow: auto;
    z-index: 50
  }
  .goodsList{
    padding-bottom:0.5rem;
  }
  .goodsList-itme1 {
    width: 3.75rem;
    height: 2.64rem;
  }

  .goodsList-itme1 img {
    display: block;
    width: 3.75rem;
    height: 2.64rem;
  }
  .goodsList-itme2 {
 /*   width: 3.75rem;
    height: 3.75rem;*/
  }

  .goodsList-itme2 img {
    display: block;
    width: 3.75rem;
    height: 3.75rem;
  }

  .scroll-style {
    height: 100%;
    /*width: 100%;*/
    /*height: 6.2rem;*/
    overflow: hidden;
  }
</style>
