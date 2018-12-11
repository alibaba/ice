import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default class PublishTime extends Component {
  render() {
    return (
      <IceContainer title="平均发布时长">
        <Row align="center" style={{ height: '200px' }}>
          <Col l="12">
            <div style={styles.time}>626s</div>
          </Col>
          <Col l="12">
            <div style={styles.item}>
              <span style={styles.label}>XX机器</span>
              <span style={styles.number}>922S</span>
            </div>
            <div style={styles.item}>
              <span style={styles.label}>其他机器</span>
              <span style={styles.number}>331S</span>
            </div>
            <div style={styles.item}>
              <span style={styles.label}>周环比</span>
              <span style={styles.number}>0S</span>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  time: {
    textAlign: 'center',
    color: '#2F7FFC',
    fontSize: '32px',
  },
  item: {
    lineHeight: 1.5,
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    minWidth: '80px',
    display: 'inline-block',
    marginRight: '10px',
    color: '#666',
    fontSize: '14px',
  },
  number: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
};
