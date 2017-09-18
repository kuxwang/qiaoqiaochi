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
const Details = r => require.ensure([], () => r(require('../components/category/productDetail.vue')), 'Category')



// const Payselect = r => require.ensure([], () => r(require('../components/common/payselect.vue')), 'goodsDetails')
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
          name:'list2',
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

    //提交订单流程
    {
      path:'/empty',
      component:Empty,
      children:[
        {
          path: '/confirmOrder',
          name: 'confirmOrder',
          component: ConfirmOrder,
          children: [     //选择地址  配送方式
            {
              path: '/confirmOrder/deliveryAddress',
              name: 'submitdeliveryAddress',
              component: DeliveryAddress,
              children: [
                {
                  path: '/confirmOrder/deliveryAddress/manageAddress',
                  name: 'submitmanageAddress',
                  component: ManageAddress,
                  children: [
                    {
                      path: '/confirmOrder/deliveryAddress/manageAddress/addAddress',
                      name: 'submitaddAddress',
                      component: AddAddress
                    },
                    {
                      path: '/confirmOrder/deliveryAddress/manageAddress/editAddress',
                      name: 'submiteditAddress',
                      component: EditAddress
                    }
                  ]
                },
              ]  //
            },
            {
              path: '/deliveryMode',
              name: 'deliveryMode',
              component: DeliveryMode
            }
          ]
        },
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
          path: '/deliveryAddress',
          name: 'deliveryAddress',
          component: DeliveryAddress,
          children: [
            {
              path: '/manageAddress',
              name: 'manageAddress',
              component: ManageAddress,
              children: [
                {
                  path: '/addAddress',
                  name: 'addAddress',
                  component: AddAddress
                },
                {
                  path: '/editAddress',
                  name: 'editAddress',
                  component: EditAddress
                }
              ]
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
