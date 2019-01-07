import React, { Component } from 'react';
import Guide from '../../components/Guide';

import './Dashboard.scss';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <Guide />
      </div>
    );
  }
}
