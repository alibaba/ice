---
title: 应用入口
order: 2
---

框架通过调用 `createApp` 创建渲染整个应用，在创建应用时可以传入应用的全局配置。

## 入口配置

`src/app.ts` 用于对应用进行全局配置，设置路由、运行环境、请求、日志等。

```ts
import { createApp } from 'ice';

// 用于配置
const appConfig = {
  // 启动项配置
  app: {
    rootId: 'ice-container'
  },
  // 路由配置
  router: {
  },
  // 请求配置
  request: {
  },
  // 日志配置
  logger: {
  }
  // ...其他更多配置
};

createApp(appConfig);
```

## 启动项配置

诸如 `router/request/logger` 等配置都会在对应文档里进行说明，这里重点说明 `app` 这一项所支持的配置：

```js
import { createApp } from 'ice';

const appConfig = {
  app: {
    rootId: 'ice-container',
    mountNode: document.getElementById('#ice-container'),
    addProvider: (children) => {
      return <ConfigProvider>{children}</ConfigProvider>;
    }
  },
};

createApp(appConfig);
```