import React, { Component } from 'react';
import { Grid, Progress } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;
const mockData = [
  {
    percent: '100',
    title: '所有任务',
    value: '3841',
  },
  {
    percent: '60',
    title: '未解决',
    value: '2931',
  },
  {
    percent: '10',
    title: '处理中',
    value: '384',
  },
  {
    percent: '30',
    title: '已解决',
    value: '2398',
  },
];

export default class OverviewPieChart extends Component {
  render() {
    return (
      <Row gutter={20}>
        {mockData.map((item, index) => {
          return (
            <Col xxs="24" l="6" key={index}>
              <IceContainer style={styles.container}>
                <Progress percent={item.percent} state="error" shape="circle" />
                <div style={styles.content}>
                  <p style={styles.value}>{item.value}</p>
                  <h4 style={styles.title}>{item.title}</h4>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  content: {
    padding: '0 20px',
    textAlign: 'center',
  },
  value: {
    margin: '10px 0 0',
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
  },
  title: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
};
