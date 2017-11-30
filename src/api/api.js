/**
 * Created by Crete on 17/7/24.
 */
// import {_webapp} from '../config/webapp.js'
import axios from 'axios'
import qs from 'qs'
// import {_webapp} from '../config/_webapp.js'
import {_webapp} from '../config/hook.js'
import {MessageBox} from 'mint-ui'

// import {fn} from '../config/myUtils.js'

// const base = 'https://ws7.wshoto.com';
// const base='http://mz.wshoto.com';
// const base = 'https://api.duoyunjiav2.wshoto.com';
// const base='http://youjialeyuan.wshoto.com';

// const base = 'http://wswuxi.wshmi.com';
const base = 'http://qiaoqiaochi.wshoto.com';
const header = 'application/json';
const dataType = 'json';

/**
 * axios需要将post方法中的需要上传的参数使用qs库进行编码
 */

let axios_instance = axios.create({
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'addons': 'ewei_shop',
    'Accept': 'application/json, text/javascript, */*; q=0.01'
  }
})

/**
 * 判断接口的信息是否正确
 * @param opt
 * @returns {Array}
 */
let resulthandling = (opt) => {
  let newData = []
  opt.statusCode = opt.statusCode / 1;
  if (opt.statusCode === 1) {
    newData = {
      'statusCode': opt.statusCode,
      'data': opt.res
    };
  } else {
    if (opt.statusCode === 10005) {
      // newData = {'statusCode' : -1, 'data' : '获取用户信息失败，可能是在其他设备中登陆'};
      MessageBox({
        title: '友情提示',
        message: '很抱歉，您还没有登陆，点击确认我们将为您跳转至登陆页面',
        showCancelButton: false,
        closeOnClickModal : false
      }).then(action => {
        _webapp.nativeLogin();
      });

      return ;
    } else if (opt.statusCode === 10010) {
      _webapp.log('opt.statusCode 10010 running.');
      _webapp.getApiToken(() => {
        if (_webapp.checkApiToken()) {
          setParams(opt.params, opt.callback);
          return false;
        } else {
          MessageBox({
            title: '友情提示',
            message: '很抱歉，系统可能出现了点问题，请您关闭APP（需后台任务清除）后重新尝试',
            showCancelButton: false,
            closeOnClickModal : false
          }).then(action => {
            _webapp.nativeLogin();
            // newData = _webapp.getApiTokenSync() || {'statusCode': -1, 'data': '获取公众号通讯令牌异常，请关闭app后重新尝试'};
          });
        }
      });
    }else{
      newData = {
        'statusCode': opt.statusCode,
        'data': opt.res
      };
    }
  }

  return newData
}

/**
 * 判断请求方法，对应请求函数
 *
 **/
let breviaryfoo = opt => {
  switch (opt.type) {
    case 'POST':
      return axios_instance.post(opt.url + '?access_token=' + opt.apitoken, opt.params).then(res => {
        return {'res': res.data.result, 'statusCode' : res.data.statusCode, 'params': opt.params, 'callback': opt.callback}
      }).then(resulthandling).then(opt.callback)
      break;
    case 'PUT':
      return axios_instance.put(opt.url + '?access_token=' + opt.apitoken, opt.params).then(res => {
        return {'res': res.data.result, 'statusCode' : res.data.statusCode, 'params': opt.params, 'callback': opt.callback}
      }).then(resulthandling).then(opt.callback)
      break;
    case 'DELETE':
      return axios_instance.delete(opt.url + '?access_token=' + opt.apitoken, {params: opt.params}).then(res => {
        return {'res': res.data.result, 'statusCode' : res.data.statusCode, 'params': opt.params, 'callback': opt.callback}
      }).then(resulthandling).then(opt.callback)
      break;
    case 'GET':
      return axios_instance.get(opt.url + '?access_token=' + opt.apitoken, {params: opt.params}).then(res => {
        return {'res': res.data.result, 'statusCode' : res.data.statusCode, 'params': opt.params, 'callback': opt.callback}
      }).then(resulthandling).then(opt.callback)
      break;
  }
}

/**
 * 获取access_token,auth_key
 */
let isgetApiToken = (r) => {

  if (_webapp.checkApiToken()) {
    let access_token = _webapp.apiToken.data.access_token;
    let auth_key = _webapp.apiToken.data.auth;

    return {
      'access_token': access_token,
      'auth_key': auth_key,
    }
  } else {
    _webapp.log('api.js 111 running');

    if(r === true){
      return {};
    }

    _webapp.getApiToken(() => {
      _webapp.log('api.js 109 running.');
      if(_webapp.checkApiToken()){
        isgetApiToken(true);
      }else{
        _webapp.log('getApiToken fail.');
      }
    })
  }
}

