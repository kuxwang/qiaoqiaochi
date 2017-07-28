<template>
  <div class="mian1">


    <ul class="p-list">
      <!--<li class="p-cell"  v-for="n in 2">
        <div class="logo">
          <img src="../../assets/images/shoppingCart-01.jpg"/>
        </div>
        <div class="info">
          <h5>名字</h5>
          <span>123112</span>
          <span class="usertime">关注</span>
        </div>
      </li>-->


      <router-link to="/orderinfo" tag="li" class="p-cell" v-for="n in 1">
        <div class="up">
          <span>订单编号</span>
          <span class="time">2017-7-23 32：23：23</span>
        </div>
        <div class="down">
          <div class="logo">
            <img src="../../assets/images/shoppingCart-01.jpg"/>
          </div>
          <div class="info">
            <h5>名字</h5>
            <span>123112</span>
          </div>
          <div class="ordertype">
            <span>已发货</span>
            <span>￥0.36</span>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<style scoped>
  .p-list {
    display: block;
    background-color: #fff;
    /*margin-top: 0.5rem;*/
  }
  .p-cell {
    /* display: flex;
     height: 0.78rem;
     padding: 0.1rem 0.2rem;
     border-top:1px solid #e2e2e2;*/

    display: flex;
    flex-direction: column;
    padding:  0;
    margin-top: 0.05rem;
    background-color: #fff;
    border-top:1px solid #e2e2e2;
  }
  .logo {
    flex: 1;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.2rem;
    position: relative;
  }
  .info h5 {
    margin-top: 0.1rem;
    color: #27272f;
    font-size: 0.14rem;
  }
  .info span {
    font-size: 0.14rem;
    color: #666;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
  }
  .mian1 {
    position: fixed;
    top: 2.05rem;
    width: 100%;
    height: 100%;
    background: #eee;
    z-index: 10;
  }
  .usertime {
    position: absolute;
    right: 0;
    bottom:0.05rem;
    font-size: 0.12rem;
  }

  .up {
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    padding: 0 0.1rem;
    line-height: 0.32rem;
    font-size: 0.12rem;
    color: #27272f;

  }

  .up .time {
    float: right;
    font-size: 0.12rem;

  }

  .down {
    flex: 2.5;
    height: 0.68rem;
    display: flex;
    padding: 0 0.1rem;
  }
  .logo {
    flex: 1;
    padding: 0.1rem 0;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.1rem;
    padding: 0.05rem 0;
    color: #666;
  }
  .info h5 {
    margin: 0.05rem 0;
    color: #666;
  }
  .info span {
    color: #000;
    font-size: 0.14rem;
    color: #666;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
    vertical-align: middle;
    display: block;
  }
  .ordertype {
    flex: 3;
    padding: 0.05rem 0.2rem;
    color: #666;
  }
  .ordertype span {
    display: block;
    text-align: right;
    font-size: 0.14rem;
    margin-top: 0.05rem;
  }
  .ordertype span:last-child {
    margin-top: 0.1rem;
  }

</style>
