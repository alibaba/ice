import React, { Component } from 'react';

import ReviewDataChart from './components/ReviewDataChart';
import ReviewDetailInfo from './components/ReviewDetailInfo';
import ReviewOverview from './components/ReviewOverview';
import ReviewRequestTable from './components/ReviewRequestTable';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <ReviewOverview />
        <ReviewDetailInfo />
        <ReviewRequestTable />
        <ReviewDataChart />
      </div>
    );
  }
}
