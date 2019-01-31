---
title: 用在表格中
order: 2
importStyle: true
---

本 Demo 演示在表格中使用图片。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Table} from '@alifd/next';
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
  src: 'https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png',
  title: '全场最绿全场最绿全场最绿全场最绿全场最绿全场最绿',
}, {
  src: 'https://img.alicdn.com/tps/TB1_AZdNFXXXXbLXVXXXXXXXXXX-500-1063.jpg',
  title: '妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了'
}, {
  src: 'https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png',
  title: '全场最绿全场最绿全场最绿全场最绿全场最绿全场最绿',
}, {
  src: 'https://img.alicdn.com/tps/TB1_AZdNFXXXXbLXVXXXXXXXXXX-500-1063.jpg',
  title: '妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了'
}, {
  src: 'https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png',
  title: '全场最绿全场最绿全场最绿全场最绿全场最绿全场最绿',
}, {
  src: 'https://img.alicdn.com/tps/TB1_AZdNFXXXXbLXVXXXXXXXXXX-500-1063.jpg',
  title: '妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了'
}, {
  src: 'https://img.alicdn.com/tps/TB1qfWuMVXXXXcEXpXXXXXXXXXX-434-254.png',
  title: '全场最绿全场最绿全场最绿全场最绿全场最绿全场最绿',
}, {
  src: 'https://img.alicdn.com/tps/TB1_AZdNFXXXXbLXVXXXXXXXXXX-500-1063.jpg',
  title: '妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了妹子遇到 bug 了'
}];

ReactDOM.render((
  <App />
), mountNode);
````
