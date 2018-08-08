---
title: 如何配置模块引用别名
category: 项目开发手册
order: 3
---

# 如何配置模块引用别名

## 步骤 1. 创建 `.webpackrc.js` webpakc 配置文件

在项目根目录下创建 `.webpackrc.js` 如果已存在则跳过。该文件会在项目调试构建时被调用。

## 步骤 2. 通过 `webpack.DefinePlugin` 创建注入变量

```js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // 其他配置
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
};
```

重启服务后生效
