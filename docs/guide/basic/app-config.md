---
title: 应用配置
order: 9
---

框架通过调用 `createApp` 进行启动，在创建应用时可以传入应用的全局配置，在它上面我们可以进行挂载和框架的配置。并可以轻松的在应用生命周期中访问。

## 创建应用

`src/app.ts` 用于对应用进行全局配置，设置路由、运行环境、请求、日志等。

```ts
import { createApp } from 'ice'

// 用于配置
const appConfig = {
  app: {
    rootId: 'ice-container'
  },

  // 路由配置
  router: {
    history: 'hash',
    basename: 'ice',
  },

  // 请求配置
  request: {
    timeout: 1000,
    baseURL: '/api'
  },

  config: {
    // 开发环境
    dev: {
      appId: 'dev-id',
      API_URL: 'http://localhost:3333'
    },
    // 生产环境
    prod: {
      API_URL: 'http://github.com/api'
    },
    // 默认环境
    default: {
      'appId': 'default-id',
      'sercet': 'abc'
    }
  }

  // 日志配置
  loglevel: APP_MODE === 'dev' ? 'error' : 'warn',

  // 其他更多配置
}

createApp(appConfig)
```
