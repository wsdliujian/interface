import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
   //默认界面可不设置，现直接访问/oneFish
  /*{
    path: '/oneFish',
    name: 'oneFish',
    component: () => import('../views/index.vue')
  }*//*,
  {
    path: '/twoFish',
    name: 'twoFish',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/twoFish/index.vue')
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
