import {
  GET_USERADDRESS,
  TABSELECT,
  GET_ONACTIVE,
  GET_BUSACTIVE,
  ORDERSN,
  ADDRESS,
  ADDRESSLISTNUM,
  DELIVERY,
  GET_MYORDERS,
  SEARCHNUM,
  ORDERINFO,
  REASON,
  BACKTIME,
  DESCRI,
  REFUNDID,
  BACKPRICE,
  DRAWBACKOBJ,
  ORDERDETAILS,
  IMGURL,
  SETEDITADDRESS,
  OLDADDRESS,
  ISCONFIRM,
  ISNULL
}
  from
    './mutation-types.js'

import {setStore, getStore} from '../config/myUtils'

export default {
  //用户收货地址
  [GET_USERADDRESS](state, data) {
    state.userAddress = {
      mobile: data.mobile,
      realname: data.realname,
      province: data.province,
      city: data.city,
      area: data.area,
      address: data.address,
      id: data.id,
      goodsid:'4'
    }
    console.log(data)
  },
  [TABSELECT] (state, data) {
    state.tabselect = data
  },
  [GET_ONACTIVE](state, data){
    state.onActive = data
  },
  [GET_BUSACTIVE](state, data){
    state.busActive = data;
  },
  [ORDERSN] (state, data) {
    state.ordersn = data;
    console.log(data)
  },
  [SEARCHNUM] (state, data) {
    state.searchnum = data
  },
  [ADDRESS] (state, data) {
    state.address = data
  },
  [GET_MYORDERS] (state, data) {
    state.myOrders = data;
    console.log(data)
  },
  [ADDRESSLISTNUM] (state, addressListNum) {
    state.addressListNum = addressListNum
  },
  [DELIVERY] (state, delivery) {
    state.delivery = delivery
  },
  [ORDERINFO] (state, orderInfo) {
    console.log(orderInfo)
    state.orderInfo = orderInfo
  },
  [DRAWBACKOBJ] (state, drawbackobj) {
    state.drawbackobj = drawbackobj;
  },
  [ORDERDETAILS] (state, orderdetails) {
    state.orderdetails = orderdetails;
  },
  [IMGURL] (state, imgUrl) {
    state.imgUrl = imgUrl;
  },
  [SETEDITADDRESS] (state, seteditAddress) {
    state.seteditAddress = seteditAddress;
  },
  [OLDADDRESS] (state, oldaddress) {
    state.oldaddress = oldaddress;
  },
  [ISCONFIRM](state, isConfirm) {
    state.isConfirm = isConfirm;
    console.log(isConfirm)
  },
  [ISNULL](state, data) {
    state.isNull=data;
    console.log(data)
  },
}
