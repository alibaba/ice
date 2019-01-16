import React, { Component } from 'react';
import ProjectTable from './components/ProjectTable';
import OverviewChart from '../TaskStatus/components/OverviewChart';

export default class ProjectList extends Component {
  render() {
    return (
      <div>
        <OverviewChart />
        <ProjectTable />
      </div>
    );
  }
}
