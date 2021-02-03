import Vue from 'vue'
import Vuex from 'vuex'
import commonStore from '@/store/modules/commonStore'
import cartStore from '@/store/modules/cartStore'
import loaderStore from '@/store/modules/loaderStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonStore,
    cartStore,
    loaderStore
  }
})
