// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import myHeader from '@/components/header'
import myFooter from '@/components/footer'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Modal from '@/components/Modal'
import myBread from '@/components/myBread'
import {
  currency
} from './util/currency'
import Vuex from 'vuex'

import '../src/assets/css/login.css'

import fastclick from 'fastclick'
fastclick.attach(document.body)
Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg'
})
Vue.filter('currency', currency)

Vue.component('myHeader', myHeader)
Vue.component('myFooter', myFooter)
Vue.component('Modal', Modal)
Vue.component('myBread', myBread)
// Axios:挂载原型
Vue.prototype.$ajax = Axios
// Axios.defaults.baseURL = 'http://localhost:3000/'
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Axios:拦截器操作loadding
Axios.interceptors.request.use(function (config) {
  return config
})
Axios.interceptors.response.use(function (config) {
  return config
})
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
