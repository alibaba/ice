import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

const { Row, Col } = Grid;

export default class Data extends Component {
  static displayName = 'Data';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>提效数据</h3>
        <div style={styles.content}>
          <Row gutter="20">
            <Col l="8">
              <BarChart />
            </Col>
            <Col l="8">
              <PieChart />
            </Col>
            <Col l="8">
              <LineChart />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '80px 0',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    lineHeight: '38px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '40px',
    margin: '0 0 24px',
  },
};
