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
            </div>
          </Col>

          <Col xxs="12" s="12" l="6" style={styles.textCardItem}>
            <div style={styles.textCardSubtitle}>待审批</div>
            <div style={styles.textCardTitle}>
              <span style={styles.textCardNumber}>32</span>
            </div>
          </Col>

          <Col xxs="12" s="12" l="6" style={styles.textCardItem}>
            <div style={styles.textCardSubtitle}>待处理</div>
            <div style={styles.textCardTitle}>
              <span style={styles.textCardNumber}>16</span>
            </div>
          </Col>

          <Col
            xxs="12"
            s="12"
            l="6"
            style={{ ...styles.textCardItem, borderRight: 0 }}
          >
            <div style={styles.textCardSubtitle}>待回复</div>
            <div style={styles.textCardTitle}>
              <span style={styles.textCardNumber}>23</span>
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
