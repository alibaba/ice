import React, { Component } from 'react';
import DataDisplay from './components/DataDisplay';
import TabChart from './components/TabChart';
import PieDoughnutChart from './components/PieDoughnutChart';
import ProgressTable from './components/ProgressTable';
import EditableTable from './components/EditableTable';
import ChartBar from './components/ChartBar';
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

        <TabChart />

        <PieDoughnutChart />

        <ProgressTable />

        <EditableTable />

        <ChartBar />
      </div>
    );
  }
}
