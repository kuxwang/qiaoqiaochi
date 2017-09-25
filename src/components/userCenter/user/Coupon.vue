<template>
  <div class="page">
    <mt-header title="优惠券" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="coupon__num">
        <span class="up">优惠券余额（元）</span>
        <span class="down">{{money}}</span>
      </div>
      <div class="title">交易明细</div>
      <ul class="coupon__list">
        <li class="coupon__cell">
          <div class="logo">
            <img src=""/>
          </div>
          <div class="info">
            <h5>优源定制纸巾</h5>
            <span class="time">09-05 11:12</span>
          </div>
          <div class="price">-99.00</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        money:'999',
        list:[]
      }
    },
    methods:{
      init(){

      }
    },
    created(){

    }
  }
</script>



<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .page {
    .page-view(1);
  }
  .container {
    .coupon__num{
      margin-top: .45rem;
      width: 100%;
      text-align: center;
      height: 1.7rem;
      background-color: #27241f;
      span {
        display: block;
        color: #fff;
        text-align: left;
        padding-left: .15rem;
      }
      .up {
        font-size: .16rem;
        position: relative;
        top: .4rem;
      }
      .down {
        font-size: .56rem;
        position: relative;
        top: .55rem;
      }

    }
    .title {
      text-align: left;
      padding: 0 .16rem;
      font-size: .16rem;
      line-height: .36rem;
      border-bottom: 1px solid #e7e7e7;
    }
    .coupon__list {
      .coupon__cell {
        #img-text>.list(.75rem);
        padding: .145rem .1rem;
        border-bottom: 1px solid #e7e7e7;
        .logo {
          #img-text>.logo(.46rem)
        }
        .info {
          #img-text>.info(1);
          margin-left: .15rem;
          text-transform: uppercase;
          h5 {
            .text-overflow(@l:1);
            font-size: .16rem;
            color: #333;
            margin-bottom: .08rem;
          }
          span {
            .text-overflow(@l:1);
            font-size: .12rem;
            color: #666;
          }

        }
        .price {
          max-width: 1rem;
          font-size: .18rem;
          font-weight: bold;
          text-transform: uppercase;
          color: #333;
          line-height: .45rem;

        }
      }

    }

  }

</style>

