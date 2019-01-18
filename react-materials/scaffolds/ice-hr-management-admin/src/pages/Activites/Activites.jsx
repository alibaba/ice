import React, { Component } from 'react';
import Overview from './components/Overview';
import ActivityTimeLine from './components/ActivityTimeLine';

export default class Activites extends Component {
  render() {
    return (
      <div>
        <Overview />
        <ActivityTimeLine />
      </div>
    );
  }
}
