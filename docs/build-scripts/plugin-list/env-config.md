---
title: build-plugin-env-config
order: 3
---

`build-plugin-env-config` 插件可以根据不同环境配置不同的参数

## 功能

- 支持通过环境变量区分设置不同配置参数

## 如何使用

```bash
$ npm i --save-dev build-plugin-env-config
```

Usage:

```json
{
  "entry": "src/index.jsx",
  // ...
  "plugins": [
    "build-plugin-ice-app",
    ["build-plugin-env-config", {
      "envKey": "NODE_ENV",
      // 对应 start
      "development": {

      },
      // 对应 build
      "production": {
        "entry": "src/index.tsx",
      }
    }]
  ]
}
```

更多用法，详见 [工程配置-根据环境区分配置](/docs/build-scripts/config/config.md)