---
title: getMountNode
order: 8
---

根据子应用运行环境，返回子应用加载节点方法。

- 类型：`function`
- 默认返回节点：`<div id="ice-container"></div>`
- 使用规则：方法支持传参，传参代表默认渲染的 DOM 节点。支持 `string | HTMLElement | function`， `string` 表示默认 DOM 节点的 `id`，`function` 支持函数返回值作为默认 DOM 节点。
