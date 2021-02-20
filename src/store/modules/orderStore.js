import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    deliveries: null,
    payments: null,
    orderInfo: null
  },

  getters: {
    getDeliveries(state) {
      return state.deliveries || []
    },

    getPayments(state) {
      return state.payments || []
    },

    getOrderInfo(state) {
      return state.orderInfo
    },

    getOrderTotalPrice(state) {
      return state.orderInfo.basket.items.reduce((total, item) => (item.price * item.quantity) + total, 0) || 0
    },
  },

  mutations: {
    setDeliveries(state, deliveries) {
      state.deliveries = deliveries
    },
    setPayments(state, payments) {
      state.payments = payments
    },
    setOrderInfo(state, info) {
      state.orderInfo = info
    }
  },

  actions: {
    loadDeliveries(context) {
      return new Promise ( (resolve, reject) => {
        axios
          .get(API_BASE_URL + '/deliveries')
          .then( (response) => {
            context.commit('setDeliveries', response.data)
            resolve()
          })
          .catch( (error) => {
            reject(error)
          })
      })
    },

    loadPayments(context, deliveryTypeId) {
      return new Promise ( (resolve, reject) => {
        axios
          .get(API_BASE_URL + '/payments', {
            params: {
              deliveryTypeId
            }
          })
          .then( (response) => {
            context.commit('setPayments', response.data)
            resolve()
          })
          .catch( (error) => {
            reject(error)
          })
      })
    },

    sendOrder(context, data) {
      return new Promise ( (resolve, reject) => {
        axios
          .post(API_BASE_URL + '/orders',
            {
              ...data.data
            },
            {
              params: {
                userAccessKey: data.userAccessKey
              }
            })
          .then( (response) => {
            context.commit('setOrderInfo',response.data)
            resolve(response)
          })
          .catch( (error) => {
            reject(error)
          })
      })
    },

    getOrderInfo(context, data) {
      return new Promise ( (resolve, reject) => {
        axios
          .get(API_BASE_URL + '/orders/' + data.id, {
            params: {
              userAccessKey: data.userAccessKey
            }
          })
          .then( (response) => {
            context.commit('setOrderInfo',response.data)
            resolve()
          })
          .catch( (error) => {
            reject(error)
          })
      })
    }
  }
}