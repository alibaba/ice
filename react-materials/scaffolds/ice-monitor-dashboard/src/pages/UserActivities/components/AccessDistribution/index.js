import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import FrequencyChart from './FrequencyChart';
import DurationChart from './DurationChart';

const { Row, Col } = Grid;

export default class AccessDistribution extends Component {
  render() {
    return (
      <Row gutter="20">
        <Col l="12">
          <FrequencyChart />
        </Col>
        <Col l="12">
          <DurationChart />
        </Col>
      </Row>
    );
  }
}
