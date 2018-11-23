---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IcePanel from '@icedesign/panel';

class App extends Component {

  render() {
    return (
      <div>
        <IcePanel style={{marginBottom: '10px'}}>
          <IcePanel.Body>
            <p>山中相送罢，日暮掩柴扉。</p>
            <p>春草年年绿，王孙归不归。</p>
          </IcePanel.Body>
        </IcePanel>

        <IcePanel>
          <IcePanel.Header>
            将进酒
          </IcePanel.Header>
          <IcePanel.Body>
            <p>君不见，黄河之水天上来，奔流到海不复回。</p>
            <p>君不见，高堂明镜悲白发，朝如青丝暮成雪。</p>
            <p>人生得意须尽欢，莫使金樽空对月。</p>
            <p>天生我材必有用，千金散尽还复来。</p>
            <p>烹羊宰牛且为乐，会须一饮三百杯。</p>
            <p>岑夫子，丹丘生，将进酒，君莫停。</p>
            <p>与君歌一曲，请君为我侧耳听。</p>
            <p>钟鼓馔玉不足贵，但愿长醉不愿醒。</p>
          </IcePanel.Body>
          <IcePanel.Footer>
            诗仙李白
          </IcePanel.Footer>
        </IcePanel>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
