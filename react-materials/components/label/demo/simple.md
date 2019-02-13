---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IceLabel from '@icedesign/label';
import {Button} from '@alifd/next';

class App extends Component {
  render() {
    return (
      <div style={{marginTop: '10px'}}>
        <IceLabel status="default">默认</IceLabel>
        <IceLabel status="primary">主题</IceLabel>
        <IceLabel status="success">成功</IceLabel>
        <IceLabel status="warning">警示</IceLabel>
        <IceLabel status="info">提示</IceLabel>
        <IceLabel status="danger">危险</IceLabel>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
