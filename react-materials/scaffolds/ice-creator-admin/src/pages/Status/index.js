import React, { Component } from 'react';
import AccountBadge from './components/AccountBadge';
import AccountStatus from './components/AccountStatus';
import AccountFeatures from './components/AccountFeatures';

export default class Status extends Component {
  static displayName = 'Status';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AccountBadge />
        <AccountStatus />
        <AccountFeatures />
      </div>
    );
  }
}
