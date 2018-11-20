---
title: 不同 status 状态表现的用法
order: 2
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
      <div style={{width: '400px'}}>
        <IcePanel status="primary" style={{marginBottom: '10px'}}>
          <IcePanel.Header>
            关雎
          </IcePanel.Header>
          <IcePanel.Body>
            <p style={{fontSize: '15px', margin: 0, lineHeight: 1.5, color: '#333'}}>
            参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。
            </p>
          </IcePanel.Body>
        </IcePanel>

        <IcePanel status="success" style={{marginBottom: '10px'}}>
          <IcePanel.Header>
            关雎
          </IcePanel.Header>
          <IcePanel.Body>
            参差荇菜，左右采之。窈窕淑女，琴瑟友之。
          </IcePanel.Body>
        </IcePanel>

        <IcePanel status="info" style={{marginBottom: '10px'}}>
          <IcePanel.Header>
            关雎
          </IcePanel.Header>
          <IcePanel.Body>
            关关雎鸠，在河之洲。窈窕淑女，君子好逑。
          </IcePanel.Body>
        </IcePanel>

        <IcePanel status="warning" style={{marginBottom: '10px'}}>
          <IcePanel.Header>
            关雎
          </IcePanel.Header>
          <IcePanel.Body>
           参差荇菜，左右流之。窈窕淑女，寤寐求之。
          </IcePanel.Body>
        </IcePanel>

        <IcePanel status="danger" style={{marginBottom: '10px'}}>
          <IcePanel.Header>
            关雎
          </IcePanel.Header>
          <IcePanel.Body>
            求之不得，寤寐思服。悠哉悠哉，辗转反侧。
          </IcePanel.Body>
        </IcePanel>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
