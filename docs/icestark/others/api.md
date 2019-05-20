---
title: API
order: 6
---

icestark API 说明

## AppLoader

确定子应用渲染节点的组件，包含如下 props 属性

### onRouteChange

- 子应用 route 变化时的回调，选填
- 类型：`Function(pathname, query, type)`
- 默认值：`-`

### NotFoundComponent

- 自定义渲染全局 404 内容，选填
- 类型：`string|ReactNode`
- 默认值：`-`

### ErrorComponent

- 子应用静态资源加载出错时的展示内容，选填
- 类型：`string|ReactNode`
- 默认值：`-`

### LoadingComponent

- 子应用静态资源加载时的展示内容，选填
- 类型：`string|ReactNode`
- 默认值：`-`

### useShadow

- 是否开启 shadowRoot 隔离 css，选填
- 类型：`boolean`
- 默认：`false`

## AppRoute

子应用注册组件，包含如下 props 属性

### basename

- 子应用对应的 base 路由，比如默认域名为`www.icestark.com`，`basename` 设置为 `/user`，表示当访问 `www.icestark.com/user` 时，渲染此应用，必填
- 类型：`string / RegExp`
- 默认值：`-`

### url

- 子应用静态资源对应的 cdn 地址，当渲染子应用时，会将此 `url` 内的 js、css 资源加载进来，必填
- 类型：`string`
- 默认值：`-`

### title

- 子应用渲染时展示的 documentTitle ，选填
- 类型：`string`
- 默认值：`-`

## AppLink

子应用内部跳转使用，替代 React Router 的 `Link` 组件，表示本次跳转可能需要重新加载静态资源，包含如下 props

### to

- 标识目标路径，同 `Link` 中的 `to` 保持一致 ，必填
- 类型：`string`
- 默认值：`-`

### message

- 表示当前跳转需要弹窗确认，message为提示文案内容，选填
- 类型：`string`
- 默认值：`-`

## getMountNode

- 获取子应用加载的真实 DOM 节点，传参表示自定义默认渲染节点
- 类型：`function`
- 默认返回节点：`<div id="ice-container"></div>`

## renderNotFound

- 子应用内部通知框架应用渲染全局 404 的方法
- 类型：`function`