import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import LineChart from './LineChart';

const { Row, Col } = Grid;

export default class TradingTrends extends Component {
  render() {
    return (
      <IceContainer title="交易趋势">
        <Row gutter="20">
          <Col l="6">
            <div style={styles.content}>
              <div style={styles.item}>
                <h5 style={styles.title}>下单笔数</h5>
                <h2 style={styles.value}>12,234</h2>
              </div>
              <div style={styles.item}>
                <h5 style={styles.title}>退货笔数</h5>
                <h2 style={styles.value}>5,483</h2>
              </div>
            </div>
          </Col>
          <Col l="18">
            <LineChart />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    margin: '40px 0',
  },
  title: {
    margin: '20px 0 10px',
  },
  value: {
    margin: '10px 0',
    color: '#333',
  },
};
