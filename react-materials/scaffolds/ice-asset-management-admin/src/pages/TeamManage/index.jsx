import React, { Component } from 'react';
import Filter from './components/Filter';
import Overview from './components/Overview';
import TrendAnalysis from './components/TrendAnalysis';
import BaseInfo from '../../components/BaseInfo';

export default class TeamManage extends Component {
  static displayName = 'TeamManage';

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
        <TrendAnalysis />
      </div>
    );
  }
}
