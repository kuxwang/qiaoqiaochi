/**
 * Created by Crete on 17/7/24.
 */
// import {_webapp} from '../config/webapp.js'
import {_webapp} from '../config/_webapp.js'
const base = 'https://api.duoyunjiav2.wshoto.com';
const header = 'application/json';
const dataType = 'json';
// const Promise = require("bluebird");
/**
 * 分销
 */
export const commissions = {
  /**
   * 佣金统计
   */
  recordStatistics: {url: `${base}/commissions/recordStatistics`,
    method: 'GET',
    header,
    dataType
  },

  /**
   * 订单统计
   */
  orderStatistics: {
    url: `${base}/carts`,
    method: 'GET',
    header,
    dataType
  }
}

/**
 * 首页商品展示 yellowStar
 */
const MYGOODS={
  url: `${base}/goods`,
  method: 'GET',
  header,
  dataType
}
export const GET_MYGOODS = function(params, callback) {
  _webapp.requestx(Object.assign(params,MYGOODS), function(res) {
    callback(res)
  })
};

/**
 * 购物车 yellowStar
 */
const MYCARTS1={
  url: `${base}/carts`,
  method: 'GET',
  header,
  dataType
}
export const GET_MYCARTS = function(params, callback) {
  _webapp.requestx(Object.assign(params,MYCARTS1), function(res) {
    callback(res)
  })
};

const MYCARTS2={
  url: `${base}/carts`,
  method: 'PUT',
  header,
  dataType
}
export const PUT_MYCARTS = function(params, callback) {
  _webapp.requestx(Object.assign(params,MYCARTS2), function(res) {
    callback(res)
  })
};

/**
 * 下单 yellowStar
*/
const ORDER1={
  url: `${base}/orders/confirm`,
  method: 'GET',
  header,
  dataType
}
export const GET_ORDER1 = function(params, callback) {
  _webapp.requestx(Object.assign(params,ORDER1), function(res) {
    callback(res)
  })
};

/**
 * 地址管理 yellowStar
*/
const MYADDRESS1={
  url: `${base}/orders/addresses`,
  method: 'GET',
  header,
  dataType
}
export const GET_MYADDRESS1 = function(params, callback) {
  _webapp.requestx(Object.assign(params,MYADDRESS1), function(res) {
    callback(res)
  })
};














/**
 * 参数合并
 */
// export const mergeParams = (baseParams, addParams) => {
//   return baseParams.push(addParams)
// }

// console.log(_webapp)
// console.log(Promise())
// export const recordStatistics = params => {return _webapp.requestx(Object.assign(params,commissions.recordStatistics))};


/**
 * 佣金统计
 * @param params
 * @param callback
 */
// function requestweb(params, callback){
//   _webapp.requestx(Object.assign(params, commissions.recordStatistics), res => {
//     callback(res)
//   })
// }

/**
 * 佣金统计
 * @param params
 * @param callback
 */
export const recordStatistics = function(params, callback) {
  _webapp.requestx(Object.assign(params, commissions.recordStatistics), function(res) {
    callback(res)
  })
};
export const orderStatistics = function(params, callback) {
  _webapp.requestx(Object.assign(params, commissions.orderStatistics), function(res) {
    callback(res)
  })
};
