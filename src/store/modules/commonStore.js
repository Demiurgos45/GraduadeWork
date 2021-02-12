import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    categories: null,
    materials: null,
    seasons: null,
    itemInfo: {}
  },

  getters: {
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
    },
    getItemInfo(state) {
      return state.itemInfo
    }
  },

  mutations: {
    setMaterials(state, materials) {
      state.materials = materials
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setSeasons(state, seasons) {
      state.seasons = seasons
    },
    setItemInfo(state, itemInfo) {
      state.itemInfo = itemInfo
    }
  },

  actions: {
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
            const categories = response.data.items
            categories.unshift({id: 0, title: 'Все категории'})
            context.commit('setCategories', categories)
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
    },

    getItemInfo(context, id) {
      return new Promise ( (resolve, reject) => {
        axios
          .get(API_BASE_URL + '/products/' + id)
          .then( (response) => {
            context.commit('setItemInfo', response.data)
            resolve(response.data)
          })
          .catch( error => {
            context.commit('setItemInfo', {})
            reject(error)
          })
      })
    }
  },
}