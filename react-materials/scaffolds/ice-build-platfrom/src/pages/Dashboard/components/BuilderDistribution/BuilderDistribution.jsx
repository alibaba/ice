import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import BasicPieChart from '../BasicPieChart';
import PieLegendChart from '../PieLegendChart';

const { Row, Col } = Grid;

export default class BuilderDistribution extends Component {
  static displayName = 'BuilderDistribution';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter="20">
        <Col l="12">
          <BasicPieChart />
        </Col>
        <Col l="12">
          <PieLegendChart />
        </Col>
      </Row>
    );
  }
}
