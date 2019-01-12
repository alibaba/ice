import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import ColumnChart from './ColumnChart';

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
            <p style={styles.textLabel}>浏览次数</p>
            <h2 style={styles.counterNum}>{data.visits}</h2>
            <ColumnChart />
          </div>
        </Col>
        <Col xxs="12" s="12" l="6">
          <div style={styles.box}>
            <p style={styles.textLabel}>独立访客</p>
            <h2 style={styles.counterNum}>{data.unique_users}</h2>
            <ColumnChart color="#fcdb51" />
          </div>
        </Col>
        <Col xxs="12" s="12" l="6">
          <div style={styles.box}>
            <p style={styles.textLabel}>IP</p>
            <h2 style={styles.counterNum}>{data.ip}</h2>
            <ColumnChart color="#2eca9c" />
          </div>
        </Col>
        <Col xxs="12" s="12" l="6">
          <div style={styles.box}>
            <p style={styles.textLabel}>点击次数</p>
            <h2 style={styles.counterNum}>{data.click}</h2>
            <ColumnChart color="#fa706f" />
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
