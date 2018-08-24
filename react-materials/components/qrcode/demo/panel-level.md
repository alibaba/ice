---
title: 二维码展示自定义编码等级
order: 6
importStyle: true
---

`level` 二维码中有四种级别的纠错，二维码中有四种级别的纠错。默认为： `L`

| 纠错等级 | 修正率            |
| -------- | ----------------- |
| L 水平   | 7%的字码可被修正  |
| M 水平   | 15%的字码可被修正 |
| Q 水平   | 25%的字码可被修正 |
| H 水平   | 30%的字码可被修正 |

````jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Qrcode, { Panel } from '@icedesign/qrcode';

ReactDOM.render(
  <div>
    <Panel value="https://www.taobao.com" level="L" />
    <hr />
    <Panel value="https://www.taobao.com" level="M" />
    <hr />
    <Panel value="https://www.taobao.com" level="Q" />
    <hr />
    <Panel value="https://www.taobao.com" level="H" />
  </div>,
  mountNode
);
````