export let iGetApiToken = function(callback){
  if(_webapp.checkApiToken()){
    callback(true);
  }else{
    _webapp.getApiToken(function(){
      if(_webapp.checkApiToken()){
        callback(true);
      }else{
        callback(false);
      }
    });
  }
};

export let iGetSessionKey = function(callback){
  if(_webapp.checkSessionKey()){
    callback(true);
  }else{
    _webapp.getSessionKey(function(){
      if(_webapp.checkSessionKey()){
        callback(true);
      }else{
        callback(false);
      }
    });
  }
};

/**
 *  获取sessionkey
 */
let isgetsessionKey = (r) => {
  if (_webapp.checkSessionKey()) {
    return {
      'sessionkey': _webapp.sessionKey.data.sessionkey
    }
  } else {

    if(r === true){
      return {};
    }

    _webapp.getSessionKey(res => {
      if(_webapp.checkSessionKey()){
        isgetsessionKey(true)
      }
    })
  }
}


/**
 * 配置请求参数
 */
let setParams = (params, callback) => {
  let param = params.data
  let type = params.method
  let url = params.url
  let auth_key = ''
  let access_token = ''

  let apiToken = _webapp.getApiTokenSync();
  let sessionKey = _webapp.getSessionKeySync();
  if(sessionKey.data){
    param['sessionkey'] = sessionKey.data.sessionkey;
  }else {
    param['sessionkey']=''
  }
  param = _webapp.getSignData(param, apiToken.data.auth_key);
  // _webapp.log(param);
  return breviaryfoo({type: type, url: url, params: param, callback, apitoken: apiToken.data.access_token})
}


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
  /**p
   * 获取团队数量统计
   */
  teamsStatistics: {url: `${base}/commissions/teamsStatistics`, method: 'GET', header, dataType},
  /**
   *
   */
  withdrawals_get: {url: `${base}/commissions/withdrawals`, method: 'GET', header, dataType},
  withdrawals_post: {url: `${base}/commissions/withdrawals`, method: 'POST', header, dataType},

  // 团队梯队
  teamsLevelLists: {url: `${base}/commissions/teamsLevelLists`, method: 'GET', header, dataType},

  //团队梯队人数
  teamsLevelCount: {url: `${base}/commissions/teamsLevelCount`, method: 'GET', header, dataType}
};

const goods = {
  product: {url: `${base}/products`, method: 'GET', header, dataType},  //获取单一商品或商品组
  goodsIndex: {url: `${base}/products/goodsIndex`, method: 'GET', header, dataType},
  advs: {url: `${base}/slides`, method: 'GET', header, dataType},
  categorys: {url: `${base}/products/categories`, method: 'GET', header, dataType},  //分类检索
  attributes: {url: `${base}/products/attributes`, method: 'GET', header, dataType}, //获取指定属性的商品
  category: {url: `${base}/categories`, method: 'GET', header, dataType}, //首页分类
  search: {url: `${base}/products/search`, method: 'GET', header, dataType}, //获取指定属性的商品
  history: {url: `${base}/products/history`, method: 'GET', header, dataType}, //历史足迹
  deletehistory: {url: `${base}/products/history`, method: 'DELETE', header, dataType}, //删除历史足迹
  adv: {url: `${base}/wxappadvs`, method: 'GET', header, dataType}, //广告
  cateGoods: {url: `${base}/goods/cateGoods`, method: 'GET', header, dataType} //广告
}

const collect = {
  list: {url: `${base}/products/favorite`, method: 'GET', header, dataType},  //收藏列表
  add: {url: `${base}/products/favorite`, method: 'POST', header, dataType},  //添加收藏
  remove: {url: `${base}/products/favorite`, method: 'DELETE', header, dataType},  //删除收藏
}


/**
 * 商品详情
 */
const product = {
  productDetail: {url: `${base}/products`, method: 'GET', header, dataType}
};
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
/**
 * 退款申请中
 */
const orderRes = {orderR: {url: `${base}/orders/refund`, method: 'GET', header, dataType}};
const dispatchMoney = {dispatchMoney: {url: `${base}/orders/dispatchMoney`, method: 'GET', header, dataType}};


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
  addresses_get: {url: `${base}/addresses`, method: 'GET', header, dataType},
  addresses_delete: {url: `${base}/addresses`, method: 'DELETE', header, dataType},
  addresses_put: {url: `${base}/addresses`, method: 'PUT', header, dataType}
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
 * 首页商品展示 yellowStar
 */
