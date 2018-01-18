'use strict';

import React, { Component } from 'react';

import ComplexTabTable from './components/complex-tab-table';

import './Table.scss';

export default class Table extends Component {
  static displayName = 'Table';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-page">
        
        <ComplexTabTable />
        
      </div>
    );
  }
}
