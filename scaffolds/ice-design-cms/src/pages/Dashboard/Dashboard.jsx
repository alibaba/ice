

import React, { Component } from 'react';

import DataDisplay from './components/DataDisplay';

import DataStatistics from './components/DataStatistics';

import RealTimeStatistics from './components/RealTimeStatistics';

import LatestNews from './components/LatestNews';

import './Dashboard.scss';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <DataDisplay />

        <DataStatistics />

        <RealTimeStatistics />

        <LatestNews />
      </div>
    );
  }
}
