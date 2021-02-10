import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPage from '@/pages/ListPage'
import ErrorPage from '@/pages/ErrorPage'
import ItemPage from '@/pages/ItemPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'
import OrderInfoPage from '@/pages/OrderInfoPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/list/:id',
    name: 'listPage',
    component: ListPage
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
    path: '/item/:id/:color',
    name: 'itemPage',
    component: ItemPage
  },

  {
    path: '/item/:id',
    redirect: '/item/:id/0'
  },

  {
    path: '/cart/',
    name: 'cartPage',
    component: CartPage
  },

  {
    path: '/order/',
    name: 'orderPage',
    component: OrderPage
  },

  {
    path: '/order/:id',
    name: 'orderInfoPage',
    component: OrderInfoPage
  },

  {
    path: '*',
    name: 'errorPage',
    component: ErrorPage
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
