import React, { Component } from 'react';
import BasicIndicator from './components/BasicIndicator';
import AccessTrend from './components/AccessTrend';
import AccessSource from './components/AccessSource';

export default class TrafficStatistics extends Component {
  render() {
    return (
      <div>
        <BasicIndicator />
        <AccessTrend />
        <AccessSource />
      </div>
    );
  }
}
