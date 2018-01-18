import React, { Component } from 'react';
import SelectableTable from './components/SelectableTable';
import EditableTable from './components/EditableTable';
import ProgressTable from './components/ProgressTable';
import InfoDisplayTable from './components/InfoDisplayTable';
import SortableTable from './components/SortableTable';
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
