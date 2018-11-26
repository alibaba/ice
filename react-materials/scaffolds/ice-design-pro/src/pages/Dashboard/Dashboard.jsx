import React, { Component } from 'react';
import DisplayCard from './components/DisplayCard';
import TabChart from './components/TabChart';
import PieDoughnutChart from './components/PieDoughnutChart';
import EditableTable from './components/EditableTable';
import LatestActivity from './components/LatestActivity';
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
        <LatestActivity />
        <EditableTable />
        <PieDoughnutChart />
      </div>
    );
  }
}
