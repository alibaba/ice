import React, { Component } from 'react';
import Overview from './components/Overview';
import WrokReport from './components/WrokReport';
import QuickNav from './components/QuickNav';
import ProjectAnalysis from './components/ProjectAnalysis';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Overview />
        <WrokReport />
        <QuickNav />
        <ProjectAnalysis />
      </div>
    );
  }
}
