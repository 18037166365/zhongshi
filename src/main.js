import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'

import Home from './components/HelloFromVux'
import { LoadingPlugin, ToastPlugin, DatetimePlugin, AlertPlugin } from 'vux';
import { TransferDom } from 'vux'

//微信title自定义
Vue.use(require('vue-wechat-title'))
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(AlertPlugin)
Vue.directive('transfer-dom', TransferDom)

const routes = [{
  path: '/',
  component: Home
}]

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
