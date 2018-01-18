'use strict';

import React, { Component } from 'react';

import SelectableTable from './components/selectable-table';

import EditableTable from './components/editable-table';

import ProgressTable from './components/progress-table';

import InfoDisplayTable from './components/info-display-table';

import SortableTable from './components/sortable-table';

import './TableList.scss';

export default class TableList extends Component {
  static displayName = 'TableList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-list-page">
        
        <SelectableTable />
        
        <EditableTable />
        
        <ProgressTable />
        
        <InfoDisplayTable />
        
        <SortableTable />
        
      </div>
    );
  }
}
