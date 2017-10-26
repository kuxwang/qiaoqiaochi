<template>
  <div class="main">
    <mt-header title="评价" fixed>
      <a @click="goBack()" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
      <div slot="right" @click="submit()">
        提交
      </div>
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
            <!--<v-star :len="5" :level="3"></v-star>-->
            <div class="eval_star">
              <div class="star" v-for="(s,idx) in 5" @click="setLevel(index,idx)">
                <img :src="star" v-if="level[index]>=idx+1">
                <img :src="starnull" v-else>
              </div>
            </div>
          </div>
          <textarea placeholder="这次买的商品满意吗，写点心得给其他顾客参考吧。长度在6-140字之间" v-model="text[index]">
          </textarea>
        </li>
      </ul>
    <!--</div>-->
  </div>
</template>

<script>
  import {Comments_view,Comments_save} from '../../../api/api';
//  import vStar from '../../mode/star';

  export default {
    data(){
      return {
        list:[],
        level:[],
        star: require('../../../assets/images/star.png'),
        starnull: require('../../../assets/images/starnull.png'),
        text:[]
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
            console.log(res)
            this.list=res.data;
            let arr=[];
            for(let i=0;i<res.data.length;i++){
              arr.push(5);
            }
            this.level=arr;
            console.log('this.level')
            console.log(this.level)
          }
        })
      },
      setLevel(i,s){
        this.$set(this.level, i, s+1);
        console.log(this.level)
      },
      submit(){
        let params={
          data:{
            'orderid': this.$route.query.id
          }
        }
        let len=this.list.length;
        for(let i=0;i<len;i++){
          params.data[`columns[${i}][goodsid]`]=this.list[i].id;
          params.data[`columns[${i}][level]`]=this.level[i];
          params.data[`columns[${i}][content]`]=this.text[i];
        }
        Comments_save(params,(res)=>{
          if(res.statusCode ==1 ){
            this.$router.go(-1)
          }else {
            console.log(res.data)
          }
        })
      }
    },
    created(){
      this.init()
    },
    components:{
//      vStar:vStar
    },
    watch:{
     /* text(a){
        console.log(a)
      }*/
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
          line-height: .29rem;
        }
        .eval_star {
          flex: 1;
          display: flex;
          width: 100%;
          .star {
            img {
              width: 100%;
              height: 100%;
            }
          }
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
