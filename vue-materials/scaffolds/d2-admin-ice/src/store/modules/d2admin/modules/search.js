import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 搜索面板激活状态
    active: false,
    // 快捷键
    hotkey: {
      open: setting.hotkey.search.open,
      close: setting.hotkey.search.close
    },
    // 所有可以搜索的页面
    pool: []
  },
  mutations: {
    /**
     * @description 切换激活状态
     * @param {Object} state vuex state
     */
    toggle (state) {
      state.active = !state.active
    },
    /**
     * @description 设置激活模式
     * @param {Object} state vuex state
     * @param {Boolean} active active
     */
    set (state, active) {
      state.active = active
    },
    /**
     * @description 初始化
     * @param {Object} state vuex state
     * @param {Array} menu menu
     */
    init (state, menu) {
      const pool = []
      const push = function (menu, titlePrefix = []) {
        menu.forEach(m => {
          if (m.children) {
            push(m.children, [ ...titlePrefix, m.title ])
          } else {
            pool.push({
              ...m,
              fullTitle: [ ...titlePrefix, m.title ].join(' / ')
            })
          }
        })
      }
      push(menu)
      state.pool = pool
    }
  }
}
