<p align="center">
  <a href="https://alibaba.github.io/ice">
    <img alt="ICE" src="https://gw.alicdn.com/tfs/TB1FEW2nfDH8KJjy1XcXXcpdXXa-487-132.svg" width="200">
  </a>
</p>
<p align="center">赋能企业中后台建设</p>
<p align="center">
  <a href="https://github.com/alibaba/ice/blob/master/LICENSE"><img src="https://img.shields.io/badge/lisense-MIT-brightgreen.svg"></a>
</p>

## 简介

基于海量高质量可复用区块，通过 GUI 工具快速搭建的一套中后台模板。

![ice-design-pro](https://img.alicdn.com/tfs/TB1_bulmpOWBuNjy0FiXXXFxVXa-1920-1080.png)

## 特性

- 专业的设计支持: [ICE Design](https://alibaba.github.io/ice/design.html)
- 成熟的基础组件: [ICE Component](https://alibaba.github.io/ice/#/component/button)
- 丰富的业务模块: [ICE Block](https://alibaba.github.io/ice/#/block)
- 完善的开发工具: [iceworks](https://alibaba.github.io/ice/#/iceworks)

## 功能

> 按照 Dashboard 综合页和 Block 分类进行展示

```
- Dashboard
- 图表页
  - 图表列表
- 表格页
  - 基础表格
  - 展示型表格
  - 表格列表
- 列表页
  - 文章列表
  - 卡片列表
  - 图文列表
- 内容页
  - 基础详情页
  - 条款协议页
  - 进度展示页
- 结果页
  - 成功
  - 失败
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
  - 内容为空
```

## 目录结构

```
ice-design-pro
├── dist        // 打包资源
├── mock        // 模拟数据
├── public      // 静态资源
├── src
│   ├── components   // 公共组件
│   ├── layouts      // 通用布局
│   ├── pages        // 页面
│   ├── index.js     // 应用入口
│   ├── menuConfig   // 导航配置
│   ├── routerConfig // 路由配置
│   └── router.jsx   // 路由配置
├── tests            // 测试
├── .gitignore       // git 忽略目录配置
├── .editorconfig    // 代码风格配置
├── .eslintignore    // eslint 忽略目录配置
├── .eslintrc        // eslint 配置
├── package.json     // package.json
└── README.md        // 项目说明
```

## 使用

1.  (推荐) GUI 工具使用: 下载 [iceworks](https://alibaba.github.io/ice/#/iceworks)

2.  Cli 命令使用:

```bash
$ npm start      // 启动预览服务器
$ npm run build  // 构建 dist
```

## 集成 Redux

- 依赖的包
  - history
  - redux
  - react-router-redux 废弃，改用 connected-react-router
  - react-redux
  - redux-thunk

## 权限管理

- 权限维护
  - 前端维护
  - 后端维护

1.  点击登录，提交参数

```jsx
handleSubmit = () => {};

dispatch() => fakeAccountLogin() => setAuthority(payload.currentAuthority)

if (response.status === 'ok') {

  // 更新当前权限
  // 调用reloadAuthorized()刷新权限
  reloadAuthorized()

  // 登录成功调整到首页
  push('/');
}
```

## 权限设计（reloadAuthorized 调用栈）

```jsx
/**============================================================
 *                      <CheckPermissions />
 * ============================================================
 */
/**
 * CheckPermissions 组件
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 * @return 返回通过权限检验的组件和或者 Exception 组件
 */
const checkPermission = (authority, currentAuthority, target, Exception) => {
  // 没有判定权限.默认查看所有
  if (!authority) {
    return target;
  }

  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }

  throw new Error('checkPermission 参数错误');
};

// 函数形式的 Authorized，用于某些不能被 HOC 包裹的组件
// 用来匹配当前权限和菜单权限
const check = (authority, target, Exception) => {
  return checkpermission(authority, CURRENT, target, Exception);
};

/**============================================================
 *                      <Authorized />
 * ============================================================
 */
/**
 * 最基础的权限控制，接收children、authority、noMatch 作为参数
 * 返回对应的权限组件或者未匹配时的 Exception 组件
 * children：正常渲染的元素，权限判断通过时展示
 * authority：准入权限/权限判断
 * noMatch：权限异常渲染元素，权限判断不通过时展示
 *
 * 参考：https://pro.ant.design/components/Authorized-cn/#Authorized
 */
class Authorized extends React.Component {
  render() {
    // children：正常渲染的元素，权限判断通过时展示 ReactNode
    // authority：准入权限/权限判断 string | array | Promise
    // noMatch：权限异常渲染元素，权限判断不通过时展示 ReactNode
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

/**============================================================
 *                      Authorized Index 入口
 * ============================================================
 */
/**
 * 权限入口组件，默认导出 renderAuthorize 函数，调用改函数返回一个权限对象
 * RenderAuthorized: (currentAuthority: string | () => string) => Authorized
 * 包含 Secured、AuthorizedRoute、check 三个 API：
 *  1. AuthorizedRoute：AuthorizedRoute()
 *  2. Secured：authorize(authority, error)
 *  3. check：check(authority, target, Exception)
 *
 *  参考：https://pro.ant.design/components/Authorized-cn/#RenderAuthorized
 */
import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions.js';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;

const renderAuthorize = (currentAuthority) => {
  if (currentAuthority) {
    if (currentAuthority.constructor.name === 'String') {
      CURRENT = currentAuthority;
    } else {
      CURRENT = 'NULL';
    }
    return Aurhorized;
  }
};

export default renderAuthorize;

/**============================================================
 *                      AuthorizedRoute 实现
 * ============================================================
 */
/**
 * 路由权限判断：https://pro.ant.design/components/Authorized-cn/#Authorized.AuthorizedRoute
 * authority：准入权限/权限判断
 * redirectPath：权限异常时重定向的页面路由
 */
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  render() {
    const {
      component: Component,
      render,
      authority,
      redirectPath,
      ...rest
    } = this.props;
    return (
      <Authorized
        authority={authority}
        noMatch={
          <Route
            {...rest}
            render={() => <Redirect to={{ pathname: redirectPath }} />}
          />
        }
      >
        <Route
          {...rest}
          render={(props) =>
            Component ? <Component {...props} /> : render(props)
          }
        />
      </Authorized>
    );
  }
}
```

## 路由拦截

## 菜单拦截

## 常见问题

1.  为什么要设计顶层路由，而其余路由列表都是自动生成？

    - 配置路由相关信息。如果只考虑生成路由，你只需要指定每条配置的路径及对应渲染组件
    - 输出路由数据，并将路由数据（routerData）挂载到每条路由对应的组件上。
      参考：https://pro.ant.design/docs/router-and-nav-cn#%E8%B7%AF%E7%94%B1

2.  如何自动生成路由，提供 getRoutes 工具函数？
    - 接收两个参数
      - 当前路由的 match 路径
      - 路由信息 routerData
    - 筛选算法，筛选路由信息
      - 筛选的算法只保留当前 match.path 下最邻近的路由层级（更深入的层级留到嵌套路由中自行渲染），更深入的层级留到嵌套路由自行渲染是如何实现的？？？
      - 自动分析路由 exact 参数，除了下面还有嵌套路由的路径，其余路径默认设为 exact。
    - 如果不需要自动生成路由，也可以用 routerData 自行处理，如何处理？
