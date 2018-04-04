---
title: 测试
order: 4
hide: true
importStyle: true
---

测试用例

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
      <div>
        <h2>超过两行显示两行带 tooltip</h2>
        <div style={style}>
          <IceEllipsis showTooltip={true} lineLimit={2} text="一个两个三个四个五个六个七个八个九个十个十一个" />
        </div>
        <h2>超过两行显示两行</h2>
        <div style={style}>
          <IceEllipsis showTooltip={false} lineLimit={2} text="一个两个三个四个五个六个七个八个九个十个十一个" />
        </div>
        <h2>不足三行显示三行</h2>
        <div style={style}>
          <IceEllipsis showTooltip={false} lineLimit={3} text="一个两个三个四个五个六个七个八个九个十个十一个" />
        </div>
        <h2>不足一行显示三行</h2>
        <div style={style}>
          <IceEllipsis showTooltip={false} lineLimit={3} text="一个两个三个" />
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
