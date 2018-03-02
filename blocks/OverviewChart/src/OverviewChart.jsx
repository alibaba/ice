import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
import PieDonutChart from './PieDonutChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

const { Row, Col } = Grid;

export default class OverviewChart extends Component {
  static displayName = 'OverviewChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row type="wrap" style={styles.overviewChart}>
        <Col xxs="24" s="8" l="8">
          <IceContainer style={{ padding: '10px 20px' }}>
            <h2 style={styles.chartTitle}>行业特征</h2>
            <PieDonutChart />
          </IceContainer>
        </Col>
        <Col xxs="24" s="8" l="8">
          <IceContainer style={{ padding: '10px' }}>
            <h2 style={styles.chartTitle}>销售趋势</h2>
            <BarChart />
          </IceContainer>
        </Col>
        <Col xxs="24" s="8" l="8">
          <IceContainer style={{ padding: '10px' }}>
            <h2 style={styles.chartTitle}>营收趋势</h2>
            <LineChart />
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  chartTitle: {
    margin: '0 0 10px',
  },
};
