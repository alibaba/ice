---
title: 多行文字指定每行字数用法
order: 2
importStyle: true
---

本 Demo 演示多行文字指定每行字数用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IceEllipsis from '@icedesign/ellipsis';

class App extends Component {

  render() {

    const style = {
      width: '150px'
    };

    return (
      <div style={style}>
        <IceEllipsis showTooltip={true} lineLimit={2} text="一个两个三个四个五个六个七个八个九个十个十一个" />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