const MYGOODS = {url: `${base}/products`, method: 'GET', header, dataType}

/**
 * 购物车 yellowStar
 */
const MYCARTS1 = {url: `${base}/carts`, method: 'GET', header, dataType}

const MYCARTS3 = {url: `${base}/carts`, method: 'DELETE', header, dataType}

const USERAVATARS = {url: `${base}/uploads`, method: 'PUT', header, dataType}

/**
 * 个人中心 yellowStar
 */
const USERINFO = {url: `${base}/members`, method: 'PUT', header, dataType}

/**
 * 购物车数量 yellowStar
 */
const CARTNUMS = {url: `${base}/carts/cartNums`, method: 'GET', header, dataType}


export const orderLists = function (params, callback) {
  setParams(Object.assign(params, commissions.orderLists), callback)
};
/**
 * 获取团队数量统计
 * @param params
 * @param callback
 */
export const teamsStatistics = function (params, callback) {
  setParams(Object.assign(params, commissions.teamsStatistics), callback)
};
/**
 * 佣金统计
 * @param params
 * @param callback
 */
export const recordStatistics_get = function (params, callback) {
  setParams(Object.assign(params, commissions.recordStatistics_get), callback)
};
/**
 * 获取团队数量统计
 * @param params
 * @param callback
 */
export const teamsLists = function (params, callback) {
  setParams(Object.assign(params, commissions.teamsLists), callback)
};
export const teams = function (params, callback) {
  setParams(Object.assign(params, commissions.teams), callback)
};

//团队梯队
export const teamsLevelLists = function (params, callback) {
  setParams(Object.assign(params, commissions.teamsLevelLists), callback)
};

//团队梯队人数
export const teamsLevelCounts = function (params, callback) {
  setParams(Object.assign(params, commissions.teamsLevelCount), callback)
};

//订单列表

/**
 * 订单统计
 * @param params
 * @param callback
 */
export const orderStatistics = function (params, callback) {
  setParams(Object.assign(params, commissions.orderStatistics), callback)
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
  setParams(Object.assign(params, commissions.orders), callback)
};


/**
 * 用户信息获取
 * @param params
 * @param callback
 */

export const memberInfo = function (params, callback) {
  setParams(Object.assign(params, members.memberInfo), callback)
};
/**
 * 提现
 */
export const withdrawals_get = function (params, callback) {
  setParams(Object.assign(params, commissions.withdrawals_get), callback)
};
export const withdrawals_post = function (params, callback) {
  setParams(Object.assign(params, commissions.withdrawals_post), callback)
};

/**
 * 首页商品展示 yellowStar
 */
export const GET_MYGOODS = function (params, callback) {
  setParams(Object.assign(params, MYGOODS), callback)
};

/**
 * 购物车 yellowStar
 */
export const GET_MYCARTS = function (params, callback) {
  setParams(Object.assign(params, MYCARTS1), callback)
};

const MYCARTS2 = {url: `${base}/carts`, method: 'PUT', header, dataType}

export const PUT_MYCARTS = function (params, callback) {
  setParams(Object.assign(params, MYCARTS2), callback)
};

export const DELETE_MYCARTS = function (params, callback) {
  setParams(Object.assign(params, MYCARTS3), callback)
};

/**
 * 下单 yellowStar
 */
const ORDER1 = {url: `${base}/orders/confirm`, method: 'GET', header, dataType}
export const GET_ORDER1 = function (params, callback) {
  setParams(Object.assign(params, ORDER1), callback)
};


/**
 * 地址列表管理
 * @param params
 * @param callback
 */
export const addresses_get = function (params, callback) {
  setParams(Object.assign(params, addresses.addresses_get), callback)
};

/**
 * 新增地址
 */
export const addresses_post = function (params, callback) {
  setParams(Object.assign(params, addresses.addresses_post), callback)
};
/**
 * 删除地址
 */
export const addresses_delete = function (params, callback) {
  setParams(Object.assign(params, addresses.addresses_delete), callback)
};
/**
 * 地址信息更新
 * @param params
 * @param callback
 */
export const addresses_put = function (params, callback) {
  setParams(Object.assign(params, addresses.addresses_put), callback)
};

/**
 * 商品详情
 */

export const ProductDetail = function (params, callback) {
  setParams(Object.assign(params, goods.product), callback)
}
export const GoodsIndex = function (params, callback) {
  setParams(Object.assign(params, goods.goodsIndex), callback)

}
export const Advs = function (params, callback) {
  setParams(Object.assign(params, goods.advs), callback)
}
export const Categorys = function (params, callback) {
  setParams(Object.assign(params, goods.categorys), callback)
}

