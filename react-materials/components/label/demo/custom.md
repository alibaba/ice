---
title: 自定义的用法
order: 3
importStyle: true
---

本 Demo 演示自定义背景和文字颜色用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IceLabel from '@icedesign/label';
import {Button} from '@alifd/next';

class App extends Component {
  render() {
    return (
    <div>
      <div style={{marginTop: '10px'}}>
        <IceLabel style={{backgroundColor: '#fdd8e7', color: '#f5317f'}}>粉色</IceLabel>
        <IceLabel style={{backgroundColor: '#fcdbd9', color: '#f04134'}}>红色</IceLabel>
        <IceLabel style={{backgroundColor: '#fde3cf', color: '#f56a00'}}>橘色</IceLabel>
        <IceLabel style={{backgroundColor: '#cfefdf', color: '#00a854'}}>绿色</IceLabel>
        <IceLabel style={{backgroundColor: '#cfedf0', color: '#00a2ae'}}>青色</IceLabel>
        <IceLabel style={{backgroundColor: '#d2eafb', color: '#108ee9'}}>蓝色</IceLabel>
        <IceLabel style={{backgroundColor: '#e4e2fa', color: '#7265e6'}}>紫色</IceLabel>
      </div>
      <div style={{marginTop: '10px'}}>
        <IceLabel style={{backgroundColor: '#f5317f'}}>粉色</IceLabel>
        <IceLabel style={{backgroundColor: '#f04134'}}>红色</IceLabel>
        <IceLabel style={{backgroundColor: '#f56a00'}}>橘色</IceLabel>
        <IceLabel style={{backgroundColor: '#00a854'}}>绿色</IceLabel>
        <IceLabel style={{backgroundColor: '#00a2ae'}}>青色</IceLabel>
        <IceLabel style={{backgroundColor: '#108ee9'}}>蓝色</IceLabel>
        <IceLabel style={{backgroundColor: '#7265e6'}}>紫色</IceLabel>
      </div>
    </div>
  );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
