import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import OverviewSatesChart from './components/OverviewSatesChart';
import EarningsChart from './components/EarningsChart';
import TotalAmount from './components/TotalAmount';
import BorrowingChart from './components/BorrowingChart';
import CustomTable from './components/CustomTable';

const { Row, Col } = Grid;

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <OverviewSatesChart />
        <Row wrap gutter="20">
          <Col l="10">
            <TotalAmount />
          </Col>
          <Col l="14">
            <EarningsChart />
          </Col>
          <Col l="24">
            <BorrowingChart />
          </Col>
          <Col l="12">
            <CustomTable />
          </Col>
          <Col l="12">
            <CustomTable />
          </Col>
        </Row>
      </div>
    );
  }
}
