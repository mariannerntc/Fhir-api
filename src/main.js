import Vue from 'vue'
import VueResource from 'vue-resource'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueResource)

Vue.http.options.root = 'http://hapi.fhir.org/baseDstu3'

// Vue.http.interceptors.push((request, next) => {
//   next((response) => {
//     if (request.after) {
//       request.after.call(this, response)
//     }
//   })
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
