import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      application: '淘宝',
      leader: '淘小宝',
      developer: '淘小宝',
      computationalCost: `1${index}`,
      score: `8${index}`,
      task: `12,345${index}`,
      quantity: `3.2${index}`,
      storageCost: '123',
      storage: `109.${index}`,
      storageRate: `71.${index}`,
      totalCost: `32,45${index}`,
      question: `5${index}`,
    };
  });
};

export default class ApplicationTable extends Component {
  static displayName = 'ApplicationTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  // 分页器回调
  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  render() {
    const dataSource = getData();
    const { current } = this.state;

    return (
      <div>
        <Table
          dataSource={dataSource}
          hasBorder={false}
          style={{ padding: '20px' }}
        >
          <Table.Column title="应用" dataIndex="application" />
          <Table.Column title="技术负责人" dataIndex="leader" />
          <Table.Column title="开发人员" dataIndex="developer" />
          <Table.Column title="计算费用(万元)" dataIndex="computationalCost" />
          <Table.Column title="计算分" dataIndex="score" />
          <Table.Column title="任务数量" dataIndex="task" />
          <Table.Column title="计算量(KCU)" dataIndex="quantity" />
          <Table.Column title="存储费用(万元)" dataIndex="storageCost" />
          <Table.Column title="存储量(PB)" dataIndex="storage" />
          <Table.Column title="存储使用率(%)" dataIndex="storageRate" />
          <Table.Column title="总费用(万元)" dataIndex="totalCost" />
          <Table.Column title="问题优化" dataIndex="question" />
        </Table>
        <Pagination
          style={styles.pagination}
          current={current}
          onChange={this.handlePaginationChange}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px',
    textAlign: 'right',
  },
};
