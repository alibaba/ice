import React, { Component } from 'react';
import Overview from './components/Overview';
import LatestActivity from './components/LatestActivity';
import NewUsers from './components/NewUsers';

export default class Business extends Component {
  static displayName = 'Business';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <Overview />
        <LatestActivity />
        <NewUsers />
      </div>
    );
  }
}
