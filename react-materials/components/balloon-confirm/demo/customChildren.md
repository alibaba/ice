---
title: 子元素为自定义组件
order: 2
importStyle: true
---

当子元素为自定义组件时，主动传递上层事件

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
          <DeleteText />
        </BalloonConfirm>
    );
  }
}

class DeleteText extends Component {
  render() {
    return (
      <span 
        {...this.props}
        style={{
          color: '#f00',
        }}
      >
        删除
      </span>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
