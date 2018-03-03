'use strict';

import React, { Component } from 'react';

import OverviewChart from './components/OverviewChart';

import FlowStatistics from './components/FlowStatistics';

import UserTrafficStastistics from './components/UserTrafficStastistics';

import UserStatChart from './components/UserStatChart';

import VisitorsLocationChart from './components/VisitorsLocationChart';

import TopActiveChart from './components/TopActiveChart';

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
        <OverviewChart />

        <FlowStatistics />

        <UserTrafficStastistics />

        <UserStatChart />

        <VisitorsLocationChart />

        <TopActiveChart />
      </div>
    );
  }
}
