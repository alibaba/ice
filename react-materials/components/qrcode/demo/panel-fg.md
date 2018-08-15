---
title: 二维码展示自定义颜色
order: 4
importStyle: true
---

直接展示二维码，没有 Hover 的动作过程。颜色为红色。

`fgColor` 前景色默认为黑色，以下展示修改橙色 `#ff4400`。

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Qrcode, { Panel } from '@icedesign/qrcode';

ReactDOM.render(
  <Panel value="https://www.taobao.com" fgColor="#ff4400" />,
  mountNode
);
````
