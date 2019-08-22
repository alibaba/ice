---
title: API
order: 1
---

对于新建的 `icestore` 实例，包括以下公共的 API 方法：

### registerStore

将 store 配置注释到全局 store 实例。

* 参数
  - namespace {string} store 的命名空间
  - bindings {object} store 配置，包含 state 和 actions
* 返回值
  - {object} store 实例

### applyMiddleware

给所有 store 或者指定 namespace 的 store 注册 middleware，如果不指定第 2 个参数，给所有 store 注册 middleware，如果指定第 2 个参数，则给指定 namespace 的 store 注册 middleware。

* 参数
  - middlewares {array} 待注册的 middleware 数组
  - namespace {string} store 的命名空间
* 返回值
  - 无

### useStores

同时使用多个 store 的 hook。

* 参数
  - namespaces {array} 多个 store 的命名空间数组
* 返回值
  - {array} 多个 store 的配置对象数组

### useStore

使用单个 store 的 hook。

* 参数
  - namespace {string} store 的命名空间
* 返回值
  - {object} store 的配置对象

### getState

获取单个 store 的最新 state 对象。

* 参数
  - namespace {string} store 的命名空间
* 返回值
  - {object} store 的 state 对象

