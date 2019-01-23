import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableFilter from './TableFilter';
import Overview from '../../../../components/Overview';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getOverviewData = () => {
  return [
    {
      title: '退货单(笔)',
      value: random(10000, 50000),
    },
    {
      title: '退货数量(件)',
      value: random(5000, 10000),
    },
    {
      title: '退货金额(元)',
      value: random(10000, 100000),
    },
  ];
};

const getTableData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      backOrder: random(10000000, 100000000),
      customerName: ['淘小宝', '淘二宝'][random(0, 1)],
      orderTime: `2018-12-1${random(1, 9)}`,
      commodityCode: random(10000000, 100000000),
      commodityName: ['蓝牙音箱', '天猫精灵', '智能机器人'][random(0, 2)],
      price: ['￥99', '￥199', '￥299'][random(0, 2)],
    };
  });
};

export default class ChargeBackTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    overviewData: getOverviewData(),
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
            overviewData: getOverviewData(),
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
    const { isLoading, data, current, overviewData } = this.state;

    return (
      <div>
        <TableFilter onChange={this.handleFilterChange} />
        <Overview data={overviewData} col="3" />
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="退单号" dataIndex="backOrder" />
            <Table.Column title="客户名称" dataIndex="customerName" />
            <Table.Column title="下单时间" dataIndex="orderTime" />
            <Table.Column title="商品编码" dataIndex="commodityCode" />
            <Table.Column title="商品名称" dataIndex="commodityName" />
            <Table.Column title="价格" dataIndex="price" />
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
