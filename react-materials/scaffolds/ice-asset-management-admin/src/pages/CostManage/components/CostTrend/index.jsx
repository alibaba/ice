/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select } from '@alifd/next';
import LineChart from './LineChart';
import './index.scss';

// MOCK 数据，实际业务按需进行替换
const mockData = [
  {
    year: '2018-08-01',
    computationalCosts: 5.9,
    storageCosts: 1.9,
  },
  {
    year: '2018-08-05',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-08-10',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-08-15',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-08-20',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-08-25',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-08-30',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-09-01',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-09-05',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-09-10',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-09-15',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
  {
    year: '2018-09-20',
    computationalCosts: 6.0,
    storageCosts: 2.0,
  },
];

// Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class CostTrend extends Component {
  state = {
    data: mockData,
    type: 'allCost',
  };

  changeType = (type) => {
    this.setState({
      type,
    });
  }


  handleTabChange = () => {
    const { data } = this.state;
    const newData = data.map((item) => {
      return {
        year: item.year,
        computationalCosts: item.computationalCosts + random(0.1, 0.2),
        storageCosts: item.storageCosts + random(0.2, 0.3),
      };
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    const { data, type } = this.state;
    return (
      <IceContainer style={styles.container} className="cost-trend">
        <div style={styles.titleContainer}>
          <div style={styles.title}>费用趋势</div>
          <Select onChange={this.changeType} value={type} size="small">
            {
              ['allCost', 'cost'].map((item) => {
                return <Select.Option value={item} key={item}>{item}</Select.Option>;
              })
            }
          </Select>
        </div>

        <div style={styles.chartContent}>
          <LineChart data={data} />
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  titleContainer: {
    padding: '0 20px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(240, 240, 240)',
  },
  title: {
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
  chartContent: {
    padding: '15px',
  },
};
