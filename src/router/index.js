import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * index模块
 */
const app = r => require.ensure([], () => r(require('../App.vue')), 'app')

/*
 *
 * */
import Home from '../view/Home.vue'
const Category = r => require.ensure([], () => r(require('../view/Category.vue')), 'Category')
const MyOrder = r => require.ensure([], () => r(require('../components/userCenter/order/MyOrder.vue')), 'Order')
const ShoppingCart = r => require.ensure([], () => r(require('../view/ShoppingCart.vue')), 'ShoppingCart')
const UserCenter = r => require.ensure([], () => r(require('../view/UserCenter.vue')), 'UserCenter')
const Empty = r => require.ensure([], () => r(require('../view/Empty.vue')), 'Empty')


/*
 * 个人中心
 * VipCenter 分销中心
 * Extension 推广订单
 * Partner 我的团队
 * partnerInfo 伙伴信息
 * Orderinfo 推广订单详情
 * UserInfo 用户信息
 * Takemoney 提现页面
 * Moneylist 提现列表
 *
 * */
const VipCenter = r => require.ensure([], () => r(require('../view/distributionCenter.vue')), 'UserCenter')
const Extension = r => require.ensure([], () => r(require('../components/distribution/extension.vue')), 'UserCenter')
const Partner = r => require.ensure([], () => r(require('../components/distribution/partner.vue')), 'UserCenter')
const PartnerInfo = r => require.ensure([], () => r(require('../components/distribution/partnerInfo.vue')), 'UserCenter')
const Orderinfo = r => require.ensure([], () => r(require('../components/distribution/orderinfo.vue')), 'UserCenter')
const UserInfo = r => require.ensure([], () => r(require('../components/userCenter/user/UserInfo.vue')), 'UserCenter')
const Takemoney = r => require.ensure([], () => r(require('../components/distribution/Takemoney.vue')), 'UserCenter')
const Moneylist = r => require.ensure([], () => r(require('../components/distribution/Moneylist.vue')), 'UserCenter')


/*
 *  分类模块
 *  List 分类列表
 *  Details 详情
 * */
const List = r => require.ensure([], () => r(require('../components/category/List.vue')), 'Category')
const Details = r => require.ensure([], () => r(require('../components/category/goodsDetail.vue')), 'Category')
// const Details = r => require.ensure([], () => r(require('../components/category/productDetail.vue')), 'Category')
// const payselect = r => require.ensure([], () => r(require('../components/common/payselect.vue')), 'goodsDetails')




const Payselect = r => require.ensure([], () => r(require('../components/common/payselect.vue')), 'goodsDetails')
const Outmoney = r => require.ensure([], () => r(require('../components/common/outmoney.vue')), 'goodsDetails')

/**
 * 确认订单页面
 */
const ConfirmOrder = r => require.ensure([], () => r(require('../components/userCenter/address/ConfirmOrder.vue')), 'submitOrder')
const DeliveryAddress = r => require.ensure([], () => r(require('../components/userCenter/address/DeliveryAddress.vue')), 'submitOrder')
const AddAddress = r => require.ensure([], () => r(require('../components/userCenter/address/AddAddress.vue')), 'submitOrder')
const DeliveryMode = r => require.ensure([], () => r(require('../components/userCenter/address/DeliveryMode.vue')), 'submitOrder')
const ManageAddress = r => require.ensure([], () => r(require('../components/userCenter/address/manageAddress.vue')), 'submitOrder')
const EditAddress = r => require.ensure([], () => r(require('../components/userCenter/address/EditAddress.vue')), 'submitOrder')
/**
 * 订单详情
 */
const Orderd = r => require.ensure([], () => r(require('../components/userCenter/order/orderDetail.vue')), 'Orderd')
const Logistics = r => require.ensure([], () => r(require('../components/userCenter/order/logistics.vue')), 'Logistics')
const Drawback = r => require.ensure([], () => r(require('../components/userCenter/order/drawback.vue')), 'Drawback')
const DrawbackInfo = r => require.ensure([], () => r(require('../components/userCenter/order/drawbackInfo.vue')), 'DrawbackInfo')


