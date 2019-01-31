import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    return (
      <IceContainer>
        <Row wrap>
          <Col xxs="12" s="12" l="6" style={styles.textCardItem}>
            <div style={styles.textCardSubtitle}>我的待办</div>
            <div style={styles.textCardTitle}>
              <span style={styles.textCardNumber}>8</span>
              个任务
            </div>
          </Col>

          <Col xxs="12" s="12" l="6" style={styles.textCardItem}>
            <div style={styles.textCardSubtitle}>对接设备时间</div>
            <div style={styles.textCardTitle}>
              <span style={styles.textCardNumber}>32</span>
              分钟
            </div>
          </Col>

          <Col xxs="12" s="12" l="6" style={styles.textCardItem}>
            <div style={styles.textCardSubtitle}>本周销售时间</div>
            <div style={styles.textCardTitle}>
              <span style={styles.textCardNumber}>32</span>
              分钟
            </div>
          </Col>

          <Col
            xxs="12"
            s="12"
            l="6"
            style={{ ...styles.textCardItem, borderRight: 0 }}
          >
            <div style={styles.textCardSubtitle}>本周销售量</div>
            <div style={styles.textCardTitle}>
              <span style={styles.textCardNumber}>23</span>
              个任务
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  textCardItem: {
    borderRight: '1px solid #F0F0F0',
    height: '90px',
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCardSubtitle: {
    fontSize: '12px',
    marginBottom: '10px',
  },
  textCardTitle: {
    fontSize: '16px',
  },
  textCardNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
};
