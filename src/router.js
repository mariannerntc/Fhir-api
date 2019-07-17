import Vue from 'vue'
import Router from 'vue-router'
import Device from './views/Device.vue'
import Practitioner from './views/Practitioner.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'device',
      component: Device
    },
    {
      path: '/practitioner',
      name: 'practitioner',
      component: Practitioner
    }
  ]
})
