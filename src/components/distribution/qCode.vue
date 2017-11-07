<!--<template>
  <div class="main">
    <mt-header title="二维码" fixed>
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    <div class="container">
        <div class="pic">
          <img :src=""/>
        </div>
      <div class="tip">

      </div>
    </div>



  </div>
</template>
<script>
  export default {
    data(){
      return {
        pic:''
      }
    },
    methods:{
      init(){

      }
    }





  }
</script>
<style scoped lang="less">
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  .main {
    .page-view(3);
    .container {
      .scroll-view(100%)
    }
  }

</style>-->
<template>
  <div class="main">
    <mt-header title="二维码" fixed>
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    <div class="container">
      <div class="imgbox" @click="clickhavib()" v-if="type == 0">
        <img :src="qrimg"/>
      </div>
      <div class="tip" v-if="type == 1">
        <span class="iconfont">&#xe609;</span>
        您还不是分销商
      </div>
      <div class="tip" v-if="type == 2">
        <span class="iconfont">&#xe609;</span>
        网络异常
      </div>
    </div>
    <!--</mt-loadmore>-->
  </div>
</template>
<script>
  import {Qrimg, QrimgSave} from '../../api/api';
  import {Toast,Indicator} from 'mint-ui'
  export default{
    data(){
      return {
        qrimg: '',
        topStatus: '',
        disindex: 3,
        type:''
      }
    },
    methods: {
      loadTop () {
        this.init()
      },
      handleTopChange(status) {
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
        Qrimg({data :{}}, res => {
          Indicator.close()

//          console.log(1)
          if (res.statusCode == 1) {
            _this.qrimg = res.data
            _this.type=0
          } else if (res.statusCode == -2) {
            _this.type = 1
          } else {
            _this.type == 2
            Toast({
              message: res.data,
              position: 'middle',
              duration: 2000
            });
          }
        })
      }
    },
    activated () {
      this.init();
    },
    created () {
      this.init();
      /*Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.init();*/
    },

  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';

  * {
    font-size: .16rem;
  }
  .main {
    .page-view(3);
    .container{
      .scroll-view(100%);
      margin-top: .45rem;
    }

  }
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
/*

  button {
    display: block;
    width: 1rem;
    height: 0.35rem;
    margin: 0 auto;
    position: relative;
    top: 2.5rem;
    outline: none;
  }
*/


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
    /*background: url('../assets/images/Spinner.gif') no-repeat 100% 100%;*/
    background-size: 100% 100%;
  }
</style>
