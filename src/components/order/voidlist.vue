<template>
  <slot>
    <div class="share-page" >
      <div class="iconfont">
        &#xe60f;
      </div>
      <p>您还没有相关订单</p>
      <p>赶快去购物吧</p>
      <router-link tag="button" to="/">再逛逛</router-link>
    </div>
  </slot>
</template>
<script>
  export default {
    data(){
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

</style>
