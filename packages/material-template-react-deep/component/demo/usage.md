---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import { ConfigProvider } from '@alifd/next';
import <%= className %> from '@ali/deep-<%= npmName %>';
import '@alife/theme-97/dist/next.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: 'desktop'
    }
  }
  handleResize = () => {
    const width = document.documentElement.offsetWidth;
    const { device } = this.state;
    let realDevice = width < 480 ? 'phone' : width > 1024 ? 'desktop' : 'tablet';
    if (realDevice !== device) {
      this.setState({
        device: realDevice
      });
    }
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize, false)
    fixDevice();
  }
  render() {
    return (
      <div className='my-container'>
        <ConfigProvider device={this.state.device}>
          <<%= className %> />
        </ConfigProvider>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);

function fixDevice() {
  const ua = navigator.userAgent
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  if (!android && !iphone && !ipad) {
    return
  }
  const head = document.getElementsByTagName('head')[0]
  const meta = document.createElement('meta')
  const container = document.querySelector('.container')
  const myContainer = document.querySelector('.my-container')
  meta.content = 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,shrink-to-fit=no,user-scalable=no'
  meta.name = 'viewport';
  head.appendChild(meta);
  document.body.appendChild(myContainer)
  container.parentNode.removeChild(container)
}
````
