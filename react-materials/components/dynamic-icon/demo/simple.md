---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DynamicIcon from 'dynamic-icon';
import { Button } from '@icedesign/base';

const CustomIcon = DynamicIcon.create({
  fontFamily: 'iceicon2',
  prefix: 'ice-icon-stable',
  css: 'https://at.alicdn.com/t/font_107674_7dns782b1jsb57b9.css'
});

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        自定义图标集图标：
        <div>
          <Button type="primary">
            <CustomIcon size="s" type="qrcode" /> 你好世界
          </Button>
        </div>
        <div>
          <CustomIcon type="cascades" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
