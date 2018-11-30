---
title: 一行文字用法
order: 1
importStyle: true
---

本 Demo 演示一行文字的用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IceEllipsis from '@icedesign/ellipsis';


class App extends Component {

  render() {

    const style = {
      width: '200px'
    };

    return (
      <div style={style}>
        <IceEllipsis lineNumber={1} text="这是一串非常长的文字的长长长长长长长长这是一串非常长的文字的长长长长长长长长" />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
