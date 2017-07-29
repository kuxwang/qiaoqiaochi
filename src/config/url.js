// import tMap from 'tMap'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}


const base = 'https://api.duoyunjiav2.wshoto.com';
const header = 'application/json';
const dataType = 'json';

/*分销*/
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
 *  会员
 */
export const members = {
  /**
   * 个人设置
   */
  info: {
    url: `${base}/members/info`,
    method: 'PUT',
    header,
    dataType
  }
}
