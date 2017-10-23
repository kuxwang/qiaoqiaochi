<!--
<template>
  <div class="content">
    <div class="top-logo">
      &lt;!&ndash;<img src= "" alt= "">&ndash;&gt;
      优源生物
    </div>
    <div class="top-bar">
      <div class="logo" v-if="!isSearch"><img :src="avatar"/></div>
      &lt;!&ndash;<v-search ref="search" @changetype="toggle()"></v-search>&ndash;&gt;
      &lt;!&ndash;<input type="text" @click="goSearch()" placeholder="全球优质供应商直供" />&ndash;&gt;
      <div class="input" @click="goSearch()">
        <span class="iconfont">&#xe651;</span>
        全球优质供应商直供
      </div>

      <div class="share" v-if="!isSearch" @click="share">
        <span class="iconfont">&#xe71d;</span>
      </div>
    </div>
    &lt;!&ndash;<ul class="top-nav">&ndash;&gt;
      &lt;!&ndash;<li v-for="(v , i) in navlist" :class="{'selected' : selected == i}" >{{v}}</li>&ndash;&gt;
    &lt;!&ndash;</ul>&ndash;&gt;
    <div class="scroll-view">
      <mt-swipe class="banner" :auto="4000" :show-indicators="false">
        <mt-swipe-item v-for="(i, x) in slider" :key="x">
          <img class="silder" :src="i.thumb">
        </mt-swipe-item>
      </mt-swipe>
      <v-colrow :list="hot" v-if="hashot"></v-colrow>
      <v-colcol :list="newgoods" v-if="hasnew"></v-colcol>
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
  import { Advs, memberInfo,Attributes,Share } from '../api/api';
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
        avatar: defalutAvatar,
        newgoods:[],
        hot:[],
        hashot:true,
        hasnew:true
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
      getUserInfo () {
          memberInfo({data: {}}, res => {
              if(res.statusCode == 1){
                this.avatar = res.data.avatar
              }else{
//                console.log(用户接口请求错误)
              }
          })
      },
      getNew(){
        let parmas = {
          data: {
            attributes: "isnew:1",
            page: 1,
            psize: 10,
            fields:'description,title,id,productprice,marketprice,thumb'
          }
        }
        Attributes(parmas, (res) => {
          console.log('new')
          console.log(res)
          if (res.statusCode === 1) {
            this.newgoods = res.data;
            if(!res.data.length){
              this.hasnew=false
            }
          }else {
            this.hasnew=false
          }
        })
      },
      getHot(){
        let parmas = {
          data: {
            attributes: "ishot:1",
            page: 1,
            psize: 10,
          }
        }
        Attributes(parmas, (res) => {
          console.log(res);
          if (res.statusCode === 1) {
            this.hot = res.data;
            if(!res.data.length){
              this.hashot=false
            }
          }else {
            this.hashot=false
          }
        })
      },
      goSearch(){
        this.$router.push('search')
      },
      share(){
        let params = {
          data :{

          }
        }
        Share(params,res => {
          console.log(res)

        })
      },

    },
    mounted () {
      this.getAdv();
      this.getUserInfo();
      this.getNew();
      this.getHot()
//      console.log(this.$refs.search.isfocus)
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
    font-family: PingFang !important;
  }

  .top-bar {
    display: flex;
    height: .45rem;
    background-color: #fff;
    font-family: PingFang !important;

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
      left: -0.15rem;
      top: .04rem;


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

    .input {
      display: block;
      width: 100%;
      text-align: center;
      background: #e8e8e8;
      height: .29rem;
      font-size: .13rem;
      padding: 0 0.2rem;
      color: #333;
      /*margin: .08rem 0;*/
      border-radius: .1rem .1rem .1rem .1rem;
      margin: .1rem .1rem;
      line-height: .29rem;
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
-->



<template>
  <div class="content">
    <div class="top-bar">
      <div class="input" @click="goSearch()">
        <span class="iconfont">&#xe651;</span>
        全球优质供应商直供
      </div>
    </div>
    <div class="container">
      <mt-swipe class="banner" :auto="4000" :show-indicators="false">
        <mt-swipe-item v-for="(i,index) in advlist" :key="index">
          <img class="silder" :src="i.thumb">
        </mt-swipe-item>
      </mt-swipe>

      <div class="type">
        <router-link class="type-item" :to="{name:'list',query:{pid:i.id,cid:'',title:i.name}}" tag="div"
                     v-for="(i,index) in classlist" :key="index">
          <img :src="i.advimg">
          <span>{{i.name}}</span>
        </router-link>
        <router-link class="type-item" :to="{path:'class'}" tag="div" v-if="alltype">
          <div class="allImg"></div>
          <span class="iconfont">全部</span>
        </router-link>
        <!--</div>-->
      </div>
      <div class="adv">
        <img :src='shop | getdefalute'/>
      </div>
      <div class="goodtypes">
        <div class="view-title" style="margin-top: 0">
          热销产品
          <router-link class="right" :to="{name:'list',query:{attr:'ishot:1',title:'热销产品'}}" tag="div">
            查看更多
            <span class="iconfont">&#xe61b;</span>
          </router-link>
        </div>

        <div class="hot">
          <div class="hot-list">
            <router-link class="hot-item" :to="{path:'/details',query:{id:i.id}}" tag="div" v-for="(i,index) in hot" :key="index">
              <div class="pic-div">
                <img :src="i.thumb" alt="">
              </div>
              <div class="goods-price">
                <span class="goodtips">{{i.title}}</span>
                <span class="price-num">￥{{i.marketprice}}</span>
              </div>
            </router-link>
          </div>
        </div>


        <div class="view-title">
          最新产品
          <router-link class="right" :to="{name:'list',query:{attr:'isnew:1',title:'最新产品'}}" tag="div">
            查看更多
            <span class="iconfont">&#xe61b;</span>
          </router-link>
        </div>
        <div class="hot">
          <div class="hot-list">
            <router-link class="hot-item" :to="{path:'/details',query:{id:i.id}}" tag="div" v-for="(i,index) in newgoods" :key="index">
              <div class="pic-div">
                <img :src="i.thumb" alt="">
              </div>
              <div class="goods-price">
                <span class="goodtips">{{i.title}}</span>
                <span class="price-num">￥{{i.marketprice}}</span>
              </div>
            </router-link>
          </div>
        </div>

        <div class="view-title">
          推荐产品
          <router-link class="right" :to="{name:'list',query:{attr:'isrecommand:1',title:'推荐产品'}}" tag="div">
            查看更多
            <span class="iconfont">&#xe61b;</span>
          </router-link>
        </div>
        <ul class="recommend" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded"
            infinite-scroll-distance="10">
          <router-link class="re-item" :to="{path:'/details',query:{id:i.id}}" tag="li" v-for="(i,index) in recommand" :key="index">
            <div class="pic-div">
              <img :src="i.thumb" alt="" style="height: 100%">
            </div>
            <div class="goods-name">{{i.title}}</div>
            <div class="goods-price">
              <span class="price-num">￥{{i.marketprice}}</span>
              <span class="price-num old">￥{{i.marketprice}}</span>
            </div>
            <span class="goodtips">
            销量{{i.sales}}<span class="right-tip">库存{{i.total}}</span>
          </span>
          </router-link>
        </ul>
      </div>
    </div>
    <v-tabbar></v-tabbar>
    <router-view></router-view>
  </div>

</template>

<script>
  import vTabbar from '../components/mode/Tabbar';
//  import vScroll from '../components/common/scroll';
  import vSearch from '../components/mode/search';
  import {Swipe, SwipeItem, InfiniteScroll} from 'mint-ui';
  import {Advs, Category, Attributes,Adv} from '../api/api'
  import topbg from '../assets/images/avatopr-background.png'

  export default{
    data(){
      return {
        img1: require('../assets/images/home-01.jpg'),
        img2: require('../assets/images/home-02.jpg'),
        recommand: [],
        newgoods: [],
        hot: [],
        advlist: [],
        shop: '',
        find: '',
        classlist: [],
        alltype: false,
        allLoaded: true,
        myCurNo: 1,
        psizes: 4
      }
    },
    methods: {
      //获取广告
      getAdv(){
        let params = {
          data: {}
        };
        Advs(params, (res) => {
          console.log('广告')
          console.log(res)
          if (res.statusCode === 1) {
            this.advlist = res.data;
          }
          this.getType()
          this.allLoaded = false
        })
      },
      //获取分类
      getType(){
        let _this = this
        let params = {
          data: {}
        };
        Category(params, (res) => {

          this.getHot()
          if (res.statusCode === 1) {
            console.log('分类')
            console.log(res.data)
//            console.log(_this.classlist)
            let len = res.data.length
            if (len <= 8) {
              _this.classlist = res.data;
              _this.alltype = false
              console.log(res)
            } else {
              _this.classlist = res.data.slice(0, 7);
              _this.alltype = true
              console.log(_this.classlist)
            }
          }
        })
      },
      getHot(){
        let parmas = {
          data: {
            attributes: "ishot:1",
            page: 1,
            psize: 10,
          }
        }
        Attributes(parmas, (res) => {

          console.log('热销数据')
          console.log(res);
          if (res.statusCode === 1) {
            this.hot = res.data
          }
          this.getNew();
        })
      },
      getNew(){
        let parmas = {
          data: {
            attributes: "isnew:1",
            page: 1,
            psize: 10,
          }

        }
        Attributes(parmas, (res) => {

          console.log('新品数据')
          console.log(res);
          if (res.statusCode === 1) {
            this.newgoods = res.data
          }
          this.getRecom(1)
        })
      },
      getRecom(page){
        let _this = this
        let parmas = {
          data: {
            attributes: "isrecommand:1",
            page: page,
            psize: _this.psizes,
          }
        }
        Attributes(parmas, (res) => {

          if (res.statusCode === 1) {
            this.recommand = this.recommand.concat(res.data);
            if (res.data.length < _this.psizes) {
              _this.allLoaded = true;
            }
          } else {
            _this.allLoaded = true;
            console.log('请求失败`${res.statusCode} , ${res.data}` ')
          }
        })
      },
      goSearch(){
        this.$router.push('search')
      },
      searchlist(){
        let _this = this
        this.$router.push({name: `list`, query: {keywords: _this.find, cid: ''}})
      },
//      advs(){
//        let params = {
//          data: {
//            'identification': 'index'
//          }
//        };
//        Adv(params, (res) => {
//          if (res.statusCode === 1) {
//            console.log('hahah')
//            console.log(res)
//            this.shop = res.data;
//          }
//        })
//      },
      loadMore(){
        this.myCurNo = this.myCurNo + 1;
        this.getRecom(this.myCurNo)
        console.log('qwewqeqe')
//        alert('第'+this.myCurNo+'页')
      },
    },
    filters: {
      getdefalute (value) {
//          console.log(value)
        return value ? value : topbg
      }
    },
    mounted(){
      this.getAdv();
    },
    components: {
      vTabbar,
//      vScroll,
      vSearch
    },

  }
</script>
<style lang="less" scoped>
  @import '../assets/css/reset/reset.css';
  @import '../assets/css/reset/common.less';
  @import '../assets/css/fonts/iconfont.css';

  .banner {
    /*margin-top: .45rem;*/
  }

  .content {
    .page-view();
    .top-bar {
      background-color: #fff;
      height: .45rem;
    }
    .input {
      display: block;
      width: 100%;
      text-align: center;
      background: #e8e8e8;
      height: .29rem;
      font-size: .13rem;
      padding: 0 0.2rem;
      color: #333;
      /*margin: .08rem 0;*/
      border-radius: .1rem .1rem .1rem .1rem;
      margin: .1rem .1rem;
      line-height: .29rem;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    /*margin-top: .45rem;*/
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: .6rem;
    background: #fff;
    /*background: #efeff4;*/
  }

  .mint-swipe {
    height: 1.5rem;
    position: static;
    top: .1rem;

  }
  .mint-swipe-item > img {
    height: 100%;
  }

  .mint-header {
    color: #252525 !important;
  }

  /*分类*/

  .type {
    box-sizing: border-box;
    line-height: 0;
    width: 100%;
    height: 1.72275rem;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    /*flex-direction: column;*/
    margin-top: .2rem;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
  }

  .type .col {
    box-sizing: border-box;
    line-height: 0;
    width: 100%;
    height: 0.796875rem;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
  }

  .type-item {
    /*flex: 1;*/
    box-sizing: border-box;
    line-height: 0;
    margin-left: 0.017625rem;
    width: 24%;
    height: 0.796875rem;
    background-color: rgb(255, 255, 255);
    position: relative;
    /*border: 1px solid #ececec;*/
    /*-webkit-box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);*/
    /*-moz-box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);*/
    /*box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);*/
  }

  .type-item > img {
    width: .45rem;
    height: .45rem;
    display: block;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: .12rem;
    box-sizing: border-box;
    line-height: 0;
    -webkit-box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);
    box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);

  }

  .type-item > span {
    display: block;
    box-sizing: border-box;
    line-height: 0.258rem;
    text-align: center;
    font-size: .12rem;
    color: rgb(102, 102, 102);
    background-color: transparent;
    /*width: .61rem;*/
    height: 0.258em;
    width: 100%;
  }

  /*广告*/
  .adv {
    width: 100%;
    height: 1.5rem;
    padding: .05rem 0 0 0;
    background: rgb(240, 235, 238)
  }

  .adv img {
    width: 100%;
    height: 100%;
  }

  /*推荐*/
  .recommend {
    display: flex;
    width: 100%;
    /*margin-top: 0.1rem;*/
    flex-wrap: wrap;
    text-align: left;
    justify-content: space-between;
    background: rgb(250, 250, 250);
  }

  .recommend .re-item {
    display: block;
    width: 49%;
    /*height: 2.31rem;*/
    padding: .03rem;
    background-color: #fff;
  }

  .re-item .pic-div {
    width: 100%;
    /*height: 1.22rem;*/
    /*height: 1.54rem;*/
    height: 1.7775rem;
  }

  .re-item .goods-name {
    display: block;
    font-size: .11rem;
    text-align: left;
    color: #373737;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: .05px;
    line-height: .17rem;
    margin-bottom: .03rem;
    font-weight: bold;
    padding: 0.1rem .1rem .05rem .1rem;
  }

  .re-item .goods-price {
    height: .23rem;
    font-size: .12rem;
    overflow: hidden;
    display: block;
    text-align: left;
    box-sizing: border-box;
    padding: 0 .1rem;
  }

  .re-item .goods-price .price-num {
    /*color: #ff5800;*/
    color: #ed362c;
    font-size: .14rem;
  }

  .re-item .goods-price .old {
    color: #999;
    text-decoration: line-through;
    font-size: .12rem;
    display: inline-block;
    margin-left: .1rem;
  }

  .goods-price .goodtips {
    width: 1.2rem;
    text-align: left;
    white-space: nowrap;
    color: #373737;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .re-item .goodtips {
    display: block;
    position: relative;
    top: .01rem;
    height: .25rem;
    line-height: .25rem;
    text-align: left;
    font-size: .1rem;
    box-sizing: border-box;
    padding: 0 .12rem;
  }

  .goodtips .right-tip {
    position: absolute;
    right: .1rem;
  }

  .view-title {
    position: relative;
    color: #ff771b;
    background-color: #fff;
    line-height: .4rem;
    text-align: left;
    box-sizing: border-box;
    padding: 0 .1rem;
    border-top: 5px solid rgb(250, 250, 250);
    font-weight: 800;
    border-top: 1px solid rgba(0, 0, 0, .1);
    padding-bottom: .1rem;
    margin-top: .05rem;
  }

  .view-title .right {
    position: absolute;
    right: .1rem;
    top: 0;
    font-size: .1rem;

  }

  /*热销*/
  .hot {
    width: 100%;
    height: 1.7rem;
    background-color: #fff;
    /*margin-top: .1rem;*/
  }

  .hot-title {
    height: .4rem;
    background-color: #fff;
    line-height: .4rem;
  }

  .hot-list {
    width: 100%;
    overflow: hidden;
    overflow-x: scroll;
    height: 1.75rem;
    white-space: nowrap;

  }

  /*  .hot-list .hot-item {
      width: .75rem;
      height: 1.15rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin-top: 0.03rem;
      display: inline-block;

    }*/
  .hot-list .hot-item {
    width: 1.3rem;
    height: 1.3rem;
    display: inline-block;
    margin-left: 0.14rem

  }

  .hot-item .pic-div {
    width: 100%;
    height: 1.3rem;

  }

  .pic-div img {
    width: 100%;
    height: 100%;
  }

  .hot-item .goods-name {
    display: block;
    font-size: .12rem;
    color: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .hot-item .goods-price {
    display: flex;
    font-size: .11rem;
    color: #c7000b;
    margin-top: 0.1rem;
    /*text-align: left;*/
    justify-content: space-between;
  }

  .mint-swipe-item > img {
    width: 100%;
    height: 100%;
  }

  .silder {
    height: 2.05rem;
    width: 100%;
  }

  .mint-swipe-item > img {
    height: 2.05rem;
    width: 100%;
  }

  .mint-swipe {
    height: 2.05rem;
  }

  .allImg {
    width: .45rem;
    height: .45rem;
    display: block;
    /*border-radius: 50%;*/
    margin: 0 auto;
    margin-top: .12rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 0;
    background: url('../assets/images/all.png') center center no-repeat;
    background-size: 70% 70%;
  }
  .goodtypes {
    background-color: #ececec;
    padding-top: .05rem;
  }







</style>














