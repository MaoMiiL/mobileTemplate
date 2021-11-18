// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//添加组件
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//添加http信号包
import axios from 'axios'
import vueAxios from 'vue-axios'
//添加store仓库包
import store from './store/store'



//调用
Vue.use(element)
Vue.use(vueAxios,axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用仓库
  components: { App },
  template: '<App/>'
})
