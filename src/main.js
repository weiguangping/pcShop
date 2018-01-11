// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import myHeader from '@/components/header'
import myFooter from '@/components/footer'
import VueLazyLoad from 'vue-lazyload'

import '../src/assets/css/login.css'

import fastclick from 'fastclick'
fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg'
})

Vue.component('myHeader', myHeader)
Vue.component('myFooter', myFooter)
// Axios:挂载原型
Vue.prototype.$ajax = Axios
Axios.defaults.baseURL = ''
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Axios:拦截器操作loadding
Axios.interceptors.request.use(function (config) {
  return config
})
Axios.interceptors.response.use(function (config) {
  return config
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
