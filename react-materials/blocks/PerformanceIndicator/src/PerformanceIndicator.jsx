import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import RadarChart from './RadarChart';
import HistogramChart from './HistogramChart';

const { Row, Col } = Grid;

export default class PerformanceIndicator extends Component {
  static displayName = 'PerformanceIndicator';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={{ padding: 0 }}>
        <h3 style={styles.title}>性能指标</h3>
        <Row wrap gutter="20" style={{ paddingTop: '30px' }}>
          <Col l="12">
            <RadarChart />
          </Col>
          <Col l="12">
            <HistogramChart />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
const styles = {
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
};
