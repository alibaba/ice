---
title: inverse 的用法
order: 2
importStyle: true
---

本 Demo 演示 inverse 设置为 false (背景色和文字颜色色调一致) 的用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IceLabel from '@icedesign/label';
import {Button} from '@alifd/next';

class App extends Component {
  render() {
    return (
      <div>
        <IceLabel inverse={false} status="default">default</IceLabel>
        <IceLabel inverse={false} status="primary">primary</IceLabel>
        <IceLabel inverse={false} status="success">success</IceLabel>
        <IceLabel inverse={false} status="warning">warning</IceLabel>
        <IceLabel inverse={false} status="info">info</IceLabel>
        <IceLabel inverse={false} status="danger">danger</IceLabel>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
