import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPage from '@/pages/ListPage'
import ErrorPage from '@/pages/ErrorPage'
import ItemPage from '@/pages/ItemPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'
import orderInfoPage from '@/pages/OrderInfoPage'

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
    name: 'itemPage',
    component: ItemPage,
    path: '/item/:id'
  },

  {
    name: 'cartPage',
    component: CartPage,
    path: '/cart/'
  },

  {
    name: 'orderPage',
    component: OrderPage,
    path: '/order/'
  },

  {
    name: 'orderInfoPage',
    component: orderInfoPage,
    path: '/order/:id'
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
