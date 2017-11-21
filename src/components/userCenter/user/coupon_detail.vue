<template>
  <div class="main">
    <mt-header title="悄悄吃" fixed>
    <!--  <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>-->
      <a @click="goBack()" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container">
      <div class="top">
        <div class="img">
          <div class="lfSide">
            <span>{{couponname}}</span>
            <div>有效期至{{timestr}}</div>
          </div>
          <div class="rtSide">
            <div>消费任意金额</div>
            <span>{{backstr}}￥{{deduct}}</span>
          </div>
        </div>
        <div class="text_content">
          <div class="flex getType border_bottom">
            <span class="fontBold get">获得方式</span>
            <!--<span class="freeGet get">{{gettypestr}}</span>-->
            <span class="freeGet get">{{gettypestr}}</span>
          </div>
          <div class="fontBold get border_bottom">使用说明</div>
          <div class="instru" v-html="desc">

          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left" v-if="canget">您可领取{{getmax}}张</div>
        <div class="left" v-else>您已领取过</div>
        <div class="right" v-if="canget" @click="getCoupon">立即领取</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Coupons_detail,Coupons_get } from '../../../api/api';
  export default {
    data(){
      return {
        timestr:'',
        backstr: '',
        desc: '',
        couponname:'',
        deduct:'',
        canget:'',   //可以领取几张
        getmax:'', //最大领取几张
        enough:'', //满多少可以使用
        gettypestr:'', //满多少可以使用

      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      init(){
        let params={
          data:{
            couponid:this.$route.query.id
          }
        }
        Coupons_detail(params,(res)=>{
          console.log(res)
          if(res.statusCode==1){
            this.timestr =res.data.timestr;
            this.backstr =res.data.backstr;
            this.desc =res.data.desc;
            this.couponname =res.data.couponname;
            this.deduct =res.data.deduct;
            this.canget =res.data.canget;
            this.getmax =res.data.getmax;
            this.enough =res.data.enough;
            this.gettypestr =res.data.gettypestr;
          }
        })
      },
      getCoupon(){
        let params={
          data:{
            couponid:this.$route.query.id
          }
        }
        Coupons_get(params,(res)=>{
          if(res.statusCode ==1){
              console.log(res);
              this.$router.go(-2)
          }
        })
      }
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
    .page-view(3);
  }
  .container {
    /*margin-top: .45rem;*/
    padding-top: .45rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
      flex: 1;
      width: 96%;
      margin: .1rem auto;
      .img {
        background-color:#FF8000;
        color:#fff;
        height:1.5rem;
        position:relative;
        font-size: .15rem;
        padding: .15rem;
        line-height: .2rem;
        .lfSide {
          text-align: left;
          margin-bottom: .15rem;
          span {
            font-size: .19rem;
            line-height: .25rem;
          }
        }
        .rtSide {
          text-align: right;
          span {
            font-size: .19rem;
            line-height: .25rem;
          }
        }
      }
      .text_content {
        margin-top: .1rem;
        padding-bottom: .1rem;
        border:1px solid #EAEAEA;
        .getType{
          display: flex;
          .fontBold{
            text-align:left;
            padding-left:.1rem;
            font-weight:600;
            font-size: .15rem;
            border-bottom:1px solid #EEE;
          }
          .get {
            height:.35rem;
            line-height:.35rem;
            flex: 1;
          }
          .freeGet {
            text-align:right;
            padding-right: .1rem;
            color:#FF8000;
            font-size: .15rem;
          }
        }
        .fontBold{
          text-align:left;
          padding-left:.1rem;
          font-weight:600;
          font-size: .15rem;
          line-height: .35rem;
          border-bottom:1px solid #EEE;

        }
        .instru {
          padding: .1rem;
          font-size: .13rem;
          text-align: left;
        }





      }





    }
    .bottom {
      height: .5rem;
      width: 100%;
      display: flex;
      font-size: .15rem;
      line-height: .5rem;
      color:#fff;
      .left {
        flex: 1;
        /*background:#000;
        opacity: 0.5;*/
        background:#BFBFBF;
      }
      .right {
        width: 40%;
        background:#FF8000;
      }


    }
  }








</style>
