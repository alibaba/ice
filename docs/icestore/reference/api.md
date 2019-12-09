---
title: API
order: 1
---

对于新建的 icestore 实例，包括以下公共的 API 方法：

### registerStores

注册多个 store 配置到全局 icestore 实例上。

* 参数
  - stores {object} 多个 store 的配置对象，每个 store 配置中包含 state 和 action

* 返回值
  - {object} stores 管理器对象，包含以下几个方法
      - useStore {function} 使用单个 store 的 hook
          - 参数
             - namespace {string} store 的命名空间
          - 返回值
             - {object} store 的配置对象
      - useStores {function} 同时使用多个 store 的 hook
          - 参数
              - namespaces {array} 多个 store 的命名空间数组
          - 返回值
              - {object} 多个 store 的配置对象，以 namespace 区分
      - getState {function} 获取单个 store 的最新 state 对象。
          - 参数
              - namespace {string} store 的命名空间
          - 返回值
              - {object} store 的 state 对象

### applyMiddleware

给 store 注册中间件，如指定第二个参数，则注册到对应 namespace 的 store，否则注册到全局，对所有 store 生效。

* 参数
  - middlewares {array} 注册的 middleware 数组
  - namespace {string} store 的命名空间，可选
* 返回值
  - 无
