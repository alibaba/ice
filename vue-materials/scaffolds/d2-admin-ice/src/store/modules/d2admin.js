/* eslint no-param-reassign: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */

import screenfull from 'screenfull'
import util from '@/libs/util.js'
import db from '@/libs/db.js'
import themeList from '@/assets/style/theme/list.js'

const pageOpenedDefult = {
  name: 'index',
  meta: {
    title: '首页'
  }
}

export default {
  state: {
    // 用户信息
    userInfo: {
      name: ''
    },
    // 顶栏菜单
    menuHeader: [],
    // 侧栏菜单
    menuAside: [],
    // 全屏
    isFullScreen: false,
    // 灰度
    isGrayMode: false,
    // 侧边栏收缩
    isMenuAsideCollapse: false,
    // 主题
    themeList,
    // 现在激活的主题
    themeActiveName: themeList[0].name, // 这应该是一个名字 不是对象
    // 可以在多页 tab 模式下显示的页面
    pagePool: [],
    // 当前显示的多页面列表
    pageOpenedList: [
      pageOpenedDefult
    ],
    // 当前页面
    pageCurrent: '',
    // 用户 UA
    ua: {}
  },
  getters: {
    /**
     * @description 返回当前的主题信息 不是一个名字 而是当前激活主题的所有数据
     * @param {vuex state} state vuex state
     */
    d2adminThemeActiveSetting (state) {
      return state.themeList.find(theme => theme.name === state.themeActiveName)
    },
    /**
     * @description 从当前所有打开的多标签页里返回需要缓存的页面 name
     * @param {*} state vuex state
     */
    d2adminKeepAliveInclude (state) {
      return state.pageOpenedList.filter((item) => {
        if (item.meta) {
          if (item.meta.notCache) {
            return false
          }
        }
        return true
      }).map(e => e.name)
    }
  },
  actions: {
    /**
     * 登陆
     * @param {Object} param0 context
     * @param {Object} param1 { vue, username, password }
     */
    d2adminLogin ({ state, commit, rootState }, { vm, username, password }) {
      // 开始请求登录接口
      vm.$axios({
        method: 'post',
        url: '/login',
        data: {
          username,
          password
        }
      })
        .then((res) => {
          // 设置 cookie 一定要存 uuid 和 token 两个 cookie
          // 整个系统依赖这两个数据进行校验和存储
          // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
          // token 代表用户当前登录状态 建议在网络请求中携带 token，如有必要 token 需要定时更新，默认保存一天
          util.cookies.set('uuid', res.data.uuid)
          util.cookies.set('token', res.data.token)
          // 设置 vuex 用户信息
          commit('d2adminUserInfoSet', {
            name: res.data.name
          })
          // 用户登陆后从数据库加载一系列的设置
          commit('d2adminLoginSuccessLoad')
          // 跳转路由
          vm.$router.push({
            name: 'index'
          })
        })
        .catch((err) => {
          console.group('登陆结果')
          console.log('err: ', err)
          console.groupEnd()
        })
    },
    /**
     * 注销用户并返回登陆页面
     * @param {Object} param0 context
     * @param {Object} confirm need confirm ?
     */
    d2adminLogout ({ state, commit, rootState }, { vm, confirm }) {
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
        commit('d2adminGrayModeSet', true)
        vm.$confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning'
        })
          .then(() => {
            commit('d2adminGrayModeSet', false)
            logout()
          })
          .catch(() => {
            commit('d2adminGrayModeSet', false)
            vm.$message('放弃注销用户')
          })
      } else {
        logout()
      }
    }
  },
  mutations: {
    /**
     * @class 通用工具
     * @description 将 state 中某一项存储到数据库 如果已经有的话就更新数据 需要 uuid
     * @param {vuex state} state vuex state
     * @param {String} key key name
     */
    d2adminUtilVuex2DbByUuid (state, key) {
      const row = db.get(key).find({ uuid: util.cookies.get('uuid') })
      if (row.value()) {
        row.assign({ value: state[key] }).write()
      } else {
        db.get(key).push({
          uuid: util.cookies.get('uuid'),
          value: state[key]
        }).write()
      }
    },
    /**
     * @class 通用工具
     * @description 从数据库取值到 vuex 需要 uuid
     * @param {vuex state} state vuex state
     * @param {Object} param1 key and default value
     */
    d2adminUtilDb2VuexByUuid (state, { key, defaultValue }) {
      const row = db.get(key).find({ uuid: util.cookies.get('uuid') }).value()
      state[key] = row ? row.value : defaultValue
    },
    /**
     * @class 通用工具
     * @description 将 state 中某一项存储到数据库 如果已经有的话就更新数据 不需要 uuid 所有用户共享
     * @param {vuex state} state vuex state
     * @param {String} key key name
     */
    d2adminUtilVuex2Db (state, key) {
      const row = db.get(key).find({ pub: 'pub' })
      if (row.value()) {
        row.assign({ value: state[key] }).write()
      } else {
        db.get(key).push({
          pub: 'pub',
          value: state[key]
        }).write()
      }
    },
    /**
     * @class 通用工具
     * @description 从数据库取值到 vuex 不需要 uuid 所有用户共享
     * @param {vuex state} state vuex state
     * @param {Object} param1 key and default value
     */
    d2adminUtilDb2Vuex (state, { key, defaultValue }) {
      const row = db.get(key).find({ pub: 'pub' }).value()
      state[key] = row ? row.value : defaultValue
    },
    /**
     * @class 通用工具
     * @description 访问本地数据库 用户单独空间 没有初始化会自动初始化
     * @param {vuex state} state vuex state
     * @param {Function} fn function
     */
    d2adminUtilDatabaseUser (state, fn) {
      const uuid = util.cookies.get('uuid')
      const database = db.get('database').find({ uuid })
      if (database.value() === undefined) {
        db.get('database').push({
          uuid,
          value: {}
        }).write()
        if (fn) {
          fn(db.get('database').find({ uuid }).get('value'))
        }
      } else if (fn) {
        fn(database.get('value'))
      }
    },
    /**
     * @class 通用工具
     * @description 访问本地数据库 清空用户单独空间 只负责删除 d2adminUtilDatabaseUser 会初始化
     * @param {vuex state} state vuex state
     */
    d2adminUtilDatabaseUserClear () {
      db.get('database')
        .remove({ uuid: util.cookies.get('uuid') })
        .write()
    },
    /**
     * @class 通用工具
     * @description 访问本地数据库 这份数据是每个用户都可以访问的
     * @param {vuex state} state vuex state
     * @param {Function} fn function
     */
    d2adminUtilDatabase (state, fn) {
      if (fn) {
        fn(db.get('databasePublic'))
      }
    },
    /**
     * @class 通用工具
     * @description 访问本地数据库 清空公用空间
     * @param {vuex state} state vuex state
     */
    d2adminUtilDatabaseClear () {
      db.set('databasePublic', {})
        .write()
    },
    /**
     * @class UA
     * @description 记录 UA
     * @param {vuex state} state vuex state
     */
    d2adminUaGet (state) {
      state.ua = util.ua()
    },
    /**
     * @class menuHeader
     * @description 设置顶栏菜单
     * @param {vuex state} state vuex state
     * @param {Array} menu menu setting
     */
    d2adminMenuHeaderSet (state, menu) {
      state.menuHeader = menu
    },
    /**
     * @class menuAside
     * @description 设置侧边栏菜单
     * @param {vuex state} state vuex state
     * @param {Array} menu menu setting
     */
    d2adminMenuAsideSet (state, menu) {
      state.menuAside = menu
    },
    /**
     * @class ...
     * @description 用户登陆后从数据库加载一系列的设置
     * @param {vuex state} state vuex state
     */
    d2adminLoginSuccessLoad () {
      // DB -> store 加载用户名
      this.commit('d2adminUserInfoLoad')
      // DB -> store 加载主题
      this.commit('d2adminThemeLoad')
      // DB -> store 数据库加载上次退出时的多页列表
      this.commit('d2adminPageOpenedListLoad')
      // DB -> store 数据库加载这个用户之前设置的侧边栏折叠状态
      this.commit('d2adminMenuAsideCollapseLoad')
    },
    /**
     * @description 设置用户名
     * @class userInfo
     * @param {vuex state} state vuex state
     * @param {String} userInfo userInfo
     */
    d2adminUserInfoSet (state, userInfo) {
      state.userInfo = userInfo
      this.commit('d2adminUtilVuex2DbByUuid', 'userInfo')
    },
    /**
     * @description 从数据库取用户名
     * @class userInfo
     * @param {vuex state} state vuex state
     */
    d2adminUserInfoLoad () {
      this.commit('d2adminUtilDb2VuexByUuid', {
        key: 'userInfo',
        defaultValue: {
          name: '请重新登陆'
        }
      })
    },
    /**
     * @class pagePool
     * @description 保存 pagePool (候选池)
     * @param {vuex state} state vuex state
     * @param {Array} pagePool tags
     */
    d2adminPagePoolSet (state, pagePool) {
      state.pagePool = pagePool
    },
    /**
     * @class pageCurrent
     * @description 打开一个新的页面
     * @param {vuex state} state vuex state
     * @param {Object} param1 { name, params, query } 路由信息
     */
    d2adminPageOpenNew (state, { name, params, query }) {
      // 已经打开的页面
      const { pageOpenedList } = state
      // 判断此页面是否已经打开 并且记录位置
      let pageOpendIndex = 0
      const pageOpend = pageOpenedList.find((page, index) => {
        const same = page.name === name
        pageOpendIndex = same ? index : pageOpendIndex
        return same
      })
      if (pageOpend) {
        // 页面以前打开过 但是新的页面可能 name 一样，参数不一样
        this.commit('d2adminPageOpenedListUpdateItem', { index: pageOpendIndex, params, query })
      } else {
        // 页面以前没有打开过
        const tag = state.pagePool.find(t => t.name === name)
        if (tag) {
          this.commit('d2adminTagIncreate', { tag, params, query })
        }
      }
      this.commit('d2adminPageCurrentSet', name)
    },
    /**
     * @class pageCurrent
     * @description 设置当前激活的页面 name
     * @param {vuex state} state vuex state
     * @param {String} name new name
     */
    d2adminPageCurrentSet (state, name) {
      state.pageCurrent = name
    },
    /**
     * @class pageOpenedList
     * @description 更新页面列表上的某一项
     * @param {vuex state} state vuex state
     * @param {Object} param1 { index, params, query } 路由信息
     */
    d2adminPageOpenedListUpdateItem (state, { index, params, query }) {
      // 更新页面列表某一项
      const page = state.pageOpenedList[index]
      page.params = params || page.params
      page.query = query || page.query
      state.pageOpenedList.splice(index, 1, page)
      // 更新设置到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 从数据库载入分页列表
     * @param {vuex state} state vuex state
     */
    d2adminPageOpenedListLoad () {
      this.commit('d2adminUtilDb2VuexByUuid', {
        key: 'pageOpenedList',
        defaultValue: [
          pageOpenedDefult
        ]
      })
    },
    /**
     * @class pageOpenedList
     * @description 新增一个 tag (打开一个页面)
     * @param {vuex state} state vuex state
     * @param {Object} param1 new tag info
     */
    d2adminTagIncreate (state, { tag, params, query }) {
      // 设置新的 tag 在新打开一个以前没打开过的页面时使用
      const newPage = tag
      newPage.params = params || newPage.params
      newPage.query = query || newPage.query
      // 添加进当前显示的页面数组
      state.pageOpenedList.push(newPage)
      // 更新设置到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭一个 tag (关闭一个页面)
     * @param {vuex state} state vuex state
     * @param {Object} param1 { tagName: 要关闭的标签名字, vm: vue }
     */
    d2adminTagClose (state, { tagName, vm }) {
      // 下个新的页面
      let newPage = state.pageOpenedList[0]
      const isCurrent = state.pageCurrent === tagName
      // 如果关闭的页面就是当前显示的页面
      if (isCurrent) {
        // 去找一个新的页面
        const len = state.pageOpenedList.length
        for (let i = 1; i < len; i += 1) {
          if (state.pageOpenedList[i].name === tagName) {
            if (i < len - 1) {
              newPage = state.pageOpenedList[i + 1]
            } else {
              newPage = state.pageOpenedList[i - 1]
            }
            break
          }
        }
      }
      // 找到这个页面在已经打开的数据里是第几个
      const index = state.pageOpenedList.findIndex(page => page.name === tagName)
      if (index >= 0) {
        state.pageOpenedList.splice(index, 1)
      }
      // 更新设置到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
      // 最后需要判断是否需要跳到首页
      if (isCurrent) {
        const { name = '', params = {}, query = {} } = newPage
        const routerObj = {
          name,
          params,
          query
        }
        vm.$router.push(routerObj)
      }
    },
    /**
     * @class pageOpenedList
     * @description 关闭当前标签左边的标签
     * @param {vuex state} state vuex state
     */
    d2adminTagCloseLeft (state) {
      let currentIndex = 0
      state.pageOpenedList.forEach((page, index) => {
        if (page.name === state.pageCurrent) {
          currentIndex = index
        }
      })
      if (currentIndex > 0) {
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      // 更新设置到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭当前标签右边的标签
     * @param {vuex state} state vuex state
     */
    d2adminTagCloseRight (state) {
      let currentIndex = 0
      state.pageOpenedList.forEach((page, index) => {
        if (page.name === state.pageCurrent) {
          currentIndex = index
        }
      })
      state.pageOpenedList.splice(currentIndex + 1)
      // 更新设置到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭当前激活之外的 tag
     * @param {vuex state} state vuex state
     */
    d2adminTagCloseOther (state) {
      let currentIndex = 0
      state.pageOpenedList.forEach((page, index) => {
        if (page.name === state.pageCurrent) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      // 更新设置到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭所有 tag
     * @param {vuex state} state vuex state
     * @param {Object} vm vue
     */
    d2adminTagCloseAll (state, vm) {
      state.pageOpenedList.splice(1)
      // 更新设置到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
      // 关闭所有的标签页后需要判断一次现在是不是在首页
      if (vm.$route.name !== 'index') {
        vm.$router.push({
          name: 'index'
        })
      }
    },
    /**
     * 设置侧边栏展开或者收缩
     * @class isMenuAsideCollapse
     * @param {vuex state} state vuex state
     * @param {Boolean} collapse is collapse
     */
    d2adminMenuAsideCollapseSet (state, collapse) {
      state.isMenuAsideCollapse = collapse
      this.commit('d2adminUtilVuex2DbByUuid', 'isMenuAsideCollapse')
    },
    /**
     * 切换侧边栏展开和收缩
     * @class isMenuAsideCollapse
     * @param {vuex state} state vuex state
     */
    d2adminMenuAsideCollapseToggle (state) {
      state.isMenuAsideCollapse = !state.isMenuAsideCollapse
      this.commit('d2adminUtilVuex2DbByUuid', 'isMenuAsideCollapse')
    },
    /**
     * 从数据库读取侧边栏展开或者收缩
     * @class isMenuAsideCollapse
     * @param {vuex state} state vuex state
     */
    d2adminMenuAsideCollapseLoad () {
      this.commit('d2adminUtilDb2VuexByUuid', {
        key: 'isMenuAsideCollapse',
        defaultValue: false
      })
    },
    /**
     * @class isFullScreen
     * @description 切换全屏
     * @param {vuex state} state vuex state
     */
    d2adminFullScreenToggle () {
      if (screenfull.isFullscreen) {
        screenfull.exit()
        this.commit('d2adminFullScreenSet', false)
      } else {
        screenfull.request()
        this.commit('d2adminFullScreenSet', true)
      }
    },
    /**
     * @class isFullScreen
     * @description 设置 store 里的全屏状态
     * @param {vuex state} state vuex state
     */
    d2adminFullScreenSet (state, isFullScreen) {
      state.isFullScreen = isFullScreen
    },
    /**
     * @class isGrayMode
     * @description 切换灰度状态
     * @param {vuex state} state vuex state
     */
    d2adminGrayModeToggle (state) {
      state.isGrayMode = !state.isGrayMode
    },
    /**
     * @class isGrayMode
     * @description 设置灰度模式
     * @param {vuex state} state vuex state
     * @param {Boolean} value new value
     */
    d2adminGrayModeSet (state, value) {
      state.isGrayMode = value
    },
    /**
     * @class themeActiveName
     * @description 激活一个主题（应用到dom上）
     * @param {vuex state} state vuex state
     * @param {String} themeValue 需要激活的主题名称
     */
    d2adminThemeSet (state, themeName) {
      // 检查这个主题在主题列表里是否存在
      const theme = state.themeList.find(e => e.name === themeName)
      if (theme) {
        // 设置 state
        state.themeActiveName = themeName
      } else {
        // 设置为列表第一个主题
        state.themeActiveName = state.themeList[0].name
      }
      // 将 vuex 中的主题应用到 dom
      this.commit('d2adminTheme2dom')
      // 保存到数据库
      this.commit('d2adminUtilVuex2DbByUuid', 'themeActiveName')
    },
    /**
     * @class themeActiveName
     * @description 从数据库加载主题设置
     * @param {vuex state} state vuex state
     */
    d2adminThemeLoad (state) {
      this.commit('d2adminUtilDb2VuexByUuid', {
        key: 'themeActiveName',
        defaultValue: state.themeList[0].name
      })
      this.commit('d2adminTheme2dom')
    },
    /**
     * @class themeActiveName
     * @description 将 vuex 中的主题应用到 dom
     * @param {vuex state} state vuex state
     */
    d2adminTheme2dom (state) {
      document.body.className = `theme-${state.themeActiveName}`
    }
  }
}
