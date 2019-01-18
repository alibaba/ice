import React, { Component } from 'react';
import Overview from './components/Overview';
import CostOverview from './components/CostOverview';
import TradingTrends from './components/TradingTrends';

export default class Trade extends Component {
  static displayName = 'Trade';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Overview />
        <CostOverview />
        <TradingTrends />
      </div>
    );
  }
}
