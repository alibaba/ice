---
title: 运行时配置
order: 6
---

icejs 提供了根据环境区分运行时配置的能力。

## 设置环境

通过命令行参数可以设置不同的环境，默认情况下支持 start/build 两个环境，对应的即 `icejs start/build` 两个命令，开发者可以通过 `--mode` 参数来扩展环境：

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

按照这样配置之后即可在前端代码里拿到该配置：

```js
import { APP_MODE } from 'ice';

// 默认情况是 start 或者 build
console.log('APP_MODE', APP_MODE);
```

当然大多数时候你都不需要关心 `APP_MODE` 这个变量，只需要按照下面的约定方式配置即可。

## 根据环境区分配置

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

配置之后框架会自动根据当前环境将配置进行合并覆盖，开发者只需要在代码中直接使用 config 即可：

```js
import { config } from 'ice';

console.log(config.appId);
```

## 运行时扩展环境

在某些场景下，应用的运行环境跟工程构建环境可能无法完全匹配，比如应用有日常/预发两个运行环境，但实际上只能进行一次构建任务，此时则需要通过运行时扩展环境信息来支持不同配置。

如下代码即通过当前页面的域名来区分环境：

```js
// src/app.ts，代码逻辑需要放在最顶部
// 如通过域名来动态设置环境
if (/127.0.0.1/.test(location.host)) {
  window.__app_mode__ = 'local';
} else if (/daily.example.com/.test(location.host)) {
  window.__app_mode__ = 'daily';
} else {
  window.__app_mode__ = 'prod';
}
```

此时无论是 `src/config.ts` 还是 `import { APP_MODE } from 'ice'` 都可以使用新的环境变量。

> 注意：在服务端渲染时不存在 window 变量，需要通过 global 进行定义，如：global.__app_mode_ = 'prod'