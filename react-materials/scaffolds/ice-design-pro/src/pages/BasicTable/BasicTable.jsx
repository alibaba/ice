import React, { Component } from 'react';
import TableChartCard from './components/TableChartCard';
import TabTable from './components/TabTable';

import './BasicTable.scss';

export default class BasicTable extends Component {
  static displayName = 'BasicTable';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="basic-table-page">
        <TabTable />
        <TableChartCard />
      </div>
    );
  }
}
