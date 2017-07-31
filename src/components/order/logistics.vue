<template>
  <div class="main order-detail-header">
    <mt-header title="查看物流" class="mylogistics">
      <a @click="goBack" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="buyer-info">
      <div class="buyer-info-box">
        <div class="iconfont" >
          &#xe66f;
        </div>
        <ul class="order-state">
          <!--<li>物流单位</li>-->
          <li>运单编号：{{expsn}}</li>
        </ul>
      </div>
    </div>
    <div class="product-info-box">
      <div class="pib-header">
        <span class="iconfont">&#xe6ce;</span>
        物品信息
      </div>
      <!--<router-link class="good-info" to="/details" tag="div">-->
        <div class="good-info" @click="jumpGoodslink()">
          <img :src="thumb" alt="" class="order-small">
          <p>{{title}}</p>
          <div class="good-price">
            <p>￥{{price}}</p>
            <p>×{{total}}</p>
          </div>
        </div>

      <!--</router-link>-->
    </div>
    <div class="logistics-info">
      <div class="pib-header">
        <span class="iconfont">&#xe606;</span>
        物流跟踪
      </div>
      <ul v-for="(v,i) in arr">
        <li>
          <b></b>
          <p class="first">{{v.context}}</p>
          <p>{{v.time}}</p>
        </li>
        <!--<li>-->
          <!--<b></b>-->
          <!--<p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>-->
          <!--<p>2017-07-22 22:12:22</p>-->
        <!--</li>-->
        <!--<li>-->
          <!--<b></b>-->
          <!--<p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>-->
          <!--<p>2017-07-22 22:12:22</p>-->
        <!--</li>-->
        <!--<li>-->
          <!--<b></b>-->
          <!--<p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>-->
          <!--<p>2017-07-22 22:12:22</p>-->
        <!--</li>-->
        <!--<li>-->
          <!--<b></b>-->
          <!--<p class="first">【北京中南海初始站已经打包发货】下一站【无锡市委】</p>-->
          <!--<p>2017-07-22 22:12:22</p>-->
        <!--</li>-->
      </ul>
      <div v-show="isShow" class="none-tran">很抱歉！未查到相关物流信息</div>
    </div>
  </div>
</template>
<script>
  import { Header} from 'mint-ui'
  import { mapState} from 'Vuex'
  import { expressInfo ,orderDetail} from '../../api/api.js'
  export default {
    data(){
      return{
        exp:'',
        expsn:'',
        isShow:false,
        goods:'',
        price:'',
        thumb:'',
        title:'',
        total:'',
        arr:''
//        marketprice:''
      }
    },
    computed:{
      ...mapState([
        'orderdetails'
      ])
    },
    methods:{
      goBack:function () {
        this.$router.go(-1)
      },
      jumpGoodslink () {
        this.$router.push({path:'details',query:{goodsid:orderdetails.goods.id}})
      }
    },
    created:function () {
      var that=this;
      this.exp=this.$route.query.exp;
      this.expsn=this.$route.query.expsn;
      let params={
        data:{
          express:that.exp,
          expresssn:that.expsn
        }
      }
      expressInfo(params,function (res) {
        console.log(res)
        that.arr=res.data
        if(res.data.errno){
          that.isShow=true;
        }
      });
      let param={
        data:{
          orderid:this.$route.query.id
        }
      }
      orderDetail(param,function (res) {
        that.price=res.data.goods.price;
        that.title=res.data.goods.title;
        that.thumb=res.data.goods.thumb
        that.total=res.data.goods.total
      })
    }
  }
</script>
<style scoped>
  .main{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size:.15rem;
    overflow:auto;
    z-index:20;
    color:#666;
  }
  .none-tran{
    padding:.2rem;
    font-size:.15rem;
  }
  .buyer-info{
    height:.6rem;
    width:100%;
    margin-bottom:.1rem;
  }
  .buyer-info-box{
    height:.6rem;
    width:100%;
    position:relative;
    background:#fff;
  }
  .buyer-info-box>div.iconfont{
    position:absolute;
    left:.08rem;
    top:.1rem;
    font-size:.35rem;
  }
  .order-state{
    position:absolute;
    left:.5rem;
    top:.2rem;
  }
  .order-state li{
    text-align: left;
    color:#000;
    font-size:.13rem;
    margin-bottom:.03rem;
  }
  .product-info-box{
    background: #fff;
    padding:0 .1rem;
    height:1.2rem;
    margin-bottom:.1rem;
  }
  .pib-header{
    text-align: left;
    padding:.08rem .05rem;
    border-bottom:1px solid #ddd;
  }
  .pib-header>span{
    margin-right:.05rem;
  }
  .good-info{
    height:.7rem;
    padding:.08rem 0;
    border-bottom:1px solid #ddd;
  }
  .order-small{
    width:.5rem;
    height:.5rem;
    border:1px solid #ddd;
  }
  .good-info>img{
    float:left;
  }
  .good-info>p{
    float:left;
    margin-left:.08rem;
    font-size:.13rem;
  }
  .good-price{
    float:right;
    font-size:.13rem;
  }
  .good-price>p{
    text-align: right;
    margin-bottom:.02rem;
  }
  .logistics-info{
    background: #fff;
    padding:.1rem .15rem;
    margin-bottom:1rem;
  }
  .logistics-info>div.pib-header>span.iconfont{
    font-size:.2rem;
    /*line-height:.3rem;*/
  }
  .logistics-info>ul{
    margin:.1rem 0;
    margin-left:.05rem;
    padding-left:.3rem;
    text-align:left;
    border-left:1px solid #ddd;
  }
  .logistics-info>ul>li{
    border-bottom:1px solid #ddd;
    padding:.1rem 0;
    padding-right:.3rem;
    font-size:.13rem;
    position:relative;
  }
  .logistics-info>ul>li:first-child{
    color:#F5751D;
  }
  .logistics-info>ul>li:first-child>b{
    background:#F5751D ;
  }
  .logistics-info>ul>li>b{
    position: absolute;
    left:-.35rem;
    top:.05rem;
    width:.1rem;
    height:.1rem;
    border-radius:50%;
    background: #ddd;
  }
  .logistics-info>ul>li>p{
    line-height: .24rem;
  }
  .logistics-info>ul>li>p.first{
    margin-bottom:.2rem;
  }
  .logistics-info>ul>li:last-child{
    border-bottom: none;
  }
</style>
