import Vue from 'vue'
import Vuex from 'vuex'
import cartStore from '@/store/modules/cartStore'
import loaderStore from '@/store/modules/loaderStore'
import commonStore from '@/store/modules/commonStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cartStore,
    loaderStore,
    commonStore
  }
})
