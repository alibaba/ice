import React, { Component } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';
import ContainerCard from '../../../../components/ContainerCard';

const data = [
  { month: '1月', earnings: 38 },
  { month: '2月', earnings: 52 },
  { month: '3月', earnings: 61 },
  { month: '4月', earnings: 80 },
  { month: '5月', earnings: 65 },
  { month: '6月', earnings: 60 },
  { month: '7月', earnings: 60 },
  { month: '8月', earnings: 58 },
  { month: '9月', earnings: 48 },
  { month: '10月', earnings: 50 },
  { month: '11月', earnings: 40 },
  { month: '12月', earnings: 40 },
];
const cols = {
  earnings: { tickInterval: 20, alias: '总收入' },
};

export default class EarningsChart extends Component {
  render() {
    return (
      <ContainerCard contentStyle={{ padding: '10px 20px' }}>
        <div style={styles.head}>
          <h3 style={styles.title}>总收入</h3>
          <p style={styles.description}>2018年12月份总收入：</p>
          <h1 style={styles.earnings}>￥ 67,239,18</h1>
          <p style={styles.description}>28.12% (￥ 23,945)</p>
        </div>
        <div style={styles.content}>
          <Chart height={150} forceFit padding={[20]} data={data} scale={cols}>
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="interval"
              position="month*earnings"
              color="#ee706d"
              shape="smooth"
            />
          </Chart>
        </div>
        <div style={styles.footer}>
          <p style={styles.description}>2019年01月份总收入：</p>
          <h1
            style={{
              ...styles.earnings,
              color: '#447eff',
            }}
          >
            ￥ 12,238,83
          </h1>
          <p style={styles.description}>11.83% (￥ 38,237)</p>
        </div>
      </ContainerCard>
    );
  }
}

const styles = {
  title: {
    margin: '0',
    height: '40px',
    lineHeight: '40px',
  },
  content: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    paddingBottom: '10px',
    marginBottom: '30px',
  },
  description: {
    margin: '0',
    color: '#999',
  },
  earnings: {
    margin: '23px 0 10px',
    fontSize: '38px',
    fontWeight: 'bold',
  },
};
