import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/'
import './config/rem'
import fastclick from 'fastclick'
import 'vue2-animate/dist/vue2-animate.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import {MessageBox} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

// import Vconsole from 'vconsole'

import {iGetSessionKey, iGetApiToken} from './api/api.js'
import {_webapp} from './config/hook.js'


Vue.use(VueLazyload, {
  loading: require('./assets/images/default.gif')
})
// console.log(location.href);
fastclick.attach(document.body)
Vue.use(Vuex)
Vue.use(MintUI)
Vue.config.productionTip = false

// var vsconsole = new Vconsole();


// MessageBox({
//   title: '友情提示',
//   message: '获取用户信息失败，可能是登陆超时或在其他设备中登陆，点击确认将为您跳转至登陆页面。',
//   showCancelButton: false,
//   closeOnClickModal : false
// }).then(action => {
//   _webapp.nativeLogin();
// });

iGetApiToken(function(apiToken){
  console.log('apiToken', apiToken);
  if(apiToken) {
    _webapp.checkLogin(function (res) {
      console.log(1212121)
      if(res.statusCode ==1){
        console.log(55555)
        iGetSessionKey(function(sessionKey){
          if(sessionKey === false){
            MessageBox({
              title: '友情提示',
              message: '获取用户信息失败，可能是登陆超时或在其他设备中登陆，点击确认将为您跳转至登陆页面。',
              showCancelButton: false,
              closeOnClickModal : false
            }).then(action => {
              _webapp.nativeLogin();
            });
          }else{
            console.log(-1)
            // console.log('run sessionKey');

            new Vue({
              router,
              store,
              render: h => h(App)
            }).$mount('#app');
          }
        });
      }
      else {
        console.log(-2)
        new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
      }
    })
  }else{
 /*   MessageBox({
      title: '友情提示',
      message: '很抱歉，系统可能出现了点问题，请您关闭APP（需后台任务清除）后重新尝试。',
      showCancelButton: false,
      closeOnClickModal : false
    }).then(action => {
      _webapp.nativeLogin();
    });*/
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});

