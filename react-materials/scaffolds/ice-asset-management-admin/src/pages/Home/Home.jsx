import React, { Component } from 'react';
import Overview from './components/Overview';
import YearsAnalysis from './components/YearsAnalysis';
import BudgetManage from './components/BudgetManage';

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
        <YearsAnalysis />
        <BudgetManage />
      </div>
    );
  }
}
