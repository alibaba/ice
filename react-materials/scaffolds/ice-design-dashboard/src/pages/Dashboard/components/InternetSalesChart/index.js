import React, { Component } from 'react';
import ContainerCard from '../../../../components/ContainerCard';
import BurshChart from './BurshChart';

const MOCK_DATA = [
  {
    label: '总用户数',
    value: '15,125',
  },
  {
    label: '跳出率',
    value: '28.72%',
  },
  {
    label: '页面访问量',
    value: '94,381',
  },
  {
    label: '转化率',
    value: '78.23%',
  },
];

export default class InternetSalesChart extends Component {
  render() {
    return (
      <ContainerCard title="网络销售">
        <div style={styles.summary}>
          {MOCK_DATA.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <div style={styles.label}>{item.label}</div>
                <div style={styles.value}>{item.value}</div>
              </div>
            );
          })}
        </div>
        <BurshChart />
      </ContainerCard>
    );
  }
}

const styles = {
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  item: {
    textAlign: 'center',
  },
  value: {
    marginTop: '10px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
};
