---
title: Simple Usage
order: 1
importStyle: true
---

本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {{className}} from '{{npmName}}';


class App extends Component {

  render() {

    return (
      <div>
        <{{className}} />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
