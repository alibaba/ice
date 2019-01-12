import React, { Component } from 'react';
import { Card, Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class Cards extends Component {
  static displayName = 'Cards';

  render() {
    return (
      <Row wrap gutter="20" style={styles.row}>
        <Col l="6" style={styles.card}>
          <Card title="请求数量" contentHeight="auto" style={styles.card}>
            <h2 style={styles.counterNum}>1002</h2>
          </Card>
        </Col>
        <Col l="6" style={styles.card}>
          <Card title="平均延时" contentHeight="auto" style={styles.card}>
            <h2 style={styles.counterNum}>234,32</h2>
          </Card>
        </Col>
        <Col l="6" style={styles.card}>
          <Card title="未理解数量" contentHeight="auto" style={styles.card}>
            <h2 style={styles.counterNum}>236,123</h2>
          </Card>
        </Col>
        <Col l="6" style={styles.card}>
          <Card title="超时次数" contentHeight="auto" style={styles.card}>
            <h2 style={styles.counterNum}>549,234</h2>
          </Card>
        </Col>
      </Row>
    );
  }
}

const styles = {
  row: {
    marginBottom: '20px',
  },
  card: {
    width: '100%',
    boxShadow: 'initial',
    borderRadius: '6px',
  },
  counterNum: {
    fontSize: '30px',
  },
};
