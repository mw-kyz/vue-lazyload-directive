import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'  
import MyVueLazyload from './modules/my-vue-lazyload'  

Vue.config.productionTip = false

// 使用原版 vue-lazyload
// Vue.use(VueLazyload, {
//   loading: 'http://localhost:3000/images/loading.gif',
//   error: 'http://localhost:3000/images/error.webp',
//   preload: 1
// })

// 使用 my-vue-lazyload
Vue.use(MyVueLazyload, {
  loading: 'http://localhost:3000/images/loading.gif',
  error: 'http://localhost:3000/images/error.webp',
  preload: 1
})

new Vue({
  render: h => h(App),
}).$mount('#app')
