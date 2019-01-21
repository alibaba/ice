import React, { Component } from 'react';
import PageHead from '../../components/PageHead';
import Overview from '../../components/Overview';
import OrderStatusChart from './components/OrderStatusChart';

const MOCK_DATA = [
  {
    title: '订货单',
    value: 12339,
  },
  {
    title: '退货单(笔)',
    value: 9523,
  },
  {
    title: '订货客户数',
    value: 30149,
  },
  {
    title: '退款客户数',
    value: 7493,
  },
  {
    title: '订货金额',
    value: '￥ 293439',
  },
  {
    title: '退货金额(元)',
    value: '￥ 8054',
  },
];

export default class OrderReport extends Component {
  render() {
    return (
      <div>
        <PageHead title="订单报表" />
        <Overview data={MOCK_DATA} col="6" />
        <OrderStatusChart />
      </div>
    );
  }
}
