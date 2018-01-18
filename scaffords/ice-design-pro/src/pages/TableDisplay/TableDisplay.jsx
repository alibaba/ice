import React, { Component } from 'react';
import ProgressTable from './components/ProgressTable';
import InfoDisplayTable from './components/InfoDisplayTable';
import DetailTable from './components/DetailTable';
import './TableDisplay.scss';

export default class TableDisplay extends Component {
  static displayName = 'TableDisplay';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-display-page">
        <ProgressTable />
        <InfoDisplayTable />
        <DetailTable />
      </div>
    );
  }
}
