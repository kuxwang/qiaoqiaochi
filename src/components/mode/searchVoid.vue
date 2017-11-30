<template>
  <!--<li class="void">-->
  <div>
    <slot>
      <div class="tip">
      <span class="iconfont">&#xe601;</span>
      <span class="title">暂无商品</span>
      </div>
    </slot>
  </div>
  <!--</li>-->
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: [],
    methods: {

    },
    computed: {},
    created(){
    },
  }
</script>
<style lang="less" scoped>
  @import '../../assets/less/reset.less';
  @import '../../assets/less/index.less';
  @import '../../assets/fonts/iconfont.css';



  .void{
    position: relative;
    top: .35rem;
    padding:0 .1rem;
    font-size: .14rem;
    background-color: #fff;
  }
  .tip {
    position: relative;
    top:1rem;
  }


  span {
    display: block;
  }
  .iconfont {
    font-size: 1rem;
  }
  .title {
    font-size: .2rem;

  }




</style>
