import React, { Component } from 'react';
import DataOverview from './components/DataOverview';
import FlowStatistics from './components/FlowStatistics';
import LineBarChart from './components/LineBarChart';
import OverviewPieChart from './components/OverviewPieChart';
import TopActiveChart from './components/TopActiveChart';

export default class Statcenter extends Component {
  static displayName = 'Statcenter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <DataOverview />
        <OverviewPieChart />
        <LineBarChart />
        <FlowStatistics />
        <TopActiveChart />
      </div>
    );
  }
}
