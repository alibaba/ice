import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const mockData = [
  {
    title: '总计邀请(个)',
    value: '187',
  },
  {
    title: '正在进行中(个)',
    value: '62',
  },
  {
    title: '已完成(个)',
    value: '23',
  },
  {
    title: '完成平均时长(天)',
    value: '39',
  },
  {
    title: '参与成员(人)',
    value: '96',
  },
];

export default class Overview extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <Row>
          <Col l="4">
            <div style={styles.item}>
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/heTdoQXAHjxNGiLSUkYA.svg"
                alt=""
              />
            </div>
          </Col>
          {mockData.map((item, index) => {
            return (
              <Col l="4" key={index}>
                <div style={styles.item}>
                  <p style={styles.itemTitle}>{item.title}</p>
                  <p style={styles.itemValue}>{item.value}</p>
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
  item: {
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    color: '#666',
    fontSize: '14px',
  },
  itemValue: {
    color: '#333',
    fontSize: '36px',
    marginTop: '10px',
  },
};
