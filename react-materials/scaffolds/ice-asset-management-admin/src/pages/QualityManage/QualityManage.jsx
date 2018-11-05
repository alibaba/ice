import React, { Component } from 'react';
import Filter from './components/Filter';
import QualityTable from './components/QualityTable';
import QualityTrend from './components/QualityTrend';

export default class QualityManage extends Component {
  static displayName = 'QualityManage';

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
        <QualityTable />
        <QualityTrend />
      </div>
    );
  }
}
