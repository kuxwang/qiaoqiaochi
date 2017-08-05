<template>
  <div class="main">
    <section>
      <mt-header fixed title="推广订单" class="c-1">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>

    <div class="list-header c-1">
      <transition name="slide">
        <router-view></router-view>
      </transition>
      <ul class="nav-tab">
        <li :class="{tabActive: selected==1 }" @click="tabnav('total',1)">
          <!--<router-link @click="selecttab(1)" to="/extension1" tag="li" :class="{tabActive: selected==1 }"  >-->
          <div class="title">全部</div>
          <div class="iconfont listicon">&#xe624;</div>
          <div>
            <span class="num">{{ordertotal}}</span><span class="yuan"> 单</span>
          </div>
          <!--</router-link>-->
        </li>
        <li :class="{tabActive: selected==2 }" @click="tabnav('lock',2)">
          <!--<router-link @click="selecttab(2)" to="/extension2" tag="li" :class="{tabActive: selected==2 }" >-->
          <div class="title">未结算</div>
          <div class="iconfont listicon">&#xe624;</div>
          <div>
            <span class="num">{{orderlock}}</span><span class="yuan"> 单</span>
          </div>
          <!--</router-link>-->
          <!--</li>-->
          <!--<router-link  @click="selecttab(3)" to="/extension3" tag="li" :class="{tabActive: selected==3 }">-->
        </li>
        <li :class="{tabActive: selected==3 }" @click="tabnav('refund',3)">
          <!--<li class="li2">-->
          <div class="title">已退款</div>
          <div class="iconfont listicon">&#xe8b5;</div>
          <div>
            <span class="num">{{orderrefund}}</span><span class="yuan"> 单</span>
            <!--<span class="num">{{ordernum.refund.order_count}}</span><span class="yuan"> 单</span>-->
          </div>
        </li>
        <!--</router-link>-->

        <li :class="{tabActive: selected==4 }" @click="tabnav('ok',4)">
          <div class="title">已结算</div>
          <div class="iconfont listicon">&#xe619;</div>
          <div>
            <span class="num">{{orderok}}</span><span class="yuan"> 单</span>
          </div>
        </li>
      </ul>

      <div class="search">
        <input type="text" results="1" v-model="find" placeholder="输入订单号、粉丝ID"/>
        <div @click="searchlist">搜索</div>
      </div>
    </div>

      <ul class="p-list" v-if="orderlist.length"  v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded" infinite-scroll-distance="10">
        <li class="p-cell" v-for="(i,index) in orderlist" @click="orderinfo(index)">
          <div class="up">
            <span class="ordernum">订单编号{{i.ordersn}}</span>
            <span class="time">{{i.createtime}}</span>
          </div>
          <div class="down">
            <div class="logo">
              <img :src="i.avatar"/>
            </div>
            <div class="info">
              <h5>{{i.nickname}}</h5>
              <span>{{i.mid}}</span>
            </div>
            <div class="ordertype">
              <span>{{i.status}}</span>
              <span>￥{{i.price}}</span>
            </div>
          </div>
        </li>
      </ul>
    <!--  <div slot="bottom" class="mint-loadmore-bottom" style="text-align:center" v-show="allLoaded == false" v-if="">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">继续滚动，可加载更多</span>
        <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
      </div>-->
    <div v-if="!orderlist.length" class="tips">
      <span class="iconfont">&#xe66f;</span>
      没有相关订单<br>
    </div>
  </div>

