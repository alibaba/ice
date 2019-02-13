import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import CustomTable from '../HealthAnalysis/CustomTable';
import PirChart from '../HealthAnalysis/PieChart';

const { Row, Col } = Grid;

export default class HealthAnalysis extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>计算健康分析</h4>
        <Row>
          <Col l="8">
            <PirChart />
          </Col>
          <Col l="16">
            <CustomTable />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  title: {
    margin: '0 0 20px',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
};
