import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class Head extends Component {
  static displayName = 'Head';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <Row wrap>
        <Col xxs="12" s="12" l="6">
          <div style={styles.box}>
            <p style={styles.textLabel}>本财年月均增长率(%)</p>
            <h2 style={styles.counterNum}>{data.monthRate}</h2>
          </div>
        </Col>
        <Col xxs="12" s="12" l="6">
          <div style={styles.box}>
            <p style={styles.textLabel}>本财年月均增长量(pb)</p>
            <h2 style={styles.counterNum}>{data.monthAmount}</h2>
          </div>
        </Col>
        <Col xxs="12" s="12" l="6">
          <div style={styles.box}>
            <p style={styles.textLabel}>本财年日均增长率(%)</p>
            <h2 style={styles.counterNum}>{data.dayRate}</h2>
          </div>
        </Col>
        <Col xxs="12" s="12" l="6">
          <div style={styles.box}>
            <p style={styles.textLabel}>本财年日均增长量(pb)</p>
            <h2 style={styles.counterNum}>{data.dayAmount}</h2>
          </div>
        </Col>
      </Row>
    );
  }
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  textLabel: {
    margin: 0,
    color: '#666',
  },
  counterNum: {
    margin: '10px',
    fontSize: '28px',
  },
};
