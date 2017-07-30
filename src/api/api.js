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
  /**
   * 佣金统计
   */
  recordStatistics: {
    url: `${base}/commissions/recordStatistics`,
    method: 'GET',
    header,
    dataType
  },
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
};

const members = {
  memberInfo: {url: `${base}/members/memberInfo`, method: 'GET', header, dataType}
}
const addresses = {
  addresses_post: {url: `${base}/addresses`, method: 'POST', header, dataType},
  addresses_get: {url: `${base}/addresses`, method: 'GET', header, dataType}
}
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
export const teamsStatistics = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.teamsStatistics), function (res) {
    callback(res)
  })
};
export const teamsLists = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.teamsLists), function (res) {
    callback(res)
  })
};
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
export const orderLists = function (params, callback) {
  _webapp.requestx(Object.assign(params, commissions.orderLists), function (res) {
    callback(res)
  })
};
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

/**
 * 下单 yellowStar
 */
const ORDER1 = {
  url: `${base}/orders/confirm`,
  method: 'GET',
  header,
  dataType
};
export const GET_ORDER1 = function (params, callback) {
  _webapp.requestx(Object.assign(params, ORDER1), function (res) {
    callback(res)
  })
};

/**
 * 地址管理 yellowStar
 */
// const MYADDRESS1 = {
//   url: `${base}/orders/addresses`,
//   method: 'GET',
//   header,
//   dataType
// }

/**
 *
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


