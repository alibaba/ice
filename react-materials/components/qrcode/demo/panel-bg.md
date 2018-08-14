---
title: 二维码展示自定义背景颜色
order: 5
importStyle: true
---

直接展示二维码，没有 Hover 的动作过程。

`bgColor` 背景色默认为白色 `#ffffff`，以下展示修改橙色 `#ff4400`。

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Qrcode, { Panel } from '@icedesign/qrcode';

ReactDOM.render(
  <Panel value="https://www.taobao.com" bgColor="#ff4400" />,
  mountNode
);
````
