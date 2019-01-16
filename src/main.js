import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import Home from './components/HelloFromVux'
import  { AlertPlugin } from 'vux'

Vue.use(VueRouter)
Vue.use(AlertPlugin)

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
