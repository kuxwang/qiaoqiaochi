import {
  GET_USERADDRESS
}
  from
    './mutation-types.js'

import { setStore, getStore } from '../config/myUtils'

export default {
  // 记录当前经度纬度
  // [RECORD_ADDRESS] (state, position) {
  //   state.position = position
  //   setStore('position', state.position)
  // },

  //用户收货地址
  [GET_USERADDRESS](state,data){
  	state.userAddress=data;
  	console.log(data)
  }
}
