---
title: 定制构建器
order: 3
category: 进阶指南
---

ICE 的[工程](https://github.com/alibaba/ice/tree/master/tools/ice-scripts)使用了 `webpack` 作为构建的基石，并且提供了零配置的构建配置，但是如果你对 `webpack` 配置有特别的需求，可以参考本文对默认配置进行定制。

## 如何配置

ICE 项目支持在项目根目录创建 `.webpackrc.js` 文件对 `webpack` 项目进行定制和覆盖，`.webpackrc.js` 文件需要导出一个 `webpackConfig` 对象，其支持的参数可以参考 `webpack` [官方文档](https://webpack.js.org/concepts/output/)。

`.webpackrc.js` 文件采用您操作系统中安装的 Node.js 所支持的语法，所以您可以使用除了 `import`, `export` 等之外的几乎所有 ES6 语法。

```js
module.exports = {
  // webpack config
};
```

## 配置举例

1.  修改编译输出的路径为 `dist/`

```js
const { resolve } = require('path');

module.exports = {
  output: {
    path: resolve('dist'),
  },
};
```

2.  添加反向代理服务

```js
const proxyTarget = 'http://127.0.0.1:7001';

module.exports = {
  devServer: {
    proxy: {
      '/**': {
        target: proxyTarget,
        bypass: function(req, res, proxyOpt) {
          // 添加 HTTP Header 标识 proxy 开启
          res.set('X-ICE-PROXY', 'on');
          res.set('X-ICE-PROXY-BY', proxyTarget);
        },
      },
    },
  },
};
```

3.  `webpack` 支持配置多入口实现在一个工程中同时构建多个单页面应用，以下为多 `entry` 的 `.webpackrc.js` 配置示例

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ['src/index.js'],
    app: ['src/index.js'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      chunks: ['index'],
      template: resolve('./public/index.html'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'app',
      chunks: ['app'],
      template: resolve('./public/index.html'),
      filename: 'app.html',
    }),
  ],
  devServer: {
    before(app) {
      app.use(function(req, res, next) {
        // 重定向 html 的请求到 /build/ dev 服务上
        if (req.url === '/' || req.path.endsWith('.html')) {
          req.url = '/build' + req.url;
        }
        next();
      });
    },
  },
};
```
