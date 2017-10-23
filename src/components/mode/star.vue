<template>
  <div class="eval_star">
    <div class="star" v-for="(i,index) in item" @click="setLevel(index)">
      <img :src="star" v-if="level>=index">
      <img :src="starnull" v-else>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        item: 5,
        star: require('../../assets/images/star.png'),
        starnull: require('../../assets/images/starnull.png'),
        level:5,
      }
    },
    prop:{

    },
    methods:{
      setLevel(index){
        this.level=index;
      }
    },
    created(){

    }

  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';
  @size:1;
  .eval_star {
    display: flex;
    width: 100%;
    height: @size*.18rem;
    .star {
      width: @size*.18rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }









</style>
