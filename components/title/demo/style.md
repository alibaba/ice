---
title: 自定义样式
order: 3
importStyle: true
---

自定义样式的 demo。

````jsx
import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import IceTitle from '@icedesign/title';

class App extends Component {

  state = {

  }

  render() {
    return (
      <div>
        <IceTitle className="custom-class" style={{marginTop: 100}} text="基本信息" />
        <div 
          style={{
            background:'#999',
            color:'#666',
            height:'100px',
            textAlign:'center',
            paddingTop:'40px'
          }}
        >content</div>        
        <IceTitle 
          text="主标题"
          subtitle="副标题"
          decoration={true}
        />
        
        <div 
          style={{
            background:'#999',
            color:'#666',
            height:'100px',
            textAlign:'center',
            paddingTop:'40px'
          }}
        >content</div>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
