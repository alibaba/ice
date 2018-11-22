---
title: 图片加载失败
order: 3
importStyle: true
---

图片加载失败的处理方法。

````jsx
import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import Img from '@icedesign/img';

class App extends Component {

  state = {
    imgSrc: 'https://im---g.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png'
  }

  handleImgError = () => {
    // 你可以额外添加一些容错处理业务逻辑
    // console.log('图片报错啦！日志记录下');
    this.setState({
      imgSrc: 'https://img.alicdn.com/tps/TB11W.WOXXXXXcbaXXXXXXXXXXX-496-310.png'
    });
  };

  render() {
    return (
      <div>
        <h1>图片加载失败可以监听 onError 事件，并改变 State 实现</h1>
        <p>用于对图片加载失败做更多业务逻辑处理</p>
        <Img
          enableAliCDNSuffix={true}
          width={400}
          height={200}
          onError={this.handleImgError}
          src={this.state.imgSrc}
          type="cover"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <h1>或者通过设置 errorImgSrc props 会自动在出错的时候替换掉</h1>
        <Img
          enableAliCDNSuffix={true}
          width={400}
          height={200}
          errorImgSrc="https://img.alicdn.com/tps/TB11W.WOXXXXXcbaXXXXXXXXXXX-496-310.png"
          src="https://im---g.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png"
          type="cover"
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
