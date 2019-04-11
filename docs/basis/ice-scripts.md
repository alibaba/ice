---
title: ice-scripts 使用指南
order: 1
---

[ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 是飞冰（ICE）React 链路的工程工具，类似 Vue CLI 之于 Vue 的关系。ice-scripts 提供了丰富的功能帮助我们开发 React 项目：

- 完善的命令行工具
- 支持项目/业务组件/区块的开发&构建
- 基于 Fusion 体系的主题配置
- 完善的自定义 webpack 配置
- ……

本文会讲述 ice-scripts 完整的使用指南。

## 安装

```bash
$ npm i -g ice-scripts
$ ice --help
```

当然你也可以将其作为项目级依赖：`npm i --save-dev ice-scripts`

## 命令行能力

ice-scripts 提供了 `init/dev/build` 的开发命令，如果使用 Iceworks 开发，那么大多数时候你不需要关心这些命令。

### ice init

根据模板初始化项目：

```bash
$ ice init --help

Usage: ice-init [options]

Options:

  -s, --scaffold         模板 npm 包名，可不传
  -h, --help             output usage information
```

### ice dev

启动调试服务：

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

比如使用 3000 端口启动 dev server

```bash
$ ice dev -p=3000
# 或者
$ npm run start -- -p=3000
```

比如开启 https

```bash
$ ice dev --https
```

### ice build

构建项目代码

```plain
$ ice build --help

Usage: ice-build [options]

Options:
  --debug                debug 模式下不压缩
  --hash                 构建后的资源带 hash 版本
  --sourcemap <type>     构建后的资源带 sourcemap 文件
  --project-type <type>  项目类型, node|nodejs|web
  -s, --skip-install     跳过安装依赖
  --skip-demo            跳过构建 build/index.html 的环节
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime
  -h, --help             output usage information
```

## 构建配置 - buildConfig

除了提供主题配置和代理配置之外， ice-scripts 还提供了一些常用的构建配置项，方便开发者快速自定义配置，在 package.json 中新增 bulidConfig 字段，包含以下配置项：

### 配置项

#### 配置多 entry

默认会以 `src/index.js` 文件作为入口文件，配置在项目的 package.json 的 `buildConfig` 字段中，如果你需要改变默认的入口文件，可以自行修改即可生效。

```js
"buildConfig": {
  "entry": "src/index.js"
}
```

如果你的项目是多页应用，希望把 `src/pages` 的文件作为入口，那么可以这样配置：

```js
"buildConfig": {
  "entry": {
     "dashboard": "src/pages/dashboard/index.js",
     "about": "src/pages/about/index.js"
  }
}
```

多 entry 的情况构建时会额外生成 vendor.js/css，需要自行在 html 里引入（public 目录会自动引入），也可以通过下面的 `buildConfig.disableVendor` 禁止生成 vendor 文件。

如果没有配置 entry 字段，ice-scripts 会将 `src/pages/*/index.js` 作为 entry，每个 page 都会作为一个 entry。

### babelPluginImportConfig

[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import) 用于支持一些 UI 组件包的按需加载以及样式自动引入，ice-scripts 默认支持了 `@icedesign/base` 和 `@alifd/next`，如果有其他需求可以使用该配置，比如 `antd`:

```js
"buildConfig": {
  "babelPluginImportConfig": {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": true
  }

  // 或者多个 UI 组件的话也可以用数组的方式
  "babelPluginImportConfig": [{}, {}]
}
```

### uniteBaseComponent

> 社区用户无需关心该问题

如果项目里依赖了多个不同名称的基础包，可以通过 `uniteBaseComponent` 来统一基础包，减少重复的代码:

```js
"buildConfig": {
  "uniteBaseComponent": "@alife/next"
}
```

如上所示，项目需要保证依赖了当前配置的这个 npm 包，这样不同名的基础包都会重定向到配置的基础包，减少 bundle 的大小。

### 修改构建后的文件目录

```js
"buildConfig": {
  "output": {
    "path": "dist"
  }
}
```

### 修改构建后的 css/js 文件目录

默认情况下 css 在 `build/css/` 下，js 在 `build/js/` 下，可以通过 `outputAssetsPath` 配置修改：

```js
"buildConfig": {
  "outputAssetsPath": {
    // 示例1：修改为 build/css-dist/ build/js-dist/
    "css": "css-dist",
    "js": "js-dist",
    // 示例2：js 和 css 都直接放在 build/ 下
    "css": "",
    "js": ""
  }
}
```

### 修改 externals

```js
"buildConfig": {
  "externals": {
    "jquery": "window.$"
  }
}
```

另外，ice-scripts 会根据 `public/*.html` 里是否通过 script 标签引入了 React 来推导是否需要生成 React 相关的 externals，这个 externals 会跟用户配置直接 merge：

```json
{
  "react": "window.React",
  "react-dom": "window.ReactDOM"
}
```

### css 中的网络资源本地化

有些组件会依赖一些字体文件，通常都是以 url 的方式引入，比如 `https://i.alicdn.com/artascope-font/20160419204543/font/roboto-regular.woff2`，如果因为一些特殊原因无法访问这些资源，可以通过 `localization` 将这些资源本地化：

```json
{
  "buildConfig": {
    "localization": true
  }
}
```

配置后类似资源都会被提取到本地 `build/` 目录里。

### 禁用生成 vendor

在多 entry 的情况下，构建时除了每个 entry 会生成一个 bundle 文件外，同时会根据依赖生成 vendor.css&vendor.js，如果不需要生成这个文件，可以通过下面的方式配置：

```js
"buildConfig": {
  "disableVendor": true
}
```

### babelExclude

> 不推荐使用

babel-loader 有一个 exclude 的配置，用于过滤某些目录下的文件不需要经过 babel 编译，按照前端社区的规范三方 npm 包的代码都应该经过 babel 编译，因此大多数工程（包括 ice-scripts）都会将该字段设置为 `node_modules`，用于加快构建的速度。如果你用到了某个未经 babel 编译的包，我们首先推荐你看下是否有其他选择，实在没有选择的话可以通过这个配置支持：

```js
"buildConfig": {
  // 配置特定包要经过 babel 编译
  // 该字符串会经过 new RegExp() 转换为正则然后传递给 babel-loader
  // 不同的 npm client 的路径可能有差异，请按照具体路径书写正则
  "babelExclude": "node_modules\\/(?!_@ali_lib-ucc)"
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

以下为一些常见的自定义需求：

### 修改 publicPath

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

[详细说明](https://www.yuque.com/ice-team/wiki/euzk0b)

### 使用 DefinePlugin

[官方文档](https://webpack.js.org/plugins/define-plugin/)

通过 webpack 的 DefinePlugin 可以配置全局的变量，针对开发环境和发布环境的构建配置不同的行为非常有用。

比如需要在代码里使用当前仓库的版本号：

```js
module.exports = (context) => {
  const { webpack } = context;
  return {
    plugins: [
      new webpack.DefinePlugin({
        // 此处不能省略 JSON.stringify，否则构建过程会出现语法问题
        ASSETS_VERSION: JSON.stringify('0.0.1'),
      }),
    ],
  };
};
```

在代码里使用该变量（当做全局变量使用）：

```javascript
console.log(ASSETS_VERSION);
```

### alias

配置 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 属性，创建 import 或 require 的别名，来确保模块的引用变得更简单

```javascript
const path = require('path');

module.exports = () => {
  return {
    //...
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
      },
    },
  };
};
```

现在，替换「在导入时使用相对路径」这种方式，就像这样：

```diff
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@components/CustomTips';
```

### Mock

ice-scripts 支持 mock 功能，在项目根目录的 `mock/index.js` 中进行配置，支持基于 require 动态分析的实时刷新，支持 ES6 语法，以及友好的出错提示：

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

## 使用 public 目录

我们约定 public 目录下的文件会在 dev 和 build 时被自动 copy 到输出目录（默认是 ./build）下。所以可以在这里存放
favicon, index.html 等静态文件。

## CSS Modules

[CSS Modules](https://github.com/css-modules/css-modules) 可以有效解决样式的冲突等问题，ice-scripts 支持 CSS Modules 能力。只需要将样式文件的后缀名改为 `.module.[css/scss/less]`，即可使用 CSS Modules 的能力：

```css
/* index.module.scss */
.btn {
  color: green;
}

.tips {
  font-size: 12px;
}
```

```js
// index.js
import styles from './index.module.scss';

<Button className={styles.btn}>OK</Button>;
```

## Moment.js 按需加载

基础组件 `@alifd/next` 里的时间相关组件依赖了 moment，但是为了业务可以优化 moment 的包大小，所以 `@alifd/next` 里将 moment 作为自己的 peerDependencies 而非 dependencies，因此项目使用到时间组件时需要自行引入 moment 依赖：

```bash
$ npm install moment --save
```

moment 里有针对国际化语言的大量代码，如果不做任何处理的话会导致 bundle 变大，因此 ice-scripts 默认对 moment 文案做了按需加载，只有通过 `import 'moment/locale/zh-cn.js'` 才会引入对应文案代码，比如如果想支持中文需要在项目入口文件里引入中文的语言文件：

```
// index.js
import 'moment/locale/zh-cn.js';
```

## 主题配置 - themeConfig

参考 [切换项目主题](#/docs/advanced/use-theme)

## 代理配置 - proxyConfig

参考 [Iceworks 插件-代理配置](#/docs/iceworks/plugins-proxy)
