<template>
  <li class="void">
    <slot>
      暂无数据
    </slot>
  </li>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: [],
    methods: {
      getFocus () {
      }
    },
    computed: {},
    created(){
    },
  }
</script>
<style scoped>
  .void{
    position: relative;
    top: .35rem;
    padding:0 .1rem;
    font-size: .14rem;
    background-color: #fff;
  }
</style>
