import React, { Component } from 'react';
import HotPostRank from './components/HotPostRank';
import HotRank from './components/HotRank';
import OverviewChart from './components/OverviewChart';

export default class HotPost extends Component {
  static displayName = 'HotPost';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <OverviewChart />
        <HotPostRank />
        <HotRank />
      </div>
    );
  }
}
