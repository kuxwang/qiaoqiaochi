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
// const Home = r => require.ensure([], () => r(require('../view/Home.vue')), 'kk')
import Home from '../view/Home.vue'
const Order = r => require.ensure([], () => r(require('../view/Order.vue')), 'Order')
const ShoppingCart = r => require.ensure([], () => r(require('../view/ShoppingCart.vue')), 'ShoppingCart')
const VipCenter = r => require.ensure([], () => r(require('../view/VipCenter.vue')), 'VipCenter')
const QrCode = r => require.ensure([], () => r(require('../view/QrCode.vue')), 'QrCode')

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
          name:'home',
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
        // {
        //   path: '/login_success',
        //   name: 'login_success',
        //   component: login_success
        // }
      ]
    },
  ]
})
