import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(VueRouter)

const app = new Vue({
  ...App,
  router:router
})
app.$mount()
