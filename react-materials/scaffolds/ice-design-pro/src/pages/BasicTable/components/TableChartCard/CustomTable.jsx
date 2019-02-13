import React, { Component } from 'react';
import { Table } from '@alifd/next';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      rank: `${index + 1}`,
      developer: '淘小宝',
      cost: `123${index}`,
      score: `8${index}.${index}`,
    };
  });
};

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const dataSource = getData();

    return (
      <Table dataSource={dataSource} hasBorder={false}>
        <Table.Column title="排名" dataIndex="rank" />
        <Table.Column title="开发者" dataIndex="developer" />
        <Table.Column title="计算费用" dataIndex="cost" />
        <Table.Column title="健康分" dataIndex="score" />
      </Table>
    );
  }
}
