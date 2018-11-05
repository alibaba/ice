import React, { Component } from 'react';
import Overview from './components/Overview';
import CustomTab from './components/CustomTab';
import BaseInfo from './components/BaseInfo';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Overview />
        <CustomTab />
        <BaseInfo />
      </div>
    );
  }
}
