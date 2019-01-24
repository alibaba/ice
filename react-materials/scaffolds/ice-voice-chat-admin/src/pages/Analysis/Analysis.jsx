import React, { Component } from 'react';
import { Select } from '@alifd/next';
import TopBar from '../../components/TopBar';
import Cards from './components/Cards';
import Trend from './components/Trend';

export default class Analysis extends Component {
  static displayName = 'Analysis';

  renderExtraAfter = () => {
    const dataSource1 = [
      { label: 'weather', value: 'weather' },
      { label: 'joke', value: 'joke' },
    ];
    const dataSource2 = [
      { label: '今天', value: 'today' },
      { label: '7天', value: 'week' },
      { label: '一个月', value: 'month' },
    ];

    return (
      <div>
        <Select
          dataSource={dataSource1}
          defaultValue="weather"
          style={{ width: '260px', marginRight: '10px' }}
        />
        <Select dataSource={dataSource2} defaultValue="today" />
      </div>
    );
  };

  render() {
    return (
      <div>
        <TopBar title="数据统计" extraAfter={this.renderExtraAfter()} />
        <Cards />
        <Trend />
      </div>
    );
  }
}
