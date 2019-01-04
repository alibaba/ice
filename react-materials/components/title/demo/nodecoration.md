---
title: 没有左边竖线的用法
order: 2
importStyle: true
---

没有左边竖线的用法。

````jsx
import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import {Balloon, Icon} from '@alifd/next';
import IceTitle from '@icedesign/title';

class App extends Component {

  state = {

  }

  render() {
    return (
      <div>
        <IceTitle 
            text="主标题"
            subtitle="副标题"
            link="http://www.taobao.com"
            decoration={false}
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
        
 
        <IceTitle 
            text="主标题"
            link="http://www.taobao.com"
            decoration={false}
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
