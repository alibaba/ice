import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default class PublishTime extends Component {
  render() {
    return (
      <IceContainer title="平均发布时长">
        <Row align="center" style={{ height: '200px' }}>
          <Col l="12">
            <div className={styles.time}>626s</div>
          </Col>
          <Col l="12">
            <div className={styles.item}>
              <span className={styles.label}>XX机器</span>
              <span className={styles.number}>922S</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>其他机器</span>
              <span className={styles.number}>331S</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>周环比</span>
              <span className={styles.number}>0S</span>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
