import React, { Component } from 'react';
import { Button, Table, Pagination } from '@icedesign/base';

const mockData = [
  {
    number: '沪执77号',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    department: '执行局',
    holder: '毛泽宇',
    status: '办理中'
  }, {
    number: '沪执78号',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    department: '执行局',
    holder: '毛泽宇',
    status: '办理中'
  }, {
    number: '沪执79号',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    department: '执行局',
    holder: '毛泽宇',
    status: '办理中'
  }, {
    number: '沪执80号',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    department: '执行局',
    holder: '毛泽宇',
    status: '办理中'
  }, {
    number: '沪执81号',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    department: '执行局',
    holder: '毛泽宇',
    status: '办理中'
  }, {
    number: '沪执82号',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    department: '执行局',
    holder: '毛泽宇',
    status: '办理中'
  }
];

export default class AllocationTable extends Component {
  static displayName = 'AllocationTable';

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
          分配账号
        </Button>
      );
    };

    return (
      <div style={styles.container}>
        <Table
          dataSource={mockData}
          primaryKey="number"
          style={styles.table}
        >
          <Table.Column align="center" title="案号" dataIndex="number" />
          <Table.Column align="center" title="申请人" dataIndex="applicant" />
          <Table.Column align="center" title="被执行人" dataIndex="execution" />
          <Table.Column align="center" title="承办部门" dataIndex="department" />
          <Table.Column align="center" title="承办人" dataIndex="holder" />
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
