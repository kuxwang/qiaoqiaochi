<template>

    <div class="main order-header">
      <mt-header title="我的订单" fixed>
        <router-link to="/" slot="left" >
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="page-navbar">
        <mt-navbar class="page-part" v-model="selected">
          <mt-tab-item id="all">全部</mt-tab-item>
          <mt-tab-item id="will-pay">待付款</mt-tab-item>
          <mt-tab-item id="will-send">待发货</mt-tab-item>
          <mt-tab-item id="will-reserve">待收货</mt-tab-item>
          <mt-tab-item id="done">已完成</mt-tab-item>
        </mt-navbar>

        <!--<div>-->
          <!--<mt-cell class="page-part" title="当前选中">{{ selected }}</mt-cell>-->
        <!--</div>-->

        <mt-tab-container v-model="selected" class="orderList">
          <mt-tab-container-item id="all">
            <ul class="order-list">
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <router-link class="good-info" to="/orderd" tag="div">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="cancel-order">
                    取消订单
                  </button>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <div class="good-info">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </div>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="cancel-order">
                    取消订单
                  </button>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="will-pay">
            <ul class="order-list">
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <router-link class="good-info" to="/orderd" tag="div">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="cancel-order">
                    取消订单
                  </button>
                  <router-link class="look-logi ocolor" to="/logistics" tag="button">
                    查看物流
                  </router-link>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <div class="good-info">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </div>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="cancel-order">
                    取消订单
                  </button>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="will-send">
            <ul class="order-list">
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <router-link class="good-info" to="/orderd" tag="div">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="cancel-order" @click="fn1">
                    取消订单
                  </button>
                  <router-link class="back-money ocolor" to="/drawback" tag="button">
                    申请退款
                  </router-link>
                </div>
              </li>
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <div class="good-info">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </div>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="cancel-order">
                    取消订单
                  </button>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="will-reserve">
            <div class="share-page">
              <div class="iconfont">
                &#xe60f;
              </div>
              <p>您还没有相关订单</p>
              <p>赶快去购物吧</p>
              <router-link tag="button" to="/details">再逛逛</router-link>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="done">
            <ul class="order-list">
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <router-link class="good-info" to="/orderd" tag="div">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </router-link>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="cancel-order">
                    取消订单
                  </button>
                  <router-link class="look-logi ocolor" to="/logistics" tag="button">
                    查看物流
                  </router-link>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
              <li>
                <div>订单号：xyyzeeeeeeeeeeee</div>
                <div class="good-info">
                  <img src="../assets/images/xiaotu.jpg" alt="" class="order-small">
                  <p>竹享</p>
                  <div class="good-price">
                    <p>￥99.00</p>
                    <p>×1</p>
                  </div>
                </div>
                <div class="good-pay">
                  <span>共1件商品 实付：</span> ￥99.00
                </div>
                <div class="good-btn">
                  <button class="delete-order">
                    删除订单
                  </button>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <v-tabbar></v-tabbar>
      <router-view></router-view>
    </div>
</template>
<script>
  import { Navbar,MessageBox } from 'mint-ui';
 	import vTabbar from '../components/common/Tabbar';
	export default{
    name: 'page-navbar',
		data(){
			return{
        selected: 'all'
			}
		},
    methods:{
		  fn1:function () {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        }).then(action=>{
          if(action=='confirm'){

          }else if(action=='cancel'){

          }
        });
      }
    },
		components:{
			vTabbar
		},
	}
</script>
<style scoped>
  @import '../assets/css/reset/reset.css';
  *{
    font-size:.15rem;
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
    /*background: rgba(243,195,151,0.7);*/
    background:#ececec;
    font-size:.15rem;
    overflow:auto
  }
  .share-page{
    padding:.5rem 1rem;
    color:#999;
  }
  .share-page>div.iconfont{
    font-size:.7rem;
  }
  .share-page>p{
    font-size:.14rem;
  }
  .share-page>button{
    width:.7rem;
    height:.35rem;
    border-radius:.03rem;
    margin-top:.15rem;
    background:#ff4f4f;
    outline:none;
    color:#ddd;
  }
  .mint-header {
    color: #252525;
    border-bottom: 1px solid #e3e3e3;
    height:.45rem;
  }
  /*.order-header .mintui-back:before{
    color:#fff;
  }*/

  div.page-navbar{
    margin-top:.45rem;
  }
  .order-list{
    background: #efefef;
    padding-top:.01rem
  }
  .order-list>li{
    margin-top:.09rem;
    background: #fff;
    text-align: left;
    padding:0 .12rem;
  }
  .order-small{
    width:.5rem;
    height:.5rem;
    border:1px solid #ddd;
  }
  .order-list>li>div{
    padding:.12rem 0;
    border-bottom:1px solid #ddd;
  }
  .good-info{
    height:.75rem;
  }
  .good-info>img{
    float:left;
  }
  .good-info>p{
    float:left;
    margin-left:.08rem;
  }
  .good-price{
    float:right
  }
  .good-price>p{
    text-align: right;
    margin-bottom:.02rem;
  }
  .good-pay{
    text-align: right;
    color:#666;
  }
  .good-pay>span{
    color:#999;
  }
  div.good-btn{
    text-align: right;
    padding:.08rem 0 !important;
    border-bottom:none !important;
  }
  .good-btn>button{
    width:.6rem;
    height:.3rem;
    border:none;
    outline: none;
    color:#fff;
    border-radius:.03rem;
    font-size:.14rem;
  }
  .orderList{
    margin-bottom:.8rem;
  }
  .look-logi{
    width:.9rem !important;
    margin-right:.05rem;
  }
  .delete-order{
    background:#ddd;
    color:#777 !important;
    width:.9rem !important;
    margin-right:.05rem;
  }
  .cancel-order{
    background:#ddd;
    color:#777 !important;
    width:.9rem !important;
    margin-right:.05rem;
  }
  .back-money{
    width:.9rem !important;
  }
</style>
