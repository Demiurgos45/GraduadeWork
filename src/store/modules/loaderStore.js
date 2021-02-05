export default {
  state: {
    showLoader: true
  },

  getters: {
    getLoaderStatus(state) {
      return state.showLoader
    }
  },

  mutations: {
    setLoaderStatus(state, status) {
      state.showLoader = status
    }
  },

  actions: {
    showLoader(context) {
      context.commit('setLoaderStatus', true)
    },

    hideLoader(context) {
      context.commit('setLoaderStatus', false)
    }
  }
}