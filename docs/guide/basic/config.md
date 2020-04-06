---
title: 运行时配置
order: 6
---

icejs 提供了根据环境区分运行时配置的能力。

## 通过工程设置环境

### 设置环境

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

### 根据环境配置

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

## 通过运行时设置环境

在某些场景下，可能无法在每个环境都进行构建来配置 `APP_MODE`，希望只通过运行时的能力来指定，为此我们也提供了运行时配置 `APP_MODE` 的方式：

### 设置环境

```ts
// 如通过域名来动态设置环境

const host = location.host;

if (/127.0.0.1/.test(host)) {
  window.__app_mode__ = 'local';  
} else if (/daily.example.com/.test(host)) {
  window.__app_mode__ = 'daily';
} else {
  window.__app_mode__ = 'prod';
}
```

> 注意：在服务端渲染时不存在 window 变量，需要通过 global 进行定义。如：global.__app_mode_ = 'prod'     

### 根据环境配置

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
