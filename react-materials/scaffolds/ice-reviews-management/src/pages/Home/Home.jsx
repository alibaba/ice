import React, { Component } from 'react';

import ReviewDataChart from './components/ReviewDataChart';
import ReviewDetailInfo from './components/ReviewDetailInfo';
import ReviewOverview from './components/ReviewOverview';
import ReviewRequestTable from './components/ReviewRequestTable';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <ReviewOverview />
        <ReviewDetailInfo />
        <ReviewRequestTable />
        <ReviewDataChart />
      </div>
    );
  }
}
