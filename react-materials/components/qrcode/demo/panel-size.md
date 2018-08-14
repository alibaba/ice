---
title: 二维码展示自定义尺寸
order: 3
importStyle: true
---

`size` 可设置二维码尺寸大小默认为：`128`。

大小直接展示二维码，没有 Hover 的动作过程。尺寸为 `150`

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Qrcode, { Panel } from '@icedesign/qrcode';

ReactDOM.render(<Panel value="https://www.taobao.com" size={150} />, mountNode);
````
