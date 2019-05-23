---
title: AppRouter
order: 5
---

确定子应用渲染节点的组件，包含如下 props 属性

## onRouteChange

- 子应用 route 变化时的回调，选填
- 类型：`Function(pathname, query, type)`
- 默认值：`-`

## NotFoundComponent

- 自定义渲染全局 404 内容，选填
- 类型：`string | ReactNode`
- 默认值：`-`

## ErrorComponent

- 子应用静态资源加载出错时的展示内容，选填
- 类型：`string | ReactNode`
- 默认值：`-`

## LoadingComponent

- 子应用静态资源加载时的展示内容，选填
- 类型：`string | ReactNode`
- 默认值：`-`

## useShadow

- 是否开启 shadowRoot 隔离 css，选填
- 类型：`boolean`
- 默认：`false`
