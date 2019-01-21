import React, { Component } from 'react';
import Overview from './components/Overview';
import DepartmentTable from './components/DepartmentTable';

export default class Departments extends Component {
  render() {
    return (
      <div>
        <Overview />
        <DepartmentTable />
      </div>
    );
  }
}
