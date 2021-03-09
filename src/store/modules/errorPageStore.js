export default {
  state: {
    errorMessage: ''
  },

  getters: {
    
  },

  mutations: {
    setErrorMessage(state, error) {
      let msg = 'URL: ' +
        error.config.url +
        '\n\nParams:\n'+
        JSON.stringify(error.config.params)
      
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
      state.errorMessage = msg
    },
    
    delErrorMessage(state) {
      state.errorMessage = ''
    }
  }
}