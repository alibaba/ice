---
title: 插件列表
order: 0
---

icejs 基于工程构建工具 build-scripts 提供了丰富的插件用于提升项目的开发体验。

## plugin-fusion

`build-plugin-fusion` 是 Fusion UI 体系开发下必不可少的插件，提供丰富的功能：

- 组件按需加载
- 组件（包含业务组件）样式自动引入
- 主题定制能力
- 多个不同包名的基础组件统一

Install：

```bash
$ npm i --save-dev build-plugin-fusion
```

Options：

- `themePackage`：Fusion 组件主题包配置，如果设置为数组则启动多主题能力
- `themeConfig`：主题配置，通过设置 sass 变量对现有主题进行覆盖
- `uniteBaseComponent`：如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码
- `nextLibDir`：加载 Fusion 组件的目录，默认为 es

### 基础用法

配置主题包：

```json
{
  plugins: [
    ["build-plugin-fusion", {
      "themePackage": "@icedesign/theme",
      "nextPrefix": "nextfd-",
      "uniteBaseComponent": "@alife/next"
    }]
  ]
}
```

### 修改主题变量

```json

{
  plugins: [
    ["build-plugin-fusion", {
      "themeConfig": {
        "primaryColor": "#f60",
        "font-size-body-1": "14px"
      }
    }]
  ]
}

```

### 多主题配置

build-plugin-fusion 结合 fusion 自身可以配置主题包的能力，支持多个主题包的配置，大大简化多主题切换的成本，通过 css 变量能力实现动态主题的切换，核心实现思路如下：
1. 提取主题包中的 scss 变量（色值变量）
2. 将 scss 变量具体内容转换为 css 变量，即 `$color-brand1-1: #E2EDFF; => $color-brand1-1: var(--color-brand-1);`
3. 注入新的 scss 变量值（如 `$color-brand1-1: var(--color-brand-1)` ）进行编译
4. 在 window 下注入 `__changeTheme__` 方法，实现不同主题包全局 css 变量声明的切换

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": [{
        "name": "@icedesign/theme",
        "default": true,
        "themeConfig": {
          "custom-color": "#000"
        }
      }, {
        "name": "@alifd/theme-ice-purple",
        "themeConfig": {
          "custom-color": "#fff"
        }
      }]
    }]
  ]
}
```

通过数组的方式配置多个主题，实现多主题内容的注入。
build.json 中完成多主题包配置后，业务代码中可以直接调用 `__changeTheme__` 方法在多个主题包之间进行切换：

```js
// 可以在设置的主题包 @icedesign/theme 和 @alifd/theme-ice-purple 之间切换
window.__changeTheme__('@alifd/theme-ice-purple');
```

## plugin-antd

`build-plugin-antd` 插件为项目中使用 antd 组件提供按需加载和主题定制的能力：

- antd 组件体系按需加载
- 主题定制能力

Install:

```bash
$ npm i --save-dev build-plugin-antd
```

Options:

- `themeConfig`: 设置替换主题颜色
- `importOptions`: 同 `babel-plugin-import` 按需加载配置，默认参数 `{ libraryDirectory: 'es', style: true }`，根据用户设置进行合并

### 基础用法

```json
{
  "plugins": [
    ["build-plugin-antd", {
      "themeConfig": {
        "primary-color": "#1DA57A"
      },
      "importOptions": {
        "libraryDirectory": "lib"
      }
    }]
  ]
}
```

### 使用 antd-mobile

```json
{
  "plugins": [
    ["build-plugin-antd", {
      "themeConfig": {
        "brand-primary": "#1DA57A"
      },
      "importOptions": {
        "libraryName": "antd-mobile",
        "libraryDirectory": "es",
        "style": true,
      }
    }]
  ]
}
```

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