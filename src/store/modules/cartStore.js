import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    userAccessKey: null,
    itemsList: [],
    pagesCount: 0,
  },

  getters: {
    getItemsList(state) {
      return state.itemsList
    },
    getPagesCount(state) {
      return state.pagesCount
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
    }
  },

  actions: {
    getUserAccessKey(context) {
      return new Promise ( (resolve) => {
        let userAccessKey = localStorage.getItem('userAccessKey')
        
        if (!userAccessKey) {
          axios
            .get(API_BASE_URL + '/users/accessKey')
            .then( response => {
              context.commit('setUserAccessKey', response.data.accessKey)
              localStorage.setItem('userAccessKey', response.data.accessKey)
            })
            .catch( () => {

            })
            .then( () => {
              resolve(context.state.userAccessKey)
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
            console.log(response.data)
            context.commit('setPagesCount', response.data.pagination.pages)
            resolve(context.state.itemsList)
          })
          .catch( () => {
            context.commit('setItemsList', [])
            context.commit('setPagesCount', 0)
            reject(context.state.itemsList)
          })
      })     
    }
  }
}