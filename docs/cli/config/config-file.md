---
title: ice.config.js
order: 1
---

ice-scripts 将 `ice.config.js` 作为项目的配置文件，文件需要存放在项目根目录（和 `package.json` 同级），如果不存在这个文件项目将使用默认配置。

配置文件内容如下：

```js
// ice.config.js
module.exports = {
  // 基础配置项
  entry: 'src/index.js',
  publicPath: './',
  // ...

  // 插件配置
  plugins: [
    ['ice-plugins-fusion', { themePackage: '@icedesign/theme' }],
  ],

  // 自定义 webpack 配置
  chainWebpack: (config) => {
    // 通过 webpack-chain 形式修改 webpack 配置
    config.devServer.hot(true);
  }
}
```

配置文件可以配置的内容，分为以下三类：

* [基本配置项](/docs/cli/basic/config.md)
* [插件配置](/docs/cli/basic/plugins.md)
* [自定义 webpack 配置](/docs/cli/basic/custom-webpack.md)
