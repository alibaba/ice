import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Progress, Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class CircleProgress extends Component {
  render() {
    return (
      <Row wrap gutter="20">
        <Col xxs="12" s="12" l="8">
          <IceContainer>
            <div style={styles.item}>
              <Progress percent={10} shape="circle" state="error" />
              <h6 style={styles.title}>话题一</h6>
            </div>
          </IceContainer>
        </Col>

        <Col xxs="12" s="12" l="8">
          <IceContainer>
            <div style={styles.item}>
              <Progress percent={50} shape="circle" />
              <h6 style={styles.title}>话题二</h6>
            </div>
          </IceContainer>
        </Col>

        <Col xxs="12" s="12" l="8">
          <IceContainer>
            <div style={styles.item}>
              <Progress percent={100} shape="circle" state="success" />
              <h6 style={styles.title}>话题三</h6>
            </div>
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: 20,
  },
};
