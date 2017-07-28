<template>
  <div class="main2">
    <mt-header fixed title="订单详情" class="ocolor">
      <router-link to="/extension" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div class="title">预计可提现金额<span>¥3.51</span></div>
    <ul class="order-info">
      <li class="order-cell">
        <div class="left">订单号</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">订单状态</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">下单时间</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">订单金额</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">粉丝昵称</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">粉丝ID</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">是否拼团</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">直接奖励</div>
        <div class="right">213123131</div>
      </li>
      <li class="order-cell">
        <div class="left">备注</div>
        <div class="right">213123131</div>
      </li>
    </ul>

  </div>

</template>


<style scoped>
  .main2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: auto;
    z-index: 200;
  }
  .title {
    height: 0.48rem;
    border-bottom: 1px solid #eee;
    padding: 0.1rem;
    margin-top: 0.5rem;
    text-align: left;
    line-height: 0.28rem;
  }
  .title span {
    float: right;
    font-size: 0.24rem;
  }
  .order-info {
    width: 100%;
    padding: 0 0.1rem;
    color: #666;
  }
  .order-cell {
    display: flex;
    border: none;
    height: 0.3rem;
    text-align: left;
  }
  .left {
    flex: 1;
  }
  .right {
    flex: 3.5;
    text-align: right;
  }
</style>
