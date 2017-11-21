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
  userAddress: {},//用户收货地址
  changeAddress:{},//每次点击改变后的地址
  changeDelivery:{},//修改后的配送方式
  changeDeliveryIndex:'',//修改后的配送方式index
  isCollection:false,  //收藏状态
  tabbarIsSHow:true,  //tabbar是否显示
  orderStatus:'',  //当前订单状态
  tabselect: '',
  onActive: '',//默认收货地址选中索引值
  busActive: '',//默认配送方式索引值
  ordersn: '',  //订单编号
  address: '', //订单确认页的收货地址列表页
  addressListNum: '', //地址列表数量
  delivery: '', //选中的配送信息
  myOrders: {  //下单页面所需参数
    goodsid: '',
    optionid: '',
    cartids: '',
    total: ''
  },
  orderInfo: '', //订单信息,
  // reason:"",
  // backtime: '',
  // descri:'',
  // refundid:'',
  drawbackobj: '', //退款信息
  orderdetails: '',
  imgUrl: '',
  seteditAddress: '',
  oldaddress: '', //原来的地址
  isConfirm:0,
  isNull:true,
  defaultAddressIsNull : false,
  isScorll:'',
  oldprovince:'',
  oldcity:'',
  oldarea:'',
  addtype:'',
  haslogo:true, //首页logo
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

