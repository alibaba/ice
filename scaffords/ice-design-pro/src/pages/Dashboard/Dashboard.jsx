'use strict';

import React, { Component } from 'react';

import BasicTab from './components/basic-tab';

import DataDisplay from './components/data-display';

import PieDoughnutChart from './components/pie-doughnut-chart';

import ProgressTable from './components/progress-table';

import ChartBar from './components/chart-bar';

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
        
        <BasicTab />
        
        <DataDisplay />
        
        <PieDoughnutChart />
        
        <ProgressTable />
        
        <ChartBar />
        
      </div>
    );
  }
}
