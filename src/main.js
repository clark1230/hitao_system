import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
// 导入element
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
// 全局css
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
// import './mock' // simulation data
import { showMsg } from './utils/common'
import { showNotification } from './utils/common'

import * as filters from './filters' // global filters

Vue.prototype.api = window.g.api

Vue.prototype.baseMsg = showMsg
Vue.prototype.baseNotify = showNotification

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
