import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CountUp from 'react-countup';
import AreaChart from './AreaChart';

const { Row, Col } = Grid;

export default class OverviewChart extends Component {
  render() {
    return (
      <IceContainer title="月考报表">
        <Row wrap>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                <CountUp start={1000} end={5675} duration={2} useEasing />{' '}
                <Icon
                  size="xs"
                  type="arrow-down-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowDown }}
                />
              </h2>
              <p style={styles.textLabel}>及格人数</p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                <CountUp start={1000} end={7841} duration={2} useEasing />{' '}
                <Icon
                  size="xs"
                  type="arrow-up-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowUp }}
                />
              </h2>
              <p style={styles.textLabel}>满分人数</p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                <CountUp start={1000} end={6521} duration={2} useEasing />{' '}
                <Icon
                  size="xs"
                  type="arrow-down-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowDown }}
                />
              </h2>
              <p style={styles.textLabel}>不及格人数</p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                <CountUp start={1000} end={8954} duration={2} useEasing />{' '}
                <Icon
                  size="xs"
                  type="arrow-up-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowUp }}
                />
              </h2>
              <p style={styles.textLabel}>总人数</p>
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
