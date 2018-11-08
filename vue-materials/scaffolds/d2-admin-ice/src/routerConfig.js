/* eslint-disable */

// 工具
import util from '@/libs/util.ice'
// 页面和布局
import Index from './pages/Index'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import Demo1 from './pages/Demo1'
import Demo2 from './pages/Demo2'
import HeaderAside from './layouts/HeaderAside'

// 变量名 routerConfig 为 iceworks 检测关键字
// ice 会自动在这个变量下添加路由数据
// 请不要修改名称
// 备注 ice 自动添加的路由记录是以下格式
// {
//   path: '/page4',
//   layout: d2LayoutMain,
//   component: 4
// }

// 如果不指定 name 字段，会根据 path 生成 name = page-demo1
// 转换规则见 util.recursiveRouterConfig 中 path2name 方法
// meta 字段会和默认值使用 Object.assign 合并
// 如果不指定 meta.name 的话，name 字段会使用和上面路由 name 一样的取值逻辑
// 下面两个页面就是对比 你可以分别观察两个页面上显示的路由数据差异

const routerConfig = [
  // 首页 必须 name:index
  {
    path: '/',
    name: 'index',
    layout: HeaderAside,
    component: Index
  },
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    layout: HeaderAside,
    hidden: true,
    component: {
      beforeRouteEnter (to, from, next) {
        next(vm => vm.$router.replace(from.fullPath))
      },
      render: h => h()
    }
  },
  // 页面重定向 必须保留
  {
    path: '/redirect/:route*',
    name: 'redirect',
    layout: HeaderAside,
    hidden: true,
    component: {
      beforeRouteEnter (to, from, next) {
        next(vm => vm.$router.replace(JSON.parse(from.params.route)))
      },
      render: h => h()
    }
  },
  {
    path: '/demo1',
    name: 'demo1', 
    layout: HeaderAside,
    component: Demo1,
    meta: {
      requiresAuth: true,
      title: '演示 1'
    }
  },
  {
    path: '/demo2',
    layout: HeaderAside,
    component: Demo2
  }
];

// 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig

const routerConfigMenuOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  // 404
  {
    path: '*',
    component: Error404
  }
]

// 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default util.recursiveRouterConfig([
  ...routerConfig,
  ...routerConfigMenuOut
])

// 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = util.recursiveRouterConfig(routerConfig).map(e => {
  const route = e.children ? e.children[0] : e
  return {
    path: e.path,
    name: route.name,
    hidden: route.hidden,
    meta: route.meta
  }
})
