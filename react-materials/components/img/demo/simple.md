---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from '@alifd/next';
import Img from '@icedesign/img';

class App extends Component {

  state = {
    url1: 'https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png',
    url2: 'https://img.alicdn.com/tps/TB1_AZdNFXXXXbLXVXXXXXXXXXX-500-1063.jpg'
  };

  changeImgs = () => {
    this.setState({
      url1: getImgs(this.state.url1),
      url2: getImgs(this.state.url1)
    });
  };

  render() {
    return (
      <div>
        <h1>cover 模式强调填充铺平</h1>
        <Img
          enableAliCDNSuffix={true}
          width={400}
          height={200}
          src={this.state.url1}
          type="cover"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <Img
          enableAliCDNSuffix={false}
          width={400}
          height={200}
          src={this.state.url2}
          type="cover"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <h1>contain 模式强调信息全部展示</h1>
        <Img
          enableAliCDNSuffix={true}
          width={400}
          height={200}
          src={this.state.url1}
          type="contain"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <Img
          enableAliCDNSuffix={true}
          width={400}
          height={200}
          src={this.state.url2}
          type="contain"
          style={{border: '1px solid #ccc', margin: '10px'}}
        />
        <div>
          <Button type="primary" style={{marginTop: 20}} onClick={this.changeImgs}>切换新图片会重新计算尺寸</Button>
        </div>
      </div>
    );
  }
}

function getImgs(url) {
  if (url === 'https://img.alicdn.com/imgextra/i3/2779138589/TB2_gtLlrBmpuFjSZFuXXaG_XXa_!!2779138589.jpg') {
    return 'https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png';
  }

  return 'https://img.alicdn.com/imgextra/i3/2779138589/TB2_gtLlrBmpuFjSZFuXXaG_XXa_!!2779138589.jpg';
}

ReactDOM.render((
  <App />
), mountNode);
````
