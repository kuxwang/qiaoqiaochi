<template>
  <div class="main">
    <mt-header title="精选" class="header">
      <!--<a  slot="left" class="pro-white" >
        <mt-button icon="back"></mt-button>
      </a>-->
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
        <!--<left-item :list="left" @onTab="tab"></left-item>-->
        <!--<right-item :list="right" :len="right.lengh" @getNum="getNum"></right-item>-->
      <div class="left">
        <a :class="['left-item',{active:select==index}]" href="javascript:void(0)" @click="goAnchor(`#foo${index}`,index)" v-for="(i,index) in list">{{i.type}}</a>
      </div>
      <div id="right" class="right">
          <div class="right-type" v-for="(i,index) in list">
            <h3 v-bind:id='tab(index)'> {{i.type}} </h3>
          <div class="right-item" v-for="(s,idx) in i.child">
            <span class="logo">
              <img :src="s.thumb">
            </span>
            <section>
              <p class="title">{{s.title}}</p>
              <span class="sales">销量：{{s.sales}}</span>
              <strong class="price">￥{{s.marketprice}}</strong>
              <div class="control">
                <div class="iconfont" v-if="totallist[index][idx]" @click="reduce(index,idx)" >&#xe734;</div>
                <div class="num" v-if="totallist[index][idx]">{{totallist[index][idx]}}</div>
                <div class="iconfont"@click="add(index,idx)">&#xe657;</div>
              </div>
              <!--<v-num @getNum="getNum"></v-num>-->
            </section>
        </div>
          </div>
      </div>

    </div>
    <footer :class="{popindex:popupVisible}">
      <div class="car">
        <span :class="['iconfont',{active:order.length>0}]" @click="popup">
          <!--<i class="iconfont">&#xe63c;</i>-->
          &#xe63c;
          <!--<span class="num">11</span>-->
        </span>
        <div class="num" v-if="order.length>0">{{total}}</div>
      </div>
      <div class="info" >
        ￥{{money}}
        <!--111-->
      </div>
      <div :class="['submit',{final:order.length>0}]" @click="goConfirm">
      <!--<div :class="['submit']" @click="goConfirm">-->
        去结算
      </div>
    </footer>
    <mt-popup v-model="popupVisible" position="bottom" modal=true>
      <div class="pop-box">
        <div class="title">
          <p>已选商品</p>
        </div>
        <ul class="order">
          <template v-for="(item,idx) in list">
            <li class="order-cell" v-if="totallist[idx][index]" v-for="(i,index) in item.child" :key="index">
              <div class="name">{{i.title}}</div>
              <div class="price">￥{{i.marketprice}}</div>
              <div class="control">
                <div class="iconfont" @click="reduce(idx,index)">&#xe734;</div>
                <div class="num" >{{totallist[idx][index]}}</div>
                <div class="iconfont"@click="add(idx,index)">&#xe657;</div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>


