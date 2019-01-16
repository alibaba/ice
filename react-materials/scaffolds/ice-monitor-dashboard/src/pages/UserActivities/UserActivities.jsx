import React, { Component } from 'react';
import BasicIndicator from './components/BasicIndicator';
import UserTrend from './components/UserTrend';
import AccessDistribution from './components/AccessDistribution';

export default class UserActivities extends Component {
  render() {
    return (
      <div>
        <BasicIndicator />
        <UserTrend />
        <AccessDistribution />
      </div>
    );
  }
}
