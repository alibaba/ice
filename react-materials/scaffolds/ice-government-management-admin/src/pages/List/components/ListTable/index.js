import React, { Component } from 'react';
import { Button, Table, Pagination } from '@icedesign/base';

const mockData = [
  {
    number: '浙执77号',
    date: '2017-10-16',
    applicant: '淘小宝',
    execution: '某某公司',
    holder: '淘小宝',
    license: '余70天',
  },
  {
    number: '浙执78号',
    date: '2017-10-16',
    applicant: '淘小宝',
    execution: '某某公司',
    holder: '淘小宝',
    license: '余65天',
  },
  {
    number: '浙执79号',
    date: '2018-03-118',
    applicant: '淘小宝',
    execution: '某某公司',
    holder: '淘小宝',
    license: '余82天',
  },
  {
    number: '浙执80号',
    date: '2017-09-25',
    applicant: '淘小宝',
    execution: '某某公司',
    holder: '淘小宝',
    license: '余77天',
  },
  {
    number: '浙执81号',
    date: '2017-10-16',
    applicant: '淘小宝',
    execution: '某某公司',
    holder: '淘小宝',
    license: '余90天',
  },
  {
    number: '浙执82号',
    date: '2017-11-17',
    applicant: '淘小宝',
    execution: '某某公司',
    holder: '淘小宝',
    license: '余30天',
  },
];

export default class ListTable extends Component {
  static displayName = 'ListTable';

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

  render() {
    const actionRender = () => {
      return (
        <Button size="large" style={styles.button}>
          办理
        </Button>
      );
    };

    return (
      <div style={styles.container}>
        <Table dataSource={mockData} primaryKey="number" style={styles.table}>
          <Table.Column align="center" title="案号" dataIndex="number" />
          <Table.Column align="center" title="立案日期" dataIndex="date" />
          <Table.Column align="center" title="申请人" dataIndex="applicant" />
          <Table.Column align="center" title="被执行人" dataIndex="execution" />
          <Table.Column align="center" title="承办人" dataIndex="holder" />
          <Table.Column align="center" title="法定执照" dataIndex="license" />
          <Table.Column
            align="center"
            title="简易/普通"
            dataIndex="difficulty"
          />
          <Table.Column align="center" title="备注" dataIndex="remark" />
          <Table.Column align="center" title="操作" cell={actionRender} />
        </Table>
        <div style={styles.pagination}>
          <Pagination
            current={this.state.current}
            onChange={this.onPageChange}
            size="large"
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
    background: 'linear-gradient(90deg, #006fff 25%, #fff 150%)',
    color: 'white',
    margin: '0 8px',
    padding: '0 16px',
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
