/**
 * Created by Crete on 17/7/24.
 */
// import {_webapp} from '../config/webapp.js'
import {_webapp} from '../config/_webapp.js'
const base = 'https://api.duoyunjiav2.wshoto.com';
const header = 'application/json';
const dataType = 'json';
const Promise = require("bluebird");
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
   * 推广订单
   */
  orderStatistics: {
    url: `${base}/commissions/orderStatistics`,
    method: 'GET',
    header,
    dataType
  }
}


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
function requestweb(params, callback){
  _webapp.requestx(Object.assign(params, commissions.recordStatistics), res => {
    callback(res)
  })
}
export const recordStatistics = function(params, callback) {
  console.log(params);
  _webapp.requestx(Object.assign(params, commissions.recordStatistics), function(res) {
    callback(res)
  })
};
