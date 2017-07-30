import {
  GET_USERADDRESS,
  TABSELECT,
  GET_ONACTIVE,
  GET_BUSACTIVE,
  ORDERSN,
  SEARCHNUM,
  ADDRESS
}
  from
    './mutation-types.js'

import { setStore, getStore } from '../config/myUtils'

export default {
  //用户收货地址
  [GET_USERADDRESS](state,data){
  	state.userAddress=data;
  	console.log(data)
  },
  [TABSELECT] (state, data) {
    state.tabselect = data
  },
  [GET_ONACTIVE](state,data){
  	state.onActive=data
  	console.log(data)
  },
  [GET_BUSACTIVE](state,data){
  	state.busActive=data;
  },
  [ORDERSN] (state, data) {
    state.ordersn = data
  },
  [SEARCHNUM] (state, data) {
    state.searchnum = data
  },

  [ADDRESS] (state, data) {
    state.address = data
  },

}
