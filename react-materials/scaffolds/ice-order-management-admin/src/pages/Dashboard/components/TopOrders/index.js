import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@alifd/next';
import ContainerTitle from '../../../../components/ContainerTitle';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 9) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['淘小宝', '淘二宝'][random(0, 1)],
      num: random(1000, 2000),
      amount: `￥ ${random(10000, 100000)}`,
    };
  });
};

export default class TopOrders extends Component {
  render() {
    const dataSource = getData();
    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="最近的订单" />
        <Table dataSource={dataSource} hasBorder={false}>
          <Table.Column title="客户名称" dataIndex="name" />
          <Table.Column title="订单数量" dataIndex="num" />
          <Table.Column title="订单金额" dataIndex="amount" />
        </Table>
      </IceContainer>
    );
  }
}
