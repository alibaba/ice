---
title: shape 形状用法
order: 4
importStyle: true
---

本 Demo 演示 shape 形状的用法。

shape 默认为 rounded
sharp 无圆角
circle 圆形

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Img from '@icedesign/img';


class App extends Component {

  state = {

  }

  render() {
    return (
      <div>
        <h1>cover 模式下展示</h1>
        <Img
          enableAliCDNSuffix={true}
          width={200}
          height={200}
          src="//img.alicdn.com/tfs/TB1K..3PpXXXXa4XFXXXXXXXXXX-311-199.png"
          type="cover"
          shape="circle"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <Img
          enableAliCDNSuffix={true}
          width={300}
          height={200}
          src="//img.alicdn.com/tfs/TB1oPNcPFXXXXXQXpXXXXXXXXXX-341-202.png"
          type="cover"
          shape="sharp"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <Img
          enableAliCDNSuffix={true}
          width={300}
          height={200}
          src="//img.alicdn.com/tfs/TB1oPNcPFXXXXXQXpXXXXXXXXXX-341-202.png"
          type="cover"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />

        <h1>contain 模式下展示</h1>

        <Img
          enableAliCDNSuffix={true}
          width={300}
          height={200}
          src="//img.alicdn.com/tfs/TB1A2c4PpXXXXaiXFXXXXXXXXXX-274-201.png"
          type="contain"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <Img
          enableAliCDNSuffix={true}
          width={350}
          height={200}
          src="//img.alicdn.com/tfs/TB17wwYPpXXXXXHXVXXXXXXXXXX-297-199.png"
          type="contain"
          shape="sharp"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <Img
          enableAliCDNSuffix={true}
          width={200}
          height={200}
          src="//img.alicdn.com/tfs/TB17wwYPpXXXXXHXVXXXXXXXXXX-297-199.png"
          type="contain"
          shape="circle"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
