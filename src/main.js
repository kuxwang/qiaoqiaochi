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

import Vconsole from 'vconsole'

import {iGetSessionKey, iGetApiToken,} from './api/api.js'
import {_webapp} from './config/hook.js'


Vue.use(VueLazyload, {
  loading: require('./assets/images/default.gif')
})
// console.log(location.href);
fastclick.attach(document.body)
Vue.use(Vuex)
Vue.use(MintUI)
Vue.config.productionTip = false

var vsconsole = new Vconsole();


iGetApiToken(function(apiToken){
  console.log('apiToken', apiToken);
  if(apiToken) {
    if(_webapp.debug==false){
      _webapp.checkLogin(function (res) {
        console.log(res.statusCode)
        if(res.statusCode ==1){
          _webapp.getSessionKey(function () {
            new Vue({
              router,
              store,
              render: h => h(App)
            }).$mount('#app');
          })
        }else{
          console.log(-1)
          new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount('#app');
        }
      })

    }else {
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app');
    }

  }
});

