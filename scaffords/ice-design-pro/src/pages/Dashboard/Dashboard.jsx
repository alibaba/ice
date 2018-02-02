import React, { Component } from 'react';
import TabChart from './components/TabChart';
import PieDoughnutChart from './components/PieDoughnutChart';
import DisplayCard from './components/DisplayCard';
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
        <DisplayCard />

        <TabChart />

        <PieDoughnutChart />

        <ProgressTable />

        <EditableTable />

        <ChartBar />
      </div>
    );
  }
}
