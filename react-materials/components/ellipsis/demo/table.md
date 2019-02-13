---
title: 用在表格中
order: 3
importStyle: true
---

用在表格中的 demo。

需要注意，在不支持 WebkitLineClamp 属性下，显示省略号通过计算每行文字数量实现裁切。此时以中文宽度为准，如果文字带有英文，则会导致行数减少的问题。但不会超出行数，这是我们的目的。

````jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Table } from '@alifd/next';
import IceEllipsis from '@icedesign/ellipsis';

const getData = () =>{
  let result = [];
  for(let i = 0; i< 5; i++){
    let title = `总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长`;
    if (i % 2) {
      title = `Quotation for 1PCS Nano 5.0 controller compatible+++++ 总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长总之这段文字很长很长很长`;
    }
    result.push({
        title: title,
        id:`这是一段很长的文字，但是只显示一行这是一段很长的文字，但是只显示一行这是一段很长的文字，但是只显示一行这是一段很长的文字，但是只显示一行`,
        time: 2000 + i
      })
  }
  return result;
};
const render= (value, index, record) => {
  return <IceEllipsis lineLimit={3} text={record.title} />;
};
const renderId = (value, index, record) => {
  return <IceEllipsis lineLimit={1} text={record.id} showTooltip={true} />;
};

class App extends Component {

  state = {
    dataSource: getData()
  }

  render() {
    return (
      <div>
        <Table
          dataSource={this.state.dataSource}
        >
            <Table.Column title="Id" cell={renderId} />
            <Table.Column title="Title" cell={render} />
            <Table.Column title="Time" dataIndex="time"/>
        </Table>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
