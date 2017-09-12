<template>
  <div>
    <slot>
      <!--<div class="history white">-->
        <!--<div class="title">历史记录</div>-->
        <!--<ul>-->
          <!--<li>风扇</li>-->
          <!--<li>电动牙刷</li>-->
          <!--<li>垃圾桶</li>-->
          <!--<li>餐巾纸</li>-->
        <!--</ul>-->
      <!--</div>-->
    </slot>
  </div>
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
  .white {
    background: rgb(255, 255, 255) !important;
  }

  .grey {
    background: rgb(240, 242, 245) !important;
  }

  .search input {
    border: none;
    display: block;
    height: .3rem;
    flex: 1;
    font-size: .13rem;
    padding: 0 0.2rem;
    color: #fff;
    background: rgba(255, 255, 255, .7);
    margin: .08rem 0;
    border-radius: .1rem .1rem .1rem .1rem;
  }

  .search-list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*margin-top: .45rem;*/
    text-align: left;
    /*background: #fff;*/
    z-index: 1;
    -webkit-overflow-scrolling: touch;
  }

  .hot {
    height: .7rem;
    -webkit-box-shadow: 0 1px 0px rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 1px 0px rgba(138, 138, 138, .3);
    box-shadow: 0 1px 0px rgba(138, 138, 138, .3);
  }

  .hot > .title {
    padding: 0.1rem .1rem 0 .1rem;
    font-weight: bold;
  }

  .hot-goods {
    width: 100%;
    height: .45rem;
    overflow-y: hidden;
    overflow-x: scroll;
    /*background: #2ba245;*/
    -webkit-overflow-scrolling: touch;
  }

  .hot ul {
    white-space: nowrap;
    line-height: .45rem;

  }

  .hot ul > li {
    height: .2rem;
    display: inline-block;
    line-height: .2rem;
    border-radius: .05rem;
    margin-left: .1rem;
    padding: 0 .07rem;
    font-size: .14rem;
    color: #000;
    background: rgb(240, 242, 245);
  }

  .hot ul > li:last-child {
    margin-right: .1rem;
  }

  .history {
    margin-top: .1rem;
    /*-webkit-box-shadow: 0 1px 1px rgba(138, 138, 138, .3);*/
    /*-moz-box-shadow: 0 1px 1px rgba(138, 138, 138, .3);*/
    /*box-shadow: 0 1px 1px rgba(138, 138, 138, .3);*/
  }

  .history > .title {
    padding: 0.07rem .07rem;
    font-weight: bold;
    -webkit-box-shadow: 0 1px 0px rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 1px 0px rgba(138, 138, 138, .3);
    box-shadow: 0 1px 0px rgba(138, 138, 138, .3);
  }

  .history li {
    padding: .1rem .1rem .1rem .07rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
</style>
