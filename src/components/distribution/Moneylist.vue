<template>
  <div class="main">
    <section>
      <mt-header title="提现明细">
        <router-link to="/takemoney" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <!-- <mt-loadmore :bottom-method="loadBottom" class="list-content" @bottom-status-change="handleBottomChange" :autoFill="isTrue"
                   :bottom-all-loaded="allLoaded" ref="loadmore">-->

    <ul class="moneylists" v-if="moneylist.length" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded" infinite-scroll-distance="10">
      <li class="moneycell" v-for="(i ,index) in moneylist" :class="{'colorbor': comparefun(moneylist,index),'nomargin': index==0}">
        <div class="left">
          <div class="time">{{i.applytime.substr(0,10)}}</div>
        </div>
        <div class="mid">
          <!--<span class="ordersn">订单号：1212312313</span>-->
          <div class="money">{{i.commission}}元</div>
        </div>
        <div class="right">
          <span class="type">{{i.statusstr}}</span>
        </div>
      </li>
    </ul>
    <!--<div slot="bottom" class="mint-loadmore-bottom" style="text-align:center" v-show="allLoaded == false" v-if="">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">继续滚动，可加载更多</span>
          <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
        </div>
      </mt-loadmore>-->
    <!-- <div v-if="!moneylist.length" class="tips">
      <span class="iconfont">&#xe66f;</span>
      没有提现记录<br>
    </div> -->
     <div class="nogoods"  v-if="!moneylist.length">
        <div class="nogoods-tp">
          <img src="../../assets/images/ddlb.png">
        </div>
        <p class="nogoods-mid">
          <h3>没有提现记录</h3>
        </p>
      </div>
  </div>
</template>

<script>
import { withdrawals_get, withdrawals_post } from "../../api/api.js";
import { Loadmore } from "mint-ui";

export default {
  data() {
    return {
      moneylist: [],
      myCurNo: 1,
      psizes: 10,
      bottomStatus: "",
      allLoaded: false,
      isTrue: false,
      onePage: false
    };
  },
  created() {},
  mounted() {
    let params = {
      data: {
        type: "all",
        page: 1,
        psize: 10
      }
    };
    withdrawals_get(params, res => {
      this.moneylist = res.data.all;
    });
  },
  methods: {
    comparefun(obj, i) {
      if (i == obj.length - 1) {
        return true;
      } else {
        return false;
      }
            //  return true
    },
    getList() {
      let _this = this;
      let params = {
        data: {
          type: "all",
          page: _this.myCurNo,
          psize: _this.psize
        }
      };
      withdrawals_get(params, res => {
        _this.moneylist = _this.moneylist.concat(res.data.all);
        if (res.data.all.length < _this.psize) {
          _this.allLoaded = true;
          //            console.log('已经到底了')
        }
      });
    },
    loadMore() {
      this.myCurNo = this.myCurNo + 1;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
  @import "../../assets/less/index.less";
  @import '../../assets/less/reset.less';
  @import '../../assets/fonts/iconfont.css';
.main {
  /*position: fixed;*/
  position: fixed;
  top: 0rem;
  width: 100%;
  height: 100%;
  background: @background;
  z-index: 30;
  overflow: hidden;
}

ul {
  width: 100%;
  padding: 0.1rem;
  background: #fff;
  /*margin-top: .5rem;*/
  border: 1px solid #eee;
}

li {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /*border-top: 1px solid rgba(0, 0, 0, .1) !important;*/
  margin-top: 0.05rem;
  padding: 0.1rem 0;
  height: 0.5rem;
}

.left {
  flex: 1;
  position: relative;
  line-height: 0.3rem;
}

.money {
  color: #f5751d;
  font-size: 0.18rem;
}

.right {
  flex: 1;
  position: relative;
  text-align: right;
  height: 100%;
}

.time {
  font-size: 0.14rem;
  right: 0.05rem;
}

.type {
  color: #46dc88;
  line-height: 0.3rem;
}

.ordersn {
  font-size: 0.12rem;
}

.mid {
  flex: 2;
  line-height: 0.3rem;
}

.colorbor {
  border-bottom: none !important;
}

.tips {
  text-align: center;
  font-size: 0.14rem;
  color: #666;
  margin-top: 2rem;
}

.tips .iconfont {
  display: block;
  font-size: 0.8rem;
}

.nomargin {
  margin-top: 0;
}

.list-content {
  overflow: hidden;
  width: 100%;
}

.nogoods {
  margin-top: 1.5rem;
}

.nogoods-tp {
  width: 1.1rem;
  height: 1.1rem;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.nogoods-tp img {
  display: block;
  width: 100%;
}

.nogoods h3 {
  color: #666;
  font-size: 0.16rem;
  text-align: center;
}

.nogoods h4 {
  color: #999;
  font-size: 0.14rem;
  margin-top: 0.2rem;
  text-align: center;
}

.nogoods-mid {
  margin-top: 0.2rem;
  font-size: 0.14em;
  color: #666;
}
</style>


