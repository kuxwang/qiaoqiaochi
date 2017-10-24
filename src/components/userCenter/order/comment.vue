<template>
  <div class="main">
    <mt-header title="评价" fixed>
      <!--<router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>-->
      <a @click="submit()" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <!--<div class="container">-->
      <ul class="container">
        <li v-for="(i,index) in list">
          <div class="order">
            <div class="logo">
              <img :src="i.thumb"/>
            </div>
            <div class="info">
              <h5>{{i.title}}</h5>
              <div class="type">暂无商品规格</div>
              <div class="price">￥{{i.price}}</div>
            </div>
          </div>
          <div class="eval">
           <span>评分:</span>
            <v-star :id="index"></v-star>
          </div>
          <textarea placeholder="这次买的商品满意吗，写点心得给其他顾客参考吧。长度在6-140字之间">
          </textarea>
        </li>
      </ul>
    <!--</div>-->
  </div>
</template>

<script>
  import {Comments_view} from '../../../api/api';
  import vStar from '../../mode/star';

  export default {
    data(){
      return {
        list:[]
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      init(){
        let params={
          data:{
            orderid: this.$route.query.id
          }
        }
        Comments_view(params,(res)=>{
          if(res.statusCode==1){
            console.log('可评价数据')
            console.log(res)
            this.list=res.data
          }
        })


      },
      submit(){
        let params={
          'orderid': this.$route.query.id
        }
        let len=this.list.length;
        /*for (let i=0;i<len;i++){
          params.i=this.$refs.i.level
        }*/

        /*console.log(this)


        console.log(params)*/
      }







    },
    created(){
      this.init()
    },
    components:{
      vStar:vStar
    }

  }
</script>

<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .main {
    .page-view(1);
  }
  .container {
    margin-top: .45rem;
    .scroll-view(100%);
    li {
      width: 100%;
      .order {
        display: flex;
        padding:.15rem;
        background:#f8f8f8;
        align-items:center;
        position:relative;
        .logo {
          width: .9rem;
          height: .9rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          flex: 1;
          height: .9rem;
          text-align: left;
          margin-bottom: .025rem;
          margin-left: .325rem;
          /*overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;*/
          .text-overflow(3);
          font-size: .13rem;
          h5 {
            width:100%;
            display:block;
            color:#333;
            font-size: .15rem;
            margin-bottom: .05rem;
            line-height: .22rem;
            .text-overflow(2)
          }
          .type {
            width:100%;
            display:block;
            color:#999;
            height:.225rem;
            margin-bottom:.0225rem;
            .text-overflow(1);
            font-size: .13rem;
            line-height: .22rem;
          }
          .price {
            color:#333;
            margin-top: .075rem;
            font-size: .13rem;
            line-height: .22rem;
          }


        }
      }
      .eval {
        display: flex;
        padding: 0 .15rem;
        span {
          display: block;
          margin-right: .1rem;
        }
        .eval_star {
          flex: 1;
        }
      }
      textarea {
        width: 3.25rem;
        height: 1rem;
        padding: .1rem;
        margin: 0 auto;
        background-color: #f5f5f5;
        font-size: .14rem;
        outline: none;
      }
    }

  }








</style>
