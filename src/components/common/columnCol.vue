<template>
  <div class="column">
    <div class="title">
      最新商品
    </div>
    <div class="title-bg">
      NEW PRODUCT
    </div>
    <div class="scroll">
      <ul class="scroll-goodslist clear">
        <!--<li class="scroll-goodslist-li" v-for="(v,index) in newgoods">-->
        <router-link  v-for="(v,k) in list" :to="{name:'details',query:{id:v.id}}" tag="li" class="scroll-goodslist-li" :key="k">

          <mt-swipe class="banner" :auto="4000" >
            <!--<mt-swipe-item v-for="(i, k) in slider" :key="k">-->
            <mt-swipe-item>
              <img :src="v.thumb" alt="">
              <!--<img class="silder" :src="i.thumb">-->
            </mt-swipe-item>
          </mt-swipe>
          <!--<img :src="v.thumb"/>-->
          <p class="goodstitle lr2">
            {{v.title}}
          </p>
          <p class="goodscontent lr2">
            我想能找到自己迷恋的东西。语言，冰淇淋，意大利面，什么都行。我想能找到自己迷恋的东西。语言，冰淇淋，意大利面，什么都行。
            我想能找到自己迷恋的东西。语言，冰淇淋，意大利面，什么都行。
            我想能找到自己迷恋的东西。语言，冰淇淋，意大利面，什么都行。
          </p>
          <div class="goodsprice">
            <p class="marketprice">
              ￥{{v.marketprice}}
            </p>
            <div class="buy">购买</div>
          </div>
        </router-link>
        <!--</li>-->

      </ul>
    </div>
  </div>
</template>
<script>
  import { Attributes} from '../../api/api'
  export default {
    data () {
      return {
          listthumb:require('../../assets/images/home-01.jpg'),
          slider:[
            {
              thumb:require('../../assets/images/home-01.jpg')
            },
            {
              thumb:require('../../assets/images/home-01.jpg')
            },
            {
              thumb:require('../../assets/images/home-01.jpg')
            },
            {
              thumb:require('../../assets/images/home-01.jpg')
            }
          ],
          newgoods:[]
      }
    },
    props: ['list'],
    methods: {

    },
    computed: {},
    created(){
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';
  .column {
    position: relative;
    width:100%;
    background: #ffffff;
    .title {
      position: relative;
      width:100%;
      height:.7rem;
      font-family: "SimHei";
      font-size: .17rem;
      font-weight: bold;
      line-height: .7rem;
      z-index: 2;
      &:after{
        content: '°';
        position: absolute;
        top: 0;
        width: .05rem;
        height: .05rem;
        font-size: .40rem;
        color: #a6a6a6;
        z-index: 2;
       }
      }
      .title-bg {
        position: absolute;
        left: 1.12rem;
        top: .4rem;
        width: 1.5rem;
        font-size: .20rem;
        font-family: "STFangsong";
        color: #ede9e9;
        z-index: 1;
        &:before{
           content: '°';
           position: absolute;
           left: -.15rem;
           top: -.20rem;
           width: .05rem;
           height: .05rem;
           font-size: .70rem;
           font-weight: bold;
           color: #ede9e9;
           z-index: 2;
         }
      }
      .scroll {
        width:100%;
        overflow: hidden;
        .scroll-goodslist {
          padding: 0 0 .58rem 0;
          height: 100%;
          -webkit-overflow-scrolling: touch;
          .scroll-goodslist-li {
            height: 100%;
            text-align:center;
            background: -webkit-linear-gradient(#fafafa, #ffffff);
            background: -o-linear-gradient(#fafafa, #ffffff);
            background: -moz-linear-gradient(#fafafa, #ffffff);
            background: linear-gradient(#fafafa, #ffffff);
             .banner {
               height: 3rem
             }
             img {
              width: 3.4rem;
              height: 3rem;
              border-radius: .1rem;
             }
             .goodstitle {
               margin-top: .1rem;
               margin-bottom: .1rem;
               height: .3rem;
               text-align: left;
               font-size: .16rem;
               line-height: .3rem;
               padding: 0 .15rem;
               font-weight: bold;
               color: #494949;
             }
             .goodscontent {
               width: 100%;
               height: .50rem;
               font-size: .16rem;
               text-align: left;
               line-height: .25rem;
               padding: 0 .15rem;
               color: #808080;
             }
             .goodsprice {
               height: .3rem;
               margin: .1rem .15rem;
               text-align: left;
              .marketprice {
                display: inline-block;
                width: 70%;
                height: .22rem;
                left: 0;
                text-align: left;
                font-size: .14rem;
                font-weight: bold;
                line-height: .22rem;
                color: #e75058;
              }
              .buy {
                display: inline-block;
                width: .75rem;
                height: .3rem;
                text-align: center;
                font-size: .16rem;
                line-height: .3rem;
                border:1px solid #3f3f3f;
                border-radius: .05rem;

              }
             }

          }
        }
      }
  }


</style>
