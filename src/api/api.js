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
  recordStatistics: {
    url: `${base}/commissions/recordStatistics`,
    method: 'GET',
    header,
    dataType
  },
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
export const product={productDetail:{url:`${base}/goods`, method:'GET', header, dataType}};
/**
 * 加入购物车
 */
export const cart={addCart:{url:`${base}/carts`, method:'POST', header, dataType}};
/**
 * 订单列表
 */
export const order={orderList:{url:`${base}/orders`, method:'GET', header, dataType}};
/**
 * 订单详情
 */
export const orderd={orderDetail:{url:`${base}/orders`, method:'GET', header, dataType}};
/**
 * 快递
 */

export const express={exp:{url:`${base}/dispatchs`, method:'GET', header, dataType}};

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
