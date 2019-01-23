import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getTableData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      serialNumber: `HZ${random(1000000, 2000000)}`,
      orderNumber: random(10000000, 100000000),
      name: ['蓝牙音箱', '天猫精灵', '智能机器人'][random(0, 2)],
      spec: '- -',
      dispatchTime: `2019-01-1${random(1, 9)}`,
      orderTime: `2018-12-1${random(1, 9)}`,
      quantity: random(500, 1000),
      delivery: random(100, 500),
      amount: `￥ ${random(2000, 10000)}`,
    };
  });
};

export default class OrderTable extends Component {
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
        resolve(getTableData(len));
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

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column title="流水号" dataIndex="serialNumber" />
          <Table.Column title="订单号" dataIndex="orderNumber" />
          <Table.Column title="商品名称" dataIndex="name" />
          <Table.Column title="商品规格" dataIndex="spec" />
          <Table.Column title="发货时间" dataIndex="dispatchTime" />
          <Table.Column title="下单时间" dataIndex="orderTime" />
          <Table.Column title="订购数量" dataIndex="quantity" />
          <Table.Column title="已发货数量" dataIndex="delivery" />
          <Table.Column title="已发货商品金额" dataIndex="amount" />
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
    marginTop: '20px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
