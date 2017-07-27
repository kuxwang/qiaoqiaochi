import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
Vue.use(Router)

/**
 * index模块
 */
const app = r => require.ensure([], () => r(require('../App.vue')), 'app')
// const  = r => require.ensure([], () => r(require('../components/index/alertLogin.vue')), 'alertLogin')
//Home
import Home from '../view/Home.vue'
const Order = r => require.ensure([], () => r(require('../view/Order.vue')), 'Order')
const ShoppingCart = r => require.ensure([], () => r(require('../view/ShoppingCart.vue')), 'ShoppingCart')
const VipCenter = r => require.ensure([], () => r(require('../view/distributionCenter.vue')), 'VipCenter')
const QrCode = r => require.ensure([], () => r(require('../view/QrCode.vue')), 'QrCode')

/**
 * 分销模块
 * @param r
 */
const extension = r => require.ensure([], () => r(require('../components/distribution/extension.vue')), 'vipCenter')

/**
 * 商品详情模块
 */
const goodsDetails = r => require.ensure([], () => r(require('../components/Home/productDetail.vue')), 'goodsDetails')
/**
 * 订单详情
 */
const orderDetail = r => require.ensure([], () => r(require('../components/order/orderDetail.vue')), 'orderDetail')
/**
 * 查看物流
 */
const Logistics = r => require.ensure([], () => r(require('../components/order/logistics.vue')), 'Logistics')
/**
 * 申请退款
 */
const Drawback = r => require.ensure([], () => r(require('../components/order/drawback.vue')), 'Drawback')
/**
 * 查看申请退款详情
 */
const DrawbackInfo = r => require.ensure([], () => r(require('../components/order/drawbackInfo.vue')), 'DrawbackInfo')


export default new Router({
  // mode: 'history',
  // base: '/zhczwx/',
  routes: [
    {
      path: '/',
      component: app,//顶级路由
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          children: [
            {
              path: '/details',
              name: 'details',
              component: goodsDetails,
            }
          ]
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
          children:[
            {
              path:'/orderd',
              name:'orderd',
              component:orderDetail
            },{
              path:'/logistics',
              name:'logistics',
              component:Logistics
            },{
              path:'/drawback',
              name:'drawback',
              component:Drawback
            },{
              path:'/drawbackInfo',
              name:'drawbackInfo',
              component:DrawbackInfo
            }
          ]
        },
        {
          path: '/shoppingCart',
          name: 'shoppingCart',
          component: ShoppingCart
        },
        {
          path: '/vipCenter',
          name: 'vipCenter',
          component: VipCenter,
          children:[
            {
              path: '/extension',
              name: 'extension',
              component: extension,
            }
          ]
        },
        {
          path: '/qrCode',
          name: 'qrCode',
          component: QrCode
        },
        {
          path: '/detail',
          name: 'detail'
        }
      ]
    },
  ]
})
