<template>
  <div class="main">
    <mt-header title="优惠券" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="order-nav-bar">
        <div :class="['detail-block',{active: select== index}]"  v-for="(i,index) in type" @click="select = index">
          {{i.title}}
        </div>
      </div>
      <div class="scroll">
        <button class="gocoupon" v-if="listArr.length" @click="goLook">去领券</button>
        <ul class="list">
          <li v-for="(item,index) in listArr" :key="index">
            <div class="left">
              <div>
                <div class="title">
                  {{item.couponname}}
                </div>
                <div class="time">
                  有效期至 {{item.timestr}}
                </div>
              </div>
              <div class="center" v-if="curNav==1">
                <img :src="isused" />
              </div>
              <div class="center" v-if="curNav==2">
                <img :src="overdate" />
              </div>
            </div>
            <div class="right">
              <div class="money">
                ￥<span>{{item._backmoney}}</span>
              </div>
              <div class="type">{{item.backstr}}</div>
            </div>
          </li>
        </ul>

        <div class="share-page" v-if="listArr.length ==0">
          <span class="iconfont icon-iconfontyouhuiquan">&#xe6df;</span>
          <div class="p">您还没有优惠券</div>
          <div class="p">去领券中心领券吧</div>
          <button @click="goLook" class="look-btn">去领券</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Coupons_my} from '../../../api/api';
  export default {
    data(){
      return {
        type: [
          {
            title: '待使用',
            staus:0
          },
          {
            title: '已使用',
            staus:1
          },
          {
            title: '已过期',
            staus:2
          },
        ],
        select:0,
        listArr:[],
        curNav:1,
        isused: require('../../../assets/images/used.png'),
        overdate: require('../../../assets/images/overdate.png'),
        isloading:true,
        page:1,
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      goLook(){
        this.$router.push({name:'couponList'})
      },
      init(ps=10){
        let params={
          data:{
            page:this.page,
            status:this.select,
            psize: 10
          }
        }
        console.log(params.data)
        Coupons_my(params,(res)=>{
          console.log(res)
          if (res.statusCode == 1) {
//            this.loading = false;
            if (res.data.length > 0) {
              this.listArr = this.listArr.concat(res.data);
              console.log(this.listArr)
              setTimeout(() => {
                this.loading = false;
              }, 1000)
            } else {
              this.loading = true;
            }
          } else {
            this.loading = true;
            console.log('请求失败`${res.statusCode} , ${res.data}` ')
          }
        })
      },
      loadMore () {
        this.page = this.page + 1;
        this.init(this.status,this.page);
      },
      tab(i){
        this.select=i;
      }
    },
    created(){
      this.init();
    },
    beforeRouteUpdate(to, from, next) {
      if (from.name === 'coupon_detail') {
        console.log('领取成功回来了')

        this.page=1;
        this.select=0;
        this.listArr=[]
        this.init();
      }
      next()
    },
    watch:{
      select(val){
        this.listArr=[];
        this.page=1;
        this.init()
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .main {
    .page-view(1);
  }
  .container {
    margin-top: .45rem;
    height: 100%;
    padding-bottom: .7rem;
    .order-nav-bar{
      display: flex;
      width: 100%;
      height: .5rem;
      background: #fff;
      border-bottom: 1px solid #F3F4F9;
      padding: .15rem 0;
      .detail-block {
        flex: 1;
        text-align: center;
        border-right: 1px solid #F3F4F9;
        font-size: .16rem;
      }
      .active {
        color: #EC5151;
      }
    }
    .scroll {
      .scroll-view(100%);
      .gocoupon{
        margin: .1rem auto;
        width:91%;
        outline: none;
        border-radius: .03rem;
        font-size: .15rem;
        height: .42rem;
        line-height:.42rem;
        background: #f6ae7c;
      }
      .list{
        width:100%;
        box-sizing: border-box;
        text-align: left;
      }

      /*.scroll{
        !*height:5.5rem;*!
        !*margin-top:100rpx;*!
        height: 100%;

        .list{
          width:100%;
          box-sizing: border-box;
          text-align: left;
        }
      }*/
    }
  }

  .list li{
    box-sizing: border-box;
    width: 94.6%;
    margin: .1rem auto;
    background: #fff;
    border:1px solid #eee;
    display: flex;
  }
  .left{
    width:70%;
    padding: .1rem;
    display:flex;
  }
  .left div{
    margin-bottom: .02rem;
  }
  .left .title{
    font-size: .14rem;
    color:#000;
  }
  .left .time{
    color:#8f8f8f;
    font-size: .13rem;
  }
  .left .count{
    color:#8f8f8f;
    font-size: .12rem;
  }
  .left .count span{
    color:#EC5151;
  }
  .left .center{
    box-sizing:border-box;
    width: .55rem;
    height:.4rem;
    margin-top:-0.05rem;
    margin-left:.3rem
  }
  .left .center img{
    width: 100%;
    height: 100%;
  }
  .right{
    width:30%;
    padding-right: .1rem;
    padding-top: .1rem;
    text-align: right;
    background:#FF8000 ;
  }
  .money{
    color:#fff;
    font-size: .13rem;
  }
  .money span{
    font-size: .18rem;
  }
  .type{
    font-size: .12rem;
    color:#fff;
  }

  /*备用页面  */
  .share-page {
    /*padding: 1.5rem 25%;*/
    color: #999;
    margin-top: 1rem;
    /*background: #f8f8f8;*/
    text-align:center;
  }

  .share-page  .iconfont {
    font-size: .7rem;
  }

  .share-page .p {
    font-size: .14rem;
  }

  .share-page .look-btn {
    width: .7rem;
    height: .35rem;
    font-size: .14rem;
    border-radius: .03rem;
    margin-top: .15rem;
    background: #ff4f4f;
    outline: none;
    color: #ddd;
  }














</style>
