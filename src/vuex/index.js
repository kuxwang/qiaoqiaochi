/**
 * Created by Crete on 17/6/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)
const state = {
  userAddress:{},//用户收货地址
  onActive:'',//默认收货地址选中索引值
  busActive:'',//默认配送方式索引值
  tabselect: '',  //订单和伙伴状态颜色
  ordersn:'',  //订单编号
  address: '', //订单确认页的收货地址列表页
  myOrders:{  //下单页面所需参数
    goodsid:'',
    optionid:'', 
    cartids:[],
    total:''
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

