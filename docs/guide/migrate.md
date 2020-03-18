---
title: 迁移到 icejs
order: 4
---

## 为什么要迁移到 icejs

只需要添加一个 icejs 依赖，即可拥有以下功能：

* 基于 build-scripts 实现，且完全兼容 ice-scripts@2.x 的配置能力，更好的构建体验
* 内置支持基于 icestore 的状态管理方案，使用更简单更友好
* 内置支持基于 axios 的数据请求方案，以及日志、工具函数等功能
* 丰富的插件支持，通过插件可快速接入和编写 SPA、MPA、微前端、SSR 等应用类型

## 从 ice-scripts@2.x 迁移

### 修改 package.json 

icejs 基于 build-scripts 内置了工程开发构建能力，不在需要单独依赖 ice-scripts，同时相关插件也进行了一次重构优化。

```diff
{
- "ice-scripts": "^2.0.0",
- "ice-plugin-fusion": "^0.1.4",
- "ice-plugin-moment-locales": "^0.1.0",
+ "ice.js": "^1.0.0"
+ "build-plugin-fusion": "^0.1.0",
+ "build-plugin-moment-locales": "^0.1.0",
}
```

* [ice-scripts@1.x 插件列表](https://ice.alibaba-inc.com/docs/cli/plugin-list/fusion)
* [icejs 插件列表](https://ice.work/docs/guide/develop/plugin-list)

### 修改配置文件

icejs 提供 `build.json` 文件用于工程配置，因此需要将 `ice.config.js` 配置迁移到 `build.json` 中，具体如下:

1. 假设你的 `ice.config.js` 配置如下：

```ts
const path = require('path');

module.exports = {
  entry: 'src/index.js',
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
    }]
  ],
  chainWebpack: (config, { command }) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins.push(require('jsx-control-statements'));
          return options;
        });
    });
  },
};
```

2. 新建 `build.json` 文件：

icejs 默认入口文件为 `app.(js|ts)`，因此不需要在单独配置：

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": "@icedesign/theme"
    }],
    "./build.plugin.js"
  ]
}
```

3. 新建 `build.plugin.js` 文件：

将自定义的 chainWebpack 配置移到新建的 `build.plugin.js` 中:

```ts
module.exports = ({  onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
     ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins.push(require('jsx-control-statements'));
          return options;
        });
    });
  });
}
```

4. 删除 `ice.config.js` 配置文件

### 修改应用入口文件

将原有应用入口为 `src/index.js` 需要修改为 `src/app.js`，具体修改如下：

1. 假设你的 `src/index.js` 文件内容如下：

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import './global.scss';
import router from './router';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(router(), ICE_CONTAINER);
```

2. 新建 `src/app.js` 文件：

```ts
import { createApp } from 'ice';

const appConfig = {
  router: {
    type: 'browser', // 配置 browser 路由
  },
};

createApp(appConfig);
```

3. 删除 `src/index.js` 文件

### 其他文件修改

icejs 规范和强约束了项目的目录结构，因此只需要按照规范就行编辑即可，不在需要额外的引用

- 删除 `src/router.jsx` 文件
- 移动 `src/config/routes.js` 路由配置至 `src/routes.js` 中
- 在 `.gitignore` 中新增 `.ice/` 目录
- 在根目录下新建 `tsconfig.json` 文件，[配置详见](https://github.com/ice-lab/icejs/blob/master/examples/basic-spa/tsconfig.json)
- 如果项目存在 `src/models/*`、`src/pages/*/model.js` 或者 `src/pages/*/models/*` 的目录文件，需要在 `build.json` 中配置 `store: false`
- 如果你的项目已经使用 icestore 且版本小于 1.0.0 版本，可以选择按需升级或者在 `build.json` 中配置 `store: false` 关闭内置的方案
