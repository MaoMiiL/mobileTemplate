import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Before from '@/components/beforeLoadHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Before',
      component: Before
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/left',
      name: 'Left',
      component: ()=>import('../components/Left.vue')
    },
    {
      path: '/right',
      name: 'Right',
      component: ()=>import('../components/Right.vue')
    }
  ]
})
