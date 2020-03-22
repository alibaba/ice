---
title: 官方插件列表
order: 4
---

icejs 基于工程构建工具 build-scripts，提供了丰富的插件用于提升项目的开发体验。

## plugin-fusion

`build-plugin-fusion` 是 Fusion UI 体系开发下必不可少的插件，提供丰富的功能，详细使用可参考 [使用 Fusion 组件](/docs/guide/advance/fusion.md)

## plugin-antd

`build-plugin-antd` 插件为项目中使用 antd 组件提供按需加载和主题定制的能力，详细使用可参考 [使用 antd 组件](/docs/guide/advance/antd.md)

## plugin-modular-import

用于快捷增加 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的配置

Install:

```bash
$ npm i --save-dev build-plugin-modular-import
```

### 基础用法

```json
{
  "plugins": [
    ["ice-plugin-modular-import", [{
      "libraryName": "lodash",
      "libraryDirectory": "",
      "camel2DashComponentName": false
    }, {
      "libraryName": "@material-ui/core",
      "libraryDirectory": "components",
      "camel2DashComponentName": false
    }]]
  ]
}
```

## plugin-css-assets-local

`build-plugin-css-assets-local` 提供将 css 中的网络资源本地化能力：

- 将 CSS 中依赖的资源本地化，例如字体文件等。

Install:

```bash
$ npm i --save-dev build-plugin-css-assets-local
```

Options:

- `outputPath`: 默认值： `assets` 提取后的文件目录前缀
- `relativeCssPath`: 默认值： `../` 提取的文件后相对于 CSS 的路径

### 基础用法

```json
{
  "plugins": [
    ["build-plugin-css-assets-local", {
      "outputPath": "assets",
      "relativeCssPath": "../"
    }]
  ]
}
```
## plugin-moment-locales

`build-plugin-moment-locales` 将对 moment 依赖的使用进行优化：

- 优化 moment 语言包加载
- 根据设置自动加载对应语言包

Install:

```bash
$ npm i --save-dev build-plugin-moment-locales
```

Options:

- `locales`：类型 `String | Array`，需要加载的多语言包

### 基础用法

```json
{
  "plugins": [
    ["build-plugin-moment-locales", {
      "locales": ["zh-cn", "en-au"]
    }]
  ]
}
```

## plugin-load-assets

插件提供自动加载 assts 资源能力：

 - 页面渲染前将自动加载配置的 assets 资源，资源类型包括 js 和 css
 - 根据不同的执行命令，加载不同的 assets 资源

Install:

```bash
$ npm i --save-dev build-plugin-load-assets
```

### 基础使用

dev 命令和 build 命令 加载相同 assets 资源

```json
{
  "plugins": [
    ["build-plugin-load-assets", {
      "assets": ["https://unpkg.com/lodash@4.17.11/index.js", "https://url/global.css"]
    }]
  ]
}
```

### 配合 externals

配合 external 自动加载 react, react-dom 的资源

```json
{
  "externals": {
    "react": "window.React",
    "react-dom": "window.ReactDOM",
  },
  "plugins": [
    ["build-plugin-load-assets", {
      "assets": {
        "dev": ["https://unpkg.com/react@16.7.0/umd/react.development.js", "https://unpkg.com/react-dom@16.7.0/umd/react-dom.development.js"],
        "build": ["https://unpkg.com/react@16.7.0/umd/react.production.min.js", "https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js"]
      }
    }]
  ]
}
```

## plugin-smart-debug

用于 debug 调试，常见于线上环境加载本地 assets 资源进行调试的场景：

 - 开启调试后，可以指定页面加载本地 assets 资源

Install:

```bash
$ npm i -save-dev build-plugin-smart-debug
```

### 基础用法

```json
{
  "plugins": [
    "build-plugin-smart-debug"
  ]
}
```

访问链接中开启 debug 调试，设置 `smartDebug=true` 进行开启

```
http://example.com/?smartDebug=true
```

开启后页面将默认加载本地入口脚本 `127.0.0.1:3333/build/js/index.js`，`__webpack_public_path__` 将会变为 `127.0.0.1:3333/build/`。

> 默认加载的脚本地址，将会受 `build.json` 中的 `outputDir` 和 `outputAssetPath.js` 配置影响，即默认入口文件路径规则 `${outputDir}/${outputAssetPath.js}/index.js`。
> 对应入口 css 文件的规则为 `${outputDir}/${outputAssetPath.css}/index.css`，`build-plugin-smart-debug` 插件会自动通过 js 路径按规则替换并推导出 css 路径地址并进行自动加载。

支持定制的参数包括：

* 调试端口：`debugPort`，例如设置调试 8080 端口，`debugPort=8080`，默认端口为：3333
* 入口脚本路径：`debugPath`，`debugPath=/build/index.js`，页面将加载 `127.0.0.1:8080/build/index.js`
* 资源输出路径：`outputPath`，`outputPath=dist`，即 runtime 的 publicPath 将会变成 `127.0.0.1:8080/dist/`，`outputPath` 默认读取 `build.json` 中的 `outputDir`，如果不需要可以设置为 `outputPath=`

如想加载的入口地址为 `127.0.0.1:8080/dist/index.js`， `__webpack_public_path__`路径为 `127.0.0.1:8080/dist/`，则可以在 url 中进行如下设置：

```
http://example.com/?smartDebug=true&debugPort=8080&debugPath=/dist/index.js&outputPath=dist
```