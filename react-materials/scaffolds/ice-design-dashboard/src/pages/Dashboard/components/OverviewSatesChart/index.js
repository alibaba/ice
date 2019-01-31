import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import ColumnChart from './ColumnChart';
import ContainerCard from '../../../../components/ContainerCard';

const { Row, Col } = Grid;
const mockData = [
  {
    title: '年度销售额',
    amount: '1,293',
    percent: '15%',
    increase: true,
    color: '#fff',
    background: '#447eff',
  },
  {
    title: '年度订单量',
    amount: '758',
    percent: '1.3%',
    increase: false,
    color: '#fff',
    background: '#58ca9a',
  },
  {
    title: '年度新增用户数',
    amount: '3,659',
    percent: '20%',
    increase: true,
    color: '#fff',
    background: '#f7da47',
  },
  {
    title: '年度新增会员数',
    amount: '298',
    percent: '12%',
    increase: false,
    color: '#fff',
    background: '#ee706d',
  },
];

export default class OverviewSatesChart extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Row wrap gutter={20}>
          {mockData.map((item, index) => {
            return (
              <Col xxs="24" l="6" key={index}>
                <ContainerCard>
                  <div style={styles.summary}>
                    <p style={styles.title}>{item.title}</p>
                    <div style={styles.data}>
                      <h2 style={styles.amount}>{item.amount}</h2>
                      <div style={styles.percent}>
                        {item.percent}{' '}
                        <Icon
                          type={`arrow-${
                            item.increase ? 'up' : 'down'
                          }-filling`}
                          size="xs"
                          style={styles.arrowIcon}
                        />
                      </div>
                    </div>
                  </div>
                  <ColumnChart color={item.background} />
                </ContainerCard>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  content: {
    color: '#fff',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.30)',
    transition: 'all .25s ease',
  },
  title: {
    margin: '0 0 10px 0',
  },
  data: {
    display: 'flex',
    margin: '10px 0',
  },
  amount: {
    margin: '0 15px 0 0',
    fontSize: '28px',
  },
  percent: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '4px',
    fontSize: '12px',
  },
  arrowIcon: {
    marginLeft: '8px',
  },
};
