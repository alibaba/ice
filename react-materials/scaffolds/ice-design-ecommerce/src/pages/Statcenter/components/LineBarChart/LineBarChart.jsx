import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import BarChart from './BarChart';
import LineChart from './LineChart';

const { Row, Col } = Grid;

export default class LineBarChart extends Component {
  static displayName = 'LineBarChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row gutter="20" wrap>
        <Col l="12">
          <BarChart />
        </Col>
        <Col l="12">
          <LineChart />
        </Col>
      </Row>
    );
  }
}
