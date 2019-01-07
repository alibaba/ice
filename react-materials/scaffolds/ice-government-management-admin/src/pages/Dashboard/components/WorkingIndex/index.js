import React, { Component } from 'react';
import BarChart from './BarChart';
import GroupedBarChart from './GroupedBarChart';

export default class WorkingIndex extends Component {
  static displayName = 'WorkingIndex';

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>个人工作指标</h4>
          <div style={styles.charts}>
            <BarChart />
            <GroupedBarChart />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '50%',
    boxSizing: 'border-box',
    padding: '10px',
  },
  card: {
    width: '100%',
    padding: '20px',
    color: '#44426e',
    fontSize: '16px',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'scroll',
    position: 'relative',
    height: '286px',
  },
  title: {
    margin: '0',
    borderLeft: '5px solid #447eff',
    paddingLeft: '10px',
    lineHeight: '20px',
  },
  charts: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
};
