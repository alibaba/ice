import React, { Component } from 'react';
import ChartBar from './components/ChartBar';
import ChartArea from './components/ChartArea';
import ChartBubbleImage from './components/ChartBubbleImage';
import ChartBox from './components/ChartBox';
import ChartTypeLine from './components/ChartTypeLine';
import ChartRadar from './components/ChartRadar';
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
