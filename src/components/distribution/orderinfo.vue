<template>
  <div class="main2">
    <mt-header fixed title="订单详情" >
      <router-link to="/extension1" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
  <div class="p-cell">
    <div class="logo">
      <!--<img :src="i.avatar"/>-->
      <img src="../../assets/images/userinfo-02.png"/>
    </div>
    <div class="info3">
      <h5>用户名：{{ordernum.nickname}}<span class="orderid">ID{{ordernum.id}}</span></h5>

      <span class="usertime">手机号：{{ordernum.mobile}}</span>
    </div>
  </div>

    <div class="title">
      <div class="up">
        <span class="ordernum">订单号：{{ordernum.ordersn}}</span>
        <!--<span class="time">2017-7</span>-->
      </div>
      <div class="down">
        <div class="logo2">
          <!--<img :src="i.avatar"/>-->
          <img :src="ordernum.thumb"/>
        </div>
        <div class="info">
          <h5>{{ordernum.title}}</h5>
          <span>{{ordernum.ordersn}}</span>
        </div>
        <div class="ordertype">
          <!--<span>i.status}}</span>-->
          <span>{{parseInt(ordernum.goodsprice)}}元</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li class="user-cell" >
        <div class="user-left">
          <!--<img :src="v.thumb"/>-->
          <div>用户名</div>
        </div>
        <div class="user-mid">
          <span>用户ID</span>
        </div>
        <div class="user-right">
          <span>佣金比例</span>
        </div>
        <div class="user-right">
          <div>佣金额度</div>
        </div>
      </li>
      <li class="user-cell" v-for="v in ordercom" >
        <div class="user-left">
          <!--<img :src="v.thumb"/>-->
          <div>{{v.nickname}}</div>
        </div>
        <div class="user-mid">
          <span>{{v.id}}</span>
        </div>
        <div class="user-right">
          <span>{{v.c_rate}}%</span>
        </div>
        <div class="user-right">
          <div>{{v.c_money}}元</div>
        </div>
      </li>
    </ul>






  </div>

</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';
  import {orders} from '../../api/api';
  export default{
    data () {
      return {
        ordernum:[],
        ordercom:{},
        totalmoney:'',
        nickname:'',
        c_rate:''
      }
    },
    components: {

    },
    methods: {
      ...mapMutations({
        tabselect: 'TABSELECT',
      })
    },
    created(){
      this.tabselect(1)
    },
    mounted(){

      let params={
          data:{
            ordersn:this.ordersn
          }
      }
      orders(params,(res)=>{
        this.ordernum=res.data.order
        this.ordercom=res.data.commssion
        this.totalmoney=res.data.commssion[0].c_money
        this.nickname=res.data.commssion[0].nickname
        this.c_rate=res.data.commssion[0].c_rate
        console.log(this.ordernum)
        console.log(this.ordercom)
        console.log(res)
//        this.totalmoney=res.data.order[0].c_money
      })
    },
    computed:{
      ...mapGetters([
        'ordersn',
      ]),
    }
  }
</script>


<style scoped>
  .main2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: auto;
    z-index: 200;
  }


  .p-cell {
    margin-top: .5rem;
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    border-top:1px solid #e2e2e2;
    background-color: #F5751D;
    width: 96%;
    margin-left: 2%;
    /*margin-top: 0.05rem;*/
  }
  .logo {
    flex: 1;
  }
  .info3 {
    flex: 5;
    text-align: left;
    margin-left: 0.1rem;
    position: relative;
    color: #fff;
  }
  .info3 h5 {
    /*margin-top: 0.1rem;*/
    /*color: #27272f;*/
    font-size: 0.14rem;
    margin-bottom: 0.05rem;
  }
  .info3 span {
    font-size: 0.14rem;
    color: #fff;
  }
  .logo img {
    width: 65%;
    border-radius: 50%;
    display: block;
    margin: 10% auto;
  }


  .title {
    display: flex;
    flex-direction: column;
    /*padding:  0;*/

    background-color: #fff;
    /*border-top:1px solid #eee;*/
    border:1px solid #eee;
    padding: 0.1rem;
    margin-top: 0.1rem;
    width: 96%;
    margin-left: 2%;
  }
  .up {
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #eee;
    padding: 0 0.1rem;
    line-height: .36rem;
  }
  .up .ordernum {
    font-size: 0.12rem;
  }

  .up .time {
    float: right;
    font-size: 0.1rem;

  }

  .down {
    flex: 3;
    height: 0.68rem;
    display: flex;
    padding: 0 0.1rem;
  }
  .logo2 {
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
    /*margin-top: 0.1rem;*/
    color: #27272f;
    font-size: 0.14rem;
  }
  .down .info h5 {
    margin-top: 0.1rem;
  }
  .info span {
    font-size: 0.14rem;
    color: #666;
  }
  .logo2 img {
    width: 100%;
    border-radius: 50%;
    vertical-align: middle;
    display: block;

  }
  .ordertype {
    flex: 2;
    padding: 0.05rem 0;
    color: #F5751D;
  }
  .ordertype span {
    display: block;
    text-align: right;
    font-size: 0.28rem;
    margin-top: 0.05rem;
  }
  .ordertype span:last-child {
    margin-top: 0.1rem;
  }


  .user-list {
    width: 96%;
    margin-left: 2%;
    border: 1px solid #eee;
    margin-top: 0.1rem;
  }
  .user-cell {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: .1rem 0;
    background-color: #fff;
  }

  .user-left {
    flex: 1;
  }
.user-mid,.user-right {
    flex: 1.5;

  }
  .orderid {
    margin-left: 0.2rem;
  }









</style>
