---
title: 日志打印
order: 11
---

前端应用中常见的使用最多的毋庸置疑是 `console.log`，然而很多时候我们只希望在开发环境中打印日志，在生产环境中则不打印日志，或者设置日志的级别，避免生产环境的调试日志在生产环境中出现，这便是框架内置提供的日志功能的初衷。

## 日志分类

框架日志分为 NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别，别在不同的场景下使用：

* `logger.trace(msg)`：输出一个堆栈跟踪
* `logger.debug(msg)`：输出一个调试日志
* `logger.info(msg)`：输出一个信息日志
* `logger.warn(msg)`：输出一个警告日志
* `logger.error(msg)`：输出一个错误日志

更多 API 详见：[loglevel](https://github.com/pimterry/loglevel)

## 使用

```tsx
import { logger } from 'ice';

logger.info('xxx');
```

## 配置

在 `src/config.ts` 中根据不同环境配置 loglevel:

```js
export default {
  default: {
    logLevel: 'warn'
  },
  production: {
    logLevel: 'error'
  }
}
```

在 `src/app.ts` 中将配置的 loglevel 传递给 logger：

```js
import { createApp, config } from 'ice';

// 用于配置
const appConfig = {
  logger: {
    level: config.loglevel
  }
};

createApp(appConfig);
```
