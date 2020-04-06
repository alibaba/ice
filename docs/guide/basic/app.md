---
title: 应用入口
order: 2
---

框架通过调用 `createApp` 创建渲染整个应用，在创建应用时可以传入应用的全局配置。

## 配置规范

通过 `src/app.ts` 对应用进行全局配置，设置路由、运行环境、请求、日志等：

```ts
import { createApp, IAppConfig } from 'ice';

// 应用配置
const appConfig: IAppConfig = {
  app: {
    // ...
  },
  router: {
    // ...
  }
};

createApp(appConfig);
```

## 启动项配置

`app` 这一项所支持的配置：

```js
import { createApp } from 'ice';

const appConfig = {
  app: {
    // 可选，根节点 id，默认为 ice-container
    rootId: 'ice-container',

    // 可选，根节点 DOM 元素，更灵活的 rootId
    mountNode: document.getElementById('#ice-container'),

    // 可选，自定义添加 Provider
    addProvider: ({ children }) => {
      return <ConfigProvider>{children}</ConfigProvider>;
    },

    // 可选，常用于 SSR 场景
    getInitialData: async() => {
      const result = await request();
      return result;
    }
  },
};

createApp(appConfig);
```

## 其他配置项

- [路由配置](/docs/guide/basic/router#路由配置]
- [请求配置](/docs/guide/basic/request#请求配置)
- [状态管理配置](/docs/guide/basic/store#配置参数)
- [日志配置](/docs/guide/basic/logger#配置)
- ...其他更多自定义插件配置