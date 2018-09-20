import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import TableHead from './TableHead';

const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      department: '阿里云',
      name: '淘小宝',
      yearBudget: `12,34${index}`,
      appendBudget: '0',
      distribution: `91,12${index}`,
      distributionRate: `66.1${index}%`,
      uesed: `5,67${index}`,
      usagRate: `33.0${index}`,
    };
  });
};

export default class Memory extends Component {
  static displayName = 'Memory';

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

  onChange = (value) => {
    console.log({ value });
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
          <Table.Column title="部门名称" dataIndex="department" width={100} />
          <Table.Column title="接口人" dataIndex="name" width={150} />
          <Table.Column
            title="财年预算(万元)"
            dataIndex="yearBudget"
            width={100}
          />
          <Table.Column
            title="追加预算(万元)"
            dataIndex="appendBudget"
            width={100}
          />
          <Table.Column title="已分配" dataIndex="distribution" width={100} />
          <Table.Column
            title="分配率(%)"
            dataIndex="distributionRate"
            width={100}
          />
          <Table.Column title="已使用(KCU)" dataIndex="uesed" width={100} />
          <Table.Column title="使用率(%)" dataIndex="usagRate" width={100} />
          <Table.Column title="操作" cell={this.renderOper} width={200} />
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
  tableHead: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
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
