import React, { Component } from 'react';

import { FormattedMessage } from 'react-intl';

import DisplayCard from './components/DisplayCard';

import TabChart from './components/TabChart';

import PieDoughnutChart from './components/PieDoughnutChart';

import ProgressTable from './components/ProgressTable';

import EditableTable from './components/EditableTable';

import ChartBar from './components/ChartBar';

import messages from './messages';

import './Dashboard.scss';

console.log({ messages });

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <FormattedMessage {...messages.licenseMessage} />
        <DisplayCard />

        <TabChart />

        <PieDoughnutChart />

        <ProgressTable />

        <EditableTable />

        <ChartBar />
      </div>
    );
  }
}
