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
    loadBasket(context) {
      return new Promise ( (resolve, reject) => {
        axios
          .get(API_BASE_URL + '/baskets', {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
          .then( (response) => {
            context.commit('setUserBasket', response.data)
            resolve()
          })
          .catch( (error) => {
            reject(error)
          })
      })
    },

    getUserAccessKey(context) {
      return new Promise ( (resolve, reject) => {
        let userAccessKey = localStorage.getItem('userAccessKey')
        
        if (!userAccessKey) {
          axios
            .get(API_BASE_URL + '/users/accessKey')
            .then( response => {
              context.commit('setUserAccessKey', response.data.accessKey)
              localStorage.setItem('userAccessKey', response.data.accessKey)
              resolve()
            })
            .catch( (error) => {
              reject(error)
            })
        } 
        else {
          context.commit('setUserAccessKey', userAccessKey)
          resolve(context.state.userAccessKey)
        }
      })
    },

    loadItems(context, params) {
      return new Promise ( (resolve, reject) => {
        axios
          .get(API_BASE_URL + '/products',
            {
              params
            }       
          )
          .then( response => {
            context.commit('setItemsList', response.data.items)
            context.commit('setPagesCount', response.data.pagination.pages)
            context.commit('setItemsCount', response.data.pagination.total)
            resolve(context.state.itemsList)
          })
          .catch( (error) => {
            context.commit('setItemsList', [])
            context.commit('setPagesCount', 0)
            reject(error)
          })
      })     
    },

    addToBasket(context, params) {
      return new Promise ( (resolve, reject) => {
        axios
          .post(API_BASE_URL + '/baskets/products',
            {...params},
            {
              params: {
                userAccessKey: context.state.userAccessKey
              }
          })
          .then( () => {
            resolve()
          })
          .catch( error => {
            reject(error)
          })
      })
    },

    updateQuantity(context, params) {
      if (params.quantity > 0) {
        axios
          .put(API_BASE_URL + '/baskets/products',
            {...params},
            {
              params: {
                userAccessKey: context.state.userAccessKey
              }
            })
          .then( (response) => {
            context.commit('setUserBasket', response.data)
          })
          .catch( (error) => {
            console.log(error)
          })
      }
    },

    deleteItem(context, id) {
      axios
        .delete(API_BASE_URL + '/baskets/products', {
          params: {
            userAccessKey: context.state.userAccessKey
          },
          data: {
            basketItemId: id
          }
        })
        .then( (response) => {
          context.commit('setUserBasket', response.data)
        })
        .catch( (error) => {
          console.log(error)
        })
    },

    clearBasket(context) {
      context.commit('setUserBasket', null)
    }
    
  }
}