<template>
  <div class="main">
    <section>
      <mt-header title="提现" >
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <div class="title">
      <span class="up">可提现金额（元）</span>
      <span class="down">{{moneylist.allprice}}</span>
    </div>
    <h5>收入</h5>
    <ul class="view">
      <li class="cell">
        累计销售收益
        <span>0元</span>
      </li>
      <li class="cell">
        累计管理收益
        <!--<span class="iconfont">&#xe61b;</span>-->
        <span>0元</span>
      </li>
     <!-- <li class="cell">
        累计消费省钱
        <span>1231元</span>
      </li>-->
    </ul>
    <h5>支出</h5>
    <ul class="view">
      <!--<li class="cell">-->
        <router-link class="cell" :to="{name: 'moneylist'}" tag="li">
        已提现金额
        <span class="iconfont">&#xe61b;</span>
        <span>{{moneylist.allprice}}元</span>
        </router-link>
      <!--</li>-->
    </ul>
    <div class="btn" @click="outmoney">
      提现
    </div>

    <router-view></router-view>
  </div>
</template>
<script>

  import { withdrawals_get, withdrawals_post} from '../../api/api.js'


  export default{
      data(){
          return {
            moneylist:''
          }
      },
    created(){

    },
    mounted(){
      let params={
        data: {
          type:'all',
          page:1,
          psize:10
        }
      }
      withdrawals_get(params,(res)=>{
          if(res.statusCode==1){
            this.moneylist=res.data
            console.log(this.moneylist)
            console.log(res)
          }else {
              console.log('请求失败')
          }
      })
    },
    methods: {
        outmoney(){
          /*let params={
            data: {
              type:'all',
              page:1,
              psize:10
            }
          }
          withdrawals_get(params,(res)=>{
            console.log(res)

          })*/
        }
    }

  }






</script>


<style scoped>
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: auto;
    z-index: 2;
  }
  .title {
<<<<<<< HEAD
    margin: .1rem 0 0.1rem 0;
=======
    /*margin: .5rem 0 0.1rem 0;*/
>>>>>>> a6c7482bfab57413b6195b8681ca8823bd02bf3e
    width: 100%;
    text-align: center;
    height: 2rem;
    background-color: #f5751d;
    margin-bottom: 0.1rem;

  }
  .title span {
    display: block;
    color: #fff;
  }
  .up {
    font-size: .18rem;
    position: relative;
    top:.6rem;
  }
  .down {
    font-size: .28rem;
    position: relative;
    top:.75rem;
  }
  h5 {
    text-align: left;
    font-size: .14rem;
    color: #666;
    line-height: 2.5;
    margin-bottom: .05rem;
    background-color: #fff;
    padding: 0 0.1rem;

  }

  .view {
    background-color: #fff;
    margin-bottom: .1rem;
  }
  .cell {
    border-bottom: 1px #eee solid;
    text-align: left;
    line-height: 2.5;
    padding: 0 0.1rem;
  }
  .cell span {
    float: right;
  }
  .btn {
    display: block;
    width: 96%;
    margin: 0 auto;
    height: .35rem;
    background-color: #f5751d;
    color: #fff;
    line-height: .35rem;

  }
  .mint-header {
    z-index: 3;
  }



</style>
