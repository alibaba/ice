import React, { Component } from 'react';
import OverviewPieChart from './components/OverviewPieChart';
import OverviewSatesChart from './components/OverviewSatesChart';
import CardList from './components/CardList';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <OverviewPieChart />
        <OverviewSatesChart />
        <CardList />
      </div>
    );
  }
}
