import {
  // RECORD_ADDRESS,
  TABSELECT,
  ORDERSN
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
  [TABSELECT] (state, data) {
    state.tabselect = data
  },
  [ORDERSN] (state, data) {
    state.ordersn = data
  }
}
