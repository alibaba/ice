import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import Overview from './components/Overview';
import BarChart from './components/BarChart';
import Commits from './components/Commits';
import Discussion from './components/Discussion';

const { Row, Col } = Grid;

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row gutter="20" wrap>
        <Col l="24">
          <Overview />
        </Col>
        <Col l="12">
          <BarChart />
        </Col>
        <Col l="12">
          <Discussion />
        </Col>
        <Col l="24">
          <Commits />
        </Col>
      </Row>
    );
  }
}
