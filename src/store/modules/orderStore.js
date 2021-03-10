import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    deliveries: [],
    payments: [],
    orderInfo: null
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
    async loadDeliveries({commit, dispatch}) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/deliveries')
        commit('setDeliveries', response.data)
        commit('subLoader')
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    },

    async loadPayments({commit, dispatch}, deliveryTypeId) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/payments', {
          params: {
            deliveryTypeId
          }
        })
        commit('setPayments', response.data)
        commit('subLoader')
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    },

    async sendOrder({commit, dispatch}, data) {
      commit('addLoader')
      try {
        const response = await axios.post(API_BASE_URL + '/orders',
          {
            ...data.data
          },
          {
            params: {
              userAccessKey: data.userAccessKey
            }
          }
        )
        commit('setOrderInfo',response.data)
        commit('subLoader')
        return response
      }
      catch(error) {
        commit('subLoader')
        if (error.response) {
          return error.response
        }
        dispatch('showError', error)
        return null
      }
    },

    async getOrderInfo({commit}, data) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/orders/' + data.id, {
          params: {
            userAccessKey: data.userAccessKey
          }
        })
        commit('setOrderInfo',response.data)
        commit('subLoader')
        return null
      }
      catch(error) {
        commit('subLoader')
        return error
      }
    }
  }
}