<template>
  <div class="main order-detail-header">
    <mt-header title="查看物流" class="mylogistics" fixed>
      <a @click="goBack" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="logistics-content">
      <div class="buyer-info-box">
        <div class="iconfont">
          &#xe66f;
        </div>
        <div class="order-state">
          运单编号：{{expsn}}
        </div>
      </div>
      <div class="product-info-box">
        <div class="pib-header">
          <span class="iconfont">&#xe6ce;</span>
          物品信息
        </div>
        <div class="good-info" v-for="(v,i) in goods" :key="i" @click="goDetails(v)">
          <img :src="v.thumb" alt="" class="order-small">
          <p>{{v.title}}</p>
          <div class="good-price">
            <p>￥{{v.realprice}}</p>
            <p>×{{v.total}}</p>
          </div>
        </div>
      </div>
      <div class="logistics-info">
        <div class="pib-header">
          <span class="iconfont">&#xe606;</span>
          物流跟踪
        </div>
        <ul v-if="!isShow">
          <li :class="{fcolor : i ==0}" v-for="(v,i) in logisticsMsg" :key="i">
            <b></b>
            <p class="first">{{v.context}}</p>
            <p>{{v.time}}</p>
          </li>
        </ul>
        <div v-if="isShow" class="none-tran">很抱歉！未查到相关物流信息</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Header } from 'mint-ui'
import { mapState } from 'Vuex'
import { expressInfo, orderDetail } from '../../../api/api.js'
export default {
  data() {
    return {
      expsn: '',
      isShow: false,
      goods: [],
      logisticsMsg: []
    }
  },
  computed: {
    ...mapState([
      'orderdetails'
    ])
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    init() {
      let _this = this;
      _this.expsn = _this.$route.query.expsn;
      let param = {
        data: {
          orderid: _this.$route.query.id
        }
      }
      orderDetail(param, function(res) {
        if (res.statusCode === 1) {
          _this.goods = res.data.goods;
        } else {
          console.log('logistics orderDetail:' + res.data);
        }
      })
    },
    logisticsTracking() {
      let _this = this;
      let params = {
        data: {
          express: _this.$route.query.exp,
          expresssn: _this.$route.query.expsn
        }
      }
      expressInfo(params, function(res) {
        console.log(res);
        if (res.statusCode === 1) {
          _this.logisticsMsg = res.data;
          _this.isShow = false;
        } else {
          _this.isShow = true;
          console.log('logistics expressInfo:' + res.data);
        }
      });
    },
    goDetails(v) {
      let _this = this;
      _this.$router.push({ path: 'details', query: { id: v.id } })
    }
  },
  mounted() {
    let _this = this;
    _this.logisticsTracking();
    _this.init();

  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';
.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: .15rem;
  overflow-y: scroll;
  z-index: 20;
  color: #666;
}

.logistics-content {
  margin-top: .55rem;
  .scroll-view(100%);
}

.none-tran {
  height: .6rem;
  padding: .2rem;
  font-size: .15rem;
}


.buyer-info-box {
  height: .5rem;
  width: 100%; // position: relative;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 .1rem;
}

.buyer-info-box>div.iconfont {
  font-size: .18rem;
}

.order-state {
  color: #666;
  font-size: .14rem;
  margin-bottom: .03rem;
  margin-left: 0.05rem;
}

.product-info-box {
  background: #fff;
  padding: 0 .1rem;
  margin-bottom: .1rem;
}

.pib-header {
  text-align: left;
  padding: .08rem .05rem;
  border-bottom: 1px solid #ddd;
}

.pib-header>span {
  margin-right: .05rem;
}

.good-info {
  height: .7rem;
  padding: .08rem 0;
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.order-small {
  width: .5rem;
  height: .5rem;
  border: 1px solid #ddd;
}

.good-info>img {
  float: left;
}

.good-info>p {
  float: left;
  margin-left: .08rem;
  font-size: .13rem;
}

.good-price {
  float: right;
  font-size: .13rem;
}

.good-price>p {
  text-align: right;
  margin-bottom: .02rem;
}

.logistics-info {
  background: #fff;
  padding: 0.1rem 0.15rem 0rem 0.15rem;
}

.logistics-info>div.pib-header>span.iconfont {
  font-size: .2rem;
  /*line-height:.3rem;*/
}

.logistics-info>ul {
  margin: .1rem 0;
  margin-left: .05rem;
  padding-left: .3rem;
  text-align: left;
  border-left: 1px solid #ddd;
}

.logistics-info>ul>li {
  border-bottom: 1px solid #ddd;
  padding: .1rem 0;
  padding-right: .3rem;
  font-size: .13rem;
  position: relative;
}

.logistics-info>ul>li.fcolor {
  color: #F5751D;
}

.logistics-info>ul>li.fcolor>b {
  background: #F5751D;
}

.logistics-info>ul>li>b {
  position: absolute;
  left: -.35rem;
  top: .05rem;
  width: .1rem;
  height: .1rem;
  border-radius: 50%;
  background: #ddd;
}

.logistics-info>ul>li>p {
  line-height: .24rem;
}

.logistics-info>ul>li>p.first {
  margin-bottom: .2rem;
}

.logistics-info>ul>li:last-child {
  border-bottom: none;
}
</style>
