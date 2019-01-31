import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import BaseInfo from './components/BaseInfo';
import TimeDistribution from './components/TimeDistribution';
import PercentageComplete from './components/PercentageComplete';
import LossRate from './components/LossRate';
import AverageTime from './components/AverageTime';

const { Row, Col } = Grid;

export default class DataCenter extends Component {
  static displayName = 'DataCenter';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Row gutter="20" wrap>
        <Col l="12">
          <LossRate />
        </Col>
        <Col l="12">
          <TimeDistribution />
        </Col>
        <Col l="24">
          <AverageTime />
        </Col>
        <Col l="12">
          <BaseInfo />
        </Col>
        <Col l="12">
          <PercentageComplete />
        </Col>
      </Row>
    );
  }
}