</template>
<script>
  import MtCell from "../../../node_modules/mint-ui/packages/cell/src/cell";
  //  import {TabContainer, TabContainerItem, Cell}  from 'mint-ui'
  import {Search, Loadmore, InfiniteScroll,Toast} from 'mint-ui';
  import {mapMutations, mapGetters} from 'vuex';
  import {orderStatistics, orderLists, orders} from '../../api/api'
  export default{
    data () {
      return {
        active: 'tab-container1',
        selected: 1,
        find: '',
        ordernum: {},
        ordertotal: '',
        orderlock: '',
        orderrefund: '',
        orderok: '',
        orderlist: [],
        searched: true,
        myCurNo: 1,
        psizes: 10,
        bottomStatus: '',
        allLoaded: false,
        isTrue: false,
        onePage: false,
        loding:true
      }
    },
    methods: {
      orderinfo(index){
        this.ordersn(this.orderlist[index].ordersn);
        this.$router.push({name: `orderinfo`})
      },
      selecttab(idx, page){
        let _this = this;
//        this.selected = idx;
        /*if(idx==5){
          this.orderlist = [];
          this.allLoaded = true;
        }else if(page===1) {
          this.orderlist = [];
          this.allLoaded = false;
          this.myCurNo = 1;
        }*/
        if(page==1){
          _this.orderlist=[]
        }
        switch (idx) {
          case 1:
            let params = {
              data: {
                type: 'total',
                page: page,
                psize: this.psizes
              }
            }
            orderLists(params, (res) => {

              if (res.statusCode == 1) {
                  this.orderlist = this.orderlist.concat(res.data);

                  if (res.data.length < _this.psizes) {
                    _this.allLoaded = true;
                  }
                console.log(this.orderlist.length)
              }else{
                _this.allLoaded = true;
                console.log('请求失败`${res.statusCode} , ${res.data}` ')
              }

            });
            break;
          case 2:
            params = {
              data: {
                type: 'lock',
                page: page,
                psize: this.psizes
              }
            };
            orderLists(params, (res) => {
              if (res.statusCode == 1) {
                this.orderlist = this.orderlist.concat(res.data);

                if (res.data.length < _this.psizes) {
                  _this.allLoaded = true;
                }
              }else{
                _this.allLoaded = true;
                console.log('请求失败`${res.statusCode} , ${res.data}` ')
              }
              console.log(this.orderlist.length)
            });
            break;
          case 3:
            params = {
              data: {
                type: 'refund',
                page: page,
                psize: this.psizes
              }
            };
            orderLists(params, (res) => {
              if (res.statusCode == 1) {
                this.orderlist = this.orderlist.concat(res.data);

                if (res.data.length < _this.psizes) {
                  _this.allLoaded = true;
                }
              }else{
                _this.allLoaded = true;
                console.log('请求失败`${res.statusCode} , ${res.data}` ')
              }
              console.log(this.orderlist.length)
            })
            break;
          case 4:
            params = {
              data: {
                type: 'ok',
                page: page,
                psize: this.psizes
              }
            };
            orderLists(params, (res) => {
              if (res.statusCode == 1) {
                this.orderlist = this.orderlist.concat(res.data);

                if (res.data.length < _this.psizes) {
                  _this.allLoaded = true;
                }
              }else{
                _this.allLoaded = true;
                console.log('请求失败`${res.statusCode} , ${res.data}` ')
              }
              console.log(this.orderlist.length)

            })
            break;
          /*case 5  :
            if (this.find.length === 20) {
              let params = {
                data: {
                  ordersn: this.find
                }
              };
              _this.allLoaded = true
              orders(params, (res) => {
                if (res.statusCode === 1) {
                  let obji = [];
                  obji.push(res.data.order);
                  this.orderlist = obji;
                  this.allLoaded = true;
                } else {
                  console.log('请求失败');
                  this.searched = false
                }
              })
            } else {
              let params = {
                data: {
                  mid: this.find
                }
              };
              orders(params, (res) => {
                if (res.statusCode === 1) {
//                  console.log(res)
                  let obji = [];
                  obji.push(res.data.order);
                  this.orderlist = obji;

//                  console.log(this.orderlist);
                  /!* if (!this.orderlist || this.orderlist < 1) {
                   this.searched = false
                   }*!/
                } else {
                  console.log('请求失败');
//                  this.searched = false
                }
              })
            }
            break;*/
          default:
            console.log('hehhe')

        }
      },
      tabnav(type,index){
        let _this=this;
        this.myCurNo=1;
        _this.selected=index;
        _this.orderlist=[];
        let params = {
          data: {
            type: type,
            page: 1,
            psize: this.psizes
          }
        }
        orderLists(params, (res) => {

          if (res.statusCode == 1) {
            _this.orderlist = _this.orderlist.concat(res.data);

            if (res.data.length < _this.psizes) {
              _this.allLoaded = true;
            }
            console.log(_this.orderlist.length);
            console.log(_this.selected);
            console.log(_this.myCurNo);
          }else{
            _this.allLoaded = true;
            console.log('请求失败`${res.statusCode} , ${res.data}` ')
          }

        });
      },
      ...mapMutations({
        searchnum: 'SEARCHNUM',
        ordersn: 'ORDERSN',
      }),
      handleBottomChange(status) {
        console.log(status);
        this.bottomStatus = status
      },
      loadBottom() {
         console.log('xx1');
//         return ;
        this.myCurNo += 1;
//        this.$refs.loadmore.onBottomLoaded();
        this.selecttab(this.selected, this.myCurNo);

      },
      loadMore(){
        this.myCurNo=this.myCurNo+1;
        this.selecttab(this.selected, this.myCurNo)
      },
      searchlist(){
        this.orderlist=[];
        this.selected=5
        this.allLoaded = true;
        let _this=this;
        if (this.find.length === 20) {
          let params = {
            data: {
              ordersn: this.find
            }
          };
          _this.allLoaded = true
          orders(params, (res) => {
            if (res.statusCode === 1) {
              let obji = [];
              obji.push(res.data.order);
              this.orderlist = obji;
              this.allLoaded = true;
            } else {
              console.log('请求失败');
              this.searched = false
            }
          })
        } else {
          let params = {
            data: {
              mid: this.find
            }
          };
          orders(params, (res) => {
            if (res.statusCode === 1) {
//                  console.log(res)
              if(res.data.order.ordersn){
                let obji = [];
                obji.push(res.data.order);
                console.log(res.data.order.ordersn)
                this.orderlist = obji;
              }else {
                Toast({
                  message: '未找到订单，请重新搜索。',
                  position: 'middle',
                  duration: 2000
                });
              }
            } else {
              console.log('请求失败');
//                  this.searched = false
            }
          })
        }

      }



    },
    watch:{
      find(a,b){
          if(this.selected === 5){
            this.searchlist()
          }
      }
    },

    created(){
      this.selected = this.tabselect;
      this.selecttab(this.tabselect, 1)

    },
    mounted(){
      let params = {}
      orderStatistics(params, (res) => {
        if (res.statusCode == 1) {
          this.ordernum = res.data
          console.log(this.ordernum)
          this.ordertotal = res.data.total.order_count
          this.orderrefund = res.data.refund.order_count
          this.orderlock = res.data.lock.order_count
          this.orderok = res.data.ok.order_count
        }

      })
    },
    computed: {
      ...mapGetters([
        'tabselect',

      ]),
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
  }

  .mint-header {
    border-bottom: 0;
    color: #fff;
    z-index: 2;
  }

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

  .avatar {
    position: relative;
    top: 0;
    left: 0;
    margin-top: .4rem;
    height: 1rem;
    padding: .15rem;
    color: #fff;
    background-color: #f47f2f;
  }

  .icon {
    width: .70rem;
    height: .70rem;
    background: grey;
    float: left;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .message {
    width: 78%;
    height: 100%;
    float: left;
  }

  .message div {
    width: 100%;
    height: 33%;
  }

  .message > div > span {
    display: block;
    max-width: 100%;
    height: 100%;
    float: left;
    font-size: .14rem;
    line-height: .23rem;
    padding: 0 0 0 10px;
  }

  .message > span {
    font-size: .14rem;
    float: left;
    display: block;
    padding: 0 0 0 10px;
  }

  .avatar > .right {
    position: absolute;
    top: .4rem;
    right: .2rem;
  }

  .top {
    /*height: .64rem;*/
    /*background: #fff;*/
    margin-top: .4rem;
    background: rgb(244, 127, 47);
    -webkit-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    /*display: flex;*/
  }

  /*

    .top > div {
      position: relative;
      !*width: 50%;*!
      height: 100%;
      background: rgba(0, 0, 0, .2);
      !*float: left;*!
      flex: 1;
    }

    .top > div > span {
      line-height: .32rem;
      !*color: red;*!
      color: #fff;
    }

    .top .title {
      display: block;
      height: .25rem;
      font-size: .14rem;
      !*color: #666;*!
      color: #fff;
    }
  */

  .yuan {
    color: red;
    font-size: .10rem;
  }

  .num {
    color: red;
    font-size: .18rem;
  }

  .top_1:after {
    content: '';
    position: absolute;
    right: 0;
    top: .1rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .details li {
    margin-top: .04rem;
  }

  .p-list {
    display: block;
    background-color: #ececec;
    /*height: 4.75rem;*/
    width: 100%;
    /*   height: 4.5rem;
       overflow: hidden;*/
    /*overflow-y: scroll;*/
  margin-top: 1.95rem;

  }

  /*  .mint-loadmore {
      height: 0.5rem;
      overflow: hidden;
      overflow-y: scroll;
    }*/
  .mint-loadmore {
    /*overflow-y: scroll;*/
    width: 100%;
  }

  .p-cell {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 0;
    margin-top: 0.05rem;
    background-color: #fff;
    border-top: 1px solid #e2e2e2;
    width: 100%;
  }

  .up {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #eee;
    padding: 0 0.1rem;
    line-height: .36rem;

  }

  .up .ordernum {
    font-size: 0.12rem;
  }

  .up .time {
    float: right;
    font-size: 0.1rem;

  }

  .down {
    flex: 3;
    height: 0.68rem;
    display: flex;
    padding: 0 0.1rem;
  }

  .logo {
    flex: 1;
    width:.43rem;
    height:.43rem;
    margin-top: .1rem;
    /*padding: 0.1rem 0;*/
  }

  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.1rem;
    padding: 0.05rem 0;
    color: #666;
  }

  .info h5 {
    margin-top: 0.1rem;
    color: #27272f;
    font-size: 0.14rem;
  }

  .info span {

    font-size: 0.14rem;
    color: #666;
  }

  .logo img {
    width: 100%;
    height:100%;
    border-radius: 50%;
    vertical-align: middle;
    display: block;

  }

  .ordertype {
    flex: 3;
    padding: 0.05rem 0;
    color: #666;
  }

  .ordertype span {
    display: block;
    text-align: right;
    font-size: 0.14rem;
    margin-top: 0.05rem;
  }

  .ordertype span:last-child {
    margin-top: 0.1rem;
  }

  .mint-tab-container-item {
    overflow: hidden;
    overflow-y: scroll;
    height: 4.8rem;
  }

  .mint-navbar .mint-tab-item.is-selected {
    color: #F5751D;

  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #F5751D;
  }

  .nav-tab {
    /*margin-top: .5rem;*/
    height: .90rem;
    -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    display: flex;
    position: fixed;
    width: 100%;
    top: .45rem;
    z-index: 1;
  }

  .nav-tab li {
    position: relative;
    display: block;
    /*width: 33.3%;*/
    height: .90rem;
    /*float: left*/
    background-color: #fff;
    padding: .1rem .2rem;
    flex: 1;
  }

  .nav-tab .li1:after, .nav-tab .li2:after, .nav-tab .li4:after, .nav-tab .li5:after {
    content: '';
    position: absolute;
    right: 0;
    top: .14rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .nav-tab .li4, .content .li5, .content .li6 {
    border-top: 1px solid rgba(0, 0, 0, .2)
  }

  .nav-tab .title {
    color: rgba(0, 0, 0, .5);
    font-size: .14rem;
    line-height: .2rem;
  }

  .nav-tab .iconfont {
    width: .28rem;
    height: .30rem;
    margin-left: auto;
    margin-right: auto;
    font-size: .20rem;
    /*border: 1px solid #F5751D;*/
    line-height: .3rem;
    /*color: #F5751D;*/
    border-radius: 50%;
  }

  .search {
    height: .5rem;
    display: flex;
    /*margin: .2rem 2%;*/
    width: 100%;

    position: fixed;
    z-index: 2;
    background-color: #eee;
    top: 1.35rem;
    padding: 0 2%;

  }

  .search input {
    border: none;
    display: block;
    height: .3rem;
    flex: 1;
    padding: 0 0.2rem;
    background: #fff;
    margin-top: .15rem;
  }

  .search div {
    background-color: #F5751D;
    display: block;
    height: .3rem;
    flex: .3;
    color: #fff;
    line-height: .3rem;
    margin-top: .15rem;
  }

  .mint-header {
    color: #252522 !important;
  }

  .nav-tab .tabActive {
    background-color: #f5751d;
    color: #fff;
  }

  .nav-tab .tabActive .title {
    color: #fff;
  }

  .tabActive .num, .tabActive .yuan {
    color: #fff;
  }

  .c-1 {
    z-index: 3;
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
  }

  .tips {
    text-align: center;
    font-size: .14rem;
    color: #666;
    margin-top: 2.8rem;

  }

  .tips .iconfont {
    display: block;
    font-size: .8rem;
  }

  .mint-loadmore {
    /* height: 4.5rem;
      overflow: hidden;*/
    /*overflow-y: scroll;*/

  }

  .mint-loadmore {
    /*position: absolute;
    top:1.9rem;*/
  }

  .mint-loadmore-content {
    /*overflow-y: scroll !important;*/
  }

  .list-content {
    overflow: hidden;
    /*overflow-y: scroll;*/
    /*height: 4.75rem;*/
    position: absolute;
    top: 1.9rem;
    width: 100%;
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }
  .tips{

  }
</style>
