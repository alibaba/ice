'use strict';

import React, { Component } from 'react';

import PieDoughnutChart from './components/pie-doughnut-chart';

import ChartBar from './components/chart-bar';

import ChartArea from './components/chart-area';

import ChartBubbleImage from './components/chart-bubble-image';

import ChartBox from './components/chart-box';

import ChartTypeLine from './components/chart-type-line';

import ChartRadar from './components/chart-radar';

import './Charts.scss';

export default class Charts extends Component {
  static displayName = 'Charts';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="charts-page">
        
        <PieDoughnutChart />
        
        <ChartBar />
        
        <ChartArea />
        
        <ChartBubbleImage />
        
        <ChartBox />
        
        <ChartTypeLine />
        
        <ChartRadar />
        
      </div>
    );
  }
}
