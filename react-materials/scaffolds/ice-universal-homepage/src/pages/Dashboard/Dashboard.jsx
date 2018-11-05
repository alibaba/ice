import React, { Component } from 'react';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div style={{ minHeight: '100vh' }} />;
  }
}
