<template>
  <div class="mian1">
    <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">-->
    <ul class="p-list" v-if="searched">
      <li class="p-cell" v-for="(i,index) in orderlist" @click="orderinfo(index)">
      <!--<li class="p-cell" @click="orderinfo(index)">-->
        <div class="up">
          <span class="ordernum">订单编号{{i.ordersn}}</span>
          <span class="time">{{i.createtime}}</span>
        </div>
        <div class="down">
          <div class="logo">
            <img :src="i.thumb"/>
          </div>
          <div class="info">
            <h5>{{i.nickname}}</h5>
            <span>{{i.mid}}</span>
          </div>
          <div class="ordertype">
            <span v-if="i.status">已完成</span>
            <span>￥{{i.price}}</span>
          </div>
        </div>
      </li>
    </ul>

    <div v-else class="tips">
      <span class="iconfont">&#xe66f;</span>
      未搜索到订单<br>
      请您重新搜索
    </div>

  </div>
</template>

<script>
  import { Loadmore } from  'mint-ui'
  import {orderStatistics,orderLists,orders} from '../../api/api';
  import {mapMutations,mapGetters} from 'vuex'
  export default{
    data(){
      return {
        thumb:require('../../assets/images/userinfo-02.png'),
        orderlist:{},
        searched:true
      }
    },
    components: {
      Loadmore
    },
    methods: {
      loadTop(){

      },
      loadButtom(){

      },
      allLoaded(){

      },
      orderinfo(index){
        this.ordersn(this.orderlist[index].ordersn);
        this.$router.push({name: `orderinfo`})
      },
      ...mapMutations({
        ordersn:'ORDERSN',
      })
    },
    mounted(){
        console.log(typeof (this.searchnum))
      console.log(this.searchnum.length)
      if(this.searchnum.length==20){
           var obj={
              ordersn:this.searchnum
            }
      }else if(this.searchnum.length==7) {
        obj={
          mid:this.searchnum
        }
      }
      let params={
        data: obj
        /*data: {
          ordersn:this.searchnum
        }*/
      }
      orders(params,(res)=>{
        if(res.statusCode==1){
          if(this.searchnum.length==20){
              let obji=[];
              obji.push(res.data.order)
              if(obji.length<=0 ){
                this.searched=false
              }else {
                this.orderlist=obji
              }

            console.log(this.orderlist)
          }else {
            this.orderlist=res.data.order;
            console.log(this.orderlist)
          }

        }else {
          console.log('请求失败');
          console.log(this.searchnum)
        }
      })
    },
    computed: {
      ...mapGetters([
        'searchnum',
      ])
    }

  }
</script>


<style scoped>
  .p-list {
    display: block;
    margin-bottom: .5rem;
    height: 4.68rem;
    overflow: hidden;
    overflow-y: scroll;

  }

  .mian1 {
    position: fixed;
    top: 2.05rem;
    width: 100%;
    /*height: 100%;*/
    background: #eee;
    z-index: 10;
    overflow: hidden;
  }
  .usertime {
    position: absolute;
    right: 0;
    bottom:0.05rem;
    font-size: 0.12rem;
  }


  .p-cell {
    display: flex;
    flex-direction: column;
    padding:  0;
    margin-top: 0.05rem;
    background-color: #fff;
    border-top:1px solid #eee;
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
    vertical-align: middle;
    display: block;
  }
  .ordertype {
    flex: 3;
    padding: 0.05rem 0;
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

  .tips {
    text-align: center;
    font-size: .14rem;
    color: #666;
    margin-top: 1rem;

  }
    .tips .iconfont {
      display: block;
      font-size: .8rem;
    }

</style>
