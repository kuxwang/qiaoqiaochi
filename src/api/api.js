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
export const commissions = {
  /**
   * 佣金统计
   */
  recordStatistics_get: {url: `${base}/commissions/recordStatistics`, method: 'GET', header, dataType},
  recordStatistics_post: {url: `${base}/commissions/recordStatistics`, method: 'POST', header, dataType},
  /**
   * 订单统计
   */
  orderStatistics: {url: `${base}/commissions/orderStatistics`, method: 'GET', header, dataType},
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

/**
 * 佣金统计
 * @param params
 * @param callback
 */
export const recordStatistics_get = function (params, callback) {_webapp.requestx(Object.assign(params, commissions.recordStatistics_get), function (res) {callback(res)})};
/**
 * 订单操作
 * @param params
 * @param callback
 */
export const teamsStatistics = function (params, callback) {_webapp.requestx(Object.assign(params, commissions.teamsStatistics), function (res) {callback(res)})};
