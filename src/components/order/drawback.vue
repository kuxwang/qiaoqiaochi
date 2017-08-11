<template>
  <transition name="slide">
    <div class="main drawback-header">
      <mt-header title="申请退款">
        <a @click="goBack" slot="left" >
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <div class="drawback-box">
        <ul>
          <li>
            <span>退款原因</span>
            <select v-model="reason" @change="fn3" class="padding">
              <option >卖家缺货</option>
              <option >拍错了/订单信息错误</option>
              <option >不想买了</option>
            </select>
          </li>
          <li>
            <span>退款金额</span>
            <span class="drawback-num">{{money}}</span>
          </li>
          <li>
            <span>退款说明</span>
            <input type="text" placeholder="选填" class="description" v-model="value">
          </li>
        </ul>
      </div>
      <button class="drawback-confirm"  @click="fn8" >确认</button>
    </div>
  </transition>
</template>
<script>
  import {header,MessageBox} from 'mint-ui';
  import {orderManu} from '../../api/api.js';
  import {mapMutations, mapGetters} from 'vuex'
  export default{
    data(){
      return{
        money:'',
        orderid:'',
        reason:'卖家缺货',
        ing:true,
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      fn8(){
        console.log(this.orderid,this.reason)
        let that=this;
        MessageBox({
          title: '提示',
          message: '确定是否退款',
          showCancelButton: true
        }).then(action=>{
          if(action=='confirm'){
            console.log(1)
            let params={
              data:{
                orderid:this.orderid,
                type:'reful',
                reason:this.reason
              }
            }
            orderManu(params,function (res) {
              console.log(res)
              that.isCon(2)
              if(res.statusCode==1){
//                this.backtime(res.data.createtime)
                that.setdrawbackobj(res.data)

//                console.log(2)
                that.$router.push({path:'orderd',query:{oid:that.orderid}})
              }else{
                MessageBox.alert('操作失败!', '提示').then(action => {
//                  console.log(action)
//                  if(actioc==1)
                });
                that.$router.go(-1);
              }
            })
          }else if(action=='cancel'){
            this.$router.go(-1);
          }
        });
      },
      fn3(){

      },
      ...mapMutations({
        reason2: 'REASON',
        backtime:'BACKTIME',
        descri:'DESCRI',
        backprice:'BACKPRICE',
        setdrawbackobj:'DRAWBACKOBJ',
        isCon:'ISCONFIRM'
      })
    },
    created:function () {
      this.money=this.$route.query.money
      this.orderid=this.$route.query.orderid;

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
  .padding{

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
    background: #fff;
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
