<template>
  <div class="content">
    <mt-header title="购物车" class="is-fixed header">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="goods-content" v-show="isShow">
      <ul class="goods-list">
        <li class="clearfix" v-for="(v,i) in getShCartData" :key="i">
          <label class="mint-checklist-label fl">
            <div class="mint-checkbox">
              <input type="checkbox" class="mint-checkbox-input" :checked="v.isChecked" @click="nowChecked(v,i)">
              <span class="mint-checkbox-core"></span>
            </div>
          </label>
          <div @click="goProductDetail(v)">
            <div class="goods-img fl">
              <img :src="v.thumb">
            </div>
            <div class="goods-info fl">
              <h3 class="goods-title lr1">{{v.title}}</h3>
              <div class="goods-option">{{v.optiontitle}}</div>
              <div class="goods-attr">
                <span class="goods-price">
                  ¥
                  <span class="goods-intPrice">{{v.marketprice|getIntNmb}}</span>
                  <span class="goods-folatPrice">{{v.marketprice|getFloatNmb}}</span>
                </span>
                <del>¥{{v.productprice}}</del>
              </div>
              <!--<div class="goods-num">X<i>{{v.total}}</i></div>-->
            </div>
          </div>
          <div class="goods-total fr">
            <div class="goods-del" @click="delGoods(v,i)">
              <i class="iconfont">&#xe6db;</i>
            </div>
            <div class="dt_sku_numm_m clearfix">
              <span class="dt_subt fl" @click="reduceTotal(v,i)">-</span>
              <span class="dt_num fl">{{v.total}}</span>
              <span class="dt_add" @click="addTotal(v,i)">+</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="total_area clearfix">
        <label class="mint-checklist-label fl">
          <span class="mint-checkbox fl">
            <input type="checkbox" class="mint-checkbox-input" value="当前值" :checked="isTrue" @click="allCheckBox">
            <span class="mint-checkbox-core"></span>
          </span>
          <span class="mint-checkbox-label">全选</span>
        </label>
        <div class="payment fr clearfix">
          <div class="payment-lf fl">
            <div>
              <h3>
                合计:
                <span class="goods-price">
                  ¥
                  <span class="goods-intPrice">{{defPrice|getIntNmb}}</span>
                  <span class="goods-folatPrice">{{defPrice|getFloatNmb}}</span>
                </span>
              </h3>
              <h4>
                不含运费
              </h4>
            </div>
          </div>
          <div class="payment-lr fl lr1" @click="goConfirmorder()">
            结算({{defTotal}})
          </div>
        </div>
      </div>
    </div>
    <div class="nogoods" v-show="!isShow">
      <div class="nogoods-tp">
        <img src="../assets/images/shoppingCart-02.png">
      </div>
      <p class="nogoods-mid">
        <h3>购物车居然是空的</h3>
        <h4>再忙，也要记得买点什么犒劳自己~</h4>
      </p>
    </div>
  </div>
