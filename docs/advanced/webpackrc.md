---
title: 定制构建器
order: 3
category: 进阶指南
---

ICE 应用的工程 [ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 使用了 `webpack` 作为构建的基石，并且提供了零配置的构建，ice-scripts 是一个包含 dev 和 build 的命令行工具，默认提供了最佳实践的工程配置，支持开发和构建飞冰体系的工程项目，同时也支持自定配置 webpack，你可以想象他为可配置版的 create-react-app。

但是如果你对 `webpack` 配置有特别的需求，可以参考本文对默认配置进行定制。

## 要求

- ice-scripts 依赖版本号为 1.1.0 及以上。

## 主题配置 - themeConfig

ICE 提供了主题功能，以满足业务和品牌多样化的视觉需求，包括但不限于主色、圆角、边框等的视觉自定义配置。

- Layout 主题配置：由 Layout 提供能力支持，比如可传入 dark 、Light 或者其他自定义的主题（注：需要看模板是否支持 Layout 主题配置）
- 组件主题配置：由基础组件提供能力支持，通过主题功能可以实现对组件基础样式的个性化配置

需要在 package.json 中新增 themeConfig 字段进行配置，默认的 icedesign 风格由皮肤包 @icedesign/skin 提供，你也可以基于该皮肤包进一步定制:

```json
// in package.json

...

"buildConfig": {
  "theme": "@icedesign/skin", // 主题包
},
"themeConfig": {
  "theme": "dark",            // layout 主题配置
  "primaryColor": "red",      // 主品牌色
  "secondaryColor": "grey",   // 副品牌色
},

...
```

## 代理配置 - proxyConfig

代理功能是前后端分离项目中最常见的需求，在 ice-scripts 工程中，也提供了快速配置的入口，只需要在 package.json 中新增 proxyConfig 字段即可进行代理配置。

#### 配置示例

```json
{
  "proxyConfig": {
    "/**": {
      "enable": true,
      "target": "http://127.0.0.1:6001"
    }
  }
}
```

#### 匹配规则

```json
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
```

- `/` 匹配所有规则
- `/api` 匹配 path 以 `/api` 开头的路径

#### 代理示例

```js
axios({
  url: '/api/proxy',
  method: 'get',
})
  .then((response) => {})
  .catch((err) => {});
```

请求发出后将会被代理到  `http://127.0.0.1:6001/api/proxy`

#### 注意事项

代理并不解决跨域问题，代理目标需要开启 CORS 配置 [HTTP 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

## 构建配置 - buildConfig

除了提供主题配置和代理配置之外， ice-scripts 还提供了一些常用的构建配置项，方便开发者快速自定义配置，在 package.json 中新增 bulidConfig 字段，包含以下配置项：

#### 配置项

```js
// 配置项遵循 webpack 的配置规则：https://webpack.js.org/configuration/
"buildConfig": {
   "entry": "",             // 指定入口文件
   "output": {},            // 指定输出配置项
   "externals": "",         // 外部扩展配置
   "localization": true     // 资源是否本地化
}
```

#### 配置示例

如自定义 entry 的配置，默认会以 `src/index.js` 文件作为入口文件，配置在项目的 package.json 的 `buildConfig` 字段中；如果你需要改变默认的入口文件，可以自行修改即可生效。

```js
"buildConfig": {
  "entry": "src/index.js"
}
```

如果你的项目是多页应用，希望把 `src/pages` 的文件作为入口，那么可以这样配置：

```
"buildConfig": {
  "entry": [
     "dashboard": 'src/dashboard/index.js',
     "about": 'src/about/index.js'
  ]
}
```

## 自定义配置 - .webpackrc.js

ice-scripts 除了提供 buildConfig 用于快速的配置入口之外，也支持自定义配置需求，几乎可完全自定义 webpack 的所有配置项；在项目根目录新建 `.webpackrc.js` 文件对默认配置进行定制和覆盖。`.webpackrc.js` 文件需要导出一个函数，其支持的参数可以参考 `webpack` [官方文档](https://webpack.js.org/concepts/output/)。

`.webpackrc.js` 文件采用操作系统中安装的 Node.js 所支持的语法，所以可以使用除了 `import`, `export` 等之外的几乎所有 ES6 语法。

```js
module.exports = (context) => {
  const { webpack } = context;

  // webpack config
  return {
    plugins: [
      new webpack.DefinePlugin({
        ASSETS_VERSION: '0.0.1',
      }),
    ],
  };
};
```

### 如修改编译的路径为 dist

```js
const path = require('path');

module.exports = (context) => {
  return {
    output: {
      path: path.resolve('dist'),
    },
  };
};
```

### 字体本地化配置

@icedesign/base@0.2.4 版本后字体文件已添加到包中。默认使用网络 cdn 字体文件，如果需要将字体本地化的，按照如下配置修改即可。

1. 修改 webpackrc.js 增加一个 alias 指定字体文件目录。

```js
const path = require('path');

module.exports = (context) => {
  return {
    resolve: {
      alias: {
        '@fonts': '@icedesign/base/fonts',
      },
    },
  };
};
```

2. 通过 themeConfig 修改 sass 中的字体默认值

font-custom-path 变量名自定义字体文件路径, 修改 package.json 文件下的 themeConfig 字段内容：

```json
{
  "themeConfig": {
+   "font-custom-path": "~@fonts/"
  }
}
```

配置好后重启服务即可, 务必确认 @icedesign/base 版本大于 0.2.4

### 配置索引

> 给出常用的配置示例

- entry
- outputPath
- publicPath
- define
- externals
- alias

#### entry

除了在 package.json 的 buildConfig 里配置 entry 之外，你也可以在 `.webpackrc.js` 按照 webpack 的配置方式配置 entry 入口文件.

```js
module.exports = (context) => {
  return {
    entry: 'src/index.js',
  };
};
```

### outputPath

配置 webpack 的 [output.path](https://webpack.js.org/configuration/output/#output-path) 属性。

```js
module.exports = (context) => {
  return {
    output: {
      path: path.resolve(__dirname, 'public/assets'),
    },
  };
};
```

### publicPath

配置 webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性。

```js
module.exports = (context) => {
  return {
    output: {
      path: path.resolve(__dirname, 'public/assets'),
      publicPath: 'https://cdn.example.com/assets/',
    },
  };
};
```

### definePlugin

[官方文档](https://webpack.js.org/plugins/define-plugin/)

通过 webpack 的 DefinePlugin 可以配置全局的变量，针对开发环境和发布环境的构建配置不同的行为非常有用。

比如需要在代码里使用当前仓库的版本号：

```js
const webpack = require('webpack');

module.exports = (context) => {
  return {
    plugins: [
      new webpack.DefinePlugin({
        // 此处不能省略 JSON.stringify，否则构建过程会出现语法问题
        ASSETS_VERSION: JSON.stringify(''),
      }),
    ],
  };
};
```

在代码里使用该变量（当做全局变量使用）：

```javascript
console.log(ASSETS_VERSION);
```

### externals

配置 webpack 的 [externals](https://webpack.js.org/configuration/externals/) 属性。
比如：

```js
// 配置 react 和 react-dom 不进行构建
module.exports = (context) => {
  return {
    externals: {
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
  };
};
```

### alias

配置 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 属性，创建 import 或 require 的别名，来确保模块的引用变得更简单

```javascript
const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
};
```

现在，替换「在导入时使用相对路径」这种方式，就像这样：

```js
import Utility from '../../utilities/utility';
```

你可以这样使用别名：

```js
import Utility from 'Utilities/utility';
```

## 环境变量

### ice dev

可通过环境变量配置一些参数，包括：

```bash
$ ice dev --help

Usage: ice-dev [options]

Options:
  -p, --port <port>      服务端口号
  -h, --host <host>      服务主机名
  --https                开启 https
  --analyzer             开启构建分析
  --analyzer-port        设置分析端口号
  --disabled-reload      关闭 hot reload
  --project-type <type>  项目类型, node|web (default: "web")
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime (default: "polyfill")
```

比如使用 3000 端口启动 dev server，

```bash
$ ice dev -p=3000
```

比如开启 https

```bash
$ ice dev --https
```

### ice build

可通过环境变量配置一些参数，包括：

```plain
$ ice build --help

Usage: ice-dev [options]

Options:
  --debug                debug 模式下不压缩
  --hash                 构建后的资源带 hash 版本
  --project-type <type>  项目类型, node|web (default: "web")
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime (default: "polyfill")
```

## 其他

### Mock

ice dev 支持 mock 功能，在项目根目录的 `mock/index.js` 中进行配置，支持基于 require 动态分析的实时刷新，支持 ES6 语法，以及友好的出错提示：

```js
export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    res.end('OK');
  },
};
```

### 使用 public 目录

我们约定 public 目录下的文件会在 dev 和 build 时被自动 copy 到输出目录（默认是 ./build）下。所以可以在这里存放
favicon, index.html 等。
