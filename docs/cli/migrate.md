---
title: 从1.x版本迁移
order: 3
---

### 升级ice-scripts

升级ice-scripts到 `^2.0.0`

### cli 命令变更

```diff
-"start": "ice dev",
+"start": "ice-scripts dev",

-"build": "ice build",
+"build": "ice-scripts build",
```

### cli options 迁移

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


### 基础配置迁移

`ice-scripts` 常用构建配置项，将均在 `ice.config.js` 中进行配置。`package.json` 中的 `bulidConfig` 将废弃。

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
    // 如有过个组件库需求，可参考ice-scripts-plugin-antd进行实现
    'ice-scripts-plugin-antd'
  ]
}
```

更多细节，参考[插件配置](/docs/cli/basic/plugins)

#### uniteBaseComponent

```json
{
  "buildConfig": {
    "uniteBaseComponent": "@alife/next"
  }
}
```

变更为：

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-fusion', {
      // @icedesign/base | @alife/next | @ali/ice -> @alife/next
      uniteBaseComponent: '@alife/next'
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

### 自定义webpack配置迁移

`ice-scripts 2.x` 版本将通过 `webpack-chain` 形式管理 自定webpack配置，参考[自定义webpack配置](/docs/cli/basic/custom-webpack)
