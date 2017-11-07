<template>
  <div class="main">
    <div class="container">
      <mt-header :title="listtitle" fixed class="header">
        <a slot="left" title="商品列表" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>

      <div class="goodslists-top-nav" id="goodslists-top-nav">
        <div @click="ordersort('zh')" :class="{'title-color': ctype== 'zh'}">
          综合
          <div class="arrow-up" v-if="zmode==1"></div>
          <div class="arrow-down" v-if="zmode==2"></div>
        </div>
        <div @click="ordersort('xl')" :class="{'title-color': ctype== 'xl'}">
          销量
          <div class="arrow-up" v-if="xmode==1"></div>
          <div class="arrow-down" v-if="xmode==2"></div>
        </div>
        <div @click="ordersort('zx')" :class="{'title-color': ctype== 'zx'}">
          最新
          <div class="arrow-up" v-if="zxmode == 1"></div>
          <div class="arrow-down" v-if="zxmode == 2"></div>
        </div>
        <div @click="ordersort('jg')" :class="{'title-color': ctype== 'jg'}">
          价格
          <div class="arrow-up" v-if="jmode==1"></div>
          <div class="arrow-down" v-if="jmode==2"></div>
        </div>
      </div>
      <ul v-show="goodlist.length" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded"
          infinite-scroll-distance="60">
        <!--<li class="list-cell" v-for="i in goodlist">-->
        <router-link class="list-cell" :to="{name:'detail',query:{id:i.id}}" tag="li" v-for="(i ,k) in goodlist" :key="k">
          <div class="logo">
            <img :src="i.thumb"/>
          </div>
          <div class="info">
            <div class="title">{{i.title}}</div>
            <span class="new price">{{i.marketprice}}元</span>
            <span class="old price">{{i.productprice}}元</span>
            <span class="total">库存{{i.total}}</span>
            <span class="sale">销量{{i.sales}}</span>
          </div>
          <div class="nototal iconfont" v-if="i.total==0">
            &#xe665;
          </div>
        </router-link>
        <!--</li>-->
      </ul>
      <div class="tips" v-show="!goodlist.length">
        <div class="iconfont">&#xe618;</div>
        <div>暂无商品</div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {ProductDetail, Categorys, Attributes} from '../../api/api'
  import {Toast, Indicator} from 'mint-ui';
  export default {
    data(){
      return {
        listtitle: '',
        goodlist: [],
        allLoaded: true,
        myCurNo: 1,
        find: '',
        zmode: 0,
        xmode: 0,
        zxmode: 0,
        jmode: 0,
        sortby: '',
        ctype: 'zh',
        typeshow: 0,
        psizes: 6
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      init(){

      },
      attribte(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let _this = this;
        let params = {
          data: {
            attributes: _this.$route.query.attr,
            page: 1,
            psize: _this.psizes,
          }
        }
        Attributes(params, (res) => {
          Indicator.close()
          if (res.statusCode === 1) {
            if (res.data) {
              this.goodlist = res.data
              console.log('类型为' + _this.$route.query.attr)
            }
          } else {
            console.log('请求失败`${res.statusCode} , ${res.data}` ')
          }
        });
      },
      loadMore(){
        this.myCurNo = this.myCurNo + 1;
        let _this = this;
        if (this.$route.query.pid || this.$route.query.cid) {
          let params = {
            data: {
              pcate: _this.$route.query.pid,
              ccate: _this.$route.query.cid,
              page: _this.myCurNo,
              psize: _this.psizes,
              fields: '',
              sorttype: _this.sortby
            }
          }
          Categorys(params, (res) => {
            if (res.statusCode === 1) {
              if (res.data.length > 0) {
                this.goodlist = this.goodlist.concat(res.data);
                if (res.data.length < _this.psizes) {
                  _this.allLoaded = true;
                }
              } else {
                _this.allLoaded = true;
              }
            } else {
              _this.allLoaded = true;
              console.log('请求失败`${res.statusCode} , ${res.data}` ')
            }
          });
        }
        else if (this.$route.query.attr) {
          let params = {
            data: {
              attributes: _this.$route.query.attr,
              page: _this.myCurNo,
              psize: _this.psizes,
              sorttype: _this.sortby
            }
          }
          Attributes(params, (res) => {
            Indicator.close();
            if (res.statusCode === 1) {
              this.goodlist = this.goodlist.concat(res.data);
              if (res.data.length < _this.psizes) {
                _this.allLoaded = true;
              }
            } else {
              _this.allLoaded = true;
              console.log('请求失败`${res.statusCode} , ${res.data}` ')
            }
          });
        }
      },
      searchlist(){
        let params = {
          data: {
            keywords: this.find,
            cid: this.$route.query.cid
          }
        }
        ProductDetail(params, (res) => {
          if (res.statusCode == 1) {
//            console.log(res.data)
            this.goodslist = res.data
          } else {
            console.log('请求失败`${res.statusCode} , ${res.data}` ')
          }
        });
      },
      getAttrsort(ordersort){
        let _this = this;
        let params = {
          data: {
            attributes: _this.$route.query.attr,
            page: _this.myCurNo,
            psize: _this.psizes,
            sorttype: ordersort

          }
        }
        Attributes(params, (res) => {
          _this.goodlist = [];
          this.listtitle = this.$route.query.title;
          if (res.statusCode === 1) {
            this.allLoaded = false;
            this.goodlist = this.goodlist.concat(res.data);
            if (res.data.length < _this.psizes) {
              _this.allLoaded = true;
            }
          } else {
            _this.allLoaded = true;
            console.log('请求失败`${res.statusCode} , ${res.data}` ')
          }
        });
      },

      getlist (ordersort) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let params = {
          data: {
            pcate: this.$route.query.pid,
            ccate: this.$route.query.cid,
            page: 1,
            psize: this.psizes,
            fields: '',
            sorttype: ordersort
          }
        }
        Categorys(params, (res) => {
          Indicator.close();
          this.goodlist = [];
          if (res.statusCode === 1) {
            this.listtitle = this.$route.query.title;
            if (res.data.length > 0) {
              this.allLoaded = false;
              this.goodlist = res.data;
              if (res.data.length < this.psizes) {
                this.allLoaded = true;

              }
            } else {
              this.allLoaded = true;
            }
          } else {
            this.allLoaded = true;
            console.log('请求失败`${res.statusCode} , ${res.data}` ')
          }
        });
      },
      ordersort(mode){
        let _this = this;
        switch (mode) {
          case 'zh': {
            _this.allLoaded = false;
            _this.sortby = '';
            _this.ctype = 'zh'
            _this.jmode = 0
            _this.myCurNo = 1
            if (_this.$route.query.pid || _this.$route.query.cid) {
              _this.getlist(_this.sortby)
            } else if (_this.$route.query.attr) {
              _this.getAttrsort(_this.sortby)
            }
            break;
          }
          case 'xl': {
            _this.allLoaded = false;
            _this.sortby = 'sales';
            _this.ctype = 'xl'
            _this.jmode = 0
            _this.myCurNo = 1;
            if (_this.$route.query.pid || _this.$route.query.cid) {
              _this.getlist(_this.sortby)
            } else if (_this.$route.query.attr) {
              _this.getAttrsort(_this.sortby)
            }

            break;
          }
          case 'zx': {
            _this.allLoaded = false;
            _this.sortby = 'new';
            _this.ctype = 'zx'
            _this.jmode = 0
            _this.myCurNo = 1
            if (_this.$route.query.pid || _this.$route.query.cid) {
              _this.getlist(_this.sortby)
            } else if (_this.$route.query.attr) {
              _this.getAttrsort(_this.sortby)
            }
            break;
          }
          case 'jg': {
//            _this.sortby = 'productprice';
            _this.ctype = 'jg';
            _this.allLoaded = false;
            if (_this.jmode === 1) {
              _this.jmode = 2;
              _this.zmode = 0;
              _this.xmode = 0;
              _this.sortby = 'price_desc';
              _this.myCurNo = 1
//              _this.getlist('price_desc')
              if (_this.$route.query.pid || _this.$route.query.cid) {
                _this.getlist(_this.sortby)
              } else if (_this.$route.query.attr) {
                _this.getAttrsort(_this.sortby)
              }
            } else if (_this.jmode === 2) {
              _this.jmode = 1;
              _this.zmode = 0;
              _this.xmode = 0;
              _this.sortby = 'price_asc';
              _this.myCurNo = 1
//              _this.getlist('price_asc')
              if (_this.$route.query.pid || _this.$route.query.cid) {
                _this.getlist(_this.sortby)
              } else if (_this.$route.query.attr) {
                _this.getAttrsort(_this.sortby)
              }

            } else if (_this.jmode === 0) {
              _this.jmode = 2;
              _this.zmode = 0;
              _this.xmode = 0;
              _this.sortby = 'price_desc';
              _this.myCurNo = 1;
//              _this.getlist('price_desc')
              if (_this.$route.query.pid || _this.$route.query.cid) {
                _this.getlist(_this.sortby)
              } else if (_this.$route.query.attr) {
                _this.getAttrsort(_this.sortby)
              }
            }
            break;
          }
        }
      }
    },

    created(){
      this.goodlist = []
//      console.log(this.$route.query.pid)
//      console.log(this.$route.query.cid)
      if (this.$route.query.pid || this.$route.query.cid) {
        this.getlist('')
      } else if (this.$route.query.attr) {
        this.attribte()
      }
      this.listtitle = this.$route.query.title

    },
  }
