export default {
  state: {
    showLoader: 0
  },

  getters: {
    getLoaderStatus(state) {
      return state.showLoader
    }
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