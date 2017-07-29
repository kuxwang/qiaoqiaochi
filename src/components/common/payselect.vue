<template>
  <div class="main">
    <section>
      <mt-header title="支付">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </section>
    <ul class="order">
      <div class="pic">
        <img src="../../assets/images/confirmorder-01.jpg" alt="">
      </div>
      <div class="details">
        <span class="span1">￥62.00</span>
        <span class="span2">三个先生的韩国炸鸡-81682652881553891012121212</span>
      </div>

    </ul>
    <ul class="pay">
      <li class="num">
        <div class="order-num">
          <span class="iconfont w">&#xe605;</span>
          <label for="one">微信</label>
        </div>
        <div>
          <label class="mint-checklist-label fl">
            <div class="mint-checkbox">
              <input type="checkbox" :checked="isChecked==1" class="mint-checkbox-input" @click="isChecked=1">
              <span class="mint-checkbox-core"></span>
            </div>
          </label>
        </div>
      </li>
      <li class="num">
        <div class="order-num">
          <span class="iconfont a">&#xe65b;</span>
          <label for="one">支付宝</label>
        </div>
        <div>
          <label class="mint-checklist-label fl">
            <div class="mint-checkbox">
              <input type="checkbox" :checked="isChecked==2" class="mint-checkbox-input" @click="isChecked=2">
              <span class="mint-checkbox-core"></span>
            </div>
          </label>
        </div>
      </li>
    </ul>
    <button class="commit ocolor">
      支付订单
    </button>
    <!--<mt-checklist-->
    <!--align="right"-->
    <!--title="右对齐"-->
    <!--v-model="value"-->
    <!--:options="['选项A', '选项B', '选项C']">-->
    <!--</mt-checklist>-->

  </div>
</template>

<script>
  import {Checklist} from 'mint-ui';
  export default {
    data () {
      return {
        payWay: 1, //付款方式
        isChecked: 1
      }
    },
    methods: {
      pay(){
        if (this.picked == 1) {

        } else if (this.picked == 2) {

        }
      }
    },
    created(){

    }
  }


</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  .main {
    font-size: .16rem;
    height: 6.67rem;
    /*background: #fff;*/
  }

  ul {

    background: #fff;
    /*background-color: #efeff4*/
  }

  ul.order {
    width: 100%;
    height: 1rem;
    margin-top: .1rem;
    margin-left: auto;
    margin-right: auto;
    /*border-radius: 5%;*/
    -webkit-box-shadow: 0 .04rem .12rem rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 .04rem .12rem rgba(138, 138, 138, .3);
    box-shadow: 0 .04rem .12rem rgba(138, 138, 138, .3);
  }

  .order > .pic {
    /*display: inline-block;*/
    width: .6rem;
    height: .6rem;
    margin-top: .18rem;
    border-radius: 50%;
    margin-left: .3rem;
    vertical-align: middle;
    float: left
  }

  .order > .pic > img {
    width: 100%;
    border-radius: 50%;
  }

  .order > .details {
    width: 70%;
    float: left;
    margin-top: .24rem;
  }

  .order span {
    display: block;
  }

  .order .span1 {
    padding-left: .2rem;
    font-size: .24rem;
    text-align: left;
  }

  .order .span2 {
    padding-left: .2rem;
    font-size: .1rem;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ul > li {
    display: flex;
    justify-content: space-between;
    line-height: .35rem;
    padding-left: .2rem;
    padding-right: .2rem;
  }

  ul > li:first-child {
    border-bottom: 1px solid #efeff4;
    border-top: 1px solid #efeff4
  }

  ul > li:last-child {
    /*margin-bottom: .3rem;*/
    border-bottom: 1px solid #efeff4;
  }

  ul.pay {
    margin-top: .1rem;

  }

  .payType {
    padding-left: .2rem;
    background-color: #efeff4;
    line-height: .3rem;
    text-align: left;
  }

  ul.pay > li {
    height: .6rem;
    line-height: .6rem;
  }

  .w {
    color: #2ba245;
    font-size: 0.4rem;
    vertical-align: middle;
  }

  .a {
    color: #1296db;
    font-size: 0.4rem;
    vertical-align: middle;
  }

  .commit {
    width: 3.55rem;
    height: .5rem;
    font-size: .16rem;
    color: #fff;
    line-height: .5rem;
    margin-top: .2rem;
    margin-left: auto;
    margin-right: auto;
    -webkit-border-radius: .02rem;
    -moz-border-radius: .02rem;
    border-radius: .02rem;
    /*background-color: #ffcb05;*/
    -webkit-box-shadow: 0 .01rem .01rem rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 .01rem .01rem rgba(138, 138, 138, .3);
    box-shadow: 0 .01rem .01rem rgba(138, 138, 138, .3);
    outline: none;
  }

  .commit:active {
    background-color: #999 !important
  }

  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #F5751D;
    border-color: #F5751D;
  }
</style>