const Applys = r => require.ensure([], () => r(require('../components/userCenter/user/Apply.vue')), 'UserCenter')
const Coupon = r => require.ensure([], () => r(require('../components/userCenter/user/Coupon.vue')), 'UserCenter')
const Opinion = r => require.ensure([], () => r(require('../components/userCenter/user/Opinion.vue')), 'UserCenter')

const Collect = r => require.ensure([], () => r(require('../components/userCenter/user/Collect.vue')), 'UserCenter')
const Footprint = r => require.ensure([], () => r(require('../components/userCenter/user/Footprint.vue')), 'UserCenter')





export default new Router({
  routes: [
    //首页
    {
      path: '',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/details',
          name: 'details',
          component: Details,
        },
        {
          path:'/list',
          name:'list',
          component:List
        }
      ]
    },

    /*
     * 分类
     * */

    {
      path: '/category',
      name:'category',
      component:Category,
      children:[
        {
          path: '/category/list',
          name:'clist',
          component:List,
          children: [
            {
              path: 'list/details',
              name: 'detail',
              component: Details,
            },
          ]
        }
      ]
    },

    //购物车
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },


    //分销
    {
      path: '/vipCenter',
      name: 'vipCenter',
      component: VipCenter,
      children: [

        {
          path: '/extension',
          name: 'extension',
          component: Extension,
          children: [
            {
              path: '/orderinfo',
              name: 'orderinfo',
              component: Orderinfo
            },
          ]
        },
        {
          path: '/partner',
          name: 'partner',
          component: Partner,
          children: [
            {
              path: '/partnerInfo',
              name: 'partnerInfo',
              component: PartnerInfo
            },
          ]
        },
        {
          path: '/takemoney',
          name: 'takemoney',
          component: Takemoney,
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
      path: '/confirmorder',
      name: 'confirmorder',
      component: ConfirmOrder,
      meta: { nokeepAlive: true },
      children: [
        {
          path: '/confirmorder/details',
          name: 'confirmdetails',
          component: Details
        },
        {
          path: '/payselect',
          name: 'payselect',
          component: Payselect
        },
        {
          path: '/deliverymode',
          name: 'deliverymode',
          component: DeliveryMode
        }
      ]

    },
    {
      path: '/userCenter',
      name:'userCenter',
      component: UserCenter,
      children: [
        {
          path: '/order',
          name: 'order',
          component: MyOrder,
          children: [
            {
              path: '/orderd',
              // name: 'orderd',
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
          path: '/userCenter/userInfo',
          name: 'userInfo',
          component: UserInfo,
        },
        {
          path:'/userCenter/apply',
          name:'applys',
          component:Applys
        },
        {
          path:'/userCenter/coupon',
          name:'coupon',
          component:Coupon
        },
        {
          path:'/userCenter/opinion',
          name:'opinion',
          component:Opinion
        },
        {
          path: '/footprint',
          name: 'footprint',
          component: Footprint,
          children: [
            {
              path: '/footprint/details',
              name: 'fdetail',
              component: Details
            },
          ]
        },
        {
          path: '/collect',
          name: 'collect',
          component: Collect,
          children: [
            {
              path: '/collect/details',
              name: 'cdetails',
              component: Details
            },
          ]
        },
      ]
    },
    {
      path: '/deliveryaddress',
      name: 'deliveryaddress',
      component: DeliveryAddress,
      children: [
        {
          path: '/manageAddress',
          name: 'manageAddress',
          component: ManageAddress,
          children: [
            {
              path: '/addaddress',
              name: 'addaddress',
              component: AddAddress
            },
            {
              path: '/editAddress',
              name: 'editAddress',
              component: EditAddress
            },

          ]
        },
      ]
    },


    {
      path: '*',
      redirect: '/'
    }
  ]
})
