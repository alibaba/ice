'use strict';

import React, { Component } from 'react';

import BasicTab from './components/basic-tab';

import DataDisplay from './components/data-display';

import TabChart from './components/tab-chart';

import PieDoughnutChart from './components/pie-doughnut-chart';

import ProgressTable from './components/progress-table';

import EditableTable from './components/editable-table';

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
        
        <TabChart />
        
        <PieDoughnutChart />
        
        <ProgressTable />
        
        <EditableTable />
        
        <ChartBar />
        
      </div>
    );
  }
}
