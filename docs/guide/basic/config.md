---
title: 运行时配置
order: 6
---

icejs 提供了根据环境区分运行时配置的能力

## 设置环境

默认情况下支持 start/build 两个环境，对应的也是 `icejs start/build` 两个命令，开发者可以通过 `--mode` 参数来扩展环境：

```json
{
  "scripts": {
    "start": "icejs start --mode local",
    "build": "icejs build --mode local",
    "build:daily": "icejs build --mode daily",
    "build:prod": "icejs build --mode prod"
  }
}
```

> 注意：如果你是阿里内部的开发者，我们对这个能力做了一些扩展，具体可参考文档：

按照这样配置之后即可在前端代码里拿到该配置：

```js
import { APP_MODE } from 'ice';

// 默认情况是 start 或者 build
console.log('APP_MODE', APP_MODE);
```

当然大多数时候你都不需要关心 `APP_MODE` 这个变量，只需要按照下面的约定方式配置即可。

## 根据环境配置

在区分好环境之后就可以在 `src/config.ts` 中配置每个环境的选项了：

```js
export default {
  // 默认配置
  default: {
    appId: '123',
    baseURL: '/api'
  },
  local: {
    appId: '456',
  },
  daily: {
    appId: '789',
  },
  prod: {
    appId: '101',
  }
}
```

配置之后框架会自动根据当前环境将配置进行合并覆盖，在代码中使用合并后的 config：

```js
import { config } from 'ice';

console.log(config.appId);
```