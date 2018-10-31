// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 主题
    list: setting.theme.list,
    // 现在激活的主题 这应该是一个名字 不是对象
    activeName: setting.theme.list[0].name
  },
  getters: {
    /**
     * @description 返回当前的主题信息 不是一个名字 而是当前激活主题的所有数据
     * @param {Object} state vuex state
     */
    activeSetting (state) {
      return state.list.find(theme => theme.name === state.activeName)
    }
  },
  actions: {
    /**
     * @description 激活一个主题
     * @param {Object} state vuex state
     * @param {String} themeValue 需要激活的主题名称
     */
    set ({ state, commit, dispatch }, themeName) {
      return new Promise(async resolve => {
        // 检查这个主题在主题列表里是否存在
        state.activeName = state.list.find(e => e.name === themeName) ? themeName : state.list[0].name
        // 将 vuex 中的主题应用到 dom
        commit('dom')
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'theme.activeName',
          value: state.activeName,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据加载主题设置
     * @param {Object} state vuex state
     */
    load ({ state, commit, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.activeName = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'theme.activeName',
          defaultValue: state.list[0].name,
          user: true
        }, { root: true })
        // 将 vuex 中的主题应用到 dom
        commit('dom')
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 将 vuex 中的主题应用到 dom
     * @param {Object} state vuex state
     */
    dom (state) {
      document.body.className = `theme-${state.activeName}`
    }
  }
}
