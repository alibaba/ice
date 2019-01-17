import React, { Component } from 'react';
import AccountPanel from './components/AccountPanel';

export default class Settings extends Component {
  static displayName = 'Settings';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <AccountPanel />;
  }
}
