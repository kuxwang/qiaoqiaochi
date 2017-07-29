/**
 * Created by Crete on 17/7/24.
 */
/**
 * Created by Crete on 17/6/24.
 */
import axios from 'axios'
import qs from 'qs'
let base = 'https://api.duoyunjiav2.wshoto.com'
let axios_instance = axios.create({
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'addons':'ewei_shop',
  }
})


export const ApiLogin = params => { return axios_instance.get(`${base}/ApiLogin`, params).then(res => res.data) }
export const Goods = params => { return axios_instance.get(`${base}/goods?access_token=78dddb9fe91d6ac654af8c4abd9fb036`,params).then(res => res.data) }
//购物车
export const Carts = params => { return axios_instance.post(`${base}/carts`, params).then(res => res.data) }
