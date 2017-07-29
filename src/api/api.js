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
   */
  orderStatistics: {
    url: `${base}/commissions/orderStatistics`,
    method: 'GET',
    header,
    dataType
  }
}
/**
 * 商品详情
 */
const product={productDetail:{url:`${base}/goods`, method:'GET', header, dataType}};
/**
 * 加入购物车
 */
const cart={addCart:{url:`${base}/carts`, method:'POST', header, dataType}};
/**
 * 订单列表
 */
const order={orderList:{url:`${base}/orders`, method:'GET', header, dataType}};
/**
 * 订单详情
 */
const orderd={orderDetail:{url:`${base}/orders`, method:'GET', header, dataType}};
/**
 * 快递
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
export const recordStatistics = function(params, callback) {
  _webapp.requestx(Object.assign(params, commissions.recordStatistics), function(res) {
    callback(res)
  })
};

export const teamsLists = function (params, callback) {_webapp.requestx(Object.assign(params, commissions.teamsLists), function (res) {callback(res)})};
/**
 * 订单统计
 * @param params
 * @param callback
 */
export const orderStatistics = function(params, callback) {
  _webapp.requestx(Object.assign(params, commissions.orderStatistics), function(res) {
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
 * 商品详情
 */
export const productDetail=function (params,callback) {_webapp.requestx(Object.assign(params,product.productDetail),function (res) {callback(res)})}
/**
 * 加入购物车
 */
export const addCart=function (params,callback) {_webapp.requestx(Object.assign(params,cart.addCart),function (res) {callback(res)})};
/**
 * 订单列表
 */
export const orderList=function (params,callback) {_webapp.requestx(Object.assign(params,order.orderList),function (res) {callback(res)})};
/**
 * 订单详情
 */
export const orderDetail=function (params,callback) {_webapp.requestx(Object.assign(params,orderd.orderDetail),function (res) {callback(res)})};
/**
 * 快递
 */
export const expressInfo=function (params,callback) {_webapp.requestx(Object.assign(params,express.exp),function (res) {callback(res)})};
