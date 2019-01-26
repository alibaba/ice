import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const mockData = [
  {
    title: '年度总收入',
    amount: '￥298,234',
    percent: '12%',
    increase: false,
  },
  {
    title: '年度总订单',
    amount: '13,293',
    percent: '15%',
    increase: true,
  },
  {
    title: '年度退货单',
    amount: '2758',
    percent: '1.3%',
    increase: false,
  },
  {
    title: '年度客户数',
    amount: '3,659',
    percent: '20%',
    increase: true,
  },
];

export default class SalesChart extends Component {
  render() {
    return (
      <Row wrap gutter={20} style={{ marginBottom: '20px' }}>
        {mockData.map((item, index) => {
          return (
            <Col xxs="24" l="6" key={index}>
              <IceContainer className={styles.container}>
                <div className={styles.content}>
                  <p className={styles.title}>{item.title}</p>
                  <div className={styles.data}>
                    <h2 className={styles.amount}>{item.amount}</h2>
                    <div
                      className={styles.percent}
                      style={{
                        color: item.increase ? 'red' : 'green',
                      }}
                    >
                      {item.percent}{' '}
                      <Icon
                        type={`arrow-${item.increase ? 'up' : 'down'}-filling`}
                        size="xs"
                        className={styles.arrowIcon}
                      />
                    </div>
                  </div>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}
