import Vue from 'vue'
import Vuex from 'vuex'
import basketStore from '@/store/modules/basketStore'
import loaderStore from '@/store/modules/loaderStore'
import commonStore from '@/store/modules/commonStore'
import errorPageStore from '@/store/modules/errorPageStore'
import modalDialogStore from '@/store/modules/modalDialogStore'
import orderStore from '@/store/modules/orderStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    basketStore,
    loaderStore,
    commonStore,
    errorPageStore,
    modalDialogStore,
    orderStore
  }
})
