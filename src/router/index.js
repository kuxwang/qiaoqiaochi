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
const distribution = r => require.ensure([], () => r(require('../view/distributionCenter.vue')), 'distribution')

/**
 * 测试模块
 * @constructor
 */
const test = r => require.ensure([], () => r(require('../test/test.vue')), 'test')

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
          component: Home
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
        {
          path: '/shoppingCart',
          name: 'shoppingCart',
          component: ShoppingCart
        },
        {
          path: '/vipCenter',
          name: 'vipCenter',
          component: VipCenter
        },
        {
          path: '/qrCode',
          name: 'qrCode',
          component: QrCode
        },
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      children: [
        {
          path: '/distribution',
          name: 'distribution',
          component: distribution
        }
      ]
    },
  ]
})
