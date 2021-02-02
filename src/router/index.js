import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPage from '@/pages/ListPage'
import ErrorPage from '@/pages/ErrorPage'

Vue.use(VueRouter)

const routes = [
  {
    name: 'listPage',
    component: ListPage,
    path: '/list/:id'
  },

  {
    path: '/',
    redirect: {
      name: 'listPage',
      params: {
        id: 0
      }
    }
  },

  {
    name: 'errorPage',
    component: ErrorPage,
    path: '*'
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
