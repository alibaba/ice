---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IceTitle from '@icedesign/title';


class App extends Component {

  state = {

  }
  
  render() {
    const com = <span>我不是一个简单的标题</span>
    return (
      <div>
        <IceTitle text="简单的标题" />
        <div 
          style={{
            background:'#999',
            color:'#666',
            height:'100px',
            textAlign:'center',
            paddingTop:'40px'
          }}
        >content</div>
        <IceTitle text="简单的标题" subtitle={com}/>
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