<script>
/*import LeftItem from '../components/class/LeftItem.vue'
import RightItem from '../components/class/RightItem.vue'*/
import {Popup, Toast} from 'mint-ui';
import {CateGoods} from '../api/api'
import { mapMutations, mapGetters } from 'Vuex';

  export default {
    data(){
      return {
        popupVisible:false,
        list:[] ,
        select:0,
        totallist:[],
        orderlist:[],
        total:0,
        goodsId:'',
        optionId:''

      }
    },
    methods:{
      tab(i,s){

        return `foo${i}`
      },
      goAnchor(selector,s) {
        let anchor = this.$el.querySelector(selector);
        let list=this.$el.querySelector('#right');
        console.log(selector)
        console.log(anchor)
        console.log(list)
        list.scrollTop = anchor.offsetTop - 44;

        this.select=s
        console.log(s)
      },
      popup(){
        this.popupVisible=!this.popupVisible
        if(this.order.length==0){
          this.popupVisible=false
        }
      },
      add(i,d){
        let total=this.totallist[i][d]
        total++;
        this.$set(this.totallist[i], d, total);
        this.total++
        /*console.log(this.totallist)
        console.log(this.money)
        console.log(this.list[i].child[d].price)
        console.log(this.totallist[i][d])*/

      },
      reduce(i,d){
        let total=this.totallist[i][d]
        if (total > 0) {
          total--;
          this.$set(this.totallist[i], d, total);
        }
        if(this.total>0){
          this.total--
        }
      },
      goConfirm(){
        if(this.order.length>0){
          this.popupVisible=false;
          console.log(this.order)
          let _this = this;
//        let cartIds = this.order;
          let myOrders = {
            goodsid: _this.goodsId,
            optionid: _this.optionId,
            cartids: this.order,
            total: ''
          }
          _this.getMyorders(myOrders);
          _this.$router.push({ name: 'confirmorder',query:{order:1,id:this.order}});
        }else {

        }
      },
      init(){
        let params={
          data:{
            fields:'id,ccate,title,app_thumb,thumb,marketprice,sales'
          }
        }
        CateGoods(params,(res)=>{
            console.log(res)
            if(res.statusCode==1){
              this.list=res.data

              let len=this.list.length;
              let arr=[]
              for (let i=0;i<len;i++){
                let l=this.list[i].child.length;
                arr.push(Array.apply(null, Array(l)).map(() => 0))
              }
              this.totallist=arr;
            }
        })
      },
      ...mapMutations({
        getMyorders: 'GET_MYORDERS'
      })
    },
    components:{
    },
    mounted(){
      this.init()
    },
    watch:{
      order(i){
        if(i.length==0){
          this.popupVisible=false;
        }
      }
    },
    computed:{
      money(){
        let i,num=0,len=this.list.length;
        for(i=0;i<len;i++){
          for(let s=0;s<this.list[i].child.length;s++){
            num+=Number(this.list[i].child[s].marketprice) * this.totallist[i][s]
          }
        }
        /*console.log(num)
        console.log(len=this.list.length)*/
        return num || 0
      },
      order(){
        let i,
            len=this.list.length,
            arr=[],
            str='';
        for(i=0;i<len;i++){
          for(let s=0;s<this.list[i].child.length;s++){
            if(this.totallist[i][s]){
//              let str=`${this.list[i].child[s].title}+${this.list[i].child[s].id}+${this.list[i].child[s].marketprice}+${this.totallist[i][s]}`;
//              let str=this.list[i].child[s].id
                str+=`${this.list[i].child[s].id},${this.totallist[i][s]},${this.list[i].child[s].marketprice}|`
//              arr.push(str);
            }
          }
        }
        str=str.substr(0,str.length-1)
        return str;
      }
    }
  }
</script>


