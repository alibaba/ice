---
title: 如何定义全局环境变量
category: 项目开发手册
order: 5
---

# 如何定义全局环境变量

## 步骤 1. 创建 `.webpackrc.js` webpakc 配置文件

在项目根目录下创建 `.webpackrc.js` 如果已存在则跳过。该文件会在项目调试构建时被调用。

## 步骤 2. 通过 `webpack.DefinePlugin` 创建注入变量

```js
const webpack = require('webpack');

module.exports = {
  // 其他配置
  plugins: [
    new webpack.DefinePlugin({
      serverUrl: JSON.stringify('http://0.0.0.1:7001'),
    }),
  ],
};
```

说明： 值必须经过 `JSON.stringify` 转换。

之后重启服务即可在代码中使用 `serverUrl` 变量了。

# 通过环境变量切换

例如执行 `cross-env ENV=dev ice build` 或者 `cross-env ENV=prod ice build`

> 由于修改环境变量各系统存在差异，使用 https://www.npmjs.com/package/cross-env 包来兼容各系统平台
> 请先安装 `cross-env` 后使用

则配置可以写成

```js
const webpack = require('webpack');

module.exports = {
  // 其他配置
  plugins: [
    new webpack.DefinePlugin({
      serverUrl:
        process.env.ENV == 'dev'
          ? JSON.stringify('http://dev.example.com:7001')
          : JSON.stringify('http://www.example.com'),
    }),
  ],
};
```
