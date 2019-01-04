---
title: 基础用法
order: 1
importStyle: true
---

使用BalloonConfirm生成一个简单的确认弹窗

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BalloonConfirm from '@icedesign/balloon-confirm';
import { Button, Message } from '@alifd/next';


class App extends Component {
  onConfirm = (e) => {
    console.log('ok');
    Message.success('click on ok')
  }

  onCancel = (e) => {
    console.log('cancel');
    Message.error('click on cancel')
  }

  render() {
    return (
        <BalloonConfirm
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          title="真的要删除吗亲"
        >
          <Button>删除</Button>
        </BalloonConfirm>
    );
  }
}

class Test extends Component {
  render() {
    return (
      <div {...this.props}>测试</div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
