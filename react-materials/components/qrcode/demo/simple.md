---
title: 简单的用法
order: 1
importStyle: true
---

展示二维码, 默认左侧浮出, 可设置 `align="right"` 右边浮出.

triggerSize 可选值： `xxs`, `xs`, `small`, `medium`, `large`, `xl`, `xxl`

````jsx
import React from 'react';
import Qrcode from '@icedesign/qrcode';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <div>
      <p>分别演示二维码上下左右展示的效果</p>
      <div style={{ textAlign: 'center' }}>
        <span>左 </span>
        <Qrcode value="http://www.taobao.com" text="手机淘宝扫码查看" />
        &nbsp;&nbsp;
        <span>上 </span>
        <Qrcode
          value="https://alibaba.github.io/ice"
          text="进入 ICE 官网"
          align="top"
        />
        &nbsp;&nbsp;
        <span>下 </span>
        <Qrcode
          value="https://alibaba.github.io/ice"
          text="进入 ICE 官网"
          align="bottom"
        />
        &nbsp;&nbsp;
        <span>右 </span>
        <Qrcode
          value="https://alibaba.github.io/ice"
          text="进入 ICE 官网"
          align="right"
        />
      </div>
    </div>
    <div>
      <p>支持通过 triggerSize props 设置 Icon 大小</p>
      <Qrcode
        triggerSize="xxs"
        value="https://alibaba.github.io/ice"
        text="进入 ICE 官网"
        align="right"
      />
      <br />
      <Qrcode
        triggerSize="xs"
        value="https://alibaba.github.io/ice"
        text="进入 ICE 官网"
        align="right"
      />
      <br />
      <Qrcode
        triggerSize="small"
        value="https://alibaba.github.io/ice"
        text="进入 ICE 官网"
        align="right"
      />
      <br />
      <Qrcode
        triggerSize="medium"
        value="https://alibaba.github.io/ice"
        text="进入 ICE 官网"
        align="right"
      />
      <br />
      <Qrcode
        triggerSize="large"
        value="https://alibaba.github.io/ice"
        text="进入 ICE 官网"
        align="right"
      />
      <br />
      <Qrcode
        triggerSize="xl"
        value="https://alibaba.github.io/ice"
        text="进入 ICE 官网"
        align="right"
      />
      <br />
      <Qrcode
        triggerSize="xxl"
        value="https://alibaba.github.io/ice"
        text="进入 ICE 官网"
        align="right"
      />
      <br />
    </div>
  </div>,
  mountNode
);
````
