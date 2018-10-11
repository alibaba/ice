import React, { Component } from 'react';
import { Button, Table, Pagination } from '@icedesign/base';

const mockData = [
  {
    number: '沪执77号',
    date: '2018-10-10',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    holder: '毛泽宇',
    license: '余65天',
  }, {
    number: '沪执77号',
    date: '2018-10-10',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    holder: '毛泽宇',
    license: '余65天',
  }, {
    number: '沪执77号',
    date: '2018-10-10',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    holder: '毛泽宇',
    license: '余65天',
  }, {
    number: '沪执77号',
    date: '2018-10-10',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    holder: '毛泽宇',
    license: '余65天',
  }, {
    number: '沪执77号',
    date: '2018-10-10',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    holder: '毛泽宇',
    license: '余65天',
  }, {
    number: '沪执77号',
    date: '2018-10-10',
    applicant: '农商银行',
    execution: '上海摩乐服务咨询有限公司',
    holder: '毛泽宇',
    license: '余65天',
  }
];

export default class ListTable extends Component {
  static displayName = 'ListTable';

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
        <Table
          dataSource={mockData}
          primaryKey="number"
          style={styles.table}
        >
          <Table.Column align="center" title="案号" dataIndex="number" />
          <Table.Column align="center" title="立案日期" dataIndex="date" />
          <Table.Column align="center" title="申请人" dataIndex="applicant" />
          <Table.Column align="center" title="被执行人" dataIndex="execution" />
          <Table.Column align="center" title="承办人" dataIndex="holder" />
          <Table.Column align="center" title="法定执照" dataIndex="license" />
          <Table.Column align="center" title="简易/普通" dataIndex="difficulty" />
          <Table.Column align="center" title="备注" dataIndex="remark" />
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
