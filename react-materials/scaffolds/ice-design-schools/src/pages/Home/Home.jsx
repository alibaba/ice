import React, { Component } from 'react';
import QuickNavigation from './components/QuickNavigation';
import OverviewChart from './components/OverviewChart';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <QuickNavigation />
        <OverviewChart />
      </div>
    );
  }
}
