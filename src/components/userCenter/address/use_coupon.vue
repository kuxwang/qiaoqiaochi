<template>
  <div class="main">
    <mt-header title="使用优惠券" fixed>
     <!-- <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>-->
      <a @click="goBack()" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container">
        <ul class="list">
          <li v-for="(item,index) in list" :key="index" @click="use(item)">
            <div class="left">
              <div>
                <div class="title">
                  {{item.couponname}}
                </div>
                <div class="time">
                  有效期至 {{item.timestr}}
                </div>
              </div>
              <!-- <div class="center" v-if="curNav==1">
                 <img :src="isused" />
               </div>
               <div class="center" v-if="curNav==2">
                 <img :src="overdate" />
               </div>-->
            </div>
            <div class="right">
              <div class="money">
                ￥<span>{{item.backmoney}}</span>
              </div>
              <div class="type">{{item.backstr}}</div>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import { Coupons_mypay } from '../../../api/api';
  import {mapMutations, mapState, mapGetters} from 'Vuex';
  export default {
    data(){
      return {
        list:[]
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      init(){
        let params={
          data:{
            goods:this.$route.query.goods
          }
        }
        Coupons_mypay(params,(res)=>{
          if(res.statusCode==1){
            this.list=res.data
            console.log(res.data)
          }
        })
      },
      use(i){
        this.myCoupon(i);
        this.goBack();
      },
      ...mapMutations({
        'myCoupon': 'MYCOUPON',
      })
    },
    created(){
      this.init()
    }

  }
</script>


<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .main {
    .page-view(2);
  }
  .container {
    margin-top: .45rem;
    .scroll-view(100%);
    .list {
      li {
        box-sizing: border-box;
        width: 94.6%;
        margin: .1rem auto;
        background: #fff;
        border:1px solid #eee;
        display: flex;
        .left {
          width:70%;
          padding: .1rem;
          display:flex;
          text-align: left;
          div {
            margin-bottom: .02rem;
          }
          .title{
            font-size: .14rem;
            color:#000;
          }
          .time{
            color:#8f8f8f;
            font-size: .13rem;
          }
          .count{
            color:#8f8f8f;
            font-size: .12rem;
            span{
              color:#EC5151;
            }
          }
          .center{
            box-sizing:border-box;
            width: .55rem;
            height:.4rem;
            margin-top:-0.05rem;
            margin-left:.3rem;
            img{
              width: 100%;
              height: 100%;
            }

          }
        }
        .right{
          width:30%;
          padding-right: .1rem;
          padding-top: .1rem;
          text-align: right;
          background:#FF8000 ;
          .money{
            color:#fff;
            font-size: .13rem;
            span{
              font-size: .18rem;
            }
          }
          .type{
            font-size: .12rem;
            color:#fff;
          }
        }

      }
    }

  }








</style>