</script>

<style scoped>
  @import '../../assets/css/reset/reset.css';

  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: auto;
    z-index: 2;
  }

  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    /*overflow: auto;*/
    overflow: hidden;
    z-index: 2;

  }

  .tips {
    height: 100%;
    margin-top: .85rem;
    width: 100%;
  }

  .tips .iconfont {
    /*  width: 1rem;
      height: 1rem;*/
    font-size: 1rem;
    position: relative;
    top: 1rem;
  }

  .tips > div {
    position: relative;
    top: 1rem;
  }

  .list {
    font-size: .14rem;
    /*height: 6.5rem;*/
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    /*position: relative;*/
    /*top: .4rem;*/
    /*margin-top: .4rem;*/
    padding-bottom: 1rem;
    margin-top: .85rem;
  }

  .listtype {

    /*height: 5.8rem;*/
  }

  .list-cell {
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    height: 1.11rem;
    background-color: #f8f8f8;
    -webkit-box-shadow: 0 0 2px rgba(74, 74, 74, .2);
    -moz-box-shadow: 0 0 2px rgba(74, 74, 74, .2);
    box-shadow: 0 0 2px rgba(74, 74, 74, .2);
    position: relative;
  }
  .list-cell .nototal {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    /*background-color: red;*/
    font-size: .8rem;
    line-height: 1.1rem;
    color: #8a8a8a;
  }

  .list-cell .logo {
    width: 1.11rem;
    display: flex;
  }

  .logo img {
    width: 100%;
    height: 100%;
    margin: auto;
  }

  .list-cell .info {

    text-align: left;
    margin-left: .05rem;
    padding: .1rem;
    position: relative;
    flex: 1;

  }

  .info > .title {
    /*font-size: .16rem;*/
    font-size: .13rem;
    line-height: 1.3;
    text-overflow: ellipsis;
    max-height: .32rem;
    overflow: hidden;
    color: #2b2b2b;

  }

  .info > .price {
    position: absolute;
    bottom: .33rem;

  }

  .info > .old {
    color: #bfbfbf;
    text-decoration: line-through;
    left: 1rem;
    font-size: .12rem;
  }

  .info > .new {
    color: #ed362c;
    font-size: .18rem;

  }

  .info > .total, .info > .sale {
    position: absolute;
    bottom: .1rem;
    font-size: .12rem;
  }

  .info > .total {
    right: .2rem;
  }

  .search {
    font-size: .14rem;
    height: .5rem;
    display: flex;
    /*margin: .2rem 2%;*/
    width: 100%;
    z-index: 2;
    background-color: #eee;
    /*top: 1.35rem;*/
    padding: 0 2%;

  }

  .search input {
    border: none;
    display: block;
    height: .3rem;
    flex: 1;
    padding: 0 0.2rem;
    background: #fff;
    margin: .1rem 0;
  }

  .search div {
    background-color: #EC5151;
    display: block;
    height: .3rem;
    flex: .3;
    color: #fff;
    line-height: .3rem;
    margin: .1rem 0;
  }

  .goodslists-top-nav {
    font-size: .14rem;
    position: fixed;
    width: 100%;
    height: .4rem;
    left: 0;
    top: .44rem;
    line-height: .40rem;
    background: #fff;
    display: flex;
    z-index: 3;
  }

  .goodslists-top-nav > div {
    position: relative;
    display: inline-block;
    width: 32%;
    text-align: center;
    color: rgba(0, 0, 0, .3);
    flex: 1;

  }

  .arrow-up {
    position: absolute;
    left: .65rem;
    top: .13rem;
    width: 0;
    height: 0;
    border-left: .04rem solid transparent;
    border-right: .04rem solid transparent;
    border-bottom: .04rem solid #ff6500;
  }

  .arrow-down {
    position: absolute;
    left: .65rem;
    top: .19rem;
    width: 0;
    height: 0;
    border-left: .04rem solid transparent;
    border-right: .04rem solid transparent;
    border-top: .04rem solid #ff6500;
  }

  .title-color {
    color: #ff6500 !important;
  }

  .total, .sale {
    color: #999;
  }

  .info > .old {
    color: #999;
  }

</style>
