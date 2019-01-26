import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import GradientLineChart from './GradientLineChart';

const { Row, Col } = Grid;

export default class QualityTrend extends Component {
  static displayName = 'QualityTrend';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>质量分及配置趋势</h4>
        <Row>
          <Col l="12">
            <GradientLineChart />
          </Col>
          <Col l="12">
            <GradientLineChart />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0 0 20px',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  },
};