export const Category = function (params, callback) {
  setParams(Object.assign(params, goods.category), callback)

}


export const Search = function (params, callback) {
  setParams(Object.assign(params, goods.search), callback)

}
export const Attributes = function (params, callback) {
  setParams(Object.assign(params, goods.attributes), callback)
}


export const CateGoods = function (params, callback) {
  setParams(Object.assign(params, goods.cateGoods), callback)
}











/**
 * 加入购物车
 */
export const addCart = function (params, callback) {
  setParams(Object.assign(params, cart.addCart), callback)
};
/**
 * 订单列表
 */
export const orderList = function (params, callback) {
  setParams(Object.assign(params, order.orderList), callback)
};
/**
 * 订单详情
 */
export const orderDetail = function (params, callback) {
  setParams(Object.assign(params, orderd.orderDetail), callback)
};


/**
 * 快递
 */
export const expressInfo = function (params, callback) {
  setParams(Object.assign(params, express.exp), callback)
};

/**
 * 配送
 */
export const dispatchs_get = function (params, callback) {
  setParams(Object.assign(params, dispatchs.dispatchs_get), callback)
};
/**
 * 上传订单
 * @param params
 * @param callback
 */
export const confirm_post = function (params, callback) {
  setParams(Object.assign(params, ordersinfo.confirm_post), callback)
};

/**
 * 支付订单获取
 */
export const payment_get = function (params, callback) {
  setParams(Object.assign(params, ordersinfo.payment_get), callback)
};

/**
 * 支付订单提交
 */
export const payment_post = function (params, callback) {
  setParams(Object.assign(params, ordersinfo.payment_post), callback)
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
  /*_webapp.requestx(Object.assign(params, qrimg), function (res) {
    callback(res)
  })*/
  setParams(Object.assign(params, qrimg), callback);
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
export const PUT_USERINFO = function (params, callback) {
  setParams(Object.assign(params, USERINFO), callback)
};
export const PUT_USERAVATARS = function (params, callback) {
  setParams(Object.assign(params, USERAVATARS), callback)
};
export const USERPHOTO = function () {
  _webapp.uploadImg((res) => {
    callback(res)
  })
}

/**
 * 购物车数量 yellowStar
 */
export const GET_CARTNUMS = function (params, callback) {
  setParams(Object.assign(params, CARTNUMS), callback)
};

/**
 * 退出登录 yellowStar
 */
export const LOGINOUT = function () {
  _webapp.logOut((res) => {
    }
  )
}

/**
 * 订单操作
 */
export const orderManu = function (params, callback) {
  setParams(Object.assign(params, orderDo.orderD), callback)
};

export const orderRe = function (params, callback) {
  setParams(Object.assign(params, orderRes.orderR), callback)
};

export const DispatchMoney = function (params, callback) {
  setParams(Object.assign(params, dispatchMoney.dispatchMoney), callback)
};




/*
 * 收藏
 * */
export const Favorites = function (params, callback) {
  setParams(Object.assign(params, collect.list), callback)
};
export const Favorite_add = function (params, callback) {
  setParams(Object.assign(params, collect.add), callback)
};
export const Favorite_remove = function (params, callback) {
  setParams(Object.assign(params, collect.remove), callback)
};
export const History = function (params, callback) {
  setParams(Object.assign(params, goods.history), callback)
};
export const Deletehistory = function (params, callback) {
  setParams(Object.assign(params, goods.deletehistory), callback)
};

// 新增  订单统计
const STATISTICS = {url: `${base}/orders/statistics`, method: 'GET', header, dataType}
export const GET_STATISTICS= function (params, callback) {
  setParams(Object.assign(params, STATISTICS), callback)
};

// 新增  首页商品图
const HOMEGOODS={url: `${base}/goods/goodsIndex`, method: 'GET', header, dataType}
export const GET_HOMEGOODS= function (params, callback) {
  setParams(Object.assign(params, HOMEGOODS), callback)
};


// 新增  首页广告图
const HOMEADVERTISEMENT={url: `${base}/wxappadvs/wxappadvs`, method: 'GET', header, dataType}
export const GET_HOMEADVERTISEMENT= function (params, callback) {
  setParams(Object.assign(params, HOMEADVERTISEMENT), callback)
};

// 新增  首页轮播图
const ADVERTISEMENT = { url: `${base}/slides`, method: 'GET', header, dataType };
export const GET_ADVERTISEMENT = function (params, callback) {
  setParams(Object.assign(params, ADVERTISEMENT), callback)
}
