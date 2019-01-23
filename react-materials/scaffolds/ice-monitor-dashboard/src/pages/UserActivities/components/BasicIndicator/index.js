/* eslint no-shadow:0 */
import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import LineChart from './LineChart';
import ContainerTitle from '../../../../components/ContainerTitle';
import './index.scss';

const data = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
];

const cols = {
  value: {
    min: 0,
  },
  year: {
    range: [0, 1],
  },
};

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default class BasicIndicator extends Component {
  state = {
    data,
    cols,
  };

  handleTabChange = () => {
    const { data } = this.state;
    const newData = data.map((item) => {
      return {
        year: item.year,
        value: item.value + random(1, 2),
      };
    });
    console.log(newData);
    this.setState({
      data: newData,
    });
  };

  render() {
    const complexTab1 = (
      <div style={{ padding: '0 40px' }}>
        <p style={styles.tabTitle}>用户评价访问频次</p>
        <h5 style={styles.tabValue}>1.08</h5>
        <p style={styles.tabDesc}>与上一周同期比 -10%</p>
      </div>
    );

    const complexTab2 = (
      <div style={{ padding: '0 40px' }}>
        <p style={styles.tabTitle}>用户评价访问频次</p>
        <h5 style={styles.tabValue}>00:00:56</h5>
        <p style={styles.tabDesc}>与上一周同期比 20%</p>
      </div>
    );

    const panes = [
      {
        tab: complexTab1,
        key: 0,
      },
      {
        tab: complexTab2,
        key: 1,
      },
    ];

    return (
      <IceContainer>
        <ContainerTitle title="基本活跃指标" />
        <Tab
          onChange={this.handleTabChange}
          className="basic-indicator-tab"
          style={{
            background: '#f7f7f7',
            marginTop: '20px',
          }}
        >
          {panes.map((pane) => {
            return (
              <Tab.Item title={pane.tab} key={pane.key}>
                <LineChart data={this.state.data} cols={this.state.cols} />
              </Tab.Item>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  tabTitle: {
    padding: '0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
  },
  tabValue: {
    margin: '12px 0',
    fontSize: '24px',
    fontWeight: '500',
    color: '#5e83fb',
  },
  tabDesc: {
    padding: '0 0 10px',
    fontSize: '12px',
    color: '#999',
  },
};
