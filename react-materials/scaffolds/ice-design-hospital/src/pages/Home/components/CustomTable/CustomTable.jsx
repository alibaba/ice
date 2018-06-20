import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import './CustomTable.scss';

const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      id: index + 1,
      orderID: `12022123${index}`,
      name: '张一峰',
      date: `2018-06-${index + 1}`,
      planDate: `2018-06-${index + 1}`,
      validData: `2018-06-${index + 1}`,
      category: '青霉素',
      state: '完成',
      approver: '刘建明',
      approvalData: `2018-06-${index + 1}`,
    };
  });
};

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handleChange = (current) => {
    this.setState({
      current,
    });
  };

  render() {
    const dataSource = getData();
    return (
      <div>
        <Table
          dataSource={dataSource}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column title="序列号" dataIndex="id" />
          <Table.Column title="调价单号" dataIndex="orderID" />
          <Table.Column title="调价人" dataIndex="name" />
          <Table.Column title="调价日期" dataIndex="date" />
          <Table.Column title="计划生效日期" dataIndex="planDate" />
          <Table.Column title="实际生效日期" dataIndex="validData" />
          <Table.Column title="分类" dataIndex="category" />
          <Table.Column title="状态" dataIndex="state" />
          <Table.Column title="审核人" dataIndex="approver" />
          <Table.Column title="审核日期" dataIndex="approvalData" />
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
};
