import {API_BASE_URL} from '@/config.js'
import axios from 'axios'

export default {
  state: {
    userAccessKey: null
  },

  getters: {
    userAccessKey(state) {
      return state.userAccessKey
    }
  },

  mutations: {
    setUserAccessKey(state, newUserAccessKey) {
      state.userAccessKey = newUserAccessKey
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
    }
  }
}