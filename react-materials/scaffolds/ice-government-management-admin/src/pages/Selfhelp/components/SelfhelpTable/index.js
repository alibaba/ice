import React, { Component } from 'react';
import { Button, Table, Pagination, Message } from '@alifd/next';
import SearchBar from './SearchBar';

const mockData = [
  {
    number: '浙执77号',
    resource: '执行',
    applicant: '淘小宝',
    date: '2018-10-10',
    status: '申请立案',
  },
  {
    number: '浙执78号',
    resource: '执行',
    applicant: '淘小宝',
    date: '2018-10-10',
    status: '诉前调解',
  },
  {
    number: '浙执79号',
    resource: '执行',
    applicant: '淘小宝',
    date: '2018-10-10',
    status: '诉前调解',
  },
  {
    number: '浙执80号',
    resource: '执行',
    applicant: '淘小宝',
    date: '2018-10-10',
    status: '申请立案',
  },
  {
    number: '浙执81号',
    resource: '执行',
    applicant: '淘小宝',
    date: '2018-10-10',
    status: '申请立案',
  },
];

export default class SelfhelpTable extends Component {
  static displayName = 'SelfhelpTable';

  constructor(props) {
    super(props);
    this.state = {
      current: 2,
    };
  }

  onPageChange = (current) => {
    this.setState({
      current,
    });
  };

  handleClick = () => {
    Message.success('暂不支持办理');
  };

  render() {
    const actionRender = () => {
      return (
        <Button style={styles.button} onClick={this.handleClick}>
          办理
        </Button>
      );
    };

    return (
      <div style={styles.container}>
        <SearchBar />
        <Table dataSource={mockData} primaryKey="number" style={styles.table}>
          <Table.Column align="center" title="案号" dataIndex="number" />
          <Table.Column align="center" title="案件来源" dataIndex="resource" />
          <Table.Column align="center" title="登记人" dataIndex="applicant" />
          <Table.Column align="center" title="收案日期" dataIndex="date" />
          <Table.Column align="center" title="案件状态" dataIndex="status" />
          <Table.Column align="center" title="操作" cell={actionRender} />
        </Table>
        <div style={styles.pagination}>
          <Pagination
            current={this.state.current}
            onChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 20px',
    letterSpacing: '2px',
  },
  button: {
    margin: '0 8px',
    letterSpacing: '2px',
  },
  table: {
    margin: '20px 0',
  },
  pagination: {
    textAlign: 'center',
    marginBottom: '20px',
  },
};
