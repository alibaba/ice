import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import PageHead from '../../components/PageHead';
import SalesChart from './components/SalesChart';
import OrderTrend from './components/OrderTrend';
import OrderCate from './components/OrderCate';
import CustomerTrend from './components/CustomerTrend';
import RecentOrders from './components/RecentOrders';
import TopOrders from './components/TopOrders';
import TotalRevenue from './components/TotalRevenue';
import RevenueCate from './components/RevenueCate';

const { Row, Col } = Grid;

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <PageHead title="工作台" />
        <SalesChart />
        <Row gutter="20" wrap>
          <Col l="12">
            <OrderTrend />
          </Col>
          <Col l="6">
            <OrderCate />
          </Col>
          <Col l="6">
            <CustomerTrend />
          </Col>
          <Col l="16">
            <RecentOrders />
          </Col>
          <Col l="8">
            <TopOrders />
          </Col>
          <Col l="16">
            <TotalRevenue />
          </Col>
          <Col l="8">
            <RevenueCate />
          </Col>
        </Row>
      </div>
    );
  }
}
