import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: '',
  },
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    getInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {},
  modules: {},
})
