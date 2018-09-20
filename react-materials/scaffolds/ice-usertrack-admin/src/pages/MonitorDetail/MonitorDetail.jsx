import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import BaseInfo from './components/BaseInfo';
import TrackTab from './components/TrackTab';
import TrackTable from './components/TrackTable';

export default class MonitorDetail extends Component {
  static displayName = 'MonitorDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      {
        link: '/#/application/monitor',
        text: '应用监控',
      },
      {
        link: '',
        text: '监控详情',
      },
    ];
    return (
      <div>
        <CustomBreadcrumb items={breadcrumb} title="监控详情" />
        <BaseInfo />
        <TrackTab />
        <TrackTable />
      </div>
    );
  }
}
