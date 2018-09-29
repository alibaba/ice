import UaParser from 'ua-parser-js'

export default {
  namespaced: true,
  state: {
    // 用户 UA
    data: {}
  },
  mutations: {
    /**
     * @description 记录 UA
     * @param {Object} state vuex state
     */
    get (state) {
      state.data = new UaParser().getResult()
    }
  }
}
