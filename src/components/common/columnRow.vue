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
        <li class="scroll-goodslist-li">
          <img :src="listthumb" alt="">
          <p class="goodstitle">
            骨瓷碗盆
          </p>
          <p class="price">
            ￥39
          </p>
        </li>
        <li class="scroll-goodslist-li">
          <img :src="listthumb" alt="">
          <p class="goodstitle">
            骨瓷碗盆
          </p>
          <p class="price">
            ￥39
          </p>
        </li>
        <li class="scroll-goodslist-li">
          <img :src="listthumb" alt="">
          <p class="goodstitle">
            骨瓷碗盆
          </p>
          <p class="price">
            ￥39
          </p>
        </li>
        <li class="scroll-goodslist-li">
          <img :src="listthumb" alt="">
          <p class="goodstitle">
            骨瓷碗盆
          </p>
          <p class="price">
            ￥39
          </p>
        </li>
      </ul>
      <p>查看所有新品</p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
          listthumb:require('../../assets/images/home-01.jpg')
      }
    },
    props: [],
    methods: {},
    computed: {},
    created(){

    }
  }
</script>
<style lang="less" scoped>
  .column {
    position: relative;
    width:100%;
    height:3.55rem;
    background: -webkit-linear-gradient(#fafafa, #ffffff);
    background: -o-linear-gradient(#fafafa, #ffffff);
    background: -moz-linear-gradient(#fafafa, #ffffff);
    background: linear-gradient(#fafafa, #ffffff);
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
               height: .3rem;
               font-size: .14rem;
               line-height: .3rem;
               color: #666666;
             }
             .price {
                height: .22rem;
                font-size: .12rem;
                line-height: .22rem;
                color: #e75058;
              }
          }
        }
      }
  }


</style>
