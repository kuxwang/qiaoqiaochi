<template>
  <div>
    <slot>
      <div class="share-page" v-if="loadingStatus==1">
        <div class="iconfont">
          &#xe60f;
        </div>
        <p>您还没有相关订单</p>
        <p>赶快去购物吧</p>
        <router-link tag="button" to="/">再逛逛</router-link>
      </div>
      <div v-if="loadingStatus==0" class="loading">
      </div>
    </slot>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loadingStatus: 0
      }
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
    padding: .9rem 1rem;
    color: #999;
    background: #ececec;
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

  .loading {
    width: 1rem;
    height: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.5rem;
    /*url('../assets/images/Spinner.gif')*/
    /*background: url('../../assets/images/loading.gif') no-repeat center center;*/
    background: url('../../../assets/images/Magnify.gif') no-repeat center center;
    background-size: 100% 100%;
  }
</style>
