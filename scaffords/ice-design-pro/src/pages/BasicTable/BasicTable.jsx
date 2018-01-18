

import React, { Component } from 'react';

import SelectableTable from './components/selectable-table';

import EditableTable from './components/editable-table';

import SortableTable from './components/sortable-table';

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

        <SelectableTable />

        <EditableTable />

        <SortableTable />

      </div>
    );
  }
}
