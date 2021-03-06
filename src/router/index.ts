import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
