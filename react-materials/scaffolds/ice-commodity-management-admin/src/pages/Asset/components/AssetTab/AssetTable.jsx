import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableFilter from './TableFilter';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      applyTime: `2018-12-1${random(1, 9)}`,
      transactionId: random(10000000, 100000000),
      amount: random(1000, 10000),
      endTime: `2019-06-1${random(1, 9)}`,
      applicant: ['淘小宝', '淘二宝'][random(0, 1)],
      state: ['已完成', '申请中'][random(0, 1)],
    };
  });
};

export default class MembersshipTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => {
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };

  renderOper = () => {
    return (
      <div>
        <a style={styles.link}>详情</a>
        <span style={styles.separator} />
        <a style={styles.link}>申请权限</a>
      </div>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div>
        <TableFilter onChange={this.handleFilterChange} />
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="申请时间" dataIndex="applyTime" />
            <Table.Column title="交易号" dataIndex="transactionId" />
            <Table.Column title="金额(万元)" dataIndex="amount" />
            <Table.Column title="处理完成时间" dataIndex="endTime" />
            <Table.Column title="申请人" dataIndex="applicant" />
            <Table.Column title="状态" dataIndex="state" />
          </Table>
          <Pagination
            style={styles.pagination}
            current={current}
            onChange={this.handlePaginationChange}
          />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
