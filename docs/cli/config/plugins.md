---
title: 插件配置
order: 3
---

插件配置由配置文件 `ice.config.js` 中提供的 `plugins` 字段来配置插件列表。

* 类型：`Array`
* 默认值：`[]`

插件数组项每一项代表一个插件，ice-scripts 将按顺序执行插件列表，插件配置形式如下：

```js
// ice.config.js
const icePluginFusion = require('ice-plugin-fusion');

module.exports = {
  plugins: [
    // npm依赖包
    'ice-scripts-plugin-antd',
    // 相对路径
    './plugins/custom-plugin',
    // 插件方法
    icePluginFusion,
  ]
}
```

如果插件包含自定义配置参数，则可以通过数组的形式配置

```js
module.exports = {
  plugins: [
    // 数组第一项为插件，第二项为参数
    ['ice-plugin-fusion', {
       themePackages: []
    }],
  ]
}

```
