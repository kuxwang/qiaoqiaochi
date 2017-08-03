<template>
  <div class="main order-header">
    <mt-header title="我的订单" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="page-navbar">
      <mt-navbar class="page-part" v-model="selected" fixed>
        <mt-tab-item id="all">全部</mt-tab-item>
        <mt-tab-item id="will-pay">待付款</mt-tab-item>
        <mt-tab-item id="will-send">待发货</mt-tab-item>
        <mt-tab-item id="will-reserve">待收货</mt-tab-item>
        <mt-tab-item id="done">已完成</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected" class="orderList" id="content-list">
        <mt-tab-container-item id="all">
          <mt-loadmore class="list-content" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                       :autoFill="isTrue"
                       :bottom-all-loaded="statusLoaded.all" ref="loadmore" v-show="!statusShow.all">

            <ul class="order-list" v-show="!statusShow.all" v-for="(v,i) in statusResult.all">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status,num:v.goods[0].total}}"
                             tag="div">
                  <img :src=v.goods[0].thumb alt="" class="order-small">
                  <p>{{v.goods[0].title}}</p>
                  <div class="good-price">
                    <p>{{v.goods[0].marketprice}}</p>
                    <p>×{{v.goods[0].total}}</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共{{v.goods[0].total}}件商品 实付：</span> ￥{{v.price}}
                </div>
                <div class="good-btn">
                  <button class="cancel-order" v-if="v.status==0" @click="cancel(v.id)">
                    取消订单
                  </button>
                  <button class="charge-order ocolor" @click="pay(v.ordersn)" v-if="v.status==0">
                    付款
                  </button>
                  <!--<router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:v.price,orderid:v.id}}" tag="button"   v-if="v.status==1" v-show="v.canrefund||v.refundid==0"> -->
                  <router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:v.price,orderid:v.id}}"
                               tag="button" v-if="v.canrefund&&v.refundid==0">
                    申请退款
                  </router-link>
                  <!--<router-link class="charge-order ocolor" :to="{path:'drawbackInfo',query:{money:v.price,orderid:v.id}}" tag="button" v-if="v.canrefund&&v.refundid!=0">-->
                  <!--退款申请中-->
                  <!--</router-link>-->
                  <button class="charge-order1" v-if="v.status==2 && v.refundid==0" @click="fn1(v.id)">
                    确认收货
                  </button>
                  <router-link class="look-logi ocolor"
                               :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button"
                               v-if="v.status==2">
                    查看物流
                  </router-link>
                  <!--<router-link class="charge-order1 " :to="{path:'drawback',query:{money:v.price,orderid:v.id}}" tag="button" v-if="v.canrefund&&v.refundid==0">-->
                  <!--申请退款-->
                  <!--</router-link>-->
                  <!-- <router-link class="charge-order ocolor" :to="{path:'drawbackInfo',query:{money:v.price,orderid:v.id}}" tag="button" v-if="v.canrefund&&v.refundid!=0" >
                    退款申请中
                  </router-link> -->
                  <button class="charge-order ocolor" v-if="v.canrefund && v.refundid!=0 && v.status!=0"
                          @click="refund(v.refundid)">
                    退款申请中
                  </button>
                  <router-link class="look-logi ocolor"
                               :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button"
                               v-if="v.status==3">
                    查看物流
                  </router-link>
                </div>
              </li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom" style="text-align:center"
                 v-show="statusLoaded.all == false">
              <span v-show="statusLoadedStatus.all !== 'loading'"
                    :class="{ 'is-rotate': statusLoadedStatus.all === 'drop' }">继续滚动，可加载更多</span>
              <span v-show="statusLoadedStatus.all === 'loading'">
	              	<mt-spinner type="snake"></mt-spinner>
	            	</span>
            </div>
          </mt-loadmore>
          <div class="share-page" v-show="statusShow.all">
            <div class="iconfont">
              &#xe60f;
            </div>
            <p>您还没有相关订单</p>
            <p>赶快去购物吧</p>
            <router-link tag="button" to="/">再逛逛</router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="will-pay">
          <mt-loadmore class="list-content" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                       :autoFill="isTrue"
                       :bottom-all-loaded="statusLoaded.will_pay" ref="loadmore">
            <ul class="order-list" v-show="!statusShow.will_pay" v-for="(v,i) in statusResult.will_pay">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status}}" tag="div">
                  <img :src=v.goods[0].thumb alt="" class="order-small">
                  <p>{{v.goods[0].title}}</p>
                  <div class="good-price">
                    <p>{{v.goods[0].marketprice}}</p>
                    <p>×{{v.goods[0].total}}</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共{{v.goods[0].total}}件商品 实付：</span> ￥{{v.price}}
                </div>
                <div class="good-btn">
                  <button class="cancel-order" @click="cancel(v.id)">
                    取消订单
                    <!--<select id="" v-show="isSelect">-->
                    <!--<option value="">不取消了</option>-->
                    <!--<option value="">我不想买了</option>-->
                    <!--<option value="">信息填写错误，重新拍</option>-->
                    <!--<option value="">同城见面交易</option>-->
                    <!--<option value="">其他原因</option>-->
                    <!--</select>-->
                  </button>
                  <button class="charge-order ocolor" @click="pay(v.ordersn)">
                    付款
                  </button>
                </div>
              </li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom" style="text-align:center"
                 v-show="statusLoaded.will_pay == false">
              <span v-show="statusLoadedStatus.will_pay !== 'loading'"
                    :class="{ 'is-rotate': statusLoadedStatus.will_pay === 'drop' }">继续滚动，可加载更多</span>
              <span v-show="statusLoadedStatus.will_pay === 'loading'">
	              	<mt-spinner type="snake"></mt-spinner>
	            	</span>
            </div>
          </mt-loadmore>
          <div class="share-page" v-show="statusShow.will_pay">
            <div class="iconfont">
              &#xe60f;
            </div>
            <p>您还没有相关订单</p>
            <p>赶快去购物吧</p>
            <router-link tag="button" to="/">再逛逛</router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="will-send">
          <mt-loadmore class="list-content" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                       :autoFill="isTrue"
                       :bottom-all-loaded="statusLoaded.will_send" ref="loadmore" v-show="!statusShow.will_send">
            <ul class="order-list" v-show="!statusShow.will_send" v-for="(v,i) in statusResult.will_send">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status}}" tag="div">
                  <img :src=v.goods[0].thumb alt="" class="order-small">
                  <p>{{v.goods[0].title}}</p>
                  <div class="good-price">
                    <p>{{v.goods[0].marketprice}}</p>
                    <p>×{{v.goods[0].total}}</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共{{v.goods[0].total}}件商品 实付：</span> ￥{{v.price}}
                </div>
                <div class="good-btn">
                  <router-link class="charge-order ocolor" :to="{path:'drawback',query:{money:v.price,orderid:v.id}}"
                               tag="button" v-if="v.canrefund&&v.refundid==0">
                    申请退款
                  </router-link>
                  <!--<router-link class="charge-order ocolor"-->
                               <!--:to="{path:'drawbackInfo',query:{money:v.price,orderid:v.id}}" tag="button"-->
                               <!--v-if="v.canrefund&&v.refundid!=0">-->
                    <!--退款申请中-->
                  <!--</router-link>-->
                  <button class="charge-order ocolor" v-if="v.canrefund&&v.refundid!=0" @click="refund(v.refundid)">
                    退款申请中
                  </button>
                </div>
              </li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom" style="text-align:center"
                 v-show="statusLoaded.will_send == false">
              <span v-show="statusLoadedStatus.will_send !== 'loading'"
                    :class="{ 'is-rotate': statusLoadedStatus.will_send === 'drop' }">继续滚动，可加载更多</span>
              <span v-show="statusLoadedStatus.will_send === 'loading'">
	              	<mt-spinner type="snake"></mt-spinner>
	            	</span>
            </div>
          </mt-loadmore>
          <div class="share-page" v-show="statusShow.will_send">
            <div class="iconfont">
              &#xe60f;
            </div>
            <p>您还没有相关订单</p>
            <p>赶快去购物吧</p>
            <router-link tag="button" to="/">再逛逛</router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="will-reserve">
          <mt-loadmore class="list-content" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                       :autoFill="isTrue"
                       :bottom-all-loaded="statusLoaded.will_reserve" ref="loadmore" v-show="!statusShow.will_reserve">
            <ul class="order-list" v-show="!statusShow.will_reserve" v-for="(v,i) in statusResult.will_reserve">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status}}" tag="div">
                  <img :src=v.goods[0].thumb alt="" class="order-small">
                  <p>{{v.goods[0].title}}</p>
                  <div class="good-price">
                    <p>{{v.goods[0].marketprice}}</p>
                    <p>×{{v.goods[0].total}}</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共{{v.goods[0].total}}件商品 实付：</span> ￥{{v.price}}
                </div>
                <div class="good-btn">
                  <button class="charge-order1" @click="fn1(v.id)">
                    确认收货
                  </button>
                  <router-link class="look-logi ocolor"
                               :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button">
                    查看物流
                  </router-link>
                </div>
              </li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom" style="text-align:center"
                 v-show="statusLoaded.will_reserve == false">
              <span v-show="statusLoadedStatus.will_reserve !== 'loading'"
                    :class="{ 'is-rotate': statusLoadedStatus.will_reserve  === 'drop' }">继续滚动，可加载更多</span>
              <span v-show="statusLoadedStatus.will_reserve === 'loading'">
	              	<mt-spinner type="snake"></mt-spinner>
	            	</span>
            </div>
          </mt-loadmore>
          <div class="share-page" v-show="statusShow.will_reserve">
            <div class="iconfont">
              &#xe60f;
            </div>
            <p>您还没有相关订单</p>
            <p>赶快去购物吧</p>
            <router-link tag="button" to="/">再逛逛</router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="done">
          <mt-loadmore class="list-content" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                       :autoFill="isTrue"
                       :bottom-all-loaded="statusLoaded.donex" ref="loadmore" v-show="!statusShow.donex">
            <ul class="order-list" v-show="!statusShow.donex" v-for="(v,i) in statusResult.donex">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status}}" tag="div">
                  <img :src=v.goods[0].thumb alt="" class="order-small">
                  <p>{{v.goods[0].title}}</p>
                  <div class="good-price">
                    <p>{{v.goods[0].marketprice}}</p>
                    <p>×{{v.goods[0].total}}</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共{{v.goods[0].total}}件商品 实付：</span> ￥{{v.price}}
                </div>
                <div class="good-btn">
                  <router-link class="charge-order1 " :to="{path:'drawback',query:{money:v.price,orderid:v.id}}"
                               tag="button" v-if="v.canrefund&&v.refundid==0">
                    申请退款
                  </router-link>
                  <!-- <router-link class="charge-order ocolor" :to="{path:'drawbackInfo',query:{money:v.price,orderid:v.id}}" tag="button" v-if="v.canrefund&&v.refundid!=0">
                    退款申请中
                  </router-link> -->
                  <button class="charge-order ocolor" v-if="v.canrefund&&v.refundid!=0" @click="refund(v.refundid)">
                    退款申请中
                  </button>
                  <router-link class="look-logi ocolor"
                               :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn,id:v.id}}" tag="button">
                    查看物流
                  </router-link>

                </div>
              </li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom" style="text-align:center"
                 v-show="statusLoaded.donex == false">
              <span v-show="statusLoadedStatus.donex !== 'loading'"
                    :class="{ 'is-rotate': statusLoadedStatus.donex === 'drop' }">继续滚动，可加载更多</span>
              <span v-show="statusLoadedStatus.donex  === 'loading'">
	              	<mt-spinner type="snake"></mt-spinner>
	            	</span>
            </div>
          </mt-loadmore>
          <div class="share-page" v-show="statusShow.donex">
            <div class="iconfont">
              &#xe60f;
            </div>
            <p>您还没有相关订单</p>
            <p>赶快去购物吧</p>
            <router-link tag="button" to="/">再逛逛</router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <v-tabbar></v-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import {Navbar, MessageBox, Loadmore, Toast} from 'mint-ui';
  import vTabbar from '../components/common/Tabbar';
  import {orderList, orderManu} from '../api/api.js'
  import {mapMutations, mapGetters} from 'vuex'
  // 	import {mapMutations} from 'Vuex'
  export default{
    name: 'page-navbar',
    data(){
      return {
        selected: 'all',
        isSelect: false,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        isShow4: false,
        isShow5: false,
        page: 1,
        order0: [],
        order1: [],
        order2: [],
        order3: [],
        order4: [],
        canReason: '其他原因',
        myPageNum: 10,
        myCurNo: 1,
        bottomStatus: '',
        allLoaded: false,
        isTrue: false,
        onePage: false,
        psizenum: 10,
        allLoaded_all: false,
        allLoaded_will_pay: false,
        allLoaded_will_send: false,
        allLoaded_will_reserve: false,
        allLoaded_done: false,
        statusType: '',
        statusPage: {
          'all': 0,
          'will_pay': 0,
          'will_send': 0,
          'will_reserve': 0,
          'donex': 0,
        },
        statusShow: {
          'all': false,
          'will_pay': false,
          'will_send': false,
          'will_reserve': false,
          'donex': false,
        },
        statusResult: {
          'all': [],
          'will_pay': [],
          'will_send': [],
          'will_reserve': [],
          'donex': [],
        },
        statusLoaded: {
          'all': false,
          'will_pay': false,
          'will_send': false,
          'will_reserve': false,
          'donex': false,
        },
        statusLoadedStatus: {
          'all': '',
          'will_pay': '',
          'will_send': '',
          'will_reserve': '',
          'donex': '',
        }

      }
    },
    watch: {
      selected(val){
        switch (val) {
          case 'all' :
            this.statusType = '';
            this.statusPage.all = 0;
            this.statusResult.all = [];
            this.selectedTypeChange(this.statusPage.all);

            break;
          case 'will-pay' :
            this.statusType = '0';
            this.statusPage.will_pay = 0;
            this.statusResult.will_pay = [];
            this.selectedTypeChange(this.statusPage.will_pay);

            break;
          case 'will-send' :
            this.statusType = '1';
            this.statusPage.will_send = 0;
            this.statusResult.will_send = [];
            this.selectedTypeChange(this.statusPage.will_send);

            break;
          case 'will-reserve' :
            this.statusType = '2';
            this.statusPage.will_reserve = 0;
            this.statusResult.will_reserve = [];
            this.selectedTypeChange(this.statusPage.will_reserve);

            break;
          case 'done' :
            this.statusType = '3';
            this.statusPage.donex = 0;
            this.statusResult.donex = [];
            this.selectedTypeChange(this.statusPage.donex);
            break;
        }
      }
    },
    methods: {
      selectedTypeChange(page){
        this.getOrderList(page);
      },
      changeTypePage(_this){
        switch (_this.statusType) {
          case '0' :
            _this.statusPage.will_pay++;
            break;
          case '1' :
            _this.statusPage.will_send++;
            break;
          case '2' :
            _this.statusPage.will_reserve++;
            break;
          case '3' :
            _this.statusPage.donex++;
            break;
          default :
            _this.statusPage.all++;
            break;
        }
      },
      saveTypeResult(_that, res){
        switch (_that.statusType) {
          case '0' :
            if ((_that.statusResult.will_pay.length <= 0) && (res.data.length <= 0)) {
              _that.statusShow.will_pay = true;
            }

            if (res.statusCode == 1) {
              _that.statusShow.will_pay = false;
              _that.statusResult.will_pay = _that.statusResult.will_pay.concat(res.data);

              if (res.data.length < _that.psizenum) {
                _that.statusLoaded.will_pay = true;
              }
            } else {
              if (!_that.statusLoaded.will_pay) {
                Toast({
                  message: '订单已经加载完成',
                  position: 'middle',
                  duration: 1000
                });
              }
              _that.statusLoaded.will_pay = true;
              _that.statusShow.will_pay = true;
            }
            break;
          case '1' :
            if (_that.statusResult.will_send.length <= 0 && res.data.length <= 0) {
              _that.statusShow.will_send = true;
            }

            if (res.statusCode == 1) {
              _that.statusShow.will_send = false;
              _that.statusResult.will_send = _that.statusResult.will_send.concat(res.data);


              if (res.data.length < _that.psizenum) {
                _that.statusLoaded.will_send = true;
              }
            } else {
              if (!_that.statusLoaded.will_send) {
                Toast({
                  message: '订单已经加载完成',
                  position: 'middle',
                  duration: 1000
                });
              }
              _that.statusLoaded.will_send = true;
              _that.statusShow.will_send = true;
            }
            break;
          case '2' :
            if (_that.statusResult.will_reserve.length <= 0 && res.data.length <= 0) {
              _that.statusShow.will_reserve = true;
            }

            if (res.statusCode == 1) {
              _that.statusLoaded.will_reserve = false;
              _that.statusResult.will_reserve = _that.statusResult.will_reserve.concat(res.data);
              if (res.data.length < _that.psizenum) {
                _that.statusLoaded.will_reserve = true;
              }
            } else {
              if (!_that.statusLoaded.will_reserve) {
                Toast({
                  message: '订单已经加载完成',
                  position: 'middle',
                  duration: 1000
                });
              }
              _that.statusShow.will_reserve = true;
              _that.statusLoaded.will_reserve = true;
            }
            break;
          case '3' :
            if (_that.statusResult.donex.length <= 0 && res.data.length <= 0) {
              _that.statusShow.donex = true;
            }

            if (res.statusCode == 1) {
              _that.statusShow.donex = false;
              _that.statusResult.donex = _that.statusResult.donex.concat(res.data);

              if (res.data.length < _that.psizenum) {
                _that.statusLoaded.donex = true;
              }
            } else {

              if (!_that.statusLoaded.donex) {
                Toast({
                  message: '订单已经加载完成',
                  position: 'middle',
                  duration: 1000
                });
              }
              _that.statusShow.donex = true;
              _that.statusLoaded.donex = true;
            }
            break;
          default :

            if (_that.statusResult.all.length <= 0 && res.data.length <= 0) {
              _that.statusShow.all = true;
            }

            if (res.statusCode == 1) {
              _that.statusShow.all = false;
              _that.statusResult.all = _that.statusResult.all.concat(res.data);

              if (res.data.length < _that.psizenum) {
                _that.statusLoaded.all = true;
              }
            } else {
              Toast({
                message: '订单已经加载完成',
                position: 'middle',
                duration: 1000
              });
              _that.statusLoaded.all = true;
              _that.statusShow.all = true;
            }
            break;
        }
      },

      refund: function (refundid) {
        this.$router.push({name: 'drawbackInfo', query: {refundid: refundid}});
      },
      cancel: function (orderid) {
        MessageBox({title: '确定取消订单吗?', message: '点击确认取消', showCancelButton: true}).then(action => {
          if (action == 'confirm') {//表示点击了确定
            this.isSelect = !this.isSelect;
            let that = this;
            let params = {
              data: {
                orderid: orderid,
                type: 'canl',
                reason: that.canReason
              }
            }
            orderManu(params, function (res) {
              if (res.statusCode == 1) {
                for (let i = 0; i < that.statusResult.all.length; i++) {
                  if (that.statusResult.all[i].id === orderid) {
                    that.statusResult.all.splice(i, 1);
                    break;
                  }
                }
              } else {
                Toast({
                  message: res.data,
                  position: 'middle',
                  duration: 1000
                });

                that.reload();
              }
            })
          } else if (action == 'cancel') {//表示点击了取消
          }
        })
      },
      handleBottomChange(status) {
//        console.log(status);
        switch (this.statusType) {
          case 'will-pay' :
            this.statusLoadedStatus.will_pay = status;
            break;
          case 'will-send' :
            this.statusLoadedStatus.will_send = status;
            break;
          case 'will-reserve' :
            this.statusLoadedStatus.will_reserve = status;
            break;
          case 'done' :
            this.statusLoadedStatus.donex = status;
            break;
          default :
            this.statusLoadedStatus.donex = status;
            break;
        }
      },
      loadBottom() {
        switch (this.statusType) {
          case '0' :
            this.getOrderList(this.statusPage.will_pay);
            break;
          case '1' :
            this.getOrderList(this.statusPage.will_send);
            break;
          case '2' :
            this.getOrderList(this.statusPage.will_reserve);
            break;
          case '3' :
            this.getOrderList(this.statusPage.donex);
            break;
          default :
            this.getOrderList(this.statusPage.all);
            break;
        }

        this.$refs.loadmore.onBottomLoaded();
      },
      fn1: function (orderid) {

        console.log('fn1 run');
        console.log(orderid);

        let that = this;
        this.$router.push({path: '/orderd', query:{oid: orderid,sta:2}});
      },
      getOrderList: function (page) {
        let _this = this;
        console.log(this.statusType)
        let params = {
          data: {
            page: ++page,
            status: this.statusType
          }
        };
        console.log()
        orderList(params, function (res) {
          _this.changeTypePage(_this);
          _this.saveTypeResult(_this, res);
        });
      },
      ...mapMutations({
        orderinfo: 'ORDERINFO'
      }),
      pay(x){
        this.orderinfo(x)
        this.$router.push({path:'payselect',query:{orderid:x}});
      },
      fun2: function (obj) {
        let a = obj.status
        let b = obj.canrefund
        if (a == 1 && b)
          return true
      }
    },
    created(){
      this.getOrderList(this.statusPage.all);
    },
    computed: {
//      fun2:function (a,b) {
//        if(a&&b)
//          return true
//      }
    },
    components: {
      vTabbar
    },
  }
