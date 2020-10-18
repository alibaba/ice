---
title: 迁移到 icejs
order: 5
---

## 为什么要升级到 icejs

飞冰的脚手架从 `ice-scripts@1.x` 到 `ice-scripts@2.x` 到 icejs 经过了三个大的版本变化，这些版本变化都是结合我们的业务实践以及用户诉求不断演进的，在能力和规范性上都在不断提高，核心的一些差别：

|      维度\版本     |    icejs 1.x    |  ice-scripts 2.x   |  ice-scripts 1.x  |
|-------------------|-------------------|-------------------|-------------------|
|  定位             |   研发框架        |       构建工具       |     构建工具        |
|  配置文件         |  build.json      |      ice.config.js  |  package.json(buildConfig) |
|  文档地址  |[访问](/docs/guide/about)|[访问](/docs/guide-0.x/about)|[访问](https://github.com/alibaba/ice/tree/master/docs/ice-scripts-1.x)|
|  发布时间         |   2020.02        |      2019.06       |     2018.02        |
|  可渐进升级性      |   好            |      不好             |    不好            |
|  插件能力         |   工程+运行时     |       工程           |       无          |
|  工程配置         |   强             |       强           |        弱          |
|  运行时配置       |   默认支持         |       默认不支持     |    默认不支持     |
|  SSR            |   支持             |       不支持        |      不支持     |

> 可渐进升级性「好」意味着整体设计较为稳定，未来的版本变化用户可以低成本的渐进升级

## 从 ice-scripts 2.x 迁移

### 1. 修改 package.json 依赖

icejs 基于 build-scripts 内置了工程开发构建能力，不在需要单独依赖 ice-scripts，同时相关插件也进行了一次重构优化。

```diff
{
-  "ice-scripts": "^2.0.0",
-  "ice-plugin-fusion": "^0.1.4",
-  "ice-plugin-moment-locales": "^0.1.0",
+  "ice.js": "^1.0.0"
+  "build-plugin-fusion": "^0.1.0",
+  "build-plugin-moment-locales": "^0.1.0",
}
```

* [ice-scripts@2.x 插件列表](/docs/guide-0.x/builder/plugin-list)
* [icejs 插件列表](/docs/guide/develop/plugin-list)

### 2. 修改配置文件

icejs 提供 `build.json` 文件用于工程配置，因此需要将 `ice.config.js` 配置迁移到 `build.json` 中，具体如下:

假设你的 `ice.config.js` 配置如下：

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

新建 `build.json` 文件：（icejs 默认入口文件为 `app.(js|ts)`，因此不需要单独配置 entry）

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

然后新建 `build.plugin.js` 文件，将自定义的 chainWebpack 配置移到新建的 `build.plugin.js` 中:

```js
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

最后删除 `ice.config.js` 配置文件。

### 3. 修改应用入口文件

将原有应用入口为 `src/index.js` 需要修改为 `src/app.js`，具体修改如下：

假设你的 `src/index.js` 文件内容如下：

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

新建 `src/app.js` 文件：

```ts
import { createApp } from 'ice';

const appConfig = {
  router: {
    type: 'browser', // 配置 browser 路由
  },
};

createApp(appConfig);
```

最后，删除 `src/index.js` 文件

### 4. 其他文件修改

icejs 规范和强约束了项目的目录结构，因此只需要按照规范就行编辑即可，不在需要额外的引用

- 删除 `src/router.jsx` 文件
- 移动 `src/config/routes.js` 路由配置至 `src/routes.js` 中
- 在 `.gitignore` 中新增 `.ice/` 目录
- 在根目录下新建 `tsconfig.json` 文件，[配置详见](https://github.com/ice-lab/icejs/blob/master/examples/basic-spa/tsconfig.json)
- 如果项目存在 `src/models/*`、`src/pages/*/model.js` 或者 `src/pages/*/models/*` 的目录文件，需要在 `build.json` 中配置 `store: false`
- 如果你的项目已经使用 icestore 且版本小于 1.0.0 版本，可以选择按需升级或者在 `build.json` 中配置 `store: false` 关闭内置的方案

## 从 ice-scripts 1.x 迁移

### 1. 修改 package.json 依赖

icejs 支持了 ice-scripts 工程开发构建能力，不在需要单独依赖 ice-scripts，修改为 ice.js 即可。

```diff
{
-  "ice-scripts": "^1.0.0",
+  "ice.js": "^1.0.0"
}
```

### 2. 修改配置文件

icejs 提供 `build.json` 文件用于工程配置，因此需要将 `.webpackrc.js` 配置迁移到 `build.json` 中，假设你的 `.webpackrc.js` 配置如下：

```js
module.exports = {
  entry: 'src/index.js',
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ]
};
```

新建 `build.json` 文件

```diff
{
+  "entry": "src/index.js"
}
```

然后新建 `build.plugin.js` 文件，将自定义的插件配置移到新建的 `build.plugin.js` 中：

```js
module.exports = ({  onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    ['scss'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module
          .rule(rule)
          .use('css-loader')
          .tap((options) => ({
            ...options,
            sourceMap: true
          }));
      }
  });
}
```

同时将自定义的插件引入到 `build.json` 中，最后删除 `.webpackrc.js` 配置文件。

```diff
{
  "entry": "src/index.js",
+ "plugins": [
+   "./build.plugin.js"
+ ]
}
```

### 3. 禁用运行时能力

由于 icejs 相比 ice-scripts 除了提供工程能力外，还提供了运行时扩展的能力，因此对于 ice-scripts 的项目提供了禁用运行时能力的功能，确保最小化的升级和只使用工程能力。

在 `build.json` 中配置 disableRuntime 选项即可：

```diff
{
  "entry": "src/index.js",
  "plugins": [
    "./build.plugin.js"
  ],
+ "disableRuntime": true
}
```

### 更新主题配置

如果你的 `package.json` 中存在 `buildConfig` 和 `themeConfig` 配置，则需要将该配置移置 `build.json` 文件中。

```json
"buildConfig": {
  "theme": "@icedesign/skin",
  "localization": false
},
"themeConfig": {
  "primaryColor": "#908ce1"
},
```

更新后的 `build.json`  如下：

```diff
{
  "entry": "src/index.js",
  "plugins": [
+   [
+     "build-plugin-fusion", {
+       "themePackage": "@icedesign/skin",
+       "themeConfig": {
+         "primaryColor": "#908ce1"
+       }
+     }
+   ],
    "./build.plugin.js"
  ],
  "disableRuntime": true
}
```

### 更新 proxyConfig

如果你的 `package.json` 中存在 `proxyConfig` 配置，则需要将该配置移置 `build.json` 文件中，并将 `proxyConfig` 更新为 `proxy` 。

```json
"proxyConfig": {
  "/api/**": {
    "enable": true,
    "target": "pre-faraday.alibaba-inc.com"
  }
}
```

更新后的 build.json  项如下。

```diff
{
  "entry": "src/index.js",
  "plugins": [
    [
      "build-plugin-fusion", {
        "themePackage": "@icedesign/skin",
        "themeConfig": {
          "primaryColor": "#908ce1"
        }
      }
    ],
    "./build.plugin.js"
  ],
  "disableRuntime": true,
+ "proxy": {
+   "/api/**": {
+     "enable": true,
+     "target": "pre-faraday.alibaba-inc.com"
+   }
  }
}
```

### 更新 scripts 脚本

最后将 `package.json` 中启动项目的脚本替换如下：

```diff
"scripts": {
-   "start": "ice dev",
+   "start": "icejs start",
-   "build": "ice build",
+   "build": "icejs build"
}
```

通过以上步骤即可基于 `ice-scripts@1.x` 升级到 `ice.js`，如果还存在其他配置或者升级失败，可以通过飞冰社区群与我们联系。
