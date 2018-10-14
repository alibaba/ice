---
title: Simple Usage
order: 1
importStyle: true
---

本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Richtext from '@icedesign/richtext';


class App extends Component {

  state = {
    html: '<p><span style="color:rgb(255, 68, 0);">测</span><span style="font-size:20px;"><span style="color:rgb(255, 68, 0);">试</span></span><span style="font-size:20px;"><span style="background-color:rgb(255, 68, 0);">文</span></span><span style="background-color:rgb(255, 68, 0);">本</span></p>'
  }

  render() {
    const {html} = this.state;
    return (
      <div style={{margin: '65px 0 0'}}>
        <Richtext
          value={html}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange = (value) => {
    // console.log(value)
    this.setState({
      html: value
    });
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
