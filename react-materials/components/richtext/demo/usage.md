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
    html: '<p></p>'
  }

  render() {
    const {html} = this.state;
    return (
      <div>
        <Richtext
          value={html}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange = (value) => {
    this.setState({
      html: value
    });
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
