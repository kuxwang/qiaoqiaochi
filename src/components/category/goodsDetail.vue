<template>
  <transition name="slide">
    <div class="main">
      <mt-header title="商品详情" class="header">
        <a  slot="left" class="pro-white" @click="goBack()">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <div class="container">
        <div v-show="isShow">
          <div class="box">
            <div class="img-box">
              <mt-swipe class="banner" :auto="4000" :show-indicators="false">
                <mt-swipe-item v-for="(i, x) in bandimg" :key="x">
                  <img :src="i" class="content"/>
                </mt-swipe-item>
              </mt-swipe>
              <div class="tuwen" @click="gototuwen">
                图文详情
              </div>
            </div>
          </div>
          <div class="intro">
            <p class="vip-intro" v-show="isVip"><span class="iconfont">&#xe631;</span>您是{{vipname}} 可享{{vipcount}}折优惠
            </p>
            <div class="goodsTitle">
              <p>{{name}}</p>
              <span class="price">￥{{marketPrice}}</span>
              <span class="marketPrice">市场价&nbsp;<s>{{maxprice}}</s></span>
              <div class="memberprice">
                ￥{{minprice}}
                <span class="tip">会员券后价</span>
              </div>
            </div>
          </div>

          <div class="opitions" @click="popup()">
            <span class="title" :class="{noselect : noselected }" v-html="selectoption"></span>
            <p class="text">{{opitiontitle}}</p>
            <span class="total" v-show="!noselected">×{{num}}</span>
          </div>

          <div class="params">
            <div class="info">商品信息</div>
            <div v-for="v in goodsparams" class="params-list">
              <div class="title">【{{v.title}}】</div>
              <div class="value">{{v.value}}</div>
            </div>
          </div>

          <div class="adv">
            <div class="adv__title">
              <div class="border"></div>
              <h2>品牌承诺</h2>
              <div class="border"></div>
            </div>
            <div class="adv__list">
              <div class="adv__item" v-for="(i,k) in advpic" :key="k">
                <img :src='i.thumb'>
                <span>{{i.title}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="details">
          <div class="b-intro">
            <div class="bottom-nav" id="bottom-nav">
              <span @click="tab=0">图文详情</span>
              <span @click="tab=1">评价</span>
            </div>
            <div class="intro" v-if="tab==0" v-html="content">
            </div>
            <div class="comment" v-if="tab==1">
              <v-comment></v-comment>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-navbar">
        <div class="icon-box icon-box-fav" @click="follow()">
          <div class="icon-b">
            <div class="iconfont tabIcon" :class="{starActive: isfavorite}">&#xe613;</div>
            收藏
          </div>
        </div>
        <router-link class="icon-box icon-box-car" :to="{name:'shoppingCart'}" tag="a">
          <div class="icon-b">
            <div class="iconfont tabIcon icon-car">&#xe607;</div>
            <span class="carname">购物车</span>
            <i class="carNum" v-if="delGoodsNum>0">{{goodNums}}</i>
          </div>
        </router-link>
        <button class="icon-btn icon-btn-car ocolor" @click="handleClick">
          加入购物车
        </button>
        <button class="icon-btn icon-btn-con" @click="goPay">
          立即购买
        </button>
      </div>
      <mt-popup v-model="popupVisible" position="bottom" modal=true>
        <div class="popup-box">
          <img :src="bandimg[0]">
          <div class="popup-info">
            <p>￥{{marketPrice}}</p>
            <span>库存：{{total}}件</span>
          </div>
          <div class="type-box">
            <div class="types" v-for="(i,index) in spec">
              <span class="type-title">{{i.title}}</span>
              <div class="type">
                <!--<span class="typeitem"  :class="{'tActive':tselect[idx] == index}"  v-for="(v,index) in i"  @click="tabtype(idx,index)" >{{idx}}类型{{index}}</span>-->
                <span class="typeitem" :class="{'tActive':tselect[index]==indexs}" v-for="(v,indexs) in i.items"
                      @click="tabtype(index,indexs)">{{v.title}}</span>
              </div>
            </div>
          </div>
          <div class="cal-box">
            <div>
              <button class="reduce-down" @click="reduce(num)">-</button>
              <input class="num-box" v-model="num"/>
              <button class="add-up" @click="add">+</button>
            </div>
            <p>购买数量</p>
          </div>
          <button v-if="hasselect" class="confirm ocolor" @click="toast">确认</button>
          <div v-else class="confirm1">
            <div class="ocolor" @click="handleClick1">加入购物车</div>
            <div @click="goPay1">立即购买</div>
          </div>
        </div>
      </mt-popup>
    </div>
  </transition>
</template>

<script>
  import {Header, Popup, Toast, Indicator, Loadmore} from 'mint-ui';
  import {ProductDetail, addCart, GET_CARTNUMS,Favorite_add,Favorite_remove} from '../../api/api.js';
  import {setStore, getStore} from '../../config/myUtils';
  import {mapMutations, mapGetters} from 'Vuex';
  import vComment from '../mode/commentList.vue'
  export default {
    data () {
      return {
        popupVisible: false,
        isVip: false,
        bandimg: '',
        num: '1',
        name: '',
        marketPrice: 0.00,
        vipname: '',
        vipcount: '0.00',
        total: '',
        myStata: '',
        goodNums: '',
        goodsId: '',
        optionId: '',
        cartids: '',
        delGoodsNum: '',
        goodsid: 4,
        isShow: true,
        goodsparams: [], //商品详情
        bottomStatus: '',
        allLoaded: false,
        types: [[1, 2], [0, 1]],
        tselect: [],
        isfavorite: false,
        spec: [],  //规格
        opitions: [],
        specs_arr: [], //存放不同选项的名称
        specs_id_arr: [], //存放不同选项的ID
        standardArr: [],
        opitiontitle:'套餐类型',
        selectoption:'请选择',
        noselected:true,
        hasselect:false,
        minprice:'',
        maxprice:'',
        advpic:[
          {
            title:'正品保证',
            thumb:require('../../assets/images/p-1.png'),
          },
          {
            title:'7天无理由退换',
            thumb:require('../../assets/images/p-2.png'),
          },
          {
            title:'超时发货补贴',
            thumb:require('../../assets/images/p-3.png'),
          },
          {
            title:'PICC承保',
            thumb:require('../../assets/images/p-4.png'),
          }
        ],
        tab:0,
        content:""
      }
    },
    methods: {
      loadBottom() {
        console.log(this.allLoaded)
//        this.$refs.loadmore.onBottomLoaded();
      },
      handleBottomChange (status) {
//        this.allLoaded = true;
        console.log(status)
        this.bottomStatus = status;
      },
      goBack() {
        Indicator.close();
        this.$router.go(-1);
      },
      gototuwen () {
          document.getElementById('bottom-nav').scrollIntoView(true)
      },
      goPay() {
        this.myStata = 2;
        this.popupVisible = true;
        this.hasselect=true;
      },
      goPay1() {
        this.myStata = 2;
        this.popupVisible = false;
        this.toast()
      },
      handleClick: function () {
        this.popupVisible = true;
        this.hasselect=true;
        this.myStata = 1;
//        this.toast()

      },
      handleClick1: function () {
        this.popupVisible = false;
        this.myStata = 1;
        this.toast()
      },
      toast: function () {
        let _this = this;
        console.log('长度')
        console.log(_this.spec)
        console.log(_this.specs_arr)

//        if (!_this.spec || _this.spec.length == _this.specs_arr.length) {
//        if (!_this.spec.length || _this.selectoption == '已选：') {
        if (!_this.spec.length || _this.optionId) {
          if (this.myStata === 1) {//加入购物车
            _this.popupVisible = false;
            let params = {
              data: {
                goodsid: _this.$route.query.id,
                total: _this.num,
                optionid: _this.optionId
              }
            }

            addCart(params, function (res) {
              console.log(_this)
              if (res.statusCode == 1) {
                let params = {data:{}};
                let that = _this;
                GET_CARTNUMS(params, function (res) {//获取购物车当前数量
                  if (res.statusCode === 1) {
                    that.delGoodsNum = res.data.cartcount;
                  } else {
                    console.log('请求失败')
                  }
                });
                Toast({
                  message: '操作成功 商品已在购物车',
                  position: 'middle',
                  duration: 1800
                });
              } else if (!_this.optionId) {
                Toast({
                  message: '添加失败',
                  position: 'bottom',
                  duration: 1800
                });
              } else if (!_this.total) {
                Toast({
                  message: '添加失败',
                  position: 'bottom',
                  duration: 1800
                });
              }
            })
          } else if (this.myStata === 2) {//立即购买
            let myOrders = {
//            goodsid:this.goodsId,
              goodsid: this.$route.query.id,
              optionid: this.optionId,
              cartids: '',
              total: this.num
            }
            console.log(myOrders)
            this.getMyorders(myOrders);
            this.$router.push({name: 'confirmorder'})
          }
//        } else if (_this.spec.length > _this.specs_arr.length || _this.specs_arr.some((item)=>{item == ""})) {
        } else if (_this.selectoption == '请选择') {
          Toast({
            message: '请选择规格',
            position: 'bottom',
            duration: 1800
          });
        } else if (!_this.total) {
          Toast({
            message: '暂无库存',
            position: 'bottom',
            duration: 1800
          });
        }
      },
      reduce: function (num) {
        if (num > 1) {
          this.num--
        }
      },
      add: function () {
        this.num++;
      },
      getInfo: function () {
//        Indicator.open({
//          text: '加载中...',
//          spinnerType: 'fading-circle'
//        });
        let that = this;
        let good_id = this.$route.query.id;
        let params = {
          'data': {
            id: good_id,
          }
        }
        ProductDetail(params, function (res) {
          Indicator.close()
          if (res.statusCode === 1) {
            console.log('商品数据')
            console.log(res)
            that.goodNums = res.data.goodscount;
            let goods = res.data.goods
            that.goodsId = goods.id;
            that.name = goods.title;
            that.marketPrice = goods.marketprice;
            that.minprice = goods.minprice;
            that.maxprice = goods.maxprice;
            that.bandimg = res.data.pics;
            that.total = goods.total;
            that.isShow = true;
            that.goodsparams = res.data.params;
            that.opitions=res.data.options;
            console.log(that.opitions)
            that.spec=res.data.specs
            that.content=goods.content
//            document.getElementById("intro").innerHTML = goods.content;
//            Indicator.close();

            if (res.data.level.levelname) {
              that.isVip = true;
              that.vipname = res.data.level.levelname;
              that.vipcount = res.data.level.discount;
            }
            ;
            let params = {data: {}};
            let _that = that;
            GET_CARTNUMS(params, function (res) {//获取购物车当前数量
              if (res.statusCode === 1) {
                _that.delGoodsNum = res.data.cartcount;
              } else {
                console.log('请求失败')
//                Indicator.close();
              }
            })
          } else {
            console.log('请求失败')
//            Indicator.close();
          }
        })
      },
      popup(){
        this.popupVisible = true;
        this.hasselect=false
      },
      follow() {
        let _this = this;
        let params;
        switch (this.isfavorite) {
          case true:
            params = {
              data: {
                goodsid: _this.$route.query.id
              }
            }
            Favorite_remove(params, (res) => {
              this.isfavorite = false;
              Toast({
                message: '取消收藏',
                position: 'bottom',
                duration: 1800
              });
            });
            break;
          case false:
            params = {
              data: {
                goodsid: _this.$route.query.id
              }
            };
            Favorite_add(params, (res) => {
              if(res.statusCode==1){
                this.isfavorite = true;
                console.log('如果未收藏')
                Toast({
                  message: '收藏成功',
                  position: 'bottom',
                  duration: 1800
                });
              }
            })

            break;
          default:
            return
        }
      },
      tabtype(idx, index) {
        let _this = this;
        let id = this.spec[idx].items[index].id;
        let title = this.spec[idx].items[index].title;
        this.$set(this.specs_arr, idx, title);
        this.$set(this.specs_id_arr, idx, id);
        this.$set(this.tselect, idx, index);
        console.log(`specs__arr数据`)
//        console.log(this.specs_arr)
//        console.log(this.specs_arr.length)
        let arrbolen = _this.specs_arr.every((item,index,array)=>{
          console.log(_this.specs_arr.length)
            return (item !== '')
        })
//        console.log(`判断${arrbolen}`)
        let new_arr = [];
        for (let i = 0; i < _this.specs_arr.length; i++) {
          if (_this.specs_arr[i]) {
            new_arr.push(_this.specs_arr[i])
          }
        }
        if (new_arr.length == _this.spec.length) {
          let optionAll = (_this.specs_id_arr).join("_");
          let options = _this.opitions;
          let changeOptions = {};

          for (let o in options) {
            if (options[o].specs === optionAll) {
              changeOptions = options[o];
              _this.marketprice = changeOptions.marketprice
              _this.total = changeOptions.stock;
//              _this.marketprice=changeOptions.marketprice;
              _this.optionId = changeOptions.id;
              _this.opitiontitle=changeOptions.title;
              _this.selectoption='已选：';
              _this.noselected=false;
//              console.log('changeOptions的结果')
//              console.log(changeOptions)
              break;
            }
          }
        }
      },
      ...mapMutations({
        getMyorders: 'GET_MYORDERS'
      })
    },
    beforeRouteLeave (to, from, next) {
      this.popupVisible = false;
      next()
    },
    watch: {
      '$route'(to, from) {
        let _that = this;
        if (from.name == 'shoppingCart') {
          console.log('from shopcar')
          let params = {
            data: {}
          }
          GET_CARTNUMS(params, function (res) {//获取购物车当前数量
            if (res.statusCode === 1) {
              _that.delGoodsNum = res.data.cartcount;
            } else {
              console.log('请求失败')
//                Indicator.close();
            }
          });
        }
      },
      num(a,b){
        if(Number(a)>Number(this.total)){
          this.num=this.total
        }
      }
    },
    components:{
//      vComment:Comment
      vComment
    },

    mounted () {
      this.getInfo();
    },
    created() {

    }
  }
</script>


<style lang="less" scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';

  .main {
    /*-webkit-transform: translateZ(0)；*/
    position: fixed;
    /*-webkit-transform: translateZ(0);*/
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    font-size: .15rem;
    /*overflow:auto;*/
    overflow: hidden;
    z-index: 20;
  }

  .mint-header {
    /*border-bottom: 1px solid #e3e3e3;*/
    font-size: 0.16rem;
    height: 46px;
  }

  .router-link-active {
    color: #666;
  }

  /*商品信息*/
  .box {
    width: 100%;
    height:3.75rem
  }

  .img-box {
    position: relative;
    /*padding-bottom: 100%;*/
    height: 100%;
    margin-top: 45px;
    width: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .intro {
    text-align: left;
    background: #fff;
    /*padding: 0rem 0.05rem;*/
    width: 100%;
  }

  .intro > p {
    font-size: .15rem;
    text-align: left;
    padding-left: .03rem;
  }

  .intro > span {
    font-size: .18rem;
    color: #f01e1f;
  }

  p.vip-intro {
    font-size: .14rem;
    color: #999;
    padding: 0.03rem 0rem 0.10rem 0rem;
  }

  .vip-intro span.iconfont {
    font-size: 0.15rem;
  }

  .b-intro {
    /*margin-top: .1rem;*/
    background: #fff;
    overflow-x: hidden;
    margin-bottom: .48rem;
  }

  .comment {
    width: 100%;
    height: 5rem;
  }


  .b-intro > p > img {
    max-width: 100% !important;

  }

  .bottom-nav {
    padding:.1rem .15rem;
    /*display: flex;*/
    border-bottom: 1px solid #eee;
    font-size: .14rem;
    font-weight: bold;
    text-align: left;
    display: flex;
  }

  .bottom-nav span {
    display: block;
    flex: 1;
    height: 100%;
    line-height: .42rem;
    text-align: center;

  }

  .bottom-nav span:first-child {
    border-right: 1px solid #eee;
  }

  .img-p {
    width: 100%;
    margin-bottom: 50px;
  }

  .img-p > img {
    width: 99.6%;
  }

  .bottom-navbar {
    width: 100%;
    height: .48rem;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    -webkit-transform: translateZ(0);
    display: flex;
    /*border-top: 1px solid #DDDDDD;*/
  }

  .icon-box {
    /*width: 16%;*/
    /*flex: 1;*/
    width: .55rem;
    display: block;
    /*height: 48px;*/
    /*float: left;*/
    text-align: center;
    color: #666;
    border-top: 1px solid #DDDDDD;
    height: 100%;
  }

  .icon-box-fav {

  }

  .icon-b {
    font-size: .12rem;
    position: relative;
    top:0.02rem;
  }

  .carNum {
    position: absolute;
    top: -0.02rem;
    left: 55%;
    display: inline-block;
    background-color: #f23030;
    line-height: 0.1rem;
    font-style: normal;
    border-radius: 8px;
    padding: 0.01rem 0.04rem;
    font-size: 0.08rem;
    color: #fff;
    border: 0.01rem solid #fff;
  }

  .iconfont {
    font-size: .19rem;
    margin-top: .03rem;
  }

  .icon-car {
    font-size: .28rem;
    margin-top: .015rem;
    /*margin-bottom:-.037rem;*/
    margin-bottom: 0.03rem;
    height: .21rem;
    /*margin-right: 0.1rem;*/


    position: absolute;
    width: .4rem;
    margin-left: -.2rem;
    left: 25%;
    top:-0.02rem;
  }

  .icon-btn {
    margin: 0;
    /*width: 35%;*/
    flex: 1;
    height: 48px;
    outline: none;
    color: #fff;
    font-size: .15rem;
  }

  .icon-btn-car {
    margin-right: -.05rem;
    background: #ff9500;
  }

  .icon-btn-con {
    background: #dd2727;
    margin-right: -0.05rem;
  }

  /*弹出框样式*/
  .mint-popup-bottom {
    width: 100%;
  }

  .popup-box {
    /*height:2rem;*/
    /*height:4rem;*/
    width: 100%;
    /*position: relative;*/
    /* max-height: 4rem;
     overflow: hidden;
     overflow-y: scroll;*/

  }

  .popup-box > img {
    width: .8rem;
    height: .8rem;
    border-radius: .03rem;
    border: 1px solid #ddd;
    position: absolute;
    left: .12rem;
    top: -.12rem;
  }

  .popup-box > div.popup-info {
    text-align: left;
    position: absolute;
    left: 1.1rem;
    top: .12rem;
    color: #000;
  }

  .popup-box > div.popup-info > p {
    margin-bottom: .03rem;
  }

  .popup-box > div.popup-info > span {
    font-size: .12rem;
    color: #999;
    margin-left: .02rem;
  }
  .popup-box > .confirm {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #fff;
    font-size: .16rem;
    height: .46rem;
  }

  .popup-box > .confirm1 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #fff;
    font-size: .16rem;
    height: .46rem;
    display: flex;
  }
  .confirm1>div {
    flex: 1;
    height: 100%;
    background-color: #dd2727;
    line-height: .46rem;
  }





  .cal-box {
    /*position:relative;*/
    /*left:0;*/
    /*top:.88rem;*/
    width: 100%;
    padding: 0 .15rem;
    height: .6rem;
    margin-bottom: .46rem;
  }

  .cal-box > p {
    padding-top: .08rem;
    margin-left: 1.3rem;
    font-size: .13rem;
    color: #999;
  }

  .cal-box > div {
    float: right;
    width: 1.4rem;
    border: 1px solid #dedede;
    height: .35rem;
    margin-bottom: .05rem;
  }

  .cal-box > div > button {
    float: left;
    height: .33rem;
    width: .37rem;
    background: #eee;
    font-weight: bold;
    font-size: .15rem;
    padding-bottom: .02rem;
  }

  .cal-box > div > button.add-up {
    float: right;
  }

  .cal-box > div > input.num-box {
    width: .62rem;
    height: .33rem;
    text-align: center;
  }

  .goodsTitle {
    overflow: hidden;
    border-bottom: 0.01rem solid #eee;
    /*padding-bottom: 0.03rem;*/
    width: 100%;
    padding: 0 .1rem;

  }

  .goodsTitle p {
    width: 100%;
    margin: .1rem 0;
    color: #2b2b2b;
    font-size: 0.14rem;
    line-height: .2rem;
    word-wrap: break-word;
  }

  .goodsTitle span {
    font-size: 0.17rem;
    color: #DD2728;
    white-space: normal;
    font-weight: 700;
    /*padding: 0 0 .1rem 0;*/
  }
  .goodsTitle .price {
    font-size: .22rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #000;
  }
  .goodsTitle .marketPrice {
    margin-left: .13rem;
    font-size: .1rem;
    text-transform: uppercase;
    color: #999;
  }
  .goodsTitle .memberprice {
    font-size: .1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #bfa05d;
    margin-top: .05rem;
    margin-bottom: .05rem;
  }
  .goodsTitle .memberprice .tip {
    width: .7rem;
    height: .15rem;
    line-height: .15rem;
    font-size: .11rem;
    -webkit-border-radius: .05rem;
    -moz-border-radius: .05rem;
    border-radius: .05rem;
    background-color: #bfa05d;
    color: #fff;
    display: inline-block;
    text-align: center;
  }



  .params {
    margin-top: .05rem;
    padding: .1rem;
    background: #fff;
  }

  .params .info {
    font-size: .14rem;
    text-align: left;
    padding: 0 .05rem;
    line-height: .4rem;
    /*border-bottom: 1px solid #e0e0e0;*/
    color: #2D3037;

  }

  .params-list {
    width: 100%;
    text-align: left;
    padding: .08rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05)
  }

  .params-list:after {
    content: '';
    display: block;
    clear: both;
  }

  /*.params-list > .title {*/
    /*width: 30%;*/
    /*float: left;*/
    /*font-weight: bold;*/
    /*font-size: .12rem;*/
  /*}*/

  /*.params-list > .value {*/
    /*width: 70%;*/
    /*float: left;*/
    /*font-size: .12rem;*/
    /*color: #858585;*/
  /*}*/

  button {
    outline: none;
  }

  .container {
    position: absolute;
    top: 0;
    width: 100%;
    overflow: auto;
    /*overflow-y: scroll;*/
    -webkit-overflow-scrolling: touch;
    /*height: 6.2rem;*/
    height: 100%;
    /*overflow-y: scroll;*/

  }

  .goodtips {
    font-size: .1rem;
    color: #999;
    display: flex;
    padding: 0 .1rem;
    height: .3rem;
    line-height: .3rem;
  }

  .goodtips span {
    flex: 1;
    height: 100%;
  }

  .goodtips .total {
    text-align: right;
  }

  .isActive {
    color: #F5751D;
    border-bottom: 3px solid #F5751D;
  }

  /*规格*/
  .type-box {
    /*position: relative;
    top:.7rem;*/
    margin-top: .7rem;

    max-height: 3rem;
    overflow: hidden;
    overflow-y: scroll;


  }

  .types {
    display: flex;

  }

  .type-title {
    flex: 1;
  }

  .type {
    flex: 3;
    text-align: left;

  }

  .type .typeitem {
    display: inline-block;
    height: .27rem;
    border: 1px solid #bfbfbf;
    border-radius: .04rem;
    line-height: .25rem;
    font-size: 13px;
    color: #232326;
    /*margin-right: 10px;*/
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: .69rem;
    max-width: 98%;
    box-sizing: border-box;
    text-align: center;
    margin-right: .1rem;
  }

  .type .tActive {
    color: red;
    border: 1px solid red;
  }

  .starActive {
    color: #F5751D;
  }

  .pic-text {
    width: 100%;
  }

  .mint-header {
    z-index: 100;
  }

  .loading {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/Magnify.gif') center center no-repeat;
  }
  /*点击*/
  .opitions {
    width: 100%;
    display: flex;
    background-color: #fff;
    margin: .05rem 0;
    /*line-height: 2.5;*/
    padding: 0 .1rem;
    box-sizing: border-box;
    height: .37rem;
    font-size: .13rem;
    line-height: .37rem;
    color: #5a5a5a;
  }
  .opitions>.title {
    display: block;
    width: .45rem;
    font-size: .12rem;
  }
  .opitions .noselect{
    margin-right: .1rem;
  }
  .opitions .text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: .37rem;
    flex: 1;
    text-align: left;
    font-size: .12rem;
  }
  .opitions .num {

  }

  .carname {
    display: block;
    /*margin-top: .21rem;*/
    width: 100%;
    position: absolute;
    top: .24rem;
    font-size: .12rem;
  }




  .params {
    margin-top: .05rem;
    padding: .1rem;
    background: #fff;
  }

  .params .info {
    font-size: .14rem;
    text-align: left;
    padding: 0 .05rem;
  }

  .params-list {
    width: 100%;
    text-align: left;
    padding: .08rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05)
  }

  .params-list:after {
    content: '';
    display: block;
    clear: both;
  }

  .params-list > .title {
    width: 30%;
    float: left;
    font-weight: bold;
    font-size: .12rem;
    color: #2D3037;
  }

  .params-list > .value {
    width: 70%;
    float: left;
    font-size: .12rem;
    color: #858585;
  }

  .cut-off {
    position: relative;
    margin: .1rem 0;
    width: 100%;
    text-align: center;
  }

  .cut-off:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 25%;
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, .2);
  }

  .cut-off:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 25%;
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, .2);
  }

  .banner {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .tuwen {
    position: absolute;
    bottom: .15rem;
    right:.15rem;
    width: .45rem;
    height: .45rem;
    background-color: rgba(0,0 ,0 , .5);
    font-size: .1rem;
    color: #eaeaec;
    border-radius: 50%;
    padding:.05rem;

  }

  /*广告*/
  .adv {
    width: 100%;
    padding: 0 .05rem;
    height: 1.4rem;
    border-bottom: .1rem solid #f2f3f5;
    border-top: .1rem solid #f2f3f5;
    background-color: #ffffff;
  }
  .adv__title {
    height: .5rem;
    text-align: center;
  }
  .adv__title .border {
    display: inline-block;
    height: .015rem;
    width: 1.05rem;
    background-color: #363636;
    position: relative;
    top: -0.04rem;

  }
  .adv__title h2 {
    display: inline-block;
    font-size: .15rem;
    color: #363636;
    margin-top: 0.06rem;
    font-weight: bold;
  }


  .adv__list {
    display: flex;
  }
  .adv__item {
    flex: 1;
    text-align: center;
  }
  .adv__item img {
    width: .4rem;
    height: .4rem;
    display: block;
    margin: 0 auto;
  }
  .adv__item span {
    font-size: .1rem;
  }




</style>
