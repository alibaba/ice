import React, { Component } from 'react';
import Overview from './components/Overview';
import TabChart from './components/TabChart';
import CircleProgress from './components/CircleProgress';
import TopActiveChart from './components/TopActiveChart';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Overview />
        <TabChart />
        <CircleProgress />
        <TopActiveChart />
      </div>
    );
  }
}
