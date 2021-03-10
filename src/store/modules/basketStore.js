import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    userAccessKey: null,
    itemsList: [],
    pagesCount: 0,
    itemsCount: 0,
    userBasket: null
  },

  getters: {
    basketProductsCount(state) {
      return state.userBasket ? state.userBasket.items.length : 0
    },
    basketItemsCount(state) {
      return state.userBasket ? state.userBasket.items.reduce( (sum, item) => sum + item.quantity, 0) : 0
    },
    basketPrice(state) {
      return state.userBasket ? state.userBasket.items.reduce( (sum, item) => sum + item.quantity * item.price, 0): 0
    },
  },

  mutations: {
    setUserAccessKey(state, newUserAccessKey) {
      state.userAccessKey = newUserAccessKey
    },
    setItemsList(state, itemsList) {
      state.itemsList = itemsList
    },
    setPagesCount(state, pagesCount) {
      state.pagesCount = pagesCount
    },
    setItemsCount(state, itemsCount) {
      state.itemsCount = itemsCount
    },
    setUserBasket(state, basket) {
      state.userBasket = basket
    }
  },

  actions: {
    async loadBasket({commit, state, dispatch}) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/baskets', {
          params: {
            userAccessKey: state.userAccessKey
          }
        })
        commit('setUserBasket', response.data)
        commit('subLoader')
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    },

    async getUserAccessKey({commit, dispatch}) {
      let userAccessKey = localStorage.getItem('userAccessKey')

      if (!userAccessKey) {
        commit('addLoader')
        try {
          const response = await axios.get(API_BASE_URL + '/users/accessKey')
          commit('setUserAccessKey', response.data.accessKey)
          localStorage.setItem('userAccessKey', response.data.accessKey)
          commit('subLoader')
        }
        catch(error) {
          commit('subLoader')
          dispatch('showError', error)
        }
      }
      else {
        commit('setUserAccessKey', userAccessKey)
      }
    },

    async loadItems({commit, dispatch}, params) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/products', { params })
        commit('setItemsList', response.data.items)
        commit('setPagesCount', response.data.pagination.pages)
        commit('setItemsCount', response.data.pagination.total)
        commit('subLoader')
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    },

    async addToBasket({state, commit, dispatch}, params) {
      try {
        const response = await axios.post(API_BASE_URL + '/baskets/products',
          {...params},
          {
            params: {
              userAccessKey: state.userAccessKey
            }
        })
        commit('setUserBasket', response.data)
      }
      catch(error) {
        if ((error.response) &&
            (error.response.status === 400) &&
            (JSON.stringify(error.response)).indexOf('sizeId')) {
          dispatch('showDialog', {
            title: 'Приносим извинения',
            messageHtml: 'Выбранного размера нет в наличии'
          })
        }
        else {
          dispatch('showError', error)
        }
      }
    },

    async updateQuantity({state, commit, dispatch}, params) {
      if (params.quantity > 0) {
        try {
          const response = await axios.put(API_BASE_URL + '/baskets/products',
            {...params},
            {
              params: {
                userAccessKey: state.userAccessKey
              }
            })
            commit('setUserBasket', response.data)
          }
          catch(error) {
            dispatch('showError', error)
          }
      }
    },

    async deleteItem({state, commit, dispatch}, id) {
      try {
        const response = await axios.delete(API_BASE_URL + '/baskets/products', {
          params: {
            userAccessKey: state.userAccessKey
          },
          data: {
            basketItemId: id
          }
        })
        commit('setUserBasket', response.data)
      }
      catch(error) {
        dispatch('showError', error)
      }
    }
  }
}