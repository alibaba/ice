import React, { Component } from 'react';
import OverviewChartCard from './components/OverviewChartCard';
import TabChart from './components/TabChart';
import ProjectStatus from './components/ProjectStatus';
import OrderStatusChart from './components/OrderStatusChart';
import './Charts.scss';

export default class Charts extends Component {
  static displayName = 'Charts';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="charts-page">
        <OverviewChartCard />
        <TabChart />
        <ProjectStatus />
        <OrderStatusChart />
      </div>
    );
  }
}
