import React, { Component } from 'react';
import Overview from './components/Overview';
import CostTrend from './components/CostTrend';
import DepartmentCost from './components/DepartmentCost';

export default class CostManage extends Component {
  static displayName = 'CostManage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Overview />
        <CostTrend />
        <DepartmentCost />
      </div>
    );
  }
}
