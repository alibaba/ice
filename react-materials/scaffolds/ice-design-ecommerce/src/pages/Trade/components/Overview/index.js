import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

// MOCK 数据，实际业务按需进行替换
const mockData = [
  {
    name: '下单笔数',
    value: '349,231',
  },
  {
    name: '待付款',
    value: '123,789',
  },
  {
    name: '待发货',
    value: '3,678',
  },
  {
    name: '待退货',
    value: '12,987',
  },
  {
    name: '月收入',
    value: '22,888',
  },
  {
    name: '总收入',
    value: '867,543',
  },
];

export default class Overview extends Component {
  render() {
    return (
      <IceContainer>
        <Row>
          {mockData.map((item, index) => {
            return (
              <Col l="4" key={index}>
                <div style={styles.box}>
                  <div style={styles.name}>{item.name}</div>
                  <div style={styles.value}>{item.value}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  name: {
    color: '#666',
    lineHeight: '14px',
    fontSize: '14px',
  },
  value: {
    color: '#333',
    fontWeight: '500',
    fontSize: '22px',
    lineHeight: '30px',
    marginTop: '15px',
  },
};
