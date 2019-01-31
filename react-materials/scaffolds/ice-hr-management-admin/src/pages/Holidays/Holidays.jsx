import React, { Component } from 'react';
import Overview from './components/Overview';
import HolidaysTable from './components/HolidaysTable';

export default class Holidays extends Component {
  render() {
    return (
      <div>
        <Overview />
        <HolidaysTable />
      </div>
    );
  }
}
