---
title: API
order: 1
---

对于新建的 icestore 实例，包括以下公共的 API 方法：

### registerStore

将 store 配置注册到全局 store 实例。

* 参数
  - namespace {string} store 的命名空间
  - bindings {object} store 配置，包含 state 和 actions
* 返回值
  - {object} store 实例

### applyMiddleware

给 store 注册中间件，如指定第二个参数，则注册到对应 namespace 的 store，否则注册到全局，对所有 store 生效。

* 参数
  - middlewares {array} 注册的 middleware 数组
  - namespace {string} store 的命名空间，可选
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

