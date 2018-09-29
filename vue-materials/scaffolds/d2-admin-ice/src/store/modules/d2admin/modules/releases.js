import util from '@/libs/util.js'
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // D2Admin 版本
    version: setting.releases.version
  },
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow (state) {
      util.log.capsule('D2Admin ICE', `v${state.version}`)
      console.log('Github https://github.com/d2-projects/d2-admin')
      console.log('Doc    http://app.d3collection.cn/d2-admin-doc/lastest/zh/')
    }
  }
}
