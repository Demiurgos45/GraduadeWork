export default {
  state: {
    errorMessage: '',
    errorStatus: false
  },

  getters: {
    
  },

  mutations: {
    setErrorMessage(state, msg) {
      state.errorMessage = msg
    },
    
    setErrorStatus(state, value) {
      state.errorStatus = value
    }
  },

  actions: {
    showError({commit, state}, error) {
      if (!state.errorStatus) {
        let msg = 'URL: ' +
          error.config.url
        
        if (error.config.params) {
          msg += '\n\nParams:\n' +
            JSON.stringify(error.config.params)
        }

        if (error.response) {
          msg += '\n\nResponse:\n' +
            JSON.stringify(error.response.data) + '\n' +
            error.response.status + '\n' +
            JSON.stringify(error.response.headers)
        }
        else if (error.request) {
          msg += '\n\nRequest:\n' +
            error.request
        }
        else {
          msg += '\n\nMessage:\n' +
            error.message
        }
        commit('setErrorMessage', msg)
        commit('setErrorStatus', true)
      }
    }
  }
}