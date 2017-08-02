<template>
  <div class="main">
    <mt-header fixed title="二维码">
      <!--<router-link to="/vipCenter" slot="left">-->
      <!--<mt-button icon="back" ></mt-button>-->
      <!--</router-link>-->
    </mt-header>
    <div class="container">
      <div class="imgbox" @click="clickhavib()">
        <img :src="qrimg"/>
        <!-- <img v-lazy="qrimg"> -->
      </div>
    </div>
    <v-tabbar></v-tabbar>
  </div>
</template>
<script>
  import vTabbar from '../components/common/Tabbar';
  import {Qrimg, QrimgSave} from '../api/api';
  export default{
    data(){
      return {
        qrimg: '123'
      }
    },
    components: {
      vTabbar
    },
    methods: {
      clickhavib () { 
        let _this=this;
        QrimgSave(_this.qrimg, (res) => {
          if (res.statusCode == 1) {
            console.log('ok')
          }
        })
      }
    },
    created () {
      let _this=this;
      Qrimg({}, res => {
        console.log(1)
        if (res.statusCode == 1) {
          _this.qrimg = res.data
        }
      })
    }
  }
</script>

<style scoped>
  .imgbox {
    width: 100%;
    height: 5.96rem;
    left: 0;
    top: 0;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .imgbox img {
    display: block;
    width: 100%;
    height: 5.96rem;
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
    margin-top: .45rem;
    width: 100%;
    /*height: 6.6rem;*/
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
