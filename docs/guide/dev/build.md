---
title: 工程方案
order: 9
---

飞冰（ICE）推荐使用 [ice-scripts](/docs/cli/about.md) 作为 React 链路的工程工具。

## 快速开始

安装 `ice-scripts` 依赖

```bash
$ npm install ice-scripts --save-dev
```

`package.json` 中添加开发和构建的脚本

```json
{
  "scripts": {
    "start": "ice-scripts dev",
    "build": "ice-scripts build"
  }
}
```

项目根目录下执行 `npm start` 调试开发，开启调试服务后，默认可以访问 `http://localhost:4444` 进行页面预览。修改源码内容后将自动刷新页面。
执行 `npm run build` 进行项目构建，构建产物默认输出到 `./build` 目录下。

## 工程配置

`ice-scripts` 提供一套内置的配置，满足大多数项目开发需求。如果项目工程存在定制需求，可以在项目根目录下创建 `ice.config.js`。

```js
const path = require('path');

module.exports = {
  // 指定 entry 入口文件
  entry: 'src/index.js',
  // 配置 webpack 的 output.publicPath 属性
  publicPath: './',
  alias: {
    // 配置 alias，解决项目模块引用相对路径过长问题
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [
    // 添加 ice-plugins-fusion 支持 fusion 体系下主题定制 / 多主题等能力
    ['ice-plugins-fusion', { themePackage: '@icedesign/theme' }],
  ],
  chainWebpack: (config) => {
    // 通过 webpack-chain 自定义 webpack 配置
    config.devServer.hot(true);
  }
}
```

更多配置相关信息，参考 [ice-scripts 配置指南](/docs/cli/config/config-file.md)。

## 项目配置

### jsconfig.json

如果项目开发是 Javascript 项目，推荐在项目根目录下创建 `jsconfig.json`。

配合 `ice-scripts` 工程配置文件中设置 `alias` 中设置的 `@` 来解决模块引用提示问题。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

通过上述的配置来指定 `@/` 引用相对于 `baseUrl` 的路径映射，可以快速定位引用模块，从而提升项目开发的体验。
