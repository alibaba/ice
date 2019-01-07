import React, { Component } from 'react';
import QuickNavigation from './components/QuickNavigation';
import OverviewChart from './components/OverviewChart';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <QuickNavigation />
        <OverviewChart />
      </div>
    );
  }
}
