import util from '@/libs/util.js'
import { AccountLogin } from '@/api/sys/login'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象
     */
    login ({ dispatch }, {
      vm,
      username,
      password,
      route = {
        name: 'index'
      }
    }) {
      // 开始请求登录接口
      AccountLogin({
        username,
        password
      })
        .then(async res => {
          // 设置 cookie 一定要存 uuid 和 token 两个 cookie
          // 整个系统依赖这两个数据进行校验和存储
          // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
          // token 代表用户当前登录状态 建议在网络请求中携带 token
          // 如有必要 token 需要定时更新，默认保存一天
          util.cookies.set('uuid', res.uuid)
          util.cookies.set('token', res.token)
          // 设置 vuex 用户信息
          await dispatch('d2admin/user/set', {
            name: res.name
          }, { root: true })
          // 用户登录后从持久化数据加载一系列的设置
          await dispatch('load')
          // 更新路由 尝试去获取 cookie 里保存的需要重定向的页面完整地址
          const path = util.cookies.get('redirect')
          // 根据是否存有重定向页面判断如何重定向
          vm.$router.replace(path ? { path } : route)
          // 删除 cookie 中保存的重定向页面
          util.cookies.remove('redirect')
        })
        .catch(err => {
          console.log('err: ', err)
        })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ commit }, { vm, confirm = false }) {
      /**
       * @description 注销
       */
      function logout () {
        // 删除cookie
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        // 跳转路由
        vm.$router.push({
          name: 'login'
        })
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        vm.$confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning'
        })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true })
            vm.$message('放弃注销用户')
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load ({ commit, dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true })
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
