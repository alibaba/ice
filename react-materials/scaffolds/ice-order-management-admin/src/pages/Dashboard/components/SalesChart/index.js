import React, { Component } from 'react';
import { Grid, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';

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
              <IceContainer style={styles.container}>
                <div style={styles.content}>
                  <p style={styles.title}>{item.title}</p>
                  <div style={styles.data}>
                    <h2 style={styles.amount}>{item.amount}</h2>
                    <div
                      style={{
                        ...styles.percent,
                        color: item.increase ? 'red' : 'green',
                      }}
                    >
                      {item.percent}{' '}
                      <Icon
                        type={`arrow-${item.increase ? 'up' : 'down'}-filling`}
                        size="xs"
                        style={styles.arrowIcon}
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

const styles = {
  container: {
    borderTop: '3px solid #447eff',
  },
  content: {
    color: '#333',
    borderRadius: '3px',
  },
  title: {
    margin: '0 0 30px 0',
    color: '#666',
    fontWeight: '450',
  },
  data: {
    display: 'flex',
    margin: '10px 0',
    justifyContent: 'space-between',
  },
  amount: {
    margin: '0 15px 0 0',
    fontSize: '28px',
  },
  percent: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: '8px',
  },
};
