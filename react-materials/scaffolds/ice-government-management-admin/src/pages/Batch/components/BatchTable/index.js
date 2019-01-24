import React, { Component } from 'react';
import { Button, Table, Pagination, Message } from '@alifd/next';

const mockData = [
  {
    number: '浙执78号',
    applicant: '淘小宝',
    execution: '某某公司',
    contracting: '淘小宝',
    date: '2018-10-10',
  },
  {
    number: '浙执79号',
    applicant: '淘小宝',
    execution: '某某公司',
    contracting: '淘小宝',
    date: '2018-10-10',
  },
  {
    number: '浙执80号',
    applicant: '淘小宝',
    execution: '某某公司',
    contracting: '淘小宝',
    date: '2018-10-10',
  },
  {
    number: '浙执81号',
    applicant: '淘小宝',
    execution: '某某公司',
    contracting: '淘小宝',
    date: '2018-10-10',
  },
  {
    number: '浙执82号',
    applicant: '淘小宝',
    execution: '某某公司',
    contracting: '淘小宝',
    date: '2018-10-10',
  },
];

export default class BatchTable extends Component {
  static displayName = 'BatchTable';

  constructor(props) {
    super(props);
    this.state = {
      rowSelection: {
        onChange: this.onTableChange.bind(this),
        onSelect: (selected, record, records) => {
          console.log('onSelect', selected, record, records);
        },
        onSelectAll: (selected, records) => {
          console.log('onSelectAll', selected, records);
        },
        selectedRowKeys: [],
      },
      current: 2,
    };
  }

  onTableChange = (ids, records) => {
    const { rowSelection } = this.state;
    rowSelection.selectedRowKeys = ids;
    console.log('onChange', ids, records);
    this.setState({ rowSelection });
  };

  onPageChange = (current) => {
    this.setState({
      current,
    });
  };

  handleClick = () => {
    Message.success('您暂无无权限查看');
  };

  render() {
    const actionRender = () => {
      return (
        <Button style={styles.button} onClick={this.handleClick}>
          查看
        </Button>
      );
    };

    return (
      <div style={styles.container}>
        <Table
          dataSource={mockData}
          primaryKey="number"
          rowSelection={this.state.rowSelection}
          style={styles.table}
        >
          <Table.Column align="center" title="案号" dataIndex="number" />
          <Table.Column align="center" title="申请人" dataIndex="applicant" />
          <Table.Column align="center" title="被执行人" dataIndex="execution" />
          <Table.Column
            align="center"
            title="执预承办人"
            dataIndex="contracting"
          />
          <Table.Column align="center" title="立案日期" dataIndex="date" />
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
