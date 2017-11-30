<template>
  <div id="app">
    <router-view></router-view>
    <v-tabbar v-show="tabbarIsSHow"></v-tabbar>
  </div>
</template>
<script>
import vTabbar from './components/mode/Tabbar';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'app',
  methods: {
    ...mapMutations({
      setTabbarIsShow: 'SET_TABBARISSHOW'
    })
  },
  computed: {
    ...mapGetters([
      'tabbarIsSHow'
    ])
  },
  watch: {
    $route(to, from) {
      if (to.name == 'home' || to.name == 'userCenter' || to.name == 'qrCode') {
        this.setTabbarIsShow(true);
      } else {
        this.setTabbarIsShow(false);
      }
    }
  },
  components: {
    vTabbar
  },
}
</script>
<style lang="less" scoped>
  @import './assets/less/common.less';
  @import './assets/fonts/iconfont.css';
  @import './assets/less/reset.less';
  /*@import './assets/less/index.less';*/
#app {
  height: 100%;
}
.mint-header {
  background-color: #fff !important;
  color: #252525 !important;
  display: flex !important;
}


.mint-loadmore-top {
  font-size: .14rem;
}
  .mint-header-button.is-left {
    float: left;
  }
  .mint-header-title{
    color: #252525;
  }


  .is-left {
    float: left;
  }
  .is-right {
    float: right;
  }
</style>

