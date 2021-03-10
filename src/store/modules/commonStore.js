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
    async getMaterials({commit, dispatch}) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/materials')
        commit('setMaterials', response.data.items)
        commit('subLoader')
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    },

    async getCategories({commit, dispatch}) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/productCategories')
        let categories = response.data.items
        categories.unshift({id: 0, title: 'Все категории'})
        commit('setCategories', categories)
        commit('subLoader')
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    },

    async getSeasons({commit, dispatch}) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/seasons')
        commit('setSeasons', response.data.items)
        commit('subLoader')
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    },

    async getItemInfo({commit, dispatch}, id) {
      commit('addLoader')
      try {
        const response = await axios.get(API_BASE_URL + '/products/' + id)
        commit('setItemInfo', response.data)
        commit('subLoader')
        return(response.data)
      }
      catch(error) {
        commit('subLoader')
        dispatch('showError', error)
      }
    }
  }
}