</template>
<script>
import { Header, Checklist, MessageBox, Toast } from 'mint-ui';
import { setStore, getStore } from '../config/myUtils';
import { GET_MYCARTS, PUT_MYCARTS, GET_ORDER1, DELETE_MYCARTS } from '../api/api';
import { mapMutations, mapGetters } from 'Vuex';
export default {
  data() {
    return {
      value1: [],
      getShCartData: [], //商品列表
      defPrice: 0,  //购物车总的价格
      defTotal: 0,  //购物车总的数量
      isTrue: false,  //全选状态
      isShow: false,
      goodsId: '',
      optionId: '',
      cartids: '',
      total: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    mycartsInt() {  //购物车初始化
      let params = { data: {} }
      let _this = this;
      GET_MYCARTS(params, function(res) {
        if (res.statusCode === 1) {
          if (res.data.list.length > 0) {
            _this.getShCartData = res.data.list;
            _this.getShCartData.map((v, i, arr) => {  //遍历数组，增加isChecked属性，默认不选中
              _this.getShCartData[i].isChecked = false;
              _this.isShow = true;
            })
            _this.defState();
          } else {
            _this.isTrue = false;
            _this.isShow = false;
          }
        } else {
          console.log('请求失败')
        }
      })
    },
    defState() { //初始化购物车总价和总数
      let _this = this;
      _this.isTrue = true;
      let allPrice = 0;
      let allTotal = 0;

      _this.getShCartData.map((v, i, arr) => {
        _this.getShCartData[i].isChecked = true;
        allPrice += (Number(_this.getShCartData[i].marketprice) * Number(_this.getShCartData[i].total));
        allTotal += Number(_this.getShCartData[i].total);
      })
      _this.defPrice = allPrice;
      _this.defTotal = allTotal;
    },
    addTotal(v, i) {//加
      let _this = this;
      v.total++;
      console.log(v.marketprice);
      if (_this.getShCartData[i].isChecked === true) {
        _this.defPrice = Number(_this.defPrice) + Number(v.marketprice);  //总价 + 当前价格
        _this.defTotal++;  //总数++

        let params = {
          'data': {
            cartid: v.id,
            type: '1'
          }
        }
        PUT_MYCARTS(params, function(res) {
          console.log(res)
          if (res.statusCode === 1) {
            console.log('加成功');
          } else {
            console.log('shoppingCart PUT_MYCARTS 加' + res.data);
          }
        })
      }
    },
    reduceTotal(v, i) {//减
      let _this = this
      let total = v.total;
      if (total > 1) {
        v.total--;
        if (_this.getShCartData[i].isChecked === true) {
          _this.defPrice = Number(_this.defPrice) - Number(v.marketprice);
          _this.defTotal--  //总数--
          let params = {
            'data': {
              cartid: v.id,
              type: '-1'
            }
          }
          PUT_MYCARTS(params, function(res) {
            if (res.statusCode === 1) {
              console.log('减成功')
            } else {
              console.log('shoppingCart PUT_MYCARTS 减' + res.data);
            }
          })
        }

      }
    },
    allCheckBox() {//全选
      let _this = this;
      _this.isTrue = !_this.isTrue;
      if (_this.isTrue === true) {
        _this.defState();
      } else {
        _this.getShCartData.map((v, i, arr) => {
          _this.getShCartData[i].isChecked = false;
        })
        _this.defPrice = 0;
        _this.defTotal = 0;
      }
    },
    nowChecked(v, i) {//单选
      let _this = this;
      let myArr = [];
      _this.getShCartData[i].isChecked = !_this.getShCartData[i].isChecked;

      if (_this.getShCartData[i].isChecked === true) {
        _this.defPrice += (Number(v.total) * Number(v.marketprice)); // 总价=当前单价*数量
        _this.defTotal += (Number(v.total));
      } else {
        _this.defPrice -= (Number(v.total) * Number(v.marketprice));// 总价=当前单价*数量
        _this.defTotal -= (Number(v.total));
      }

      _this.getShCartData.map((v, i, arr) => {
        if (_this.getShCartData[i].isChecked === true) {
          myArr.push(_this.getShCartData[i].isChecked);
          myArr.length == _this.getShCartData.length ? _this.isTrue = true : _this.isTrue = false;
        } else {
          _this.isTrue = false;
        }
      })
    },
    delGoods(v, i) {//删除
      MessageBox({ title: '确认要删除此商品吗?', message: '点击确认删除', showCancelButton: true }).then(action => {
        if (action == 'confirm') {//表示点击了确定
          let _this = this;
          if (this.getShCartData[i].isChecked === true) {

            _this.defPrice -= (Number(v.marketprice) * Number(v.total));
            _this.defTotal -= Number(v.total);
          }
          _this.getShCartData.splice(i, 1);
          let params = {
            'data': {
              cartid: v.id
            }
          }
          DELETE_MYCARTS(params, function(res) {
            if (res.statusCode === 1) {
              _this.mycartsInt();
              console.log(res.data);
            } else {
              console.log('shoppingCart DELETE_MYCARTS' + res.data);
            }
          })

        } else if (action == 'cancel') {//表示点击了取消
          console.log('点击了取消')
        }
      })
    },
    goConfirmorder() {//确认订单
      let _this = this;
      let cartIds = [];

      if (Number(_this.defPrice) === 0) {
        Toast({
          message: '请选择商品',
          position: 'middle',
          duration: 2000
        });
        return;
      }

      _this.getShCartData.map((v, i, arr) => {
        cartIds.push(_this.getShCartData[i].id);
      })
      let myOrders = {
        goodsid: _this.goodsId,
        optionid: _this.optionId,
        cartids: cartIds.join(','),
        total: ''
      }
      _this.getMyorders(myOrders);
      _this.$router.push({ name: 'confirmorder' });
    },
    goProductDetail(v) {
      let goodsId = v.goodsid;
      this.$router.push({ name: 'details', query: { goodsId: goodsId } })
    },
    ...mapMutations({
      getMyorders: 'GET_MYORDERS'
    })
  },
  filters: {
    getIntNmb: function(val) {
      val = Number(val).toFixed(2);
      var numIndex = val.indexOf('.');
      if (numIndex != -1) {
        return val.substring(0, numIndex)
      } else {
        return val
      }
    },
    getFloatNmb: function(val) {
      val = Number(val).toFixed(2);
      var numIndex = val.indexOf('.');
      if (numIndex != -1) {
        return val.substring(numIndex, val.length);
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.mycartsInt();
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/reset/common.less';

.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  overflow: auto;
}


.router-link-active {
  color: #666;
}

.goods-list .mint-checklist-label {
  height: 0.2rem;
  width: 0.3rem;
  text-align: left;
  margin-top: 0.20rem;
  padding: 0rem;
}

.goods-list {
  padding-top: 0.45rem;
  margin-bottom: 0.6rem;
}

.goods-list li {
  height: 1rem;
  padding: 0.1rem;
  background: #fff;
  margin-top: 0.05rem;
}

.goods-img {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}

.goods-img img {
  display: block;
  width: 100%
}

.goods-info {
  width: 1.66rem;
}

.goods-title {
  font-size: 0.14rem;
  color: #27272f;
  text-align: left;
}

.goods-attr {
  color: @themeColor1;
  line-height: 0.2rem;
  position: relative;
  text-align: left;
  padding: 0.05rem 0rem;
  font-size: 0.28rem;
}

.goods-price {
  font-size: 0.12rem;
}

.goods-intPrice {
  font-size: 0.2rem;
}

.goods-folatPrice {
  font-size: 0.12rem;
}

.goods-attr del {
  color: #bebebe;
  font-size: 0.12rem;
}

.goods-num {
  text-align: left;
  font-size: 0.12rem;
  color: #27272f;
}

.goods-num i {
  font-size: 0.14rem
}

.goods-info .goods-option {
  font-size: 0.1rem !important;
  text-align: left;
  color: #999;
}


.mint-checkbox {
  font-size: 0.28rem;
}

.mint-checkbox-core {
  width: 0.2rem;
  height: 0.2rem;
  background: #FCFCFC;
}

.mint-checkbox-core::after {
  border: 0.02rem solid transparent;
  border-left: 0;
  border-top: 0;
  content: " ";
  top: 0.03rem;
  left: 0.06rem;
  position: absolute;
  width: 0.04rem;
  height: 0.08rem;
}

.dt_sku_numm_m {
  width: 1rem;
  border: 0.01rem solid #e2e2e2;
  position: absolute;
  bottom: 0rem;
  right: 0rem;
}

.dt_sku_numm_m span {
  float: left;
  width: 33.3%;
  height: 0.25rem;
  line-height: 0.25rem;
  text-align: center;
  font-size: 0.2rem;
  color: #6b6b6b;
  overflow: hidden;
}

.dt_sku_numm_m .dt_num {
  border: 0.01rem solid #e2e2e2;
  border-bottom: none;
  border-top: none;
  font-size: 0.15rem;
  color: #27272f;
}

.goods-del {
  position: absolute;
  top: 0rem;
  right: 0rem;
  font-size: 0.25rem;
}

.goods-del i {
  font-size: 0.28rem;
  color: #999;
}

.goods-total {
  height: 100%;
  position: relative;
}

.total_area {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.50rem;
  padding: 0rem 0rem 0rem 0.1rem;
  border-top: 1px solid #e7e7e7;
  background: #fff;
}

.total_area .mint-checklist-label {
  padding: 0rem;
  display: block;
  width: 1rem;
  height: 0.50rem;
  line-height: 0.50rem;
  text-align: left;
  font-size: 0.28rem
}

.mint-checkbox-label {
  font-size: 0.14rem;
  color: #051b28;
}

.payment-lf {
  height: 0.50rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-lf h3 {
  font-size: 0.14rem;
  margin-right: 0.1rem;
  margin-bottom: 0.05rem;
}

.payment-lf h4 {
  font-size: 0.14rem;
}

.payment-lr {
  width: 1.10rem;
  height: 0.50rem;
  line-height: 0.50rem;
  font-size: 0.16rem;
  background: @themeColor1;
  color: #fff;
  text-align: center;
}

.mint-checkbox-input:checked+.mint-checkbox-core {
  background-color: @themeColor1;
  border-color: @themeColor1;
}

.goods-price {
  color: @themeColor1;
}

.mint-msgbox-confirm {
  color: @themeColor1 !important;
}

.nogoods {
  margin-top: 1.5rem;
}

.nogoods-tp {
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
  /*border-radius: 50%;*/
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






