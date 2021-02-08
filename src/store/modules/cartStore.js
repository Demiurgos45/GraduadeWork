import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    userAccessKey: null,
    itemsList: [],
    pagesCount: 0,
    categories: null,
    materials: null,
    seasons: null
  },

  getters: {
    getItemsList(state) {
      return state.itemsList
    },
    getPagesCount(state) {
      return state.pagesCount
    },
    getCategories(state) {
      if (state.categories) {
        return state.categories.filter(category => category.title !== 'test')
      }
      return null
    },
    getMaterials(state) {
      if (state.materials) {
        return state.materials.filter(material => material.title !== 'test')
      }
      return null
    },
    getSeasons(state) {
      return state.seasons
    }
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
    setMaterials(state, materials) {
      state.materials = materials
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setSeasons(state, seasons) {
      state.seasons = seasons
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
              // There's nothing to do here yet
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
            context.commit('setPagesCount', response.data.pagination.pages)
            resolve(context.state.itemsList)
          })
          .catch( () => {
            context.commit('setItemsList', [])
            context.commit('setPagesCount', 0)
            reject(context.state.itemsList)
          })
      })     
    },

    getMaterials(context) {
      return new Promise ( (resolve) => {
        axios
          .get(API_BASE_URL + '/materials')
          .then( response => {
            context.commit('setMaterials', response.data.items)
          })
          .catch( () => {
            // There's nothing to do here yet
          })
          .then( () => {
            resolve(context.state.materials)
          })
      })
    },

    getCategories(context) {
      return new Promise ( (resolve) => {
        axios
          .get(API_BASE_URL + '/productCategories')
          .then( response => {
            context.commit('setCategories', response.data.items)
          })
          .catch( () => {
            // There's nothing to do here yet
          })
          .then( () => {
            resolve(context.state.categories)
          })
      })
    },

    getSeasons(context) {
      return new Promise ( (resolve) => {
        axios
          .get(API_BASE_URL + '/seasons')
          .then( response => {
            context.commit('setSeasons', response.data.items)
          })
          .catch( () => {
            // There's nothing to do here yet
          })
          .then( () => {
            resolve(context.state.seasons)
          })
      })
    }
    
  }
}