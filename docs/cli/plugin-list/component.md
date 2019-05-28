---
title: ice-plugin-component
order: 3
---

`ice-plugin-component` 提供组件开发时的基础能力扩展，本文将详细介绍插件具体用法。

## 功能

- 支持组件模块开发 dev & build
- 支持接入 Fusion Cool & 设计板块的组件构建

## 如何使用

```bash
$ npm i --save-dev ice-plugin-component
```

Options:

- `type`: 默认值 `fusion` ，如无需生成接入 Fusion 相关样式文件，可设置为 `component`

Usage:

```js
module.exports = {
  plugins: [
    ['ice-plugin-component', { type: 'fusion' }]
  ]
}
```

更多组件开发相关内容，详见[业务组件开发规范](/docs/materials/react.md)。