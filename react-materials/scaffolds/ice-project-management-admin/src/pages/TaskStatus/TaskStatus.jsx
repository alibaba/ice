import React, { Component } from 'react';
import OverviewChart from './components/OverviewChart';
import TaskTable from './components/TaskTable';

export default class TaskStatus extends Component {
  render() {
    return (
      <div>
        <OverviewChart />
        <TaskTable />
      </div>
    );
  }
}
