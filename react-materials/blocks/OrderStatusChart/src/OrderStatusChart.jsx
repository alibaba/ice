import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import AreaChart from './AreaChart';

const { Row, Col } = Grid;

export default class OrderStatusChart extends Component {
  static displayName = 'OrderStatusChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="订单状态">
        <Row wrap>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                5675{' '}
                <Icon
                  size="xs"
                  type="arrow-down-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowDown }}
                />
              </h2>
              <p style={styles.textLabel}>日订单量</p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                7841{' '}
                <Icon
                  size="xs"
                  type="arrow-up-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowUp }}
                />
              </h2>
              <p style={styles.textLabel}>订单完成</p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                6521{' '}
                <Icon
                  size="xs"
                  type="arrow-down-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowDown }}
                />
              </h2>
              <p style={styles.textLabel}>月销售量</p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                8954{' '}
                <Icon
                  size="xs"
                  type="arrow-up-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowUp }}
                />
              </h2>
              <p style={styles.textLabel}>累计收入</p>
            </div>
          </Col>
        </Row>
        <AreaChart />
      </IceContainer>
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
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    fontSize: '28px',
  },
  arrowIcon: {
    marginLeft: '10px',
  },
  arrowUp: {
    color: '#ec3f16',
  },
  arrowDown: {
    color: 'green',
  },
};
