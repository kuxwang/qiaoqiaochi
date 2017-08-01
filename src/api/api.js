/**
 * Created by Crete on 17/7/24.
 */
// import {_webapp} from '../config/webapp.js'
import {_webapp} from '../config/_webapp.js'
const base = 'https://api.duoyunjiav2.wshoto.com';
const header = 'application/json';
const dataType = 'json';

/**
 * 分销中心
 */
const commissions = {

  recordStatistics_get: {url: `${base}/commissions/recordStatistics`, method: 'GET', header, dataType},
  recordStatistics_post: {url: `${base}/commissions/recordStatistics`, method: 'POST', header, dataType},
  /**
   * 订单统计
   * 订单列表
   */

  orderStatistics: {url: `${base}/commissions/orderStatistics`, method: 'GET', header, dataType},
  /**
   * 订单列表
   */
  orderLists: {url: `${base}/commissions/orderLists`, method: 'GET', header, dataType},
  /**
   * 订单详情
   */
  orders: {url: `${base}/commissions/orders`, method: 'GET', header, dataType},
  /**
   * 获取团队列表
   */
  teamsLists: {url: `${base}/commissions/teamsLists`, method: 'GET', header, dataType},
  /**
   * 获取团队指定用户
   */
  teams: {url: `${base}/commissions/teams`, method: 'GET', header, dataType},
  /**
   * 获取团队数量统计
   */
  teamsStatistics: {url: `${base}/commissions/teamsStatistics`, method: 'GET', header, dataType},
  /**
   *
   */
  withdrawals_get: {url: `${base}/commissions/withdrawals`, method: 'GET', header, dataType},
  withdrawals_post: {url: `${base}/commissions/withdrawals`, method: 'POST', header, dataType},
};
/**
 * 商品详情
 */
const product = {productDetail: {url: `${base}/goods`, method: 'GET', header, dataType}};
/**
 * 加入购物车
 */
const cart = {addCart: {url: `${base}/carts`, method: 'POST', header, dataType}};
/**
 * 订单列表
 */
const order = {orderList: {url: `${base}/orders`, method: 'GET', header, dataType}};
/**
 * 订单详情
 */
const orderd = {orderDetail: {url: `${base}/orders`, method: 'GET', header, dataType}};
/**
 * 快递
 */
const express = {exp: {url: `${base}/expresses`, method: 'GET', header, dataType}};

export const orderLists = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.orderLists), function (res) {
    callback(res)
  })
};
/**
 *
 * 用户中心
 * @type {{memberInfo: {url: string, method: string, header: string, dataType: string}}}
 */
const members = {
  memberInfo: {url: `${base}/members/memberInfo`, method: 'GET', header, dataType}
}
/**
 * 地址中心
 */
const addresses = {
  addresses_post: {url: `${base}/addresses`, method: 'POST', header, dataType},
  addresses_get: {url: `${base}/addresses`, method: 'GET', header, dataType}
}

/**
 * 配送
 */
const dispatchs = {
  dispatchs_get: {url: `${base}/dispatches`, method: 'GET', header, dataType}
}

/**
 * 提交订单确认
 */
const ordersinfo = {
  confirm_post: {url: `${base}/orders/confirm`, method: 'POST', header, dataType},
  payment_get: {url: `${base}/orders/payment`, method: 'GET', header, dataType},
  payment_post: {url: `${base}/orders/payment`, method: 'POST', header, dataType}
};

const qrimg = {url: `${base}/qrimgs`, method: 'GET', header, dataType}

/**
 * 订单操作
 */
const orderDo = {orderD: {url: `${base}/orders/operationOrder`, method: 'PUT', header, dataType}};
/**
 * 获取团队数量统计
 * @param params
 * @param callback
 */
/**
 * 获取团队数量统计
 * @param params
 * @param callback
 */
export const teamsStatistics = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.teamsStatistics), function (res) {
    callback(res)
  })
};
/**
 * 佣金统计
 * @param params
 * @param callback
 */
export const recordStatistics_get = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.recordStatistics_get), function (res) {
    callback(res)
  })
};
/**
 * 获取团队数量统计
 * @param params
 * @param callback
 */
// export const teamsStatistics = function (params, callback) {_webapp.requestx(Object.assign(params, commissions.teamsStatistics), function (res) {callback(res)})};
export const teamsLists = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.teamsLists), function (res) {
    callback(res)
  })
};
export const teams = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.teams), function (res) {
    callback(res)
  })
};
//订单列表

/**
 * 订单统计
 * @param params
 * @param callback
 */
export const orderStatistics = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.orderStatistics), function (res) {
    callback(res)
  })
};
/**
 * 订单列表
 * @param params
 * @param callback
 */
/**
 * 订单详情
 * @param params
 * @param callback
 */
export const orders = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.orders), function (res) {
    callback(res)
  })
};

/**
 * 用户信息获取
 * @param params
 * @param callback
 */
export const memberInfo = function (params, callback) {
  _webapp.requestx(Object.assign(params, members.memberInfo), function (res) {
    callback(res)
  })
};
/**
 * 提现
 */
export const withdrawals_get = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.withdrawals_get), function (res) {
    callback(res)
  })
};
export const withdrawals_post = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.withdrawals_post), function (res) {
    callback(res)
  })
};


/**
 * 首页商品展示 yellowStar
 */
