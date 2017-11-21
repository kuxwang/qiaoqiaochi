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
<style>
#app {
  height: 100%;
}
</style>

