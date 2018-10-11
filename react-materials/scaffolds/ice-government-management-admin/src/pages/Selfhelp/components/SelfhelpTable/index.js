import React, { Component } from 'react';
import { Button, Table, Pagination } from '@icedesign/base';
import SearchBar from './SearchBar';

const mockData = [
  {
    number: '沪执77号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }, {
    number: '沪执78号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }, {
    number: '沪执79号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }, {
    number: '沪执80号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }, {
    number: '沪执81号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }, {
    number: '沪执82号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }, {
    number: '沪执83号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }, {
    number: '沪执84号',
    resource: '执行',
    applicant: '孙志茂',
    date: '2018-10-10',
    status: '申请立案'
  }
];

export default class SelfhelpTable extends Component {
  static displayName = 'SelfhelpTable';

  constructor(props) {
    super(props);
    this.state = {
      current: 2
    };
  }

  onPageChange = (current) => {
    this.setState({
      current
    });
  };

  render() {
    const actionRender = () => {
      return (
        <Button size="small" style={styles.button}>
          办理
        </Button>
      );
    };

    return (
      <div style={styles.container}>
        <SearchBar />
        <Table
          dataSource={mockData}
          primaryKey="number"
          style={styles.table}
        >
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
            size="small"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 20px',
    letterSpacing: '2px'
  },
  button: {
    background: 'linear-gradient(90deg, #006fff 25%, #fff 150%)',
    color: 'white',
    margin: '0 8px',
    padding: '0 16px',
    letterSpacing: '2px'
  },
  table: {
    margin: '20px 0'
  },
  pagination: {
    textAlign: 'center',
    marginBottom: '200px'
  }
};
