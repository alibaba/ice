import React, { Component } from 'react';
import Overview from './components/Overview';
import CustomTab from './components/CustomTab';
import BaseInfo from './components/BaseInfo';
import ServiceCard from './components/ServiceCard';
import LineBarChart from './components/LineBarChart';
import PublishHitory from './components/PublishHitory';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ServiceCard />
        <LineBarChart />
        <PublishHitory />
      </div>
    );
  }
}
