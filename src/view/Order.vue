<template>
    <div class="main order-header">
      <mt-header title="我的订单" fixed>
        <router-link to="/" slot="left" >
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="page-navbar">
        <mt-navbar class="page-part" v-model="selected">
          <mt-tab-item id="all" @click="all">全部</mt-tab-item>
          <mt-tab-item id="will-pay">待付款</mt-tab-item>
          <mt-tab-item id="will-send">待发货</mt-tab-item>
          <mt-tab-item id="will-reserve">待收货</mt-tab-item>
          <mt-tab-item id="done">已完成</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" class="orderList" id="content-list">
          <mt-tab-container-item id="all">
            <ul class="order-list" v-show="!isShow1" v-for="(v,i) in order0">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status,num:v.goods[0].total}}" tag="div">
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
                  <button class="cancel-order" @click="fn1" v-if="v.status==0">
                    取消订单
                  </button>
                  <router-link class="charge-order ocolor" to="" tag="button" v-if="v.status==0">
                    付款
                  </router-link>
                  <router-link class="charge-order ocolor" to="/drawback" tag="button" v-if="v.status==1">
                    申请退款
                  </router-link>
                  <router-link class="charge-order1" to="" tag="button" v-if="v.status==2">
                    确认收货
                  </router-link>
                  <router-link class="look-logi ocolor" to="/logistics" tag="button" v-if="v.status==2">
                    查看物流
                  </router-link>
                  <router-link class="charge-order1 " to="/drawback" tag="button" v-if="v.status==3">
                    申请退款
                  </router-link>
                  <router-link class="look-logi ocolor" to="/logistics" tag="button" v-if="v.status==3">
                    查看物流
                  </router-link>
                </div>
              </li>
            </ul>
            <div class="share-page" v-show="isShow1">
              <div class="iconfont">
                &#xe60f;
              </div>
              <p>您还没有相关订单</p>
              <p>赶快去购物吧</p>
              <router-link tag="button" to="/details">再逛逛</router-link>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="will-pay">
            <ul class="order-list" v-show="!isShow2" v-for="(v,i) in order1">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status,num:v.goods[0].total}}"  tag="div">
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
                  <button class="cancel-order" @click="fn1">
                    取消订单
                  </button>
                  <router-link class="charge-order ocolor" to="" tag="button">
                    付款
                  </router-link>
                </div>
              </li>
            </ul>
            <div class="share-page" v-show="isShow2">
              <div class="iconfont">
                &#xe60f;
              </div>
              <p>您还没有相关订单</p>
              <p>赶快去购物吧</p>
              <router-link tag="button" to="/details">再逛逛</router-link>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="will-send">
            <ul class="order-list" v-show="!isShow3" v-for="(v,i) in order2">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status,num:v.goods[0].total}}" tag="div">
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
                  <router-link class="charge-order ocolor" to="/drawback" tag="button">
                    申请退款
                  </router-link>
                </div>
              </li>
            </ul>
            <div class="share-page" v-show="isShow3">
              <div class="iconfont">
                &#xe60f;
              </div>
              <p>您还没有相关订单</p>
              <p>赶快去购物吧</p>
              <router-link tag="button" to="/details">再逛逛</router-link>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="will-reserve">
            <ul class="order-list" v-show="!isShow4" v-for="(v,i) in order3">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status,num:v.goods[0].total}}" tag="div">
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
                  <router-link class="charge-order1" to="" tag="button">
                    确认收货
                  </router-link>
                  <router-link class="look-logi ocolor" to="/logistics" tag="button">
                    查看物流
                  </router-link>
                </div>
              </li>
            </ul>
            <div class="share-page" v-show="isShow4">
              <div class="iconfont">
                &#xe60f;
              </div>
              <p>您还没有相关订单</p>
              <p>赶快去购物吧</p>
              <router-link tag="button" to="/details">再逛逛</router-link>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="done">
            <ul class="order-list" v-show="!isShow5" v-for="(v,i) in order4">
              <li>
                <div>订单号：{{v.ordersn}}</div>
                <router-link class="good-info" :to="{path:'orderd',query:{oid:v.id,sta:v.status,num:v.goods[0].total}}" tag="div">
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
                  <router-link class="charge-order1 " :to="{path:'drawback',query:{money:v.price}}" tag="button">
                    申请退款
                  </router-link>
                  <router-link class="look-logi ocolor" :to="{path:'logistics',query:{exp:v.express,expsn:v.expresssn}}" tag="button">
                    查看物流
                  </router-link>

                </div>
              </li>
            </ul>
            <div class="share-page" v-show="isShow5">
              <div class="iconfont">
                &#xe60f;
              </div>
              <p>您还没有相关订单</p>
              <p>赶快去购物吧</p>
              <router-link tag="button" to="/details">再逛逛</router-link>
            </div>
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
 	import {orderList} from '../api/api.js'
	export default{
    name: 'page-navbar',
		data(){
			return{
        selected: 'all',
        isShow1:false,
        isShow2:false,
        isShow3:false,
        isShow4:false,
        isShow5:false,
        order0:[],
        order1:[],
        order2:[],
        order3:[],
        order4:[],
			}
		},
    methods:{
		  all:function () {
        console.log(1)
      },
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
      },
      getOrderList:function () {
		    let that=this;
        let params={
          data:{
            page:1,
            status:''
          }
        }
        orderList(params,function (res) {
          console.log(res)
          if(res.statusCode==1){
            that.order0=res.data;
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].status==0){
              that.order1.push(res.data[i])
              }if(res.data[i].status==1){
                that.order2.push(res.data[i])
              }
              if(res.data[i].status==2){
                that.order3.push(res.data[i])
              }
              if(res.data[i].status==3){
                that.order4.push(res.data[i])
              }
            }
          }else{
            console.log('请求出错了')
          }
          if(that.order0.length==0){
            that.isShow1=true;
          }
          if(that.order1.length==0){
            that.isShow2=true;
          }
          if(that.order2.length==0){
            that.isShow3=true;
          }
          if(that.order3.length==0){
            that.isShow4=true;
          }
          if(that.order4.length==0){
            that.isShow5=true;
          }
        })
      }
    },
    created(){
      this.getOrderList()
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
    width:.9rem;
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
  /*.delete-order{*/
    /*background:#ddd;*/
    /*color:#777 !important;*/
    /*width:.9rem !important;*/
    /*margin-right:.05rem;*/
  /*}*/
  .cancel-order{
    background:#ddd;
    color:#777 !important;
    width:.9rem !important;
    margin-right:.05rem;
  }
  .back-money{
    width:.9rem !important;
  }
  .charge-order1{
    background:#ddd;
    color:#777 !important;
    margin-right:.05rem;
  }
</style>
