/**
 * Created by Crete on 17/7/24.
 */
/**
 * Created by Crete on 17/6/24.
 */
import axios from 'axios'
import qs from 'qs'
// let base = 'http://www.i-carparking.com/zhczwx/info.php'
let axios_instance = axios.create({
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }],
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
})
// 附近车辆
// export const vehicleNum = params => { return axios_instance.post(`${base}?i=1&c=entry&do=homenologin&m=zhui_calltaxi`, params).then(res => res.data) }

//import {vehicleNum}  from
//let params={
//  tel:''
//}
//
//vehicleNum(params).then((res)=>{
//  cons
//})
