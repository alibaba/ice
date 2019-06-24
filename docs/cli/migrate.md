---
title: 从 1.x 版本迁移
order: 3
---

本文介绍使用 ice-scripts@1.0 的项目如何迁移到 2.0 版本。

## 为什么要做 2.x

主要为了解决 1.x 存在的问题：

- 工程配置散落在 package.json 和 .webpackrc.js 里，对于项目长期维护不友好，2.x 统一到 `ice.config.js`
- 原先的方式对于 webpack 自定义能力较弱，很多自定义需求需要硬编码在 ice-scripts 里，2.x 基于 `webpack-chain` 解决这个问题
- 面向业务的定制需求不易于扩展，2.x 支持插件机制

## 工具迁移

安装 `ice-migrate`：

```bash
$ npm i ice-migrate -g
```

进入项目目录，并执行迁移命令：

```bash
$ cd ice-project
$ ice-migrate
```

完成迁移后，执行 `npm install` 重新安装依赖。

## 手动迁移

### 升级 ice-scripts

将 package.json 中的 ice-scripts 依赖升级到 `^2.0.0`：

```bash
$ npm i --save ice-scripts@2
```

同时 ice-scripts@2.0 推荐将其作为项目依赖，而非全局依赖，如果有全局依赖的 ice-scripts，建议将其删除：

```bash
$ npm rm -g ice-scripts
```

### cli 命令变更

```diff
-"start": "ice dev",
+"start": "ice-scripts dev",

-"build": "ice build",
+"build": "ice-scripts build",
```

### 构建配置迁移

2.0 版本的常用构建配置项统一收敛到 `ice.config.js` 文件中，原有 `package.json` 中的 `bulidConfig` 和 `themeConfig` 字段废弃。

#### 基础配置迁移

`ice.config.js` 完整支持 `buildConfig` 基础配置字段：

```json
{
  "buildConfig": {
    "entry": "src/index.js",
    "output": {
      "path": "dist"
    },
    "outputAssetsPath": {
      "css": "css-dist",
      "js": "js-dist"
    },
    "externals": {
      "react": "React"
    },
    "disableVendor": true
  }
}

```

变更为：

```js
// ice.config.js
module.exports = {
  entry: 'src/index.js',
  // output.path -> outputDir
  outputDir: 'dist',
  outputAssetsPath: {
    js: 'js-dist',
    css: 'css-dist',
  },
  externals: {
    react: 'React'
  },
  // disableVendor 设置为 true 对应 vendor 设置为false
  vendor: false,
}
```

#### babelPluginImportConfig

```json
{
  "buildConfig": {
    "babelPluginImportConfig": {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  plugins: [
    'ice-plugin-antd'
  ]
}
```

更多细节，参考[插件配置](/docs/cli/plugin-list/antd.md)

#### Fusion 组件配置

包括：`buildConfig.uniteBaseComponent`, `buildConfig.theme`, `themeConfig`：

```json
{
  "buildConfig": {
    "theme": "@icedesign/theme",
    "uniteBaseComponent": "@alife/next"
  },
  "themeConfig": {
    "nextPrefix": "nextfd-"
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
      uniteBaseComponent: '@alife/next',
      themeConfig: {
        nextPrefix: 'nextfd-'
      }
    }]
  ]
}
```

更多细节，参考[插件配置](/docs/cli/plugin-list/fusion.md)

#### css 中的网络资源本地化

#### 代理配置

原先的代理配置位于 `package.json` 里的 proxyConfig 字段，需要将其迁移到 `ice.config.js` proxy 字段。

### 命令行参数迁移

#### --project-type

已废弃，不再支持

#### --sourcemap

已废弃，不再支持

#### --inject-babel

配置 `ice.config.js` 中的 `injectBabel`

```js

module.exports = {
  // default: polyfill
  injectBabel: 'runtime'
}
```

#### --debug

配置 `ice.config.js` 中的 `minify`

```js
module.exports = {
  minify: false
}
```

#### --hash

配置 `ice.config.js` 中的 `hash`

```js
module.exports = {
  hash: true
}
```

### .webpackrc.js 迁移

ice-scripts@2.0 版本通过 `webpack-chain` 形式管理自定义 webpack 配置，因此原先在 `.webpackrc.js` 里有新增 webpack loader/plugin 的情况则需要切换到 webpack-chain 的写法，具体请参考[自定义 webpack 配置](/docs/cli/config/custom-webpack.md)。

### 云构建迁移

> 仅阿里内部同学需要关心

参考[文档](https://yuque.antfin-inc.com/ice/rdy99p/angwyx)