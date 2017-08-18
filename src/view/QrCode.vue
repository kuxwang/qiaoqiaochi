<template>
  <div class="main">
    <!--<mt-header fixed title="二维码" class="header">-->
    <!--</mt-header>-->
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :maxDistance="60"
                 :distanceIndex="disindex"
                 :top-distance="30" ref="loadmore">
      <div slot="top" class="mint-loadmore-top">
          <span class="iconfont" v-show="topStatus !== 'loading'"
                :class="{ 'rotate': topStatus === 'drop' }">&#xe732;下拉刷新</span>
        <span class="loading" v-show="topStatus === 'loading'">加载中</span>
      </div>

      <div class="container">
        <div class="imgbox" @click="clickhavib()" v-if="qrimg">
          <img :src="qrimg"/>
        </div>
        <div class="tip" v-else>
          <span class="iconfont">&#xe609;</span>
          您还不是分销商
        </div>
      </div>
    </mt-loadmore>
    <v-tabbar></v-tabbar>
  </div>
</template>
<script>
  import vTabbar from '../components/common/Tabbar';
  import {Qrimg, QrimgSave} from '../api/api';
  import {Toast} from 'mint-ui'
  export default{
    data(){
      return {
        qrimg: '',
        topStatus: '',
        disindex: 2,
      }
    },
    components: {
      vTabbar
    },
    methods: {
      loadTop () {
        this.init()

      },
      handleTopChange(status) {
//          console.log(status)
        this.topStatus = status;
      },
      clickhavib () {
        let _this = this;
        QrimgSave(_this.qrimg, (res) => {
          if (res.statusCode == 1) {
            console.log('ok')
          }
        })
      },
      init(){
        let _this = this;
        Qrimg({}, res => {
//            this.topStatus = '0'
//          console.log(1)
          _this.$refs.loadmore.onTopLoaded();
          if (res.statusCode === 1) {
            _this.qrimg = res.data
          } else if (res.statusCode == -2) {
            _this.qrimg = ''
          } else {
            Toast({
              message: '网络异常，请重试',
              position: 'middle',
              duration: 2000
            });
          }
        })

      }
    },
    watch: {
      topStatus (newValue) {
        console.log(newValue)
      }
    },
    activated () {
//      this.init();
    },
    created () {
      this.init();
    },

  }
</script>

<style scoped>
  @import '../assets/css/fonts/iconfont.css';
  @import '../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
  }

  .main {
    position: absolute;
    top: 0;
    overflow-y: scroll
    width: 100%;
  }

  .imgbox {
    width: 100%;
    /*height: 5.96rem;*/
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
    /*margin-top: .45rem;*/
    position: relative;
    top: 0;
    /*left:0;*/
    width: 100%;
    height: 10rem;
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

  .tip {
    font-size: .2rem;
    position: relative;
    top: 2rem;
  }

  .tip .iconfont {
    display: block;
    font-size: 1rem;
  }

  .mint-loadmore-top {
    background: rgba(255, 255, 255, .7);
  }

  .loading {
    position: relative;
  }

  .loading:before {
    content: '';
    position: absolute;
    left: -0.35rem;
    top: -.08rem;
    width: .4rem;
    height: .4rem;
    display: block;
    background: url('../assets/images/Spinner.gif') no-repeat 100% 100%;
    background-size: 100% 100%;
  }
</style>
