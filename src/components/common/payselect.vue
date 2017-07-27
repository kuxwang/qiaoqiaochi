<template>
  <div class="main">
    <section>
      <mt-header fixed title="支付" class="ocolor">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>
    </section>
    <ul class="order-info">
      <li class="order-cell">
        <div class="left">订单号</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">支付金额</div>
        <div class="right">¥2.00元</div>
      </li>

    </ul>
    <div class="pay-type">
      <span class="iconfont w">&#xe605;</span>
      <label for="one">微信</label>
      <input type="radio" id="one" value="1" v-model="picked" checked>
    </div>
    <div class="pay-type">
      <span class="iconfont a">&#xe65b;</span>
      <label for="two">支付宝</label>
      <input type="radio" id="two" value="2" v-model="picked">
    </div>
    <button class="pay">支付{{picked}}</button>
  </div>
</template>


<script>
  export default {
      data(){
          return {
              picked:1
          }
      },
      methods: {
          pay(){
              if(this.picked==1){

              }else if(this.picked==2){

              }
          }
      },
      created(){

      }
  }



</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  .main {
    font-size: 0.16rem;
    text-align: left;
  }
  .order-info {
    margin-top: 0.5rem;
    padding: 0 0.1rem;
  }
  .order-cell {
    display: flex;
    border: none;
    height: 0.4rem;
    text-align: left;
    border-bottom: 1px solid #eee;
    line-height: 0.4rem;
  }
  .left {
    flex: 1;
  }
  .right {
    flex: 3.5;
    text-align: right;
  }
  .pay-type {
    height: 0.4rem;
    position: relative;
    padding: 0 0.1rem;
    border-bottom: 1px solid #eee;
    line-height: 0.4rem;
  }
  .pay-type input {
    position: absolute;
    right: 0.15rem;
    top:0.085rem;
  }
  .a {
    color: #1296db;
    font-size: 0.2rem;
  }
  .w {
    color: #1afa29;
    font-size: 0.2rem;
  }
  button.pay {
    display: block;
    width: 3.525rem;
    height: .4rem;
    -webkit-border-radius: 0.02rem;
    -moz-border-radius: 0.02rem;
    border-radius: 0.02rem;
    background-color: #F5751D;
    -webkit-box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);
    box-shadow: 0 0.01rem 0.03rem rgba(138, 138, 138, .3);
    border: none;
    margin: 0.1rem auto;
    color: #fff;
    outline: none;
  }

</style>

