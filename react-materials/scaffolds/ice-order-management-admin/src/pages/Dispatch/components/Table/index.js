import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import Overview from '../Overview';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换

const getOverviewData = () => {
  return [
    {
      title: '发货单数',
      value: random(1000, 3000),
      background: '#58ca9a',
    },
    {
      title: '发货商品数',
      value: random(3000, 6000),
      background: '#f7da47',
    },
    {
      title: '总金额',
      value: `￥ ${random(5000, 10000)}`,
      background: '#ee706d',
    },
  ];
};

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

export default class ReserveTable extends Component {
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

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderOper = () => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, data, current, overviewData } = this.state;

    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <Overview data={overviewData} />
        <IceContainer>
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
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
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
