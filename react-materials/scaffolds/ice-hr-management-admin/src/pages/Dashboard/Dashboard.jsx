import React, { Component } from 'react';
import Overview from './components/Overview';
import QuickNav from './components/QuickNav';
import SalaryChart from './components/SalaryChart';
import Employee from './components/Employee';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <QuickNav />
        <Overview />
        <Employee />
        <SalaryChart />
      </div>
    );
  }
}
