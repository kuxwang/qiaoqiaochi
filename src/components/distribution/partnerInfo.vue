<template>
  <div class="mainInfo">
    <mt-header fixed title="用户详情">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="containe" r>
      <div class="header-img">
        <img :src="teamsinfo.avatar" alt="">
        <h4>{{teamsinfo.nickname}}</h4>
        <div>ID
          <p>{{teamsinfo.id}}</p>
        </div>
        <div>手机号
          <p>{{teamsinfo.mobile}}</p>
        </div>
        <div>会员等级
          <p>{{levelname}}</p>
        </div>
        <div>分销等级
          <p>{{agentlevel}}</p>
        </div>
      </div>
      <div class="height"></div>
      <div class="money">
        <div class="money-left">
          <p>{{cg_money_sum}}</p>
          营业额
        </div>
        <div>
          <p>{{c_money_sum}}</p>
          推广费
        </div>
      </div>
      <div class="height"></div>
      <div class="order">
        <div>
          <p>{{o_status_1_price}}</p>
          已付款
        </div>
        <div>
          <p>{{o_status_2_price}}</p>
          已发货
        </div>
        <div>
          <p>{{o_status_3_price}}</p>
          已完成
        </div>
        <div class="last">
          <p>{{o_status_r1_price}}</p>
          退货
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Header } from 'mint-ui'
import { teams } from '../../api/api.js';
export default {
  data() {
    return {
      teamsinfo: '',
      levelname: '',
      agentlevel: '',
      c_money_sum: '',
      cg_money_sum: '',
      o_status_1_price: '',
      o_status_2_price: '',
      o_status_3_price: '',
      o_status_r1_price: ''
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1)
    },
    init() {
      let _this = this;
      let params = {
        data: {
          openid: _this.$route.query.openid,
        }
      }
      teams(params, (res) => {
        if (res.statusCode == 1) {
          _this.teamsinfo = res.data;
          _this.levelname = res.data.level.levelname;
          _this.agentlevel = res.data.agentlevel.levelname;
          _this.cg_money_sum = res.data.recordStatistics.cg_money_sum;
          _this.c_money_sum = res.data.recordStatistics.c_money_sum;
          _this.o_status_1_price = res.data.orderStatistics.o_status_1_price;
          _this.o_status_2_price = res.data.orderStatistics.o_status_2_price;
          _this.o_status_3_price = res.data.orderStatistics.o_status_3_price;
          _this.o_status_r1_price = res.data.orderStatistics.o_status_r1_price;
        } else {
          console.log('partnerinfo teams:' + res.data);
        }
      });
    }
  },
  mounted() {
    let _this = this;
    _this.init();
  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/less/index.less";
  @import '../../assets/less/reset.less';
  @import '../../assets/fonts/iconfont.css';

.mainInfo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  overflow: hidden;
  z-index: 9999;
}

.mt-header {
  border-bottom: 1px solid #ddd;
}

.header-img {
  background: #fff;
  margin-top: .45rem;
  padding-top: .5rem;
  padding-bottom: .05rem;
}

.header-img>img {
  width: .9rem;
  height: .9rem;
  border-radius: 50%;
  margin-bottom: .1rem;
}

.header-img>h4 {
  margin-bottom: .3rem;
  font-size: .16rem;
}

.header-img>div {
  padding: 0 .1rem;
  text-align: left;
  margin-bottom: .1rem;
  font-size: .14rem;
}

.header-img>div>p {
  float: right;
  color: #999;
}

.money {
  /*width:94%;*/
  height: .6rem;
  background: #fff;
  border-top: 1px solid #F6F5FA;
  border-bottom: 1px solid #F6F5FA;
  /*margin-left:3%;*/
}

.money>div {
  height: .58rem;
  float: left;
  width: 50%;
  text-align: center;
  font-size: .15rem;
  padding-top: .1rem;
}

.money>div>p {
  margin-bottom: .02rem;
}

.money>.money-left {
  border-right: 1px solid #F6F5FA;
}

.order {
  height: .6rem;
  border-top: 1px solid #F6F5FA;
  /*border-bottom:1px solid #ebdfde;*/
  background: #fff;
}

.order>div {
  float: left;
  padding-top: .1rem;
  height: .59rem;
  width: 50%;
  font-size: .14rem;
  background: #fff;
  border-right: 1px solid #F6F5FA;
  border-bottom: 1px solid #F6F5FA;
}


/*.order>div.last{*/


/*border-right:none;*/


/*}*/

.order>div>p {
  margin-bottom: .02rem;
}

.height {
  height: .1rem;
  background: @background;
}







/*.pop-info>h4{*/


/*font-weight:bold;*/


/*}*/


/*div.id-phone{*/


/*margin-top:.06rem;*/


/*}*/


/*div.id-phone>span{*/


/*font-size:.13rem;*/


/*display:block;*/


/*}*/


/*div.id-phone>span.left-id{*/


/*margin-bottom:.06rem;*/


/*}*/


/*.vip{*/


/*width:94%;*/


/*height:.5rem;*/


/*border-top:1px solid #ebdfde;*/


/*border-bottom:1px solid #ebdfde;*/


/*margin-left:3%;*/


/*margin-top:.1rem;*/


/*}*/


/*.vip>div{*/


/*float:left;*/


/*line-height:.5rem;*/


/*width:50%;*/


/*text-align:center;*/


/*font-size:.15rem;*/


/*}*/


/*.vip>div.vip-left{*/


/*border-right:1px solid #ebdfde;*/


/*}*/


/*.money{*/


/*margin-top:.3rem;*/


/*width:80%;*/


/*height:.6rem;*/


/*border:1px solid #ebdfde;*/


/*margin-left:10%;*/


/*background: #fff;*/


/*box-shadow:5px 5px 6px #888 ;*/


/*}*/


/*.money>div{*/


/*float:left;*/


/*width:50%;*/


/*height:.58rem;*/


/*padding-top:.1rem;*/


/*}*/


/*.money>div.money-left{*/


/*border-right:1px solid #ebdfde;*/


/*}*/


/*.order{*/


/*width:94%;*/


/*height:.6rem;*/


/*border-top:1px solid #ebdfde;*/


/*border-bottom:1px solid #ebdfde;*/


/*margin-left:3%;*/


/*margin-top:.3rem;*/


/*}*/


/*.order>div{*/


/*float:left;*/


/*padding-top:.1rem;*/


/*height:.58rem;*/


/*width:18.5%;*/


/*font-size:.14rem;*/


/*border-right:1px solid #ebdfde*/


/*}*/


/*.order>div.first{*/


/*width:26%;*/


/*}*/


/*.order>div.last{*/


/*border-right:none;*/


/*}*/


/*.order>div>p{*/


/*margin-top:.06rem;*/


/*}*/

.container {
  position: absolute;
  top: 0;
  width: 100%;
  overflow: auto;
  /*overflow-y: scroll;*/
  -webkit-overflow-scrolling: touch;
  height: 6.67rem;
  /*overflow-y: scroll;*/
}
</style>
