import screenfull from 'screenfull'

export default {
  namespaced: true,
  state: {
    // 全屏激活
    active: false
  },
  actions: {
    /**
     * @description 初始化监听
     */
    listen ({ commit }) {
      return new Promise(resolve => {
        if (screenfull.enabled) {
          screenfull.on('change', () => {
            console.log('1')
            if (!screenfull.isFullscreen) {
              commit('set', false)
            }
          })
        }
        // end
        resolve()
      })
    },
    /**
     * @description 切换全屏
     */
    toggle ({ commit }) {
      return new Promise(resolve => {
        if (screenfull.isFullscreen) {
          screenfull.exit()
          commit('set', false)
        } else {
          screenfull.request()
          commit('set', true)
        }
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 设置 store 里的全屏状态
     * @param {Object} state vuex state
     * @param {Boolean} active active
     */
    set (state, active) {
      state.active = active
    }
  }
}
