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
const VipCenter = r => require.ensure([], () => r(require('../view/Home.vue')), 'VipCenter')
const QrCode = r => require.ensure([], () => r(require('../view/QrCode.vue')), 'QrCode')

/**
 * 商品详情模块
 */
const goodsDetails = r => require.ensure([], () => r(require('../components/Home/productDetail.vue')), 'goodsDetails')



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
        {
          path: '/detail',
          name: 'detail'
        }
      ]
    },
  ]
})
