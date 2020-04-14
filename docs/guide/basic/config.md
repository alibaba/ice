---
title: 环境配置
order: 7
---

icejs 支持区分不同环境，开发者可根据环境区分**工程配置**以及**运行时配置**。常见场景：

- 多套构建环境，每个环境的工程配置不一样
- 应用运行时的一些配置项需要根据环境切换

## 设置环境

通过命令行参数可以设置不同的环境，默认情况下支持 `start/build` 两个环境，对应的即 `icejs start/build` 两个命令，开发者可以通过 `--mode` 参数来扩展环境：

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

> 阿里内部同学可参考[文档](https://yuque.alibaba-inc.com/ice/rdy99p/angwyx#TzBL7)指定日常环境

## 区分工程配置

在定义好环境之后，即可在 `build.json` 中通过 `modeConfig` 来根据环境区分配置了：

```json
{
  "alias": {},
  "modeConfig": {
    "daily": {
      "define": {},
      "vendor": false
    },
    "prod": {
      "define": {},
      "vendor": true
    }
  }
}
```

同时在本地插件 `build.plugin.js` 也可以从 context 上获取到当前 mode：

```js
module.exports = ({ context }) => {
  const { command, commandArgs } = context;
  const mode = commandArgs.mode || command;
}
```

## 区分运行时配置

在定义好环境之后，前端代码中即可通过 `APP_MODE` 拿到当前环境：

```js
import { APP_MODE } from 'ice';

console.log('APP_MODE', APP_MODE);
```

当然大多数时候你都不需要关心 `APP_MODE` 这个变量，只要按照约定的方式区分不同环境的配置即可。在 `src/config.ts` 中编写不同环境的配置：

```js
// src/config.ts
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

配置之后框架会自动根据当前环境将配置进行合并覆盖，开发者只需要在代码中直接使用 `config` 即可：

```js
import { config } from 'ice';

console.log(config.appId);
```

## 动态扩展运行时环境

在某些场景下，应用的运行环境跟工程构建环境可能无法完全匹配，比如应用有日常/预发两个运行环境，但实际上只能进行一次构建任务，此时则可以通过运行时扩展环境来支持不同配置。

在 `src/config.ts` 中通过域名来扩展环境：

```js
// src/config.ts：如通过域名来动态设置环境
if (/pre.example.com/.test(location.host)) {
  // 动态增加预发环境
  window.__app_mode__ = 'pre';
}

export default {
  default: {},
  daily: {},
  pre: {},
  prod: {}
};
```

> 注意：在服务端渲染时不存在 window 变量，需要通过 global 进行定义，如：global.__app_mode_ = 'prod'