<style lang="less" scoped>
  /*@import '../assets/less/reset.less';*/
  @import '../assets/less/index.less';
  @import '../assets/fonts/iconfont.css';
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    z-index: 1;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1;
    display: flex;
    width: 100%;
    /*margin-top: .45rem;*/
  }
  a:-webkit-any-link {
    text-decoration: none;
  }

  .left {
    width: .78rem;
    background-color: #fff;
  }
  .left-item {
    display: block;
    width: 100%;
    height: .4rem;
    font-size: .12rem;
    /*line-height: .4rem;*/
    border-bottom: 1px solid #f8f8f8;
    color: #232327;
    background-color: #fff;
    padding: .15rem;
    box-sizing: border-box;
    line-height: 1;
  }
  .left .active {
    /*background-color: red;*/
    color: #333;
    font-weight: 700;
    background-color: #f8f8f8;
  }




  footer {
    width: 100%;
    height: .48rem;
    /*background-color: rgba(61,61,63,.9);*/
    background-color: #fff;
    display: flex;
  }
  .popindex {
    z-index: 3000;
  }

  footer .car {
    width: .79rem;
    height: 100%;
    position: relative;
    text-align: left;
  }
  .car span {
    width: .4rem;
    height: .4rem;
    position: absolute;
    /*background-color: #444;*/
    border: .02rem solid #444;
    border-radius: 50%;
    left: .15rem;
    top:-.08rem;
    font-size: .22rem;
    text-align: center;
    line-height: .4rem;
    color: #333;
  }
  .car .active {
    /*background-color: #3190e8;*/
    background-color: #ff771b;
    color: #fff;
    border: none;
  }
  .car .num {
    position: absolute;
    width: .15rem;
    height: .135rem;
    background-color: #ff7416;
    right: 0.2rem;
    top:-.1rem;
    border-radius: 50%;
    font-size: .1rem;
    text-align: center;
    color: #fff;
  }
  footer .info {
    flex: 1;
    padding: .0725rem 0;
    font-size: .18rem;
    /*color: #fff;*/
    color: #dd2727;
    text-align: left;
  }
  footer .submit {
    width: 1.05rem;
    height: 100%;
    background-color: #535356;
    color: #fff;
    font-size: .15rem;
    font-weight: 700;
    line-height: .48rem;
    text-align: center;
  }
  .right {
    flex: 1;
    padding-left: .08rem;
    font-size: .14rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .right h3 {
    width: 100%;
    text-align: left;
    font-size: .12rem;
    /*padding: .075rem 0;*/
    margin: 0;
    /*border-left: 3px solid #333;*/
    border-left: 3px solid #ff771b;
    height: .12rem;
    line-height: .12rem;
    padding: .018rem 0 .018rem .1rem;
    margin: .01rem 0;
    font-weight: 700;
    /*color: #666;*/
    color: #666;
    -webkit-box-flex: 0;

  }
  .right-item {
    background-color: #fff;
    padding: .1rem .1rem .1rem 0;
    margin-bottom: 1px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    min-height: 1rem;
    height: 1.02rem;
    box-sizing: border-box;
    position: relative;
    text-align: left;
  }
  span.logo {
    width: .76rem;
    height: .76rem;
    margin-right: .1rem;
  }
  span img {
    width: 100%;
    height: 100%;
  }
  section {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    padding-bottom: .25rem;
  }

  section .sales {
    position: absolute;
    bottom: .3rem;
    font-size: .1rem;
    color: #333;
  }

  section p {
    margin: 0;
  }
  .title {
    font-size: .14rem;
    /*font-weight: 700;*/
    line-height: .14rem;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -webkit-align-items: start;
    -ms-flex-align: start;
    align-items: start;
    padding-right: .2rem;
    word-break: break-word;
    color: #333;
  }
  strong {
    font-weight: 700;
    font-size: .16rem;
    line-height: .16rem;
    /*color: #f60;*/
    color: red;
    padding-bottom: .035rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: baseline;
    -webkit-align-items: baseline;
    -ms-flex-align: baseline;
    align-items: baseline
  }
  section .price {
    position: absolute;
    bottom: 0
  }

  .control {
    display: flex;
  }
  section .control{
    position: absolute;
    right: 0;
    bottom: -.025rem;
  }
  .control .iconfont {
    font-size: .2rem;
    color: #ff771b;
    /*color: #3190e8;*/
  }
  .control .num {
    min-width: .16rem;
    height: .2rem;
    font-size: .14rem;
    line-height: .2rem;
    text-align: center;
    margin: 0 .03rem;
  }

  .mint-popup {
    width: 100%;
  }
  .pop-box {
    font-size: .14rem;
    /*height: 2rem;*/
    width: 100%;
    overflow: hidden;
    margin-bottom: .5rem;
  }
  .pop-box .title {
    height: .4rem;
    padding: 0 .125rem;
    color: #666;
    font-size: .16rem;
    line-height: .4rem;
    text-align: left;


    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;




  }
  .pop-box .title p {
    /*border-left: .035rem solid #2395ff;*/
    border-left: .035rem solid #ff771b;
    height: .2rem;
    line-height: .2rem;
    padding-left: .1rem;
  }



  .pop-box ul {
    overflow: hidden;
    overflow-y: scroll;
    padding-left: 0;
    text-align: left;
    max-height: 3rem;
  }
  .order .order-cell {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;


    /*display: flex;*/
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: .075rem .125rem;
    min-height: .5rem;
    /*margin-left: .333333rem;*/
  }
  .order-cell .price {
    width: .8rem;
    text-align: right;
    font-weight: 700;
    font-size: .16rem;
    line-height: .16rem;
    color: #f60;
    padding-bottom: .035rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
  }
  .order-cell .name {
    flex: 1;
  }
  footer .final {
    /*background-color: #4cd964;*/
    background-color: #ff771b;
    color: #fff;
  }









</style>
