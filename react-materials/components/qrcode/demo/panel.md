---
title: 独立二维码
order: 2
importStyle: true
---

直接展示二维码，没有 Hover 的动作过程。

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Qrcode, { Panel } from '@icedesign/qrcode';

ReactDOM.render(
  <Panel value="https://www.taobao.com" text="使用手机淘宝扫码查看" />,
  mountNode
);
````
