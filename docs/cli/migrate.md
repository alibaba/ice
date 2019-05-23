---
title: 从 1.x 版本迁移
order: 3
---

本文介绍使用 ice-scripts@1.0 的项目如何迁移到 2.0 版本。

## 升级 ice-scripts

将 package.json 中的 ice-scripts 依赖升级到 `^2.0.0`：

```bash
$ npm i --save ice-scripts@2
```

同时 ice-scripts@2.0 推荐将其作为项目依赖，而非全局依赖，如果有全局依赖的 ice-scripts，建议将其删除：

```bash
$ npm rm -g ice-scripts
```

## cli 命令变更

```diff
-"start": "ice dev",
+"start": "ice-scripts dev",

-"build": "ice build",
+"build": "ice-scripts build",
```

## 构建配置迁移

2.0 版本的常用构建配置项统一收敛到 `ice.config.js` 文件中，原有 `package.json` 中的 `bulidConfig` 和 `themeConfig` 字段废弃。

#### entry

```json
{
  "buildConfig": {
    "entry": "src/index.js"
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  entry: 'src/index.js'
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
    // 如有其他组件库需求，可参考 ice-scripts-plugin-antd 进行实现
    'ice-scripts-plugin-antd'
  ]
}
```

更多细节，参考[插件配置](/docs/cli/basic/plugins)

#### Fusion 组件配置

包括：`buildConfig.uniteBaseComponent`, `buildConfig.theme`, `themeConfig`：

```json
{
  "buildConfig": {
    "theme": "@icedesign/theme",
    "uniteBaseComponent": "@alife/next",
    "themeConfig": {
      "nextPrefix": "nextfd-"
    }
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-fusion', {
      themePackage: '@icedesign/theme',
      uniteBaseComponent: '@alife/next',
      themeConfig: {
        nextPrefix: 'nextfd-'
      }
    }]
  ]
}
```

更多细节，参考[插件配置](/docs/cli/basic/plugins)

#### 修改构建后的文件目录

```json
{
  "buildConfig": {
    "output": {
      "path": "dist"
    }
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  outputDir: 'dist'
}
```

#### 修改构建后的 css/js 文件目录

```json
{
  "buildConfig": {
    "outputAssetsPath": {
      "css": "css-dist",
      "js": "js-dist"
    }
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  outputAssetsPath: {
    js: 'js-dist',
    css: 'css-dist',
  }
}
```

#### 修改 externals

```json
{
  "buildConfig": {
    "externals": {
      "react": "react"
    }
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  externals: {
    react: 'react'
  }
}
```

#### css 中的网络资源本地化

```json
{
  "buildConfig": {
    "localization": true
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  plugins: [
    'ice-scripts-plugin-css-assets-local',
  ]
}
```

更多细节，参考[插件配置](/docs/cli/basic/plugins)

#### 禁用生成 vendor

```json
{
  "buildConfig": {
    "disableVendor": true
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  vendor: false,
}
```

## 命令行参数迁移

### --project-type

已废弃，不再支持

### --sourcemap

已废弃，不再支持

### --inject-babel

配置 `ice.config.js` 中的 `injectBabel`

```js

module.exports = {
  // default: polyfill
  injectBabel: 'runtime'
}
```

### --debug

配置 `ice.config.js` 中的 `minify`

```js
module.exports = {
  minify: false
}
```

### --hash

配置 `ice.config.js` 中的 `hash`

```js
module.exports = {
  hash: true
}
```

## .webpackrc.js 迁移

ice-scripts@2.0 版本将通过 `webpack-chain` 形式管理自定义 webpack 配置，参考[自定义 webpack 配置](/docs/cli/basic/custom-webpack)。
