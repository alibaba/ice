const util = {}

/**
 * @description 路由配置扁平化
 * @param {Array} config 层级路由设置
 */
util.recursiveRouterConfig = function recursiveRouterConfig (config = []) {
  const routerMap = []
  /**
   * path -> name
   * @param {String} path path
   */
  function path2name (path = '') {
    return path.split('/').filter(e => e).join('-')
  }
  /**
   * recursive
   * @param {Array} con config
   */
  function recursive (con) {
    con.forEach((item) => {
      const route = item.layout ? {
        // -> 在主布局内的页面
        // 页面地址
        path: item.path,
        // 使用的布局
        component: item.layout,
        // 子路由 一个里面只会有一个子路由 并且 path = ‘’
        children: [
          {
            // 这里留空 访问上面父级地址的时候会自动跳到这里
            path: '',
            // 如果路由没有设置 name 就用 path 处理成name
            name: item.name || path2name(item.path),
            // 忽略标签页选项
            hidden: item.hidden || false,
            // meta 设置和默认值合并
            meta: Object.assign({
              requiresAuth: true,
              title: path2name(item.path)
            }, item.meta),
            // 页面组件
            component: item.component
          }
        ]
      } : {
        // -> 不在主布局内的页面
        // 页面地址
        path: item.path,
        // 如果路由没有设置 name 就用 path 处理成name
        name: item.name || path2name(item.path),
        // meta 设置和默认值合并
        meta: Object.assign({
          requiresAuth: true,
          title: path2name(item.path)
        }, item.meta),
        // 页面组件
        component: item.component
      }
      if (Array.isArray(item.children)) {
        recursive(item.children)
      }
      routerMap.push(route)
    })
    return routerMap
  }
  return recursive(config)
}

/**
 * @description 转换菜单数据
 * @param {Array} arr menu config
 */
util.recursiveMenuConfig = function recursiveMenuConfig (arr) {
  const res = []
  /**
   * 转换每个菜单对象上的 name 为 title
   * @param {Object} obj menu
   */
  function convert (obj) {
    const {
      name, path, icon, children
    } = obj
    return {
      title: name,
      icon,
      path,
      ...children ? { children: children.map(convert) } : {}
    }
  }
  arr.forEach((menu) => {
    res.push(convert(menu))
  })
  return res
}

export default util
