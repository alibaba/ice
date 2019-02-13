/* eslint global-require: 0 */
import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ProjectList from './ProjectList';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    return (
      <Row wrap gutter={20}>
        <Col l="16">
          <ProjectList />
        </Col>
        <Col l="8">
          <PieChart />
          <LineChart />
        </Col>
      </Row>
    );
  }
}
