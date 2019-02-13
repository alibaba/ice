import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import Title from './components/Title';
import OverviewSatesChart from './components/OverviewSatesChart';
import InternetSalesChart from './components/InternetSalesChart';
import PaymentChart from './components/PaymentChart';
import BounceRateChart from './components/BounceRateChart';
import TotalUserChart from './components/TotalUserChart';
import OverviewPieChart from './components/OverviewPieChart';
import EarningsChart from './components/EarningsChart';
import TopProducts from './components/TopProducts';
import TopCategories from './components/TopCategories';

const { Row, Col } = Grid;

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Title />
        <OverviewSatesChart />
        <Row wrap gutter="20">
          <Col l="14">
            <InternetSalesChart />
          </Col>
          <Col l="10">
            <Row gutter="20" wrap>
              <Col l="12">
                <BounceRateChart />
              </Col>
              <Col>
                <TotalUserChart />
              </Col>
              <Col l="24" style={{ marginBottom: '20px' }}>
                <PaymentChart />
              </Col>
            </Row>
          </Col>
          <Col l="8">
            <EarningsChart />
          </Col>
          <Col l="8">
            <TopProducts />
          </Col>
          <Col l="8">
            <TopCategories />
          </Col>
          <Col l="24">
            <OverviewPieChart />
          </Col>
        </Row>
      </div>
    );
  }
}
