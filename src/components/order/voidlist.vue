<template>
  <div>
    <slot>
      <div class="share-page">
        <div class="iconfont">
          &#xe60f;
        </div>
        <p>您还没有相关订单</p>
        <p>赶快去购物吧</p>
        <router-link tag="button" to="/">再逛逛</router-link>
      </div>
    </slot>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: [],
    methods: {},
    computed: {},
    created(){

    }
  }
</script>
<style scoped>
  .share-page {
    margin-top: .4rem;
    padding: .5rem 1rem;
    color: #999;

  }

  .share-page > div.iconfont {
    font-size: .7rem;
  }

  .share-page > p {
    font-size: .14rem;
  }

  .share-page > button {
    width: .7rem;
    height: .35rem;
    border-radius: .03rem;
    margin-top: .15rem;
    background: #ff4f4f;
    outline: none;
    color: #ddd;
  }
</style>
