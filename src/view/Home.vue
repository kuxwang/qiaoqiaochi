<template>
  <div class="content">
    <div class="top-logo">
      <!--<img src= "" alt= "">-->
      优源生物
    </div>
    <div class="top-bar">
      <div class="logo" v-if="!isSearch"><img :src="avatar"/></div>
      <v-search ref="search" @changetype="toggle()"></v-search>
      <div class="share" v-if="!isSearch">
        <span class="iconfont">&#xe71d;</span>
      </div>
    </div>
    <!--<ul class="top-nav">-->
      <!--<li v-for="(v , i) in navlist" :class="{'selected' : selected == i}" >{{v}}</li>-->
    <!--</ul>-->
    <div class="scroll-view">
      <mt-swipe class="banner" :auto="4000" :show-indicators="false">
        <mt-swipe-item v-for="(i, x) in slider" :key="x">
          <img class="silder" :src="i.thumb">
        </mt-swipe-item>
      </mt-swipe>
      <v-colrow></v-colrow>
      <v-colcol></v-colcol>
      <div class="bottom-img">
        <img class="bottom-pic" :src="logo2"/>
      </div>
    </div>
    <v-tabbar></v-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import vTabbar from '../components/mode/Tabbar';
  import vSearch from '../components/mode/search';
  import vColrow from '../components/common/columnRow';
  import vColcol from '../components/common/columnCol';
  import defalutAvatar from '../assets/images/defaultAvatar.png'
  import {fn} from '../config/myUtils';
  import { Advs, memberInfo } from '../api/api';
  import {mapMutations, mapGetters, mapState} from 'vuex'

  export default{
    data () {
      return {
        img1: require('../assets/images/confirmorder-01.jpg'),
        logo: require('../assets/images/logo.png'),
        logo2: require('../assets/images/bottom.png'),
        slider:[],
        selected: 1,
        isSearch:false,
        avatar: defalutAvatar

      }
    },
    methods: {
      getAdv(){
        let params = {
          data: {}
        };
        Advs(params, (res) => {
          if (res.statusCode === 1) {
            this.slider = res.data;
            console.log(this.slider)
          }
        })
      },
      toggle(){

        this.isSearch=!this.isSearch;
      },
      getUserInfo () {
          memberInfo({data: {}}, res => {
              if(res.statusCode == 1){
                this.avatar = res.data.avatar
              }else{
                console.log(用户接口请求错误)
              }
          })
      }
    },
    mounted () {
      this.getAdv();
      this.getUserInfo();
      console.log(this.$refs.search.isfocus)
    },
    components: {
      vTabbar,
      vSearch,
      vColrow,
      vColcol
    },
    computed: {
      ...mapGetters([
        'haslogo'
      ]),
    }





  }
</script>
<style lang="less" scoped>
  @import '../assets/css/reset/reset.css';
  @import '../assets/css/reset/common.less';
  @import '../assets/css/fonts/iconfont.css';

  .content {
    .page-view();
    .top-logo {
      height: .45rem;
      background: #000000;
      color: #fff;
      font-size: .20rem;
      font-weight: bold;
      line-height: .45rem;
    }
  }

  .top-bar {
    display: flex;
    height: .45rem;
    background-color: #fff;

    .logo {
      /*width: .65rem;
      font-size: .21rem;
      color: #000000;
      !*padding: .05rem;*!
      padding: .1rem*/;

      width: .4rem;
      font-size: .21rem;
      color: #000000;
      padding: .1rem 0.05rem .1rem .1rem;

      img {
        /*width: 100%;*/
        /*height: 100%;*/
        width:.3rem;
        height:.3rem;
        border-radius: .15rem;
      }
    }
    .share {
      position: relative;
      /*width: .51rem;*/
      width: .45rem;
      .iconfont {
        position: absolute;
        z-index: 1;
        font-size: .22rem;
        top: .1rem;
        left: .05rem;
        width: .4rem;
      }
    }
    .main {
      flex: 1;
      text-align: center;
      margin-right: -0.1rem;
    }
  }
  .top-nav {
    background-color: #fff;
    width: 100%;
    height: .45rem;
    display: flex;
    padding: 0 .1rem;
    justify-content: center;
    z-index: 2;
    li {
      display: block;
      color: #999999;
      font-size: .15rem;
      line-height: .45rem;
      flex: 1;
    }
    li.selected{
      border-bottom:1px solid #6C6C6C;
    }
  }
  .scroll-view {
    position: relative;
    top: 0;
    .scroll-view(100%);
    width: 100%;
    padding-bottom: .95rem;
    z-index: -1;
  }

  .banner {
    width: 100%;
    height: 2.25rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .goods {
    text-align: left;
    padding: 0 .16rem;
    .goods__title {
      font-size: .17rem;
      color: #000000;
      text-align: center;
      width: 100%;
      height: .45rem;
      line-height: .45rem;
    }
    .goods__item {
      margin-bottom: .12rem;
      .goods__pic {
        width: 100%;
        height: 3.4rem;
        img {
          width: 100%;
          /*height: 3.4rem;*/
          height: 100%;
        }
      }

      h3 {
        font-size: .16rem;
        font-weight: 800;
        color: #333333;
        line-height: .24rem;
        margin-top: .13rem;
      }
      p {
        font-size: .14rem;
        .text-overflow(2);
        margin-bottom: .12rem;
      }
      .buy {
        display: flex;
        font-size: .14rem;
        justify-content: space-around;

        span {
          text-align: left;
          flex: 1;
          font-size: .12rem;
          color: #e75058;
        }
        div {
          text-align: right;
          border: 1px solid #666;

        }
      }
    }
  }
  .bottom-img {
    width: 100%;
    padding: 0 .16rem;
    height: .5781rem;
  }
  .bottom-pic {
    width: 100%;
    height: 100%;
    position: relative;
    top: -0.5rem;
  }




</style>
