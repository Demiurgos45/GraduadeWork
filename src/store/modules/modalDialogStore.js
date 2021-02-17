export default {
  state: {
    title: '',
    messageHtml: '',
    showDialog: false
  },

  getters: {
    getShowDialog(state) {
      return state.showDialog
    },
    getMessageHtml(state) {
      return state.messageHtml
    },
    getTitle(state) {
      return state.title
    }
  },

  mutations: {
    setTitle(state, title) {
      state.title = title
    },
    setMessageHtml(state, message) {
      state.messageHtml = message
    },
    setDialogState(state, show) {
      state.showDialog = show
    }
  },

  actions: {
    showDialog(context, params) {
      context.commit('setTitle', params.title)
      context.commit('setMessageHtml', params.messageHtml)
      context.commit('setDialogState', true)
    },
    hideDialog(context) {
      context.commit('setDialogState', false)
    }
  }
}