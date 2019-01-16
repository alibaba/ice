import React, { Component } from 'react';
import BasicIndicator from './components/BasicIndicator';
import UserTrend from './components/UserTrend';

export default class UserStatistics extends Component {
  render() {
    return (
      <div>
        <BasicIndicator />
        <UserTrend />
      </div>
    );
  }
}
