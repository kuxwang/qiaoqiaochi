import {
  MOBILE,
  ORDERNUM
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
  [MOBILE] (state, mobile) {
    state.mobile = mobile
    setStore('mobile', mobile.mobile)
  },
  [ORDERNUM] (state, data) {
    state.orderNum = data
  }
}
