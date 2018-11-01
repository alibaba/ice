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
      // util.log.capsule('D2Admin', `v${state.version}`)
      // 和完整版的区别：因为飞冰会强制新项目版本号为 1.0.0 所以这里不打印版本号
      util.log.capsule('D2Admin', `ICE`)
      console.log('Github https://github.com/d2-projects/d2-admin')
      console.log('Doc    https://doc.d2admin.fairyever.com/zh/')
      console.log('请不要吝啬您的 star，谢谢 ~')
    }
  }
}
