 <template>
  <transition name="slide">
  <div class="main drawback-info-header">
    <mt-header title="查看退款申请">
      <router-link to="/order" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="infomation">
      <p>等待商家处理退款申请</p>
      <ul>
        <li>如果商家同意：并由商家退款到你账户余额</li>
        <li>如果商家发货： 申请将关闭，关闭后可以再次发起退款</li>
        <li>如果商家未处理：请及时与商家联系</li>
      </ul>
    </div>
    <div class="infomation">
      <p>协商详情</p>
      <ul>
        <li>退款类型：仅退款</li>
        <li>退款原因：{{reason1}}</li>
        <li>退款说明：{{content1}}</li>
        <li>申请时间：{{createtime1}}</li>
      </ul>
    </div>
    <!--<router-link to="/drawback" tag="button" class="render-btn">-->
      <!--修改退款申请-->
    <!--</router-link>-->
    <button class="render-btn" @click="jumpOrderd()">
      取消退款申请
    </button>
    <!--<router-link to="/orderd" tag="button" class="render-btn">-->
      <!---->
    <!--</router-link>-->
  </div>
  </transition>
</template>
<script>
  import { Header,Toast } from 'mint-ui'
  import { orderManu,orderRe} from '../../api/api'
  import {mapMutations, mapGetters,mapState} from 'vuex'
  export default {
     data(){
       return {
          refundid:'',
          reason1:'',
          content1:'',
          createtime1:'',
          orderid:''
       }
     },
    methods: {
      ...mapMutations({
        isCon:'ISCONFIRM'
      }),
      jumpOrderd () {
        let that=this;
        let params = {
          data:{
            type:'canlreful',
            orderid: this.orderid
          }
        }
        console.log(params)
        orderManu(params,res=>{
          if(res.statusCode==1){
            that.isCon(2)
            Toast({
              message: '成功取消退款',
                position: 'midlle',
                duration: 1500
            })
            setTimeout(()=>{
              this.$router.push({path:'orderd',query:{oid:that.orderid}})
            },500)
          }else{
            Toast({
              message: '取消退款失败',
                position: 'middle',
                duration: 1500
            })
            console.log('取消退款接口异常')
          }
        })
      },
      getListinfo(){
        let that=this;
        let refundid=this.$route.query.refundid
        let params={
          data:{
            refundid:refundid
          }
        }
        orderRe(params,function(res){
          console.log(res);
          that.reason1=res.data.reason;
          that.content1=res.data.content;
          that.createtime1=res.data.createtime;
          that.orderid=res.data.orderid;
        })
      }
    },
    computed: {
      ...mapState([
        'drawbackobj',
//        'isConfirm'
      ]),
      ...mapGetters({
        'reason':'REASON',
      }),
      reason () {
        return this.drawbackobj.reason || ''
      },
      createtime () {
        return this.drawbackobj.createtime || ''
      },
      content () {
        return this.drawbackobj.content || ''
      },
      price () {
        return this.drawbackobj.price || ''
      }
    },
    created(){
      this.getListinfo()
    },
    mounted(){

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
    z-index:30;
    color:#666;
  }
  .drawback-info-header .mint-header {
    height:.45rem;
  }
  div.infomation{
    text-align: left;
    background: #fff;
    margin:.1rem 0;
    padding:.16rem .12rem 0;
    font-size:.13rem;
  }
  div.infomation>p{
    padding-bottom:.15rem;
    border-bottom:1px solid #ddd;
    color:#333;
  }
  div.infomation>ul{
    padding-top:.05rem;
  }
  div.infomation>ul>li{
    line-height:.26rem;
  }
  .main>button{
    width:94%;
    height:.45rem;
    color:#fff;
    font-size:.14rem;
    background:#ff4f4f;
    border-radius:.03rem;
    outline: none;
    margin-top:.1rem;
  }
  .main>button.cancel-btn{
    background:#ddd;
    color:#666;
    margin-top:.15rem;
  }
</style>