const MYGOODS = {
  url: `${base}/goods`,
  method: 'GET',
  header,
  dataType
}
export const GET_MYGOODS = function (params, callback) {
  _webapp.requestx(Object.assign(params, MYGOODS), function (res) {
    callback(res)
  })
};

/**
 * 购物车 yellowStar
 */
const MYCARTS1 = {
  url: `${base}/carts`,
  method: 'GET',
  header,
  dataType
}
export const GET_MYCARTS = function (params, callback) {
  console.log(params)
  _webapp.requestx(Object.assign(params, MYCARTS1), function (res) {
    callback(res)
  })
};

const MYCARTS2 = {
  url: `${base}/carts`,
  method: 'PUT',
  header,
  dataType
}
export const PUT_MYCARTS = function (params, callback) {
  _webapp.requestx(Object.assign(params, MYCARTS2), function (res) {
    callback(res)
  })
};
const MYCARTS3 = {url: `${base}/carts`, method: 'DELETE', header, dataType}
export const DELETE_MYCARTS = function (params, callback) {
  _webapp.requestx(Object.assign(params, MYCARTS3), function (res) {
    callback(res)
  })
};


/**
 * 下单 yellowStar
 */
const ORDER1 = {
  url: `${base}/orders/confirm`,
  method: 'GET',
  header,
  dataType
}
export const GET_ORDER1 = function (params, callback) {
  _webapp.requestx(Object.assign(params, ORDER1), function (res) {
    callback(res)
  })
};


/**
 * 地址列表管理
 * @param params
 * @param callback
 */
export const addresses_get = function (params, callback) {
  _webapp.requestx(Object.assign(params, addresses.addresses_get), function (res) {
    callback(res)



  })
};

/**
 * 新增地址
 */
export const addresses_post = function (params, callback) {
  _webapp.requestx(Object.assign(params, addresses.addresses_post), function (res) {
    callback(res)
  })
};

/**
 * 商品详情
 */
export const productDetail = function (params, callback) {
  _webapp.requestx(Object.assign(params, product.productDetail), function (res) {
    callback(res)
  })
}
/**
 * 加入购物车
 */
export const addCart = function (params, callback) {
  _webapp.requestx(Object.assign(params, cart.addCart), function (res) {
    callback(res)
  })
};
/**
 * 订单列表
 */
export const orderList = function (params, callback) {
  _webapp.requestx(Object.assign(params, order.orderList), function (res) {
    callback(res)
  })
};
/**
 * 订单详情
 */
export const orderDetail = function (params, callback) {
  _webapp.requestx(Object.assign(params, orderd.orderDetail), function (res) {
    callback(res)
  })
};
/**
 * 快递
  */
export const expressInfo = function (params, callback) {
  _webapp.requestx(Object.assign(params, express.exp), function (res) {
    callback(res)
  })
};

/**
 * 配送
 */
export const dispatchs_get = function (params, callback) {
  _webapp.requestx(Object.assign(params, dispatchs.dispatchs_get), function (res) {
    callback(res)
  })
};
/**
 * 上传订单
 * @param params
 * @param callback
 */
export const confirm_post = function (params, callback) {
  _webapp.requestx(Object.assign(params, ordersinfo.confirm_post), function (res) {
    callback(res)
  })
};

/**
 * 支付订单获取
 */
export const payment_get = function (params, callback) {
  _webapp.requestx(Object.assign(params, ordersinfo.payment_get), function (res) {
    callback(res)
  })
};

/**
 * 支付订单提交
 */
export const payment_post = function (params, callback) {
  _webapp.requestx(Object.assign(params, ordersinfo.payment_post), function (res) {
    callback(res)
  })
};

/**
 * app支付接口
 */
export const paymentFun = function (type, params, callback) {
  _webapp.payment(type, params, function (res) {
    callback(res)
  })
};
/**
 * 二维码获取
 * @param params
 * @param callback
 * @constructor
 */
export const Qrimg = function (params, callback) {
  _webapp.requestx(Object.assign(params, qrimg), function (res) {
    callback(res)
  })
};

/**
 * 保存二维码
 */
export const QrimgSave = function (url) {
  _webapp.shellQrcode(url, function (res) {
    callback(res)
  })
};

/**
 * 个人中心 yellowStar
 */
const USERINFO = {url: `${base}/members`, method: 'PUT', header, dataType}
export const PUT_USERINFO = function (params, callback) {
  _webapp.requestx(Object.assign(params, USERINFO), function (res) {
    callback(res)
  })
};
const USERAVATARS = {url: `${base}/avatars`, method: 'PUT', header, dataType}
export const PUT_USERAVATARS = function (params, callback) {
  _webapp.requestx(Object.assign(params, USERAVATARS), function (res) {
    callback(res)
  })
};
export const USERPHOTO=function(){
  _webapp.uploadImg((res)=>{
    callback(res)
  })
}

/**
 * 购物车数量 yellowStar
 */
const CARTNUMS= {url: `${base}/carts/cartNums`, method: 'GET', header, dataType}
export const GET_CARTNUMS = function (params, callback) {
  _webapp.requestx(Object.assign(params, CARTNUMS), function (res) {
    callback(res)
  })
};

/**
 * 退出登录 yellowStar
 */
export const LOGINOUT=function(){
  _webapp.logOut((res)=>{

  })
}

/**
 * 订单操作
 */
export const orderManu = function (params, callback) {
  _webapp.requestx(Object.assign(params, orderDo.orderD), function (res) {
    callback(res)
  })
};
