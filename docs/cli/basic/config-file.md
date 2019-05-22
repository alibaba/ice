---
title: 工程配置文件
order: 1
---

## 配置文件 - ice.config.js

`ice-scripts` 将提供 `ice.config.js` 作为项目的配置文件，文件需要存放在项目根目录（和 `package.json` 同级），如果不存在这个文件项目将使用默认配置。

这个文件应该导出一个对象的Javascript文件：

```js
// ice.config.js
module.exports = {
  // 配置项
}

```

配置是标准的CommonJS模块，你可以做到以下的事情：

* 通过 `require(...)` 导入其它文件或npm包
* 使用JavaScript控制来控制配置项或生成配置

配置文件可以配置的内容，分为以下三类：
* [基本配置项](/doc/cli/basic/config)
* [插件配置](/doc/cli/basic/plugins)
* [自定义webpack配置](/doc/cli/basic/custom-webpack)
