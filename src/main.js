// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../static/css/common.css'
import '../static/css/iconfont/iconfont.css'
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
Vue.prototype.axios=axios;

Vue.config.productionTip = false;

Vue.filter('setwh',(url,arg)=>{
	return url.replace(/w\.h/,arg)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
