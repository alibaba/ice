---
title: getMountNode
order: 8
---

根据子应用运行环境，返回子应用渲染节点

- 类型：`function`
- 默认值：`<div id="ice-container"></div>`
- 使用规则：方法支持传参，传参代表默认渲染的 DOM 节点，默认节点只在子应用单独启动时生效。支持 `string | HTMLElement | function`， `string` 表示默认 DOM 节点的 `id`，`function` 支持函数返回值作为默认 DOM 节点
- 代码示例：

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { getMountNode } from '@ice/stark';

import '@alifd/next/reset.scss';

import App from './App';

ReactDOM.render(<App />, getMountNode());
```
