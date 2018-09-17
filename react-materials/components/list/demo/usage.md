---
title: Simple Usage
order: 1
importStyle: true
---

本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from '@icedesign/list';


class App extends Component {

  render() {

    return (
      <div>
        <List />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
