---
title: 配置说明
category: icestark
order: 6
---

icestark 配置说明

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

### BundleErrorComponent

- 自定义渲染全局 Bundle 加载出错时的展示内容，选填
- 类型：`string|ReactNode`
- 默认值：`-`

### BundleLoadingComponent

- 自定义渲染全局 Bundle 加载时的展示内容，选填
- 类型：`string|ReactNode`
- 默认值：`-`

### shadowRoot

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
