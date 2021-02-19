import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    deliveries: null,
    payments: null
  },

  getters: {
    getDeliveries(state) {
      return state.deliveries || []
    },

    getPayments(state) {
      return state.payments || []
    }
  },

  mutations: {
    setDeliveries(state, deliveries) {
      state.deliveries = deliveries
    },
    setPayments(state, payments) {
      state.payments = payments
    }
  },

  actions: {
    loadDeliveries(context) {
      return new Promise ( (resolve, reject) => {
        axios
          .get(API_BASE_URL + '/deliveries')
          .then( response => {
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
          .then( response => {
            context.commit('setPayments', response.data)
            resolve()
          })
          .catch( (error) => {
            reject(error)
          })
      })
    }
  }
}