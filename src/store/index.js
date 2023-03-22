import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: '',
    showPopup: false
  },
  getters: {
    getShowPopup (state) {
      return state.showPopup
    }
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    setShowPopup (state, flag) {
      state.showPopup = flag
    }
  },
  actions: {
  }
})
