'use strict';

import React, { Component } from 'react';

import ProgressTable from './components/progress-table';

import InfoDisplayTable from './components/info-display-table';

import DetailTable from './components/detail-table';

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
