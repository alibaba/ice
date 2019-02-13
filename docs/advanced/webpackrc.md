---
title: ice-scripts 使用指南
order: 1
category: 进阶指南
---

飞冰项目默认使用 [ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts) 作为开发工具，ice-scripts 提供了丰富的功能帮助我们提高开发效率：

- 命令行工具
- 主题配置
- 代理配置
- 自定义 webpack 配置
- Mock
- ……

本文会讲述 ice-scripts 完整的使用指南。PS: 请保证 ice-scripts 版本为 1.1.0 及以上。

## 命令行工具

ice-scripts 提供了 `dev/build` 的开发命令，如果使用 Iceworks 开发，那么大多数时候你不需要关心这些命令。

### ice dev

启动调试服务

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

构建代码

```plain
$ ice build --help

Usage: ice-build [options]

Options:
  --debug                debug 模式下不压缩
  --hash                 构建后的资源带 hash 版本
  --project-type <type>  项目类型, node|web (default: "web")
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime (default: "polyfill")
```

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

**正常情况下，我们不推荐使用 `.webpackrc.js` 的方式自定义配置，因为这可能给项目的长期维护带来负担。**如有需求可以先反馈给飞冰团队评估是否可以直接内置到 ice-scripts 或者通过 buildConfig 的方式支持。

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

### 修改编译的路径为 dist

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

[详细说明](https://github.com/alibaba/ice/wiki/%E8%AE%BE%E7%BD%AE%E8%B5%84%E6%BA%90%E5%8A%A0%E8%BD%BD%E8%B7%AF%E5%BE%84-publicPath)

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
}
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
favicon, index.html 等。

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

<Button className={styles.btn}>OK</Button>
```

## 主题配置 - themeConfig

参考 [切换项目主题](#/docs/advanced/use-theme)

## 代理配置 - proxyConfig

参考 [Iceworks 插件-代理配置](#/docs/iceworks/plugins-proxy)

