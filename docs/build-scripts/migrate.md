---
title: 从 ice-scripts 版本迁移
order: 3
---

build-scripts 满足 ice-scripts 2.x 工程上的所有能力，可以方便地从 ice-scripts 2.x 迁移至 build-scripts 工程

## 工具迁移

安装 `build-migrate`：

```bash
$ npm i build-migrate -g
```

进入项目目录，并执行迁移命令：

```bash
$ cd ice-project
$ build-migrate
```

完成迁移后，执行 `npm install` 重新安装依赖。

## 手动迁移

### 安装相关依赖

安装 build-scripts 工程相关依赖：

```bash
$ npm i --save-dev @alib/build-scripts build-plugin-ice-app build-plugin-fusion 
```

其他插件依赖可参考下文的 `插件迁移列表`。

### cli 命令变更

```diff
-"start": "ice-scripts dev",
+"start": "build-scripts start",

-"build": "ice-scripts build",
+"build": "build-scripts build",
```

### 基础配置迁移

build-scripts 中常用的构建配置在 `build.json` 文件中进行设置，支持所有 `ice.config.js` 中的常见配置。
由于配置文件由 JS 文件变为 JSON 文件，部分常用配置将会简化：

#### alias

```js
// ice.config.js
module.exports = {
  alias: {
    '@components': path.resolve(__dirname, 'src/components/')
  }
}
```

变更为：

```json
{
  "alias": {
    "@components": "./src/components/"
  }
}
```

#### define

```js
// ice.config.js
module.exports = {
  define: {
    // 此处不能省略 JSON.stringify，否则构建过程会出现语法问题
    ASSETS_VERSION: JSON.stringify('0.0.1'),
  }
}
```

变更为：

```json
{
  "define": {
    "@ASSETS_VERSION": "0.0.1"
  }
}
```

### 自定义 webpack 配置迁移

build-scripts 将 JSON 文件作为默认配置文件，将不再支持在配置文件中直接进行自定义配置，可以通过本地插件的方式进行迁移：

```js
// ice.config.js
module.exports = {
  chainWebpack: (config, { command }) => {
    if (command === 'dev') {
      config.devServer.hot(true);
    }
    config.output.path('dist');
  }
}
```

变更为：

```json

{
  "plugins": [
    "./local-plugin.js"
  ]
}
```

```js
//local-plugin.js
module.exports = ({ onGetWebpackConfig, context }) => {
  const { command } = context;
  onGetWebpackConfig((config) => {
    if (command === 'start') {
      config.devServer.hot(true);
    }
    config.output.path('dist');
  });
}
```

核心 API 变化：`chainWebpack` => `onGetWebpackConfig`，调试命令变化：`dev` => `start`。

### 插件迁移列表

ice-scripts 插件 | build-scripts 插件 | 变更内容
-|-|-
ice-plugin-fusion| build-plugin-fusion | 
ice-plugin-antd| build-plugin-antd | 
ice-plugin-component| build-plugin-component | 移除 type 配置，不再支持接入 Fusion Cool 构建，该能力由新插件 build-plugin-fusion-cool 提供
ice-plugin-css-assets-local | build-plugin-css-assets-local | 
ice-plugin-multi-pages | build-plugin-multi-pages | 移除 getEntryName 参数支持，如有定制 entry 名称规则，请联系 ice 团队
ice-plugin-moment-locales | build-plugin-moment-locales | 
ice-plugin-modular-import | build-plugin-modular-import | 
ice-plugin-load-assets | build-plugin-load-assets | 
ice-plugin-smart-debug | build-plugin-smart-debug | 
ice-plugin-dll | 暂未支持 | 
