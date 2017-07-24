import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
Vue.use(Router)

/**
 * index模块
 */
const app = r => require.ensure([], () => r(require('../App.vue')), 'app')
// const  = r => require.ensure([], () => r(require('../components/index/alertLogin.vue')), 'alertLogin')

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
          redirect: '/home'
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
