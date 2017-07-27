<template>

    <div class="main">
      <mt-header title="我的订单" fixed>
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <v-tabbar></v-tabbar>
    </div>
</template>
<script>
 	import vTabbar from '../components/common/Tabbar';
	export default{
		data(){
			return{

			}
		},
		components:{
			vTabbar
		}
	}
</script>
<style scoped>
  @import '../assets/css/reset/reset.css';
  *{
    font-size:.15rem;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .mint-header {
    background: #fff;
    color: #252525;
    border-bottom: 1px solid #e3e3e3;
    font-size: 0.16rem;
    height:46px;
  }
</style>
