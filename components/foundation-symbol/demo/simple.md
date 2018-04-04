---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FoundationSymbol from 'foundation-symbol';

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        自定义图标集图标：
        <div>
          <FoundationSymbol type="bangzhu" />
        </div>
        <div>
          <FoundationSymbol type="font-size" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
