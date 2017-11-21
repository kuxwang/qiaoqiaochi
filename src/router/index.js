import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


//首页
const Home = r => require.ensure([], () => r(require('../view/Home.vue')), 'Home');

//点餐
const Class = r => require.ensure([], () => r(require('../view/Class.vue')), 'Home');

//个人中心
const UserCenter = r => require.ensure([], () => r(require('../view/UserCenter.vue')), 'UserCenter');

//购物车
const ShoppingCart = r => require.ensure([], () => r(require('../view/ShoppingCart.vue')), 'ShoppingCart');

//二维码
const QrCode = r => require.ensure([], () => r(require('../view/QrCode.vue')), 'QrCode');

// 会员中心
const VipCenter = r => require.ensure([], () => r(require('../view/distributionCenter.vue')), 'VipCenter');

//商品详情
const Details = r => require.ensure([], () => r(require('../components/category/goodsDetail.vue')), 'Details');

//支付选择
const Payselect = r => require.ensure([], () => r(require('../components/common/payselect.vue')), 'Payselect');

//推广订单
const Extension = r => require.ensure([], () => r(require('../components/distribution/extension.vue')), 'Extension');

//提现明细
const Moneylist = r => require.ensure([], () => r(require('../components/distribution/Moneylist.vue')), 'Moneylist');

//提现
const Takemoney = r => require.ensure([], () => r(require('../components/distribution/Takemoney.vue')), 'Takemoney');

//用户详情
const PartnerInfo = r => require.ensure([], () => r(require('../components/distribution/partnerInfo.vue')), 'PartnerInfo');

//我的伙伴
const Partner = r => require.ensure([], () => r(require('../components/distribution/partner.vue')), 'Partner');

//订单信息
const Orderinfo = r => require.ensure([], () => r(require('../components/distribution/orderinfo.vue')), 'Orderinfo');

//配送方式
const DeliveryMode = r => require.ensure([], () => r(require('../components/userCenter/address/DeliveryMode.vue')), 'DeliveryMode');

//确认订单
const ConfirmOrder = r => require.ensure([], () => r(require('../components/userCenter/address/ConfirmOrder.vue')), 'ConfirmOrder');

//管理收货地址
const ManageAddress = r => require.ensure([], () => r(require('../components/userCenter/address/manageAddress.vue')), 'ManageAddress');

//查看物流
const Logistics = r => require.ensure([], () => r(require('../components/userCenter/order/logistics.vue')), 'Logistics');

//申请退款
const Drawback = r => require.ensure([], () => r(require('../components/userCenter/order/drawback.vue')), 'Drawback');

//查看退款申请
const DrawbackInfo = r => require.ensure([], () => r(require('../components/userCenter/order/drawbackInfo.vue')), 'DrawbackInfo');

//订单详情
const Orderd = r => require.ensure([], () => r(require('../components/userCenter/order/orderDetail.vue')), 'Orderd');

//我的订单
const MyOrder = r => require.ensure([], () => r(require('../components/userCenter/order/MyOrder.vue')), 'MyOrder');

//我的收藏
const Collect = r => require.ensure([], () => r(require('../components/userCenter/user/Collect.vue')), 'Collect');

//我的足迹
const Footprint = r => require.ensure([], () => r(require('../components/userCenter/user/Footprint.vue')), 'Footprint');

//地址编辑
const EditAddress = r => require.ensure([], () => r(require('../components/userCenter/address/EditAddress.vue')), 'EditAddress');

//个人信息
const UserInfo = r => require.ensure([], () => r(require('../components/userCenter/user/UserInfo.vue')), 'UserInfo');

// 会员中心 提现
const Outmoney = r => require.ensure([], () => r(require('../components/common/outmoney.vue')), 'Outmoney')


//会员梯队
const PartnerLevel = r => require.ensure([], () => r(require('../components/distribution/partnerLevel.vue')), 'PartnerLevel');


const Search = r => require.ensure([], () => r(require('../components/mode/search.vue')), 'Category')



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
          path: '/search',
          name: 'search',
          component: Search,
        }
      ]
    },
    //分类
    {
      path: '/class',
      name: 'class',
      component: Class,
    },
    //购物车
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },
    //个人中心
    {
      path: '/userCenter',
      name: 'userCenter',
      component: UserCenter,
      children: [
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
            {
              path: '/order/pay',
              name: 'orderpay',
              component: Payselect,
            },
          ]
        },
        //足迹
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
        //收藏
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
        //会员中心
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
            // {
            //   path: '/partner',
            //   name: 'partner',
            //   component: Partner,
            //   children: [
            //     {
            //       path: '/partnerInfo',
            //       name: 'partnerInfo',
            //       component: PartnerInfo
            //     },
            //   ]
            // },
            {
              path: '/partnerlevel',
              name: 'partnerlevel',
              component: PartnerLevel,
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
          path: '/userInfo',
          name: 'userInfo',
          component: UserInfo
        }
      ]
    },
    //确认订单
    {
      path: '/confirmorder',
      name: 'confirmorder',
      component: ConfirmOrder,
      children: [
        //支付选择
        {
          path: '/payselect',
          name: 'payselect',
          component: Payselect
        },
        //配送方式
        {
          path: '/deliverymode',
          name: 'deliverymode',
          component: DeliveryMode
        },
        //地址管理
        {
          path: '/address',
          name: 'manageAddress',
          component: ManageAddress,
          children: [
            //地址编辑
            {
              path: '/address/edit',
              name: 'editAddress',
              component: EditAddress
            },
          ]
        },
      ]
    },
    //二维码
    {
      path: '/qrCode',
      name: 'qrCode',
      component: QrCode
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
