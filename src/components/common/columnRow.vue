<template>
  <div class="column">
    <div class="title">
      热门商品
    </div>
    <div class="title-bg">
      HOT PRODUCT
    </div>
    <div class="scroll">
      <ul class="scroll-goodslist clear">
          <router-link  v-for="(v,k) in list" :to="{name:'details',query:{id:v.id}}" tag="li" class="scroll-goodslist-li" :key="k">

          <img :src="v.thumb" alt="">
          <p class="goodstitle lr1">
            {{v.title}}
          </p>
          <p class="price">
            ￥{{v.marketprice}}
            <span>￥{{v.productprice}}</span>
          </p>
          </router-link>
      </ul>
      <p>查看所有新品</p>
    </div>
  </div>
</template>
<script>
  import { Attributes} from '../../api/api'
  export default {

    data () {
      return {
          listthumb:require('../../assets/images/home-01.jpg'),
          hot:[]
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
    height:3.55rem;
    background: -webkit-linear-gradient(#fafafa, #ffffff);
    background: -o-linear-gradient(#fafafa, #ffffff);
    background: -moz-linear-gradient(#fafafa, #ffffff);
    background: linear-gradient(#fafafa, #ffffff);
    font-family: PingFang !important;
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
        height:2.1rem;
        overflow: hidden;
        .scroll-goodslist {
          padding: 0 0 0 .25rem;
          height: 100%;
          overflow-x:scroll;
          -webkit-overflow-scrolling: touch;
          white-space: nowrap;
          .scroll-goodslist-li {
            display: inline-block;
            margin-right: .1rem;
            width: 1.4rem;
            height: 100%;
            /*float: left;*/
            text-align:center;
             img {
              width: 1.4rem;
              height: 1.4rem;
              border-radius: .1rem;
             }
             .goodstitle {
               margin-top: .1rem;
               width: 100%;
               height: .3rem;
               font-size: .14rem;
               line-height: .3rem;
               color: #666666;
               /*.text-overflow(1);*/
             }
             .price {
                height: .22rem;
                font-size: .12rem;
                line-height: .22rem;
                color: #e75058;
               span {
                 font-size: .1rem;
                 color: #999;
                 text-decoration: line-through;
               }
              }
          }
        }
      }
  }


</style>
