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

// const Order = r => require.ensure([], () => r(require('../view/Order.vue')), 'Order')
const MyOrder = r => require.ensure([], () => r(require('../view/MyOrder.vue')), 'Order')
const ShoppingCart = r => require.ensure([], () => r(require('../view/ShoppingCart.vue')), 'ShoppingCart')
const VipCenter = r => require.ensure([], () => r(require('../view/distributionCenter.vue')), 'VipCenter')
const QrCode = r => require.ensure([], () => r(require('../view/QrCode.vue')), 'QrCode')

/**
 * 分销模块
 * @param r
 */
const extension = r => require.ensure([], () => r(require('../components/distribution/extension.vue')), 'vipCvnenter')
const partner = r => require.ensure([], () => r(require('../components/distribution/partner.vue')), 'vipCvnenter')
const partnerInfo = r => require.ensure([], () => r(require('../components/distribution/partnerInfo.vue')), 'vipCvnenter')
const orderinfo = r => require.ensure([], () => r(require('../components/distribution/orderinfo.vue')), 'vipCvnenter')
const UserInfo = r => require.ensure([], () => r(require('../components/VipCenter/UserInfo.vue')), 'distribution')


/**
 *
 * @param 提现  提现列表
 */
const takemoney = r => require.ensure([], () => r(require('../components/distribution/Takemoney.vue')), 'vipCvnenter')
const Moneylist = r => require.ensure([], () => r(require('../components/distribution/Moneylist.vue')), 'vipCvnenter')


/**
 * 商品详情模块
 */
const goodsDetails = r => require.ensure([], () => r(require('../components/Home/productDetail.vue')), 'goodsDetails')
const payselect = r => require.ensure([], () => r(require('../components/common/payselect.vue')), 'goodsDetails')
const Outmoney = r => require.ensure([], () => r(require('../components/common/outmoney.vue')), 'goodsDetails')

/**
 * 确认订单页面
 */
const ConfirmOrder = r => require.ensure([], () => r(require('../components/common/ConfirmOrder.vue')), 'common')
const DeliveryAddress = r => require.ensure([], () => r(require('../components/common/DeliveryAddress.vue')), 'common')
const AddAddress = r => require.ensure([], () => r(require('../components/common/AddAddress.vue')), 'common')
const DeliveryMode = r => require.ensure([], () => r(require('../components/common/DeliveryMode.vue')), 'common')
const manageAddress = r => require.ensure([], () => r(require('../components/common/manageAddress.vue')), 'common')
const editAddress = r => require.ensure([], () => r(require('../components/common/editAddress.vue')), 'common')
/**
 * 订单详情
 */
const Orderd = r => require.ensure([], () => r(require('../components/order/orderDetail.vue')), 'Orderd')
const Logistics = r => require.ensure([], () => r(require('../components/order/logistics.vue')), 'Logistics')
const Drawback = r => require.ensure([], () => r(require('../components/order/drawback.vue')), 'Drawback')
const DrawbackInfo = r => require.ensure([], () => r(require('../components/order/drawbackInfo.vue')), 'DrawbackInfo')

export default new Router({
  routes: [
    {

      path: '',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/details',
          name: 'details',
          component: goodsDetails,
        },
      ]
    },
    {
      path: '/order',
      name: 'order',
      component: MyOrder,
      children: [
        {
          path: '/orderd',
          name: 'orderd',
          component: Orderd,
        },
        {
          path: '/logistics',
          name: 'logistics',
          component: Logistics,
        },
        {
          path: '/drawback',
          name: 'drawback',
          component: Drawback,
        },
        {
          path: '/drawbackInfo',
          name: 'drawbackInfo',
          component: DrawbackInfo,
        },

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
      children: [
        {
          path: '/vipCenter/userinfo',
          name: 'userinfo',
          component: UserInfo,
        },
        {
          path: '/extension',
          name: 'extension',
          component: extension,
          children: [
            {
              path: '/orderinfo',
              name: 'orderinfo',
              component: orderinfo
            },
          ]
        },
        {
          path: '/partner',
          name: 'partner',
          component: partner,
          children: [
            {
              path: '/partnerInfo',
              name: 'partnerInfo',
              component: partnerInfo
            },
          ]
        },
        {
          path: '/takemoney',
          name: 'takemoney',
          component: takemoney,
          children: [
            {
              path: '/moneylist',
              name: 'moneylist',
              component: Moneylist
            },
            {
              path: '/outmoney',
              name: 'outmoney',
              component: Outmoney
            }
          ]
        }
      ]
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: QrCode
    },
    {
      path: '/confirmorder',
      name: 'confirmorder',
      component: ConfirmOrder,
      children: [
        {
          path: '/deliveryaddress',
          name: 'deliveryaddress',
          component: DeliveryAddress,
          children: [
            {
              path: '/manageAddress',
              name: 'manageAddress',
              component: manageAddress,
              children: [
                {
                  path: '/addaddress',
                  name: 'addaddress',
                  component: AddAddress
                },
                {
                  path: '/editAddress',
                  name: 'editAddress',
                  component: editAddress
                }

              ]
            },

            {
              path: '/payselect',
              name: 'payselect',
              component: payselect
            }
          ]
        },
        {
          path: '/deliverymode',
          name: 'deliverymode',
          component: DeliveryMode
        }
      ]
    },

    {
      path: '/orderpayselect',
      name: 'orderpayselect',
      component: payselect
    },
    {
      path: '/payselect',
      name: 'payselect',
      component: payselect
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})
