<template>
  <div class="main">
    <div class="container">
      <!--<div class="title">-->
      <!--<img src="../assets/images/shoppingCart-01.jpg"/>-->
      <!--<p>hehhwieh</p>-->
      <!--</div>-->
      <div class="imgbox" @click="clickhavib">
        <img :src="qrimg"/>
      </div>
      <!--<button>重新生成二维码</button>-->
      <!--<img class="backg" src="http://duoyunjiav2.wshoto.com/addons/ewei_shop/data/poster/2/4b2e32fbbfb48ba3e8ce299a308351b2.jpg?rand=1891"/>-->
      <!--<img class="backg" :src="qrimg"/>-->

    </div>
    <v-tabbar></v-tabbar>
  </div>
</template>
<script>
  import vTabbar from '../components/common/Tabbar';
  import {Qrimg} from '../api/api';
  export default{
    data(){
      return {
        qrimg: ''
      }
    },
    components: {
      vTabbar
    },
    method: {
      clickhavib () {

      }
    },
    created () {
      Qrimg({}, res => {
        if (res.statusCode == 1) {
          this.qrimg = res.data.current_qrimg
        }
      })
    }
  }
</script>

<style scoped>
  .imgbox {
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 auto;
    position: relative;
    top: 2rem;
  }

  .imgbox img {
    width: 100%;
  }

  button {
    display: block;
    width: 1rem;
    height: 0.35rem;
    margin: 0 auto;
    position: relative;
    top: 2.5rem;
    outline: none;
  }

  .container {
    width: 100%;
    height: 6.6rem;
  }

  .title {
    display: flex;
    height: 0.8rem;
    width: 76%;

    position: absolute;
    margin-left: 12%;
    top: 15%;

  }

  .logo {
    flex: 1;
  }

  .title img {
    display: block;
    flex: 1;
    width: 0.6rem;
  }

  .title p {
    flex: 3;
    font-size: 0.24rem;
    padding: 0.1rem;
    text-align: left;
  }

  .backg {
    width: 100%;
  }
</style>
