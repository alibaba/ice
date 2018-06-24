---
title: 更新图片
order: 5
importStyle: true
---

本 Demo 演示最基础的用法。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Img from '@icedesign/img';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: 'https://img.alicdn.com/tfs/TB1AI2vteOSBuNjy0FdXXbDnVXa-680-192.png',
      size: 230,
    };

    setTimeout(() => {
      console.log('sakldfa');
      this.setState({
        src:
          'https://img.alicdn.com/tfs/TB1AdOerVOWBuNjy0FiXXXFxVXa-499-498.png',
        size: 100,
      });
    }, 1000);
  }

  render() {
    console.log(this.state.src);
    return (
      <div className="app">
        <Img
          width={this.state.size}
          height={this.state.size}
          type="contain"
          src={this.state.src}
        />
      </div>
    );
  }
}

const styles = {
  btn: {
    marginTop: '5px',
  },
};

// mountNode 为 Playground 预置节点
ReactDOM.render(<Demo />, mountNode);
```
