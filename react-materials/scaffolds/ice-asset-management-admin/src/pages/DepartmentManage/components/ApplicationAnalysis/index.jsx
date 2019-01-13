import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import DoubleAxesChart from './DoubleAxesChart';
import ApplicationTable from './ApplicationTable';

export default class ApplicationAnalysis extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>应用分析</h4>
        <DoubleAxesChart />
        <ApplicationTable />
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
