---
title: ice.config.js
order: 1
---

ice-scripts 将 `ice.config.js` 作为项目的配置文件，文件需要存放在项目根目录（和 `package.json` 同级），如果不存在这个文件项目将使用默认配置。

配置文件内容如下：

```js
// ice.config.js
const path = require('path');

module.exports = {
  // 1. 基础配置项
  entry: 'src/index.js',
  publicPath: './',
  alias: {
    '@components': path.resolve(__dirname, 'src/components/')
  },
  // ...

  // 2. 插件配置
  plugins: [
    ['ice-plugins-fusion', { themePackage: '@icedesign/theme' }],
  ],

  // 3. 自定义 webpack 配置
  chainWebpack: (config) => {
    // 通过 webpack-chain 形式修改 webpack 配置
    config.devServer.hot(true);
  }
}
```

配置文件可以配置的内容，分为以下三类：

* [基本配置项](/docs/cli/config/config.md)
* [插件配置](/docs/cli/config/plugins.md)
* [自定义 webpack 配置](/docs/cli/config/custom-webpack.md)
