import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import TableHead from './TableHead';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      department: '淘宝',
      name: '淘小宝',
      yearBudget: `678,89${index}`,
      appendBudget: `${index + 1}23,456`,
      distributionRate: `88.8${index}%`,
      uesed: `123,45${index}`,
      usagRate: `99.0${index}%`,
    };
  });
};

export default class Calculate extends Component {
  static displayName = 'Calculate';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  onChange = (selectedItems) => {
    console.log('onChange callback', selectedItems);
  };

  renderOper = () => {
    return (
      <div>
        <a style={styles.link}>修改预算</a>
        <span style={styles.separator} />
        <a style={styles.link}>查看详情</a>
      </div>
    );
  };

  render() {
    const dataSource = getData();
    const { current } = this.state;

    return (
      <div style={styles.container}>
        <TableHead />
        <Table dataSource={dataSource} hasBorder={false}>
          <Table.Column title="部门名称" dataIndex="department" />
          <Table.Column title="接口人" dataIndex="name" />
          <Table.Column title="财年预算(万元)" dataIndex="yearBudget" />
          <Table.Column title="追加预算(万元)" dataIndex="appendBudget" />
          <Table.Column title="分配率(%)" dataIndex="distributionRate" />
          <Table.Column title="已使用(KCU)" dataIndex="uesed" />
          <Table.Column title="使用率(%)" dataIndex="usagRate" />
          <Table.Column title="操作" cell={this.renderOper} />
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
  container: {
    margin: '10px 0',
  },
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    width: '1px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
