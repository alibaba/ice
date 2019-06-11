---
title: AppRoute
order: 6
---

子应用注册组件，包含如下 props 属性

## path

- 子应用对应的 base 路由，比如默认域名为`www.icestark.com`，`path` 设置为 `/user`，表示当访问 `www.icestark.com/user` 时，渲染此应用，必填，参数设置对比 `React Router`
- 类型：`string | string[]`
- 默认值：`-`

## url

- 子应用静态资源对应的 cdn 地址，当渲染子应用时，会将此 `url` 内的 js、css 资源加载进来，必填
- 类型：`string | string[]`
- 默认值：`-`
- 使用规则：当 `url` 为 string 类型，比如 `www.icestark.com/a`，则默认拉取 `www.icestark.com/a/index.js` 以及 `www.icestark.com/a/index.css` 资源。当 `url` 为 [] 时，可自行填写完整的 js、css 资源地址，支持多个 js、css 资源的加载。

## title

- 子应用渲染时展示的 documentTitle ，选填
- 类型：`string`
- 默认值：`-`

## basename

- 子应用运行时，透传给 `React Router` 的 `basename`，选填，如果不填，默认会从 `path` 中获取
- 类型：`string`
- 默认值：`-`

## exact

- 是否完全匹配，参考 `React Router`，选填
- 类型 `boolean`
- 默认值：`false`

## strict

- 参考 `React Router`，选填
- 类型 `boolean`
- 默认值：`false`

## sensitive

- 参考 `React Router`，选填
- 类型 `boolean`
- 默认值：`false`

## rootId

- 子应用默认加载的 DOM 节点的 id，选填
- 类型 `string`
- 默认值：`icestarkNode`
