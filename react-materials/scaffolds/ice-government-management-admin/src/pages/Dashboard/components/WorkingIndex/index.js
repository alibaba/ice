import React, { Component } from 'react';
import BarChart from './BarChart';
import GroupedBarChart from './GroupedBarChart';
import styles from './index.module.scss';

export default class WorkingIndex extends Component {
  static displayName = 'WorkingIndex';

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.title}>个人工作指标</h4>
          <div className={styles.charts}>
            <BarChart />
            <GroupedBarChart />
          </div>
        </div>
      </div>
    );
  }
}
