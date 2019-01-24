import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@alifd/next';
import ContainerTitle from '../../../../components/ContainerTitle';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const IMAGES = [
  'https://img.alicdn.com/tfs/TB10QvzDhjaK1RjSZKzXXXVwXXa-80-80.png',
  'https://img.alicdn.com/tfs/TB1YK97DlLoK1RjSZFuXXXn0XXa-80-80.png',
  'https://img.alicdn.com/tfs/TB1sFHcDmzqK1RjSZFpXXakSXXa-80-80.png',
  'https://img.alicdn.com/tfs/TB19c_XDmzqK1RjSZFjXXblCFXa-80-80.png',
];

// MOCK 数据，实际业务按需进行替换
const getData = (length = 5) => {
  return Array.from({ length }).map((item, index) => {
    return {
      id: index + 1,
      productImage: IMAGES[random(0, 3)],
      productName: `产品 # ${index + 1}`,
      productId: random(1000000, 2000000),
      productNum: random(500, 100),
      productAmount: random(1000, 10000),
      productTime: `2018-12-1${random(1, 9)}`,
      productStatus: ['已完成', '派送中'][random(0, 1)],
    };
  });
};

const STATUS = {
  已完成: '#447eff',
  派送中: '#ee706d',
};

export default class OrderTrend extends Component {
  renderProductImage = (image) => {
    return <img src={image} alt="" style={{ maxWidth: '48px' }} />;
  };

  renderProductStatus = (status) => {
    return (
      <div style={styles.status}>
        <span style={{ ...styles.dot, background: STATUS[status] }} />
        {status}
      </div>
    );
  };

  render() {
    const dataSource = getData();
    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="最近的订单" />
        <Table dataSource={dataSource} hasBorder={false}>
          <Table.Column title="#" dataIndex="id" />
          <Table.Column
            title="产品图片"
            dataIndex="productImage"
            cell={this.renderProductImage}
          />
          <Table.Column title="产品名称" dataIndex="productName" />
          <Table.Column title="产品编号" dataIndex="productId" />
          <Table.Column title="订单数量" dataIndex="productNum" />
          <Table.Column title="订单金额" dataIndex="productAmount" />
          <Table.Column title="订单时间" dataIndex="productTime" />
          <Table.Column
            title="订单状态"
            dataIndex="productStatus"
            cell={this.renderProductStatus}
          />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  status: {
    position: 'relative',
    paddingLeft: '20px',
  },
  dot: {
    width: '10px',
    height: '10px',
    position: 'absolute',
    left: '0',
    top: '2px',
    borderRadius: '50%',
  },
};
