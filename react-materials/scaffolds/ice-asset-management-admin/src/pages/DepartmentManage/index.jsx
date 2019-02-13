import React, { Component } from 'react';

import Filter from './components/Filter';
import Overview from './components/Overview';
import HealthAnalysis from './components/HealthAnalysis';
import ApplicationAnalysis from './components/ApplicationAnalysis';
import BaseInfo from '../../components/BaseInfo';

export default class DepartmentManage extends Component {
  static displayName = 'DepartmentManage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Filter />
        <Overview />
        <BaseInfo />
        <HealthAnalysis />
        <ApplicationAnalysis />
      </div>
    );
  }
}