</script>
<style scoped>
  @import '../assets/css/reset/reset.css';

  * {
    font-size: .15rem;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .main {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    font-size: .15rem;
    overflow: auto
  }

  .page-part {
    top: .45rem;
    height: .4rem
  }

  .share-page {
    padding: .5rem 1rem;
    color: #999;
  }

  .share-page > div.iconfont {
    font-size: .7rem;
  }

  .share-page > p {
    font-size: .14rem;
  }

  .share-page > button {
    width: .7rem;
    height: .35rem;
    border-radius: .03rem;
    margin-top: .15rem;
    background: #ff4f4f;
    outline: none;
    color: #ddd;
  }

  .mint-header {
    color: #252525;
    border-bottom: 1px solid #e3e3e3;
    height: .45rem;
  }

  /*.order-header .mintui-back:before{
    color:#fff;
  }*/

  div.page-navbar {
    margin-top: .45rem;
  }

  .order-list {
    background: #efefef;
    padding-top: .01rem
  }

  .order-list > li {
    margin-top: .09rem;
    background: #fff;
    text-align: left;
    padding: 0 .12rem;
  }

  .order-small {
    width: .5rem;
    height: .5rem;
    border: 1px solid #ddd;
  }

  .order-list > li > div {
    padding: .12rem 0;
    border-bottom: 1px solid #ddd;
  }

  .good-info {
    height: .75rem;
  }

  .good-info > img {
    float: left;
  }

  .good-info > p {
    float: left;
    margin-left: .08rem;
  }

  .good-price {
    float: right
  }

  .good-price > p {
    text-align: right;
    margin-bottom: .02rem;
  }

  .good-pay {
    text-align: right;
    color: #666;
  }

  .good-pay > span {
    color: #999;
  }

  div.good-btn {
    text-align: right;
    padding: .08rem 0 !important;
    border-bottom: none !important;
  }

  .good-btn > button {
    width: .9rem;
    height: .3rem;
    border: none;
    outline: none;
    color: #fff;
    border-radius: .03rem;
    font-size: .14rem;
  }

  .orderList {
    /*margin-bottom:.8rem;*/
  }

  .look-logi {
    width: .9rem !important;
    margin-right: .05rem;
  }

  /*.delete-order{*/
  /*background:#ddd;*/
  /*color:#777 !important;*/
  /*width:.9rem !important;*/
  /*margin-right:.05rem;*/
  /*}*/
  .cancel-order {
    background: #ddd;
    color: #777 !important;
    width: .9rem !important;
    margin-right: .05rem;
  }

  .back-money {
    width: .9rem !important;
  }

  .charge-order1 {
    background: #ddd;
    color: #777 !important;
    margin-right: .05rem;
  }

  .mint-loadmore-bottom {
    margin-bottom: -.5rem;
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  #content-list {
    /* margin-top: .43rem; */
    height: 5.25rem;
    overflow: hidden;
    overflow-y: scroll;
    /* height: 4.75rem; */
    position: absolute;
    top: .88rem;
    width: 100%;
  }

  /*#will-pay{*/
  /*margin-top:.2rem;*/
  /*}*/

  .list-content {
    /*height:5.25rem;*/
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
