export default {
  state: {
    showLoader: 0
  },

  getters: {
    
  },

  mutations: {
    addLoader(state) {
      state.showLoader++
    },
    subLoader(state) {
      state.showLoader--
    },
  },

  actions: {
    showLoader(context) {
      context.commit('addLoader')
    },

    hideLoader(context) {
      context.commit('subLoader')
    }
  }
}