<template>
  <transition name="slide">
    <div class="main drawback-header">
      <mt-header title="申请退款" class="ocolor">
        <a @click="goBack" slot="left" >
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <div class="drawback-box">
        <ul>
          <li>
            <span>退款原因</span>
            <select name="" id="">
              <option value="">卖家缺货</option>
              <option value="">拍错了/订单信息错误</option>
              <option value="">不想买了</option>
            </select>
          </li>
          <li>
            <span>退款金额</span>
            <span class="drawback-num">99.00</span>
          </li>
          <li>
            <span>退款说明</span>
            <input type="text" placeholder="选填" class="description">
          </li>
        </ul>
      </div>
      <router-link class="drawback-confirm" to="/orderd" tag="button">确认</router-link>
    </div>
  </transition>
</template>
<script>
  import {header} from 'mint-ui';
  export default{
    data(){
      return{

      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';
  .main {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index:30;
    font-size:.15rem;
    overflow:auto
  }
  .drawback-header .mint-header {
    height:.45rem;
  }
  .drawback-box{
    margin:.15rem 0;
    width:100%;
    background: #fff;
  }
  .drawback-box>ul>li{
    text-align: left;
    height:.48rem;
    line-height:.48rem;
    border-bottom:1px solid #ddd;
    padding-left:.1rem;
  }
  .drawback-box>ul>li>span{
    font-size:.13rem;
  }
  select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    /*border: solid 1px #000;*/
    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right right center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
    height:.4rem;
    width:3rem;
    line-height:.38rem;
    padding-left:.1rem;
  }
  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }
  .drawback-num{
    margin-left:.1rem;
  }
  input.description{
    padding-left:.1rem;
  }
  .drawback-confirm{
    width:96%;
    height:.45rem;
    color:#fff;
    font-size:.14rem;
    background:#ff4f4f;
    border-radius:.03rem;
    outline: none;
  }
</style>
