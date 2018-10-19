---
title: Simple Usage
order: 1
importStyle: true
---

本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RichtextRenderer from '@icedesign/richtext-renderer';


class App extends Component {

  render() {

    return (
      <div>
        <RichtextRenderer
          className="il-richtext"
          html='<p><span style="color:rgb(255, 68, 0);">测</span><span style="font-size:20px;"><span style="color:rgb(255, 68, 0);">试</span></span></p><p></p><p><span style="font-size:20px;"><span style="background-color:rgb(255, 68, 0);">文</span></span><span style="background-color:rgb(255, 68, 0);">本</span></p>'
        />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
