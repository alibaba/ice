---
title: 用在表格中
order: 2
importStyle: true
---

本 Demo 演示在表格中使用图片。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  Table,
} from '@icedesign/base';
import Img from '@icedesign/img';


class App extends Component {

  state = {

  }

  renderCover = (value, index, record) => {
    let type = 'cover';
    if (index % 3 === 0) {
      type = 'contain';
    }
    return (
      <div>
        <Img
          enableAliCDNSuffix={true}
          width={200}
          height={100}
          src={record.src}
          type={type}
        />
        当前图片模式：{type}
      </div>
    );
  };

  render() {
    return (
      <div>
        <Table
          dataSource={tableData}
        >
            <Table.Column title="封面图" cell={this.renderCover} />
            <Table.Column title="标题" dataIndex="title" />
        </Table>
      </div>
    );
  }
}

const tableData = [{
  src: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg',
  title: '这是一张示例图片这是一张示例图片这是一张示例图片这是一张示例图片',
}, {
  src: 'https://img.alicdn.com/tfs/TB1A8NCLNYaK1RjSZFnXXa80pXa-2580-1032.jpg',
  title: '示例图片2号示例图片2号示例图片2号示例图片2号'
}, {
  src: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg',
  title: '这是一张示例图片这是一张示例图片这是一张示例图片这是一张示例图片',
}, {
  src: 'https://img.alicdn.com/tfs/TB1A8NCLNYaK1RjSZFnXXa80pXa-2580-1032.jpg',
  title: '示例图片2号示例图片2号示例图片2号示例图片2号'
}, {
  src: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg',
  title: '这是一张示例图片这是一张示例图片这是一张示例图片这是一张示例图片',
}, {
  src: 'https://img.alicdn.com/tfs/TB1A8NCLNYaK1RjSZFnXXa80pXa-2580-1032.jpg',
  title: '示例图片2号示例图片2号示例图片2号示例图片2号'
}, {
  src: 'https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg',
  title: '这是一张示例图片这是一张示例图片这是一张示例图片这是一张示例图片',
}, {
  src: 'https://img.alicdn.com/tfs/TB1A8NCLNYaK1RjSZFnXXa80pXa-2580-1032.jpg',
  title: '示例图片2号示例图片2号示例图片2号示例图片2号'
}];

ReactDOM.render((
  <App />
), mountNode);
````
